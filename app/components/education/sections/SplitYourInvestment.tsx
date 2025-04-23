import Image from "next/image";
import { Section } from "@/app/components/education/Section";

export const SplitYourInvestment = () => {
	return (
		<div className="space-y-12">
			<Section title="How Splitting Works">
				<div className="space-y-8">
					<div className="relative h-[500px] w-full mb-8">
						<Image
							src="/images/tokenize.png"
							alt="How Investment Splitting Works"
							fill
							className="object-contain object-center"
							priority
						/>
					</div>
					<p className="text-foreground/80">
						Here's what happens when you put 100 haSUI into Kamo:
					</p>
					<ul className="mt-4 space-y-2">
						<li className="flex items-center gap-2">
							<span className="text-primary">1.</span>
							<span>
								You get Principal Tokens worth X SUI - You can get your X SUI
								back when the time period ends (X based on staking rate when you
								put in the 100 haSUI)
							</span>
						</li>
						<li className="flex items-center gap-2">
							<span className="text-primary">2.</span>
							<span>
								You get Yield Tokens - These give you the rewards earned during
								the entire period
							</span>
						</li>
					</ul>
				</div>
			</Section>
			<Section title="What can you do with PT and YT?">
				<div className="space-y-12 max-w-4xl mx-auto">
					<div className="relative">
						<div className="absolute left-8 h-full w-0.5 bg-primary/20"></div>

						<div className="space-y-8">
							{/* Before Maturity Actions */}
							<h3 className="text-xl font-bold text-primary mb-6">
								Before Maturity
							</h3>

							<div className="relative pl-16">
								<div className="absolute left-7 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
								<div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
									<h4 className="font-bold mb-2">Mint PT and YT</h4>
									<p>
										You can mint 1 PT and 1 YT from 1 unit of the underlying
										asset.
									</p>
									<p className="text-sm text-foreground/60 mt-2">
										Mint action before maturity
									</p>
								</div>
							</div>

							<div className="relative pl-16">
								<div className="absolute left-7 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
								<div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
									<h4 className="font-bold mb-2">Redeem Underlying Asset</h4>
									<p>
										You can redeem 1 unit of underlying asset from 1 PT + 1 YT.
									</p>
									<p className="text-sm text-foreground/60 mt-2">
										Redeeming underlying asset before maturity
									</p>
								</div>
							</div>

							<div className="relative pl-16">
								<div className="absolute left-7 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
								<div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
									<h4 className="font-bold mb-2">Claim Yield</h4>
									<p>YT holders can claim any accrued yield in real-time.</p>
									<p className="text-sm text-foreground/60 mt-2">
										Claiming accrued yield before maturity
									</p>
								</div>
							</div>

							{/* After Maturity Actions */}
							<h3 className="text-xl font-bold text-primary mb-6">
								After Maturity
							</h3>

							<div className="relative pl-16">
								<div className="absolute left-7 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
								<div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
									<h4 className="font-bold mb-2">Redeem Without YT</h4>
									<p>PT holders can redeem underlying asset 1:1 without YT.</p>
									<p className="text-sm text-foreground/60 mt-2">
										Redeeming underlying asset without YT after maturity
									</p>
								</div>
							</div>

							{/* Anytime Actions */}
							<h3 className="text-xl font-bold text-primary mb-6">Anytime</h3>

							<div className="relative pl-16">
								<div className="absolute left-7 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
								<div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
									<h4 className="font-bold mb-2">Trade on Open Market</h4>
									<p>
										You can buy and sell PT and YT on the open market using Kamo
										AMM.
									</p>
									<p className="mt-4">
										As such, PT and YT will always have a market price. We will
										talk more about trading PT and YT in the next levels.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Section>
			<Section title="Why Split Your Investment?">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="space-y-6">
						<div className="p-6 border border-primary/20 rounded-lg bg-primary/5">
							<h4 className="font-bold mb-4 text-xl">
								Benefits of Principal Tokens
							</h4>
							<ul className="space-y-3">
								<li className="flex items-center gap-2">
									<span className="text-primary text-xl">•</span>
									<span>Know exactly how much you'll get back</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="text-primary text-xl">•</span>
									<span>Keep your investment safe</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="text-primary text-xl">•</span>
									<span>Lower risk</span>
								</li>
							</ul>
						</div>
						<div className="relative h-[300px] w-full">
							<Image
								src="/images/kamo1.png"
								alt="Kamo Mascot"
								fill
								className="object-contain object-center"
								priority
							/>
						</div>
					</div>
					<div className="space-y-6">
						<div className="p-6 border border-primary/20 rounded-lg bg-primary/5">
							<h4 className="font-bold mb-4 text-xl">
								Benefits of Yield Tokens
							</h4>
							<ul className="space-y-3">
								<li className="flex items-center gap-2">
									<span className="text-primary text-xl">•</span>
									<span>Earn more from yield farming</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="text-primary text-xl">•</span>
									<span>Get higher returns</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="text-primary text-xl">•</span>
									<span>Trade your future rewards</span>
								</li>
							</ul>
						</div>
						<div className="relative h-[300px] w-full">
							<Image
								src="/images/kamo2.png"
								alt="Kamo Mascot"
								fill
								className="object-contain object-center"
								priority
							/>
						</div>
					</div>
				</div>
			</Section>
		</div>
	);
};
