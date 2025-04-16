import React from "react";
import { FaTimes } from "react-icons/fa";
import { Modal as HeroModal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import clsx from "clsx";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAfterClose?: () => void;
  title: string;
  children: React.ReactNode;
  type?: "success" | "error" | "info";
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onAfterClose,
  title,
  children,
  type = "info",
  size = "md",
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
      isOpen={isOpen}
      radius="lg"
      className="bg-foreground-100 border-3 border-foreground rounded-3xl"
      classNames={{
        closeButton: "text-foreground"
      }}
      onClose={handleClose}
    >
      <ModalContent>
        <ModalHeader>
          <h3 className={clsx(
            "text-lg font-bold text-foreground-500",
            getTypeStyles(),
          )}>
            {title}
          </h3>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </HeroModal>

  );
};

export default Modal;
