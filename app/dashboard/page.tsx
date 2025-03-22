'use client';

import Image from 'next/image';
import { useState } from 'react';

type TabType = 'LP' | 'PT' | 'YO';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('LP');

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Portfolio Section */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900 mb-6">My Portfolio</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Balance</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-medium">$2357</span>
                  <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded">+$15</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average APY</span>
                <div className="flex items-center gap-2">
                  <span>4.2%</span>
                  <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded">+1.1%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Swap Fees Earned</span>
                <div className="flex items-center gap-2">
                  <span>$135</span>
                  <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded">+$4</span>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Buy Kamo
            </button>

            <div className="mt-8 flex justify-center">
              <div className="relative w-64 h-64">
                <Image
                  src="/images/tokenization.PNG"
                  alt="Kamo Mascot"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </section>

          {/* My Positions Section */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900 mb-6">My Positions</h2>
            
            {/* Position Tabs */}
            <div className="flex gap-2 mb-6">
              <button 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'LP' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('LP')}
              >
                LP Positions
              </button>
              <button 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'PT' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('PT')}
              >
                PT Positions
              </button>
              <button 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'YO' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('YO')}
              >
                YO Position
              </button>
            </div>

            {/* Position Content */}
            {activeTab === 'LP' && (
              <div className="space-y-6">
                {/* SUI/USDC Position */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">SUI/USDC</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Value of Position</span>
                      <div className="flex items-center gap-2">
                        <span>$1664</span>
                        <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded">+$264</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average APY</span>
                      <span>4.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Swap Fees Earned</span>
                      <span>$135</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tokens</span>
                      <span>723 SUI / $1400 USDC</span>
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
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Value of Position</span>
                      <div className="flex items-center gap-2">
                        <span>$854</span>
                        <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded">+$154</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average APY</span>
                      <span>3.6%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Swap Fees Earned</span>
                      <span>$79</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tokens</span>
                      <span>234 SUI / $569 USDC</span>
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
            )}

            {/* PT Positions Content */}
            {activeTab === 'PT' && (
              <div className="space-y-6">
                {/* SUI Principal Token */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">SUI Principal Token</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Value of Position</span>
                      <div className="flex items-center gap-2">
                        <span>$1000</span>
                        <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded">+$146</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Fixed APY</span>
                      <span>4.9%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Days Left</span>
                      <span>81</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Maturity Date</span>
                      <span>June 7 2025</span>
                    </div>
                    <div className="mt-4">
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div className="bg-green-600 h-2 rounded-full w-3/4"></div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Progress to Maturity</div>
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
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Value of Position</span>
                      <div className="flex items-center gap-2">
                        <span>$3500</span>
                        <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded">+$465</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Fixed APY</span>
                      <span>6%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Days Left</span>
                      <span>17</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Maturity Date</span>
                      <span>April 7 2025</span>
                    </div>
                    <div className="mt-4">
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div className="bg-green-600 h-2 rounded-full w-4/5"></div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Progress to Maturity</div>
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
            )}

            {/* YO Position Content */}
            {activeTab === 'YO' && (
              <div className="space-y-6">
                {/* SUI Yield Token */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">SUI Yield Token</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Value of Position</span>
                      <div className="flex items-center gap-2">
                        <span>$1500</span>
                        <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded">+$255</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Underlying APY</span>
                      <div className="flex items-center gap-2">
                        <span>8.2%</span>
                        <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded">+0.3%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Claimed Yield</span>
                      <div className="flex items-center gap-2">
                        <span>102</span>
                        <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded">+5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Days Left</span>
                      <span>120 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Position Start</span>
                      <span>Jan 15, 2024</span>
                    </div>
                    <div className="mt-4">
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div className="bg-green-600 h-2 rounded-full w-2/3"></div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Progress to Maturity</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Claim Yield
                    </button>
                    <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      Transfer
                    </button>
                  </div>
                </div>

                {/* Kamo Yield Token */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Kamo Yield Token</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Value of Position</span>
                      <div className="flex items-center gap-2">
                        <span>$3000</span>
                        <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded">+$420</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Underlying APY</span>
                      <div className="flex items-center gap-2">
                        <span>12.5%</span>
                        <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded">+0.8%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Claimed Yield</span>
                      <div className="flex items-center gap-2">
                        <span>322</span>
                        <span className="text-green-500 text-sm bg-green-50 px-2 py-1 rounded">+12</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Days Left</span>
                      <span>90 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Position Start</span>
                      <span>Dec 1, 2023</span>
                    </div>
                    <div className="mt-4">
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div className="bg-green-600 h-2 rounded-full w-4/5"></div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Progress to Maturity</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Claim Yield
                    </button>
                    <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      Transfer
                    </button>
                  </div>
                </div>

                <button className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Add YO Position
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
} 