"use client";
import React from "react";
import { motion } from "framer-motion";
import { Checkbox } from "./Checkbox";

interface Option {
  label: string;
  value: string;
}

interface MultipleCheckboxesProps {
  label?: string;
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
}

export const MultipleCheckboxes: React.FC<MultipleCheckboxesProps> = ({
  label,
  options,
  values,
  onChange,
}) => {
  const toggleValue = (val: string) => {
    if (values.includes(val)) {
      onChange(values.filter((v) => v !== val));
    } else {
      onChange([...values, val]);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <p className="mb-2 text-sm font-medium text-gray-700">{label}</p>
      )}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            label={opt.label}
            checked={values.includes(opt.value)}
            onChange={() => toggleValue(opt.value)}
          />
        ))}
      </motion.div>
    </div>
  );
};
