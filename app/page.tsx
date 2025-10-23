"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
	Users,
	Shield,
	Building,
	MapPin,
	Globe,
	Smartphone,
	AlertTriangle,
	Menu,
	X,
} from "lucide-react";

// Custom Navigation Component
const CustomNavigationMenu = ({ onLogin }: { onLogin: () => void }) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
							<Shield className="w-5 h-5 text-white" />
						</div>
						<span className="text-xl font-bold text-gray-900">Safai Karmachari</span>
					</div>

					{/* Desktop Navigation */}
					<NavigationMenu className="hidden lg:flex">
						<NavigationMenuList className="flex space-x-8">
							<NavigationMenuItem>
								<NavigationMenuLink 
									href="#home"
									className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
								>
									Home
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink 
									href="#impact"
									className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
								>
									Impact
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink 
									href="#stakeholders"
									className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
								>
									Stakeholders
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink 
									href="#footer"
									className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
								>
									Contact
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>

					{/* Desktop Login Button */}
					<Button
						onClick={onLogin}
						className="hidden lg:flex bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2"
					>
						Login
					</Button>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="lg:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
					>
						{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="lg:hidden mt-4 py-4 border-t border-gray-200"
					>
						<nav className="flex flex-col space-y-4">
							<a
								href="#home"
								className="text-gray-700 hover:text-purple-600 transition-colors font-medium py-2"
								onClick={() => setMobileMenuOpen(false)}
							>
								Home
							</a>
							<a
								href="#impact"
								className="text-gray-700 hover:text-purple-600 transition-colors font-medium py-2"
								onClick={() => setMobileMenuOpen(false)}
							>
								Impact
							</a>
							<a
								href="#stakeholders"
								className="text-gray-700 hover:text-purple-600 transition-colors font-medium py-2"
								onClick={() => setMobileMenuOpen(false)}
							>
								Stakeholders
							</a>
							<a
								href="#footer"
								className="text-gray-700 hover:text-purple-600 transition-colors font-medium py-2"
								onClick={() => setMobileMenuOpen(false)}
							>
								Contact
							</a>
							<Button
								onClick={() => {
									onLogin();
									setMobileMenuOpen(false);
								}}
								className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 mt-4"
							>
								Login
							</Button>
						</nav>
					</motion.div>
				)}
			</div>
		</header>
	);
};

