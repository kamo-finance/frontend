"use client";

import React, { createContext, useContext, useState } from "react";

import Modal from "@/components/Modal";

interface TxContextType {
  showTxModal: boolean;
  setShowTxModal: (show: boolean) => void;
  triggerRefresh: number;
  modalTitle: string;
  setModalTitle: (title: string) => void;
  modalContent: React.ReactNode;
  setModalContent: (content: React.ReactNode) => void;
  modalType: "success" | "error" | "info";
  setModalType: (type: "success" | "error" | "info") => void;
  txDigest: string | undefined;
  setTxDigest: (txDigest: string | undefined) => void;
}

const TxContext = createContext<TxContextType | undefined>(undefined);

export const TxProvider = ({ children }: { children: React.ReactNode }) => {
  const [showTxModal, setShowTxModal] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(0);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalType, setModalType] = useState<"success" | "error" | "info">(
    "info",
  );
  const [txDigest, setTxDigest] = useState<string | undefined>(undefined);
  const handleCloseModal = () => {
    setShowTxModal(false);
    setTriggerRefresh((prev) => prev + 1);
  };

  return (
    <TxContext.Provider
      value={{
        showTxModal,
        setShowTxModal,
        triggerRefresh,
        modalTitle,
        setModalTitle,
        modalContent,
        setModalContent,
        modalType,
        setModalType,
        txDigest,
        setTxDigest,
      }}
    >
      {children}
      <Modal
        isOpen={showTxModal}
        title={modalTitle}
        txDigest={txDigest}
        type={modalType}
        onClose={handleCloseModal}
      >
        {modalContent}
      </Modal>
    </TxContext.Provider>
  );
};

export const useTx = () => {
  const context = useContext(TxContext);

  if (context === undefined) {
    throw new Error("useTx must be used within a TxProvider");
  }

  return context;
};

export const useShowTx = () => {
  const {
    setShowTxModal,
    setModalTitle,
    setModalContent,
    setModalType,
    setTxDigest,
  } = useTx();

  return {
    showTx: (params: {
      title: string;
      content: React.ReactNode;
      type?: "success" | "error" | "info";
      txDigest?: string;
    }) => {
      setModalTitle(params.title);
      setModalContent(params.content);
      setModalType(params.type || "info");
      setShowTxModal(true);
      setTxDigest(params.txDigest);
    },
  };
};
