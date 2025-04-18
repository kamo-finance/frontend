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
import { addToast, Button, Link } from "@heroui/react";
import { Transaction } from "@mysten/sui/transactions";

import Modal from "./Modal";
import AmountSelector from "./AmountSelector";

import { useShowTx, useTx } from "@/app/contexts/TxContext";

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

interface TokenSwapInput {
  className?: string;
  title: string;
  amount: string;
  token: Token;
  showBalance?: boolean;
  showAmountSelector?: boolean;
  additionalInfo?: React.ReactNode;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTokenSelect: () => void;
  onPercentSelect?: (amount: string) => void;
}

const initialTokens: Token[] = [
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

const FETCH_COOLDOWN = 5000; // 5 seconds cooldown

const TokenSwapInput: React.FC<TokenSwapInput> = ({
  className = "",
  title,
  amount,
  token,
  showBalance = true,
  showAmountSelector = false,
  additionalInfo,
  onAmountChange,
  onTokenSelect,
  onPercentSelect,
}) => (
  <div
    className={`bg-foreground-100 rounded-2xl border-2 border-foreground p-2 ${className}`}
  >
    <div className="text-sm text-foreground font-semibold mb-1">{title}</div>
    <div className="flex items-center justify-between">
      <input
        className="bg-transparent text-base font-semibold outline-none w-full text-foreground"
        placeholder="0"
        type="text"
        value={amount}
        onChange={onAmountChange}
      />
      <Button
        className="text-sm"
        endContent={<FaChevronDown className="text-foreground-100" size={16} />}
        onPress={onTokenSelect}
      >
        {token.symbol}
      </Button>
    </div>

    {showAmountSelector && onPercentSelect && (
      <AmountSelector
        balance={token.balance}
        className="mt-1"
        onAmountChange={onPercentSelect}
      />
    )}

    {showBalance && (
      <div className="text-right text-xs text-gray-500">
        Balance: {token.balance}
      </div>
    )}

    {additionalInfo}
  </div>
);

const TokenListItem: React.FC<{
  token: Token;
  onSelect: (token: Token) => void;
}> = ({ token, onSelect }) => (
  <div
    className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
    role="button"
    onClick={() => onSelect(token)}
  >
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
        <span className="text-blue-600 font-medium">{token.symbol[0]}</span>
      </div>
      <div className="text-left">
        <div className="text-gray-800 font-medium">{token.symbol}</div>
        <div className="text-sm text-gray-500">{token.name}</div>
      </div>
    </div>
    <div className="text-right text-gray-600">{token.balance}</div>
  </div>
);

const TradeWidget: React.FC<TradeWidgetProps> = ({ marketId }) => {
  const [mounted, setMounted] = useState(false);
  const { showTx } = useShowTx();
  const { triggerRefresh } = useTx();
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showTxResultModal, setShowTxResultModal] = useState(false);
  const [txResult, setTxResult] = useState<TransactionResult | null>(null);
  const [activeInput, setActiveInput] = useState<"from" | "to" | null>(null);
  const [fromToken, setFromToken] = useState<Token>(initialTokens[0]);
  const [toToken, setToToken] = useState<Token>(initialTokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tokenList, setTokenList] = useState<Token[]>(initialTokens);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(initialTokens);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [market, setMarket] = useState<YieldMarket | null>(null);
  const [syUsed, setSyUsed] = useState(0);
  const [poolInfo, setPoolInfo] = useState({
    totalSy: "",
    totalPt: "",
    totalLp: "",
  });

  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const modalRef = useRef<HTMLDivElement>(null);

  const fetchMarket = useCallback(async () => {
    try {
      const yieldMarket = await YieldMarket.GetFromState({ stateId: marketId });
      const totalSy = (Number(yieldMarket.market.totalSy) / 10 ** 6).toString();
      const totalPt = (Number(yieldMarket.market.totalPt) / 10 ** 6).toString();
      const totalLp = yieldMarket.market.lpSupply.value.toString();

      setPoolInfo({ totalSy, totalPt, totalLp });
      setMarket(yieldMarket);
    } catch (error) {
      console.error("Error fetching market:", error);
      addToast({
        title: "Error",
        description: "Failed to fetch market information",
        severity: "danger",
      });
    }
  }, [marketId]);

  const debouncedFetchBalances = useCallback(
    debounce(async (address: string) => {
      if (!address) return;
      const now = Date.now();

      if (now - lastFetchTime < FETCH_COOLDOWN) return;

      try {
        setIsLoading(true);
        const kamoClient = new KamoClient({ client: suiClient });
        const balances = await kamoClient.getBalances({
          stateId: marketId,
          owner: address,
        });

        const formatBalance = (balance: number) =>
          (balance / 10 ** 6).toString();

        const updatedTokens = initialTokens.map((token) => {
          if (token.type === "SY") {
            return {
              ...token,
              balance: formatBalance(Number(balances.syBalance.totalBalance)),
            };
          }
          if (token.type === "PT") {
            return {
              ...token,
              balance: formatBalance(Number(balances.ptBalance.totalBalance)),
            };
          }
          if (token.type === "YT") {
            return {
              ...token,
              balance: formatBalance(Number(balances.yoBalance)),
            };
          }

          return token;
        });

        setTokenList(updatedTokens);

        // Update current tokens with new balances
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
          description: "Failed to fetch balances",
          severity: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000),
    [lastFetchTime, fromToken.symbol, toToken.symbol, marketId, triggerRefresh],
  );

  // Calculate exchange amount based on input and token types
  const calculateExchangeAmount = useCallback(
    async (amount: string) => {
      if (!market || !amount) return "0";

      const inputAmount = parseFloat(amount);

      if (isNaN(inputAmount) || inputAmount <= 0) return "0";

      try {
        const kamoTx = newKamoTransaction({ stateId: marketId });
        const exchangeRate = await kamoTx.getSyExchangeRate();
        const bigIntAmount = BigInt(Math.floor(inputAmount * 10 ** 6));

        let resultAmount = "0";

        if (fromToken.type === "SY" && toToken.type === "PT") {
          const { ptOut, syUsed } = await improvedBinarySearchPtAmount(
            marketId,
            bigIntAmount,
            exchangeRate,
          );

          if (syUsed !== bigIntAmount) {
            setSyUsed(Number(syUsed) / 10 ** 6);
          }
          resultAmount = (Number(ptOut) / 10 ** 6).toString();
        } else if (fromToken.type === "PT" && toToken.type === "SY") {
          const result = market.swapExactPtForSy({
            ptAmount: bigIntAmount,
            exchangeRate,
            now: Date.now(),
          });

          resultAmount = (Number(result.netSyToAccount) / 10 ** 6).toString();
        } else if (fromToken.type === "SY" && toToken.type === "YT") {
          const result = await market.swapExactSyForYo({
            syAmount: bigIntAmount,
            syExchangeRate: exchangeRate,
            now: Date.now(),
          });

          resultAmount = (Number(result) / 10 ** 6).toString();
        } else if (fromToken.type === "YT" && toToken.type === "SY") {
          const result = market.swapExactYoForSy({
            yoAmount: bigIntAmount,
            syExchangeRate: exchangeRate,
            now: Date.now(),
          });

          resultAmount = (Number(result) / 10 ** 6).toString();
        }

        return resultAmount;
      } catch (error) {
        console.error("Error calculating exchange amount:", error);
        addToast({
          title: "Error",
          description: `Failed to calculate exchange amount`,
          severity: "danger",
        });

        return "0";
      }
    },
    [fromToken.type, toToken.type, market, marketId],
  );

  // Initialize component
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch market data on mount
  useEffect(() => {
    if (mounted) fetchMarket();
  }, [mounted, fetchMarket, triggerRefresh]);

  // Fetch balances when account changes
  useEffect(() => {
    if (!mounted || !account?.address || isLoading) return;
    debouncedFetchBalances(account.address);

    return () => debouncedFetchBalances.cancel();
  }, [
    mounted,
    account?.address,
    debouncedFetchBalances,
    isLoading,
    triggerRefresh,
  ]);

  // Handle outside clicks for token modal
  useEffect(() => {
    if (!mounted || !showTokenModal) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowTokenModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mounted, showTokenModal]);

  // Filter tokens based on search query
  useEffect(() => {
    setFilteredTokens(
      tokenList.filter(
        (token) =>
          token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [searchQuery, tokenList]);

  // Handle input change and calculate exchange amount
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (value === "" || !/^\d*\.?\d*$/.test(value)) {
      setFromAmount("");
      setToAmount("");

      return;
    }

    setFromAmount(value);
    const calculatedAmount = await calculateExchangeAmount(value);

    setToAmount(calculatedAmount);
  };

  // Handle token selection
  const handleTokenSelect = (token: Token) => {
    if (activeInput === "from") {
      setFromToken(token);
    } else {
      setToToken(token);
    }
    setShowTokenModal(false);
    setSearchQuery("");

    // Recalculate amounts with the new token
    if (fromAmount) {
      calculateExchangeAmount(fromAmount).then(setToAmount);
    }
  };

  // Swap tokens and amounts
  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // Execute trade transaction
  const handleTrade = async () => {
    if (!market || !account?.address || !fromAmount) return;

    try {
      const kamoTx = newKamoTransaction({ stateId: marketId });
      const tx = new Transaction();
      const bigIntAmount = BigInt(Math.floor(parseFloat(fromAmount) * 10 ** 6));

      if (fromToken.type === "SY" && toToken.type === "PT") {
        await kamoTx.swapSyForPt({
          syAmount: bigIntAmount,
          sender: account.address,
          tx,
        });
      } else if (fromToken.type === "PT" && toToken.type === "SY") {
        await kamoTx.swapPtForSy({
          ptAmount: bigIntAmount,
          sender: account.address,
          tx,
        });
      } else if (fromToken.type === "SY" && toToken.type === "YT") {
        await kamoTx.swapSyForYo({
          syAmount: bigIntAmount,
          sender: account.address,
          tx,
        });
      } else if (fromToken.type === "YT" && toToken.type === "SY") {
        await kamoTx.swapYoForSy({
          yoAmount: bigIntAmount,
          sender: account.address,
          tx,
        });
      }

      tx.setSender(account.address);
      tx.setGasBudget(1000000000);
      signAndExecuteTransaction(
        {
          transaction: tx,
          chain: "sui:testnet",
        },
        {
          onSuccess: (result) => {
            showTx({
              title: "Transaction successful!",
              content: `You successfully traded ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}.`,
              txDigest: result.digest,
              type: "success",
            });
          },
          onError: (error) => {
            showTx({
              title: "Transaction failed!",
              content: `Transaction failed: ${error.message}`,
              type: "error",
            });
          },
        },
      );
    } catch (error) {
      console.error("Error executing trade:", error);
      addToast({
        title: "Error",
        description: `Failed to execute trade`,
        severity: "danger",
      });
    }
  };

  if (!mounted) {
    return <div className="bg-white rounded-2xl shadow-sm p-4 min-h-[200px]" />;
  }

  return (
    <>
      <div className="rounded-2xl shadow-sm p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {["Swap", "Limit", "DCA"].map((option, i) => (
              <Button
                key={i}
                color={i === 0 ? "secondary" : undefined}
                size="sm"
              >
                {option}
              </Button>
            ))}
          </div>
          <Button
            className="text-gray-400 hover:text-gray-600 transition-colors"
            size="sm"
          >
            <FaTimes />
          </Button>
        </div>

        <div className="space-y-1">
          <TokenSwapInput
            showAmountSelector
            additionalInfo={
              syUsed > 0 ? (
                <div className="text-right text-xs text-gray-500">
                  Sy used: {syUsed}
                </div>
              ) : null
            }
            amount={fromAmount}
            showBalance={false}
            title="You pay"
            token={fromToken}
            onAmountChange={handleInputChange}
            onPercentSelect={(amount) => {
              setFromAmount(amount);
              handleInputChange({
                target: { value: amount },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
            onTokenSelect={() => {
              setActiveInput("from");
              setShowTokenModal(true);
            }}
          />

          <div className="flex justify-center -my-1 relative z-10">
            <Button isIconOnly size="sm" onPress={handleSwapTokens}>
              <FaExchangeAlt size={12} />
            </Button>
          </div>

          <div className="bg-foreground-100 rounded-2xl border-2 border-foreground p-2">
            <div className="text-sm text-foreground font-semibold mb-1">
              You receive
            </div>
            <div className="flex items-center justify-between">
              <input
                readOnly
                className="bg-transparent text-base font-semibold outline-none w-full text-foreground"
                placeholder="0"
                type="text"
                value={toAmount}
              />
              <Button
                className="text-sm"
                endContent={
                  <FaChevronDown className="text-foreground-100" size={16} />
                }
                onPress={() => {
                  setActiveInput("to");
                  setShowTokenModal(true);
                }}
              >
                {toToken.symbol}
              </Button>
            </div>
            <div className="text-right text-xs text-gray-500 pt-3">
              Balance: {toToken.balance}
            </div>
          </div>
        </div>

        <Button
          fullWidth
          className="mt-1"
          color="primary"
          disabled={!fromAmount}
          size="md"
          onPress={handleTrade}
        >
          {fromAmount ? "Trade" : "Enter an amount"}
        </Button>
      </div>

      {/* Token Selection Modal */}
      <Modal
        isOpen={showTokenModal}
        size="lg"
        title="Select a token"
        onClose={() => setShowTokenModal(false)}
      >
        <div className="space-y-4">
          <div className="relative">
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
              <TokenListItem
                key={token.symbol}
                token={token}
                onSelect={handleTokenSelect}
              />
            ))}
          </div>
        </div>
      </Modal>

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
              debouncedFetchBalances(account.address);
            }
          }
        }}
        onClose={() => setShowTxResultModal(false)}
      >
        <div className="w-full">
          <p className="break-words w-full">{txResult?.message}</p>
          {txResult?.success && txResult?.explorerUrl && (
            <Link
              className="underline"
              color="foreground"
              href={txResult.explorerUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              View on Explorer
            </Link>
          )}
        </div>
      </Modal>
    </>
  );
};

export default TradeWidget;
