"use client";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div>
      <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase tracking-wide">
        Quantity
      </h3>
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={handleDecrease}
          disabled={quantity <= min}
          className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-base sm:text-lg font-medium"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-12 sm:w-16 text-center font-semibold text-base sm:text-lg">
          {quantity}
        </span>
        <button
          onClick={handleIncrease}
          disabled={quantity >= max}
          className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-base sm:text-lg font-medium"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}
