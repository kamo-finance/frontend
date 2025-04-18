"use client";

import { useEffect, useRef, useState } from "react";
import {
  LineSeries,
  ColorType,
  createChart,
  Time,
  ISeriesApi,
} from "lightweight-charts";

import { getImpliedRate } from "@/utils/funcs";
import { useTx } from "@/app/contexts/TxContext";

export interface YieldChartProps {
  timeFrame: string;
}

const fetchChartData = async (timeFrame: string) => {
  try {
    const now = new Date();
    const API_URL = `https://api-kamo-dev.nysm.work/api/transaction/chart?stateId=0x0671901b22e27742840c5a5d5bf865c7343df21bc3b729f8b8ac65f81d013bf5&fromTs=${now.getTime() - 1000 * 60 * 60 * 24 * 30}&toTs=${now.getTime()}&duration=${timeFrame}`;

    const response = await fetch(API_URL);
    const data = (await response.json()) as any;

    return data;
  } catch (error) {
    console.error("Error fetching chart data:", error);

    return [];
  }
};

export const YieldChart = ({ timeFrame }: YieldChartProps) => {
  const [chartData, setChartData] = useState<
    Array<{ time: Time; value: number }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { triggerRefresh } = useTx();
  const [lineSeries, setLineSeries] = useState<ISeriesApi<"Line"> | null>(null);
  const [firstFetch, setFirstFetch] = useState(true);

  // Tách logic fetch data ra thành một function riêng
  const fetchAndUpdateChartData = async () => {
    try {
      if (!firstFetch) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      const data = await fetchChartData(timeFrame);
      const sortedChartData = data.sort(
        (a: any, b: any) => parseInt(a.timestampTs) - parseInt(b.timestampTs),
      );
      const chartData = sortedChartData.map((item: any) => ({
        time: Math.floor(parseInt(item.timestampTs) / 1000),
        value: parseFloat(getImpliedRate(BigInt(item.value))),
      })) as Array<{ time: Time; value: number }>;

      setChartData(chartData);
      setFirstFetch(false);
      if (lineSeries) {
        lineSeries.setData(chartData);
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  // Effect để fetch data khi timeFrame hoặc triggerRefresh thay đổi
  useEffect(() => {
    console.log("triggerRefresh", triggerRefresh);
    fetchAndUpdateChartData();
  }, [timeFrame, triggerRefresh]);

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
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    };

    const chart = createChart(containerRef.current, chartOptions);
    const _lineSeries = chart.addSeries(LineSeries, {
      color: "#2962FF",
    });

    _lineSeries.setData(chartData);
    chart.timeScale().fitContent();
    setLineSeries(_lineSeries);

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [chartData]);

  return <div ref={containerRef} className="w-full h-full" />;
};
