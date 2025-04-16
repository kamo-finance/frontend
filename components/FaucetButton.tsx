"use client";

import React, { useState } from "react";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { addToast, Button } from "@heroui/react";
import { newKamoTransaction, KUSDCTransaction } from "@kamo-finance/ts-sdk";

import Modal from "./Modal";

const FaucetButton: React.FC = () => {
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [txResult, setTxResult] = useState<{
    success: boolean;
    message: string;
    explorerUrl?: string;
  } | null>(null);

  const handleFaucet = async () => {
    if (!account) {
      addToast({
        title: "Error",
        description: "Please connect your wallet first",
        severity: "danger",
      });

      return;
    }

    try {
      const tx = new Transaction();
      const kamoTx = newKamoTransaction({
        market: "KUSDC",
      });

      (kamoTx as KUSDCTransaction).faucet_kusdc({
        tx,
        sender: account.address,
      });
      tx.setSender(account.address);
      tx.setGasBudget(100000000);

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
              explorerUrl: `https://testnet.suivision.xyz/txblock/${result.digest}?tab=Changes`,
            });
            setIsActiveModal(true);
          },
          onError: (error) => {
            setTxResult({
              success: false,
              message: `Transaction failed: ${error.message}`,
            });
            setIsActiveModal(true);
          },
        },
      );
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to get kUSDC from faucet",
        severity: "danger",
      });
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Button
          color="secondary"
          onPress={handleFaucet}
        >
          Faucet kUSDC
        </Button>
      </div>

      <Modal
        isOpen={isActiveModal}
        size="lg"
        title={
          txResult?.success ? "Transaction Successful" : "Transaction Failed"
        }
        type={txResult?.success ? "success" : "error"}
        onClose={() => setIsActiveModal(false)}
      >
        <div>
          <p className="mb-4">{txResult?.message}</p>
          {txResult?.success && txResult?.explorerUrl && (
            <a
              className="text-blue-500 hover:text-blue-600 underline"
              href={txResult.explorerUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              View on Explorer
            </a>
          )}
        </div>
      </Modal>
    </>
  );
};

export default FaucetButton;
