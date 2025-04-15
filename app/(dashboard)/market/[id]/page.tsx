import MarketWidget from "@/components/MarketWidget";
import React from "react";
import { FaChartLine, FaChartBar, FaChartArea } from "react-icons/fa";


type MarketParams = Promise<{ id: string }>;

const Market = async ({ params }: { params: MarketParams }) => {
  const { id } = await params;

  // Mock data
  const marketInfo = {
    apy: "11.58%",
    apyChange: "-3.912%",
    liquidity: "$154.02M",
    volume24h: "$16.92M",
    underlyingAPY: "0%",
    impliedAPY: "11.58%",
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MarketWidget marketId={id} />
          <div className="space-y-6">
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
            <div className=" rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-4">
                  <button className="text-[#2E67F6] font-medium">1m</button>
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
                <div className="text-[#5E6B81]">
                  Chart will be implemented here
                </div>
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default Market;