"use client";

import React, { useState } from "react";
import { FaSync, FaCog } from "react-icons/fa";

import TradeWidget from "./TradeWidget";
import MintWidget from "./MintWidget";
import LiquidityWidget from "./LiquidityWidget";
import FaucetButton from "./FaucetButton";

interface MarketWidgetProps {
  marketId: string;
}

type TabType = "trade" | "mint" | "liquidity";

const MarketWidget: React.FC<MarketWidgetProps> = ({ marketId }) => {
  const [activeTab, setActiveTab] = useState<TabType>("trade");

  const renderContent = () => {
    switch (activeTab) {
      case "trade":
        return (
          <div suppressHydrationWarning className="bg-white rounded-xl p-4">
            <TradeWidget marketId={marketId} />
          </div>
        );
      case "mint":
        return (
          <div suppressHydrationWarning className="bg-white rounded-xl p-4">
            <MintWidget marketId={marketId} />
          </div>
        );
      case "liquidity":
        return (
          <div suppressHydrationWarning className="bg-white rounded-xl p-4">
            <LiquidityWidget marketId={marketId} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#F8FAFD] rounded-2xl p-6">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            className={`py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "trade"
                ? "bg-[#2E67F6] text-white"
                : "text-[#5E6B81] hover:text-[#2E67F6]"
            }`}
            onClick={() => setActiveTab("trade")}
          >
            Trade
          </button>
          <button
            className={`py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "mint"
                ? "bg-[#2E67F6] text-white"
                : "text-[#5E6B81] hover:text-[#2E67F6]"
            }`}
            onClick={() => setActiveTab("mint")}
          >
            Mint
          </button>
          <button
            className={`py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "liquidity"
                ? "bg-[#2E67F6] text-white"
                : "text-[#5E6B81] hover:text-[#2E67F6]"
            }`}
            onClick={() => setActiveTab("liquidity")}
          >
            Add Liquidity
          </button>
          <FaucetButton />
        </div>
        <div className="flex items-center gap-2 text-[#5E6B81]">
          <span className="text-sm">0.5%</span>
          <button className="p-2 hover:text-[#2E67F6] transition-colors">
            <FaCog size={14} />
          </button>
          <button className="p-2 hover:text-[#2E67F6] transition-colors">
            <FaSync size={14} />
          </button>
        </div>
      </div>

      {/* Widget Content */}
      <div className="animate-fadeIn">{renderContent()}</div>
    </div>
  );
};

export default MarketWidget;
