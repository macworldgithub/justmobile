"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../UIComponents/Button";
import { cn } from "@/src/lib/utils";

interface TelstraNetworkProps {
    title: string;
    ctaText: string;
    googlePlayLink?: string;
    appStoreLink?: string;
    className?: string;
}

const Banner: React.FC<TelstraNetworkProps> = ({
    title,
    ctaText,
    googlePlayLink,
    appStoreLink,
    className,
}) => {
    return (
        <section className={cn("py-16", className)}>
            <div className="px-4">
                <div className="relative overflow-hidden rounded-2xl bg-[#1f1b1c] px-10 py-14">
                    <div className="relative flex flex-col lg:flex-row items-center justify-around gap-10">
                        <motion.div
                            className="max-w-xl text-white"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl md:text-4xl mb-6">
                                {title}
                            </h2>
                            <Button
                                variant="gradient"
                                size="lg"
                                className="bg-white text-black px-6"
                            >
                                {ctaText}
                            </Button>
                        </motion.div>

                        <motion.div
                            className="relative flex items-center gap-4 z-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 -z-10 flex items-center justify-center max-lg:hidden">
                                <Image
                                    src="/images/bgbanner.png"
                                    alt="Background Ring"
                                    width={500}
                                    height={420}
                                    className="opacity-80"
                                />
                            </div>

                            {googlePlayLink && (
                                <a href={googlePlayLink} target="_blank">
                                    <Image
                                        src="/images/playstore.png"
                                        alt="Google Play"
                                        width={150}
                                        height={45}
                                        className="h-11 w-auto"
                                    />
                                </a>
                            )}

                            {appStoreLink && (
                                <a href={appStoreLink} target="_blank">
                                    <Image
                                        src="/images/appstore.png"
                                        alt="App Store"
                                        width={150}
                                        height={45}
                                        className="h-11 w-auto"
                                    />
                                </a>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
