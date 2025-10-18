"use client";

import { Plus, X } from "lucide-react";
import { ReactNode, useState } from "react";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  isMainSection?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export default function AccordionItem({
  title,
  children,
  defaultOpen = false,
  isMainSection = false,
  onToggle,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  if (isMainSection && !isOpen) {
    return (
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between py-3 sm:py-4 border-b border-gray-200 text-lg sm:text-xl font-medium hover:bg-gray-50 transition-colors px-4 sm:px-6"
      >
        {title}
        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    );
  }

  if (isMainSection && isOpen) {
    return (
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-medium">{title}</h2>
            <button
              onClick={handleToggle}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  }

  // Regular accordion item
  return (
    <div className="border-1 border-gray-200">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 text-lg sm:text-xl font-medium hover:bg-gray-100 transition-colors"
      >
        {title}
        <Plus
          className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
            isOpen ? "rotate-45" : ""
          }`}
        />
      </button>

      {isOpen && <div className="px-4 sm:px-6 pb-4 sm:pb-6">{children}</div>}
    </div>
  );
}
