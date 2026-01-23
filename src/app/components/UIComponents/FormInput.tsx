"use client";
import React from "react";
import { cn } from "@/src/lib/utils";
import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  icon,
  className,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className="relative w-full max-w-md space-y-1">
      <label className="block text-sm font-medium text-white">{label}</label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          {...props}
          value={value}
          onChange={onChange}
          className={cn(
            "h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
            icon && "pl-9",
            className,
          )}
        />
      </div>
    </div>
  );
};