export default function Home() {
	const [loginOpen, setLoginOpen] = useState(false);
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const [spcpType, setSpcpType] = useState("");
	const [error, setError] = useState("");
	const [mobileOpen, setMobileOpen] = useState(false);

	// clear sub-type when role changes away from sp-cp
	useEffect(() => {
		if (role !== "sp-cp") setSpcpType("");
	}, [role]);

	const handleLogin = () => {
		if (!userId || !password || !role) {
			setError("Please fill all fields.");
			return;
		}
		setError("");
		let dashboardPath = "/dashboard";
		switch (role) {
			case "contractor":
				dashboardPath = "/contractor/contractor-dashboard";
				break;
			case "nodal":
				dashboardPath = "/nodal/nodal-dashboard";
				break;
			case "district":
				dashboardPath = "/district/district-dashboard";
				break;
			case "state":
				dashboardPath = "/state/state-dashboard";
				break;
			case "national":
				dashboardPath = "/national/national-dashboard";
				break;
			case "sp-cp":
				// require the subtype selection (sp or cp)
				if (!spcpType) {
					setError("Please choose SP or CP before logging in.");
					return;
				}
				dashboardPath = `/sp-cp/sp-cp-dashboard?role=${spcpType}`;
				break;
			case "organizational-nodal":
				dashboardPath = "/organizational-nodal/organizational-nodal-dashboard";
				break;
			case "nskfdc":
				dashboardPath = "/nskfdc/nskfdc-dashboard";
				break;
			case "DGP":
				dashboardPath = "/dgp/dgp-dashboard";
				break;
			case "SHG":
				dashboardPath = "/shg/shg-dashboard";
				break;
			default:
				dashboardPath = "/dashboard";
		}

		// clear any error and navigate
		setError("");
		window.location.href = dashboardPath;
	};

	// Card animation variants
	const cardVariants = {
		hidden: { opacity: 0, y: 40 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, delay: i * 0.2 },
		}),
		hover: { scale: 1.05, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" },
	};

		return (
			<div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
				{/* ---------------- NAVBAR ---------------- */}
				<CustomNavigationMenu onLogin={() => setLoginOpen(true)} />

			{/* ---------------- HERO ---------------- */}
			<section id="home" className="flex flex-col items-center justify-center text-center pt-32 md:pt-40 pb-20 px-6 relative z-10">
				<motion.h1
					className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-text"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					Empowering Sanitation Workers with Technology
				</motion.h1>
				<motion.p
					className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3, duration: 1 }}
				>
					A digital ecosystem to ensure dignity, safety, and transparent
					governance for Safai Karmacharis across India.
				</motion.p>
				<Button
					className="px-10 py-6 text-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl hover:shadow-2xl rounded-full transform hover:scale-105 transition"
					onClick={() => setLoginOpen(true)}
				>
					Get Started
				</Button>
			</section>

			{/* ---------------- IMPACT & PURPOSE ---------------- */}
			<section id="impact" className="py-20 bg-white/70 backdrop-blur-sm">
				<div className="container mx-auto px-6 text-center">
					<motion.h2
						className="text-3xl md:text-4xl font-bold mb-12 text-gray-900"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						Impact & Purpose
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								title: "Dignity & Safety",
								desc: "Protects sanitation workers from unsafe practices, ensuring dignity with tech-driven safeguards.",
								icon: Shield,
								colors: "from-pink-100 via-white to-purple-100",
							},
							{
								title: "Eradication of Manual Scavenging",
								desc: "Real-time monitoring and alerts detect and prevent hazardous manual scavenging practices.",
								icon: AlertTriangle,
								colors: "from-red-100 via-white to-yellow-100",
							},
							{
								title: "Transparent Governance",
								desc: "Provides accountability and data-driven decision-making across municipal, state, and national levels.",
								icon: Globe,
								colors: "from-green-100 via-white to-blue-100",
							},
							{
								title: "Citizen & Worker Empowerment",
								desc: "Simplifies grievance redressal, improves welfare access, and fosters active citizen participation.",
								icon: Users,
								colors: "from-indigo-100 via-white to-cyan-100",
							},
						].map((item, i) => (
							<motion.div
								key={i}
								custom={i}
								variants={cardVariants}
								initial="hidden"
								whileInView="visible"
								whileHover="hover"
								viewport={{ once: true }}
								className={`flex flex-col items-center justify-start p-8 rounded-2xl shadow-lg transition-all duration-300 min-h-[300px] bg-gradient-to-br ${item.colors}`}
							>
								<item.icon className="w-12 h-12 text-purple-600 mb-4" />
								<h3 className="text-xl font-semibold mb-3 text-gray-900">
									{item.title}
								</h3>
								<p className="text-gray-700 text-sm leading-relaxed flex-grow">
									{item.desc}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ---------------- STAKEHOLDERS ---------------- */}
			<section id="stakeholders" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
				<div className="container mx-auto px-6 text-center">
					<motion.h2
						className="text-3xl md:text-4xl font-bold mb-12 text-gray-900"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						Stakeholders
					</motion.h2>
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
						{[
							{ icon: Users, title: "Workers" },
							{ icon: Smartphone, title: "Citizens" },
							{ icon: Shield, title: "Nodal Officers" },
							{ icon: Building, title: "District Officers" },
							{ icon: MapPin, title: "State Officers" },
							{ icon: Globe, title: "National Dashboard" },
							{ icon: Smartphone, title: "SP/CP", route: "sp-cp/sp-cp-dashboard" },
							{ icon: Building, title: "Contractors", route: "contractor/contractor-dashboard" },
							{ icon: Users, title: "Organizational Nodal", route: "organizational-nodal/organizational-nodal-dashboard" },
							{ icon: Globe, title: "NSKFDC", route: "nskfdc/nskfdc-dashboard" },
							{ icon: Shield, title: "DGP", route: "dgp/dgp-dashboard" },
							{ icon: Building, title: "SHG", route: "shg/shg-dashboard" },
						].map((s, i) => (
							<motion.div
								key={i}
								custom={i}
								variants={cardVariants}
								initial="hidden"
								whileInView="visible"
								whileHover="hover"
								viewport={{ once: true }}
								className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg transition-all duration-300 min-h-[220px] bg-gradient-to-br from-white via-gray-50 to-purple-50"
							>
								<s.icon className="w-12 h-12 text-blue-600 mb-4" />
								<h3 className="text-lg font-semibold">{s.title}</h3>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ---------------- FOOTER ---------------- */}
			<footer id="footer" className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 pt-12 pb-8 border-t border-gray-700">
				<div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
					{/* About */}
					<div>
						<h3 className="text-xl font-semibold text-white mb-3">
							Safai Karmachari Monitoring
						</h3>
						<p className="text-sm leading-relaxed text-gray-400">
							Empowering sanitation workers with technology to ensure dignity,
							safety, and transparent governance across India.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
						<ul className="space-y-2">
							<li><a href="#impact" className="hover:text-white transition-colors">Impact & Purpose</a></li>
							<li><a href="#stakeholders" className="hover:text-white transition-colors">Stakeholders</a></li>
							<li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
							<li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h3 className="text-xl font-semibold text-white mb-3">Contact</h3>
						<ul className="space-y-2 text-sm text-gray-400">
							<li>Email: <a href="mailto:support@safai.gov.in" className="hover:text-white">support@safai.gov.in</a></li>
							<li>Phone: <a href="tel:+911234567890" className="hover:text-white">+91 12345 67890</a></li>
							<li>Address: New Delhi, India</li>
						</ul>
					</div>
				</div>

				{/* Bottom */}
				<div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
					© {new Date().getFullYear()} Safai Karmachari Monitoring System. All rights reserved.
				</div>
			</footer>

			{/* ---------------- LOGIN MODAL ---------------- */}
			{loginOpen && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<motion.div
						className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ type: "spring", stiffness: 120, damping: 20 }}
					>
						<button
							className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
							onClick={() => setLoginOpen(false)}
							aria-label="Close"
						>
							✕
						</button>
						<h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
							Welcome Back
						</h2>
						<div className="mb-4">
							<label className="block mb-2 text-sm font-medium text-gray-700">
								User ID
							</label>
							<input
								type="text"
								className="w-full border rounded px-3 py-2"
								value={userId}
								onChange={(e) => setUserId(e.target.value)}
								placeholder="Enter User ID"
							/>
						</div>
						<div className="mb-4">
							<label className="block mb-2 text-sm font-medium text-gray-700">
								Password
							</label>
							<input
								type="password"
								className="w-full border rounded px-3 py-2"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter Password"
							/>
						</div>
						<div className="mb-6">
							<label className="block mb-2 text-sm font-medium text-gray-700">
								Select Role
							</label>
								<select
								className="w-full border rounded px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
								value={role}
								onChange={e => setRole(e.target.value)}
							>
								<option value="">Choose your role</option>
								<option value="contractor">Contractor</option>
								<option value="nodal">Nodal Officer</option>
								<option value="district">District Officer</option>
								<option value="state">State Officer</option>
								<option value="national">National (NCSK)</option>
								<option value="sp-cp">SP/CP</option>
								<option value="organizational-nodal">Organizational Nodal</option>
								<option value="nskfdc">NSKFDC</option>
								<option value="DGP">DGP</option>
								<option value="SHG">SHG</option>
							</select>

							{/* If SP/CP is chosen, ask for SP or CP specifically */}
							{role === "sp-cp" && (
								<div className="mt-3">
									<label className="block mb-2 text-sm font-medium text-gray-700">Are you SP or CP?</label>
									<select
										className="w-full border rounded px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
										value={spcpType}
										onChange={e => setSpcpType(e.target.value)}
									>
										<option value="">Choose SP or CP</option>
										<option value="sp">SP</option>
										<option value="cp">CP</option>
									</select>
								</div>
							)}
						</div>
						{error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
						<Button
							className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
							onClick={handleLogin}
						>
							Login
						</Button>
					</motion.div>
				</motion.div>
			)}

			{/* ---------------- TEXT ANIMATION ---------------- */}
			<style jsx global>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-text {
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
        }
      `}</style>
		</div>
	);
}
