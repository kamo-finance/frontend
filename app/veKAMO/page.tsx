"use client";

import React, { useState } from "react";
import {
	FaInfoCircle,
	FaLock,
	FaVoteYea,
	FaChartLine,
	FaExternalLinkAlt,
} from "react-icons/fa";
import { Line, Pie } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
	ArcElement,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
	ArcElement
);

// Components
const OverviewSection = () => {
	const stats = [
		{
			label: "Total veKAMO",
			value: "40,233,780",
			color: "bg-sky-50 border-sky-200 text-sky-700",
		},
		{
			label: "Total KAMO Locked",
			value: "60,791,650",
			color: "bg-emerald-50 border-emerald-200 text-emerald-700",
		},
		{
			label: "Average APR",
			value: "50.11%",
			color: "bg-amber-50 border-amber-200 text-amber-700",
		},
		{
			label: "Avg Lock Time",
			value: "385 days",
			color: "bg-orange-50 border-orange-200 text-orange-700",
		},
	];

	return (
		<div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
			<h2 className="text-2xl font-bold mb-6 text-gray-800">veKAMO Overview</h2>
			<p className="text-gray-600 mb-6">
				Lock your KAMO to receive veKAMO and participate in protocol governance.
				Longer lock periods result in higher voting power and rewards.
			</p>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{stats.map((stat, index) => (
					<div key={index} className={`${stat.color} rounded-lg p-4 border`}>
						<p className="text-sm text-gray-600">{stat.label}</p>
						<p className="text-xl font-bold">{stat.value}</p>
					</div>
				))}
			</div>
		</div>
	);
};

