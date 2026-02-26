"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { UserRole } from "@/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { clsx } from "clsx";

export default function LoginPage() {
	const router = useRouter();
	const { setRole, initializeData } = useStore();
	const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

	const roles: { id: UserRole; label: string; icon: string; desc: string }[] = [
		{
			id: "BED_MANAGER",
			label: "Bed Bureau",
			icon: "https://img.icons8.com/color/96/hospital-bed.png",
			desc: "Manage hospital-wide capacity and allocations",
		},
		{
			id: "DOCTOR", // Using DOCTOR for ED Staff in this context
			label: "ED Staff",
			icon: "https://img.icons8.com/color/96/medical-doctor.png",
			desc: "Request beds for incoming patients",
		},
		{
			id: "NURSE",
			label: "Ward Nurse",
			icon: "https://img.icons8.com/color/96/nurse-female--v1.png",
			desc: "Manage ward bed status and discharges",
		},
		{
			id: "ADMIN",
			label: "Administrator",
			icon: "https://img.icons8.com/color/96/admin-settings-male.png",
			desc: "System configuration and audit logs",
		},
	];

	const handleEnter = () => {
		if (!selectedRole) return;
		setRole(selectedRole);
		initializeData(); // Ensure mock data is ready
		router.push("/dashboard");
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-[#F5F5F7] p-6">
			<div className="w-full max-w-4xl space-y-8">
				<div className="text-center space-y-2">
					<div className="mx-auto flex h-24 w-24 items-center justify-center">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src="https://kbth.gov.gh/wp-content/uploads/2025/01/cropped-kbth-logo-Photoroom-1.png" alt="KBTH" className="h-full w-full object-contain" />
					</div>
					<h1 className="text-4xl font-bold tracking-tight text-slate-900">
						MedFlow
					</h1>
					<p className="text-lg text-slate-500 max-w-md mx-auto">
						Select your role to access the command center.
					</p>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
				>
					{roles.map((role) => {
						const isSelected = selectedRole === role.id;

						return (
							<motion.div
								key={role.id}
								whileHover={{ y: -4 }}
								whileTap={{ scale: 0.98 }}
							>
								<Card
									className={clsx(
										"cursor-pointer border-2 transition-all duration-200 h-full flex flex-col items-center text-center p-6 gap-4",
										isSelected
											? "border-blue-600 bg-blue-50/50 ring-4 ring-blue-600/10"
											: "border-transparent hover:border-slate-200"
									)}
									onClick={() => setSelectedRole(role.id)}
								>
									<div
										className={clsx(
											"rounded-full p-4 transition-colors",
											isSelected
												? "bg-blue-100 shadow-lg shadow-blue-600/30"
												: "bg-white border border-slate-100 group-hover:bg-slate-50"
										)}
									>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img src={role.icon} alt={role.label} className="h-10 w-10 object-contain" />
									</div>
									<div>
										<h3 className="font-semibold text-slate-900">{role.label}</h3>
										<p className="mt-2 text-xs text-slate-500 leading-relaxed">
											{role.desc}
										</p>
									</div>
								</Card>
							</motion.div>
						);
					})}
				</motion.div>

				<div className="flex justify-center pt-8">
					<Button
						size="lg"
						className="w-full max-w-xs rounded-full text-lg h-14 shadow-xl shadow-blue-900/20"
						disabled={!selectedRole}
						onClick={handleEnter}
					>
						Enter Platform
						<img src="https://img.icons8.com/color/48/arrow-right.png" alt="arrow right" className="ml-2 h-5 w-5 object-contain" />
					</Button>
				</div>
			</div>
		</div>
	);
}
