"use client";
import { Heading } from "../UIComponents/Heading";
import { Text } from "../UIComponents/Text";
import { Link } from "../UIComponents/Link";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
    return (
        <footer className="w-full  text-black py-16 px-6 sm:px-10 md:px-16">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
                <div className="flex flex-col gap-4">
                    <motion.img
                        src="/images/logo.png"
                        alt="Flying Kiwi Logo"
                        className="w-40 sm:w-55"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    />

                    <Text variant="muted" className="text-black leading-relaxed">
                        Empowering communities through fitness, training, and events.
                        Together, we soar higher with Flying Kiwi.
                    </Text>

                    <div className="flex items-center gap-4 mt-3">
                        {[
                            { icon: Facebook, href: "https://facebook.com" },
                            { icon: Twitter, href: "https://twitter.com" },
                            { icon: Instagram, href: "https://instagram.com" },
                        ].map(({ icon: Icon, href }, i) => (
                            <motion.a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <Icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <Heading title="Quick Links" level={6} className="text-black mb-4" />
                    <div className="flex flex-col gap-3">
                        <Link href="/Program" label="Programs" className="text-gray-700 hover:text-blue-600 transition-colors" />
                        <Link href="/About" label="About" className="text-gray-700 hover:text-blue-600 transition-colors" />
                        <Link href="/Contact" label="Contact" className="text-gray-700 hover:text-blue-600 transition-colors" />
                        <Link href="/support" label="Support" className="text-gray-700 hover:text-blue-600 transition-colors" />
                    </div>
                </div>

                <div className="flex flex-col">
                    <Heading title="Programs" level={6} className="text-black mb-4" />
                    <div className="flex flex-col gap-3">
                        <Link
                            href=""
                            label="Strong Hearts"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        />
                        <Link
                            href=""
                            label="Flying Kiwi Cup"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        />
                        <Link
                            href=""
                            label="Coaching"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        />
                        <Link href="" label="Events" className="text-gray-700" />
                    </div>
                </div>

                <div className="flex flex-col">
                    <Heading title="Contact" level={6} className="text-black mb-4" />
                    <div className="flex flex-col gap-2">
                        <Text variant="muted">
                            <span className="font-semibold text-gray-700">Telephone:</span>{" "}
                            0410 257 561
                        </Text>
                        <Text variant="muted">
                            <span className="font-semibold text-gray-700">Email:</span>{" "}
                            support@flyingkiwi.com.au
                        </Text>
                        <Text variant="muted">
                            <span className="font-semibold text-gray-700">Address:</span>{" "}
                            Brisbane, Australia
                        </Text>
                    </div>
                </div>
            </div>

            <div className="mt-12 border-t border-black/30 pt-6 text-center">
                <Text variant="small" className="text-gray-800">
                    © {new Date().getFullYear()} Flying Kiwi. All rights reserved.
                </Text>
            </div>
        </footer>
    );
};

export default Footer;
