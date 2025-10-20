"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Search, X, TrendingUp, Clock, Loader2 } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchInput, setSearchInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    suggestions,
    popularSearches,
    recentSearches,
    fetchSuggestions,
    fetchPopularSearches,
    clearRecentSearches,
    isSuggestionsLoading,
  } = useSearchStore();

  // Debounced fetch suggestions
  const debouncedFetchSuggestions = useCallback(
    debounce((query: string) => {
      fetchSuggestions(query);
    }, 300),
    []
  );

  useEffect(() => {
    if (isOpen) {
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
      // Fetch popular searches
      fetchPopularSearches();
    }
  }, [isOpen, fetchPopularSearches]);

  useEffect(() => {
    if (searchInput.trim().length >= 2) {
      debouncedFetchSuggestions(searchInput);
    }
  }, [searchInput, debouncedFetchSuggestions]);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    // Close modal and navigate to listing with search query
    onClose();
    router.push(`/listing?search=${encodeURIComponent(query.trim())}`);
    setSearchInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchInput);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  if (!isOpen) return null;

  const showSuggestions =
    searchInput.trim().length >= 2 && suggestions.length > 0;
  const showRecentSearches =
    searchInput.trim().length === 0 && recentSearches.length > 0;
  const showPopularSearches =
    searchInput.trim().length === 0 && popularSearches.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="container mx-auto px-4 pt-20 max-w-3xl">
        <div className="bg-white rounded-lg shadow-2xl animate-in slide-in-from-top duration-300">
          {/* Search Header */}
          <div className="border-b border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for products, categories, or brands..."
                className="w-full pl-12 pr-12 py-3 text-lg border-0 focus:outline-none focus:ring-0"
              />
              {isSuggestionsLoading && (
                <Loader2 className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
              )}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded-full p-1 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </form>
          </div>

          {/* Search Results/Suggestions */}
          <div className="max-h-[60vh] overflow-y-auto">
            {/* Autocomplete Suggestions */}
            {showSuggestions && (
              <div className="p-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Suggestions
                </div>
                <div className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left group"
                    >
                      <Search className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      <span className="text-gray-700 group-hover:text-gray-900">
                        {suggestion.text}
                      </span>
                      {suggestion.type && (
                        <span className="ml-auto text-xs text-gray-400 capitalize">
                          {suggestion.type}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {showRecentSearches && (
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Recent Searches
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left group"
                    >
                      <Clock className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      <span className="text-gray-700 group-hover:text-gray-900">
                        {search}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            {showPopularSearches && (
              <div className="p-4 border-t border-gray-100">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Popular Searches
                </div>
                <div className="space-y-1">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left group"
                    >
                      <TrendingUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      <span className="text-gray-700 group-hover:text-gray-900">
                        {search}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {searchInput.trim().length >= 2 &&
              !isSuggestionsLoading &&
              suggestions.length === 0 && (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-1">No suggestions found</p>
                  <p className="text-sm text-gray-400">
                    Try searching for products, categories, or brands
                  </p>
                </div>
              )}

            {/* Empty State */}
            {searchInput.trim().length === 0 &&
              !showRecentSearches &&
              !showPopularSearches && (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-1">Start typing to search</p>
                  <p className="text-sm text-gray-400">
                    Search for products, categories, or brands
                  </p>
                </div>
              )}
          </div>

          {/* Search Tips */}
          <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 rounded-b-lg">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span>
                Press{" "}
                <kbd className="px-2 py-1 bg-white border border-gray-200 rounded">
                  Enter
                </kbd>{" "}
                to search
              </span>
              <span>•</span>
              <span>
                Press{" "}
                <kbd className="px-2 py-1 bg-white border border-gray-200 rounded">
                  Esc
                </kbd>{" "}
                to close
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
