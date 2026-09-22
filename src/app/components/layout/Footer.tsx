"use client";
import { Heading } from "../UIComponents/Heading";
import { Text } from "../UIComponents/Text";
import { Link } from "../UIComponents/Link";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="w-full  text-black py-16 px-6 sm:px-10 md:px-16">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
                <div className="flex flex-col">
                    <motion.img
                        src="/images/logo.png"
                        alt="Just Mobile Logo"
                        className="w-40 sm:w-55"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    />

                </div>

                <div className="flex flex-col">
                    <Heading title="Partners" level={6} className="text-black mb-4" />
                    <div className="flex flex-col gap-3">
                        <Link href="https://flyingkiwi.com.au/" label="Flying Kiwi" external className="text-gray-700 hover:text-blue-600 transition-colors" />
                    </div>
                </div>

                <div className="flex flex-col">
                    <Heading title="Contact" level={6} className="text-black mb-4" />
                    <div className="flex flex-col gap-2">
                        <Text variant="muted">
                            <span className="font-semibold text-gray-700">Telephone:</span>{" "}
                            1300 492 002
                        </Text>
                        <Text variant="muted">
                            <span className="font-semibold text-gray-700">Email:</span>{" "}
                            <a href="mailto:info@justmobile.ai" className="hover:text-blue-600 transition-colors">info@justmobile.ai</a>
                        </Text>
                    </div>
                </div>

                {/* Legal & Compliance column */}
                <div className="flex flex-col">
                    <Heading title="Legal" level={6} className="text-black mb-4" />
                    <div className="flex flex-col gap-3">
                        <Link
                            href="/legals"
                            label="Legal & Compliance"
                            className="text-gray-700  hover:text-blue-600 transition-colors"
                        />
                        <Link
                            href="/legals#critical-information-summaries"
                            label="Critical Information Summaries"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        />
                        <Link
                            href="/legals#privacy-policy"
                            label="Privacy Policy"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        />
                        <Link
                            href="/legals#standard-form-of-agreement"
                            label="Standard Form of Agreement"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-12 border-t border-black/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Text variant="small" className="text-gray-800">
                    © {new Date().getFullYear()} Just Mobile. All rights reserved.
                </Text>
                <div className="flex items-center gap-4">
                    <a href="/legals" className="text-xs text-gray-500 hover:text-purple-700 transition-colors">
                        Legal &amp; Compliance
                    </a>
                    <a href="/legals#privacy-policy" className="text-xs text-gray-500 hover:text-purple-700 transition-colors">
                        Privacy Policy
                    </a>
                    <a href="/legals#standard-form-of-agreement" className="text-xs text-gray-500 hover:text-purple-700 transition-colors">
                        SFoA
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
