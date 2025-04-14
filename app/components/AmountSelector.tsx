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
          className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          onClick={() => handlePercentageClick(25)}
        >
          25%
        </button>
        <button
          className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          onClick={() => handlePercentageClick(50)}
        >
          50%
        </button>
        <button
          className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          onClick={() => handlePercentageClick(75)}
        >
          75%
        </button>
        <button
          className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
          onClick={() =>
            balance && onAmountChange(formatAmount(parseFloat(balance)))
          }
        >
          Max
        </button>
      </div>
      <div className="text-sm text-gray-500">Balance: {displayBalance}</div>
    </div>
  );
};

export default AmountSelector;
