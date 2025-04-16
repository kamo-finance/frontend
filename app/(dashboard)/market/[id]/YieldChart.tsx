"use client";

import { useEffect, useRef, useState } from "react";
import {
	createYieldCurveChart,
	LineSeries,
	ColorType,
} from "lightweight-charts";

export interface YieldChartProps {
	timeFrame: "1m" | "1h" | "1d" | "1w";
}

const API_URL = "http://localhost:3000";

export const YieldChart = ({ timeFrame }: YieldChartProps) => {
	const [chartData, setChartData] = useState<
		Array<{ time: number; value: number }>
	>([]);

	useEffect(() => {
		const fetchChartData = async () => {
			const response = await fetch(
				`${API_URL}/api/market/1/chart?timeFrame=${timeFrame}`
			);
			const data = await response.json();
			setChartData(data);
		};
		fetchChartData();
	}, []);

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const chartOptions = {
			layout: {
				textColor: "#5E6B81",
				background: { type: ColorType.Solid, color: "#E8E3CA" },
			},
			yieldCurve: {
				baseResolution: 1,
				minimumTimeRange: 10,
				startTimeRange: 3,
			},
			grid: {
				vertLines: { visible: true, color: "rgba(94, 107, 129, 0.1)" },
				horzLines: { visible: true, color: "rgba(94, 107, 129, 0.1)" },
			},
			handleScroll: true,
			handleScale: true,
		};

		const chart = createYieldCurveChart(containerRef.current, chartOptions);
		const lineSeries = chart.addSeries(LineSeries, {
			color: "#2E67F6",
			lineWidth: 2,
		});

		lineSeries.setData(chartData);
		chart.timeScale().fitContent();

		return () => {
			chart.remove();
		};
	}, [chartData]);

	return <div ref={containerRef} className="w-full h-full" />;
};
