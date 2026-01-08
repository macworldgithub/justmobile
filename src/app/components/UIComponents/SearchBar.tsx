"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex w-full max-w-md items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm transition-all hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"
    >
      <Search size={18} className="text-gray-400" />
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none"
      />
      {query && (
        <button onClick={() => setQuery("")} className="p-1 text-gray-400 hover:text-gray-600">
          <X size={16} />
        </button>
      )}
    </motion.div>
  );
};
