"use client";

import React, { useState, useEffect } from "react";
import { YieldMarket } from "@kamo-finance/ts-sdk";

import { MarketContent, MarketInfo } from "./components/MarketContent";

import { Page } from "@/components/layout/Page";
import { getImpliedRate } from "@/utils/funcs";
import { useTx } from "@/app/contexts/TxContext";

type MarketParams = Promise<{ id: string }>;

const fetchMarketInfo = async (id: string) => {};

const Market = ({ params }: { params: MarketParams }) => {
  const { id } = React.use(params);
  const [marketInfo, setMarketInfo] = useState<MarketInfo | null>(null);
  const { triggerRefresh } = useTx();

  useEffect(() => {
    const fetchMarketInfo = async () => {
      try {
        const response = await fetch(
          `https://api-kamo-dev.nysm.work/api/amm/${id}`,
        );
        const data = await response.json();
        const market = (await YieldMarket.GetFromState({ stateId: id })).market;
        const marketInfo = {
          totalPt: (parseFloat(market.totalPt.toString()) / 10 ** 6).toString(),
          totalSy: (parseFloat(market.totalSy.toString()) / 10 ** 6).toString(),
          totalLp: market.lpSupply.value.toString(),
          tvl: Math.floor(parseFloat(data.tvl)),
          liquidity: Math.floor(parseFloat(data.liquidity)),
          volume24h: Math.floor(parseFloat(data.volume24hs)),
          underlyingAPY: 0,
          impliedAPY: getImpliedRate(BigInt(data.lnImpliedRate)).substring(
            0,
            5,
          ),
          apyChange: 0,
        };

        setMarketInfo(marketInfo as any);
      } catch (error) {
        console.error("Error fetching market info:", error);
      }
    };

    fetchMarketInfo();
  }, [id, triggerRefresh]);

  return (
    <Page title="Market">
      {<MarketContent marketId={id} marketInfo={marketInfo} />}
    </Page>
  );
};

export default Market;
