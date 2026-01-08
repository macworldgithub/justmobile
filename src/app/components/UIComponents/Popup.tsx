"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Popup: React.FC<PopupProps> = ({
  open,
  onClose,
  title,
  children,
  className,
}) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl",
            className
          )}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
          >
            <X size={18} className="text-gray-500" />
          </button>
          {title && (
            <h2 className="mb-3 text-lg font-semibold text-gray-800">
              {title}
            </h2>
          )}
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
