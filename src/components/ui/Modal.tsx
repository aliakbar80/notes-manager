import { SidebarClose } from "lucide-react";
import React from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-[#0005] backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-lg p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
          <button
            className="text-gray-600"
            onClick={onClose}
            aria-label="Close Modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
