"use client";

import React from "react";

interface PoolInfoProps {
	totalSy: string;
	totalPt: string;
	totalLp: string;
}

const PoolInfo: React.FC<PoolInfoProps> = ({ totalSy, totalPt, totalLp }) => {
	const formatValue = (value: string, type: "sy" | "pt" | "lp") => {
		return type === "lp" ? Number(value) : (Number(value) / 10 ** 6).toFixed(6);
	};

	return (
		<div className="mb-8">
			<div className="text-gray-500 mb-4">Pool Info</div>
			<div className="grid grid-cols-3 gap-4">
				<div className="bg-blue-50 rounded-xl p-4">
					<div className="text-blue-600 text-sm">Total SY In Pool</div>
					<div className="text-blue-700 text-xl font-semibold mt-2">
						{formatValue(totalSy, "sy")}
					</div>
				</div>
				<div className="bg-green-50 rounded-xl p-4">
					<div className="text-green-600 text-sm">Total PT In Pool</div>
					<div className="text-green-700 text-xl font-semibold mt-2">
						{formatValue(totalPt, "pt")}
					</div>
				</div>
				<div className="bg-purple-50 rounded-xl p-4">
					<div className="text-purple-600 text-sm">Total LP Token In Pool</div>
					<div className="text-purple-700 text-xl font-semibold mt-2">
						{formatValue(totalLp, "lp")}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PoolInfo;
