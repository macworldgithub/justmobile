"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  maxHeight?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  maxHeight = 200,
  className,
  ...props
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${Math.min(
        ref.current.scrollHeight,
        maxHeight
      )}px`;
    }
  }, [props.value, maxHeight]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full max-w-md"
    >
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={3}
        className={cn(
          "w-full resize-none rounded-md border border-gray-300 p-3 text-sm text-gray-800 transition-all outline-none",
          focused
            ? "border-blue-500 ring-2 ring-blue-100 shadow-sm"
            : "focus:border-blue-400",
          className
        )}
        {...props}
      />

      {/* Animated underline accent */}
      <motion.div
        layoutId="textarea-underline"
        className={cn(
          "absolute bottom-0 left-0 h-[2px] bg-blue-500 rounded-full transition-all",
          focused ? "w-full opacity-100" : "w-0 opacity-0"
        )}
      />
    </motion.div>
  );
};
