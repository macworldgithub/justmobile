"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const FloatingChatButton = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const handleChatClick = () => {
    router.push("/chat-window");
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        layout
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.95 }}
        transition={{
          layout: { type: "spring", stiffness: 350, damping: 25 },
          scale: { type: "spring", stiffness: 400, damping: 20 },
        }}
        className="relative flex items-center bg-linear-to-r from-[#13AFF0] to-[#EB0FB6] text-white rounded-full shadow-lg hover:shadow-xl overflow-hidden cursor-pointer"
        onClick={handleChatClick}
      >
        <div className="p-4 flex items-center justify-center">
          <MessageCircle size={26} />
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.span
              key="chat-text"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pr-4 text-sm font-medium whitespace-nowrap hidden sm:block"
            >
              Chat with AI
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};
