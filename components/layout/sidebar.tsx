"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
// Type for NavLink props
interface NavLinkProps {
  href: string;
  icon: React.ElementType;
  children: ReactNode;
  activeClass: string;
  inactiveClass: string;
  isDashboard?: boolean;
}
import { cn } from "@/lib/utils";
import {
  Users,
  FileText,
  BarChart3,
  Shield,            // Used for SP/CP and DGP icon
  Building,
  MapPin,
  Globe,
  UserPlus,
  Clock,
  AlertTriangle,
  GraduationCap,
  DollarSign,        // Used for NSKFDC icon & reports
  CheckSquare,
  Award,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,              // Added for mobile hamburger menu
  X,                 // Added for close button
  Smartphone,
  FilePenLine,        // Used for Direction Input / Investigation Progress
  MessageSquareWarning,// Used for Grievance Feedback / Grievance Report
  ClipboardList,       // Used for General Feedback / Policy Implementation
  Gavel,               // Used for Direction Input / Compliance
  FileWarning,         // Used for Incident Input / Grievance Report / Unresolved Grievance
  FolderKanban,
  FolderClock,
  Book,                // Used for Annual Report
  UserCircle,
  ClipboardPlus,       // Used for New Work Assignment / New Scheme Entry
  FileSignature,       // Used for Modify Existing Work
  MessageSquareHeart,  // Used for Feedback Input
  MonitorCheck,        // Used for Medical Examination Input
  Search,
  Sparkles,            // Used for Generative AI
  UserCog,
  Banknote,            // Used for Payment Status / Fund Allotment
  ClipboardCheck,      // Used for Directions Compliance Input/Report
  HeartPulse,
  FileDiff,
  MessagesSquare,      // For Grievance Feedback Input (Specific)
  Inbox,               // For General Feedback Input
  Library,             // For Scheme Master
  UserSquare,          // For Individual Beneficiary
  Group,               // For SHG Beneficiary / SHG Icon
  Receipt,             // For Fund Disbursement
  CheckCheck,          // For Direction Compliance Report
  TrendingDown,        // For Low Utilization
  FileX,               // For Rejected Applications
  FileClock,           // For Delayed Compliance / Pending Disbursement
  Map as MapIcon,      // Renamed Map import
  HelpCircle,          // For Help & Support
  Settings,            // For Settings
  Contact,             // For Contact Us
  Target,              // Potentially for District SP/CP Onboarding Report
  ListOrdered,
  // Added/Verified icons for SHG
  Briefcase,           // For My Projects
  FilePlus,            // For New Application
  ListChecks,          // For Schemes & Applications (View Schemes)
  Wallet,              // For My Finances
  Gift,                // For Benefits
  Megaphone,           // For Raise a Voice
  History,             // For Track My Voice
  Upload,              // For Upload Docs (part of Profile/My SHG)
  ListTodo,            // For Monthly Utilization Reports
  AreaChart,           // For Financial Summary Reports
} from "lucide-react";

interface SidebarProps {
  role: "contractor" | "nodal" | "district" | "state" | "national" | "sp-cp" | "organizational-nodal" | "nskfdc" | "dgp" | "shg"; // Added 'shg'
}

// Update the type definition for roleConfig to include 'Exception reports'
interface RoleConfig {
  title: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  dataEntry?: Array<{ name: string; icon: React.ElementType; href: string }>;
  reports?: Array<{ name: string; icon: React.ElementType; href: string }>;
  "Exception reports"?: Array<{ name: string; icon: React.ElementType; href: string }>;

  dashboard: string;
}

