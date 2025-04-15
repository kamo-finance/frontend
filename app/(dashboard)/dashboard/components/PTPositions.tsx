export const PTPositions = () => {
  return (
    <div className="space-y-6">
      {/* SUI Principal Token */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">SUI Principal Token</span>
          <span className="font-medium">$854</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Maturity Date</span>
            <span>June 7 2025</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Fixed APY</span>
            <span>4.9%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Days Left</span>
            <span>81</span>
          </div>
          <div className="mt-4">
            <div className="bg-gray-200 h-2 rounded-full">
              <div className="bg-green-600 h-2 rounded-full w-3/4" />
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Progress to Maturity
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
            Redeem Early
          </button>
          <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Transfer
          </button>
        </div>
      </div>

      {/* Kamo Principal Token */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Kamo Principal Token</span>
          <span className="font-medium">$3035</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Maturity Date</span>
            <span>April 7 2025</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Fixed APY</span>
            <span>6%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Days Left</span>
            <span>17</span>
          </div>
          <div className="mt-4">
            <div className="bg-gray-200 h-2 rounded-full">
              <div className="bg-green-600 h-2 rounded-full w-4/5" />
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Progress to Maturity
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
            Redeem Early
          </button>
          <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Transfer
          </button>
        </div>
      </div>

      <button className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
        Add PT Position
      </button>
    </div>
  );
};
