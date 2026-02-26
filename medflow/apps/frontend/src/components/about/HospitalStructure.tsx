"use client";

import React from "react";
import { motion } from "framer-motion";

export const HospitalStructure = () => {
	return (
		<section className="bg-white py-24 relative">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

				{/* The Structure */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<div className="flex items-center gap-3 mb-6">
							<img src="https://img.icons8.com/color/48/network.png" alt="network" className="w-8 h-8" />
							<h2 className="text-3xl md:text-4xl font-heading font-bold text-kbth-primary">The Structure</h2>
						</div>
						<div className="space-y-6 text-gray-600 font-body leading-relaxed text-lg">
							<p>
								The promulgation of the Ghana Health Service and Teaching Hospitals Act, Act 525 of 1996 gave the Hospital the power to operate as a semi-autonomous organisation. It draws direction from a Board which is charged with giving broad policy guidance for the smooth administration of the Hospital.
							</p>
							<p>
								The daily administration of the Hospital is, however, vested in the Chief Executive with assistance from seven Directors. The Directors are for Medical Affairs, Nursing Services, Pharmacy, Administration, Finance, Human Resources and General Services.
							</p>
							<p>
								Currently, the Korle Bu Teaching Hospital has 14 Sub-BMCs, namely, Obstetrics and Gynaecology, Medicine, Surgery, Trauma & Orthopaedics, National Reconstructive Plastic Surgery and Burns Centre, Pathology, Child Health, Polyclinic, Laboratory, Anaesthesia, Radiology, Psychiatry, Accident & Emergency and Allied Surgery Sub-BMCs.
							</p>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
					>
						<div className="absolute inset-0 bg-kbth-primary/20 z-10 mix-blend-multiply"></div>
						<img
							src="https://kbth.gov.gh/newsite25/wp-content/uploads/2025/01/IMG_5787-scaled.jpg"
							alt="Korle Bu Teaching Hospital Structure"
							className="object-cover w-full h-full"
						/>
					</motion.div>
				</div>

				{/* National Centers of Excellence */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-row-reverse lg:flex-row-reverse">
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="lg:col-start-2"
					>
						<div className="flex items-center gap-3 mb-6">
							<img src="https://img.icons8.com/color/48/hospital-3.png" alt="building" className="w-8 h-8" />
							<h2 className="text-3xl md:text-4xl font-heading font-bold text-kbth-primary">Centres of Excellence</h2>
						</div>
						<div className="space-y-6 text-gray-600 font-body leading-relaxed text-lg">
							<p>
								There are three Centres of Excellence in the Hospital, namely, the National Cardiothoracic Centre, the National Reconstructive Plastic Surgery and Burns Centre and the National Centre for Radiotherapy and Nuclear Medicine.
							</p>
							<p>
								These Centres attract a sizeable number of clients within the country and from neighbouring countries such as Burkina Faso, Nigeria, Togo and Benin among others.
							</p>
						</div>
						<div className="mt-8 flex gap-4 text-sm font-semibold text-kbth-primary">
							<span className="bg-kbth-primary/5 px-4 py-2 rounded-full border border-kbth-primary/10 flex items-center gap-2"><img src="https://img.icons8.com/color/48/handshake.png" alt="handshake" className="w-4 h-4" /> Cardiothoracic</span>
							<span className="bg-kbth-primary/5 px-4 py-2 rounded-full border border-kbth-primary/10 flex items-center gap-2"><img src="https://img.icons8.com/color/48/handshake.png" alt="handshake" className="w-4 h-4" /> Reconstructive Plastic Surgery</span>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative h-96 rounded-2xl overflow-hidden shadow-2xl lg:col-start-1"
					>
						<div className="absolute inset-0 bg-kbth-primary/20 z-10 mix-blend-multiply"></div>
						<img
							src="https://kbth.gov.gh/newsite25/wp-content/uploads/2025/01/plastic-surgery-scaled.jpg"
							alt="Plastic Surgery Center"
							className="object-cover w-full h-full"
						/>
					</motion.div>
				</div>

			</div>
		</section>
	);
};
