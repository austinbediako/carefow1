"use client";

import React from "react";
import { motion } from "framer-motion";

export const AboutHero = () => {
	return (
		<section className="bg-kbth-bg py-20 relative overflow-hidden">
			{/* Decorative Background Elements */}
			<div className="absolute top-0 right-0 w-1/3 h-full bg-kbth-primary/5 -skew-x-12 translate-x-1/2 transform"></div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center max-w-4xl mx-auto mb-16"
				>
					<h1 className="text-4xl md:text-5xl font-heading font-bold text-kbth-primary mb-6">
						About Us
					</h1>
					<p className="text-lg md:text-xl text-gray-700 leading-relaxed font-body">
						Welcome to <span className="text-kbth-accent font-semibold">Korle Bu Teaching Hospital</span>, Ghana’s premier national referral centre since 1923. We are a dedicated team of medical professionals who are committed to providing exceptional tertiary and quaternary healthcare services.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-16">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="space-y-8"
					>
						<div>
							<h3 className="text-2xl font-heading font-semibold text-kbth-primary mb-3 flex items-center gap-2">
								<span className="w-8 h-1 bg-kbth-accent rounded-full inline-block"></span>
								Our Legacy of Excellence
							</h3>
							<p className="text-gray-600 font-body leading-relaxed">
								For more than a century, Korle Bu has been at the forefront of medical care, education, advocacy, and research in Ghana and the West Africa sub-region. Our team comprises some of the finest medical professionals, many of whom have trained at world-class institutions in Europe, the United States, and other parts of the world.
							</p>
						</div>

						<div>
							<h3 className="text-2xl font-heading font-semibold text-kbth-primary mb-3 flex items-center gap-2">
								<span className="w-8 h-1 bg-kbth-accent rounded-full inline-block"></span>
								Comprehensive Healthcare Services
							</h3>
							<p className="text-gray-600 font-body leading-relaxed">
								We offer a wide range of specialist and sub-specialty services, ensuring that our patients receive comprehensive care tailored to their needs. Our commitment to excellence attracts patients from across Ghana and neighboring West African countries.
							</p>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="space-y-8"
					>
						<div>
							<h3 className="text-2xl font-heading font-semibold text-kbth-primary mb-3 flex items-center gap-2">
								<span className="w-8 h-1 bg-kbth-accent rounded-full inline-block"></span>
								A Hub for Medical Education
							</h3>
							<p className="text-gray-600 font-body leading-relaxed">
								Korle Bu is a renowned centre for training undergraduate and postgraduate medical students, as well as nursing and other healthcare professionals. Our institution has been instrumental in training the requisite human resources for many hospitals in Ghana and continues to play a pivotal role in shaping the future of healthcare in the region.
							</p>
						</div>

						<div>
							<h3 className="text-2xl font-heading font-semibold text-kbth-primary mb-3 flex items-center gap-2">
								<span className="w-8 h-1 bg-kbth-accent rounded-full inline-block"></span>
								Pioneering Medical Research
							</h3>
							<p className="text-gray-600 font-body leading-relaxed">
								With an average daily attendance of 1,500 patients, Korle Bu provides a fertile ground for medical research. Our contributions have gained international recognition, notably in the discovery of a vaccine for Yellow Fever and advancements in understanding tropical diseases.
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};
