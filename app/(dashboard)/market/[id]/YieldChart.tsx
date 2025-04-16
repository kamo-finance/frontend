"use client";

import { useEffect, useRef, useState } from "react";
import { LineSeries, ColorType, createChart, Time } from "lightweight-charts";

import { getImpliedRate } from "@/utils/funcs";

export interface YieldChartProps {
  timeFrame: string;
}

const fetchChartData = async (timeFrame: string) => {
  const now = new Date();
  const API_URL = `https://api-kamo-dev.nysm.work/api/transaction/chart?stateId=0xf27f14dffb936d97f3641217b22b8c013e38822cbccfdae12f9eb25793b91f74&fromTs=${now.getTime() - 1000 * 60 * 60 * 24 * 30}&toTs=${now.getTime()}&duration=${timeFrame}`;

  console.log(API_URL);
  const response = await fetch(API_URL);
  const data = (await response.json()) as any;

  return data;
};

export const YieldChart = ({ timeFrame }: YieldChartProps) => {
  const [chartData, setChartData] = useState<
    Array<{ time: Time; value: number }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchChartData(timeFrame);
        const sortedChartData = data.sort(
          (a: any, b: any) => parseInt(a.timestampTs) - parseInt(b.timestampTs),
        );
        const chartData = sortedChartData.map((item: any) => ({
          time: Math.floor(parseInt(item.timestampTs) / 1000),
          value: parseFloat(getImpliedRate(BigInt(item.value))),
        })) as Array<{ time: Time; value: number }>;

        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [timeFrame]);

  useEffect(() => {
    if (!containerRef.current) return;

    const chartOptions = {
      layout: {
        textColor: "#5E6B81",
        background: { type: ColorType.Solid, color: "#E8E3CA" },
      },
      grid: {
        vertLines: { visible: true, color: "rgba(94, 107, 129, 0.1)" },
        horzLines: { visible: true, color: "rgba(94, 107, 129, 0.1)" },
      },
      timeScale: {
        timeVisible: true,
      },
      handleScroll: true,
      handleScale: true,
    };

    const chart = createChart(containerRef.current, chartOptions);
    const areaSeries = chart.addSeries(LineSeries, {
      color: "#2962FF",
    });

    areaSeries.setData(chartData);
    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [chartData]);

  return <div ref={containerRef} className="w-full h-full" />;
};
