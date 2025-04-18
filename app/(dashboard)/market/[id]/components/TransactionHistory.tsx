"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";

import { formatTime } from "@/utils/funcs";
import { getImpliedRate } from "@/utils/funcs";
import { compressSuiAddress } from "@/utils/funcs";
import { useTx } from "@/app/contexts/TxContext";

interface Transaction {
  user: string;
  action: "Short Yield" | "Long Yield";
  impliedAPY: string;
  syAmount: string;
  ptAmount: string;
  time: string;
}

//
const getTransactions = async (stateId: string, type: string) => {
  const API_URL = `https://api-kamo-dev.nysm.work/api/transaction/history?page=1&pageSize=20&stateId=${stateId}&type=${type}`;

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();

    return result.data || [];
  } catch (error) {
    console.error("Error fetching transactions:", error);

    return [];
  }
};

export interface TransactionHistoryProps {
  marketId: string;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  marketId,
}) => {
  const { triggerRefresh } = useTx();
  const [activeTab, setActiveTab] = useState<"Trades" | "Liquidity">("Trades");
  const [selectedAction, setSelectedAction] = useState<string>("All Actions");
  const [selectedValue, setSelectedValue] = useState<string>("$50 & above");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [firstFetch, setFirstFetch] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!firstFetch) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        const transactionsData = await getTransactions(
          marketId,
          activeTab === "Liquidity" ? "LP" : "swap",
        );
        const now = new Date();
        const txs = transactionsData.map((tx: any) => ({
          user: compressSuiAddress(tx.sender),
          action:
            activeTab === "Liquidity"
              ? tx.type === "AddLiquidityEvent"
                ? "Add Liquidity"
                : "Remove Liquidity"
              : tx.type === "SwapSyForExactPtEvent"
                ? "Short Yield"
                : "Long Yield",
          impliedAPY: getImpliedRate(BigInt(tx.lnImpliedRate)).substring(0, 5),
          syAmount: (parseInt(tx.syAmount) / 10 ** 6).toFixed(2) + " SY",
          ptAmount: (parseInt(tx.ptAmount) / 10 ** 6).toFixed(2) + " PT",
          time: formatTime(now.getTime() - tx.timestampMs),
        }));

        console.log("Processed transactions:", txs);
        setTransactions(txs);
        setFirstFetch(false);
      } catch (error) {
        console.error("Error processing transactions:", error);
        setTransactions([]);
      }
    };

    fetchTransactions();
  }, [activeTab, triggerRefresh, marketId]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#1C2026]">
          Market Transactions
        </h2>
        <div className="flex items-center gap-2">
          <select
            className="appearance-none bg-[#F8FAFD] text-[#5E6B81] px-3 py-1 text-sm rounded-lg border border-[#E2E8F0]"
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
          >
            <option>All Actions</option>
            <option>Short Yield</option>
            <option>Long Yield</option>
          </select>
          <select
            className="appearance-none bg-[#F8FAFD] text-[#5E6B81] px-3 py-1 text-sm rounded-lg border border-[#E2E8F0]"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option>$50 & above</option>
            <option>$100 & above</option>
            <option>$500 & above</option>
          </select>
          <div className="flex rounded-lg overflow-hidden border border-[#E2E8F0]">
            <Button
              className={`px-3 py-1 text-sm ${
                activeTab === "Trades"
                  ? "bg-[#2E67F6] text-white"
                  : "bg-[#F8FAFD] text-[#5E6B81]"
              }`}
              onClick={() => setActiveTab("Trades")}
            >
              Trades
            </Button>
            <Button
              className={`px-3 py-1 text-sm ${
                activeTab === "Liquidity"
                  ? "bg-[#2E67F6] text-white"
                  : "bg-[#F8FAFD] text-[#5E6B81]"
              }`}
              onClick={() => setActiveTab("Liquidity")}
            >
              Liquidity
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-[#E8E3CA] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-[#5E6B81] text-xs">
              <th className="text-left py-3 px-4">User</th>
              <th className="text-left py-3 px-4">Action</th>
              <th className="text-left py-3 px-4">Implied APY</th>
              <th className="text-left py-3 px-4">SY</th>
              <th className="text-left py-3 px-4">PT</th>
              <th className="text-left py-3 px-4">Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={index}
                className="border-t border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors text-sm"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    {tx.user}
                    <button className="text-[#5E6B81] hover:text-[#2E67F6]">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`${
                      tx.action === "Short Yield"
                        ? "text-[#0FA67F]"
                        : "text-[#2E67F6]"
                    }`}
                  >
                    {tx.action}
                  </span>
                </td>
                <td className="py-3 px-4">{tx.impliedAPY}</td>
                <td className="py-3 px-4">{tx.syAmount}</td>
                <td className="py-3 px-4">{tx.ptAmount}</td>
                <td className="py-3 px-4">{tx.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
