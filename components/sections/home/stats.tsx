export const Stats = () => {
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
		<>
			<section className="bg-gray-50 py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-gray-800 mb-8">
						Top Yield Markets
					</h2>
					<div className="grid md:grid-cols-3 gap-6">
						{topMarkets.map((market, index) => (
							<div
								key={index}
								className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all"
							>
								<div className="flex items-center gap-3 mb-4">
									<span className="text-2xl">{market.icon}</span>
									<span className="text-xl font-medium text-gray-800">
										{market.name}
									</span>
								</div>
								<div className="flex items-baseline gap-2">
									<span className="text-3xl font-bold text-green-600">
										{market.apy}
									</span>
									<span className="text-gray-500">{market.type}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-white py-20">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-2 gap-12">
						<div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
							<div className="text-4xl font-bold text-green-600 mb-2">
								$3,058,844,280
							</div>
							<div className="flex items-center justify-center gap-2">
								<span className="text-xl font-medium text-gray-600">
									Total Value Locked
								</span>
								<div className="flex items-center text-emerald-500">
									<span className="text-sm">↑</span>
									<span className="text-sm">2.4%</span>
								</div>
							</div>
						</div>

						<div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
							<div className="text-4xl font-bold text-green-600 mb-2">
								$45,801,377,334
							</div>
							<div className="flex items-center justify-center gap-2">
								<span className="text-xl font-medium text-gray-600">
									Total Trading Volume
								</span>
								<div className="flex items-center text-emerald-500">
									<span className="text-sm">↑</span>
									<span className="text-sm">5.7%</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
