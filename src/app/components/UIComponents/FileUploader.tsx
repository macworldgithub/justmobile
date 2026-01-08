"use client";
import React, { useState, DragEvent } from "react";
import { motion } from "framer-motion";
import { Upload, File } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface FileUploaderProps {
  onUpload: (files: FileList) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const [dragOver, setDragOver] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFileNames(Array.from(files).map((f) => f.name));
      onUpload(files);
    }
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileNames(Array.from(files).map((f) => f.name));
      onUpload(files);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all",
          dragOver
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400"
        )}
      >
        <Upload
          className={cn("text-gray-400", dragOver && "text-blue-500")}
          size={28}
        />
        <p className="text-sm text-gray-600">
          Drag & drop files here, or{" "}
          <span className="text-blue-600">browse</span>
        </p>
        <input type="file" multiple onChange={handleFiles} className="hidden" />
      </label>

      {fileNames.length > 0 && (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 space-y-1"
        >
          {fileNames.map((name, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <File size={14} className="text-gray-400" />
              {name}
            </li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};
