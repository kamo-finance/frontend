import React from "react";
import { FaChartLine, FaChartBar, FaChartArea } from "react-icons/fa";
import { YieldMarket } from "@kamo-finance/ts-sdk";

import { YieldChart } from "./YieldChart";
import { TransactionHistory } from "./TransactionHistory";

import MarketWidget from "@/components/MarketWidget";
import { Page } from "@/components/layout/Page";
import { getImpliedRate } from "@/utils/funcs";
import TokenBalances from "@/components/TokenBalances";
type MarketParams = Promise<{ id: string }>;

const fetchMarketInfo = async (id: string) => {
  const response = await fetch(`https://api-kamo-dev.nysm.work/api/amm/${id}`);
  const data = await response.json();
  const market = (await YieldMarket.GetFromState({ stateId: id })).market;

  return {
    totalPt: (parseFloat(market.totalPt.toString()) / 10 ** 6).toString(),
    totalSy: (parseFloat(market.totalSy.toString()) / 10 ** 6).toString(),
    totalLp: market.lpSupply.value.toString(),
    liquidity: 0,
    volume24h: 0,
    underlyingAPY: 0,
    impliedAPY: getImpliedRate(BigInt(data.lnImpliedRate)).substring(0, 5),
    apyChange: 0,
  };
};

const Market = async ({ params }: { params: MarketParams }) => {
  const { id } = await params;
  const marketInfo = await fetchMarketInfo(id);

  return (
    <Page title="Market">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-80px)] overflow-hidden">
        <div className="lg:col-span-5 lg:sticky lg:top-0">
          <MarketWidget marketId={id} />
        </div>
        <div className="lg:col-span-7 space-y-6 w-full overflow-y-auto pr-4">
          <TokenBalances
            textLp="LP"
            textPt="PT"
            textSy="SY"
            textTitle="Pool Info"
            totalLp={marketInfo.totalLp}
            totalPt={marketInfo.totalPt}
            totalSy={marketInfo.totalSy}
          />
          {/* Market Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className=" rounded-2xl p-4">
              <div className="text-[#5E6B81] text-sm mb-1">Liquidity</div>
              <div className="text-[#1C2026] text-xl font-semibold">
                {marketInfo.liquidity}
              </div>
              <div className="text-[#0FA67F] text-sm">+6.185%</div>
            </div>
            <div className=" rounded-2xl p-4">
              <div className="text-[#5E6B81] text-sm mb-1">24h Volume</div>
              <div className="text-[#1C2026] text-xl font-semibold">
                {marketInfo.volume24h}
              </div>
              <div className="text-[#0FA67F] text-sm">+236%</div>
            </div>
          </div>

          {/* Charts */}
          <div className="rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                <button className="text-[#5E6B81] hover:text-[#2E67F6]">
                  1H
                </button>
                <button className="text-[#5E6B81] hover:text-[#2E67F6]">
                  1D
                </button>
                <button className="text-[#5E6B81] hover:text-[#2E67F6]">
                  1W
                </button>
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

            <div className="h-[400px] bg-[#F8FAFD] rounded-xl flex items-center justify-center">
              <YieldChart timeFrame="3600000" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <div className="text-[#5E6B81] text-sm mb-1">
                  Underlying APY
                </div>
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
          <div className=" rounded-2xl p-6">
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
          <TransactionHistory />
        </div>
      </div>
    </Page>
  );
};

export default Market;
