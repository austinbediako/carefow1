import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InternalPageHero } from "@/components/InternalPageHero";
import { MediaGrid } from "@/components/media/MediaGrid";

export const metadata = {
	title: "Media & News | Korle Bu Teaching Hospital",
	description: "Stay informed with the latest news, updates, and publications from Korle Bu Teaching Hospital.",
};

export default function MediaPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />

			<main className="grow">
				<InternalPageHero
					title="Media & News"
					description="Stay informed with the latest hospital updates, announcements, and stories from across our institution."
					highlightText="latest hospital updates"
				/>
				<MediaGrid />
			</main>

			<Footer />
		</div>
	);
}
