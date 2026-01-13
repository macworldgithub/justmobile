"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface PlanCardProps {
  title: string;
  data: string;
  price: string;
  features?: string[];
  highlight?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  data,
  price,
  features = [],
  highlight = false,
}) => {
  const router = useRouter();

  const handleClick = () => {
    const encodedTitle = encodeURIComponent(title);
    router.push(`/chat-window?plan=${encodedTitle}`);
  };

  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 shadow-md ${
        highlight
          ? "bg-[#c8cace] text-white scale-[1.03]"
          : "bg-[#c8cace] text-white scale-[1.03]"
      }`}
    >
      <span
        className={`inline-block mb-3 px-4 py-1 text-xs font-medium rounded-full ${
          highlight
            ? "bg-[#1a283b] text-white"
            : "bg-[#1a283b] text-white"
        }`}
      >
        {title}
      </span>

      <p className="text-sm opacity-80 mb-2">{data}</p>

      <h3 className="text-3xl font-semibold mb-4">
        {price}
        <span className="text-sm font-normal opacity-70"> / month</span>
      </h3>

      <button
        onClick={handleClick}
        className={`w-full py-2 rounded-full font-medium transition-all ${
          highlight
            ? "bg-[#1a283b] text-white hover:opacity-90"
            : "bg-white text-[#1f2933] border border-[#cfd4d8] hover:bg-gray-100"
        }`}
      >
        Choose This Plan
      </button>

      <div className="mt-6 text-left">
        <p className="text-sm font-medium mb-3 opacity-80">
          Features include:
        </p>
        <ul className="space-y-2 text-sm opacity-80">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-lg">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlanCard;
