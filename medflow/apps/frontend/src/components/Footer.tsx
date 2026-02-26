import React from "react";
import Link from "next/link";


export function Footer() {
	return (
		<footer className="bg-kbth-primary text-white pt-20 pb-10">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
					{/* Logo & About */}
					<div className="space-y-6">
						<Link href="/" className="inline-block bg-white p-3 rounded-xl border border-white/20 shadow-lg">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="https://kbth.gov.gh/wp-content/uploads/2025/01/cropped-kbth-logo-Photoroom-1.png"
								alt="KBTH Logo"
								className="h-16 w-auto"
							/>
						</Link>
						<p className="text-slate-300 leading-relaxed max-w-sm">
							Korle Bu Teaching Hospital is Ghana&apos;s leading referral centre, dedicated to world-class care and training since 1923.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-bold font-heading mb-6 flex items-center">
							<span className="w-8 h-1 bg-kbth-accent mr-3 rounded-full"></span>
							Quick Links
						</h3>
						<ul className="space-y-4">
							{[
								{ name: "Home", href: "/" },
								{ name: "About us", href: "/about-us" },
								{ name: "Media", href: "/media" },
								{ name: "Resources", href: "/resources" },
								{ name: "Career", href: "/careers" },
							].map((link) => (
								<li key={link.name}>
									<Link href={link.href} className="text-slate-300 hover:text-kbth-accent transition-colors flex items-center">
										<span className="text-kbth-accent/50 mr-2 text-xs">▶</span>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="text-lg font-bold font-heading mb-6 flex items-center">
							<span className="w-8 h-1 bg-kbth-accent mr-3 rounded-full"></span>
							Contact Us
						</h3>
						<ul className="space-y-5 text-slate-300">
							<li className="flex items-start">
								<img src="https://img.icons8.com/color/48/marker--v1.png" alt="Location" className="w-6 h-6 mr-3 shrink-0 mt-0.5" />
								<span>Korle Bu, Accra, Ghana<br />P.O. Box 77</span>
							</li>
							<li className="flex items-start hover:text-kbth-accent transition-colors cursor-pointer">
								<img src="https://img.icons8.com/color/48/phone.png" alt="Phone" className="w-6 h-6 mr-3 shrink-0 mt-0.5" />
								<div>
									<a href="tel:+233302739510" className="block">+233-(302) 739510 (Main)</a>
									<a href="tel:+233244406700" className="block mt-1">+233-(244) 406700</a>
								</div>
							</li>
							<li className="flex items-start hover:text-kbth-accent transition-colors cursor-pointer">
								<img src="https://img.icons8.com/color/48/new-post.png" alt="Email" className="w-6 h-6 mr-3 shrink-0 mt-0.5" />
								<a href="mailto:info@kbth.gov.gh">info@kbth.gov.gh</a>
							</li>
						</ul>
					</div>

					{/* Social */}
					<div>
						<h3 className="text-lg font-bold font-heading mb-6 flex items-center">
							<span className="w-8 h-1 bg-kbth-accent mr-3 rounded-full"></span>
							Connect
						</h3>
						<p className="text-slate-300 mb-6">Follow us on our social media platforms to stay updated.</p>
						<div className="flex space-x-4">
							<a href="https://web.facebook.com/Kbth.gh/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-kbth-accent hover:text-white transition-all">
								<img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" className="w-6 h-6" />
							</a>
							<a href="https://x.com/KBTH_GH" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-kbth-accent hover:text-white transition-all">
								<img src="https://img.icons8.com/color/48/twitter--v1.png" alt="Twitter" className="w-6 h-6" />
							</a>
							<a href="https://www.instagram.com/kbth_gh/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-kbth-accent hover:text-white transition-all">
								<img src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="Instagram" className="w-6 h-6" />
							</a>
							<a href="https://kbth.gov.gh/feed/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-kbth-accent hover:text-white transition-all">
								<img src="https://img.icons8.com/color/48/rss.png" alt="RSS" className="w-6 h-6" />
							</a>
						</div>
					</div>
				</div>

				<div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
					<p>Copyright &copy; {new Date().getFullYear()} KBTH. All Rights Reserved.</p>
					<div className="mt-4 md:mt-0 space-x-6">
						<a href="#" className="hover:text-kbth-accent transition-colors">Privacy Policy</a>
						<a href="#" className="hover:text-kbth-accent transition-colors">Terms of Service</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
