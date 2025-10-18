"use client";

import AccordionItem from "./AccordionItem";
import ProductInfoPanel from "./ProductInfoPanel";

interface DeliveryInfoPanelProps {
  showAsAccordion?: boolean;
}

export default function DeliveryInfoPanel({
  showAsAccordion = false,
}: DeliveryInfoPanelProps) {
  const deliveryItems = [
    {
      icon: (
        <svg
          className="w-10 h-10 text-gray-700"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      title: "DELIVERY UP",
      subtitle: "TO 150 HOURS",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-gray-700"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
      title: "FREE SHIPPING",
      subtitle: "AND RETURNS",
    },
  ];

  if (showAsAccordion) {
    return (
      <>
        <AccordionItem title="Delivery Information" defaultOpen={false}>
          <div className="space-y-4">
            <div className="flex flex-row justify-evenly">
              {deliveryItems.map((item, index) => (
                <div key={index} className="  gap-3">
                  {item.icon}
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-gray-200 text-sm text-gray-600">
              <p>• Standard delivery: 3-5 business days</p>
              <p>• Express delivery available</p>
              <p>• Free returns within 30 days</p>
            </div>
          </div>
        </AccordionItem>
      </>
    );
  }

  // Regular grid display
  return (
    <div className="grid grid-cols-2 gap-4 pt-4">
      {deliveryItems.map((item, index) => (
        <div key={index} className="flex items-start gap-3">
          {item.icon}
          <div>
            <p className="font-semibold text-sm">{item.title}</p>
            <p className="text-sm text-gray-600">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
