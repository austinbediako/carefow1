import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { OrganizationalCulture } from "@/components/about/OrganizationalCulture";
import { HospitalStructure } from "@/components/about/HospitalStructure";

export const metadata = {
	title: "About Us | Korle Bu Teaching Hospital",
	description: "Learn more about the legacy, structure, and organizational culture of the Korle Bu Teaching Hospital.",
};

export default function AboutUsPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />

			<main className="grow">
				<AboutHero />
				<OrganizationalCulture />
				<HospitalStructure />
			</main>

			<Footer />
		</div>
	);
}
