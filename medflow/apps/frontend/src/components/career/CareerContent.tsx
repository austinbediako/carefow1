"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { motion } from "framer-motion";

export const CareerContent = () => {
	return (
		<div className="bg-kbth-bg pb-20">
			{/* Intro Section */}
			<section className="bg-white py-20 border-b border-kbth-primary/10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row items-center gap-12">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="lg:w-1/2 space-y-6"
						>
							<h2 className="text-3xl md:text-5xl font-heading font-bold text-kbth-primary leading-tight">
								Join the Legacy: <br /> Careers at Korle Bu
							</h2>
							<p className="text-lg text-gray-700 font-body leading-relaxed">
								Welcome to the Korle Bu Teaching Hospital (KBTH) career page, your opportunity to join the largest and most prestigious national referral centre in Ghana and a leading healthcare hub in West Africa.
							</p>
							<p className="text-lg text-gray-700 font-body leading-relaxed">
								For over a century, KBTH has been at the forefront of medical excellence, setting the standard for patient care, medical education, research, and innovation. If you are a dedicated professional seeking a career that offers impact, growth, and the chance to contribute to national health, KBTH is the place for you.
							</p>

							<div className="pt-4">
								<InteractiveHoverButton
									href="https://kbth.gov.gh/wp-content/uploads/2025/11/kbth-career.pdf"
									external
									className="bg-kbth-accent text-white border-kbth-accent px-8 py-3"
								>
									View Current Openings
								</InteractiveHoverButton>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="lg:w-1/2"
						>
							<div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px]">
								<img
									src="https://kbth.gov.gh/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-30-at-12.36.47-1.jpeg"
									alt="Korle Bu Teaching Hospital Staff"
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-kbth-primary/80 to-transparent"></div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Why Work With Us */}
			<section className="py-20 bg-kbth-primary/5">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-heading font-bold text-kbth-primary mb-4">Why Work With Us?</h2>
						<p className="text-lg text-gray-600 max-w-3xl mx-auto">
							We are dedicated to providing the best possible work environment for our employees to live a fulfilled social and professional life.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<FeatureCard
							icon="https://img.icons8.com/color/48/hospital-3.png"
							title="Pioneering Healthcare"
							description="Be a part of history. Work in an institution known for its pioneering role in specialised services, including the National Cardiothoracic Centre, the National Reconstructive Plastic Surgery and Burns Centre, and the National Centre for Radiotherapy and Nuclear Medicine."
						/>
						<FeatureCard
							icon="https://img.icons8.com/color/48/graduation-cap.png"
							title="A Hub for Education & Research"
							description="Engage in continuous learning and contribute to groundbreaking research. KBTH is a renowned training ground for undergraduate and postgraduate medical students, nurses, and other health professionals."
						/>
						<FeatureCard
							icon="https://img.icons8.com/color/48/stethoscope.png"
							title="Diverse & Specialised Experience"
							description="With 2,000 beds and 17 clinical and diagnostic Departments/Units, you will gain unparalleled exposure across a wide range of specialist and sub-specialty fields."
						/>
						<FeatureCard
							icon="https://img.icons8.com/color/48/heart-health.png"
							title="Commitment to Staff Welfare"
							description="We are committed to boosting staff morale, commitment, and satisfaction through motivation. We aim to provide opportunities for employees to develop their full potential and find challenging work."
						/>
					</div>
				</div>
			</section>

			{/* Values and Growth */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
						{/* Values */}
						<div>
							<h3 className="text-3xl font-heading font-bold text-kbth-primary mb-8 border-b-2 border-kbth-accent pb-4 inline-block">
								Our Values & Culture
							</h3>
							<p className="text-gray-700 mb-8 italic">
								Our organizational culture is centered on our philosophy that &quot;The Patient Comes First, all the time.&quot;
							</p>
							<ul className="space-y-6">
								<ValueListItem icon="https://img.icons8.com/color/48/user-group-man-man.png" title="Patient-Centred Care">
									Placing the needs and dignity of our clients at the heart of everything we do.
								</ValueListItem>
								<ValueListItem icon="https://img.icons8.com/color/48/center-direction.png" title="Excellence and Innovation">
									Striving for the highest quality in care, research, and operations, and embracing new ideas.
								</ValueListItem>
								<ValueListItem icon="https://img.icons8.com/color/48/heart-health.png" title="Respect for One Another">
									Fostering a healthy, safe, and professional environment based on mutual respect and teamwork.
								</ValueListItem>
								<ValueListItem icon="https://img.icons8.com/color/48/security-checked.png" title="Integrity and Accountability">
									Maintaining the highest ethical standards and excellent stewardship of all resources.
								</ValueListItem>
							</ul>
						</div>

						{/* Growth & Talent */}
						<div>
							<h3 className="text-3xl font-heading font-bold text-kbth-primary mb-8 border-b-2 border-kbth-accent pb-4 inline-block">
								Opportunities for Growth
							</h3>
							<p className="text-gray-700 mb-6">
								We believe in investing in our people. KBTH provides pathways for career development through:
							</p>
							<ul className="list-disc list-inside text-gray-700 mb-10 space-y-2">
								<li>In-service and Post-Basic Training Programmes</li>
								<li>Continuing Professional Development (CPD) opportunities.</li>
								<li>Mentorship and Leadership development within a multidisciplinary team.</li>
							</ul>

							<div className="bg-kbth-primary text-white rounded-2xl p-8 shadow-xl">
								<h4 className="text-xl font-bold font-heading mb-4 flex items-center">
									<img src="https://img.icons8.com/color/48/medal2.png" alt="award" className="mr-2 w-6 h-6 object-contain" /> Talent We Seek
								</h4>
								<ul className="space-y-3 text-gray-200">
									<li className="flex items-center"><span className="w-2 h-2 rounded-full bg-kbth-accent mr-3"></span> Medical and Dental Professionals</li>
									<li className="flex items-center"><span className="w-2 h-2 rounded-full bg-kbth-accent mr-3"></span> Nursing and Midwifery</li>
									<li className="flex items-center"><span className="w-2 h-2 rounded-full bg-kbth-accent mr-3"></span> Allied Health Professionals</li>
									<li className="flex items-center"><span className="w-2 h-2 rounded-full bg-kbth-accent mr-3"></span> Administrative and Management Support</li>
									<li className="flex items-center"><span className="w-2 h-2 rounded-full bg-kbth-accent mr-3"></span> Technical and General Services</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-kbth-accent text-white text-center">
				<div className="max-w-4xl mx-auto px-4">
					<h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Ready to Make a Difference?</h2>
					<p className="text-xl opacity-90 mb-10">
						Join our dedicated team and contribute your unique skills to advance healthcare excellence in Ghana and the West Africa sub-region.
					</p>
					<InteractiveHoverButton
						href="https://kbth.gov.gh/wp-content/uploads/2025/11/kbth-career.pdf"
						external
						className="bg-white text-kbth-primary border-white px-10 py-4 text-lg"
					>
						View Current Openings
					</InteractiveHoverButton>
				</div>
			</section>
		</div>
	);
};

const FeatureCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
	<Card className="p-8 border-transparent shadow-md hover:shadow-xl transition-all duration-300 bg-white">
		<div className="w-14 h-14 bg-kbth-primary/10 rounded-full flex items-center justify-center mb-6">
			<img src={icon} alt={title} className="w-7 h-7 object-contain" />
		</div>
		<h3 className="text-xl font-bold font-heading text-kbth-primary mb-3">
			{title}
		</h3>
		<p className="text-gray-600 leading-relaxed">
			{description}
		</p>
	</Card>
);

const ValueListItem = ({ icon, title, children }: { icon: string, title: string, children: React.ReactNode }) => (
	<li className="flex items-start">
		<div className="shrink-0 mt-1">
			<img src={icon} alt={title} className="w-6 h-6 object-contain" />
		</div>
		<div className="ml-4">
			<h4 className="text-lg font-bold text-kbth-primary">{title}</h4>
			<p className="text-gray-600 mt-1">{children}</p>
		</div>
	</li>
);
