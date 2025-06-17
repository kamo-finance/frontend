import { Button } from "@heroui/button";
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
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onPress={() => handlePercentageClick(25)}>
          25%
        </Button>
        <Button size="sm" onPress={() => handlePercentageClick(50)}>
          50%
        </Button>
        <Button size="sm" onPress={() => handlePercentageClick(75)}>
          75%
        </Button>
        <Button
          size="sm"
          onPress={() =>
            balance && onAmountChange(formatAmount(parseFloat(balance)))
          }
        >
          Max
        </Button>
      </div>
      <div className="text-sm text-gray-500">Balance: {displayBalance}</div>
    </div>
  );
};

export default AmountSelector;
