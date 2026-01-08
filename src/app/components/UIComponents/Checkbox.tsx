"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked: controlledChecked,
  onChange,
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const checked = controlledChecked ?? internalChecked;

  const toggle = () => {
    const value = !checked;
    setInternalChecked(value);
    onChange?.(value);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center gap-2 text-sm text-gray-700"
    >
      <motion.div
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded border transition-colors",
          checked
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-gray-400 bg-white"
        )}
        animate={{ scale: checked ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        {checked && <Check size={14} strokeWidth={3} />}
      </motion.div>
      {label && <span>{label}</span>}
    </button>
  );
};
