"use client";

import React, { useState, useEffect, ReactNode } from "react";
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
  Shield,
  Building,
  MapPin,
  Globe,
  UserPlus,
  Clock,
  AlertTriangle,
  GraduationCap,
  DollarSign,
  CheckSquare,
  Award,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  role: "contractor" | "nodal" | "district" | "state" | "national";
}

const roleConfig = {
  contractor: {
    title: "Contractor Dashboard",
    icon: Users,
    color: "text-sky-400",
    bgColor: "from-sky-900/30 to-slate-900",
    dataEntry: [
      {
        name: "Worker Registration",
        icon: UserPlus,
        href: "/contractor/data-entry/worker-registration",
      },
      {
        name: "Attendance & PPE Log",
        icon: Clock,
        href: "/contractor/data-entry/attendance-ppe",
      },
      {
        name: "Grievance Resolution",
        icon: AlertTriangle,
        href: "/contractor/data-entry/grievance-resolution",
      },
      {
        name: "Training Assignment",
        icon: GraduationCap,
        href: "/contractor/data-entry/training-assignment",
      },
      {
         name: "Directive Issuance",
        icon: FileText,
        href: "/contractor/data-entry/directive",
      },
    ],
    reports: [
      {
        name: "Worker Management",
        icon: Users,
        href: "/contractor/reports/worker-management",
      },
      {
        name: "Attendance Reports",
        icon: Clock,
        href: "/contractor/reports/attendance",
      },
      {
        name: "Grievance Tracking",
        icon: AlertTriangle,
        href: "/contractor/reports/grievance-tracking",
      },
      {
        name: "Training Coverage",
        icon: GraduationCap,
        href: "/contractor/reports/training-coverage",
      },
      {
        name: "Safety Compliance",
        icon: Shield,
        href: "/contractor/reports/safety-compliance",
      },
      {
        name: "Audit Logs",
        icon: FileText,
        href: "/contractor/reports/audit-logs",
      },
      {
        name: "User Management",
        icon: Users,
        href: "/contractor/reports/user-management",
      },
      {
        name: "Reports & Analytics",
        icon: BarChart3,
        href: "/contractor/reports/reports",
      },
    ],
  },
  nodal: {
    title: "Nodal Officer Interface",
    icon: Shield,
    color: "text-emerald-400",
    bgColor: "from-emerald-900/30 to-slate-900",
    dataEntry: [
      {
        name: "Compliance Checklist",
        icon: CheckSquare,
        href: "/nodal/data-entry/compliance-checklist",
      },
       {
        name:  "Grievance Management",
        icon: CheckSquare,
        href: "/nodal/data-entry/Grievance",
      },
      {
        name: "Recognition Nomination",
        icon: Award,
        href: "/nodal/data-entry/recognition-nomination",
      },
    ],
    reports: [
      {
        name: "Grievance Overview",
        icon: AlertTriangle,
        href: "/nodal/reports/incident-management",
      },
      {
        name: "Contractor Performance",
        icon: BarChart3,
        href: "/nodal/reports/contractor-performance",
      },
      {
        name: "Performance Reports",
        icon: FileText,
        href: "/nodal/reports/All-reports",
      },
      {
        name: "Compliance Overview",
        icon: CheckSquare,
        href: "/nodal/reports/compliance-overview",
      },
      { name: "Recognition", icon: Award, href: "/nodal/reports/recognition" },
      { name: "Audit Logs", icon: FileText, href: "/nodal/reports/audit-logs" },
      {
        name: "User Management",
        icon: Users,
        href: "/nodal/reports/user-management",
      },
      {
        name: "Reports & Analytics",
        icon: BarChart3,
        href: "/nodal/reports/reports-and-analytics",
      },
    ],
  },
  district: {
    title: "District Monitoring",
    icon: Building,
    color: "text-amber-400",
    bgColor: "from-amber-900/30 to-slate-900",
    dataEntry: [
      {
        name: "Recognition Review",
        icon: Award,
        href: "/district/data-entry/recognition-review",
      },
      {
        name: "Directive Issuance",
        icon: FileText,
        href: "/district/data-entry/directive",
      },
      {
        name: "Grievance Management",
        icon: FileText,
        href: "/district/data-entry/Grievance",
      },
    ],
    reports: [
      {
        name: "District Compliance",
        icon: CheckSquare,
        href: "/district/reports/district-compliance",
      },
      { name: "Grievance", icon: Award, href: "/district/reports/grievance" },
      {
        name: "Recognition System",
        icon: Award,
        href: "/district/reports/recognition-system",
      },
      { name: 'Reports', icon: FileText, href: '/district/reports/reports' },
      {
        name: "Unit Performance",
        icon: Building,
        href: "/district/reports/unit-performance",
      },
      {
        name: "Performance Reports",
        icon: FileText,
        href: "/district/reports/All-reports",
      },
       {
        name: "User Management",
        icon: FileText,
        href: "/district/reports/User-Management",
      },
      { name: "Audit Logs", icon: Award, href: "/district/reports/Audit-logs" },
    ],
  },
  state: {
    title: "State Command Centre",
    icon: MapPin,
    color: "text-purple-400",
    bgColor: "from-purple-900/30 to-slate-900",
    dataEntry: [
      {
        name: "State-wide Compliance",
        icon: CheckSquare,
        href: "/state/data-entry/statewide-compliance",
      },
      
      {
        name: "Policy Implementation",
        icon: FileText,
        href: "/state/data-entry/policy-implementation",
      },
      {
        name: "Directive Issuance",
        icon: FileText,
        href: "/state/data-entry/directive",
      },
      {
        name: "Grievance Management",
        icon: FileText,
        href: "/state/data-entry/Grievance-managment",
      },
    ],
    reports: [
      {
        name: "State Compliance",
        icon: BarChart3,
        href: "/state/reports/state-compliance",
      },
      { name: "Grievance", icon: Award, href: "/state/reports/grievance" },
      {
        name: "Policy Tracking",
        icon: FileText,
        href: "/state/reports/policy-tracking",
      },
      {
        name: "Performance Reports",
        icon: FileText,
        href: "/state/reports/All-reports",
      },
      { name: 'Reports', icon: FileText, href: '/state/reports/reports' },
      {
        name: "District Performance",
        icon: Building,
        href: "/state/reports/district-performance",
      },
      {
        name: "User Management",
        icon: Award,
        href: "/state/reports/User-Management",
      },
      { name: "Audit Logs", icon: Award, href: "/state/reports/Audit-logs" }
    ],
  },
  national: {
    title: "National Dashboard",
    icon: Globe,
    color: "text-indigo-400",
    bgColor: "from-indigo-900/30 to-slate-900",
    dataEntry: [
      {
        name: "Directive Issuance",
        icon: FileText,
        href: "/national/data-entry/directive-issuance",
      },
      {
        name: "Recognition Nomination",
        icon: Award,
        href: "/national/data-entry/national-recognition",
      },
    ],
    reports: [
      {
        name: "National Overview",
        icon: Globe,
        href: "/national/reports/national-overview",
      },
      {
        name: "Directive Tracking",
        icon: FileText,
        href: "/national/reports/directive-tracking",
      },
      { name: "Grievance", icon: Award, href: "/national/reports/grievance" },
      { name: "Reports", icon: FileText, href: "/national/reports/reports" },
      {
        name: "Performance Report",
        icon: FileText,
        href: "/national/reports/Performance-reports",
      },
      {
        name: "Recognition Leaderboard",
        icon: Award,
        href: "/national/reports/recognition-leaderboard",
      },
      { name: "Audit Logs", icon: Award, href: "/national/reports/Audit-logs" },
      {
        name: "User Management",
        icon: Award,
        href: "/national/reports/User-Management",
      },
      {
        name: "Initiate Award",
        icon: Award,
        href: "/national/reports/initiate-award",
      },
    ],
  },
};

