"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../../UIComponents/Button";
import { Text } from "../../UIComponents/Text";
import { cn } from "@/src/lib/utils";

interface HeroProps {
    title: string;
    description: string;
    ctaText: string;
    userCount: string;
    imageSrc: string;
    className?: string;
}

const Hero: React.FC<HeroProps> = ({
    title,
    description,
    ctaText,
    userCount,
    imageSrc,
    className,
}) => {
    return (
        <section className={cn("relative bg-[#231f20] text-white overflow-hidden", className)}>
            <div className="container mx-auto px-8 pt-44 lg:pt-52">
                <div className="flex flex-col lg:flex-row items-center">
                    {/* Text Content */}
                    <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
                        <motion.h1
                            className="text-2xl md:text-5xl lg:text-6xl font-base leading-tight mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {title}
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            {description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col  items-start gap-4 mb-8"
                        >
                            <Button
                                variant="gradient"
                                size="lg"
                                className="w-full sm:w-auto px-8 bg-white text-black"
                            >
                                {ctaText}
                            </Button>

                            <div className="flex items-center text-sm text-gray-300">
                                <div className="flex -space-x-2 mr-3">
                                    {[1, 2, 3].map((item) => (
                                        <div
                                            key={item}
                                            className="w-8 h-8 rounded-full bg-gray-400 border-2 border-gray-900"
                                            style={{ zIndex: 3 - item }}
                                        />
                                    ))}
                                </div>
                                <span>{userCount}</span>
                            </div>
                        </motion.div>
                    </div>


                </div>
            </div>

            <div className="absolute top-0 right-0 w-1/2 h-full -z-10 overflow-hidden">
                <Image
                    src="/images/bgbanner.png"
                    alt="Background Banner"
                    width={20}
                    height={30}
                    className="object-cover object-right"

                />
            </div> 
            <div className="absolute bottom-0 right-24 w-1/2 flex justify-end pointer-events-none max-lg:hidden">
                <Image
                    src="/images/bannerscreen.png"
                    alt="Banner Screen"
                    width={400}
                    height={400}
                    className="object-contain"
                    priority
                />
            </div>

        </section>
    );
};

export default Hero;
