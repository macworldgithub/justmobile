"use client";
import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/src/lib/utils";

import { Button } from "./Button";

export interface CardProps
  extends Omit<HTMLMotionProps<"div">, "ref" | "children"> {
  children?: React.ReactNode;
  backgroundImage?: string;
  title?: string;
  paragraph?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  backgroundImage,
  title,
  paragraph,
  buttonText,
  onButtonClick,
  className,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col",
        "w-[387px] h-[503px]", // fixed dimensions
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative h-1/2 w-full shrink-0",
          !backgroundImage && "bg-gray-100"
        )}
      >
        {backgroundImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* ---- Bottom Half: Content ---- */}
      <div className="flex flex-col justify-between h-1/2 p-6 bg-white">
        <div className="flex flex-col gap-3">
          {title && (
            <h3 className="text-lg font-semibold sm:text-xl text-gray-900">
              {title}
            </h3>
          )}
          {paragraph && (
            <p className="text-sm text-gray-600 leading-relaxed">{paragraph}</p>
          )}
          {buttonText && (
            <div className="mt-3">
              <Button variant={"outline"} size="md" onClick={onButtonClick}>
                {buttonText}
              </Button>
            </div>
          )}
        </div>
        {children && <div className="mt-3">{children}</div>}
      </div>
    </motion.div>
  );
};
