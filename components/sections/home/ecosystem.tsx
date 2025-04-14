import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const MotionSection = motion.section as any;
const MotionHeading = motion.h2 as any;
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

export const Ecosystem = () => {
	const ecosystem = [
		{
			name: "Kamo",
			logo: "/images/kamo-logo.PNG",
			description: "Kamo is a yield farming platform on Sui.",
		},
		{
			name: "Haedal",
			logo: "/images/haedal-logo.jpg",
			description: "Haedal is a yield farming platform on Sui.",
		},
		{
			name: "Sui",
			logo: "/images/sui-logo.PNG",
			description: "Sui is a blockchain platform.",
		},
		{
			name: "Mysten Labs",
			logo: "/images/mysten.png",
			description: "Mysten Labs is the company behind Sui.",
		},
		{
			name: "Cetus",
			logo: "/images/cetus.png",
			description: "Cetus is leading DEX on Sui.",
		},
	];

	const [startIndex, setStartIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const itemsToShow = 3;
	const totalItems = ecosystem.length;

	const nextSlide = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setStartIndex((prev) => (prev + 1) % totalItems);
		setTimeout(() => setIsAnimating(false), 500);
	};

	const prevSlide = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setStartIndex((prev) => (prev - 1 + totalItems) % totalItems);
		setTimeout(() => setIsAnimating(false), 500);
	};

	const visiblePartners = [...Array(itemsToShow)].map((_, index) => {
		const partnerIndex = (startIndex + index) % totalItems;
		return ecosystem[partnerIndex];
	});

	return (
		<>
			<MotionSection
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className="bg-blue-50 py-20"
			>
				<MotionHeading
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					viewport={{ once: true }}
					className="text-4xl font-bold text-center text-blue-900 mb-16"
				>
					Kamo Ecosystem
				</MotionHeading>

				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-3 gap-12 items-center">
						<MotionDiv
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							viewport={{ once: true }}
							className="text-center md:text-left"
						>
							<MotionDiv
								whileHover={{ scale: 1.1, rotate: 5 }}
								className="inline-block p-3 rounded-full bg-emerald-100 mb-4"
							>
								<span className="text-2xl">🎯</span>
							</MotionDiv>
							<h3 className="text-2xl font-bold text-gray-800 mb-3">
								STABLE RETURNS MADE SIMPLE
							</h3>
							<p className="text-gray-600 text-lg">
								Earn predictable yields in volatile markets with instant
								withdrawals.
							</p>
						</MotionDiv>

						<MotionDiv
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="relative h-[300px] hidden md:block"
						>
							<Image
								fill
								priority
								alt="Kamo Features"
								className="object-contain"
								src="/images/kamo-haedal.png"
							/>
						</MotionDiv>

						<MotionDiv
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							viewport={{ once: true }}
							className="text-center md:text-left"
						>
							<MotionDiv
								whileHover={{ scale: 1.1, rotate: -5 }}
								className="inline-block p-3 rounded-full bg-blue-100 mb-4"
							>
								<span className="text-2xl">🎮</span>
							</MotionDiv>
							<h3 className="text-2xl font-bold text-gray-800 mb-3">
								FLEXIBLE YIELD STRATEGIES
							</h3>
							<p className="text-gray-600 text-lg">
								Customize your yield approach with multiple investment options.
							</p>
						</MotionDiv>
					</div>
				</div>
			</MotionSection>

			<MotionSection
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className="py-20 bg-blue-50"
			>
				<div className="container mx-auto px-4">
					<div className="flex justify-center items-center gap-8">
						<MotionButton
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={prevSlide}
							className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white"
						>
							<svg fill="none" height="24" viewBox="0 0 24 24" width="24">
								<path
									d="M15 18l-6-6 6-6"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
								/>
							</svg>
						</MotionButton>
						<AnimatePresence mode="wait">
							<div className="flex gap-8">
								{visiblePartners.map((item, index) => (
									<MotionDiv
										key={`${item.name}-${index}`}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										className="relative w-20 h-20"
									>
										<Image
											fill
											alt={item.name}
											className="object-contain"
											src={item.logo}
										/>
									</MotionDiv>
								))}
							</div>
						</AnimatePresence>
						<MotionButton
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={nextSlide}
							className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white"
						>
							<svg fill="none" height="24" viewBox="0 0 24 24" width="24">
								<path
									d="M9 18l6-6-6-6"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
								/>
							</svg>
						</MotionButton>
					</div>
				</div>
			</MotionSection>
		</>
	);
};
