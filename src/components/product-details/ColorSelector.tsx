"use client";

interface ColorSelectorProps {
  colors: string[];
  selectedColor: number;
  onColorSelect: (index: number) => void;
}

export default function ColorSelector({
  colors,
  selectedColor,
  onColorSelect,
}: ColorSelectorProps) {
  console.log("Colors: ", colors);
  return (
    <div>
      <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase tracking-wide">
        Color
      </h3>
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        {colors.map((color, index) => {
          // normalize hex to uppercase and ensure it starts with '#'
          const hex = String(color).startsWith("#")
            ? String(color).toUpperCase()
            : `#${String(color).toUpperCase()}`;

          return (
            <button
              key={index}
              onClick={() => onColorSelect(index)}
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-sm border-2 transition-all hover:scale-105 ${
                selectedColor === index ? "border-primary" : "border-gray-300"
              }`}
              style={{ backgroundColor: hex }}
              title={hex}
              aria-label={`Select color ${hex}`}
            />
          );
        })}
      </div>
    </div>
  );
}
