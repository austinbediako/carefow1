"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export const ContactContent = () => {
	return (
		<div className="bg-kbth-bg pb-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

				{/* Main Columns */}
				<div className="flex flex-col lg:flex-row gap-16 mb-20">

					{/* Left Column: Contact Info */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="lg:w-1/3 space-y-10"
					>
						<div>
							<h2 className="text-3xl font-heading font-bold text-kbth-primary mb-4">Get in Touch</h2>
							<p className="text-gray-600 leading-relaxed">
								Whether you have a question about our services, need to schedule an appointment, or want to provide feedback, our team is ready to listen and support you.
							</p>
						</div>

						<div className="space-y-6">
							{/* Phone */}
							<div className="flex items-start">
								<div className="flex-shrink-0 mt-1">
									<div className="w-12 h-12 bg-kbth-primary/10 rounded-full flex items-center justify-center">
										<img src="https://img.icons8.com/color/48/phone.png" alt="Phone" className="w-6 h-6 object-contain" />
									</div>
								</div>
								<div className="ml-4">
									<h4 className="text-lg font-bold text-kbth-primary">Phone</h4>
									<p className="text-gray-600 mt-1">+233-302-739510 (Main)</p>
									<p className="text-gray-600">+233-244-406700</p>
								</div>
							</div>

							{/* Email */}
							<div className="flex items-start">
								<div className="flex-shrink-0 mt-1">
									<div className="w-12 h-12 bg-kbth-primary/10 rounded-full flex items-center justify-center">
										<img src="https://img.icons8.com/color/48/new-post.png" alt="Mail" className="w-6 h-6 object-contain" />
									</div>
								</div>
								<div className="ml-4">
									<h4 className="text-lg font-bold text-kbth-primary">Email Directory</h4>
									<p className="text-gray-600 mt-1"><span className="font-semibold text-kbth-primary">General:</span> info@kbth.gov.gh</p>
									<p className="text-gray-600"><span className="font-semibold text-kbth-primary">PR:</span> pr@kbth.gov.gh</p>
									<p className="text-gray-600"><span className="font-semibold text-kbth-primary">HR:</span> hr@kbth.gov.gh</p>
									<p className="text-gray-600"><span className="font-semibold text-kbth-primary">Medical:</span> dma.sec@kbth.gov.gh</p>
									<p className="text-gray-600"><span className="font-semibold text-kbth-primary">Secretariat:</span> ceo.secretariat@kbth.gov.gh</p>
								</div>
							</div>

							{/* Address */}
							<div className="flex items-start">
								<div className="flex-shrink-0 mt-1">
									<div className="w-12 h-12 bg-kbth-primary/10 rounded-full flex items-center justify-center">
										<img src="https://img.icons8.com/color/48/marker.png" alt="Location" className="w-6 h-6 object-contain" />
									</div>
								</div>
								<div className="ml-4">
									<h4 className="text-lg font-bold text-kbth-primary">Address</h4>
									<p className="text-gray-600 mt-1">Guggisberg Avenue, Accra, Ghana</p>
									<p className="text-gray-600">P. O. Box 77, Korle Bu</p>
									<p className="text-gray-600 italic">Digital Address: GA-221-1570</p>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Right Column: Form */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="lg:w-2/3"
					>
						<Card className="p-8 md:p-12 shadow-2xl border-kbth-primary/10 bg-white">
							<h3 className="text-2xl font-bold font-heading text-kbth-primary mb-6">Send us a Message</h3>
							<form className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
										<input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kbth-accent focus:border-transparent outline-none transition-all" placeholder="John Doe" />
									</div>
									<div className="space-y-2">
										<label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
										<input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kbth-accent focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
									</div>
								</div>

								<div className="space-y-2">
									<label htmlFor="subject" className="block text-sm font-semibold text-gray-700">Subject</label>
									<input type="text" id="subject" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kbth-accent focus:border-transparent outline-none transition-all" placeholder="How can we help you?" />
								</div>

								<div className="space-y-2">
									<label htmlFor="message" className="block text-sm font-semibold text-gray-700">Message</label>
									<textarea id="message" rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kbth-accent focus:border-transparent outline-none transition-all resize-none" placeholder="Write your message here..."></textarea>
								</div>

								<Button className="w-full md:w-auto bg-kbth-accent hover:bg-kbth-primary text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
									Send Message
								</Button>
							</form>
						</Card>
					</motion.div>
				</div>

				{/* Info Blocks */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
					<InfoCard
						icon="https://img.icons8.com/color/48/handshake.png"
						title="Personalized Consultations"
						description="Schedule a one-on-one consultation to discuss your health concerns and receive tailored advice from our experienced professionals."
					/>
					<InfoCard
						icon="https://img.icons8.com/color/48/city-buildings.png"
						title="State-of-the-Art Facilities"
						description="Experience our modern healthcare facilities equipped with the latest technology to ensure the best possible care for all patients."
					/>
					<InfoCard
						icon="https://img.icons8.com/color/48/stethoscope.png"
						title="Expert Medical Team"
						description="Our team of skilled healthcare providers is here to offer you expert guidance and support at every step of your health journey."
					/>
				</div>

				{/* Map Placeholder */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="w-full h-96 bg-gray-200 rounded-3xl overflow-hidden shadow-inner relative"
				>
					{/* Replace with actual iframe map if needed */}
					<div className="absolute inset-0 flex items-center justify-center text-gray-500 flex-col">
						<img src="https://img.icons8.com/color/48/marker.png" alt="Location" className="w-12 h-12 mb-4 object-contain" />
						<p className="font-heading font-bold text-lg">Interactive Map View</p>
						<p className="text-sm">Guggisberg Avenue, Accra, Ghana</p>
					</div>
				</motion.div>

			</div>
		</div>
	);
};

const InfoCard = ({ icon: Icon, title, description }: { icon: string, title: string, description: string }) => (
	<Card className="text-center p-8 bg-white border-transparent shadow-md hover:shadow-xl transition-all duration-300 group">
		<div className="w-16 h-16 bg-kbth-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-transform">
			<img src={Icon} alt={title} className="w-8 h-8 object-contain" />
		</div>
		<h3 className="text-xl font-bold font-heading text-kbth-primary mb-3">
			{title}
		</h3>
		<p className="text-gray-600 leading-relaxed text-sm">
			{description}
		</p>
	</Card>
);
