"use client";

import React, { useEffect, useState, useCallback } from "react";
import { FaPlus, FaArrowDown } from "react-icons/fa";
import {
  KamoClient,
  newKamoTransaction,
  suiClient,
  YieldMarket,
} from "@kamo-finance/ts-sdk";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { addToast, Slider } from "@heroui/react";
import { debounce } from "lodash";

import Modal from "./Modal";
import TokenBalances from "./TokenBalances";
import AmountSelector from "./AmountSelector";

interface LiquidityWidgetProps {
  marketId: string;
}

interface TransactionResult {
  success: boolean;
  message: string;
  explorerUrl?: string;
}

const LiquidityWidget: React.FC<LiquidityWidgetProps> = ({ marketId }) => {
  const [activeTab, setActiveTab] = useState<"add" | "remove">("add");
  const [syAmount, setSyAmount] = useState<string>("");
  const [ptAmount, setPtAmount] = useState<string>("");
  const [syBalance, setSyBalance] = useState<string>("0");
  const [ptBalance, setPtBalance] = useState<string>("0");
  const [lpBalance, setLpBalance] = useState<string>("0");
  const [showModal, setShowModal] = useState(false);
  const [txResult, setTxResult] = useState<TransactionResult | null>(null);
  const [mounted, setMounted] = useState(false);
  const [market, setMarket] = useState<YieldMarket>();
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [totalSy, setTotalSy] = useState<string>("0");
  const [totalPt, setTotalPt] = useState<string>("0");
  const [totalLp, setTotalLp] = useState<string>("0");
  const [lpAmount, setLpAmount] = useState<string>("0");
  const FETCH_COOLDOWN = 5000; // 5 seconds cooldown

  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTabChanged = (tab: "add" | "remove") => {
    setActiveTab(tab);
    setSyAmount("");
    setPtAmount("");
    setLpAmount("");
  };

  const fetchMarket = async () => {
    const yieldMarket = await YieldMarket.GetFromState({
      stateId: marketId,
    });
    const totalSy = yieldMarket.market.totalSy;
    const totalPt = yieldMarket.market.totalPt;
    const totalLp = yieldMarket.market.lpSupply.value;

    setTotalSy((Number(totalSy) / 10 ** 6).toString());
    setTotalPt((Number(totalPt) / 10 ** 6).toString());
    setTotalLp(totalLp.toString());
    setMarket(yieldMarket);
  };

  const debouncedFetchBalances = useCallback(
    debounce(async (address: string, marketId: string) => {
      if (!address) return;

      const now = Date.now();

      if (now - lastFetchTime < FETCH_COOLDOWN) {
        return;
      }

      try {
        setIsLoading(true);
        const kamoClient = new KamoClient({
          client: suiClient,
        });
        const balances = await kamoClient.getBalances({
          stateId: marketId,
          owner: address,
        });

        setSyBalance((balances.syBalance.totalBalance / 10 ** 6).toString());
        setPtBalance((balances.ptBalance.totalBalance / 10 ** 6).toString());
        setLpBalance(Number(balances.liquidityBalance).toString());
        setLastFetchTime(now);
      } catch (error) {
        addToast({
          title: "Error",
          description: "Failed to fetch balances. Please try again later.",
          severity: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000),
    [lastFetchTime],
  );

  useEffect(() => {
    if (!mounted) return;
    if (!account?.address || isLoading) return;
    debouncedFetchBalances(account.address, marketId);

    return () => {
      debouncedFetchBalances.cancel();
    };
  }, [mounted, account?.address, marketId, debouncedFetchBalances, isLoading]);

  useEffect(() => {
    fetchMarket();
  }, [marketId]);

  const onChangeSyInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!market) return;
    const value = e.target.value.trim();

    if (value === "") {
      setSyAmount("");
      setPtAmount("");
      setLpAmount("");

      return;
    }

    // Kiểm tra xem giá trị nhập vào có phải là số hợp lệ không
    if (!/^\d*\.?\d*$/.test(value)) {
      return;
    }

    const syAmount = parseFloat(value);

    if (isNaN(syAmount)) {
      setPtAmount("");
      setLpAmount("");

      return;
    }

    if (syAmount > Number(syBalance)) {
      addToast({
        title: "Error",
        description: "SY amount is greater than the balance.",
        severity: "danger",
      });

      return;
    }
    setSyAmount(value);

    try {
      const { ptNeeded, lpToAccount } = market.addLiquidityExactSy({
        syAmount: BigInt(syAmount * 10 ** 6),
      });

      setPtAmount((Number(ptNeeded) / 10 ** 6).toString());
      setLpAmount(Number(lpToAccount).toString());
    } catch (error) {
      setPtAmount("");
      setLpAmount("");
    }
  };

  const onChangePtInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!market) return;
    const value = e.target.value.trim();

    if (value === "") {
      setSyAmount("");
      setPtAmount("");
      setLpAmount("");

      return;
    }

    // Kiểm tra xem giá trị nhập vào có phải là số hợp lệ không
    if (!/^\d*\.?\d*$/.test(value)) {
      return;
    }

    const ptAmount = parseFloat(value);

    if (isNaN(ptAmount)) {
      setSyAmount("");
      setLpAmount("");

      return;
    }

    if (ptAmount > Number(ptBalance)) {
      addToast({
        title: "Error",
        description: "PT amount is greater than the balance.",
        severity: "danger",
      });

      return;
    }

    setPtAmount(value);

    try {
      const { syNeeded, lpToAccount } = market.addLiquidityExactPt({
        ptAmount: BigInt(ptAmount * 10 ** 6),
      });

      setSyAmount((Number(syNeeded) / 10 ** 6).toString());
      setLpAmount(Number(lpToAccount).toString());
    } catch (error) {
      setSyAmount("");
      setLpAmount("");
    }
  };

  const onChangeLpInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!market) return;
    const value = e.target.value.trim();

    if (value === "") {
      setSyAmount("");
      setPtAmount("");
      setLpAmount("");

      return;
    }

    try {
      const { ptToAccount, syToAccount } = market.removeLiquidity({
        lpAmount: BigInt(value),
      });

      setPtAmount((Number(ptToAccount) / 10 ** 6).toString());
      setSyAmount((Number(syToAccount) / 10 ** 6).toString());
    } catch (error: any) {
      if (error?.message !== "Market insufficient liquidity") {
        addToast({
          title: "Error",
          description: "Failed to remove liquidity. Please try again.",
          severity: "danger",
        });
      }
    }
    setLpAmount(value);
  };

  const handleAddLiquidity = async () => {
    if (!market || !account?.address) return;

    try {
      // TODO: Implement add liquidity logic here
      const kamoTx = newKamoTransaction({
        stateId: marketId,
      });
      const tx = new Transaction();

      await kamoTx.addLiquidity({
        tx: tx,
        sender: account.address,
        amountPT: Number(ptAmount) * 10 ** 6,
        amountSY: Number(syAmount) * 10 ** 6,
      });

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
      addToast({
        title: "Error",
        description: "Failed to add liquidity. Please try again.",
        severity: "danger",
      });
    }
  };

  const handleRemoveLiquidity = async () => {
    if (!market || !account?.address) return;

    try {
      // TODO: Implement remove liquidity logic here
      const kamoTx = newKamoTransaction({
        stateId: marketId,
      });
      const tx = new Transaction();

      await kamoTx.removeLiquidity({
        tx: tx,
        sender: account.address,
        amountLP: Number(lpAmount),
      });

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
      addToast({
        title: "Error",
        description: "Failed to remove liquidity. Please try again.",
        severity: "danger",
      });
    }
  };

  if (!mounted) {
    return <div className=" rounded-2xl shadow-sm p-4 min-h-[200px]" />;
  }

  return (
    <div className=" rounded-2xl shadow-sm p-6">
      <TokenBalances
        textLp="Total LP Token In Pool"
        textPt="Total PT In Pool"
        textSy="Total SY In Pool"
        textTitle="Pool Info"
        totalLp={totalLp}
        totalPt={totalPt}
        totalSy={totalSy}
      />

      {/* Tab Switcher */}
      <div className="flex gap-4 mb-6">
        <button
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "add"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => activeTabChanged("add")}
        >
          Add Liquidity
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "remove"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => activeTabChanged("remove")}
        >
          Remove Liquidity
        </button>
      </div>

      {/* Input Fields */}
      {activeTab === "add" ? (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-2">Input SY Amount</div>
            <div className="flex items-center justify-between">
              <input
                className="bg-transparent text-2xl outline-none w-full text-gray-800"
                placeholder="0"
                type="text"
                value={syAmount}
                onChange={onChangeSyInput}
              />
            </div>
            <AmountSelector
              balance={syBalance}
              className="mt-2"
              onAmountChange={(amount) =>
                onChangeSyInput({
                  target: { value: amount },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
          </div>

          <div className="flex justify-center -my-2">
            <div className=" border border-gray-200 p-2 rounded-lg">
              <FaPlus className="text-blue-500" />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-2">Input PT Amount</div>
            <input
              className="w-full bg-transparent text-xl outline-none text-gray-800"
              placeholder="0.00"
              type="text"
              value={ptAmount}
              onChange={onChangePtInput}
            />
            <AmountSelector
              balance={ptBalance}
              onAmountChange={(amount) =>
                onChangePtInput({
                  target: { value: amount },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
          </div>

          <div className="flex justify-center -my-2">
            <div className=" border border-gray-200 p-2 rounded-lg">
              <FaArrowDown className="text-blue-500" />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-2">LP Token Amount</div>
            <div className="flex items-center justify-between">
              <div className="text-xl text-gray-800">
                ≈ {lpAmount || "0.00"}
              </div>
              <div className="text-sm text-gray-500">
                {((Number(lpAmount) / Number(lpBalance)) * 100).toFixed(2)}%
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              Balance: {lpBalance}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-2">Input LP Amount</div>
            <div className="flex items-center gap-2 mb-2">
              <input
                className="w-full bg-transparent text-xl outline-none text-gray-800"
                placeholder="0.00"
                type="text"
                value={lpAmount}
                onChange={onChangeLpInput}
              />
              <button
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() =>
                  onChangeLpInput({
                    target: { value: lpBalance },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                MAX
              </button>
            </div>
            <Slider
              className={`mb-2 max-[${Number(lpBalance) || 0}]`}
              defaultValue={0}
              label={`${((Number(lpAmount) / Number(lpBalance)) * 100).toFixed(2)}%`}
              marks={{
                0: "0",
                [Number(lpBalance) || 0]:
                  `${((Number(lpAmount) / Number(lpBalance)) * 100).toFixed(2)}%`,
              }}
              maxValue={Number(lpBalance) || 0}
              minValue={0}
              step={1}
              value={Number(lpAmount)}
              onChange={(value: number) => {
                console.log(value);
                if (value > Number(lpBalance)) {
                  value = Number(lpBalance);
                }
                const roundedValue = Math.round(value * 1000000) / 1000000;

                onChangeLpInput({
                  target: { value: roundedValue.toString() },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
            />
            <div className="text-right text-sm text-gray-500 mt-2">
              Balance: {lpBalance}
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <div className=" border border-gray-200 p-2 rounded-lg">
              <FaArrowDown className="text-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-500 mb-2">SY Amount</div>
              <div className="text-xl text-gray-800">
                ≈ {syAmount || "0.00"}
              </div>
              <div className="text-right text-sm text-gray-500">
                Balance: {syBalance}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-500 mb-2">PT Amount</div>
              <div className="text-xl text-gray-800">
                ≈ {ptAmount || "0.00"}
              </div>
              <div className="text-right text-sm text-gray-500">
                Balance: {ptBalance}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        className="w-full mt-6 bg-blue-500 text-white rounded-xl px-6 py-3 font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={!syAmount}
        onClick={
          activeTab === "add" ? handleAddLiquidity : handleRemoveLiquidity
        }
      >
        {!syAmount
          ? "Enter an amount"
          : activeTab === "add"
            ? "Add Liquidity"
            : "Remove Liquidity"}
      </button>

      <Modal
        isOpen={showModal}
        size="lg"
        title={
          txResult?.success ? "Transaction Successful" : "Transaction Failed"
        }
        type={txResult?.success ? "success" : "error"}
        onAfterClose={() => {
          setSyAmount("");
          setPtAmount("");
          if (account?.address) {
            debouncedFetchBalances(account?.address, marketId);
            fetchMarket();
          }
          setLpAmount("");
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

export default LiquidityWidget;
