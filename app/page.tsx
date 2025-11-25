"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { motion, easeInOut, AnimatePresence } from "framer-motion"; // --- NEW --- Added AnimatePresence
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
    LayoutDashboard, // Added for mockup
    BarChart2,      // Added for mockup
    Bell,           // Added for mockup
} from "lucide-react";

// --- NEW, BOLDER, ANIMATED NAVIGATION COMPONENT ---
const CustomNavigationMenu = ({ onLogin }: { onLogin: () => void }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    // --- NEW --- State to track scroll position
    const [isScrolled, setIsScrolled] = useState(false);

    // --- NEW --- Effect to listen for scroll
    useEffect(() => {
        const handleScroll = () => {
            // Set state to true if user has scrolled more than 10px
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        // Cleanup listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- NEW --- Animation variants for staggered mobile menu
    const mobileMenuVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Animate items 0.08s after each other
                delayChildren: 0.1,
            },
        },
    };

    const mobileNavItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { stiffness: 100, damping: 15 },
        },
    };

    return (
        // --- NEW --- Header is now an animated gradient and shrinks on scroll
        <header
            className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 via-pink-400 to-blue-600 backdrop-blur-xl shadow-lg border-b border-purple-300/40 
            transition-all duration-300 ease-in-out animate-text bg-[length:200%_200%]
            ${isScrolled ? 'py-2' : 'py-3' // Scrolled state: smaller padding
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <img
                            src="/safai_logo.png"
                            alt="Safai Logo"
                            className={`object-contain drop-shadow-2xl bg-transparent transition-all duration-300 ease-in-out ${isScrolled ? 'w-12 h-12' : 'w-16 h-16'}`}
                            style={{ background: 'transparent' }}
                        />
                        {/* --- NEW --- Title is now gradient text */}
                        <span className="text-2xl font-extrabold tracking-tight drop-shadow-lg bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent" style={{ textShadow: '0 2px 8px rgba(59,130,246,0.18)' }}>
                            Safai Karmachari
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList className="flex space-x-1">
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="#home"
                                    // --- NEW --- Brighter, "glassy" hover effect
                                    className="text-white/90 hover:text-white transition-all font-semibold px-4 py-2 rounded-xl hover:bg-white/20 shadow-sm hover:shadow-lg duration-200"
                                >
                                    Home
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="#impact"
                                    // --- NEW --- Brighter, "glassy" hover effect
                                    className="text-white/90 hover:text-white transition-all font-semibold px-4 py-2 rounded-xl hover:bg-white/20 shadow-sm hover:shadow-lg duration-200"
                                >
                                    Impact
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="#stakeholders"
                                    // --- NEW --- Brighter, "glassy" hover effect
                                    className="text-white/90 hover:text-white transition-all font-semibold px-4 py-2 rounded-xl hover:bg-white/20 shadow-sm hover:shadow-lg duration-200"
                                >
                                    Stakeholders
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="#footer"
                                    // --- NEW --- Brighter, "glassy" hover effect
                                    className="text-white/90 hover:text-white transition-all font-semibold px-4 py-2 rounded-xl hover:bg-white/20 shadow-sm hover:shadow-lg duration-200"
                                >
                                    Contact
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* --- NEW --- Desktop Create SHG & Login Buttons */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <Button
                            onClick={() => router.push('/shg-cr')}
                            className="relative overflow-hidden group bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 hover:from-yellow-500 hover:to-blue-700 text-white font-bold px-8 py-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/40 border-2 border-white/30"
                        >
                            <span className="absolute top-0 left-[-150%] w-3/4 h-full bg-white/30 transform -skew-x-20 transition-all duration-700 ease-in-out group-hover:left-[150%]" />
                            <span className="relative z-10">Create SHG</span>
                        </Button>

                        <Button
                            onClick={onLogin}
                            className="relative overflow-hidden group bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 hover:from-yellow-500 hover:to-blue-700 text-white font-bold px-8 py-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/40 border-2 border-white/30"
                        >
                            <span className="absolute top-0 left-[-150%] w-3/4 h-full bg-white/30 transform -skew-x-20 transition-all duration-700 ease-in-out group-hover:left-[150%]" />
                            <span className="relative z-10">Login</span>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-white/90 hover:text-yellow-300 transition-colors bg-gradient-to-r from-purple-600 via-pink-400 to-blue-600 rounded-full shadow-md"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* --- NEW --- Animated Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -20 }}
                        variants={mobileMenuVariants} // Parent variant
                        className="lg:hidden mt-4 py-6 px-4 border-t border-purple-300/40 bg-gradient-to-br from-purple-600 via-pink-400 to-blue-600 shadow-2xl rounded-2xl"
                    >
                        <nav className="flex flex-col space-y-5">
                            <motion.a // --- NEW ---
                                href="#home"
                                variants={mobileNavItemVariants} // Child variant
                                className="text-white/90 font-semibold py-3 px-6 rounded-xl bg-gradient-to-r from-purple-500/40 to-blue-500/40 shadow hover:text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-400/30 hover:to-blue-400/30 transition-all duration-200"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </motion.a>
                            <motion.a // --- NEW ---
                                href="#impact"
                                variants={mobileNavItemVariants} // Child variant
                                className="text-white/90 font-semibold py-3 px-6 rounded-xl bg-gradient-to-r from-purple-500/40 to-blue-500/40 shadow hover:text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-400/30 hover:to-blue-400/30 transition-all duration-200"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Impact
                            </motion.a>
                            <motion.a // --- NEW ---
                                href="#stakeholders"
                                variants={mobileNavItemVariants} // Child variant
                                className="text-white/90 font-semibold py-3 px-6 rounded-xl bg-gradient-to-r from-purple-500/40 to-blue-500/40 shadow hover:text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-400/30 hover:to-blue-400/30 transition-all duration-200"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Stakeholders
                            </motion.a>
                            <motion.a // --- NEW ---
                                href="#footer"
                                variants={mobileNavItemVariants} // Child variant
                                className="text-white/90 font-semibold py-3 px-6 rounded-xl bg-gradient-to-r from-purple-500/40 to-blue-500/40 shadow hover:text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-400/30 hover:to-blue-400/30 transition-all duration-200"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact
                            </motion.a>
                            <motion.div variants={mobileNavItemVariants}> {/* --- NEW --- Wrapper */}
                                <div className="space-y-3">
                                    <Button
                                        onClick={() => {
                                            router.push('/shg-cr');
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 hover:from-yellow-500 hover:to-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg border-2 border-white/30 transition-all duration-300"
                                    >
                                        Create SHG
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            onLogin();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 hover:from-yellow-500 hover:to-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg border-2 border-white/30 transition-all duration-300"
                                    >
                                        Login
                                    </Button>
                                </div>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </div>
        </header>
    );
};
// --- END OF NAVBAR COMPONENT ---


export default function Home() {
    // Carousel images from public folder
    const carouselImages = [
        "/safai 1a.png",
        "/safai 1b.png",
        "/safai 1c.png",
        "/safai 1d.png"
    ];

    const [carouselIndex, setCarouselIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
        }, 2500); // Change image every 2.5 seconds
        return () => clearInterval(interval);
    }, [carouselImages.length]);
    const [loginOpen, setLoginOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [spcpType, setSpcpType] = useState("");
    const [error, setError] = useState("");

    // clear sub-type when role changes away from sp-cp
    useEffect(() => {
        if (role !== "sp-cp") setSpcpType("");
    }, [role]);

    // --- No changes to login logic ---
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
                dashboardPath =
                    "/organizational-nodal/organizational-nodal-dashboard";
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

    // Standard card variants (re-usable for framer-motion)
    const cardEntryVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: i * 0.15, ease: easeInOut },
        }),
    };

    // --- Hero content animation variants ---
    const heroContentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Animate children 0.2s after each other
            },
        },
    };

    const heroItemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: easeInOut },
        },
    };
    // --- End of variants ---

    const impactCards = [
        {
            title: "Dignity & Safety",
            desc: "Protects sanitation workers from unsafe practices, ensuring dignity with tech-driven safeguards.",
            icon: Shield,
            iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
            hoverGlow: "hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]", // --- NEW ---
            pulseClass: "animate-pulse-pink",
        },
        {
            title: "Eradication of Manual Scavenging",
            desc: "Real-time monitoring and alerts detect and prevent hazardous manual scavenging practices.",
            icon: AlertTriangle,
            iconBg: "bg-gradient-to-br from-red-500 to-orange-500",
            hoverGlow: "hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]", // --- NEW ---
            pulseClass: "animate-pulse-red",
        },
        {
            title: "Transparent Governance",
            desc: "Provides accountability and data-driven decision-making across municipal, state, and national levels.",
            icon: Globe,
            iconBg: "bg-gradient-to-br from-green-500 to-cyan-500",
            hoverGlow: "hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]", // --- NEW ---
            pulseClass: "animate-pulse-green",
        },
        {
            title: "Citizen & Worker Empowerment",
            desc: "Simplifies grievance redressal, improves welfare access, and fosters active citizen participation.",
            icon: Users,
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500",
            hoverGlow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]", // --- NEW ---
            pulseClass: "animate-pulse-blue",
        },
    ];

    const stakeholderItems = [
        { icon: Users, title: "Workers" },
        { icon: Smartphone, title: "Citizens" },
        { icon: Shield, title: "Nodal Officers" },
        { icon: Building, title: "District Officers" },
        { icon: MapPin, title: "State Officers" },
        { icon: Globe, title: "National Dashboard" },
        { icon: Smartphone, title: "SP/CP", route: "sp-cp/sp-cp-dashboard" },
        {
            icon: Building,
            title: "Contractors",
            route: "contractor/contractor-dashboard",
        },
        {
            icon: Users,
            title: "Organizational Nodal",
            route: "organizational-nodal/organizational-nodal-dashboard",
        },
        { icon: Globe, title: "NSKFDC", route: "nskfdc/nskfdc-dashboard" },
        { icon: Shield, title: "DGP", route: "dgp/dgp-dashboard" },
        { icon: Building, title: "SHG", route: "shg/shg-dashboard" },
    ];

    // Array of gradients for the stakeholder cards
    const stakeholderGradients = [
        "bg-gradient-to-br from-purple-600 to-blue-500",
        "bg-gradient-to-br from-pink-500 to-violet-500",
        "bg-gradient-to-br from-cyan-500 to-teal-500",
        "bg-gradient-to-br from-green-500 to-lime-500",
        "bg-gradient-to-br from-amber-500 to-orange-500",
        "bg-gradient-to-br from-red-500 to-rose-500",
    ];

    return (
        // --- NEW --- Added overflow-x-hidden for safety
        <div className="relative min-h-screen bg-white overflow-x-hidden">
            {/* --- NEW --- Animated Aurora Background */}
            <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-white">
                <motion.div
                    className="absolute inset-0 -z-10 h-full w-full bg-gradient-mesh animate-background-pan"
                />
            </div>
            {/* --- NEW --- Subtle static grid pattern */}
            <div className="absolute inset-0 -z-9 h-full w-full bg-[radial-gradient(rgba(168,85,247,0.08)_1px,transparent_1px)] [background-size:20px_20px]"></div>


            {/* ---------------- NAVBAR ---------------- */}
            <CustomNavigationMenu onLogin={() => setLoginOpen(true)} />

            {/* ---------------- HERO (ALL NEW STYLING) ---------------- */}
            <section
                id="home"
                className="relative container mx-auto flex flex-col lg:flex-row items-center justify-between text-center lg:text-left pt-48 md:pt-56 pb-20 px-6 overflow-hidden lg:gap-16"
                style={{ perspective: "1500px" }} // --- NEW --- Perspective for 3D carousel
            >
                {/* --- Content wrapper with staggered animation --- */}
                <motion.div
                    className="relative z-10 flex flex-col items-center lg:items-start lg:w-8/12 pb-8"
                    variants={heroContentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1] mb-12 pb-2 bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-text drop-shadow-sm"
                        variants={heroItemVariants}
                    >
                        Empowering Sanitation Workers with Technology
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-2xl text-gray-700 max-w-xl mx-auto lg:mx-0 mb-10"
                        variants={heroItemVariants}
                    >
                        A digital ecosystem to ensure dignity, safety, and transparent
                        governance for Safai Karmacharis across India.
                    </motion.p>
                    <motion.div variants={heroItemVariants}>
                        {" "}
                        {/* Wrapper for button */}
                        <Button
                            className="px-10 py-6 text-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl hover:shadow-2xl hover:shadow-purple-500/60 rounded-full transform hover:scale-105 transition-all duration-300 animate-glow-pulse"
                            onClick={() => setLoginOpen(true)}
                        >
                            Get Started
                        </Button>
                    </motion.div>
                </motion.div>

                {/* --- NEW --- 3D Animated Image Carousel --- */}
                <div className="relative z-10 hidden lg:flex lg:w-1/2 items-center justify-center mt-12 lg:mt-0 h-[32rem]">
                    <AnimatePresence>
                        <motion.img
                            key={carouselIndex}
                            src={carouselImages[carouselIndex]}
                            alt={`carousel-img-${carouselIndex}`}
                            initial={{ opacity: 0, x: 200, rotateY: -45 }} // Start from right, tilted
                            animate={{ opacity: 1, x: 0, rotateY: 0 }} // Arrive at center
                            exit={{ opacity: 0, x: -200, rotateY: 45 }} // Exit to left, tilted
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                            className="absolute w-full h-full object-contain drop-shadow-2xl shadow-purple-200"
                            style={{ maxHeight: "30rem" }}
                        />
                    </AnimatePresence>
                </div>
            </section>

            {/* ---------------- IMPACT & PURPOSE ---------------- */}
            <section
                id="impact"
                className="py-24 bg-gray-50" // --- NEW --- Cleaner background
            >
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold tracking-tight mb-16 text-gray-900"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Impact & Purpose
                    </motion.h2>

                    {/* --- NEW --- Added perspective for 3D tilt */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ perspective: "1000px" }}>
                        {impactCards.map((item, i) => (
                            <motion.div
                                key={item.title}
                                custom={i}
                                variants={cardEntryVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ y: -10, rotateX: 8, rotateY: -3 }} // --- NEW --- 3D tilt
                                className={`group relative overflow-hidden flex flex-col items-center justify-start p-8 rounded-2xl shadow-xl transition-all duration-300 bg-white backdrop-blur-lg border border-gray-200/50 ${item.hoverGlow}`}
                            >
                                {/* --- NEW --- Shine effect added */}
                                <span className="absolute top-0 left-[-150%] w-3/4 h-full bg-white/40 transform -skew-x-20 transition-all duration-700 ease-in-out group-hover:left-[150%]" />

                                {/* Pulsing glow animation */}
                                <div
                                    className={`relative z-10 w-16 h-16 rounded-full mb-6 flex items-center justify-center ${item.iconBg} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 ${item.pulseClass}`}
                                >
                                    <item.icon className="w-8 h-8 text-white transition-all duration-300 group-hover:rotate-12" />
                                </div>
                                <h3 className="relative z-10 text-xl font-semibold mb-3 text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="relative z-10 text-gray-600 text-lg leading-relaxed flex-grow">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- STAKEHOLDERS ---------------- */}
            <section id="stakeholders" className="py-24 bg-gray-50/50 relative"> {/* --- NEW --- Cleaner background */}
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold tracking-tight mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Stakeholders
                    </motion.h2>
                    {/* --- NEW --- Added perspective for 3D tilt */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6" style={{ perspective: "1000px" }}>
                        {stakeholderItems.map((s, i) => (
                            <motion.div
                                key={s.title}
                                custom={i}
                                variants={cardEntryVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                // --- NEW --- Stronger 3D tilt
                                whileHover={{ scale: 1.1, y: -10, rotateX: 15, rotateY: 8 }}
                                className={`relative group overflow-hidden flex flex-col items-center justify-center p-5 rounded-2xl shadow-lg transition-all duration-700 ease-in-out
                                            ${stakeholderGradients[
                                    i % stakeholderGradients.length
                                ]
                                    }
                                            bg-[length:100%_100%] hover:bg-[length:200%_200%] hover:shadow-xl`}
                            >
                                {/* Shine element */}
                                <span className="absolute top-0 left-[-150%] w-3/4 h-full bg-white/30 transform -skew-x-20 transition-all duration-700 ease-in-out group-hover:left-[150%]" />

                                <s.icon className="w-10 h-10 mb-4 text-white" />
                                <h3 className="text-sm font-semibold text-white text-center">
                                    {s.title}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- FOOTER ---------------- */}
            <footer
                id="footer"
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 pt-20 pb-12 relative"
            >
                {/* --- NEW --- Gradient top border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-text" />

                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* About */}
                    <div>
                        {/* --- NEW --- Gradient text */}
                        <h3 className="text-xl font-semibold text-white mb-3 tracking-wide bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Safai Karmachari Monitoring
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Empowering sanitation workers with technology to ensure dignity,
                            safety, and transparent governance across India.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        {/* --- NEW --- Gradient text */}
                        <h3 className="text-xl font-semibold text-white mb-3 tracking-wide bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#impact"
                                    className="text-gray-300 hover:text-purple-300 transition-colors"
                                >
                                    Impact & Purpose
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#stakeholders"
                                    className="text-gray-300 hover:text-purple-300 transition-colors"
                                >
                                    Stakeholders
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-purple-300 transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-purple-300 transition-colors"
                                >
                                    Terms & Conditions
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        {/* --- NEW --- Gradient text */}
                        <h3 className="text-xl font-semibold text-white mb-3 tracking-wide bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Contact
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>
                                Email:{" "}
                                <a
                                    href="mailto:support@safai.gov.in"
                                    className="hover:text-purple-300"
                                >
                                    support@safai.gov.in
                                </a>
                            </li>
                            <li>
                                Phone:{" "}
                                <a
                                    href="tel:+911234567890"
                                    className="hover:text-purple-300"
                                >
                                    +91 12345 67890
                                </a>
                            </li>
                            <li>Address: New Delhi, India</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Safai Karmachari Monitoring System.
                    All rights reserved.
                </div>
            </footer>

            {/* ---------------- LOGIN MODAL ---------------- */}
            {loginOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            onClick={() => setLoginOpen(false)}
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-text">
                            Welcome Back
                        </h2>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                User ID
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300/70 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 bg-white/60 transition"
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
                                className="w-full border border-gray-300/70 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 bg-white/60 transition"
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
                                className="w-full border border-gray-300/70 rounded-lg px-3 py-2 bg-white/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Choose your role</option>
                                <option value="contractor">Contractor</option>
                                <option value="nodal">Nodal Officer</option>
                                <option value="district">District Officer</option>
                                <option value="state">State Officer</option>
                                <option value="national">National (NCSK)</option>
                                <option value="sp-cp">SP/CP</option>
                                <option value="organizational-nodal">
                                    Organizational Nodal
                                </option>
                                <option value="nskfdc">NSKFDC</option>
                                <option value="DGP">DGP</option>
                                <option value="SHG">SHG</option>
                            </select>

                            {/* If SP/CP is chosen, ask for SP or CP specifically */}
                            {role === "sp-cp" && (
                                <div className="mt-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Are you SP or CP?
                                    </label>
                                    <select
                                        className="w-full border border-gray-300/70 rounded-lg px-3 py-2 bg-white/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition"
                                        value={spcpType}
                                        onChange={(e) => setSpcpType(e.target.value)}
                                    >
                                        <option value="">Choose SP or CP</option>
                                        <option value="sp">SP</option>
                                        <option value="cp">CP</option>
                                    </select>
                                </div>
                            )}
                        </div>
                        {error && (
                            <div className="text-red-500 mb-4 text-sm">{error}</div>
                        )}
                        <Button
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-600/50"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </motion.div>
                </motion.div>
            )}

            {/* ---------------- CSS ANIMATIONS ---------------- */}
            <style jsx global>{`
                /* --- NEW --- Animated Aurora Background */
                .bg-gradient-mesh {
                    background-image: radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.15) 0px, transparent 50%),
                                      radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 0.15) 0px, transparent 50%),
                                      radial-gradient(at 52% 99%, hsla(355, 98%, 71%, 0.15) 0px, transparent 50%),
                                      radial-gradient(at 10% 29%, hsla(256, 96%, 68%, 0.15) 0px, transparent 50%),
                                      radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 0.15) 0px, transparent 50%),
                                      radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.15) 0px, transparent 50%),
                                      radial-gradient(at 79% 53%, hsla(343, 68%, 73%, 0.15) 0px, transparent 50%);
                    background-size: 200% 200%;
                }
                
                @keyframes background-pan {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-background-pan {
                    animation: background-pan 30s ease-in-out infinite;
                }

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

                @keyframes glow-pulse {
                  0%,
                  100% {
                    box-shadow: 0 0 15px rgba(168, 85, 247, 0.4),
                      0 0 5px rgba(59, 130, 246, 0.3);
                  }
                  50% {
                    box-shadow: 0 0 30px rgba(168, 85, 247, 0.7),
                      0 0 15px rgba(59, 130, 246, 0.5);
                  }
                }
                .animate-glow-pulse {
                  animation: glow-pulse 3s ease-in-out infinite;
                }

                /* Keyframe for floating logo */
                @keyframes float {
                  0%,
                  100% {
                    transform: translateY(0);
                  }
                  50% {
                    transform: translateY(-8px);
                  }
                }
                .animate-float {
                  animation: float 4s ease-in-out infinite;
                }

                /* Keyframes for color pulsing icons */
                @keyframes pulse-pink {
                  0%,
                  100% {
                    box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
                  }
                  50% {
                    box-shadow: 0 0 35px rgba(236, 72, 153, 0.6);
                  }
                }
                .animate-pulse-pink {
                  animation: pulse-pink 3s ease-in-out infinite;
                }

                @keyframes pulse-red {
                  0%,
                  100% {
                    box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
                  }
                  50% {
                    box-shadow: 0 0 35px rgba(239, 68, 68, 0.6);
                  }
                }
                .animate-pulse-red {
                  animation: pulse-red 3s ease-in-out infinite;
                }

                @keyframes pulse-green {
                  0%,
                  100% {
                    box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
                  }
                  50% {
                    box-shadow: 0 0 35px rgba(34, 197, 94, 0.6);
                  }
                }
                .animate-pulse-green {
                  animation: pulse-green 3s ease-in-out infinite;
                }

                @keyframes pulse-blue {
                  0%,
                  100% {
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
                  }
                  50% {
                    box-shadow: 0 0 35px rgba(59, 130, 246, 0.6);
                  }
                }
                .animate-pulse-blue {
                  animation: pulse-blue 3s ease-in-out infinite;
                }
              `}</style>
        </div>
    );
}