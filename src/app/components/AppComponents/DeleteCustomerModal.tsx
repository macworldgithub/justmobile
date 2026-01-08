"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../UIComponents/Button";

interface DeleteCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteCustomerModal: React.FC<DeleteCustomerModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg mx-auto my-auto">
              <h3 className="text-xl font-semibold mb-4 text-red-600">
                Warning!
              </h3>
              <p className="mb-6 text-gray-700">
                Are you sure you want to delete this customer? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={onDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeleteCustomerModal;
