"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { Settings, Bell } from "lucide-react";

interface HelmetProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const Helmet: React.FC<HelmetProps> = ({
  title,
  subtitle,
  actions,
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-200 pb-3 mb-4"
    >
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Bell size={20} className="text-blue-600" />
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      <div className={cn("flex items-center gap-2")}>
        {actions || (
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Settings size={18} className="text-gray-600" />
          </button>
        )}
      </div>
    </motion.header>
  );
};
