"use client";
import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Info } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface LabelProps extends Omit<HTMLMotionProps<"label">, "ref" | "children"> {
  text: string;
  icon?: React.ReactNode;
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  text,
  icon = <Info size={14} className="text-blue-500" />,
  required,
  className,
  ...props
}) => (
  <motion.label
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className={cn(
      "flex items-center gap-1 text-sm font-medium text-gray-700 select-none",
      className
    )}
    {...props}
  >
    {icon && <span className="flex items-center">{icon}</span>}
    <span>{text}</span>
    {required && <span className="text-red-500">*</span>}
  </motion.label>
);
