export const LPPositions = () => {
  return (
    <div className="space-y-6">
      {/* SUI/USDC Position */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">SUI/USDC</span>
          <span className="font-medium">$1664</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tokens</span>
            <span>723 SUI / $1400 USDC</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Average APY</span>
            <span>4.2%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Swap Fees Earned</span>
            <span>$135</span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
            Add Liquidity
          </button>
          <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Remove
          </button>
        </div>
      </div>

      {/* Kamo/SUI Position */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Kamo/SUI</span>
          <span className="font-medium">$854</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tokens</span>
            <span>234 SUI / $569 USDC</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Average APY</span>
            <span>3.6%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Swap Fees Earned</span>
            <span>$79</span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
            Add Liquidity
          </button>
          <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Remove
          </button>
        </div>
      </div>

      <button className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
        Add LP Position
      </button>
    </div>
  );
};
