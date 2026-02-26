"use client";

import React, { createRef, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const resources = [
	{
		title: "Research",
		description: "Explore our ongoing studies, clinical trials, and publications leading medical advancement.",
		icon: "https://img.icons8.com/color/48/microscope.png",
		href: "/research",
		cta: "Open resource",
	},
	{
		title: "Feedback/Complaints",
		description: "Your voice matters. Share your experience or report an issue with our services.",
		icon: "https://img.icons8.com/color/48/speech-bubble-with-dots.png",
		href: "/feedback-complaints",
		cta: "Send feedback",
	},
	{
		title: "Donations",
		description: "Support our mission to provide excellent healthcare and upgrade our facilities.",
		icon: "https://img.icons8.com/color/48/handshake.png",
		href: "/donations",
		cta: "Make a donation",
	},
	{
		title: "Exhibition Guidelines",
		description: "Information and rules for vendors and partners wishing to exhibit at KBTH.",
		icon: "https://img.icons8.com/color/48/open-book.png",
		href: "/exhibition-guidelines",
		cta: "View guidelines",
	},
	{
		title: "Lost & Found",
		description: "Check for items lost within the hospital premises or report found items.",
		icon: "https://img.icons8.com/color/48/question-mark.png",
		href: "/lost-found",
		cta: "Check now",
	},
	{
		title: "Redcap",
		description: "Access the KBTH Redcap system for secure data capture and research management.",
		icon: "https://img.icons8.com/color/48/database.png",
		href: "https://www.kbth.gov.gh/kbredcap/",
		external: true,
		cta: "Open Redcap",
	},
	{
		title: "Contact Us",
		description: "Get in touch with our support team, technical staff, or administration.",
		icon: "https://img.icons8.com/color/48/phone.png",
		href: "/contact",
		cta: "Contact support",
	},
];

export const ResourcesHub = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const hubLeftRef = useRef<HTMLSpanElement>(null);
	const hubRightRef = useRef<HTMLSpanElement>(null);
	const hubBottomRef = useRef<HTMLSpanElement>(null);
	const resourceRefs = useMemo(
		() => resources.map(() => createRef<HTMLSpanElement>()),
		[]
	);

	const nodePositions = [
		"lg:col-start-1 lg:row-start-1",
		"lg:col-start-3 lg:row-start-1",
		"lg:col-start-1 lg:row-start-2",
		"lg:col-start-3 lg:row-start-2",
		"lg:col-start-1 lg:row-start-3",
		"lg:col-start-2 lg:row-start-3",
		"lg:col-start-3 lg:row-start-3",
	];

	const connectorPositions = [
		"right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
		"left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
		"right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
		"left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
		"right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
		"top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
		"left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
	];

	const beamConfig = [
		{ from: hubLeftRef, curvature: 12, reverse: false },
		{ from: hubRightRef, curvature: -12, reverse: true },
		{ from: hubLeftRef, curvature: 6, reverse: false },
		{ from: hubRightRef, curvature: -6, reverse: true },
		{ from: hubLeftRef, curvature: -14, reverse: false },
		{ from: hubBottomRef, curvature: -36, reverse: false },
		{ from: hubRightRef, curvature: 14, reverse: true },
	];

	return (
		<section className="bg-kbth-bg-alt py-20 relative">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-3xl md:text-5xl font-heading font-bold text-kbth-primary mb-6"
					>
						Resources & Links
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-lg text-gray-700 font-body leading-relaxed max-w-2xl mx-auto"
					>
						Quick access to essential portals, guidelines, and support services for patients, staff, and partners.
					</motion.p>
				</div>

				<div
					ref={containerRef}
					className="relative mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-center min-h-[760px]"
				>
					<div className="hidden lg:block lg:col-start-2 lg:row-start-1" />

					<div
						className="relative order-1 sm:order-none lg:col-start-2 lg:row-start-2 rounded-2xl border border-kbth-primary-light/30 bg-gradient-to-br from-kbth-primary via-kbth-primary-light to-kbth-primary text-white p-8 text-center shadow-2xl"
					>
						<span
							ref={hubLeftRef}
							className="absolute left-0 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-kbth-accent/50 bg-kbth-bg-alt lg:block"
						/>
						<span
							ref={hubRightRef}
							className="absolute right-0 top-1/2 hidden h-3 w-3 translate-x-1/2 -translate-y-1/2 rounded-full border border-kbth-accent/50 bg-kbth-bg-alt lg:block"
						/>
						<span
							ref={hubBottomRef}
							className="absolute bottom-0 left-1/2 hidden h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full border border-kbth-accent/50 bg-kbth-bg-alt lg:block"
						/>
						<p className="text-sm uppercase tracking-wide opacity-80 mb-2">Core Node</p>
						<h3 className="text-2xl font-heading font-bold mb-3">KBTH Resources Hub</h3>
						<p className="text-sm md:text-base text-white/85 font-body">
							All support portals and guides connected in one place.
						</p>
					</div>

					{resources.map((resource, index) => (
						<div
							key={resource.title}
							className={`relative rounded-2xl border border-kbth-primary/10 bg-white p-6 shadow-md hover:shadow-xl transition-shadow ${nodePositions[index]}`}
						>
							<span
								ref={resourceRefs[index]}
								className={`absolute hidden h-3 w-3 rounded-full border border-kbth-accent/50 bg-white lg:block ${connectorPositions[index]}`}
							/>
							<div className="flex items-center gap-3 mb-4">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src={resource.icon} alt={resource.title} className="w-10 h-10 object-contain" />
								<h4 className="text-lg font-heading font-semibold text-kbth-primary">{resource.title}</h4>
							</div>
							<p className="text-sm text-gray-600 font-body mb-5 leading-relaxed">{resource.description}</p>
							<InteractiveHoverButton
								href={resource.href}
								external={resource.external}
								className="border-kbth-primary/30 px-4 py-2 text-kbth-primary"
							>
								{resource.cta}
							</InteractiveHoverButton>
						</div>
					))}

					{resourceRefs.map((resourceRef, index) => (
						<AnimatedBeam
							key={`beam-${resources[index].title}`}
							containerRef={containerRef}
							fromRef={beamConfig[index].from}
							toRef={resourceRef}
							curvature={beamConfig[index].curvature}
							reverse={beamConfig[index].reverse}
							duration={5 + index * 0.18}
							delay={index * 0.15}
							pathColor="#123B42"
							pathWidth={1.8}
							pathOpacity={0.32}
							gradientStartColor="#2EA3F2"
							gradientStopColor="#082125"
							className="hidden lg:block"
						/>
					))}
				</div>
			</div>
		</section>
	);
};
