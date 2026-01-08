"use client";
import React from "react";
import { motion } from "framer-motion";
import { ClipLoader, PulseLoader, BeatLoader, RingLoader } from "react-spinners";
import { cn } from "@/src/lib/utils";

type LoaderType = "clip" | "pulse" | "beat" | "ring";

interface LoaderProps {
  label?: string;
  size?: number;
  color?: string;
  type?: LoaderType;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  label = "Loading...",
  size = 40,
  color = "#2563eb", // Tailwind's blue-600
  type = "clip",
  className,
}) => {
  const renderSpinner = () => {
    switch (type) {
      case "pulse":
        return <PulseLoader color={color} size={size / 5} />;
      case "beat":
        return <BeatLoader color={color} size={size / 4} />;
      case "ring":
        return <RingLoader color={color} size={size} />;
      default:
        return <ClipLoader color={color} size={size} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-6 text-gray-600",
        className
      )}
    >
      {renderSpinner()}
      {label && <p className="text-sm sm:text-base font-medium">{label}</p>}
    </motion.div>
  );
};
