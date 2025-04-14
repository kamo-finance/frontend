"use client";

import { ConnectButton, useAutoConnectWallet } from "@mysten/dapp-kit";

export function ConnectWalletButton() {
  const autoConnectionStatus = useAutoConnectWallet();

  return (
    <div className="flex items-center">
      <ConnectButton connectText="Connect Sui Wallet" />
    </div>
  );
}
