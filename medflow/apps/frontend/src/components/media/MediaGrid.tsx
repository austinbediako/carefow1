"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { motion } from "framer-motion";

const allNewsItems = [
	{
		title: "Korle Bu Secures Czech Support to advance Kidney Transplant Services",
		author: "PR@KBTH",
		date: "February 20, 2026",
		image: "https://kbth.gov.gh/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-20-at-08.43.21-1-400x250.jpeg",
		excerpt: "The Ambassador of the Czech Republic, H.E. Pavel Bílek, paid a courtesy call on the Chief Executive Officer and Central Management Team of Korle Bu Teaching Hospital to strengthen collaboration on kidney transplantation.",
		href: "/korle-bu-secures-czech-support",
	},
	{
		title: "NEWMONT DONATES GH₵58,500 WORTH OF MEDICAL EQUIPMENT TO KORLE BU POLYCLINIC",
		author: "PR@KBTH",
		date: "February 5, 2026",
		image: "https://kbth.gov.gh/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-05-at-13.07.33-2-400x250.jpeg",
		excerpt: "Newmont, a gold mining company, has reaffirmed its commitment to enhancing healthcare delivery with the donation of three vein-finder machines to the Korle Bu Polyclinic/Family Medicine Department.",
		href: "/newmont-donates-gh58500-worth-of-medical-equipment",
	},
	{
		title: "KORLE BU TEACHING HOSPITAL TO ROLLOUT IVF SERVICES",
		author: "PR@KBTH",
		date: "January 29, 2026",
		image: "https://kbth.gov.gh/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-29-at-10.53.30-400x250.jpeg",
		excerpt: "The Chief Executive of Korle Bu Teaching Hospital (KBTH), Dr. Yakubu Seidu Adam, has announced the introduction of In Vitro Fertilisation (IVF) services at the hospital’s Reproductive Health Unit.",
		href: "/korle-bu-teaching-hospital-to-rollout-ivf-services",
	},
	{
		title: "CEO of National Ambulance Service Pays a Courtesy Call on CEO of Korle Bu",
		author: "PR@KBTH",
		date: "February 18, 2026",
		image: "https://kbth.gov.gh/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-18-at-20.22.30-400x250.jpeg",
		excerpt: "The Chief Executive of the National Ambulance Service (NAS), Dr (Med) George Kojo Owusu today, paid a courtesy call on the Chief Executive of Korle Bu. The purpose of the visit is to strengthen the ties.",
		href: "/ceo-of-national-ambulance-service",
	},
	{
		title: "Nine Chilldren Receive Full Medical Coverage Under Ghana Medical Trust Fund at Korle Bu",
		author: "PR@KBTH",
		date: "February 5, 2026",
		image: "https://kbth.gov.gh/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-05-at-12.50.09-1-400x250.jpeg",
		excerpt: "Nine children have received full medical coverage amounting to approximately GhC1 Million Ghana Cedis through the Ghana Medical Trust Fund (GMTF), popularly known as MahamaCares.",
		href: "/nine-children-receive-full-medical-coverage",
	},
	{
		title: "Newmont Ghana Boosts Critical Care at Korle Bu with GH¢2m Medical Equipment Donation",
		author: "PR@KBTH",
		date: "January 26, 2026",
		image: "https://kbth.gov.gh/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-26-at-15.07.51-2.jpeg",
		excerpt: "Newmont Ghana has strengthened critical and paediatric oncology care at the Korle Bu Teaching Hospital with the donation of life-saving medical equipment valued at more than GH¢2 million.",
		href: "/newmont-ghana-boosts-critical-care",
	},
	{
		title: "Austria and Korle Bu Partners to Strengthen Cochlear Implant Services",
		author: "PR@KBTH",
		date: "February 16, 2026",
		image: "https://kbth.gov.gh/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-16-at-09.00.01-400x250.jpeg",
		excerpt: "Austria’s Ambassador to Ghana, H.E. Jürgen Heissel, has reaffirmed his country’s commitment to strengthening health co-operation with Korle Bu, describing the sector as one of the biggest.",
		href: "/austria-and-korle-bu-partners",
	},
	{
		title: "Former Ga West Presbytery Clerk Donates Dialysis Consumables",
		author: "PR@KBTH",
		date: "January 29, 2026",
		image: "https://kbth.gov.gh/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-29-at-13.06.52-1-400x250.jpeg",
		excerpt: "The Urology and Nephrology Centre of Excellence at the Korle Bu Teaching Hospital (KBTH) has received a donation of dialysis consumable from the former Ga West Presbytery Clerk.",
		href: "/former-ga-west-presbytery-clerk-donates",
	},
	{
		title: "Ghana Medical Trust Fund Supports Restoration of Cardiac Services at Korle Bu",
		author: "PR@KBTH",
		date: "January 15, 2026",
		image: "https://kbth.gov.gh/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-15-at-10.32.33-1-400x250.jpeg",
		excerpt: "The Administrator of Ghana Medical Trust Fund also known as MahamaCares, Madam Obuobia Darko-Opoku, has reaffirmed the fund’s commitment to strengthening Ghana’s health infrastructure.",
		href: "/ghana-medical-trust-fund-supports",
	}
];

export const MediaGrid = () => {
	return (
		<section className="bg-white py-20 relative">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-3xl md:text-5xl font-heading font-bold text-kbth-primary mb-6"
					>
						Media & News
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-lg text-gray-700 font-body leading-relaxed max-w-2xl mx-auto"
					>
						Stay up to date with the latest developments, milestones, and updates from Ghana’s leading healthcare institution.
					</motion.p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{allNewsItems.map((news, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
							className="group h-full"
						>
							<Card className="flex flex-col h-full bg-white border-kbth-primary/10 overflow-hidden hover:shadow-xl hover:border-kbth-accent/50 transition-all duration-300">
								{/* Image Placeholder or Actual Image */}
								<div className="w-full h-48 bg-kbth-primary/5 relative overflow-hidden">
									<img
										src={news.image}
										alt={news.title}
										className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
									/>
									<div className="absolute top-4 right-4 bg-kbth-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
										News
									</div>
								</div>

								<div className="p-6 flex flex-col flex-grow">
									<div className="flex items-center text-xs text-kbth-sub mb-3 space-x-4">
										<div className="flex items-center">
											<img src="https://img.icons8.com/color/48/calendar.png" alt="calendar" className="w-4 h-4 mr-1.5" />
											<span>{news.date}</span>
										</div>
										<div className="flex items-center">
											<img src="https://img.icons8.com/color/48/user.png" alt="user" className="w-4 h-4 mr-1.5" />
											<span>{news.author}</span>
										</div>
									</div>

									<h3 className="text-xl font-bold font-heading text-kbth-primary mb-3 leading-snug group-hover:text-kbth-accent transition-colors">
										<Link href="#">{news.title}</Link>
									</h3>

									<p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
										{news.excerpt}
									</p>

									<Link
										href="#"
										className="inline-flex items-center text-kbth-accent font-semibold text-sm group-hover:text-kbth-primary transition-colors mt-auto"
									>
										Read More
										<svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
										</svg>
									</Link>
								</div>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};
