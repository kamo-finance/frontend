import React from "react";

interface AmountSelectorProps {
	balance?: string;
	onAmountChange: (amount: string) => void;
	className?: string;
}

const AmountSelector: React.FC<AmountSelectorProps> = ({
	balance,
	onAmountChange,
	className = "",
}) => {
	const formatAmount = (value: number): string => {
		return (Math.floor(value * 100) / 100).toFixed(2);
	};

	const handlePercentageClick = (percentage: number) => {
		if (!balance) return;
		const amount = parseFloat(balance) * (percentage / 100);
		onAmountChange(formatAmount(amount));
	};

	const displayBalance = balance ? formatAmount(parseFloat(balance)) : "0.00";

	return (
		<div className={`flex items-center justify-between ${className}`}>
			<div className="flex gap-2">
				<button
					onClick={() => handlePercentageClick(25)}
					className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
				>
					25%
				</button>
				<button
					onClick={() => handlePercentageClick(50)}
					className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
				>
					50%
				</button>
				<button
					onClick={() => handlePercentageClick(75)}
					className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
				>
					75%
				</button>
				<button
					onClick={() =>
						balance && onAmountChange(formatAmount(parseFloat(balance)))
					}
					className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
				>
					Max
				</button>
			</div>
			<div className="text-sm text-gray-500">Balance: {displayBalance}</div>
		</div>
	);
};

export default AmountSelector;
