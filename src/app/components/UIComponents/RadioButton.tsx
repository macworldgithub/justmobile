"use client";
import React from "react";
import { motion } from "framer-motion";
import { Circle, Dot } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface RadioButtonsProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export const RadioButtons: React.FC<RadioButtonsProps> = ({
  label,
  options,
  value,
  onChange,
}) => (
  <div className="w-full">
    {label && <p className="mb-2 text-sm font-medium text-gray-700">{label}</p>}
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="flex items-center gap-2 text-sm text-gray-700"
        >
          <motion.div
            className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-400"
            animate={{
              borderColor: value === opt.value ? "#2563eb" : "#9ca3af",
              backgroundColor:
                value === opt.value ? "rgba(37,99,235,0.1)" : "transparent",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {value === opt.value && <Dot size={12} className="text-blue-600" />}
          </motion.div>
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);
