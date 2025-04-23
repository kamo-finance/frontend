import Image from "next/image";
import { Section } from "@/app/components/education/Section";

export const BoostReturns = () => {
	return (
		<div className="space-y-8">
			<Section title="Making Money with Yield Tokens">
				<div className="space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
						<div className="space-y-6">
							<p className="text-foreground/80">
								Yield Tokens (YT) let you earn rewards from yield farming. When
								you hold YT, you get all the rewards until the end date.
							</p>
							<div className="p-6 bg-primary/10 rounded-lg">
								<h4 className="font-semibold mb-4">Simple Example:</h4>
								<ul className="space-y-2">
									<li className="flex items-center gap-2">
										<span className="text-primary">•</span>
										<span>Buy 1 YT haSUI for 0.04 haSUI</span>
									</li>
									<li className="flex items-center gap-2">
										<span className="text-primary">•</span>
										<span>Wait one year</span>
									</li>
									<li className="flex items-center gap-2">
										<span className="text-primary">•</span>
										<span>Earn 0.05 haSUI in rewards</span>
									</li>
									<li className="flex items-center gap-2">
										<span className="text-primary">•</span>
										<span className="text-primary font-bold">
											Make 25% profit
										</span>
									</li>
								</ul>
							</div>
						</div>
						<div className="relative h-[500px] w-full">
							<Image
								src="/images/YT.png"
								alt="Yield Token Example"
								fill
								className="object-contain object-center"
								priority
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="p-6 bg-primary/10 rounded-lg">
							<h4 className="font-semibold mb-4">Market Influence</h4>
							<p className="text-foreground/80">
								YT prices change based on market demand. When rewards are high,
								YT becomes more valuable.
							</p>
						</div>
						<div className="p-6 bg-primary/10 rounded-lg">
							<h4 className="font-semibold mb-4">Time Value</h4>
							<p className="text-foreground/80">
								The longer you hold YT, the more rewards you collect. Time is on
								your side!
							</p>
						</div>
						<div className="p-6 bg-primary/10 rounded-lg">
							<h4 className="font-semibold mb-4">Reward Flow</h4>
							<p className="text-foreground/80">
								Rewards flow continuously to YT holders, giving you steady
								returns over time.
							</p>
						</div>
					</div>
				</div>
			</Section>

			<Section title="When to Buy YT?">
				<div className="space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
						<div className="space-y-6">
							<p className="text-foreground/80">
								The key to making money with YT is comparing two rates:
							</p>

							<div className="grid grid-cols-1 gap-4">
								<div className="p-6 bg-primary/10 rounded-lg">
									<h4 className="font-semibold mb-4">Current APY</h4>
									<p className="text-foreground/80">
										This is the yield you get right now from staking or lending.
									</p>
								</div>
								<div className="p-6 bg-primary/10 rounded-lg">
									<h4 className="font-semibold mb-4">Implied APY</h4>
									<p className="text-foreground/80">
										This is what the market thinks the average yield will be.
									</p>
								</div>
							</div>

							<div className="p-6 border border-primary/20 rounded-lg bg-primary/5">
								<h4 className="font-bold text-primary mb-4">
									Best Time to Buy
								</h4>
								<div className="space-y-4">
									<p className="text-foreground/80">
										Buy YT when Implied APY is lower than Current APY. This
										means the market is undervaluing future rewards.
									</p>
									<div className="grid grid-cols-1 gap-2">
										<div className="flex items-center gap-2">
											<span className="text-primary">•</span>
											<span>During high reward periods</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-primary">•</span>
											<span>When market prices are low</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="relative h-[500px] w-full">
							<Image
								src="/images/kamo4.png"
								alt="APY Comparison"
								fill
								className="object-contain object-center"
								priority
							/>
						</div>
					</div>
				</div>
			</Section>

			<Section title="Real World Example">
				<div className="space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
						<div className="space-y-6">
							<div className="p-6 bg-primary/10 rounded-lg">
								<h4 className="font-semibold mb-4">Market Situation:</h4>
								<div className="grid grid-cols-1 gap-4">
									<div className="flex items-center gap-2">
										<span className="text-primary">•</span>
										<span>YT haSUI = 0.04 haSUI</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-primary">•</span>
										<span>Implied APY = 4.2%</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-primary">•</span>
										<span>Current APY = 5%</span>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4">
								<div className="p-6 bg-primary/10 rounded-lg">
									<h4 className="font-semibold mb-4">Good Trade:</h4>
									<p className="text-foreground/80">
										If you buy 100 YT haSUI for 4 haSUI and the APY stays at 5%,
										you'll earn 5 haSUI in rewards - that's a 25% return!
									</p>
								</div>
								<div className="p-6 bg-primary/10 rounded-lg">
									<h4 className="font-semibold mb-4">Bad Trade:</h4>
									<p className="text-foreground/80">
										If Implied APY is higher than Current APY, you might lose
										money unless the APY increases significantly.
									</p>
								</div>
							</div>
						</div>
						<div className="relative h-[500px] w-full">
							<Image
								src="/images/kamo3.png"
								alt="Trading Example"
								fill
								className="object-contain object-center"
								priority
							/>
						</div>
					</div>

					<div className="p-6 border border-primary/20 rounded-lg bg-primary/5">
						<h4 className="font-bold text-primary mb-4">Pro Tip</h4>
						<p className="text-foreground/80">
							Watch market trends! In bull markets, borrowing rates often go up,
							which means higher yields. Being able to spot these trends can
							help you make better YT trades.
						</p>
					</div>
				</div>
			</Section>
		</div>
	);
};
