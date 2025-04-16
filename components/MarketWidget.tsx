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

type TabType = "trade" | "mint" | "liquidity";

const MarketWidget: React.FC<MarketWidgetProps> = ({ marketId }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const defaultTab = searchParams.get("tab") || "trade";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams],
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
    <div className="p-6">
      <Tabs
        key="market-widget"
        color="primary"
        defaultSelectedKey={defaultTab as any}
        variant="light"
        onSelectionChange={(key: any) => {
          router.push(`${pathname}?${createQueryString("tab", key as string)}`);
        }}
      >
        {items.map((item) => (
          <Tab key={item.id as any} title={item.title as any}>
            {item.content as any}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default MarketWidget;
