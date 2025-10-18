"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = window.innerWidth < 640 ? 3 : 5; // Show fewer pages on mobile

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="mt-6 sm:mt-8 md:mt-10 flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
      <Button
        disabled={currentPage === 1}
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        aria-label="Previous page"
        className="h-8 w-8 sm:h-10 sm:w-10"
      >
        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
      </Button>

      <div className="flex items-center gap-1 sm:gap-2">
        {getPageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <Button
              key={index}
              variant={currentPage === page ? "default" : "outline"}
              className="h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ) : (
            <span key={index} className="px-1 sm:px-2 text-xs sm:text-sm">
              {page}
            </span>
          )
        )}
      </div>

      <Button
        disabled={currentPage === totalPages}
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        aria-label="Next page"
        className="h-8 w-8 sm:h-10 sm:w-10"
      >
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
      </Button>
    </div>
  );
}
