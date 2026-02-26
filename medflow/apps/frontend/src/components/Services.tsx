import React from "react";
import { Card } from "@/components/ui/Card";

import Link from "next/link";
import { clsx } from "clsx";

const services = [
	{
		title: "Accident & Emergency Centre",
		description: "The Accident and Emergency Centre (A&E) at Korle Bu Teaching Hospital is the critical care point for trauma, medical, and surgical emergencies.",
		icon: "https://img.icons8.com/color/96/activity.png",
		href: "/departments",
	},
	{
		title: "Department of Child Health",
		description: "Established in 1964. It is a tertiary referral centre for children under 13 years with medical and surgical problems.",
		icon: "https://img.icons8.com/color/96/baby.png",
		href: "/departments",
	},
	{
		title: "Obstetrics & Gynaecology",
		description: "The department provides 275 beds for Obstetrics and 97 beds for Gynaecology, headed by senior consultants.",
		icon: "https://img.icons8.com/color/96/stethoscope.png",
		href: "/departments",
	},
];

export function Services() {
	return (
		<section className="py-20">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<h2 className="text-3xl md:text-4xl font-bold font-heading text-kbth-primary mb-4">
						Our Services
					</h2>
					<div className="w-20 h-1 bg-kbth-accent mx-auto rounded-full mb-6"></div>
					<p className="text-lg text-kbth-sub">
						Comprehensive care across multiple specialized departments, delivering excellence in healthcare for over a century.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{services.map((service, index) => {

						return (
							<Link key={index} href={service.href} className="group block h-full">
								<Card className={clsx(
									"h-full p-8 transition-all duration-300 border-2 border-transparent",
									"hover:border-kbth-accent/20 hover:shadow-xl hover:-translate-y-1 bg-white"
								)}>
									<div className="w-14 h-14 rounded-2xl bg-kbth-accent/10 flex items-center justify-center mb-6 group-hover:bg-kbth-accent transition-colors">
										<img src={service.icon} alt={service.title} className="w-8 h-8 object-contain" />
									</div>
									<h3 className="text-xl font-bold font-heading text-kbth-primary mb-4 group-hover:text-kbth-accent transition-colors">
										{service.title}
									</h3>
									<p className="text-kbth-sub leading-relaxed mb-8">
										{service.description}
									</p>
									<div className="flex items-center text-kbth-accent font-semibold group-hover:gap-2 transition-all mt-auto">
										<span>Learn More</span>
										<img src="https://img.icons8.com/ios-glyphs/30/228BE6/arrow-right.png" alt="Arrow" className="w-5 h-5 ml-1" />
									</div>
								</Card>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
