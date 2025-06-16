"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { YieldMarket } from "@kamo-finance/ts-sdk";

import { MarketInfo } from "./MarketContent";

import { formatNumberWithCommas } from "@/utils/funcs";

interface MarketDetailsProps {
  marketId: string;
  marketInfo: MarketInfo;
}

const MarketDetails: React.FC<MarketDetailsProps> = ({
  marketId,
  marketInfo,
}) => {
  const [yieldMarket, setYieldMarket] = useState<YieldMarket | null>(null);

  const fetchMarket = useCallback(async () => {
    try {
      const yieldMarket = await YieldMarket.GetFromState({ stateId: marketId });

      setYieldMarket(yieldMarket);
    } catch (error) {
      console.error("Error fetching market:", error);
    }
  }, [marketId]);

  useEffect(() => {
    fetchMarket();
  }, [fetchMarket]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl p-3 md:p-6">
        <div className="flex items-center gap-3 mb-6">
          <Image alt="kUSDC" height={40} src="/images/kusdc.png" width={40} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">kUSDC</h1>
            <p className="text-sm text-gray-500">Kamo Mock USDC</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">
              Underlaying Asset TVL
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${formatNumberWithCommas(marketInfo.tvl)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Maturity Date</div>
            <div className="text-2xl font-bold text-gray-900">
              {new Date(
                Number(yieldMarket?.market.expiry)
              ).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="rounded-xl p-3 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
        <p className="text-gray-600 leading-relaxed">
          Kamo is a permissionless, non-custodial, and transparent yield trading
          protocol built on SUI. This kUSDC token is deployed for the Overflow
          hackathon demo.
        </p>
        <div className="mt-4 space-y-2">
          <div className="text-sm">Future integrations:</div>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>haSUI</li>
            <li>Scallop lending position</li>
            <li>Cetus LP position</li>
          </ul>
        </div>
      </div>

      {/* Campaign */}
      <div className="rounded-xl p-3 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Season Zero</h2>
          <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
            Active
          </span>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
            <p className="text-gray-600">
              Testing the yield trading protocol before mainnet launch
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
            <p className="text-gray-600">
              Rewarding early supporters with{" "}
              <span className="text-blue-600 font-medium">
                50x $KAMO reward
              </span>{" "}
              (until 17 May)
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-xl p-3 md:p-6">
        <div className="flex flex-wrap md:flex-row items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Initiated by</div>
            <div className="text-gray-900 font-medium">Kamo Team</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Audited by</div>
            <div className="text-gray-900 font-medium">Kamo Team</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Vesting</div>
            <div className="text-green-600 font-medium">No vesting</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDetails;