export default function Sidebar({ role = "national" }: SidebarProps) {
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  const config = roleConfig[role] || roleConfig.national;
  const RoleIcon = config.icon;
  const [isDataEntryOpen, setIsDataEntryOpen] = useState(true);
  const [isReportsOpen, setIsReportsOpen] = useState(true);

  // Determine header text color: force white for national dashboard
  const headerTextColor = role === "national" ? "text-white" : config.color;

  // Helper component for navigation links to keep the main return clean
  const NavLink = ({
    href,
    icon: Icon,
    children,
    activeClass,
    inactiveClass,
    isDashboard = false,
  }: NavLinkProps) => {
    const isActive = pathname === href;
    const baseClass =
      "flex items-center space-x-3 rounded-lg text-sm font-medium relative group transition-all duration-300";
    const padding = isDashboard ? "px-4 py-3" : "px-4 py-2";

    return (
      <a
        href={href}
        className={cn(
          baseClass,
          padding,
          isActive ? activeClass : inactiveClass
        )}
      >
        {/* The blurry background effect on hover from your original design */}
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-sm transition-all duration-500" />
        <Icon className="h-4 w-4 relative z-10" />
        <span className="relative z-10">{children}</span>
      </a>
    );
  };

  return (
    <div className="fixed top-0 left-0 flex flex-col w-64 h-screen bg-gradient-to-b from-blue-900 to-indigo-950 text-white shadow-2xl border-r border-blue-800 z-50">
      {/* Frosted Glass Overlay */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/5" />

      {/* Header */}
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
          {config.title}
        </h3>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <nav className="p-4 space-y-4">
          <NavLink
            href={`/${role}/${role}-dashboard`}
            icon={BarChart3}
            isDashboard={true}
            activeClass="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl scale-[1.03] border border-indigo-400/50"
            inactiveClass="text-gray-300 hover:text-white hover:scale-[1.02]"
          >
            Dashboard
          </NavLink>

          {role === "nodal" && (
            <NavLink
              href="/nodal/directives"
              icon={FileText}
              activeClass="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-[1.03] border border-cyan-400/50"
              inactiveClass="text-gray-300 hover:text-white hover:scale-[1.02]"
            >
              Directives
            </NavLink>
          )}

          {/* Data Entry Section */}
          <div className="space-y-2">
            <button
              onClick={() => setIsDataEntryOpen(!isDataEntryOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-bold text-gray-200 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
            >
              <span>Data Entry</span>
              {isDataEntryOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {isDataEntryOpen && (
              <div className="space-y-1 pt-1 pl-4">
                {config.dataEntry.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    activeClass="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-[1.03] border border-cyan-400/50"
                    inactiveClass="text-gray-300 hover:text-white hover:scale-[1.02]"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Reports Section */}
          <div className="space-y-2">
            <button
              onClick={() => setIsReportsOpen(!isReportsOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-bold text-gray-200 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
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
                {config.reports.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    activeClass="bg-gradient-to-r from-pink-500 to-red-600 text-white shadow-lg scale-[1.03] border border-pink-400/50"
                    inactiveClass="text-gray-300 hover:text-white hover:scale-[1.02]"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 bg-white/5 relative z-10">
        <a
          href="/"
          className="flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium text-red-400 hover:text-red-200 hover:bg-red-500/10 transition-all relative group"
        >
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-red-500 via-pink-600 to-purple-600 rounded-xl blur-md transition-all duration-500" />
          <LogOut className="h-4 w-4 relative z-10" />
          <span className="relative z-10">Log Out</span>
        </a>
      </div>
    </div>
  );
}
