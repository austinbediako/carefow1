import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InternalPageHero } from "@/components/InternalPageHero";
import { ResourcesHub } from "@/components/resources/ResourcesHub";

export const metadata = {
	title: "Resources | Korle Bu Teaching Hospital",
	description: "Access essential resources, guidelines, and portals for patients, staff, and partners of Korle Bu Teaching Hospital.",
};

export default function ResourcesPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />

			<main className="grow">
				<InternalPageHero
					title="Patient & Visitor Resources"
					description="Access essential guides, forms, and portals that support every stage of your care journey."
					highlightText="every stage of your care journey"
				/>

				<ResourcesHub />
			</main>

			<Footer />
		</div>
	);
}
