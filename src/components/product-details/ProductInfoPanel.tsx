"use client";

import AccordionItem from "./AccordionItem";

interface ProductInfoPanelProps {
  description: string;
  specifications?: string[];
  composition?: string;
  productId?: string;
  manufacturerCode?: string;
  deliveryInfo?: string[];
  returnInfo?: string[];
}

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

export default function ProductInfoPanel({
  description,
  specifications = [],
  composition = "100% Polyester",
  productId,
  manufacturerCode,
  deliveryInfo = [
    "Standard delivery: 3-5 business days",
    "Express delivery: 1-2 business days",
    "Free shipping on orders over ₹1000",
    "International shipping available",
  ],
  returnInfo = [
    "Free returns within 30 days of purchase",
    "Items must be unused and in original packaging",
    "Refunds processed within 5-7 business days",
    "Contact customer service for complaints",
  ],
}: ProductInfoPanelProps) {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      {/* Product Description Section */}
      <AccordionItem
        title="Product description"
        defaultOpen={true}
        isMainSection={true}
      >
        {/* Description Text */}
        <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
          {description}
        </p>

        {/* Specifications List */}
        {specifications.length > 0 && (
          <div className="space-y-0 mb-4 sm:mb-6">
            {specifications.map((spec, index) => (
              <div key={index} className="py-2 sm:py-3">
                <p className="text-sm sm:text-base font-medium">{spec}</p>
              </div>
            ))}
          </div>
        )}

        {/* Product Details */}
        <div className="space-y-1 text-sm sm:text-base text-gray-700">
          <p>Composition: {composition}</p>
          {productId && <p>Product ID: {productId}</p>}
          {manufacturerCode && <p>Manufacturer code: {manufacturerCode}</p>}
        </div>
      </AccordionItem>

      {/* Delivery Information Section */}
      <AccordionItem title="Delivery Information" defaultOpen={false}>
        <div className="space-y-4">
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4">
            {deliveryItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                {item.icon}
                <div>
                  <p className="font-semibold text-sm sm:text-base">{item.title}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-gray-200 text-xs sm:text-sm text-gray-600">
            <p>• Standard delivery: 3-5 business days</p>
            <p>• Express delivery available</p>
            <p>• Free returns within 30 days</p>
          </div>
        </div>
      </AccordionItem>

      {/* Returns and Complaints Section */}
      <AccordionItem title="Returns and Complaints" defaultOpen={false}>
        <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
          {returnInfo.map((info, index) => (
            <p key={index}>{info}</p>
          ))}
        </div>
      </AccordionItem>
    </div>
  );
}
