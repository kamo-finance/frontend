import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
	fadeInUp,
	fadeInDown,
	fadeInLeft,
	fadeInRight,
	staggerContainer,
	springUpHover,
	buttonTap,
	floatAnimation,
} from "@/utils/animations";

const MotionDiv = motion.div as any;

export const Hero = () => {
	const topMarkets = [
		{
			name: "kUSDC",
			apy: "8.07%",
			type: "fixed yield",
			icon: "💵",
		},
		{
			name: "kUSDC",
			apy: "8.66%",
			type: "fixed yield",
			icon: "💶",
		},
		{
			name: "kUSDC",
			apy: "24.04%",
			type: "fixed yield",
			icon: "💷",
		},
	];

	return (
		<section className="relative min-h-screen flex items-center bg-gradient-to-b from-blue-50 to-white overflow-hidden">
			{/* Background decorative elements */}
			<MotionDiv
				className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.5, 0.7, 0.5],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>
			<MotionDiv
				className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.5, 0.7, 0.5],
				}}
				transition={{
					duration: 8,
					delay: 2,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			<div className="container mx-auto px-4">
				<MotionDiv
					variants={staggerContainer}
					initial="initial"
					animate="animate"
					className="grid md:grid-cols-2 gap-12 items-center"
				>
					{/* Left Content */}
					<div className="space-y-8">
						<MotionDiv variants={fadeInDown} className="space-y-4">
							<h1 className="text-6xl font-bold">
								<span className="text-green-600">Kamo</span>{" "}
								<span className="text-yellow-400">Finance</span>
							</h1>
							<p className="text-2xl text-gray-600">
								Unlock Liquidity, Maximize Returns
							</p>
						</MotionDiv>

						<MotionDiv
							variants={fadeInLeft}
							className="prose prose-lg text-gray-600"
						>
							<p>
								Experience the future of DeFi with our innovative yield farming
								platform. Earn predictable yields and optimize your returns with
								advanced strategies.
							</p>
						</MotionDiv>

						<MotionDiv variants={fadeInUp} className="flex gap-4">
							<MotionDiv variants={springUpHover} {...buttonTap}>
								<Button
									as={Link}
									href="/markets"
									className="px-8 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
								>
									Launch App
								</Button>
							</MotionDiv>
							<MotionDiv variants={springUpHover} {...buttonTap}>
								<Button
									as={Link}
									href="/docs"
									className="px-8 py-3 text-lg font-medium text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors"
								>
									Learn More
								</Button>
							</MotionDiv>
						</MotionDiv>

						{/* Stats */}
						<MotionDiv
							variants={fadeInUp}
							className="grid grid-cols-2 gap-8 pt-8"
						>
							<MotionDiv
								variants={springUpHover}
								className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm"
							>
								<div className="flex items-center gap-3 mb-2">
									<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
										<span className="text-green-600 text-xl">💰</span>
									</div>
									<h4 className="text-gray-600 font-medium">
										Total Value Locked
									</h4>
								</div>
								<p className="text-2xl font-bold text-gray-800">$3.05B</p>
								<div className="flex items-center text-sm text-green-600 mt-1">
									<span>↑</span>
									<span className="ml-1">2.4% (24h)</span>
								</div>
							</MotionDiv>

							<MotionDiv
								variants={springUpHover}
								className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm"
							>
								<div className="flex items-center gap-3 mb-2">
									<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
										<span className="text-blue-600 text-xl">📊</span>
									</div>
									<h4 className="text-gray-600 font-medium">Trading Volume</h4>
								</div>
								<p className="text-2xl font-bold text-gray-800">$45.8B</p>
								<div className="flex items-center text-sm text-green-600 mt-1">
									<span>↑</span>
									<span className="ml-1">5.7% (24h)</span>
								</div>
							</MotionDiv>
						</MotionDiv>
					</div>

					{/* Right Content - Hero Image */}
					<MotionDiv
						variants={fadeInRight}
						{...floatAnimation}
						className="relative h-[600px]"
					>
						<Image
							fill
							priority
							alt="Kamo Hero"
							className="object-contain"
							src="/images/hero.PNG"
						/>
					</MotionDiv>
				</MotionDiv>

				<div className="mt-20">
					<div className="grid md:grid-cols-3 gap-6">
						{topMarkets.map((market, index) => (
							<div
								key={index}
								className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
							>
								<div className="flex items-center gap-3 mb-4">
									<div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
										<span className="text-2xl">{market.icon}</span>
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-800">
											{market.name}
										</h3>
										<p className="text-sm text-gray-500">{market.type}</p>
									</div>
								</div>
								<div className="flex items-baseline gap-2">
									<span className="text-3xl font-bold text-green-600">
										{market.apy}
									</span>
									<span className="text-sm text-gray-500">APY</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
