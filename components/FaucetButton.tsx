"use client";

import React from "react";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { addToast, Button } from "@heroui/react";
import { newKamoTransaction, KUSDCTransaction } from "@kamo-finance/ts-sdk";

import { useShowTx } from "@/app/contexts/TxContext";
const FaucetButton: React.FC = () => {
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const { showTx } = useShowTx();

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
            showTx({
              title: "Transaction Successful",
              content: `You successfully got 1000 kUSDC from the faucet!`,
              txDigest: result.digest,
              type: "success",
            });
          },
          onError: (error) => {
            showTx({
              title: "Transaction Failed",
              content: `Failed to get kUSDC from faucet: ${error.message}`,
              type: "error",
            });
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
        <Button color="secondary" onPress={handleFaucet}>
          Faucet kUSDC
        </Button>
      </div>
    </>
  );
};

export default FaucetButton;
