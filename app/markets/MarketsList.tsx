"use client";

import React from 'react';
import Link from 'next/link'
import { STATE_ADDRESS_MAP, SUPPORTED_MARKETS } from '@kamo-finance/ts-sdk';
import { truncateSuiObjectId } from "@/libs"
import { useRouter } from 'next/navigation';

const MarketsList: React.FC = () => {
    const router = useRouter();

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
                    <React.Fragment key={market.id}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div
                                onClick={() => router.push(`/market/${market.id}`)}
                                key={`${market.id}-${index}`}
                                className="bg-white rounded-2xl p-6 gap-4 flex flex-col items-start transition-all duration-300 hover:shadow-lg border-2 border-gray-100 cursor-pointer"
                            >
                                <div className='flex flex-row items-center justify-center p-1 rounded-md gap-2'>
                                    <h2 className="text-xl font-semibold text-gray-800">{market.name}</h2>
                                    <Link
                                        href={`https://testnet.suivision.xyz/object/${market.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-green-600 px-1 rounded-lg border-2 hover:underline"
                                    >
                                        {truncateSuiObjectId(market.id)}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div >
    );
};

export default MarketsList; 