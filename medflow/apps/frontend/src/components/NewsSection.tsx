import React from "react";
import { Card } from "@/components/ui/Card";
import Link from "next/link";


// News data based exactly on the KBTH homepage scrape
const newsItems = [
	{
		title: "Korle Bu Secures Czech Support to advance Kidney Transplant Services",
		author: "PR@KBTH",
		date: "February 20, 2026",
		category: "News & Updates",
		excerpt: "The Ambassador of the Czech Republic, H.E. Pavel Bílek, paid a courtesy call on the Chief Executive Officer and Central Management Team of Korle Bu Teaching Hospital to strengthen collaboration on kidney transplantation. The visit centred on building a strategic...",
		href: "/korle-bu-secures-czech-support",
	},
	{
		title: "CEO of National Ambulance Service Pays a Courtesy Call on CEO of Korle Bu",
		author: "PR@KBTH",
		date: "February 18, 2026",
		category: "News & Updates",
		excerpt: "The Chief Executive of the National Ambulance Service (NAS), Dr (Med) George Kojo Owusu today, paid a courtesy call on the Chief Executive of Korle Bu. The purpose of the visit is to strengthen the ties of Korle Bu Teaching Hospital and the National Ambulance Service...",
		href: "/ceo-of-national-ambulance-service",
	},
	{
		title: "Austria and Korle Bu Partners to Strengthen Cochlear Implant Services and Expand Newborn Screening",
		author: "PR@KBTH",
		date: "February 16, 2026",
		category: "News & Updates",
		excerpt: "Austria's Ambassador to Ghana, H.E. Jürgen Heissel, has reaffirmed his country's commitment to strengthening health co-operation with Korle Bu, describing the sector as one of the biggest and most important in the country. Speaking during a visit to Korle Bu Teaching...",
		href: "/austria-and-korle-bu-partners",
	},
];

export function NewsSection() {
	return (
		<section className="py-20">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row justify-between items-end mb-12">
					<div className="max-w-2xl">
						<h2 className="text-3xl md:text-4xl font-bold font-heading text-kbth-primary mb-4">
							News & Updates
						</h2>
						<div className="w-20 h-1 bg-kbth-accent rounded-full mb-6"></div>
						<p className="text-lg text-kbth-sub">
							Stay informed with the latest developments, partnerships, and breakthroughs at Korle Bu Teaching Hospital.
						</p>
					</div>
					<Link
						href="/media"
						className="flex items-center text-kbth-accent font-semibold hover:text-kbth-accent-hover transition-colors mt-6 md:mt-0"
					>
						View All News
						<img src="https://img.icons8.com/color/48/arrow-right.png" alt="Arrow" className="ml-2 w-5 h-5" />
					</Link>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{newsItems.map((news, index) => (
						<Card key={index} className="flex flex-col h-full bg-kbth-bg-alt border-transparent hover:border-kbth-border transition-all duration-300 shadow-sm hover:shadow-md">
							<div className="p-8 flex flex-col h-full">
								<div className="flex items-center text-sm text-kbth-sub mb-4 space-x-4">
									<div className="flex items-center">
										<img src="https://img.icons8.com/color/48/calendar--v1.png" alt="Calendar" className="w-5 h-5 mr-1.5" />
										<span>{news.date}</span>
									</div>
									<div className="flex items-center">
										<img src="https://img.icons8.com/color/48/user.png" alt="User" className="w-5 h-5 mr-1.5" />
										<span>{news.author}</span>
									</div>
								</div>

								<h3 className="text-xl font-bold font-heading text-kbth-primary mb-4 line-clamp-3 hover:text-kbth-accent transition-colors">
									<Link href={news.href}>{news.title}</Link>
								</h3>

								<p className="text-kbth-sub mb-6 line-clamp-4 leading-relaxed grow">
									{news.excerpt}
								</p>

								<Link
									href={news.href}
									className="inline-flex items-center text-kbth-accent font-semibold group mt-auto"
								>
									<span className="border-b-2 border-transparent group-hover:border-kbth-accent pb-1 transition-all">Read More</span>
								</Link>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