const roleConfig: Record<string, RoleConfig> = {
  contractor: {
    title: "Contractor Dashboard",
    icon: Users,
    color: "text-sky-400",
    bgColor: "from-sky-900/30 to-slate-900",
    dataEntry: [ { name: "Worker Registration", icon: UserPlus, href: "/contractor/data-entry/worker-registration" }, { name: "Attendance & PPE Log", icon: Clock, href: "/contractor/data-entry/attendance-ppe" }, { name: "Grievance Resolution", icon: AlertTriangle, href: "/contractor/data-entry/grievance-resolution" }, { name: "Training Assignment", icon: GraduationCap, href: "/contractor/data-entry/training-assignment" }, { name: "Directive Issuance", icon: FileText, href: "/contractor/data-entry/directive" }, ],
    reports: [ { name: "Worker Management", icon: Users, href: "/contractor/reports/worker-management" }, { name: "Attendance Reports", icon: Clock, href: "/contractor/reports/attendance" }, { name: "Grievance Tracking", icon: AlertTriangle, href: "/contractor/reports/grievance-tracking" }, { name: "Training Coverage", icon: GraduationCap, href: "/contractor/reports/training-coverage" }, { name: "Safety Compliance", icon: Shield, href: "/contractor/reports/safety-compliance" }, { name: "Audit Logs", icon: FileText, href: "/contractor/reports/audit-logs" }, { name: "User Management", icon: Users, href: "/contractor/reports/user-management" }, { name: "Reports & Analytics", icon: BarChart3, href: "/contractor/reports/reports" }, ],
    dashboard: "/contractor/contractor-dashboard",
  },
  nodal: {
    title: "Nodal Officer Interface",
    icon: Shield,
    color: "text-emerald-400",
    bgColor: "from-emerald-900/30 to-slate-900",
    dataEntry: [ { name: "Compliance Checklist", icon: CheckSquare, href: "/nodal/data-entry/compliance-checklist" }, { name: "Grievance Management", icon: MessageSquareWarning, href: "/nodal/data-entry/Grievance" }, { name: "Recognition Nomination", icon: Award, href: "/nodal/data-entry/recognition-nomination" }, { name: "Work Certification", icon: CheckSquare, href: "/nodal/data-entry/Work-Certification" }, ],
    reports: [ { name: "Grievance Overview", icon: AlertTriangle, href: "/nodal/reports/incident-management" }, { name: "Financial Tracker", icon: DollarSign, href: "/nodal/reports/financial-tracker" }, { name: "Contractor Performance", icon: BarChart3, href: "/nodal/reports/contractor-performance" }, { name: "Performance Reports", icon: FileText, href: "/nodal/reports/All-reports" }, { name: "Compliance Overview", icon: CheckSquare, href: "/nodal/reports/compliance-overview" }, { name: "Recognition", icon: Award, href: "/nodal/reports/recognition" }, { name: "Audit Logs", icon: FileText, href: "/nodal/reports/audit-logs" }, { name: "User Management", icon: Users, href: "/nodal/reports/user-management" }, { name: "Reports & Analytics", icon: BarChart3, href: "/nodal/reports/reports-and-analytics" }, ],
    dashboard: "/nodal/nodal-dashboard",
  },
  district: {
    title: "District Monitoring",
    icon: Building,
    color: "text-amber-400",
    bgColor: "from-amber-900/30 to-slate-900",
    dataEntry: [ { name: "Recognition Review", icon: Award, href: "/district/data-entry/recognition-review" }, { name: "Directive Issuance", icon: FileText, href: "/district/data-entry/directive" }, { name: "Grievance Management", icon: MessageSquareWarning, href: "/district/data-entry/Grievance" }, ],
    reports: [ { name: "Nodal Compliance", icon: CheckSquare, href: "/district/reports/district-compliance" }, { name: "Grievance", icon: AlertTriangle, href: "/district/reports/grievance" }, { name: "Sewer Death Report", icon: Building, href: "/district/reports/sewer-death" },{ name: "Recognition System", icon: Award, href: "/district/reports/recognition-system" }, { name: 'Reports', icon: FileText, href: '/district/reports/reports' }, { name: "Unit Performance", icon: Building, href: "/district/reports/unit-performance" }, { name: "Performance Reports", icon: FileText, href: "/district/reports/All-reports" }, { name: "User Management", icon: Users, href: "/district/reports/User-Management" }, { name: "Audit Logs", icon: FileText, href: "/district/reports/Audit-logs" }, ],
    dashboard: "/district/district-dashboard",
  },
  state: {
    title: "State Command Centre",
    icon: MapPin,
    color: "text-purple-400",
    bgColor: "from-purple-900/30 to-slate-900",
    dataEntry: [ { name: "State-wide Compliance", icon: CheckSquare, href: "/state/data-entry/statewide-compliance" }, { name: "Policy Implementation", icon: ClipboardList, href: "/state/data-entry/policy-implementation" }, { name: "Directive Issuance", icon: FileText, href: "/state/data-entry/directive" }, { name: "Grievance Management", icon: MessageSquareWarning, href: "/state/data-entry/Grievance-managment" }, ],
    reports: [ { name: "State Compliance", icon: BarChart3, href: "/state/reports/state-compliance" }, { name: "Grievance", icon: AlertTriangle, href: "/state/reports/grievance" }, { name: "Policy Tracking", icon: FileText, href: "/state/reports/policy-tracking" }, { name: "Performance Reports", icon: FileText, href: "/state/reports/All-reports" }, { name: 'Reports', icon: FileText, href: '/state/reports/reports' }, { name: "District Performance", icon: Building, href: "/state/reports/district-performance" }, { name: "User Management", icon: Users, href: "/state/reports/User-Management" }, { name: "Audit Logs", icon: FileText, href: "/state/reports/Audit-logs" }, ],
    dashboard: "/state/state-dashboard",
  },
  national: {
    title: "National Dashboard",
    icon: Globe,
    color: "text-indigo-400",
    bgColor: "from-indigo-900/30 to-slate-900",
    dataEntry: [ { name: "Directive Issuance", icon: FileText, href: "/national/data-entry/directive-issuance" }, { name: "Recognition Nomination", icon: Award, href: "/national/data-entry/national-recognition" }, ],
    reports: [ { name: "National Overview", icon: Globe, href: "/national/reports/national-overview" }, { name: "Directive Tracking", icon: FileText, href: "/national/reports/directive-tracking" }, { name: "Grievance", icon: AlertTriangle, href: "/national/reports/grievance" }, { name: "Reports", icon: FileText, href: "/national/reports/reports" }, { name: "Performance Report", icon: FileText, href: "/national/reports/Performance-reports" }, { name: "Recognition Leaderboard", icon: Award, href: "/national/reports/recognition-leaderboard" }, { name: "Audit Logs", icon: FileText, href: "/national/reports/Audit-logs" }, { name: "User Management", icon: Users, href: "/national/reports/User-Management" }, { name: "Initiate Award", icon: Award, href: "/national/reports/initiate-award" }, ],
    dashboard: "/national/national-dashboard",
  },
  "sp-cp": {
    title: "SP/CP Dashboard",
    icon: Shield,
    color: "text-red-400",
    bgColor: "from-red-900/30 to-slate-900",
    dataEntry: [ { name: "Investigation Progress", icon: FilePenLine, href: "/sp-cp/data-entry/investigation" }, { name: "Grievance Feedback", icon: MessageSquareWarning, href: "/sp-cp/data-entry/grievance" }, { name: "General Feedback", icon: ClipboardList, href: "/sp-cp/data-entry/feedback" }, ],
    reports: [ { name: "Contractors Report", icon: Building, href: "/sp-cp/reports/contractors" }, { name: "Workers Report", icon: Users, href: "/sp-cp/reports/workers" }, { name: "Grievances Report", icon: FileWarning, href: "/sp-cp/reports/grievances" }, { name: "Direction Report", icon: FileText, href: "/sp-cp/reports/directions" },{ name: "Sewer Death Report", icon: Building, href: "/sp-cp/reports/sewer-death" }, { name: "Total Cases Report", icon: FolderKanban, href: "/sp-cp/reports/total-cases" }, { name: "Pending Cases Report", icon: FolderClock, href: "/sp-cp/reports/pending-cases" }, { name: "Compensation Report", icon: DollarSign, href: "/sp-cp/reports/compensation" },],
    dashboard: "/sp-cp/sp-cp-dashboard",
  },
  "organizational-nodal": {
    title: "Organizational Nodal Dashboard",
    icon: Building,
    color: "text-teal-400",
    bgColor: "from-teal-900/30 to-slate-900",
    dataEntry: [ { name: "New Work Assignment", icon: ClipboardPlus, href: "/organizational-nodal/data-entry/new-work" }, { name: "Modify Existing Work", icon: FileSignature, href: "/organizational-nodal/data-entry/modify-work" }, { name: "Grievance Feedback Input", icon: MessageSquareWarning, href: "/organizational-nodal/data-entry/grievance" },  { name: "Incident Input", icon: FileWarning, href: "/organizational-nodal/data-entry/incident" }, { name: "Medical Examination Input", icon: MonitorCheck, href: "/organizational-nodal/data-entry/medical" }, { name: "Training Completion Input", icon: GraduationCap, href: "/organizational-nodal/data-entry/training" }, ],
    reports: [ { name: "Total Workers Report", icon: Users, href: "/organizational-nodal/reports/total-workers" }, { name: "Total Incident Report", icon: FileWarning, href: "/organizational-nodal/reports/incidents" }, { name: "Training Report", icon: GraduationCap, href: "/organizational-nodal/reports/training" }, { name: "Safety Compliance Report", icon: Shield, href: "/organizational-nodal/reports/safety-compliance" }, { name: "Attendance Report", icon: Clock, href: "/organizational-nodal/reports/attendance" }, { name: "Payment Status Report", icon: Banknote, href: "/organizational-nodal/reports/payment-status" }, { name: "Medical Examination Report", icon: HeartPulse, href: "/organizational-nodal/reports/medical-exams" }, { name: "Grievance Report", icon: MessageSquareWarning, href: "/organizational-nodal/reports/grievances" }, { name: "Directions Compliance", icon: ClipboardCheck, href: "/organizational-nodal/reports/directions" }, { name: "Deployment location Report", icon: FileDiff, href: "/organizational-nodal/reports/Deployment-location" }, ],
    dashboard: "/organizational-nodal/organizational-nodal-dashboard",
  },
  "nskfdc": {
    title: "NSKFDC Dashboard",
    icon: DollarSign,
    color: "text-lime-400",
    bgColor: "from-lime-900/30 to-slate-900",
    dataEntry: [ { name: "New Scheme Entry", icon: ClipboardPlus, href: "/nskfdc/data-entry/new-scheme" }, { name: "Fund Allotment Entry", icon: Banknote, href: "/nskfdc/data-entry/fund-allotment" }, { name: "Direction Input", icon: FilePenLine, href: "/nskfdc/data-entry/direction-input" }, { name: "Direction Compliance Input", icon: ClipboardCheck, href: "/nskfdc/data-entry/direction-compliance" }, { name: "Grievance Feedback Input", icon: MessagesSquare, href: "/nskfdc/data-entry/grievance" }, { name: "General Feedback Input", icon: Inbox, href: "/nskfdc/data-entry/feedback" }, ],
    "Exception reports": [{ name: "Rejected Applications Report", icon: FileX, href: "/nskfdc/reports/rejected-applications" }, { name: "Delayed Compliance Report", icon: FileClock, href: "/nskfdc/reports/delayed-compliance" }, { name: "Unresolved Grievance Report", icon: FileWarning, href: "/nskfdc/reports/unresolved-grievances" }, { name: "Low Utilization Districts", icon: TrendingDown, href: "/nskfdc/reports/low-utilization-districts" },],
    reports: [ { name: "Scheme Master Report", icon: Library, href: "/nskfdc/reports/scheme-master" }, { name: "Individual Beneficiary Report", icon: UserSquare, href: "/nskfdc/reports/individual-beneficiary" }, { name: "SHG Beneficiary Report", icon: Group, href: "/nskfdc/reports/shg-beneficiary" },{ name: "Sewer Death Report", icon: Building, href: "/nskfdc/reports/sewer-death" }, { name: "Fund Disbursement Report", icon: Receipt, href: "/nskfdc/reports/fund-disbursement" }, { name: "Direction Compliance Report", icon: CheckCheck, href: "/nskfdc/reports/direction-compliance" }, { name: "Grievance Feedback Report", icon: MessageSquareWarning, href: "/nskfdc/reports/grievance-feedback" }, { name: "General Feedback Report", icon: ClipboardList, href: "/nskfdc/reports/general-feedback" }, { name: "Scheme Utilization Summary", icon: ListOrdered, href: "/nskfdc/reports/scheme-utilization" }, { name: "District-Wise Performance", icon: MapIcon, href: "/nskfdc/reports/district-performance" }, { name: "Annual Report Summary", icon: Book, href: "/nskfdc/reports/annual-summary" }, { name: "Pending Disbursement Report", icon: FileClock, href: "/nskfdc/reports/pending-disbursement" } ],
    dashboard: "/nskfdc/nskfdc-dashboard",
  },
  "dgp": {
    title: "DGP Dashboard",
    icon: Shield,
    color: "text-blue-400",
    bgColor: "from-blue-900/40 to-slate-900",
    dataEntry: [ { name: "Investigation Progress Entry", icon: FilePenLine, href: "/dgp/data-entry/investigation" }, { name: "Grievance Feedback Entry", icon: MessagesSquare, href: "/dgp/data-entry/grievance" }, { name: "General Feedback Entry", icon: Inbox, href: "/dgp/data-entry/feedback" }, { name: "Direction Compliance Entry", icon: ClipboardCheck, href: "/dgp/data-entry/compliance" }, ],
    reports: [ { name: "Total Contractors Report", icon: Building, href: "/dgp/reports/contractors" }, { name: "Total Workers Report", icon: Users, href: "/dgp/reports/workers" }, { name: "Grievances Report", icon: FileWarning, href: "/dgp/reports/grievances" }, { name: "Direction Report", icon: FileText, href: "/dgp/reports/directions" }, { name: "Sewer Death Report", icon: Building, href: "/dgp/reports/sewer-death" },{ name: "Total Cases Report", icon: FolderKanban, href: "/dgp/reports/total-cases" }, { name: "Pending Cases Report", icon: FolderClock, href: "/dgp/reports/pending-cases" }, { name: "Compensation Report", icon: DollarSign, href: "/dgp/reports/compensation" }, { name: "District SP/CP Onboarding", icon: Target, href: "/dgp/reports/onboarding" }, ],
    dashboard: "/dgp/dgp-dashboard",
  },
  // START: Added SHG Configuration
  "shg": {
    title: "SHG Admin Portal", // Title for the Web Portal
    icon: Group, // Icon for SHG
    color: "text-green-400", // Example color
    bgColor: "from-green-900/30 to-slate-900", // Example background
    // Using dataEntry array to list main functional modules for consistency
    dataEntry: [
      { name: "My SHG (Members)", icon: Users, href: "/shg/my-shg" },
      { name: "My Projects", icon: Briefcase, href: "/shg/my-projects" },
      { name: "Schemes & Applications", icon: ListChecks, href: "/shg/schemes-applications" }, // Combines View/New/Track
      { name: "My Finances", icon: Wallet, href: "/shg/my-finances" },
      { name: "Benefits", icon: Gift, href: "/shg/benefits" },
      { name: "Raise a Voice", icon: Megaphone, href: "/shg/raise-voice" },
      { name: "Track My Voice", icon: History, href: "/shg/track-voice" },
    ],
    // Specific reports for SHG Admins
    reports: [
        { name: "Monthly Utilization Report", icon: ListTodo, href: "/shg/reports/utilization" },
        { name: "Financial Summary Report", icon: AreaChart, href: "/shg/reports/financial-summary" },
    ],
    dashboard: "/shg/shg-dashboard", // Dashboard link
  },
  // END: Added SHG Configuration
};

