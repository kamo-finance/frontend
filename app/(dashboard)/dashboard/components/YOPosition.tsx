export const YOPosition = () => {
  return (
    <div className="space-y-6">
      {/* SUI Yield Token */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">SUI Yield Token</span>
          <span className="font-medium">$4238</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Underlying SUI</span>
            <span>2158</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Variable APY</span>
            <span>8.7%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Accrued Yield</span>
            <span>$396</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Last Claim</span>
            <span>2 days ago</span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
            Claim Yield
          </button>
          <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Withdraw
          </button>
        </div>
      </div>

      {/* Kamo Yield Token */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Kamo Yield Token</span>
          <span className="font-medium">$1745</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Underlying Kamo</span>
            <span>902</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Variable APY</span>
            <span>9.4%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Accrued Yield</span>
            <span>$396</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Last Claim</span>
            <span>9 days ago</span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
            Claim Yield
          </button>
          <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Withdraw
          </button>
        </div>
      </div>

      <button className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
        Add YO Position
      </button>
    </div>
  );
};
