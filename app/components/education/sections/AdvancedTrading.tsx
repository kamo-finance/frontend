import Image from "next/image";
import { Section } from "@/app/components/education/Section";

export const AdvancedTrading = () => {
	return (
		<div className="space-y-12">
			<Section title="Yield Trading Strategy">
				<div className="space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
						<div className="space-y-6">
							<div className="p-6 bg-primary/10 rounded-lg">
								<h4 className="font-semibold mb-4">Main Objective</h4>
								<p className="text-foreground/80">
									Maximize your APY by switching between two positions:
								</p>
								<ul className="mt-4 space-y-2">
									<li className="flex items-center gap-2">
										<span className="text-primary font-bold">1.</span>
										<span>Hold PT (short yield)</span>
									</li>
									<li className="flex items-center gap-2">
										<span className="text-primary font-bold">2.</span>
										<span>Hold YT (long yield)</span>
									</li>
								</ul>
							</div>

							<div className="p-6 border border-primary/20 rounded-lg bg-primary/5">
								<h4 className="font-bold text-primary mb-4">Market Swings</h4>
								<p className="text-foreground/80">
									As DeFi yields fluctuate, the market swings between two modes:
								</p>
								<div className="mt-4 grid grid-cols-2 gap-4">
									<div className="p-4 bg-background/50 rounded-lg">
										<h5 className="font-semibold mb-2">Cheap PT Mode</h5>
										<p className="text-sm">Best time to buy PT</p>
									</div>
									<div className="p-4 bg-background/50 rounded-lg">
										<h5 className="font-semibold mb-2">Cheap YT Mode</h5>
										<p className="text-sm">Best time to buy YT</p>
									</div>
								</div>
							</div>
						</div>
						<div className="relative h-[400px] w-full">
							<Image
								src="/images/kamo3.png"
								alt="Market Swings"
								fill
								className="object-contain object-center"
								priority
							/>
						</div>
					</div>
				</div>
			</Section>

			<Section title="Market Modes">
				<div className="space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="p-6 bg-primary/10 rounded-lg">
							<h4 className="font-semibold mb-4">Cheap PT Mode</h4>
							<ul className="space-y-2">
								<li className="flex items-center gap-2">
									<span className="text-primary">•</span>
									<span>High Implied APY</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="text-primary">•</span>
									<span>PT is cheap</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="text-primary">•</span>
									<span>YT is expensive</span>
								</li>
							</ul>
							<div className="mt-4 p-3 bg-background/50 rounded-lg">
								<p className="text-sm">Best Strategy: Hold PT</p>
							</div>
						</div>

						<div className="p-6 bg-primary/10 rounded-lg">
							<h4 className="font-semibold mb-4">Equilibrium Mode</h4>
							<ul className="space-y-2">
								<li className="flex items-center gap-2">
									<span className="text-primary">•</span>
									<span>Reasonable Implied APY</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="text-primary">•</span>
									<span>Fair PT & YT prices</span>
								</li>
							</ul>
							<div className="mt-4 p-3 bg-background/50 rounded-lg">
								<p className="text-sm">All strategies viable</p>
							</div>
						</div>

						<div className="p-6 bg-primary/10 rounded-lg">
							<h4 className="font-semibold mb-4">Cheap YT Mode</h4>
							<ul className="space-y-2">
								<li className="flex items-center gap-2">
									<span className="text-primary">•</span>
									<span>Low Implied APY</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="text-primary">•</span>
									<span>PT is expensive</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="text-primary">•</span>
									<span>YT is cheap</span>
								</li>
							</ul>
							<div className="mt-4 p-3 bg-background/50 rounded-lg">
								<p className="text-sm">Best Strategy: Hold YT</p>
							</div>
						</div>
					</div>

					<div className="relative h-[400px] w-full">
						<Image
							src="/images/kamo4.png"
							alt="Market Modes"
							fill
							className="object-contain object-center"
							priority
						/>
					</div>
				</div>
			</Section>

			<Section title="Trading Strategy">
				<div className="space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
						<div className="space-y-6">
							<div className="p-6 bg-primary/10 rounded-lg">
								<h4 className="font-semibold mb-4">
									How to Identify Market Mode
								</h4>
								<p className="text-foreground/80">
									Compare your prediction of future APY with current Implied
									APY:
								</p>
								<ul className="mt-4 space-y-2">
									<li className="flex items-center gap-2">
										<span className="text-primary">•</span>
										<span>
											If Implied APY {">"} Your Prediction: Cheap PT Mode
										</span>
									</li>
									<li className="flex items-center gap-2">
										<span className="text-primary">•</span>
										<span>
											If Implied APY {"<"} Expected APY: Cheap YT Mode
										</span>
									</li>
								</ul>
							</div>

							<div className="p-6 border border-primary/20 rounded-lg bg-primary/5">
								<h4 className="font-bold text-primary mb-4">Pro Tips</h4>
								<ul className="space-y-2">
									<li className="flex items-center gap-2">
										<span className="text-primary">•</span>
										<span>Watch for market volatility</span>
									</li>
									<li className="flex items-center gap-2">
										<span className="text-primary">•</span>
										<span>Trade more frequently during high volatility</span>
									</li>
									<li className="flex items-center gap-2">
										<span className="text-primary">•</span>
										<span>
											Consider holding underlying asset to hedge risks
										</span>
									</li>
								</ul>
							</div>
						</div>
						<div className="relative h-[500px] w-full">
							<Image
								src="/images/kamo5.png"
								alt="Trading Strategy"
								fill
								className="object-contain object-center"
								priority
							/>
						</div>
					</div>
				</div>
			</Section>

			<Section title="Real World Example">
				<div className="space-y-6">
					<div className="p-6 bg-primary/10 rounded-lg">
						<h4 className="font-semibold mb-4">Trading Timeline</h4>
						<div className="relative overflow-x-auto">
							<div className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div className="p-4 bg-background/50 rounded-lg">
										<h5 className="font-semibold mb-2">Initial Position</h5>
										<ul className="space-y-1 text-sm">
											<li>Buy 100 YT haSUI</li>
											<li>Cost: 4.3 haSUI</li>
											<li>Predicted APY: 5.5%</li>
											<li>Market APY: 4.5%</li>
										</ul>
									</div>
									<div className="p-4 bg-background/50 rounded-lg">
										<h5 className="font-semibold mb-2">After 3 Months</h5>
										<ul className="space-y-1 text-sm">
											<li>Sell YT for PT</li>
											<li>Earned: 1.23 haSUI</li>
											<li>New Position: 5.37 PT</li>
											<li>APY so far: 107%</li>
										</ul>
									</div>
									<div className="p-4 bg-background/50 rounded-lg">
										<h5 className="font-semibold mb-2">Final Result</h5>
										<ul className="space-y-1 text-sm">
											<li>Exit to haSUI</li>
											<li>Final: 5.301 haSUI</li>
											<li>Started: 4.3 haSUI</li>
											<li>Total APY: 32.2%</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="p-6 border border-primary/20 rounded-lg bg-primary/5">
						<h4 className="font-bold text-primary mb-4">Risk vs Reward</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h5 className="font-semibold mb-2">YT Trading</h5>
								<p className="text-foreground/80">
									Higher risk and reward. Correct trades bring large profits,
									wrong trades can lead to significant losses.
								</p>
							</div>
							<div>
								<h5 className="font-semibold mb-2">PT Trading</h5>
								<p className="text-foreground/80">
									Lower risk and reward. More stable returns but smaller
									potential profits.
								</p>
							</div>
						</div>
					</div>
				</div>
			</Section>
		</div>
	);
};
