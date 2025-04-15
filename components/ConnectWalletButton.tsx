"use client";

import { Button } from "@heroui/button";
import {
  ConnectModal,
  useCurrentAccount,
  useCurrentWallet,
  useDisconnectWallet,
} from "@mysten/dapp-kit";
import { useEffect, useState } from "react";
import { IoIosWallet } from "react-icons/io";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { addToast } from "@heroui/react";

import { truncateSuiObjectId } from "@/libs";

export function ConnectWalletButton() {
  const currentAccount = useCurrentAccount();
  const [open, setOpen] = useState(false);
  const { connectionStatus, isConnecting, isConnected } = useCurrentWallet();
  const { mutate: disconnect } = useDisconnectWallet();

  useEffect(() => {
    if (isConnected) {
      addToast({
        title: "Wallet Connected",
        description: "You are now connected to the wallet.",
        color: "success",
      });
    }
  }, [isConnected]);

  return (
    <>
      {!currentAccount ? (
        <ConnectModal
          open={open}
          trigger={
            <Button
              color="primary"
              disabled={!!currentAccount}
              endContent={<IoIosWallet />}
              isLoading={isConnecting}
            >
              {currentAccount ? "Connected" : "Connect"}
            </Button>
          }
          onOpenChange={(isOpen) => setOpen(isOpen)}
        />
      ) : (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">
              {truncateSuiObjectId(currentAccount.address)}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="disconnect" onPress={() => disconnect()}>
              Disconnect
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}
