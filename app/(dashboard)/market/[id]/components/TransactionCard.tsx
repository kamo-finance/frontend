import { Card } from "@heroui/react";
import Transaction from "../interfaces/transaction";

const TransactionCard = ({ transactions }: { transactions: Transaction }) => {
  return (
    <Card className="bg-[#F8FAFD] p-4 space-y-3 my-2" shadow="none">
      {/* User Row */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">User</span>
        <div className="flex items-center gap-2">
          <span className="text-black text-sm font-mono">
            {transactions.user}
          </span>
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">Action</span>
        <div className="flex items-center gap-1">
          <span
            className={`${
              transactions.action === "Short Yield"
                ? "text-[#0FA67F]"
                : "text-[#2E67F6]"
            } text-sm font-medium`}
          >
            {transactions.action}
          </span>
        </div>
      </div>

      {/* Implied APY Row */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">Implied APY</span>
        <span className="text-black text-sm font-medium">
          {transactions.impliedAPY}
        </span>
      </div>

      {/* Value Row */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">PT</span>
        <span className="text-black text-sm font-medium">
          {transactions.ptAmount}
        </span>
      </div>

      {/* Notional Size Row */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">SY</span>
        <span className="text-black text-sm font-medium">
          {transactions.syAmount}
        </span>
      </div>

      {/* Time Row */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">Time</span>
        <span className="text-black text-sm font-medium">
          {transactions.time}
        </span>
      </div>
    </Card>
  );
};

export default TransactionCard;
