"use client";

import { Button } from "@heroui/button";
import {
  ConnectModal,
  useCurrentAccount,
  useCurrentWallet,
  useDisconnectWallet,
} from "@mysten/dapp-kit";
import { useState } from "react";
import { IoIosWallet } from "react-icons/io";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { truncateSuiObjectId } from "@/libs";

export function ConnectWalletButton() {
  const currentAccount = useCurrentAccount();
  const [open, setOpen] = useState(false);
  const { isConnecting } = useCurrentWallet();
  const { mutate: disconnect } = useDisconnectWallet();

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
