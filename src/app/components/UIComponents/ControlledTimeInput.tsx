"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ControlledTimeInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ControlledTimeInput: React.FC<ControlledTimeInputProps> = ({
  label,
  value,
  onChange,
  className,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col gap-1 w-full max-w-xs sm:max-w-sm", className)}
    >
      {label && (
        <motion.label
          animate={{ color: focused ? "#2563eb" : "#374151" }}
          className="text-sm font-medium"
        >
          {label}
        </motion.label>
      )}
      <div className="relative">
        <Clock
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="h-10 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        />
      </div>
    </motion.div>
  );
};
