"use client";

import React from "react";
import { motion } from "framer-motion";

const values = [
	{ icon: "https://img.icons8.com/color/48/heart-health.png", title: "Patient-centred care", color: "bg-red-50" },
	{ icon: "https://img.icons8.com/color/48/user-group-man-man.png", title: "Respect for one another and the rights of our clients", color: "bg-blue-50" },
	{ icon: "https://img.icons8.com/color/48/idea.png", title: "Excellence and innovation", color: "bg-yellow-50" },
	{ icon: "https://img.icons8.com/color/48/shield.png", title: "Healthy and safe environment", color: "bg-green-50" },
	{ icon: "https://img.icons8.com/color/48/medal2.png", title: "Excellent stewardship of all resources", color: "bg-purple-50" },
	{ icon: "https://img.icons8.com/color/48/security-checked.png", title: "Transparency and accountability", color: "bg-indigo-50" },
];

export const OrganizationalCulture = () => {
	return (
		<section className="bg-kbth-primary/5 py-24 relative overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

				<div className="text-center mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="text-3xl md:text-4xl font-heading font-bold text-kbth-primary mb-6"
					>
						The Organizational Culture
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.1 }}
						className="text-lg text-gray-700 max-w-3xl mx-auto font-body"
					>
						The hospital sets out to meet and exceed patients’ expectations of care and at all times treat them with dignity and respect. It also sets out to provide the best possible work environment for its employees.
					</motion.p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
					{[
						{
							title: "Our Philosophy",
							content: "The patient comes first, all the time.",
							icon: "https://img.icons8.com/color/48/heart-health.png",
							bg: "bg-red-50"
						},
						{
							title: "Our Mission",
							content: "Providing excellent healthcare services, training, research and advocacy.",
							icon: "https://img.icons8.com/color/48/center-direction.png",
							bg: "bg-blue-50"
						},
						{
							title: "Our Vision",
							content: "To be the preferred tertiary and quaternary healthcare organisation of excellence.",
							icon: "https://img.icons8.com/color/48/idea.png",
							bg: "bg-yellow-50"
						}
					].map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
							className="bg-white rounded-2xl p-8 shadow-sm border border-kbth-primary/10 hover:shadow-lg transition-shadow"
						>
							<div className={`w-14 h-14 rounded-full ${item.bg} flex items-center justify-center mb-6`}>
								<img src={item.icon} alt={item.title} className="w-7 h-7 object-contain" />
							</div>
							<h3 className="text-xl font-heading font-bold text-kbth-primary mb-4">{item.title}</h3>
							<p className="text-gray-600 font-body leading-relaxed">{item.content}</p>
						</motion.div>
					))}
				</div>

				{/* Core Values Section */}
				<div className="mt-20">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="text-center mb-12"
					>
						<h3 className="text-2xl md:text-3xl font-heading font-bold text-kbth-primary">Our Core Values</h3>
						<div className="w-24 h-1 bg-kbth-accent mx-auto mt-4 rounded-full"></div>
					</motion.div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{values.map((value, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: idx * 0.1 }}
								className="bg-white p-6 rounded-xl shadow-sm border border-kbth-primary/10 flex items-start gap-4 hover:border-kbth-accent/50 transition-colors group"
							>
								<div className={`p-3 rounded-lg group-hover:scale-110 transition-transform ${value.color}`}>
									<img src={value.icon} alt={value.title} className="w-6 h-6 object-contain" />
								</div>
								<h4 className="font-heading font-semibold text-gray-800 text-lg">{value.title}</h4>
							</motion.div>
						))}
					</div>
				</div>

			</div>
		</section>
	);
};
