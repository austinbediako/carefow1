"use client";

import React from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { motion } from "framer-motion";

export function Hero() {
	return (
		<section className="py-24 lg:py-32 relative overflow-hidden">
			{/* Decorative Background Elements */}
			<div className="absolute top-0 right-0 w-1/3 h-full bg-kbth-primary/10 -skew-x-12 translate-x-1/4 transform pointer-events-none"></div>
			<div className="absolute bottom-0 left-0 w-1/4 h-full bg-kbth-accent/5 skew-x-12 -translate-x-1/4 transform pointer-events-none"></div>

			<div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="max-w-4xl mx-auto text-center"
				>
					<h1 className="text-5xl lg:text-7xl font-bold font-heading text-kbth-primary tracking-tight mb-6">
						<span className="block mb-2 text-kbth-primary">Excellence In</span>
						<span className="block mb-2 text-kbth-accent">Healthcare</span>
						<span className="block">Since 1923</span>
					</h1>

					<p className="mt-8 text-xl text-gray-700 font-body leading-relaxed">
						Korle Bu Teaching Hospital is Ghana&apos;s leading referral centre, dedicated to world-class care and training.
					</p>

					<div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
						<InteractiveHoverButton
							href="/about-us"
							className="bg-kbth-accent text-white border-kbth-accent px-10 py-6 text-lg w-full sm:w-auto shadow-lg"
						>
							Get to Know Us
						</InteractiveHoverButton>

						<InteractiveHoverButton
							href="/contact"
							className="bg-white text-kbth-primary border-kbth-primary/30 px-10 py-6 text-lg w-full sm:w-auto shadow-md"
						>
							Book An Appointment
						</InteractiveHoverButton>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
