import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAfterClose?: () => void;
    title: string;
    children: React.ReactNode;
    type?: 'success' | 'error' | 'info';
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    onAfterClose,
    title, 
    children, 
    type = 'info',
    size = 'md'
}) => {
    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 text-green-700';
            case 'error':
                return 'bg-red-50 text-red-700';
            default:
                return 'bg-blue-50 text-blue-700';
        }
    };

    const getSizeClass = () => {
        switch (size) {
            case 'sm':
                return 'max-w-md';
            case 'md':
                return 'max-w-lg';
            case 'lg':
                return 'max-w-2xl';
            case 'xl':
                return 'max-w-4xl';
            default:
                return 'max-w-lg';
        }
    };

    const handleClose = () => {
        onClose();
        if (onAfterClose) {
            onAfterClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`bg-white rounded-xl p-6 ${getSizeClass()} w-full mx-4`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FaTimes />
                    </button>
                </div>
                <div className={`p-4 rounded-lg mb-4 ${getTypeStyles()}`}>
                    {children}
                </div>
                <button
                    onClick={handleClose}
                    className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal; 