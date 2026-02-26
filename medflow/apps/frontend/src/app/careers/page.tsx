import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InternalPageHero } from "@/components/InternalPageHero";
import { CareerContent } from "@/components/career/CareerContent";

export const metadata = {
	title: "Career Opportunities | Korle Bu Teaching Hospital",
	description: "Join the largest and most prestigious national referral centre in Ghana. Explore career opportunities at Korle Bu Teaching Hospital.",
};

export default function CareerPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />

			<main className="grow">
				<InternalPageHero
					title="Career Opportunities"
					description="Build your future with multidisciplinary teams that deliver life-changing impact every day."
					highlightText="life-changing impact"
				/>

				<CareerContent />
			</main>

			<Footer />
		</div>
	);
}
