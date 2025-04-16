"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { FixedPoint64 } from "@kamo-finance/ts-sdk";

interface Transaction {
	user: string;
	action: "Short Yield" | "Long Yield";
	impliedAPY: string;
	syAmount: string;
	ptAmount: string;
	time: string;
}

//
const getTransactions = async (type: string) => {
	const API_URL = `https://api-kamo-dev.nysm.work/api/transaction/history?page=1&pageSize=10&stateId=0xf27f14dffb936d97f3641217b22b8c013e38822cbccfdae12f9eb25793b91f74&type=${type}`;

	const response = await fetch(API_URL);
	const data = ((await response.json()) as any).data;
	console.log(data);
	return data;
};

const compressSuiAddress = (address: string) => {
	return address.slice(0, 6) + "..." + address.slice(-4);
};

const formatTime = (time: number) => {
	const d = Math.floor(time / (1000 * 60 * 60 * 24));
	const h = Math.floor(time / (1000 * 60 * 60));
	const m = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
	const s = Math.floor((time % (1000 * 60)) / 1000);
	let res = "";
	if (d > 0) {
		res = `${d}d`;
	}
	if (h > 0) {
		res = `${h}h`;
	}
	if (m > 0) {
		res = `${m}m`;
	}
	if (s > 0) {
		res = `${s}s`;
	}
	return res;
};

const getImpliedRate = (value: bigint): string => {
	const lnImpliedRate = new FixedPoint64(value);
	const impliedRate = FixedPoint64.Exp(lnImpliedRate).decimalValue().toString();
	return impliedRate;
};

export const TransactionHistory: React.FC = () => {
	const [activeTab, setActiveTab] = useState<"Trades" | "Liquidity">("Trades");
	const [selectedAction, setSelectedAction] = useState<string>("All Actions");
	const [selectedValue, setSelectedValue] = useState<string>("$50 & above");
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	useEffect(() => {
		const fetchTransactions = async () => {
			if (activeTab === "Liquidity") {
				const transactionsData = await getTransactions("LP");
				const now = new Date();
				const txs = transactionsData.map((tx: any) => ({
					user: compressSuiAddress(tx.sender),
					action:
						tx.type === "AddLiquidityEvent"
							? "Add Liquidity"
							: "Remove Liquidity",
					impliedAPY: getImpliedRate(BigInt(tx.lnImpliedRate)).substring(0, 2),
					syAmount: (parseInt(tx.syAmount) / 10 ** 6).toFixed(2) + " SY",
					ptAmount: (parseInt(tx.ptAmount) / 10 ** 6).toFixed(2) + " PT",
					time: formatTime(now.getTime() - tx.timestampMs),
				}));
				setTransactions(txs);
			} else {
				const transactionsData = await getTransactions("swap");
				const now = new Date();
				const txs = transactionsData.map((tx: any) => ({
					user: compressSuiAddress(tx.sender),
					action:
						tx.type === "SwapSyForExactPtEvent" ? "Short Yield" : "Long Yield",
					impliedAPY: getImpliedRate(BigInt(tx.lnImpliedRate)).substring(0, 2),
					syAmount: (parseInt(tx.syAmount) / 10 ** 6).toFixed(2) + " SY",
					ptAmount: (parseInt(tx.ptAmount) / 10 ** 6).toFixed(2) + " PT",
					time: formatTime(now.getTime() - tx.timestampMs),
				}));
				setTransactions(txs);
			}
		};
		fetchTransactions();
	}, [activeTab]);

	// const transactions: Transaction[] = [
	// 	{
	// 		user: "0x8392...6883",
	// 		action: "Short Yield",
	// 		impliedAPY: "8.092%",
	// 		value: "$5,001.02",
	// 		notionalSize: "5,049.68 PT",
	// 		time: "<1m",
	// 	},
	// 	{
	// 		user: "0x8392...6883",
	// 		action: "Long Yield",
	// 		impliedAPY: "8.094%",
	// 		value: "$3,051.99",
	// 		notionalSize: "3,082.35 PT",
	// 		time: "2m",
	// 	},
	// 	// Add more mock data
	// 	{
	// 		user: "0x7822...7ac8",
	// 		action: "Short Yield",
	// 		impliedAPY: "8.093%",
	// 		value: "$336,154",
	// 		notionalSize: "339,443 PT",
	// 		time: "4m",
	// 	},
	// 	{
	// 		user: "0x9dae...79cc",
	// 		action: "Long Yield",
	// 		impliedAPY: "8.212%",
	// 		value: "$6,046.56",
	// 		notionalSize: "6,107.49 PT",
	// 		time: "5m",
	// 	},
	// 	{
	// 		user: "0x5179...b341",
	// 		action: "Long Yield",
	// 		impliedAPY: "8.21%",
	// 		value: "$1,980.05",
	// 		notionalSize: "2,000 PT",
	// 		time: "8m",
	// 	},
	// ];

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold text-[#1C2026]">
					Market Transactions
				</h2>
				<div className="flex items-center gap-2">
					<select
						value={selectedAction}
						onChange={(e) => setSelectedAction(e.target.value)}
						className="appearance-none bg-[#F8FAFD] text-[#5E6B81] px-3 py-1 text-sm rounded-lg border border-[#E2E8F0]"
					>
						<option>All Actions</option>
						<option>Short Yield</option>
						<option>Long Yield</option>
					</select>
					<select
						value={selectedValue}
						onChange={(e) => setSelectedValue(e.target.value)}
						className="appearance-none bg-[#F8FAFD] text-[#5E6B81] px-3 py-1 text-sm rounded-lg border border-[#E2E8F0]"
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
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
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
