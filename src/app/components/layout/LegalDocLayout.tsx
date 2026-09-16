import React from "react";
import { ChevronLeft, Printer } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface LegalDocLayoutProps {
  title: string;
  effectiveDate: string;
  version: string;
  appliesTo: string;
  children: React.ReactNode;
}

export default function LegalDocLayout({
  title,
  effectiveDate,
  version,
  appliesTo,
  children,
}: LegalDocLayoutProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link & Print */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/legals"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Legal & Compliance
          </Link>
          <button
            onClick={handlePrint}
            className="inline-flex items-center text-sm font-medium text-white transition-colors bg-[#231F20] hover:bg-[#332d2f] px-3.5 py-1.5 rounded-lg shadow-sm print:hidden"
          >
            <Printer size={16} className="mr-2" />
            Print to PDF
          </button>
        </div>

        {/* Document Container */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#231F20] px-8 py-12 text-white print:bg-[#231F20] print:text-white [print-color-adjust:exact] [-webkit-print-color-adjust:exact]">
            <h1 className="text-3xl font-bold tracking-tight mb-6">{title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-300">
              <div>
                <span className="block font-semibold text-white/70 text-xs uppercase tracking-wider mb-1">
                  Effective Date
                </span>
                {effectiveDate}
              </div>
              <div>
                <span className="block font-semibold text-white/70 text-xs uppercase tracking-wider mb-1">
                  Version
                </span>
                {version}
              </div>
              <div>
                <span className="block font-semibold text-white/70 text-xs uppercase tracking-wider mb-1">
                  Applies To
                </span>
                {appliesTo}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-10 prose prose-gray max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
