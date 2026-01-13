// src/app/components/AppComponents/HowItWorks/HowItWorks.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface HowItWorksProps {
    title: string;
    steps: {
        number: string;
        title: string;
    }[];
    circleImage: string;
    screenImage: string;
}

const HowItWorks: React.FC<HowItWorksProps> = ({
    title,
    steps,
    circleImage,
    screenImage
}) => {
    return (
        <section className="relative py-16 md:py-24 bg-white ">
            <div className="container w-[80%] mx-auto  px-4">
                <div className="flex flex-col gap-8 lg:flex-row items-center">
                    {/* Left Side - Images */}
                    <div className="lg:w-1/2 mb-12 lg:mb-0 relative">
                        {/* Circle Background Image */}
                        <div className="relative w-full max-w-md mx-auto ">
                            <Image
                                src={circleImage}
                                alt="Background Circle"
                                width={500}
                                height={500}
                                className="w-full h-auto"
                            />

                            {/* Screen Image - Positioned on top of the circle */}
                            <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4">
                                <Image
                                    src={screenImage}
                                    alt="App Screen"
                                    width={500}
                                    height={200}
                                    className="h-auto rounded-lg "
                                />
                            </div>
                        </div>
                    </div>

                   
                    <div className="lg:w-1/2 lg:pl-16">
                        <motion.h2
                            className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            {title}
                        </motion.h2>

                        {/* Intro text */}
                        <p className="text-gray-600 mb-6 max-w-md">
                            Our AI will walk you through the setup:
                        </p>

                        {/* Steps – simple list like image */}
                        <ul className="space-y-3 text-gray-700 mb-6">
                            {steps.map((step, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="font-medium">{step.number}.</span>
                                    <span>{step.title}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Footer text */}
                        <p className="text-gray-600 mb-6 max-w-md">
                            Just have your ID ready, and existing customer number, if you are transferring your number and let’s go!
                        </p>

                        {/* CTA */}
                        <button className="bg-black text-white px-6 py-3 rounded-lg text-sm hover:bg-gray-900 transition">
                            Get Your Esim
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HowItWorks;