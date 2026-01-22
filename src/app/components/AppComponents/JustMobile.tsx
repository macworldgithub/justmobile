import React from "react";
import Image from "next/image";

const JustMobileSection = () => {
  const features = [
    {
      text: "The Telstra Wholesale Mobile Network reaches at least 98.7% of the Australian population and at least 75% with 5G.",
      position: "top-[4%] left-[6%] md:left-[10%]",
      align: "text-left",
      width: "max-w-[210px] md:max-w-[260px]",
    },
    {
      text: "Our AI serves you 24/7 with activation, support and plan management.",
      position: "top-[6%] right-[6%] md:right-[10%]",
      align: "text-right",
      width: "max-w-[190px] md:max-w-[240px]",
    },
    {
      text: "Auto data bolt-on's means no speed caps or lost connection.",
      position: "top-[36%] right-[0%] md:right-[3%]",
      align: "text-right",
      width: "max-w-[170px] md:max-w-[210px]",
    },
    {
      text: "Upgrade or downgrade your plan at any time – no need to talk to anyone.",
      position: "bottom-[26%] right-[6%] md:right-[10%]",
      align: "text-right",
      width: "max-w-[190px] md:max-w-[240px]",
    },
    {
      text: "No Gimmicks or limited offers.",
      position: "bottom-[3%] right-[14%] md:right-[18%]",
      align: "text-right",
      width: "max-w-[150px] md:max-w-[190px]",
    },
    {
      text: "Moving to eSIM is fast, easy the most flexible way to manage your mobile.",
      position: "bottom-[3%] left-[6%] md:left-[10%]",
      align: "text-left",
      width: "max-w-[190px] md:max-w-[240px]",
    },
    {
      text: "The cheapest Telstra Wholesale price on the market.",
      position: "bottom-[26%] left-[6%] md:left-[10%]",
      align: "text-left",
      width: "max-w-[190px] md:max-w-[240px]",
    },
    {
      text: "Up to 1000GB can be rolled over in your data bank.",
      position: "top-[36%] left-[0%] md:left-[3%]",
      align: "text-left",
      width: "max-w-[170px] md:max-w-[210px]",
    },
  ];

  return (
    <div className="relative bg-[#F8F9FB] py-16 md:py-24 overflow-hidden hidden md:block">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
          Small Plans
        </h2>
      </div>
      <div className="relative w-full max-w-[540px] md:max-w-[760px] lg:max-w-[840px] mx-auto aspect-square">
        {/* Phone mockup – centered */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="relative w-[70%] sm:w-[64%] md:w-[58%] lg:w-[54%]">
            <Image
              src="/images/bannerscreen.png"
              alt="JUST mobile app screen"
              width={600}
              height={1200}
              className="w-full h-auto rounded-[2.8rem] md:rounded-[3.8rem] shadow-2xl ring-1 ring-gray-200/60"
              priority
            />
          </div>
        </div>

        {/* Feature cards – positioned around the phone */}
        {features.map((feature, index) => (
          <div
            key={index}
            className={`
              absolute ${feature.position} 
              ${feature.width} p-3.5 md:p-4.5 
              bg-white/85 backdrop-blur-md rounded-xl 
              shadow-lg border border-gray-200/70
              text-sm md:text-[15px] font-medium text-gray-800 leading-snug
              ${feature.align}
              transition-all duration-400 hover:scale-102 hover:shadow-xl z-30
            `}
          >
            {feature.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JustMobileSection;
