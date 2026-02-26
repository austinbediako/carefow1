"use client";

import React from "react";
import { motion } from "framer-motion";
import { Highlighter } from "@/components/ui/highlighter";

interface InternalPageHeroProps {
	title: string;
	description: string;
	highlightText?: string;
}

export function InternalPageHero({
	title,
	description,
	highlightText,
}: InternalPageHeroProps) {
	const highlightColor = "#b8f2d6";

	const renderDescription = () => {
		if (!highlightText || !description.includes(highlightText)) {
			return <>{description}</>;
		}

		const [before, after] = description.split(highlightText);

		return (
			<>
				{before}
				<Highlighter action="highlight" color={highlightColor}>
					<span className="font-semibold text-kbth-primary">{highlightText}</span>
				</Highlighter>
				{after}
			</>
		);
	};

	return (
		<section className="bg-kbth-bg py-20 relative overflow-hidden">
			<div className="absolute top-0 right-0 w-1/3 h-full bg-kbth-primary/5 -skew-x-12 translate-x-1/2 transform" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
				>
					<div className="text-center lg:text-left">
						<h1 className="text-4xl md:text-5xl font-heading font-bold text-kbth-primary mb-6">
							{title}
						</h1>
						<p className="text-lg md:text-xl text-gray-700 leading-relaxed font-body max-w-2xl mx-auto lg:mx-0">
							{renderDescription()}
						</p>
					</div>

					<div className="flex justify-center lg:justify-end">
						<div className="w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full bg-white/70 backdrop-blur-sm shadow-xl border border-kbth-primary/10 flex items-center justify-center p-6">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="https://kbth.gov.gh/wp-content/uploads/2025/01/cropped-kbth-logo-Photoroom-1.png"
								alt="Korle Bu Teaching Hospital Logo"
								className="w-full h-full object-contain"
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
