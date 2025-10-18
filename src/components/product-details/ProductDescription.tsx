"use client";

import { ChevronRight, X } from "lucide-react";
import { useState } from "react";

interface ProductDescriptionProps {
  description: string;
  additionalInfo?: string[];
}

export default function ProductDescription({
  description,
  additionalInfo = [],
}: ProductDescriptionProps) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="border-t pt-6">
      <button
        onClick={() => setShowDescription(!showDescription)}
        className="w-full flex items-center justify-between text-lg font-semibold py-2 hover:text-gray-700 transition-colors"
      >
        Product description
        {showDescription ? (
          <X className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>

      {showDescription && (
        <div className="mt-4 text-sm text-gray-600 space-y-3">
          <p className="leading-relaxed">{description}</p>
          
          {additionalInfo.length > 0 && (
            <ul className="list-disc list-inside space-y-1 mt-3">
              {additionalInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
