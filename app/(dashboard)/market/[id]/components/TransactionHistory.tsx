"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";

import { formatTime } from "@/utils/funcs";
import { getImpliedRate } from "@/utils/funcs";
import { compressSuiAddress } from "@/utils/funcs";
import { useTx } from "@/app/contexts/TxContext";
import Transaction from "../interfaces/transaction";
import TransactionTable from "./TransactionTable";
import TransactionCard from "./TransactionCard";

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
          activeTab === "Liquidity" ? "LP" : "swap"
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-xl font-semibold text-[#1C2026] leading-[50px] md:leading-none">
          Market Transactions
        </h2>
        <div className="grid grid-cols-2 md:flex items-center gap-2">
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
          <div className="flex col-span-2 rounded-lg overflow-hidden border border-[#E2E8F0] gap-2">
            <Button
              className={`w-full px-3 py-1 text-sm ${
                activeTab === "Trades"
                  ? "bg-[#2E67F6] text-white"
                  : "bg-[#F8FAFD] text-[#5E6B81]"
              }`}
              onClick={() => setActiveTab("Trades")}
            >
              Trades
            </Button>
            <Button
              className={`w-full px-3 py-1 text-sm ${
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
      <div className="hidden md:block">
        <TransactionTable transactions={transactions} />
      </div>
      <div className="block md:hidden">
        {transactions.map((transaction, index) => (
          <TransactionCard transactions={transaction} key={index} />
        ))}
      </div>
    </div>
  );
};
