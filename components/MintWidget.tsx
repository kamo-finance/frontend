"use client";

import React, { useEffect, useState } from "react";
import { FaExchangeAlt, FaArrowDown } from "react-icons/fa";
import {
  FixedPoint64,
  KamoClient,
  newKamoTransaction,
  suiClient,
} from "@kamo-finance/ts-sdk";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { addToast, Button, Tabs, Tab } from "@heroui/react";

import Modal from "./Modal";
import AmountSelector from "./AmountSelector";

interface MintWidgetProps {
  marketId: string;
}

interface TransactionResult {
  success: boolean;
  message: string;
  explorerUrl?: string;
}

interface TokenBalance {
  sy: string;
  pt: string;
  yt: string;
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  tokenSymbol?: string;
  balance?: string;
  showSelector?: boolean;
  onAmountChange?: (amount: string) => void;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  readOnly = false,
  tokenSymbol,
  balance,
  showSelector,
  onAmountChange,
  className = "",
}) => (
  <div
    className={`rounded-2xl bg-foreground-100 border-2 border-foreground p-2 ${className}`}
  >
    <div className="text-sm font-semibold text-foreground mb-1">{label}</div>
    <div className="flex items-center justify-between">
      <input
        className="bg-transparent text-base outline-none w-full text-gray-800"
        placeholder="0.00"
        readOnly={readOnly}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
    {showSelector && onAmountChange && (
      <AmountSelector
        balance={balance || "0"}
        className="mt-1"
        onAmountChange={onAmountChange}
      />
    )}
  </div>
);

