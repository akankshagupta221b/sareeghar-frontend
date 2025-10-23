"use client";

import { useState } from "react";
import { ChevronRight, X, ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { sizes } from "@/utils/config";

// Colors configuration
const colors = [
  { name: "Navy", value: "#0F172A" },
  { name: "Yellow", value: "#FCD34D" },
  { name: "White", value: "#FFFFFF" },
  { name: "Orange", value: "#FB923C" },
  { name: "Green", value: "#22C55E" },
  { name: "Pink", value: "#EC4899" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Blue", value: "#3B82F6" },
];

interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  isActive: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  parentId: string;
  isActive: boolean;
  sortOrder: number;
}

interface FilterSectionProps {
  selectedCategories: string[];
  selectedSizes: string[];
  selectedColors: string[];
  selectedBrands: string[];
  priceRange: number[];
  brands: Brand[];
  categories: Category[];
  onToggleFilter: (
    filterType: "categories" | "sizes" | "brands" | "colors",
    value: string
  ) => void;
  onPriceRangeChange: (value: number[]) => void;
}

export default function FilterSection({
  selectedCategories,
  selectedSizes,
  selectedColors,
  selectedBrands,
  priceRange,
  brands,
  categories,
  onToggleFilter,
  onPriceRangeChange,
}: FilterSectionProps) {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleClearAll = () => {
    // Clear all filters
    selectedCategories.forEach((cat) => onToggleFilter("categories", cat));
    selectedSizes.forEach((size) => onToggleFilter("sizes", size));
    selectedColors.forEach((color) => onToggleFilter("colors", color));
    selectedBrands.forEach((brand) => onToggleFilter("brands", brand));
    onPriceRangeChange([0, 100000]);
  };

  const handleClearFilter = (
    filterType: "categories" | "sizes" | "brands" | "colors"
  ) => {
    const filterMap = {
      categories: selectedCategories,
      sizes: selectedSizes,
      colors: selectedColors,
      brands: selectedBrands,
    };

    filterMap[filterType].forEach((item) => onToggleFilter(filterType, item));
  };

  const FilterItem = ({
    label,
    filterKey,
    items,
    selectedItems,
    filterType,
    renderContent,
    showAll,
    onToggleShowAll,
  }: {
    label: string;
    filterKey: string;
    items?: string[];
    selectedItems: string[];
    filterType: "categories" | "sizes" | "brands" | "colors";
    renderContent?: () => React.ReactNode;
    showAll?: boolean;
    onToggleShowAll?: () => void;
  }) => {
    const isExpanded = expandedSections[filterKey];
    const hasValue = selectedItems.length > 0;
    const displayValue =
      selectedItems.length > 0
        ? selectedItems.length === 1
          ? selectedItems[0]
          : `${selectedItems.length} selected`
        : null;

    const ITEMS_LIMIT = 10;
    const shouldShowToggle = items && items.length > ITEMS_LIMIT;
    const displayedItems =
      shouldShowToggle && !showAll ? items.slice(0, ITEMS_LIMIT) : items;

    return (
      <div className="border-b border-gray-200 last:border-b-0">
        <button
          onClick={() => toggleSection(filterKey)}
          className={`w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
            hasValue ? "bg-gray-100" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap min-w-0">
            {hasValue && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearFilter(filterType);
                }}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            )}
            <span className="font-medium text-xs sm:text-sm uppercase tracking-wide">
              {label}
            </span>
            {displayValue && (
              <span className="text-xs sm:text-sm text-gray-500 normal-case truncate">
                {displayValue}
              </span>
            )}
          </div>
          <ChevronRight
            className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform flex-shrink-0 ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </button>

        {isExpanded && (
          <div className="bg-white border-t border-gray-200">
            <div className="px-4 sm:px-6 py-3">
              {renderContent ? (
                renderContent()
              ) : (
                <>
                  <div className="space-y-2">
                    {displayedItems?.map((option) => (
                      <button
                        key={option}
                        onClick={() => onToggleFilter(filterType, option)}
                        className={`w-full text-left px-2 sm:px-3 py-2 text-xs sm:text-sm rounded hover:bg-gray-100 transition-colors ${
                          selectedItems.includes(option)
                            ? "bg-gray-100 font-medium"
                            : ""
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {shouldShowToggle && onToggleShowAll && (
                    <button
                      onClick={onToggleShowAll}
                      className="w-full mt-3 px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center justify-center gap-1 hover:bg-gray-50 rounded transition-colors"
                    >
                      {showAll ? (
                        <>
                          <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                          Show More ({items.length - ITEMS_LIMIT} more)
                        </>
                      )}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Clear All Button */}
      <button
        onClick={handleClearAll}
        className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 text-gray-500 hover:text-gray-700 border-b border-gray-200 text-xs sm:text-sm font-medium uppercase tracking-wide"
      >
        <X className="w-3 h-3 sm:w-4 sm:h-4" />
        CLEAR ALL
      </button>

      {/* Filter Items */}
      <div>
        <FilterItem
          label="CATEGORIES"
          filterKey="categories"
          items={categories.filter((c) => c.isActive).map((c) => c.name)}
          selectedItems={selectedCategories}
          filterType="categories"
          showAll={showAllCategories}
          onToggleShowAll={() => setShowAllCategories(!showAllCategories)}
        />

        <FilterItem
          label="BRANDS"
          filterKey="brands"
          items={brands.filter((b) => b.isActive).map((b) => b.name)}
          selectedItems={selectedBrands}
          filterType="brands"
          showAll={showAllBrands}
          onToggleShowAll={() => setShowAllBrands(!showAllBrands)}
        />

        <FilterItem
          label="SIZE"
          filterKey="size"
          selectedItems={selectedSizes}
          filterType="sizes"
          renderContent={() => (
            <div className="flex flex-wrap gap-2">
              {sizes.map((sizeItem) => (
                <button
                  key={sizeItem}
                  onClick={() => onToggleFilter("sizes", sizeItem)}
                  className={`h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm rounded border transition-colors ${
                    selectedSizes.includes(sizeItem)
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
                >
                  {sizeItem}
                </button>
              ))}
            </div>
          )}
        />

        <FilterItem
          label="COLOR"
          filterKey="color"
          selectedItems={selectedColors}
          filterType="colors"
          renderContent={() => (
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => onToggleFilter("colors", color.name)}
                  className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all ${
                    selectedColors.includes(color.name)
                      ? "ring-2 ring-offset-2 ring-black border-black"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {color.name === "White" && (
                    <span className="absolute inset-0 border border-gray-200 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          )}
        />

        {/* Price Range Filter */}
        <div className="border-b border-gray-200 last:border-b-0">
          <button
            onClick={() => toggleSection("price")}
            className={`w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
              priceRange[0] !== 0 || priceRange[1] !== 100000
                ? "bg-gray-100"
                : "bg-white"
            }`}
          >
            <div className="flex items-center gap-2 flex-wrap">
              {(priceRange[0] !== 0 || priceRange[1] !== 100000) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPriceRangeChange([0, 100000]);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              )}
              <span className="font-medium text-xs sm:text-sm uppercase tracking-wide">
                PRICE RANGE
              </span>
              {(priceRange[0] !== 0 || priceRange[1] !== 100000) && (
                <span className="text-xs sm:text-sm text-gray-500 normal-case">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </span>
              )}
            </div>
            <ChevronRight
              className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform flex-shrink-0 ${
                expandedSections["price"] ? "rotate-90" : ""
              }`}
            />
          </button>

          {expandedSections["price"] && (
            <div className="bg-white border-t border-gray-200">
              <div className="px-4 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4">
                <Slider
                  defaultValue={[0, 100000]}
                  max={100000}
                  min={0}
                  step={100}
                  className="w-full"
                  value={priceRange}
                  onValueChange={onPriceRangeChange}
                />
                <div className="flex justify-between text-xs sm:text-sm font-medium">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
