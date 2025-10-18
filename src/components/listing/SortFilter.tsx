"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortFilterProps {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (value: string) => void;
}

const sortOptions = [
  { value: "createdAt-asc", label: "Sort by: Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "createdAt-desc", label: "Sort by: Newest First" },
];

export default function SortFilter({
  sortBy,
  sortOrder,
  onSortChange,
}: SortFilterProps) {
  return (
    <Select
      value={`${sortBy}-${sortOrder}`}
      onValueChange={onSortChange}
      name="sort"
    >
      <SelectTrigger className="w-full sm:w-[180px] md:w-[200px] text-sm">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value} className="text-sm">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
