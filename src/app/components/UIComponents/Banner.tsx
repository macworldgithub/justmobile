"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";
import React, { useRef } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "./Button";

interface StatItem {
  value: string;
  label: string;
}

interface BannerProps {
  title?: string | React.ReactNode;
  paragraph?: string | React.ReactNode;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  onClose?: () => void;
  backgroundImage?: string;
  overlayOpacity?: number;
  align?: "left" | "center" | "right";
  stats?: StatItem[];
  showFloatingCircles?: boolean;
  children?: React.ReactNode;

  width?: string;
  height?: string;
}

export const Banner: React.FC<BannerProps> = ({
  title,
  paragraph,
  message,
  buttonText,
  onButtonClick,
  onClose,
  backgroundImage,
  overlayOpacity = 0.5,
  align = "center",
  stats,
  showFloatingCircles = false,
  children,
  width,
  height,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "relative flex flex-col justify-center overflow-hidden shadow-lg",
          alignmentClasses[align]
        )}
        style={{
          width: width || "100%",
          height: height || "auto", // ✅ Explicit height support
          minHeight: height ? "unset" : "clamp(60vh, 75vh, 90vh)", // ✅ Avoid double-height stacking
        }}
      >
        {/* Background */}
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* --- Fixed positioned circular images (edge decorations) --- */}
        {showFloatingCircles && (
          <>
            {/* Top-left circle */}
            <motion.img
              src="/images/circle1.png"
              alt="circle-topleft"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.9, scale: 1, y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
                delay: 0.3,
              }}
              className="absolute rounded-full object-cover mix-blend-lighten opacity-70"
              style={{
                top: "12%",
                left: "10%",
                width: "70px",
                height: "70px",
                boxShadow: "0 0 15px rgba(255,255,255,0.25)",
              }}
            />

            {/* Top-right circle */}
            <motion.img
              src="/images/circle2.png"
              alt="circle-topright"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.85, scale: 1, y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
                delay: 0.6,
              }}
              className="absolute rounded-full object-cover mix-blend-lighten opacity-70"
              style={{
                top: "15%",
                right: "12%",
                width: "90px",
                height: "90px",
                boxShadow: "0 0 18px rgba(255,255,255,0.25)",
              }}
            />

            {/* Bottom-left circle */}
            <motion.img
              src="/images/circle3.png"
              alt="circle-bottomleft"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.9, scale: 1, y: [0, 8, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                repeatType: "mirror",
                delay: 0.9,
              }}
              className="absolute rounded-full object-cover mix-blend-lighten opacity-70"
              style={{
                bottom: "15%",
                left: "8%",
                width: "80px",
                height: "80px",
                boxShadow: "0 0 18px rgba(255,255,255,0.25)",
              }}
            />

            {/* Bottom-right circle */}
            <motion.img
              src="/images/circle4.png"
              alt="circle-bottomright"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.9, scale: 1, y: [0, 10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
                delay: 1.2,
              }}
              className="absolute rounded-full object-cover mix-blend-lighten opacity-70"
              style={{
                bottom: "12%",
                right: "10%",
                width: "100px",
                height: "100px",
                boxShadow: "0 0 20px rgba(255,255,255,0.3)",
              }}
            />
          </>
        )}

        {/* Content */}
        <div
          className={cn(
            "relative z-10 flex flex-col gap-4 p-10 sm:p-14 md:p-20 lg:p-28 xl:p-32 text-white max-w-[1400px] w-full",
            alignmentClasses[align]
          )}
        >
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-md p-2 hover:bg-white/10 transition-colors"
            >
              <X size={24} className="text-white" />
            </button>
          )}

          {title && (
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={cn(
                "font-extrabold leading-tight drop-shadow-lg",
                align === "center" && "mx-auto",
                "text-[clamp(1.25rem,3vw,3.5rem)] max-w-[95%] sm:max-w-[80%] md:max-w-[70%]"
              )}
            >
              {title}
            </motion.h1>
          )}

          {paragraph && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className={cn(
                "text-white/90 font-medium drop-shadow-md max-w-[95%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]",
                "text-[clamp(0.8rem,1.5vw,1.1rem)] leading-relaxed whitespace-pre-line"
              )}
            >
              {paragraph}
            </motion.p>
          )}

          {message && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
              className="text-[clamp(0.8rem,1.3vw,1.05rem)] text-white/80 font-semibold max-w-[80%] sm:max-w-[60%]"
            >
              {message}
            </motion.p>
          )}

          {buttonText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
              className={cn(
                "mt-4 sm:mt-6",
                align === "center" && "mx-auto",
                align === "right" && "ml-auto"
              )}
            >
              <Button variant="gradient" size="lg" onClick={onButtonClick}>
                {buttonText}
              </Button>
            </motion.div>
          )}

          {stats && stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className={cn(
                "flex flex-wrap gap-4 sm:gap-8 md:gap-10 mt-8 sm:mt-10",
                align === "right"
                  ? "justify-end text-right sm:items-end"
                  : align === "center"
                  ? "justify-center text-center sm:items-center"
                  : "justify-start text-left sm:items-start"
              )}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  className="flex flex-col min-w-[70px] sm:min-w-[100px] md:min-w-[130px]"
                >
                  <p className="text-[clamp(1.25rem,2.5vw,2.25rem)] font-bold text-white drop-shadow-md">
                    {stat.value}
                  </p>
                  <p className="text-[clamp(0.7rem,1.1vw,0.9rem)] text-white/80">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
