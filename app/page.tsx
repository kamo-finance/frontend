"use client";

import Image from "next/image";
import { useState } from "react";
import React from "react";
import TradeWidget from "./components/TradeWidget";
import LiquidityWidget from "./components/LiquidityWidget";
import FaucetButton from "./components/FaucetButton";

import { Hero } from "@/components/sections/home/hero";
import { HowItWorks } from "@/components/sections/home/how-it-works";
import { WhyChoose } from "@/components/sections/home/why-choose";

const faqs = [
	{
		question: "What is Kamo?",
		answer:
			"Kamo is a DeFi protocol that enables users to maximize their yield through innovative tokenization and trading strategies.",
	},
	{
		question: "What is veKAMO?",
		answer:
			"veKAMO is our governance token that allows holders to participate in protocol decisions and earn additional rewards.",
	},
	{
		question: "What are the expected returns?",
		answer:
			"You can earn up to 15% APY through our staking strategies, with additional benefits for veKAMO holders.",
	},
];

export default function HomePage() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const features = [
		"Kamo is a DeFi protocol that enables users to maximize their yield through innovative tokenization and trading strategies.",
		"veKAMO is our governance token that allows holders to participate in protocol decisions and earn additional rewards.",
		"You can earn up to 15% APY through our staking strategies, with additional benefits for veKAMO holders.",
	];

	return (
		<main className="flex flex-col min-h-screen">
			<Hero />
			<HowItWorks />
			<WhyChoose />

			{/* Ecosystem Section */}
			<section className="py-20 bg-blue-50">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold text-center text-blue-900 mb-16">
						Kamo Ecosystem
					</h2>
					<div className="flex justify-center items-center gap-8">
						<button className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path
									d="M15 18l-6-6 6-6"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
						<div className="flex gap-8">
							<div className="relative w-20 h-20">
								<Image
									src="/images/kamo-logo.PNG"
									alt="Kamo Logo"
									fill
									className="object-contain"
								/>
							</div>
							<div className="relative w-20 h-20">
								<Image
									src="/images/kamo-logo.PNG"
									alt="Kamo Logo"
									fill
									className="object-contain"
								/>
							</div>
							<div className="relative w-20 h-20">
								<Image
									src="/images/sui-logo.PNG"
									alt="SUI Logo"
									fill
									className="object-contain"
								/>
							</div>
						</div>
						<button className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path
									d="M9 18l6-6-6-6"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>
				</div>
			</section>

			{/* FAQs Section */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold text-center text-blue-900 mb-16">
						FAQs
					</h2>
					<div className="max-w-3xl mx-auto">
						{faqs.map((faq, index) => (
							<div key={index} className="mb-4">
								<details className="group border-b border-gray-200">
									<summary className="flex cursor-pointer items-center justify-between py-4 text-lg font-medium text-blue-900">
										<span>{faq.question}</span>
										<span className="ml-6 flex h-7 items-center text-blue-900">
											<svg
												className="h-6 w-6 rotate-0 transform transition-transform duration-200 ease-in-out group-open:rotate-180"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</span>
									</summary>
									<div className="pb-4 text-gray-600">{faq.answer}</div>
								</details>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
