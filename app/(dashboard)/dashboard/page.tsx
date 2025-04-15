"use client";

import Image from "next/image";
import { Tabs, Tab, Button } from "@heroui/react";
import { Progress } from "@heroui/react";

import { Page } from "@/components/layout/Page";

interface PositionProps {
  name: string;
  value: string;
  valueChange: string;
  metrics: {
    label: string;
    value: string;
    change?: string;
  }[];
  progress?: {
    percent: number;
    label: string;
  };
  actions: {
    primary: string;
    secondary: string;
  };
}

const StatItem = ({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change?: string;
}) => (
  <div className="flex justify-between items-center">
    <span className="text-sm">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-sm">{value}</span>
      {change && <span className="text-sm">{change}</span>}
    </div>
  </div>
);

const PositionCard = ({
  name,
  value,
  valueChange,
  metrics,
  progress,
  actions,
}: PositionProps) => (
  <div className="border-3 border-foreground bg-foreground-100 rounded-2xl p-4">
    <div className="flex justify-between items-center mb-4">
      <span className="font-medium">{name}</span>
    </div>
    <div className="space-y-2">
      <div className="flex flex-col">
        <StatItem
          change={valueChange}
          label="Value of Position"
          value={value}
        />
        {metrics.map((metric, idx) => (
          <StatItem
            key={idx}
            change={metric.change}
            label={metric.label}
            value={metric.value}
          />
        ))}
      </div>
      {progress && (
        <Progress
          showValueLabel
          label={progress.label}
          value={progress.percent}
        />
      )}
    </div>
    <div className="flex gap-2 mt-4">
      <Button>{actions.primary}</Button>
      <Button variant="bordered">{actions.secondary}</Button>
    </div>
  </div>
);

export default function DashboardPage() {
  const portfolioStats = [
    { label: "Total Balance", value: "$2357", change: "+$15" },
    { label: "Average APY", value: "4.2%", change: "+1.1%" },
    { label: "Swap Fees Earned", value: "$135", change: "+$4" },
  ];

  const tabItems = [
    {
      id: "LP",
      label: "LP Positions",
      content: [
        {
          name: "SUI/USDC",
          value: "$1664",
          valueChange: "+$264",
          metrics: [
            { label: "Average APY", value: "4.2%" },
            { label: "Swap Fees Earned", value: "$135" },
            { label: "Tokens", value: "723 SUI / $1400 USDC" },
          ],
          actions: {
            primary: "Add Liquidity",
            secondary: "Remove",
          },
        },
        {
          name: "Kamo/SUI",
          value: "$854",
          valueChange: "+$154",
          metrics: [
            { label: "Average APY", value: "3.6%" },
            { label: "Swap Fees Earned", value: "$79" },
            { label: "Tokens", value: "234 SUI / $569 USDC" },
          ],
          actions: {
            primary: "Add Liquidity",
            secondary: "Remove",
          },
        },
      ],
      ButtonText: "Add LP Position",
    },
    {
      id: "PT",
      label: "PT Positions",
      content: [
        {
          name: "SUI Principal Token",
          value: "$1000",
          valueChange: "+$146",
          metrics: [
            { label: "Fixed APY", value: "4.9%" },
            { label: "Days Left", value: "81" },
            { label: "Maturity Date", value: "June 7 2025" },
          ],
          progress: {
            percent: 75,
            label: "Progress to Maturity",
          },
          actions: {
            primary: "Redeem Early",
            secondary: "Transfer",
          },
        },
        {
          name: "Kamo Principal Token",
          value: "$3500",
          valueChange: "+$465",
          metrics: [
            { label: "Fixed APY", value: "6%" },
            { label: "Days Left", value: "17" },
            { label: "Maturity Date", value: "April 7 2025" },
          ],
          progress: {
            percent: 80,
            label: "Progress to Maturity",
          },
          actions: {
            primary: "Redeem Early",
            secondary: "Transfer",
          },
        },
      ],
      ButtonText: "Add PT Position",
    },
    {
      id: "YO",
      label: "YO Positions",
      content: [
        {
          name: "SUI Yield Token",
          value: "$1500",
          valueChange: "+$255",
          metrics: [
            { label: "Underlying APY", value: "8.2%", change: "+0.3%" },
            { label: "Claimed Yield", value: "102", change: "+5" },
            { label: "Days Left", value: "120 days" },
            { label: "Position Start", value: "Jan 15, 2024" },
          ],
          progress: {
            percent: 67,
            label: "Progress to Maturity",
          },
          actions: {
            primary: "Claim Yield",
            secondary: "Transfer",
          },
        },
        {
          name: "Kamo Yield Token",
          value: "$3000",
          valueChange: "+$420",
          metrics: [
            { label: "Underlying APY", value: "12.5%", change: "+0.8%" },
            { label: "Claimed Yield", value: "322", change: "+12" },
            { label: "Days Left", value: "90 days" },
            { label: "Position Start", value: "Dec 1, 2023" },
          ],
          progress: {
            percent: 80,
            label: "Progress to Maturity",
          },
          actions: {
            primary: "Claim Yield",
            secondary: "Transfer",
          },
        },
      ],
      ButtonText: "Add YO Position",
    },
  ];

  return (
    <Page title="Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Portfolio Section */}
        <section className="rounded-lg p-6 shadow-sm flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            My Portfolio
          </h2>
          <div className="flex flex-col">
            {portfolioStats.map((stat, index) => (
              <StatItem
                key={index}
                change={stat.change}
                label={stat.label}
                value={stat.value}
              />
            ))}
          </div>

          <Button color="primary">Buy Kamo</Button>

          <div className="mt-8 flex justify-center">
            <div className="relative w-64 h-64">
              <Image
                fill
                alt="Kamo Mascot"
                className="object-contain w-full rounded-2xl"
                src="/images/tokenization.PNG"
              />
            </div>
          </div>
        </section>

        {/* My Positions Section */}
        <section className="rounded-lg p-6 shadow-sm flex flex-col ga-4">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            My Positions
          </h2>

          <Tabs
            aria-label="Position tabs"
            color="primary"
            items={tabItems}
            variant="light"
          >
            {(item) => (
              <Tab key={item.id} title={item.label}>
                <div className="space-y-6">
                  {item.content.map((position, idx) => (
                    <PositionCard key={idx} {...position} />
                  ))}

                  <Button fullWidth color="primary">
                    {item.ButtonText}
                  </Button>
                </div>
              </Tab>
            )}
          </Tabs>
        </section>
      </div>
    </Page>
  );
}
