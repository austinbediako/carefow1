import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InternalPageHero } from "@/components/InternalPageHero";
import { DepartmentsGrid } from "@/components/departments/DepartmentsGrid";

export const metadata = {
	title: "Departments & Centres | Korle Bu Teaching Hospital",
	description: "Explore the diverse departments, centres, and specialized units at Korle Bu Teaching Hospital offering world-class healthcare.",
};

export default function DepartmentsPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />

			<main className="grow">
				<InternalPageHero
					title="Departments & Centres"
					description="Explore our specialized departments and centres delivering coordinated, world-class clinical services."
					highlightText="world-class clinical services"
				/>
				<DepartmentsGrid />
			</main>

			<Footer />
		</div>
	);
}
