import { Card, Button, Tooltip } from "@heroui/react";
import {
  InformationCircleIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Transaction from "../interfaces/transaction";

const TransactionCard = ({ data }: { data: Transaction }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyUser = async () => {
    try {
      await navigator.clipboard.writeText(data.user);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleKeyDownCopy = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCopyUser();
    }
  };

  return (
    <Card className="bg-[#F8FAFD] p-4 space-y-3 my-2" shadow="none">
      {/* User Row */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">User</span>
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-mono">{data.user}</span>
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            className="h-5 w-5 min-w-5 text-gray-400 hover:text-white"
            onPress={handleCopyUser}
            onKeyDown={handleKeyDownCopy}
            aria-label={copied ? "Copied user address" : "Copy user address"}
            tabIndex={0}
          >
            <DocumentDuplicateIcon className="h-3 w-3" />
          </Button>
          {copied && <span className="text-green-400 text-xs">Copied!</span>}
        </div>
      </div>

      {/* Action Row */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">Action</span>
        <div className="flex items-center gap-1">
          <span className="text-blue-400 text-sm font-medium">
            {data.action}
          </span>
          <Tooltip content="Information about Long Yield action">
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              className="h-4 w-4 min-w-4 text-gray-400 hover:text-blue-400"
              aria-label="Action information"
              tabIndex={0}
            >
              <InformationCircleIcon className="h-3 w-3" />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Implied APY Row */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">Implied APY</span>
        <span className="text-black text-sm font-medium">
          {data.impliedAPY}
        </span>
      </div>

      {/* Value Row */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">Value</span>
        <span className="text-black text-sm font-medium">{data.ptAmount}</span>
      </div>

      {/* Notional Size Row */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">Notional Size</span>
        <span className="text-black text-sm font-medium">{data.syAmount}</span>
      </div>

      {/* Time Row */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">Time</span>
        <span className="text-black text-sm font-medium">{data.time}</span>
      </div>
    </Card>
  );
};

export default TransactionCard;
