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

import AmountSelector from "./AmountSelector";

import { useShowTx } from "@/app/contexts/TxContext";

interface MintWidgetProps {
  marketId: string;
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
  const [rate, setRate] = useState(1);
  const { showTx } = useShowTx();

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
        sy: (
          Number(fetchedBalances.syBalance.totalBalance) /
          10 ** 6
        ).toString(),
        pt: (
          Number(fetchedBalances.ptBalance.totalBalance) /
          10 ** 6
        ).toString(),
        yt: (Number(fetchedBalances.yoBalance) / 10 ** 6).toString(),
      });
    } catch (error: any) {
      addToast({
        title: "Error",
        description: `Failed to fetch balances: ${error.message}`,
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

      setRate(Number(exchangeRate.toBigNumber().toString()));

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
    } catch (error: any) {
      addToast({
        title: "Error",
        description: `Invalid input: ${error.message}`,
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
            const amount =
              activeTab === "mint"
                ? amounts.pt + " PT & " + amounts.yt + " YT"
                : amounts.sy + " SY";
            const action =
              activeTab === "mint" ? `minted ${amount}` : `redeemed ${amount}`;

            showTx({
              title: "Transaction Successful",
              content: `You successfully ${action}!`,
              txDigest: result.digest,
              type: "success",
            });
          },
          onError: (error) => {
            showTx({
              title: "Transaction Failed",
              content: `Failed to ${activeTab === "mint" ? "mint" : "redeem"}! ${error.message}`,
              type: "error",
            });
          },
        },
      );
    } catch (error: any) {
      addToast({
        title: "Error",
        description: `Transaction failed: ${error.message}`,
        severity: "danger",
      });
    }
  };

  const handleSyInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.trim();

    if (!value || (await calculateAmounts("sy", value))) {
      // Chỉ cập nhật sy amount nếu tính toán thành công hoặc giá trị rỗng
      setAmounts((prev) => ({ ...prev, sy: value }));
    }
  };

  const handlePtInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.trim();

    if (!value || (await calculateAmounts("pt", value))) {
      // Chỉ cập nhật PT và YT nếu tính toán thành công hoặc giá trị rỗng
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
              <div className="text-sm text-gray-500">
                Rate: 1 SY = {rate} PT & {rate} YT
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
          <div className="flex flex-col gap-4">
            <InputField
              balance={balances.pt}
              label="PT Amount"
              showSelector={true}
              value={amounts.pt}
              onAmountChange={(amount) => calculateAmounts("pt", amount)}
              onChange={handlePtInputChange}
            />
            <InputField
              balance={balances.yt}
              label="YT Amount"
              showSelector={true}
              value={amounts.yt}
              onAmountChange={(amount) => calculateAmounts("pt", amount)}
              onChange={handlePtInputChange}
            />
          </div>

          <div className="flex justify-center -my-2">
            <div className="border border-gray-200 p-2 rounded-lg">
              <FaExchangeAlt className="text-blue-500" />
            </div>
          </div>

          <InputField
            balance={balances.sy}
            label="SY Amount out"
            tokenSymbol="KUSDC"
            value={amounts.sy}
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
    </div>
  );
};

export default MintWidget;
