"use client";

import React from "react";
import { motion } from "framer-motion";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

const departments = [
	{ name: "Accident & Emergency Centre", icon: "https://img.icons8.com/color/48/ambulance-1.png", description: "Providing 24/7 urgent medical attention and care for critical conditions.", bgImage: "/images/departments/ambulance.png" },
	{ name: "Department of Child Health", icon: "https://img.icons8.com/color/48/baby.png", description: "Comprehensive paediatric care for infants, children, and adolescents.", bgImage: "/images/departments/child.png" },
	{ name: "Obstetrics & Gynaecology", icon: "https://img.icons8.com/color/48/mothers-day.png", description: "Specialized maternal, fetal, and women's health services." },
	{ name: "Department of Surgery", icon: "https://img.icons8.com/color/48/surgery.png", description: "Advanced surgical procedures across multiple sub-specialties.", bgImage: "/images/departments/surgery.png" },
	{ name: "Central Lab", icon: "https://img.icons8.com/color/48/microscope.png", description: "State-of-the-art diagnostic testing and pathology services.", bgImage: "/images/departments/lab.png" },
	{ name: "Dental Department", icon: "https://img.icons8.com/color/48/tooth.png", description: "Complete oral health and dental surgical care." },
	{ name: "Physiotherapy", icon: "https://img.icons8.com/color/48/physical-therapy.png", description: "Rehabilitation and physical therapy services for recovery." },
	{ name: "Pharmacy", icon: "https://img.icons8.com/color/48/pill.png", description: "Dispensing of medications and complete pharmaceutical care." },
	{ name: "Eye Centre", icon: "https://img.icons8.com/color/48/eye.png", description: "Comprehensive eye care and ophthalmology services." },
	{ name: "Medicine & Therapeutics", icon: "https://img.icons8.com/color/48/stethoscope.png", description: "Diagnosis, treatment, and prevention of adult diseases." },
	{ name: "Nutrition & Dietetics", icon: "https://img.icons8.com/color/48/apple.png", description: "Expert dietary counselling and nutritional management." },
	{ name: "Polyclinic & Family Medicine", icon: "https://img.icons8.com/color/48/family.png", description: "General outpatient care and family health services." },
	{ name: "Trauma & Orthopaedics", icon: "https://img.icons8.com/color/48/bone.png", description: "Management of bone, joint, and musculoskeletal conditions." },
	{ name: "Department of Psychiatry", icon: "https://img.icons8.com/color/48/brain.png", description: "Mental health and psychiatric evaluation and treatment." },
	{ name: "Department of Radiology", icon: "https://img.icons8.com/color/48/x-ray.png", description: "Advanced imaging services including X-ray, MRI, and CT scans." },
	{ name: "Cardiothoracic Centre", icon: "https://img.icons8.com/color/48/heart-with-pulse.png", description: "Specialized care for heart, lung, and chest conditions." },
	{ name: "Ear, Nose & Throat Department", icon: "https://img.icons8.com/color/48/ear.png", description: "Expert diagnosis and treatment of ENT disorders." }
];

export const DepartmentsGrid = () => {
	return (
		<section className="bg-kbth-primary/5 py-20 relative">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-3xl md:text-5xl font-heading font-bold text-kbth-primary mb-6"
					>
						Departments & Centres
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-lg text-gray-700 font-body leading-relaxed"
					>
						Explore our specialized departments and centres of excellence dedicated to providing world-class healthcare to our patients.
					</motion.p>
				</div>

				<BentoGrid className="lg:grid-cols-3">
					{departments.map((dept, index) => {
						let spanClass = "lg:col-span-1";
						const patternIndex = index % 7;
						if (patternIndex === 0 || patternIndex === 3) {
							spanClass = "lg:col-span-2";
						}

						return (
							<BentoCard
								key={index}
								name={dept.name}
								icon={dept.icon}
								description={dept.description}
								href="#"
								cta="Learn more"
								className={spanClass}
								background={
									dept.bgImage ? (
										<img src={dept.bgImage} alt={dept.name} className="absolute inset-0 object-cover w-full h-full opacity-10 transition-opacity duration-300 group-hover:opacity-30 mix-blend-overlay" />
									) : (
										<div className="absolute inset-0 bg-kbth-primary/5" />
									)
								}
							/>
						);
					})}
				</BentoGrid>
			</div>
		</section>
	);
};
