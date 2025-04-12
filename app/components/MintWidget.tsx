'use client';

import React, { useEffect, useState } from 'react';
import { FaExchangeAlt, FaChevronDown, FaTimes } from 'react-icons/fa';
import { FixedPoint64, KamoClient, KamoTransaction, newKamoTransaction, suiClient } from '@kamo-finance/ts-sdk';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import Modal from './Modal';
import { addToast } from '@heroui/react';
import { error } from 'console';

interface MintWidgetProps {
    marketId: string;
}

interface TransactionResult {
    success: boolean;
    message: string;
    explorerUrl?: string;
}

const MintWidget: React.FC<MintWidgetProps> = ({ marketId }) => {
    const [activeTab, setActiveTab] = useState<'mint' | 'redeem'>('mint');
    const [syAmount, setSyAmount] = useState<string>('');
    const [ptAmount, setPtAmount] = useState<string>('');
    const [ytAmount, setYtAmount] = useState<string>('');
    const [syBalance, setSyBalance] = useState<string>('0');
    const [ptBalance, setPtBalance] = useState<string>('0');
    const [ytBalance, setYtBalance] = useState<string>('0');
    const [showModal, setShowModal] = useState(false);
    const [txResult, setTxResult] = useState<TransactionResult | null>(null);
    const account = useCurrentAccount();
	const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

    // // Mock balances - sẽ được thay thế bằng dữ liệu thực từ blockchain
    // const balances = {
    //     sy: '1000.00',
    //     pt: '500.00',
    //     yt: '500.00'
    // };

    const activeTabChanged = (tab: 'mint' | 'redeem') => {
        setActiveTab(tab);
        setSyAmount('');
        setPtAmount('');
        setYtAmount('');
    };

    const fetchBalances = async (address: string, marketId: string) => {
        if (!address) return;
        const kamoClient = new KamoClient({
            client: suiClient,
        }); 
        const balances = await kamoClient.getBalances({
            stateId: marketId,
            owner: address,
        });
        setSyBalance((balances.syBalance.totalBalance / 10 ** 6).toString());
        setPtBalance((balances.ptBalance.totalBalance / 10 ** 6).toString());
        setYtBalance((Number(balances.yoBalance) / 10 ** 6).toString());
    };


    useEffect(() => {
        if (!account?.address) return;
        fetchBalances(account?.address, marketId);
    }, [account?.address]);

    const handleMint = async () => {
        if (!account?.address) return;
        const syAmountTrimmed = syAmount.trim();
        if (!syAmountTrimmed || parseFloat(syAmountTrimmed) <= 0) {
            addToast({
                title: "Error",
                description: "Invalid input",
                severity: "danger",
            });
            return;
        }
        const kamoTx = newKamoTransaction({
            market: "KUSDC",
        });
        const tx = new Transaction();
        await kamoTx.mint({
            tx, 
            sender: account?.address,
            sy_amount_in: BigInt(Math.floor(parseFloat(syAmountTrimmed) * 10 ** 6)),
        });
        tx.setSender(account?.address);
        signAndExecuteTransaction(
            {
                transaction: tx,
                chain: "sui:testnet",
            },
            {
                onSuccess: (result) => {
                    setTxResult({
                        success: true,
                        message: `Transaction successful! Digest: ${result.digest}`,
                        explorerUrl: `https://testnet.suivision.xyz/txblock/${result.digest}?tab=Changes`
                    });
                    setShowModal(true);
                },
                onError: (error) => {
                    setTxResult({
                        success: false,
                        message: `Transaction failed: ${error.message}`
                    });
                    setShowModal(true);
                },
            },
        );
    };

    const handleRedeem = async () => {
        if (!account?.address) return;
        const ptAmountTrimmed = ptAmount.trim();
        if (!ptAmountTrimmed || parseFloat(ptAmountTrimmed) <= 0) {
            addToast({
                title: "Error",
                description: "Invalid input",
                severity: "danger",
            });
            return;
        }
        const kamoTx = newKamoTransaction({
            market: "KUSDC",
        });
        const tx = new Transaction();
        await kamoTx.redeemBeforeMaturity({
            tx, 
            sender: account?.address,
            ptAmountBurned: BigInt(Math.floor(parseFloat(ptAmountTrimmed) * 10 ** 6)),
        });
        tx.setSender(account?.address);
        signAndExecuteTransaction(
            {
                transaction: tx,
                chain: "sui:testnet",
            },
            {
                onSuccess: (result) => {
                    setTxResult({
                        success: true,
                        message: `Transaction successful! Digest: ${result.digest}`,
                        explorerUrl: `https://testnet.suivision.xyz/txblock/${result.digest}?tab=Changes`
                    });
                    setShowModal(true);
                },
                onError: (error) => {
                    setTxResult({
                        success: false,
                        message: `Transaction failed: ${error.message}`
                    });
                    setShowModal(true);
                },
            },
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">
            
            {/* Balance Display */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-sm text-blue-600 mb-1">SY Balance</div>
                    <div className="text-lg font-semibold text-blue-700">{syBalance}</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-sm text-green-600 mb-1">PT Balance</div>
                    <div className="text-lg font-semibold text-green-700">{ptBalance}</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4">
                    <div className="text-sm text-yellow-600 mb-1">YT Balance</div>
                    <div className="text-lg font-semibold text-yellow-700">{ytBalance}</div>
                </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => activeTabChanged('mint')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'mint'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Mint PT & YT
                </button>
                <button
                    onClick={() => activeTabChanged('redeem')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'redeem'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Redeem SY
                </button>
            </div>

            {/* Input Fields */}
            {activeTab === 'mint' ? (
                <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-500 mb-2">Input SY Amount</div>
                        <input
                            type="text"
                            value={syAmount}
                            onChange={async (e) => {
                                const inputValue = e.target.value.trim();
                                if (!inputValue) {
                                    setPtAmount('');
                                    setYtAmount('');
                                    setSyAmount('');
                                    return;
                                }
                                try {
                                    if (parseFloat(inputValue) > parseFloat(syBalance)) {
                                        addToast({
                                            title: "Error",
                                            description: "Insufficient balance",
                                            severity: "danger",
                                        });
                                        return;
                                    }
                                    setSyAmount(inputValue);
                                    const kamoTx = newKamoTransaction({
                                        market: "KUSDC",
                                    });
                                    const syAmountScaled = BigInt(Math.floor(parseFloat(inputValue) * 10 ** 6));
                                    console.log(parseFloat(inputValue));
                                    const exchangeRate = await kamoTx.getSyExchangeRate();
                                    const ptAmount = exchangeRate.mul_bigint(syAmountScaled).toBigNumber().div(10 ** 6).toString();
                                    setPtAmount(ptAmount);
                                    setYtAmount(ptAmount);
                                } catch (error) {
                                    addToast({
                                        title: "Error",
                                        description: "Invalid input",
                                        severity: "danger",
                                    });
                                }
                            }}
                            placeholder="0.00"
                            className="w-full bg-transparent text-xl outline-none text-gray-800"
                        />
                        <div className="text-right text-sm text-gray-500">
                            Balance: {syBalance}
                        </div>
                    </div>

                    <div className="flex justify-center -my-2">
                        <div className="bg-white border border-gray-200 p-2 rounded-lg">
                            <FaExchangeAlt className="text-blue-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="text-sm text-gray-500 mb-2">PT Amount</div>
                            <div className="text-xl text-gray-800">≈ {syAmount || '0.00'}</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="text-sm text-gray-500 mb-2">YT Amount</div>
                            <div className="text-xl text-gray-800">≈ {syAmount || '0.00'}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="text-sm text-gray-500 mb-2">Input PT Amount</div>
                            <input
                                type="text"
                                value={ptAmount}
                                onChange={async (e) => {
                                    const inputValue = e.target.value.trim();
                                    if (!inputValue) {
                                        setPtAmount('');
                                        setYtAmount('');
                                        setSyAmount('');
                                        return;
                                    }
                                    try {
                                        if (parseFloat(inputValue) > parseFloat(ptBalance) || 
                                            parseFloat(inputValue) > parseFloat(ytBalance)) {
                                            addToast({
                                                title: "Error",
                                                description: "Insufficient balance",
                                                severity: "danger",
                                            });
                                            return;
                                        }
                                        setPtAmount(inputValue);
                                        setYtAmount(inputValue);
                                        const kamoTx = newKamoTransaction({
                                            market: "KUSDC",
                                        });
                                        const exchangeRate = await kamoTx.getSyExchangeRate();
                                        const syAmount = FixedPoint64.CreateFromU128(BigInt(Math.floor(parseFloat(inputValue) * 10 ** 6))).div(exchangeRate).toBigNumber().div(10 ** 6).toString();
                                        setSyAmount(syAmount);
                                    } catch (error) {
                                        addToast({
                                            title: "Error",
                                            description: "Invalid input",
                                            severity: "danger",
                                        });
                                    }
                                }}
                                placeholder="0.00"
                                className="w-full bg-transparent text-xl outline-none text-gray-800"
                            />
                            <div className="text-right text-sm text-gray-500">
                                Balance: {ptBalance}
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="text-sm text-gray-500 mb-2">Input YT Amount</div>
                            <input
                                type="text"
                                value={ytAmount}
                                placeholder="0.00"
                                className="w-full bg-transparent text-xl outline-none text-gray-800"
                                readOnly
                            />
                            <div className="text-right text-sm text-gray-500">
                                Balance: {ytBalance}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center -my-2">
                        <div className="bg-white border border-gray-200 p-2 rounded-lg">
                            <FaExchangeAlt className="text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-500 mb-2">SY Amount</div>
                        <div className="text-xl text-gray-800">≈ {ptAmount || '0.00'}</div>
                    </div>
                </div>
            )}

            {/* Action Button */}
            <button
                onClick={activeTab === 'mint' ? handleMint : handleRedeem}
                className="w-full mt-6 bg-blue-500 text-white rounded-xl px-6 py-3 font-medium hover:bg-blue-600 transition-colors"
            >
                {activeTab === 'mint' ? 'Mint PT & YT' : 'Redeem SY'}
            </button>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onAfterClose={() => {
                    setSyAmount('');
                    setPtAmount('');
                    setYtAmount('');
                    if (account?.address) {
                        fetchBalances(account?.address, marketId);
                    }
                }}
                title={txResult?.success ? 'Transaction Successful' : 'Transaction Failed'}
                type={txResult?.success ? 'success' : 'error'}
                size="lg"
            >
                <div>
                    <p className="mb-4">{txResult?.message}</p>
                    {txResult?.success && txResult?.explorerUrl && (
                        <a 
                            href={txResult.explorerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600 underline"
                        >
                            View on Explorer
                        </a>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default MintWidget; 