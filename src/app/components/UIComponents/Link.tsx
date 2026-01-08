"use client";
import React from "react";
import NextLink from "next/link";
import { cn } from "@/src/lib/utils";

interface LinkProps {
  href: string;
  label?: string;
  external?: boolean;
  className?: string;
  children?: React.ReactNode; 
}

export const Link: React.FC<LinkProps> = ({
  href,
  label,
  external,
  className,
  children,
}) => {
  return (
    <NextLink
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative inline-flex flex-col items-start text-black font-semibold transition-colors duration-300",
        className
      )}
    >
      {children ? (
        children
      ) : (
        <span className="relative pb-1">
          {label}
          <span
            className="absolute left-0 bottom-0 h-[3px] w-0 opacity-0 overflow-hidden
                       transition-all duration-500 ease-out
                       group-hover:w-full group-hover:opacity-100"
          >
            <img
              src="/images/link-hover.png"
              alt="hover line"
              className="h-full w-full object-cover"
            />
          </span>
        </span>
      )}
    </NextLink>
  );
};
