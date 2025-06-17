"use client";

import React from "react";

import { formatNumberWithCommas } from "@/utils/funcs";
interface TokenBalancesProps {
  textTitle: string;
  totalSy: string;
  textSy: string;
  totalPt: string;
  textPt: string;
  totalLp: string;
  textLp: string;
}

const TokenBalances: React.FC<TokenBalancesProps> = ({
  textTitle,
  textSy,
  textPt,
  textLp,
  totalSy,
  totalPt,
  totalLp,
}) => {
  return (
    <div className="mb-8">
      <div className="text-gray-500 mb-4">{textTitle}</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-foreground-100 rounded-xl p-4">
          <div className="text-blue-600 text-sm">{textSy}</div>
          <div className="text-blue-700 text-xl font-semibold mt-2">
            {formatNumberWithCommas(totalSy)}
          </div>
        </div>
        <div className="bg-foreground-100 rounded-xl p-4">
          <div className="text-green-600 text-sm">{textPt}</div>
          <div className="text-green-700 text-xl font-semibold mt-2">
            {formatNumberWithCommas(totalPt)}
          </div>
        </div>
        <div className="bg-foreground-100 rounded-xl p-4">
          <div className="text-purple-600 text-sm">{textLp}</div>
          <div className="text-purple-700 text-xl font-semibold mt-2">
            {formatNumberWithCommas(totalLp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenBalances;
