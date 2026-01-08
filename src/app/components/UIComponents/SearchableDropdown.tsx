"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface SearchableDropdownProps {
  label?: string;
  options: Option[];
  onSelect: (value: string) => void;
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  label,
  options,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-xs">
      {label && <p className="mb-1 text-sm font-medium text-gray-700">{label}</p>}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:border-blue-400 transition"
      >
        <span>Choose option</span>
        <ChevronDown
          size={16}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-md p-2"
          >
            <div className="flex items-center gap-2 border-b pb-2 mb-2">
              <Search size={14} className="text-gray-400" />
              <input
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full outline-none text-sm"
              />
            </div>
            <div className="max-h-40 overflow-y-auto">
              {filtered.length > 0 ? (
                filtered.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onSelect(opt.value);
                      setOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md"
                  >
                    {opt.label}
                  </button>
                ))
              ) : (
                <p className="text-center text-sm text-gray-500 py-2">
                  No results
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
