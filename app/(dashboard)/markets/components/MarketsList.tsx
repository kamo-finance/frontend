"use client";

import React from "react";
import { STATE_ADDRESS_MAP, SUPPORTED_MARKETS } from "@kamo-finance/ts-sdk";
import { useRouter } from "next/navigation";
import { Link } from "@heroui/link";
import { Button, Tooltip } from "@heroui/react";
import { Info } from "lucide-react";

import { Favicon } from "@/components/brands/Favicon";
import { truncateSuiObjectId } from "@/libs";

interface Market {
  id: string;
  name: string;
}

interface MarketCardProps {
  market: Market;
  index: number;
  onClick: (id: string) => void;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, index, onClick }) => {
  const Field = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-row items-center justify-between p-1 rounded-md gap-0 w-full text-foreground-500">
      <h2 className="text-sm font-semibold">{label}</h2>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );

  const APYBox = ({
    label,
    value,
    fields,
  }: {
    label: string;
    value: string;
    fields: { label: string; value: string }[];
  }) => (
    <div className="flex flex-row gap-4 items-center justify-center p-4 border-3 border-foreground rounded-2xl w-full bg-foreground-200">
      <div className="relative bg-foreground-100 rounded-full p-1 w-8 h-8">
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-foreground-500 font-bold">
          {label
            .split(" ")
            .slice(0, 2)
            .map((word, index) => (
              <span key={index} className="text-foreground-500 font-semibold">
                {word[0]}
              </span>
            ))}
        </p>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex flex-row items-center justify-between  w-full">
          <h2 className="text-base font-semibold">{label}</h2>
          <p className="text-base font-medium">{value}</p>
        </div>
        {fields.map((field, index) => (
          <Field key={index} label={field.label} value={field.value} />
        ))}
      </div>
    </div>
  );

  return (
    <div
      key={`${market.id}-${index}`}
      className="bg-foreground-100 rounded-2xl p-6 gap-4 flex flex-col items-start transition-all duration-300 hover:shadow-lg border-3 border-foreground cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={() => onClick(market.id)}
    >
      <div className="flex flex-row items-center justify-start gap-2">
        <div className="bg-primary shadow-lg shadow-primary w-12 aspect-square flex items-center justify-center rounded-full">
          <Favicon size={20} />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">{market.name}</h2>
            <Tooltip content="Description of the market" placement="top">
              <Button isIconOnly radius="full" size="sm" variant="light">
                <Info />
              </Button>
            </Tooltip>
          </div>
          <Link
            className="underline"
            href={`https://testnet.suivision.xyz/object/${market.id}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {truncateSuiObjectId(market.id)}
          </Link>
        </div>
      </div>
      <Field label="Liquidity" value={"$1,000,000"} />
      <APYBox
        fields={[{ label: "Price", value: "24.04%" }]}
        label="Yield APY"
        value={"24.04%"}
      />
      <APYBox
        fields={[{ label: "Price", value: "8.07%" }]}
        label="Fixed APY"
        value={"8.07%"}
      />
    </div>
  );
};

const MarketsList: React.FC = () => {
  const router = useRouter();

  const markets = Object.values(SUPPORTED_MARKETS)
    .filter((market) => market === "KUSDC")
    .map((market) => ({
      id: STATE_ADDRESS_MAP.get(market) || "",
      name: market,
    }));

  const handleMarketClick = (id: string) => {
    router.push(`/market/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {markets.map((market) => (
        <React.Fragment key={market.id}>
          {Array.from({ length: 10 }).map((_, index) => (
            <MarketCard
              key={`${market.id}-${index}`}
              index={index}
              market={market}
              onClick={handleMarketClick}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MarketsList;
