import React from 'react';
import Link from 'next/link'
import { STATE_ADDRESS_MAP, SUPPORTED_MARKETS } from '@kamo-finance/ts-sdk';

const MarketsList: React.FC = () => {
    // only show KUSDC
    const markets = Object.values(SUPPORTED_MARKETS).filter((market) => market === 'KUSDC').map((market) => ({
        id: STATE_ADDRESS_MAP.get(market),
        name: market,
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Market List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {markets.map(market => (
                    <div 
                        key={market.id} 
                        className="bg-white rounded-2xl p-6 flex flex-col items-center transition-all duration-300 hover:shadow-lg border border-gray-100"
                    >
                        <h2 className="text-xl font-semibold mb-3 text-gray-800">{market.name}</h2>
                        <p className="text-gray-600 text-center mb-4">Details about {market.name}</p>
                        <Link 
                            href={`/market/${market.id}`}
                            className="mt-auto bg-green-500 text-white rounded-xl px-6 py-2.5 font-medium hover:bg-green-600 transition-colors"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarketsList; 