const VoteWidget = () => {
	const [selectedPools, setSelectedPools] = useState<{ [key: string]: number }>(
		{}
	);
	const currentEpoch = "March 18 - March 25, 2024";
	const swapFees7Days = "$98,406";

	const pools = [
		{
			id: "1",
			icon: "🌊",
			name: "PT kUSDC - kUSDC Pool",
			platform: "OpenSea",
			maturity: "25 Sep 2025",
			communityVote: "1.056%",
			voterAPR: "7.572%",
			fees7d: "$1,984",
			projectedVote: "1.04%",
			projectedAPR: "7.722%",
			veKAMOAmount: "410,180",
		},
		{
			id: "2",
			icon: "💧",
			name: "PT haSUI - haSUI Pool",
			platform: "Reservoir",
			maturity: "19 Jun 2025",
			communityVote: "1.038%",
			voterAPR: "19.41%",
			fees7d: "$4,999",
			projectedVote: "1.677%",
			projectedAPR: "12.07%",
			veKAMOAmount: "403,268",
		},
		{
			id: "3",
			icon: "🌊",
			name: "USDT/KAMO Pool",
			platform: "OpenSea",
			maturity: "25 Sep 2025",
			communityVote: "0.6035%",
			voterAPR: "3.26%",
			fees7d: "$488",
			projectedVote: "0.5923%",
			projectedAPR: "3.337%",
			veKAMOAmount: "234,467",
		},
	];

	const handleVoteChange = (poolId: string, value: string) => {
		const numValue = parseInt(value) || 0;
		setSelectedPools({
			...selectedPools,
			[poolId]: Math.min(numValue, 100),
		});
	};

	const totalVotes = Object.values(selectedPools).reduce((a, b) => a + b, 0);
	const remainingVotes = 100 - totalVotes;

	return (
		<div className="space-y-6 relative pb-24">
			{/* Why Vote Section */}
			<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
				<h2 className="text-xl font-bold mb-4 text-gray-800">Why Vote</h2>
				<p className="text-gray-600 mb-4">
					veKAMO holders can channel KAMO incentives to selected pools through
					governance voting. Voting into a pool will:
				</p>
				<ol className="list-decimal list-inside space-y-2 text-gray-600">
					<li>Direct KAMO incentives into the pool</li>
					<li>
						Entitle you to earn a share of the pool's swap fees, proportional to
						your votes
					</li>
				</ol>

				<div className="mt-6 p-4 bg-sky-50 rounded-lg border border-sky-200">
					<div className="flex justify-between items-center">
						<span className="text-gray-600">Swap fees last 7 days</span>
						<span className="text-xl font-bold text-sky-700">
							{swapFees7Days}
						</span>
					</div>
				</div>
			</div>

			{/* Compact Voting Table */}
			<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center">
						<FaVoteYea className="text-sky-500 text-2xl mr-2" />
						<h2 className="text-xl font-bold text-gray-800">Vote for Pools</h2>
					</div>
					<div className="text-sm text-gray-500">
						Current Epoch: {currentEpoch}
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="text-gray-500 border-b border-gray-200">
								<th className="py-2 px-3">Pool</th>
								<th className="py-2 px-3">APR</th>
								<th className="py-2 px-3">7d Fees</th>
								<th className="py-2 px-3 text-right">Vote %</th>
							</tr>
						</thead>
						<tbody>
							{pools.map((pool) => (
								<tr
									key={pool.id}
									className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
								>
									<td className="py-3 px-3">
										<div className="flex items-center">
											<span className="mr-2">{pool.icon}</span>
											<div>
												<div className="font-medium text-gray-800">
													{pool.name}
												</div>
												<div className="text-xs text-gray-500">
													Current: {pool.communityVote}
												</div>
											</div>
										</div>
									</td>
									<td className="py-3 px-3">
										<div className="text-emerald-600">{pool.voterAPR}</div>
										<div className="text-xs text-gray-500">
											Est: {pool.projectedAPR}
										</div>
									</td>
									<td className="py-3 px-3 text-gray-800">{pool.fees7d}</td>
									<td className="py-3 px-3">
										<div className="flex items-center justify-end space-x-2">
											<input
												type="number"
												min="0"
												max="100"
												value={selectedPools[pool.id] || 0}
												onChange={(e) =>
													handleVoteChange(pool.id, e.target.value)
												}
												className="w-16 px-2 py-1 bg-gray-50 border border-gray-200 rounded text-right focus:ring-sky-500 focus:border-sky-500"
											/>
											<span className="text-gray-600">%</span>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Airdrop Info */}
				<div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200 flex items-center">
					<span className="text-amber-500 mr-2">💎</span>
					<span className="text-gray-800">
						Airdrop this month:{" "}
						<span className="font-bold text-amber-700">
							$1,089,772 (12.27% APR)
						</span>
					</span>
				</div>
			</div>

			{/* Fixed Vote Summary */}
			<div className="fixed bottom-0 right-0 left-0 bg-white border-t border-gray-200 p-4 z-50 shadow-lg">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-6">
						<div>
							<span className="text-gray-500">Remaining:</span>
							<span className="ml-2 text-xl font-bold text-gray-800">
								{remainingVotes}%
							</span>
						</div>
						<div>
							<span className="text-gray-500">Allocated:</span>
							<span className="ml-2 text-xl font-bold text-sky-600">
								{totalVotes}%
							</span>
						</div>
					</div>
					<button
						disabled={remainingVotes !== 0}
						className={`px-8 py-2 rounded-lg font-semibold ${
							remainingVotes === 0
								? "bg-emerald-500 text-white hover:bg-emerald-600"
								: "bg-gray-100 text-gray-400 cursor-not-allowed"
						}`}
					>
						{remainingVotes === 0
							? "Submit Votes"
							: `${remainingVotes}% Remaining`}
					</button>
				</div>
			</div>
		</div>
	);
};

const LockWidget = () => {
	const [lockDuration, setLockDuration] = useState(0);
	const [amount, setAmount] = useState("");

	const calculateBoost = (months: number): number => {
		return 1 + (months / 48) * 3; // Maximum 4x boost for 48-month lock
	};

	return (
		<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
			<div className="flex items-center mb-6">
				<FaLock className="text-emerald-500 text-2xl mr-2" />
				<h2 className="text-2xl font-bold text-gray-800">Lock KAMO</h2>
			</div>
			<div className="space-y-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						KAMO Amount
					</label>
					<input
						type="text"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-sky-500 focus:border-sky-500 text-gray-800 placeholder-gray-400"
						placeholder="Enter KAMO amount"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Lock Duration: {lockDuration} months
					</label>
					<input
						type="range"
						min="0"
						max="48"
						value={lockDuration}
						onChange={(e) => setLockDuration(parseInt(e.target.value))}
						className="w-full accent-emerald-500"
					/>
					<div className="flex justify-between text-sm text-gray-600">
						<span>0 months</span>
						<span>48 months</span>
					</div>
				</div>
				<div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
					<p className="text-sm text-emerald-700">
						Boost: {calculateBoost(lockDuration).toFixed(2)}x
					</p>
					<p className="text-sm text-emerald-700">
						veKAMO to receive:{" "}
						{amount
							? (parseFloat(amount) * calculateBoost(lockDuration)).toFixed(2)
							: "0"}{" "}
						veKAMO
					</p>
				</div>
				<button className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors font-semibold">
					Lock KAMO
				</button>
			</div>
		</div>
	);
};

// Add Historical Chart Component
const HistoricalChart = () => {
	const data = {
		labels: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		datasets: [
			{
				label: "Total veKAMO",
				data: [
					20000000, 25000000, 28000000, 32000000, 35000000, 38000000, 40000000,
					42000000, 45000000, 48000000, 52000000, 60791650,
				],
				fill: true,
				backgroundColor: "rgba(56, 189, 248, 0.1)",
				borderColor: "rgba(56, 189, 248, 0.8)",
				tension: 0.4,
			},
			{
				label: "Active Voters",
				data: [
					15000000, 18000000, 20000000, 25000000, 28000000, 30000000, 32000000,
					35000000, 38000000, 40000000, 45000000, 50000000,
				],
				fill: true,
				backgroundColor: "rgba(16, 185, 129, 0.1)",
				borderColor: "rgba(16, 185, 129, 0.8)",
				tension: 0.4,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
				labels: {
					color: "#4B5563",
					font: {
						family: "system-ui",
					},
				},
			},
			tooltip: {
				mode: "index" as const,
				intersect: false,
				backgroundColor: "rgba(255, 255, 255, 0.9)",
				titleColor: "#1F2937",
				bodyColor: "#4B5563",
				borderColor: "#E5E7EB",
				borderWidth: 1,
				padding: 12,
				bodyFont: {
					family: "system-ui",
				},
				titleFont: {
					family: "system-ui",
					weight: "bold" as const,
				},
				callbacks: {
					label: function (context: any) {
						let label = context.dataset.label || "";
						if (label) {
							label += ": ";
						}
						if (context.parsed.y !== null) {
							label += new Intl.NumberFormat("en-US").format(context.parsed.y);
						}
						return label;
					},
				},
			},
		},
		scales: {
			x: {
				grid: {
					color: "#F3F4F6",
				},
				ticks: {
					color: "#4B5563",
				},
			},
			y: {
				grid: {
					color: "#F3F4F6",
				},
				ticks: {
					color: "#4B5563",
					callback: function (value: any) {
						return new Intl.NumberFormat("en-US", {
							notation: "compact",
							compactDisplay: "short",
						}).format(value);
					},
				},
			},
		},
		interaction: {
			mode: "nearest" as const,
			axis: "x" as const,
			intersect: false,
		},
	};

	return (
		<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center">
					<FaChartLine className="text-sky-500 text-2xl mr-2" />
					<h2 className="text-xl font-bold text-gray-800">
						Historical veKAMO Distribution
					</h2>
				</div>
				<div className="text-sm text-gray-500">Last 12 months</div>
			</div>
			<div className="h-[400px]">
				<Line data={data} options={options} />
			</div>
			<div className="grid grid-cols-2 gap-4 mt-6">
				<div className="bg-sky-50 rounded-lg p-4 border border-sky-200">
					<p className="text-sm text-gray-600">Total Growth</p>
					<p className="text-xl font-bold text-sky-700">+203.95%</p>
				</div>
				<div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
					<p className="text-sm text-gray-600">Voter Participation</p>
					<p className="text-xl font-bold text-emerald-700">82.25%</p>
				</div>
			</div>
		</div>
	);
};

// Add OngoingVotesChart Component
const OngoingVotesChart = () => {
	const data = {
		labels: [
			"kUSDC Pool",
			"haSUI Pool",
			"USDT/KAMO Pool",
			"Others",
		],
		datasets: [
			{
				data: [30, 25, 15, 12, 10, 8],
				backgroundColor: [
					"rgba(255, 255, 255, 0.9)",
					"rgba(209, 213, 219, 0.9)",
					"rgba(16, 185, 129, 0.9)",
					"rgba(56, 189, 248, 0.9)",
					"rgba(124, 58, 237, 0.9)",
					"rgba(156, 163, 175, 0.9)",
				],
				borderColor: [
					"rgba(255, 255, 255, 1)",
					"rgba(209, 213, 219, 1)",
					"rgba(16, 185, 129, 1)",
					"rgba(56, 189, 248, 1)",
					"rgba(124, 58, 237, 1)",
					"rgba(156, 163, 175, 1)",
				],
				borderWidth: 2,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "right" as const,
				labels: {
					color: "#4B5563",
					font: {
						family: "system-ui",
						size: 12,
					},
					padding: 20,
				},
			},
			tooltip: {
				backgroundColor: "rgba(255, 255, 255, 0.9)",
				titleColor: "#1F2937",
				bodyColor: "#4B5563",
				borderColor: "#E5E7EB",
				borderWidth: 1,
				padding: 12,
				bodyFont: {
					family: "system-ui",
				},
				callbacks: {
					label: function (context: any) {
						return ` ${context.parsed}% of total votes`;
					},
				},
			},
		},
	};

	return (
		<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center">
					<FaVoteYea className="text-emerald-500 text-2xl mr-2" />
					<h2 className="text-xl font-bold text-gray-800">
						Current Vote Distribution
					</h2>
				</div>
				<div className="text-sm text-gray-500">
					Concludes on 17 Apr 2025 00:00 UTC
				</div>
			</div>
			<div className="h-[400px] flex items-center justify-center">
				<Pie data={data} options={options} />
			</div>
			<div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
				<p className="text-sm text-gray-600">Next Epoch</p>
				<p className="text-base font-medium text-emerald-700">
					KAMO Emissions in effect until 24 Apr 2025 00:00 UTC
				</p>
			</div>
		</div>
	);
};

export default function VeKAMOPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-4xl font-bold text-gray-800 mb-8">
					veKAMO Dashboard
				</h1>
				<OverviewSection />
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
					<HistoricalChart />
					<OngoingVotesChart />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<VoteWidget />
					<LockWidget />
				</div>
			</div>
		</div>
	);
}
