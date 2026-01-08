"use client";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface BackdropProps {
  isVisible: boolean;
  onClick?: () => void;
  className?: string;
}

export const Backdrop: React.FC<BackdropProps> = ({
  isVisible,
  onClick,
  className,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClick}
          className={cn(
            "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:bg-black/50",
            className
          )}
        />
      )}
    </AnimatePresence>
  );
};
