"use client";

import type React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps {
	text?: string;
	className?: string;
	href?: string;
	external?: boolean;
	children?: React.ReactNode;
}

export function InteractiveHoverButton({
	text = "Button",
	className,
	href,
	external = false,
	children,
}: InteractiveHoverButtonProps) {
	const content = children ?? text;

	const buttonClasses = cn(
		"group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-kbth-primary/20 bg-white px-6 py-3 text-sm font-semibold text-kbth-primary shadow-sm transition-colors duration-300 hover:text-white",
		className
	);

	const innerContent = (
		<>
			<span className="absolute inset-0 translate-y-full bg-kbth-primary transition-transform duration-300 ease-out group-hover:translate-y-0" />
			<span className="relative z-10 inline-flex items-center gap-2">
				{content}
				<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
			</span>
		</>
	);

	if (href) {
		if (external) {
			return (
				<a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses}>
					{innerContent}
				</a>
			);
		}

		return (
			<Link href={href} className={buttonClasses}>
				{innerContent}
			</Link>
		);
	}

	return <button className={buttonClasses}>{innerContent}</button>;
}
