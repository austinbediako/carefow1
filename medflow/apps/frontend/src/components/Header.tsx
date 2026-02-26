import React from "react";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "Departments & Centres", href: "/departments" },
	{ name: "Media", href: "/media" },
	{ name: "Resources", href: "/resources" },
	{ name: "About us", href: "/about-us" },
	{ name: "Career", href: "/careers" },
];

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full bg-white border-b border-kbth-border/40 soft-shadow">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-20 items-center justify-between">
					<div className="shrink-0">
						<Link href="/" className="flex items-center gap-2">
							{/* Note: Fallback to an img tag since next/image might need domain configuration */}
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="https://kbth.gov.gh/wp-content/uploads/2025/01/cropped-kbth-logo-Photoroom-1.png"
								alt="Korle Bu Teaching Hospital Logo"
								className="h-12 w-auto object-contain"
							/>
						</Link>
					</div>
					<nav className="hidden md:flex items-center space-x-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="text-sm font-medium text-slate-700 hover:text-kbth-accent transition-colors"
							>
								{item.name}
							</Link>
						))}
					</nav>
					<div className="hidden md:flex items-center space-x-4">
						<InteractiveHoverButton
							href="/login"
							className="bg-kbth-primary text-white border-kbth-primary hover:border-kbth-primary-light"
						>
							The Hub
						</InteractiveHoverButton>
					</div>
					<div className="md:hidden">
						{/* Mobile menu button placeholder */}
						<button className="p-2 text-slate-600 hover:text-slate-900">
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}