const MintWidget: React.FC<MintWidgetProps> = ({ marketId }) => {
  const [activeTab, setActiveTab] = useState<"mint" | "redeem">("mint");
  const [amounts, setAmounts] = useState({
    sy: "",
    pt: "",
    yt: "",
  });
  const [balances, setBalances] = useState<TokenBalance>({
    sy: "0",
    pt: "0",
    yt: "0",
  });
  const [showModal, setShowModal] = useState(false);
  const [txResult, setTxResult] = useState<TransactionResult | null>(null);

  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const resetAmounts = () => {
    setAmounts({ sy: "", pt: "", yt: "" });
  };

  const activeTabChanged = (tab: "mint" | "redeem") => {
    setActiveTab(tab);
    resetAmounts();
  };

  const fetchBalances = async (address: string) => {
    if (!address) return;

    try {
      const kamoClient = new KamoClient({ client: suiClient });
      const fetchedBalances = await kamoClient.getBalances({
        stateId: marketId,
        owner: address,
      });

      setBalances({
        sy: (fetchedBalances.syBalance.totalBalance / 10 ** 6).toString(),
        pt: (fetchedBalances.ptBalance.totalBalance / 10 ** 6).toString(),
        yt: (Number(fetchedBalances.yoBalance) / 10 ** 6).toString(),
      });
    } catch (error) {
      console.error("Error fetching balances:", error);
      addToast({
        title: "Error",
        description: "Failed to fetch balances",
        severity: "danger",
      });
    }
  };

  useEffect(() => {
    if (!account?.address) return;
    fetchBalances(account?.address);
  }, [account?.address, marketId]);

  const calculateAmounts = async (
    inputType: "sy" | "pt",
    inputValue: string,
  ) => {
    if (!inputValue) {
      resetAmounts();

      return;
    }

    try {
      const floatValue = parseFloat(inputValue);

      // Check insufficient balance
      if (floatValue > parseFloat(balances[inputType])) {
        addToast({
          title: "Error",
          description: "Insufficient balance",
          severity: "danger",
        });

        return false;
      }

      const kamoTx = newKamoTransaction({ market: "KUSDC" });
      const exchangeRate = await kamoTx.getSyExchangeRate();
      const scaledValue = BigInt(Math.floor(floatValue * 10 ** 6));

      if (inputType === "sy") {
        // Calculate PT and YT from SY
        const ptAmount = exchangeRate
          .mul_bigint(scaledValue)
          .toBigNumber()
          .div(10 ** 6)
          .toString();

        setAmounts({
          sy: inputValue,
          pt: ptAmount,
          yt: ptAmount,
        });
      } else {
        // Calculate SY from PT/YT
        const syAmount = FixedPoint64.CreateFromU128(scaledValue)
          .div(exchangeRate)
          .toBigNumber()
          .div(10 ** 6)
          .toString();

        setAmounts({
          sy: syAmount,
          pt: inputValue,
          yt: inputValue,
        });
      }

      return true;
    } catch (error) {
      console.error("Error calculating amounts:", error);
      addToast({
        title: "Error",
        description: "Invalid input",
        severity: "danger",
      });

      return false;
    }
  };

  const handleTransaction = async () => {
    if (!account?.address) return;

    try {
      const kamoTx = newKamoTransaction({ market: "KUSDC" });
      const tx = new Transaction();

      if (activeTab === "mint") {
        const syAmountTrimmed = amounts.sy.trim();

        if (!syAmountTrimmed || parseFloat(syAmountTrimmed) <= 0) {
          addToast({
            title: "Error",
            description: "Invalid input amount",
            severity: "danger",
          });

          return;
        }

        await kamoTx.mint({
          tx,
          sender: account.address,
          sy_amount_in: BigInt(
            Math.floor(parseFloat(syAmountTrimmed) * 10 ** 6),
          ),
        });
      } else {
        const ptAmountTrimmed = amounts.pt.trim();

        if (!ptAmountTrimmed || parseFloat(ptAmountTrimmed) <= 0) {
          addToast({
            title: "Error",
            description: "Invalid input amount",
            severity: "danger",
          });

          return;
        }

        await kamoTx.redeemBeforeMaturity({
          tx,
          sender: account.address,
          ptAmountBurned: BigInt(
            Math.floor(parseFloat(ptAmountTrimmed) * 10 ** 6),
          ),
        });
      }

      tx.setSender(account.address);

      signAndExecuteTransaction(
        {
          transaction: tx,
          chain: "sui:testnet",
        },
        {
          onSuccess: (result) => {
            setTxResult({
              success: true,
              message: `Transaction successful! Digest: ${result.digest}`,
              explorerUrl: `https://testnet.suivision.xyz/txblock/${result.digest}?tab=Changes`,
            });
            setShowModal(true);
          },
          onError: (error) => {
            setTxResult({
              success: false,
              message: `Transaction failed: ${error.message}`,
            });
            setShowModal(true);
          },
        },
      );
    } catch (error) {
      console.error("Transaction error:", error);
      addToast({
        title: "Error",
        description: "Transaction failed",
        severity: "danger",
      });
    }
  };

  const handleSyInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.trim();

    calculateAmounts("sy", value);
  };

  const handlePtInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.trim();

    if (!value || (await calculateAmounts("pt", value))) {
      // Only update YT if calculation was successful or value is empty
      setAmounts((prev) => ({ ...prev, pt: value, yt: value }));
    }
  };

  const handleTabChange = (key: React.Key) => {
    const tab = key.toString() as "mint" | "redeem";

    activeTabChanged(tab);
  };

  const tabItems = [
    {
      id: "mint",
      label: "Mint PT & YT",
      content: (
        <div className="space-y-4">
          <InputField
            balance={balances.sy}
            label="Input SY Amount"
            showSelector={true}
            tokenSymbol="KUSDC"
            value={amounts.sy}
            onAmountChange={(amount) => calculateAmounts("sy", amount)}
            onChange={handleSyInputChange}
          />
          <div className="flex justify-center -my-1">
            <div className="border border-gray-200 p-1 rounded-lg">
              <FaArrowDown className="text-blue-500 text-sm" />
            </div>
          </div>

          <div className="bg-foreground-100 rounded-3xl border-2 border-foreground p-4">
            <div className="text-lg font-semibold text-foreground mb-2">
              You will receive
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">PT Amount</div>
                <div className="text-xl text-gray-800">
                  ≈ {amounts.pt || "0.00"}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">YT Amount</div>
                <div className="text-xl text-gray-800">
                  ≈ {amounts.yt || "0.00"}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      buttonText: "Mint PT & YT",
    },
    {
      id: "redeem",
      label: "Redeem SY",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              balance={balances.pt}
              label="Input PT Amount"
              value={amounts.pt}
              onChange={handlePtInputChange}
            />
            <InputField
              balance={balances.yt}
              label="Input YT Amount"
              readOnly={true}
              value={amounts.yt}
            />
          </div>

          <div className="flex justify-center -my-2">
            <div className="border border-gray-200 p-2 rounded-lg">
              <FaExchangeAlt className="text-blue-500" />
            </div>
          </div>

          <InputField
            balance={balances.sy}
            label="SY Amount"
            readOnly={true}
            showSelector={true}
            tokenSymbol="KUSDC"
            value={amounts.sy}
            onAmountChange={(amount) =>
              setAmounts((prev) => ({ ...prev, sy: amount }))
            }
          />
        </div>
      ),
      buttonText: "Redeem SY",
    },
  ];

  return (
    <div className="rounded-2xl shadow-sm p-3 flex flex-col gap-2">
      <Tabs
        aria-label="Mint options"
        className="mb-2"
        color="primary"
        selectedKey={activeTab}
        variant="light"
        onSelectionChange={handleTabChange}
      >
        {tabItems.map((item) => (
          <Tab key={item.id} title={item.label}>
            <div className="space-y-2">
              {item.content}
              <Button
                fullWidth
                className="mt-2"
                color="primary"
                onPress={handleTransaction}
              >
                {item.buttonText}
              </Button>
            </div>
          </Tab>
        ))}
      </Tabs>

      <Modal
        isOpen={showModal}
        size="lg"
        title={
          txResult?.success ? "Transaction Successful" : "Transaction Failed"
        }
        type={txResult?.success ? "success" : "error"}
        onAfterClose={() => {
          resetAmounts();
          if (account?.address) {
            fetchBalances(account?.address);
          }
        }}
        onClose={() => setShowModal(false)}
      >
        <div>
          <p className="mb-4">{txResult?.message}</p>
          {txResult?.success && txResult?.explorerUrl && (
            <a
              className="text-blue-500 hover:text-blue-600 underline"
              href={txResult.explorerUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              View on Explorer
            </a>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MintWidget;
