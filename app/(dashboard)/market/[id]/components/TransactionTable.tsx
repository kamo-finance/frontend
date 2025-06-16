import React from "react";
import Transaction from "../interfaces/transaction";

function TransactionTable({ data }: { data: Transaction[] }) {
  return (
    <div className="bg-[#E8E3CA] rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-[#5E6B81] text-xs">
            <th className="text-left py-3 px-4">User</th>
            <th className="text-left py-3 px-4">Action</th>
            <th className="text-left py-3 px-4">Implied APY</th>
            <th className="text-left py-3 px-4">SY</th>
            <th className="text-left py-3 px-4">PT</th>
            <th className="text-left py-3 px-4">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tx, index) => (
            <tr
              key={index}
              className="border-t border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors text-sm"
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-1">
                  {tx.user}
                  <button className="text-[#5E6B81] hover:text-[#2E67F6]">
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
                  </button>
                </div>
              </td>
              <td className="py-3 px-4">
                <span
                  className={`${
                    tx.action === "Short Yield"
                      ? "text-[#0FA67F]"
                      : "text-[#2E67F6]"
                  }`}
                >
                  {tx.action}
                </span>
              </td>
              <td className="py-3 px-4">{tx.impliedAPY}</td>
              <td className="py-3 px-4">{tx.syAmount}</td>
              <td className="py-3 px-4">{tx.ptAmount}</td>
              <td className="py-3 px-4">{tx.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
