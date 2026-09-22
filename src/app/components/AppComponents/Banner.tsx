"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../UIComponents/Button";
import { cn } from "@/src/lib/utils";

interface TelstraNetworkProps {
  title: string;
  ctaText: string;
  className?: string;
}

const Banner: React.FC<TelstraNetworkProps> = ({
  title,
  ctaText,
  className,
}) => {
  return (
    <section className={cn("pt-16 pb-2", className)}>
      <div className="px-4">
        <div className="relative overflow-hidden rounded-2xl bg-[#1f1b1c] px-10 py-14">
          <div className="relative flex items-center">
            <motion.div
              className="max-w-xl text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl mb-6">{title}</h2>
              <Button
                variant="gradient"
                size="lg"
                className="bg-white text-black px-6"
              >
                {ctaText}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
