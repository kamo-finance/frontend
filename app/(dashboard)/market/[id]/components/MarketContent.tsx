"use client";

import React, { useRef, useEffect } from "react";
import { FaChartLine, FaChartBar, FaChartArea } from "react-icons/fa";

import { YieldChart } from "./YieldChart";
import { TransactionHistory } from "./TransactionHistory";

import TokenBalances from "@/components/TokenBalances";
import MarketWidget from "@/components/MarketWidget";
import { formatNumberWithCommas } from "@/utils/funcs";
export interface MarketInfo {
  totalPt: string;
  totalSy: string;
  totalLp: string;
  liquidity: number;
  tvl: number;
  volume24h: number;
  underlyingAPY: number;
  impliedAPY: string;
  apyChange: number;
}

interface MarketContentProps {
  marketId: string;
  marketInfo: MarketInfo | null;
}

interface MarketInfoProps {
  marketId: string;
  marketInfo: MarketInfo;
  rightSideRef: React.RefObject<HTMLDivElement | null>;
}

export const MarketInfo = ({
  marketId,
  marketInfo,
  rightSideRef,
}: MarketInfoProps) => {
  return (
    <div
      ref={rightSideRef}
      className="lg:col-span-7 space-y-6 w-full overflow-y-auto pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <TokenBalances
        textLp="LP"
        textPt="PT"
        textSy="SY"
        textTitle="Token in pool"
        totalLp={marketInfo.totalLp}
        totalPt={marketInfo.totalPt}
        totalSy={marketInfo.totalSy}
      />
      {/* Market Info Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl p-4">
          <div className="text-[#5E6B81] text-sm mb-1">Liquidity</div>
          <div className="text-[#1C2026] text-xl font-semibold">
            ${formatNumberWithCommas(marketInfo.liquidity)}
          </div>
          <div className="text-[#0FA67F] text-sm">+6.185%</div>
        </div>
        <div className="rounded-2xl p-4">
          <div className="text-[#5E6B81] text-sm mb-1">24h Volume</div>
          <div className="text-[#1C2026] text-xl font-semibold">
            ${formatNumberWithCommas(marketInfo.volume24h)}
          </div>
          <div className="text-[#0FA67F] text-sm">+236%</div>
        </div>
        <div className="rounded-2xl p-4">
          <div className="text-[#5E6B81] text-sm mb-1">TVL</div>
          <div className="text-[#1C2026] text-xl font-semibold">
            ${formatNumberWithCommas(marketInfo.tvl)}
          </div>
          <div className="text-[#0FA67F] text-sm">+12.345%</div>
        </div>
      </div>

      {/* Charts */}
      <div className="rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <button className="text-[#5E6B81] hover:text-[#2E67F6]">1H</button>
            <button className="text-[#5E6B81] hover:text-[#2E67F6]">1D</button>
            <button className="text-[#5E6B81] hover:text-[#2E67F6]">1W</button>
          </div>
          <div className="flex gap-2">
            <button className="text-[#5E6B81] hover:text-[#2E67F6] p-2">
              <FaChartLine size={16} />
            </button>
            <button className="text-[#5E6B81] hover:text-[#2E67F6] p-2">
              <FaChartBar size={16} />
            </button>
            <button className="text-[#5E6B81] hover:text-[#2E67F6] p-2">
              <FaChartArea size={16} />
            </button>
          </div>
        </div>

        <div className="w-full h-[400px] bg-[#F8FAFD] rounded-xl">
          <YieldChart timeFrame="3600000" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <div className="text-[#5E6B81] text-sm mb-1">Underlying APY</div>
            <div className="text-[#1C2026] text-lg font-medium">
              {marketInfo.underlyingAPY}
            </div>
          </div>
          <div>
            <div className="text-[#5E6B81] text-sm mb-1">Implied APY</div>
            <div className="text-[#1C2026] text-lg font-medium">
              {marketInfo.impliedAPY}
            </div>
            <div className="text-[#F6542E] text-sm">
              {marketInfo.apyChange} (Past 7d)
            </div>
          </div>
        </div>
      </div>

      {/* Additional Market Info */}
      <div className="rounded-2xl p-6">
        <h3 className="text-[#1C2026] font-semibold mb-4">Market Info</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-[#5E6B81]">Market Size</span>
            <span className="text-[#1C2026]">$154.02M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5E6B81]">Total Volume</span>
            <span className="text-[#1C2026]">$892.5M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5E6B81]">Total Fees</span>
            <span className="text-[#1C2026]">$445.2K</span>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <TransactionHistory marketId={marketId} />
    </div>
  );
};

export const MarketContent = ({ marketId, marketInfo }: MarketContentProps) => {
  const rightSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (rightSideRef.current) {
        e.preventDefault();
        rightSideRef.current.scrollTop += e.deltaY;
      }
    };

    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-80px)]">
      <div className="lg:col-span-5">
        <div className="sticky top-4">
          <MarketWidget marketId={marketId} />
        </div>
      </div>
      {marketInfo && (
        <MarketInfo
          marketId={marketId}
          marketInfo={marketInfo}
          rightSideRef={rightSideRef}
        />
      )}
    </div>
  );
};
