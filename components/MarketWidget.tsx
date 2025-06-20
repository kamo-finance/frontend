"use client";

import React, { useCallback } from "react";
import { Tab, Tabs } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import TradeWidget from "./TradeWidget";
import MintWidget from "./MintWidget";
import LiquidityWidget from "./LiquidityWidget";
import FaucetButton from "./FaucetButton";
interface MarketWidgetProps {
  marketId: string;
}

const MarketWidget: React.FC<MarketWidgetProps> = ({ marketId }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const defaultTab = searchParams.get("widget") || "trade";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const items = [
    {
      id: "trade",
      title: "Trade",
      content: <TradeWidget marketId={marketId} />,
    },
    {
      id: "mint",
      title: "Mint",
      content: <MintWidget marketId={marketId} />,
    },
    {
      id: "liquidity",
      title: "Add Liquidity",
      content: <LiquidityWidget marketId={marketId} />,
    },
    {
      id: "faucet",
      title: "Faucet",
      content: <FaucetButton />,
    },
  ];

  return (
    <div className="flex gap-4 p-0 md:p-6">
      <div className="w-full md:w-[480px] min-w-full md:min-w-[360px]">
        <Tabs
          key="market-widget"
          className="flex flex-row"
          color="primary"
          defaultSelectedKey={defaultTab as any}
          variant="light"
          onSelectionChange={(key: any) => {
            router.push(
              `${pathname}?${createQueryString("widget", key as string)}`
            );
          }}
        >
          {items.map((item) => (
            <Tab key={item.id as any} title={item.title as any}>
              <div className="overflow-y-auto scrollbar-hide max-h-[calc(100vh-200px)] [&::-webkit-scrollbar]:hidden">
                {item.content as any}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default MarketWidget;
