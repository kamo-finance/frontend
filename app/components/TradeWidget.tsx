"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaExchangeAlt,
  FaChevronDown,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import {
  improvedBinarySearchPtAmount,
  KamoClient,
  newKamoTransaction,
  suiClient,
  YieldMarket,
} from "@kamo-finance/ts-sdk";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { debounce } from "lodash";
import { addToast } from "@heroui/react";
import { Transaction } from "@mysten/sui/transactions";

import Modal from "./Modal";
import TokenBalances from "./TokenBalances";
import AmountSelector from "./AmountSelector";

interface Token {
  symbol: string;
  name: string;
  icon?: string;
  balance?: string;
  type: string;
}

interface TransactionResult {
  success: boolean;
  message: string;
  explorerUrl?: string;
}

interface TradeWidgetProps {
  marketId: string;
}

const tokens: Token[] = [
  { symbol: "KUSDC", name: "Kamo USDC, SY Token", balance: "0", type: "SY" },
  {
    symbol: "PT-KUSDC",
    name: "Principal Token for KUSDC",
    balance: "0",
    type: "PT",
  },
  {
    symbol: "YT-KUSDC",
    name: "Yield Token for KUSDC",
    balance: "0",
    type: "YT",
  },
];

const TradeWidget: React.FC<TradeWidgetProps> = ({ marketId }) => {
  const [mounted, setMounted] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showTxResultModal, setShowTxResultModal] = useState(false);
  const [txResult, setTxResult] = useState<TransactionResult | null>(null);
  const [activeInput, setActiveInput] = useState<"from" | "to" | null>(null);
  const [fromToken, setFromToken] = useState<Token>(tokens[0]);
  const [toToken, setToToken] = useState<Token>(tokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tokenList, setTokenList] = useState<Token[]>(tokens);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(tokens);
  const account = useCurrentAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const FETCH_COOLDOWN = 5000; // 5 seconds cooldown
  const [market, setMarket] = useState<YieldMarket | null>(null);
  const [syUsed, setSyUsed] = useState(0);
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [totalSy, setTotalSy] = useState("");
  const [totalPt, setTotalPt] = useState("");
  const [totalLp, setTotalLp] = useState("");

  useEffect(() => {
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

    fetchMarket();
  }, [marketId, mounted]);

  const modalRef = useRef<HTMLDivElement>(null);

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

        const updatedTokens = tokens.map((token) => {
          if (token.type === "SY") {
            return {
              ...token,
              balance: (
                Number(balances.syBalance.totalBalance) /
                10 ** 6
              ).toString(),
            };
          }
          if (token.type === "PT") {
            return {
              ...token,
              balance: (
                Number(balances.ptBalance.totalBalance) /
                10 ** 6
              ).toString(),
            };
          }
          if (token.type === "YT") {
            return {
              ...token,
              balance: (Number(balances.yoBalance) / 10 ** 6).toString(),
            };
          }

          return token;
        });

        setTokenList(updatedTokens);

        // Update fromToken and toToken if they exist in the list
        const updatedFromToken = updatedTokens.find(
          (t) => t.symbol === fromToken.symbol,
        );
        const updatedToToken = updatedTokens.find(
          (t) => t.symbol === toToken.symbol,
        );

        if (updatedFromToken) setFromToken(updatedFromToken);
        if (updatedToToken) setToToken(updatedToToken);

        setLastFetchTime(now);
      } catch (error) {
        console.error("Error fetching balances:", error);
        addToast({
          title: "Error",
          description: "Failed to fetch balances. Please try again later.",
          severity: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000),
    [lastFetchTime, fromToken.symbol, toToken.symbol],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!account?.address || isLoading) return;
    debouncedFetchBalances(account.address, marketId);

    return () => {
      debouncedFetchBalances.cancel();
    };
  }, [mounted, account?.address, marketId, debouncedFetchBalances, isLoading]);

  useEffect(() => {
    if (!mounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowTokenModal(false);
      }
    };

    if (showTokenModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mounted, showTokenModal]);

  useEffect(() => {
    setFilteredTokens(
      tokenList.filter(
        (token) =>
          token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [searchQuery, tokenList]);

  const handleTokenSelect = (token: Token) => {
    if (activeInput === "from") {
      setFromToken(token);
    } else {
      setToToken(token);
    }
    setShowTokenModal(false);
    setSearchQuery("");
  };

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!market) return;
    const value = e.target.value.trim();

    if (value === "") {
      setFromAmount("");
      setToAmount("");

      return;
    }

    // Kiểm tra xem giá trị nhập vào có phải là số hợp lệ không
    if (!/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setFromAmount(value);

    const fromAmount = parseFloat(value);

    if (isNaN(fromAmount) || fromAmount <= 0) {
      setToAmount("");

      return;
    }

    try {
      const kamoTx = newKamoTransaction({
        stateId: marketId,
      });
      const exchangeRate = await kamoTx.getSyExchangeRate();

      if (fromToken.type === "SY" && toToken.type === "PT") {
        const { ptOut, syUsed } = await improvedBinarySearchPtAmount(
          marketId,
          BigInt(Math.floor(fromAmount * 10 ** 6)),
          exchangeRate,
        );

        if (syUsed !== BigInt(fromAmount * 10 ** 6)) {
          setSyUsed(Number(syUsed) / 10 ** 6);
        }
        setToAmount((Number(ptOut) / 10 ** 6).toString());
      } else if (fromToken.type === "PT" && toToken.type === "SY") {
        const toAmount = market.swapExactPtForSy({
          ptAmount: BigInt(Math.floor(fromAmount * 10 ** 6)),
          exchangeRate: exchangeRate,
          now: Date.now(),
        });

        setToAmount((Number(toAmount.netSyToAccount) / 10 ** 6).toString());
      }
    } catch (error) {
      addToast({
        title: "Error",
        description: `Failed to calculate exchange amount: ${error}`,
        severity: "danger",
      });
      setToAmount("");
    }
  };

  const handleTrade = async () => {
    if (!market) return;
    if (!account?.address) return;
    const kamoTx = newKamoTransaction({
      stateId: marketId,
    });
    const tx = new Transaction();

    if (fromToken.type === "SY" && toToken.type === "PT") {
      if (syUsed > 0) {
        await kamoTx.swapSyForPt({
          syAmount: BigInt(syUsed),
          sender: account.address,
          tx: tx,
        });
      } else {
        await kamoTx.swapSyForPt({
          syAmount: BigInt(Math.floor(parseFloat(fromAmount) * 10 ** 6)),
          sender: account.address,
          tx: tx,
        });
      }
    } else if (fromToken.type === "PT" && toToken.type === "SY") {
      await kamoTx.swapPtForSy({
        ptAmount: BigInt(Math.floor(parseFloat(fromAmount) * 10 ** 6)),
        sender: account.address,
        tx: tx,
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
          setShowTxResultModal(true);
        },
        onError: (error) => {
          setTxResult({
            success: false,
            message: `Transaction failed: ${error.message}`,
          });
          setShowTxResultModal(true);
        },
      },
    );
  };

  if (!mounted) {
    return <div className="bg-white rounded-2xl shadow-sm p-4 min-h-[200px]" />;
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <TokenBalances
          textLp="Total LP Token In Pool"
          textPt="Total PT In Pool"
          textSy="Total SY In Pool"
          textTitle="Pool Info"
          totalLp={totalLp}
          totalPt={totalPt}
          totalSy={totalSy}
        />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
              Swap
            </button>
            <button className="text-gray-500 px-4 py-2 text-sm font-medium hover:text-gray-700">
              Limit
            </button>
            <button className="text-gray-500 px-4 py-2 text-sm font-medium hover:text-gray-700">
              DCA
            </button>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-2">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-2">You pay</div>
            <div className="flex items-center justify-between">
              <input
                className="bg-transparent text-2xl outline-none w-full text-gray-800"
                placeholder="0"
                type="text"
                value={fromAmount}
                onChange={onChangeInput}
              />
              <button
                className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                onClick={() => {
                  setActiveInput("from");
                  setShowTokenModal(true);
                }}
              >
                <span className="text-gray-700">{fromToken.symbol}</span>
                <FaChevronDown className="text-gray-400" size={12} />
              </button>
            </div>
            <AmountSelector
              balance={fromToken.balance}
              className="mt-2"
              onAmountChange={(amount) => {
                setFromAmount(amount);
                onChangeInput({
                  target: { value: amount },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
            />
            {syUsed > 0 && (
              <div className="text-right text-sm text-gray-500 mt-2">
                Sy used: {syUsed}
              </div>
            )}
          </div>

          <div className="flex justify-center -my-2 relative z-10">
            <button
              className="bg-white border border-gray-200 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => {
                setFromToken(toToken);
                setToToken(fromToken);
                const temp = fromAmount;

                setFromAmount(toAmount);
                setToAmount(temp);
              }}
            >
              <FaExchangeAlt className="text-blue-500" size={14} />
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-2">You receive</div>
            <div className="flex items-center justify-between">
              <input
                className="bg-transparent text-2xl outline-none w-full text-gray-800"
                placeholder="0"
                type="text"
                value={toAmount}
                onChange={onChangeInput}
              />
              <button
                className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                onClick={() => {
                  setActiveInput("to");
                  setShowTokenModal(true);
                }}
              >
                <span className="text-gray-700">{toToken.symbol}</span>
                <FaChevronDown className="text-gray-400" size={12} />
              </button>
            </div>
            <div className="text-right text-sm text-gray-500 mt-2">
              Balance: {toToken.balance}
            </div>
          </div>
        </div>

        <button
          className="w-full bg-blue-500 text-white rounded-xl px-4 py-3 mt-6 font-medium hover:bg-blue-600 transition-colors"
          disabled={!fromAmount}
          onClick={handleTrade}
        >
          {fromAmount ? "Trade" : "Enter an amount"}
        </button>
      </div>

      {/* Token Selection Modal */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Select a token
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowTokenModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="relative mb-4">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full bg-gray-50 text-gray-800 rounded-lg pl-10 pr-4 py-3 outline-none border border-gray-200 focus:border-blue-500"
                placeholder="Search coin name or type"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredTokens.map((token) => (
                <button
                  key={token.symbol}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => handleTokenSelect(token)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {token.symbol[0]}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-gray-800 font-medium">
                        {token.symbol}
                      </div>
                      <div className="text-sm text-gray-500">{token.name}</div>
                    </div>
                  </div>
                  <div className="text-right text-gray-600">
                    {token.balance}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Transaction Result Modal */}
      <Modal
        isOpen={showTxResultModal}
        size="lg"
        title={
          txResult?.success ? "Transaction Successful" : "Transaction Failed"
        }
        type={txResult?.success ? "success" : "error"}
        onAfterClose={() => {
          if (txResult?.success) {
            setFromAmount("");
            setToAmount("");
            if (account?.address) {
              debouncedFetchBalances(account.address, marketId);
            }
          }
        }}
        onClose={() => setShowTxResultModal(false)}
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
    </>
  );
};

export default TradeWidget;
