"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";

interface BurgerMenuProps {
  menuItems: { label: string; href: string; icon?: React.ReactNode }[];
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ menuItems }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center rounded-md border border-gray-200 bg-white p-2 shadow-sm md:hidden hover:bg-gray-100 transition-colors"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Animated Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute left-0 mt-3 w-48 rounded-lg border bg-white p-3 shadow-xl md:hidden"
          >
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {item.icon && item.icon}
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
