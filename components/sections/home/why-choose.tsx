import Image from "next/image";
import { motion } from "framer-motion";

const MotionDiv = motion.div as any;

const fadeInDown = {
	initial: {
		y: -60,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

const fadeInUp = {
	initial: {
		y: 60,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

const springUpHover = {
	hover: {
		scale: 1.1,
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 10,
		},
	},
};

const checkmarkVariants = {
	initial: {
		scale: 0,
		opacity: 0,
	},
	animate: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: "easeOut",
		},
	},
};

const containerVariants = {
	initial: {},
	animate: {
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
		},
	},
};

const boxVariants = {
	initial: {
		y: 60,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
	hover: {
		y: -5,
		transition: {
			duration: 0.2,
			ease: "easeOut",
		},
	},
};

export const WhyChoose = () => {
	return (
		<section className="bg-white py-20">
			<div className="container mx-auto px-4">
				<MotionDiv
					initial="initial"
					whileInView="animate"
					viewport={{ once: true, amount: 0.3 }}
					variants={fadeInDown}
					className="text-center"
				>
					<h2 className="text-4xl font-bold text-gray-800 mb-4">
						Why Choose <span className="text-green-600">Kamo</span>
					</h2>
					<p className="text-center text-gray-600 text-lg mb-12">
						Join our ecosystem and unlock the full potential of DeFi
					</p>
				</MotionDiv>

				<MotionDiv
					variants={containerVariants}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true, amount: 0.3 }}
					className="grid md:grid-cols-3 gap-8"
				>
					{/* Yield Farmer Box */}
					<MotionDiv
						variants={boxVariants}
						whileHover="hover"
						className="bg-gradient-to-b from-white to-gray-50 rounded-3xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all"
					>
						<div className="flex items-center gap-6 mb-8">
							<MotionDiv
								variants={springUpHover}
								whileHover="hover"
								className="w-[120px] h-[120px] flex-shrink-0"
							>
								<Image
									priority
									alt="For Yield Farmers"
									className="object-contain w-full h-full"
									src="/images/sleep-farmer.png"
									width={120}
									height={120}
								/>
							</MotionDiv>
							<h3 className="text-2xl font-bold text-gray-800">
								For Yield Farmers
							</h3>
						</div>
						<MotionDiv variants={containerVariants} className="space-y-5">
							<MotionDiv
								variants={checkmarkVariants}
								className="flex items-start gap-4"
							>
								<span className="text-green-500 text-lg">✓</span>
								<p className="text-gray-600 text-lg">
									Stable and predictable yields
								</p>
							</MotionDiv>
							<MotionDiv
								variants={checkmarkVariants}
								className="flex items-start gap-4"
							>
								<span className="text-green-500 text-lg">✓</span>
								<p className="text-gray-600 text-lg">No lock-up periods</p>
							</MotionDiv>
							<MotionDiv
								variants={checkmarkVariants}
								className="flex items-start gap-4"
							>
								<span className="text-green-500 text-lg">✓</span>
								<p className="text-gray-600 text-lg">Instant withdrawals</p>
							</MotionDiv>
						</MotionDiv>
					</MotionDiv>

					{/* Kamo Holders Box */}
					<MotionDiv
						variants={boxVariants}
						whileHover="hover"
						className="bg-gradient-to-b from-white to-gray-50 rounded-3xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all"
					>
						<div className="flex items-center gap-6 mb-8">
							<MotionDiv
								variants={springUpHover}
								whileHover="hover"
								className="w-[120px] h-[120px] flex-shrink-0"
							>
								<Image
									priority
									alt="For Kamo Holders"
									className="object-contain w-full h-full"
									src="/images/holders.png"
									width={120}
									height={120}
								/>
							</MotionDiv>
							<h3 className="text-2xl font-bold text-gray-800">
								For KAMO Holders
							</h3>
						</div>
						<MotionDiv variants={containerVariants} className="space-y-5">
							<MotionDiv
								variants={checkmarkVariants}
								className="flex items-start gap-4"
							>
								<span className="text-green-500 text-lg">✓</span>
								<p className="text-gray-600 text-lg">Governance rights</p>
							</MotionDiv>
							<MotionDiv
								variants={checkmarkVariants}
								className="flex items-start gap-4"
							>
								<span className="text-green-500 text-lg">✓</span>
								<p className="text-gray-600 text-lg">Revenue sharing</p>
							</MotionDiv>
							<MotionDiv
								variants={checkmarkVariants}
								className="flex items-start gap-4"
							>
								<span className="text-green-500 text-lg">✓</span>
								<p className="text-gray-600 text-lg">
									Boosted yield through veKAMO
								</p>
							</MotionDiv>
						</MotionDiv>
					</MotionDiv>

					{/* Developers Box */}
					<MotionDiv
						variants={boxVariants}
						whileHover="hover"
						className="bg-gradient-to-b from-white to-gray-50 rounded-3xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all"
					>
						<div className="flex items-center gap-6 mb-8">
							<MotionDiv
								variants={springUpHover}
								whileHover="hover"
								className="w-[120px] h-[120px] flex-shrink-0"
							>
								<Image
									priority
									alt="For Developers"
									className="object-contain w-full h-full"
									src="/images/cooking.png"
									width={120}
									height={120}
								/>
							</MotionDiv>
							<h3 className="text-2xl font-bold text-gray-800">
								For Developers
							</h3>
						</div>
						<MotionDiv variants={containerVariants} className="space-y-5">
							<MotionDiv
								variants={checkmarkVariants}
								className="flex items-start gap-4"
							>
								<span className="text-green-500 text-lg">✓</span>
								<p className="text-gray-600 text-lg">TypeScript SDK</p>
							</MotionDiv>
							<MotionDiv
								variants={checkmarkVariants}
								className="flex items-start gap-4"
							>
								<span className="text-green-500 text-lg">✓</span>
								<p className="text-gray-600 text-lg">Open-source contracts</p>
							</MotionDiv>
							<MotionDiv
								variants={checkmarkVariants}
								className="flex items-start gap-4"
							>
								<span className="text-green-500 text-lg">✓</span>
								<p className="text-gray-600 text-lg">
									Developer-first ecosystem
								</p>
							</MotionDiv>
						</MotionDiv>
					</MotionDiv>
				</MotionDiv>
			</div>
		</section>
	);
};
