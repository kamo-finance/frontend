import React from "react";
import {
  Modal as HeroModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAfterClose?: () => void;
  title: string;
  children: React.ReactNode;
  type?: "success" | "error" | "info";
  size?: "sm" | "md" | "lg" | "xl";
  txDigest?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onAfterClose,
  title,
  children,
  type = "info",
  size = "lg",
  txDigest,
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "text-success-600";
      case "error":
        return "text-danger-600";
      default:
        return "text-foreground-500";
    }
  };

  const handleClose = () => {
    onClose();
    if (onAfterClose) {
      onAfterClose();
    }
  };

  return (
    <HeroModal
      backdrop="blur"
      className="bg-foreground-100 border-3 border-foreground rounded-3xl z-100"
      classNames={{
        closeButton: "text-foreground",
        base: "max-w-2xl w-[95%]",
      }}
      isOpen={isOpen}
      radius="lg"
      size={size}
      onClose={handleClose}
    >
      <ModalContent>
        <ModalHeader>
          <h3
            className={clsx(
              "text-lg font-bold text-foreground-500",
              getTypeStyles(),
            )}
          >
            {title}
          </h3>
        </ModalHeader>
        <ModalBody className="py-4">{children}</ModalBody>
        {txDigest && (
          <ModalFooter>
            <Button
              variant="flat"
              onPress={() => {
                window.open(
                  `https://testnet.suivision.xyz/txblock/${txDigest}?tab=Changes`,
                  "_blank",
                );
              }}
            >
              View on Explorer
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </HeroModal>
  );
};

export default Modal;
