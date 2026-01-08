"use client";
import React from "react";
import { motion } from "framer-motion";

interface TableProps {
  columns: string[];
  data: Record<string, React.ReactNode>[];
}

export const Table: React.FC<TableProps> = ({ columns, data }) => (
  <div className="overflow-x-auto w-full">
    <motion.table
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-w-full border border-gray-200 divide-y divide-gray-200 rounded-xl text-sm"
    >
      <thead className="bg-gray-50">
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {data.map((row, i) => (
          <motion.tr
            key={i}
            whileHover={{ backgroundColor: "#f9fafb" }}
            className="transition"
          >
            {columns.map((col) => (
              <td key={col} className="px-4 py-2 text-gray-700 whitespace-nowrap">
                {row[col]}
              </td>
            ))}
          </motion.tr>
        ))}
      </tbody>
    </motion.table>
  </div>
);
