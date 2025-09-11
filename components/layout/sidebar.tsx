"use client";

import React, { useState, useEffect } from "react";
// Using standard <a> tags for broader compatibility
// Using window.location.pathname for broader compatibility
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
    title: 'Contractor Dashboard',
    icon: Users,
    color: 'text-sky-400',
    bgColor: 'from-sky-900/30 to-slate-900',
    dataEntry: [
      { name: 'Worker Registration', icon: UserPlus, href: '/contractor/data-entry/worker-registration' },
      { name: 'Attendance & PPE Log', icon: Clock, href: '/contractor/data-entry/attendance-ppe' },
      { name: 'Grievance Resolution', icon: AlertTriangle, href: '/contractor/data-entry/grievance-resolution' },
      { name: 'Training Assignment', icon: GraduationCap, href: '/contractor/data-entry/training-assignment' },
    ],
    reports: [
      { name: 'Worker Management', icon: Users, href: '/contractor/reports/worker-management' },
      { name: 'Attendance Reports', icon: Clock, href: '/contractor/reports/attendance' },
      { name: 'Grievance Tracking', icon: AlertTriangle, href: '/contractor/reports/grievance-tracking' },
      { name: 'Training Coverage', icon: GraduationCap, href: '/contractor/reports/training-coverage' },
      { name: 'Safety Compliance', icon: Shield, href: '/contractor/reports/safety-compliance' },
    ],
  },
  nodal: {
    title: 'Nodal Officer Interface',
    icon: Shield,
    color: 'text-emerald-400',
    bgColor: 'from-emerald-900/30 to-slate-900',
    dataEntry: [
      { name: 'Compliance Checklist', icon: CheckSquare, href: '/nodal/data-entry/compliance-checklist' },
      { name: 'Recognition Nomination', icon: Award, href: '/nodal/data-entry/recognition-nomination' },
    ],
    reports: [
      { name: 'Incident Management', icon: AlertTriangle, href: '/nodal/reports/incident-management' },
      { name: 'Contractor Performance', icon: BarChart3, href: '/nodal/reports/contractor-performance' },
      { name: 'All Reports', icon: FileText, href: '/nodal/reports/All-reports' },
      { name: 'Compliance Overview', icon: CheckSquare, href: '/nodal/reports/compliance-overview' },
    ],
  },
  district: {
    title: 'District Monitoring',
    icon: Building,
    color: 'text-amber-400',
    bgColor: 'from-amber-900/30 to-slate-900',
    dataEntry: [
      { name: 'Recognition Review', icon: Award, href: '/district/data-entry/recognition-review' },
    ],
    reports: [
      { name: 'District Compliance', icon: CheckSquare, href: '/district/reports/district-compliance' },
      { name: 'Recognition System', icon: Award, href: '/district/reports/recognition-system' },
      { name: 'Unit Performance', icon: Building, href: '/district/reports/unit-performance' },
      { name: 'All Reports', icon: FileText, href: '/district/reports/All-reports' },
    ],
  },
  state: {
    title: 'State Command Centre',
    icon: MapPin,
    color: 'text-purple-400',
    bgColor: 'from-purple-900/30 to-slate-900',
    dataEntry: [
      { name: 'State-wide Compliance', icon: CheckSquare, href: '/state/data-entry/statewide-compliance' },
      { name: 'Fund Allocation', icon: DollarSign, href: '/state/data-entry/fund-allocation' },
      { name: 'Policy Implementation', icon: FileText, href: '/state/data-entry/policy-implementation' },
    ],
    reports: [
      { name: 'State Compliance', icon: BarChart3, href: '/state/reports/state-compliance' },
      { name: 'Fund Allocation Reports', icon: DollarSign, href: '/state/reports/fund-allocation' },
      { name: 'Policy Tracking', icon: FileText, href: '/state/reports/policy-tracking' },
      { name: 'All Reports', icon: FileText, href: '/state/reports/All-reports' },
      { name: 'District Performance', icon: Building, href: '/state/reports/district-performance' },
    ],
  },
  national: {
    title: 'National Dashboard',
    icon: Globe,
    color: 'text-indigo-400',
    bgColor: 'from-indigo-900/30 to-slate-900',
    dataEntry: [
      { name: 'Directive Issuance', icon: FileText, href: '/national/data-entry/directive-issuance' },
      { name: 'Recognition Nomination', icon: Award, href: '/national/data-entry/national-recognition' },
    ],
    reports: [
      { name: 'National Overview', icon: Globe, href: '/national/reports/national-overview' },
      { name: 'Directive Tracking', icon: FileText, href: '/national/reports/directive-tracking' },
      { name: 'Annual Reports', icon: FileText, href: '/national/reports/annual-reports' },
      { name: 'All Reports', icon: FileText, href: '/national/reports/All-reports' },
      { name: 'Recognition Leaderboard', icon: Award, href: '/national/reports/recognition-leaderboard' },
      { name: 'Initiate Award', icon: Award, href: '/national/reports/initiate-award' },
    ],
  },
};

