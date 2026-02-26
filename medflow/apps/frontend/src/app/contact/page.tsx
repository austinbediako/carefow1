import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata = {
	title: "Contact Us | Korle Bu Teaching Hospital",
	description: "Get in touch with Korle Bu Teaching Hospital. Find our phone numbers, email directory, address and contact form.",
};

export default function ContactPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />

			<main className="grow pt-24">
				{/* Simplified Hero for Contact */}
				<section className="bg-kbth-primary text-white py-20 bg-[url('/grid-pattern.svg')] relative overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-r from-kbth-primary to-kbth-primary/80" />
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
						<h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Contact Us</h1>
						<p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
							We are here to assist you. Reach out to us for any inquiries, technical support, or medical information.
						</p>
					</div>
				</section>

				<ContactContent />
			</main>

			<Footer />
		</div>
	);
}