export default function Sidebar({ role = "national" }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const menuButton = document.getElementById('mobile-menu-button');
      
      if (isMobileMenuOpen && sidebar && menuButton) {
        if (!sidebar.contains(event.target as Node) && !menuButton.contains(event.target as Node)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // --- Sidebar scroll position persistence ---
  // Use a ref for the scrollable container
  const scrollableRef = React.useRef<HTMLDivElement>(null);



  // Restore scroll position after navigation
  useEffect(() => {
    const saved = sessionStorage.getItem('sidebarScroll');
    if (scrollableRef.current && saved) {
      scrollableRef.current.scrollTop = Number(saved);
    }
  }, [pathname]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const config = roleConfig[role] || roleConfig.national;
  const RoleIcon = config.icon;
  const [isDataEntryOpen, setIsDataEntryOpen] = useState(true);
  const [isReportsOpen, setIsReportsOpen] = useState(true);
  const [isExceptionReportsOpen, setIsExceptionReportsOpen] = useState(true); // State for Exception Reports

  const searchParams = useSearchParams();
  const spcpQuery = searchParams ? searchParams.get("role") : null;

  const headerTextColor = role === "national" ? "text-white" : config.color;

  let displayTitle = config.title;
  if (role === "sp-cp") {
    if (spcpQuery === "sp") displayTitle = "SP Dashboard";
    else if (spcpQuery === "cp") displayTitle = "CP Dashboard";
    else displayTitle = config.title;
  }

  const NavLink = ({
    href,
    icon: Icon,
    children,
    activeClass,
    inactiveClass,
    isDashboard = false,
  }: NavLinkProps) => {
    // Adjusted isActive logic: exact match for dashboard, startsWith for others
    const isActive = isDashboard
      ? pathname === href || pathname === `/${role}/dashboard`
      : pathname === href || (pathname.startsWith(href) && href !== `/${role}/profile`);
    const baseClass =
      "flex items-center space-x-3 rounded-lg text-sm font-medium relative group transition-all duration-300";
    const padding = isDashboard ? "px-4 py-3" : "px-4 py-2";

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      // Store scroll position before navigation
      if (scrollableRef.current) {
        sessionStorage.setItem('sidebarScroll', String(scrollableRef.current.scrollTop));
      }
      // Close mobile menu before navigation
      setIsMobileMenuOpen(false);
      // Navigate using router
      router.push(href);
    };

    return (
      <button
        onClick={handleClick}
        className={cn(
          baseClass,
          padding,
          isActive ? activeClass : inactiveClass,
          "w-full text-left"
        )}
      >
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-sm transition-all duration-500" />
        <Icon className="h-4 w-4 relative z-10" />
        <span className="relative z-10">{children}</span>
      </button>
    );
  };

  // Update all Exception Reports routes to point to /nskfdc/exception-report/
  if (role === "nskfdc" && config["Exception reports"]) {
    config["Exception reports"] = config["Exception reports"].map((report) => {
      return {
        ...report,
        href: report.href.replace("/nskfdc/reports/", "/nskfdc/exception-report/"),
      };
    });
  }

  // Define which roles should have the Profile link
  const showProfileLink = [
    "organizational-nodal",
    "nskfdc",
    "sp-cp",
    "dgp",
    "shg", // Added SHG Admin profile link
  ].includes(role);

  // Determine if role has Data Entry items
  const hasDataEntry = config.dataEntry && config.dataEntry.length > 0;
  // Determine if role has Report items
  const hasReports = config.reports && config.reports.length > 0;


  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile and tablet */}
      <button
        id="mobile-menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-[60] p-2 bg-blue-900/90 backdrop-blur-md rounded-lg border border-blue-700 lg:hidden shadow-lg hover:bg-blue-800/90 transition-colors duration-200"
        aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Mobile Overlay - Only visible when mobile menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        id="mobile-sidebar"
        className={cn(
          "fixed top-0 left-0 flex flex-col w-64 h-screen bg-gradient-to-b from-blue-900 to-indigo-950 text-white shadow-2xl border-r border-blue-800 z-50 transition-transform duration-300 ease-in-out overflow-hidden",
          // Mobile and tablet: slide in/out from left
          "lg:translate-x-0", // Always visible on desktop
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0" // Slide behavior for mobile/tablet
        )}
      >
        <div className="absolute inset-0 backdrop-blur-xl bg-white/5" />

      <div
        className={cn(
          "relative p-4 flex items-center space-x-3 bg-gradient-to-r shadow-lg border-b border-white/10 z-10",
          config.bgColor
        )}
      >
        <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md shadow-md">
          <RoleIcon className={cn("h-6 w-6", config.color)} />
        </div>
        <h3 className={cn("text-md font-bold drop-shadow-lg", headerTextColor)}>
          {displayTitle}
        </h3>
      </div>

          <NavLink
            href={config.dashboard}
            icon={BarChart3}
            isDashboard={true}
            activeClass="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl scale-[1.03] border border-indigo-400/50"
            inactiveClass="text-white/80 hover:text-white hover:scale-[1.02]"
          >
            Dashboard
          </NavLink>

  <div className="flex-1 overflow-y-auto relative z-10" ref={scrollableRef}>
        <nav className="p-4 space-y-4">
          {/* Conditionally render Profile Link */}
          {showProfileLink && (
            <NavLink
              href={`/${role}/profile`}
              icon={UserCircle}
              activeClass="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-[1.03] border border-cyan-400/50"
              inactiveClass="text-white/80 hover:text-white hover:scale-[1.02]"
            >
              Profile
            </NavLink>
          )}

          {role === "nodal" && (
            <NavLink
              href="/nodal/directives"
              icon={FileText}
              activeClass="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-[1.03] border border-cyan-400/50"
              inactiveClass="text-white/80 hover:text-white hover:scale-[1.02]"
            >
              Directives
            </NavLink>
          )}

          {/* Data Entry Section (Only show if items exist) */}
          {hasDataEntry && (
            <div className="space-y-2">
              <button
                onClick={() => setIsDataEntryOpen(!isDataEntryOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-bold text-white/90 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
              >
                {/* Adjust title for SHG */}
                <span>{role === 'shg' ? 'Manage & Apply' : 'Data Entry'}</span>
                {isDataEntryOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {isDataEntryOpen && (
                <div className="space-y-1 pt-1 pl-4">
                  {config.dataEntry?.map((item) => (
                    <NavLink
                      key={item.href}
                      href={item.href}
                      icon={item.icon}
                      activeClass="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-[1.03] border border-cyan-400/50"
                      inactiveClass="text-white/80 hover:text-white hover:scale-[1.02]"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}


          {/* SHG Management - top-level item for nodal role */}
          {role === "nodal" && (
            <div>
              <NavLink
                href="/nodal/shg-management"
                icon={Users}
                activeClass="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-lg scale-[1.03] border border-emerald-400/50"
                inactiveClass="text-white/80 hover:text-white hover:scale-[1.02]"
              >
                <span className="font-bold">SHG Management</span>
              </NavLink>
            </div>
          )}

          {/* Reports Section (Only show if items exist) */}
          {hasReports && (
            <div className="space-y-2">
              <button
                onClick={() => setIsReportsOpen(!isReportsOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-bold text-white/90 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
              >
                <span>Reports & Analytics</span>
                {isReportsOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {isReportsOpen && (
                <div className="space-y-1 pt-1 pl-4">
                  {config.reports?.map((item) => (
                    <NavLink
                      key={item.href}
                      href={item.href}
                      icon={item.icon}
                      activeClass="bg-gradient-to-r from-pink-500 to-red-600 text-white shadow-lg scale-[1.03] border border-pink-400/50"
                      inactiveClass="text-white/80 hover:text-white hover:scale-[1.02]"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Add Exception Reports section for NSKFDC role */}
          {role === "nskfdc" && config["Exception reports"] && (
            <div key="exception-reports" className="space-y-2">
              <button
                onClick={() => setIsExceptionReportsOpen(!isExceptionReportsOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-bold text-white/90 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
              >
                <span>Exception Reports</span>
                {isExceptionReportsOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {isExceptionReportsOpen && (
                <div className="space-y-1 pt-1 pl-4">
                  {config["Exception reports"].map((item) => (
                    <NavLink
                      key={item.href}
                      href={item.href}
                      icon={item.icon}
                      activeClass="bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg scale-[1.03] border border-yellow-400/50"
                      inactiveClass="text-white/80 hover:text-white hover:scale-[1.02]"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 bg-white/5 relative z-10 space-y-1">
        <NavLink href={`/${role}/contact-us`} icon={Contact} activeClass="" inactiveClass="text-white/60 hover:text-white text-xs">Contact Us</NavLink>
        <NavLink href={`/${role}/help-support`} icon={HelpCircle} activeClass="" inactiveClass="text-white/60 hover:text-white text-xs">Help & Support</NavLink>
        <NavLink href={`/${role}/settings`} icon={Settings} activeClass="" inactiveClass="text-white/60 hover:text-white text-xs">Settings</NavLink>

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            router.push("/");
          }}
          className="w-full text-left flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium text-red-400 hover:text-red-200 hover:bg-red-500/10 transition-all relative group mt-2"
        >
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-red-500 via-pink-600 to-purple-600 rounded-xl blur-md transition-all duration-500" />
          <LogOut className="h-4 w-4 relative z-10" />
          <span className="relative z-10">Log Out</span>
        </button>
      </div>
      </div>
    </>
  );
}