export default function Sidebar({ role = "contractor" }: SidebarProps) {
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    // Check if window is defined to prevent SSR errors
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);
  
  // Fallback to contractor config if the role is invalid or not provided
  const config = roleConfig[role] || roleConfig.contractor;
  const RoleIcon = config.icon;
  const [isDataEntryOpen, setIsDataEntryOpen] = useState(true);
  const [isReportsOpen, setIsReportsOpen] = useState(true);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-900 to-indigo-950 text-white shadow-2xl border-r border-blue-800 relative">
      {/* Frosted Glass Overlay */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/5" />

      {/* Header */}
      <div
        className={cn(
          "relative p-4 flex items-center space-x-3 bg-gradient-to-r rounded-br-2xl shadow-lg border-b border-white/10 z-10",
          config.bgColor
        )}
      >
        <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md shadow-md">
          <RoleIcon className={cn("h-6 w-6", config.color)} />
        </div>
        <h3 className={cn("text-md font-bold drop-shadow-lg", config.color)}>
          {config.title}
        </h3>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <nav className="p-4 space-y-6">
          {/* Dashboard Link */}
          <a
            href={`/${role}/${role}-dashboard`}
            className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold relative group transition-all duration-300",
              pathname === `/${role}/${role}-dashboard`
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl scale-[1.03] border border-indigo-400/50"
                : "text-gray-300 hover:text-white hover:scale-[1.02]"
            )}
          >
            {/* Animated Gradient Background on Hover */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-sm transition-all duration-500" />
            <BarChart3 className="h-4 w-4 relative z-10" />
            <span className="relative z-10">Dashboard</span>
          </a>

          {/* Collapsible Section */}
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
              <div className="space-y-2 pl-4">
                {config.dataEntry.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium relative group transition-all duration-300",
                        pathname === item.href
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-[1.03] border border-cyan-400/50"
                          : "text-gray-300 hover:text-white hover:scale-[1.02]"
                      )}
                    >
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-lg blur-sm transition-all duration-500" />
                      <Icon className="h-4 w-4 relative z-10" />
                      <span className="relative z-10">{item.name}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Reports */}
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
              <div className="space-y-2 pl-4">
                {config.reports.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium relative group transition-all duration-300",
                        pathname === item.href
                          ? "bg-gradient-to-r from-pink-500 to-red-600 text-white shadow-lg scale-[1.03] border border-pink-400/50"
                          : "text-gray-300 hover:text-white hover:scale-[1.02]"
                      )}
                    >
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 rounded-lg blur-sm transition-all duration-500" />
                      <Icon className="h-4 w-4 relative z-10" />
                      <span className="relative z-10">{item.name}</span>
                    </a>
                  );
                })}
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

