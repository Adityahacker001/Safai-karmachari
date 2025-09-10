'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Shield, 
  Building, 
  MapPin, 
  Globe,
  ClipboardList,
  UserPlus,
  Clock,
  AlertTriangle,
  GraduationCap,
  DollarSign,
  CheckSquare,
  Award,
  PieChart,
  Briefcase,
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  ChevronRight,
  FilePlus,
} from 'lucide-react';

interface SidebarProps {
  role: 'contractor' | 'nodal' | 'district' | 'state' | 'national';
}

const roleConfig = {
  contractor: {
    title: 'Contractor Dashboard',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
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
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    dataEntry: [
      { name: 'Compliance Checklist', icon: CheckSquare, href: '/nodal/data-entry/compliance-checklist' },
      { name: 'Recognition Nomination', icon: Award, href: '/nodal/data-entry/recognition-nomination' },
    ],
    reports: [
      { name: 'Incident Management', icon: AlertTriangle, href: '/nodal/reports/incident-management' },
      { name: 'Contractor Performance', icon: BarChart3, href: '/nodal/reports/contractor-performance' },
      { name: 'Compliance Overview', icon: CheckSquare, href: '/nodal/reports/compliance-overview' },
    ],
  },
  district: {
    title: 'District Monitoring System',
    icon: Building,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    dataEntry: [
      { name: 'Budget Utilization', icon: DollarSign, href: '/district/data-entry/budget-utilization' },
      { name: 'Recognition Review', icon: Award, href: '/district/data-entry/recognition-review' },
    ],
    reports: [
      { name: 'District Compliance', icon: CheckSquare, href: '/district/reports/district-compliance' },
      { name: 'Budget Reports', icon: DollarSign, href: '/district/reports/budget-reports' },
      { name: 'Recognition System', icon: Award, href: '/district/reports/recognition-system' },
      { name: 'Unit Performance', icon: Building, href: '/district/reports/unit-performance' },
    ],
  },
  state: {
    title: 'State Command Centre',
    icon: MapPin,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    dataEntry: [
      { name: 'State-wide Compliance', icon: CheckSquare, href: '/state/data-entry/statewide-compliance' },
      { name: 'Fund Allocation', icon: DollarSign, href: '/state/data-entry/fund-allocation' },
      { name: 'Policy Implementation', icon: FileText, href: '/state/data-entry/policy-implementation' },
    ],
    reports: [
      { name: 'State Compliance', icon: BarChart3, href: '/state/reports/state-compliance' },
      { name: 'Fund Allocation Reports', icon: DollarSign, href: '/state/reports/fund-allocation' },
      { name: 'Policy Tracking', icon: FileText, href: '/state/reports/policy-tracking' },
      { name: 'District Performance', icon: Building, href: '/state/reports/district-performance' },
    ],
  },
  national: {
    title: 'National Dashboard (NCSK)',
    icon: Globe,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    customLinks: [
      { name: 'Manual Scavenging Alerts', icon: AlertTriangle, href: '/national/manual-scavenging-alerts' },
      { name: 'State and District Oversight', icon: Building, href: '/national/state-district-oversight' },
    ],
    dataEntry: [
      { name: 'Directive Issuance', icon: FileText, href: '/national/data-entry/directive-issuance' },
      { name: 'Recognition Nomination', icon: Award, href: '/national/data-entry/national-recognition' },
    ],
    reports: [
      { name: 'National Overview', icon: Globe, href: '/national/reports/national-overview' },
      { name: 'Directive Tracking', icon: FileText, href: '/national/reports/directive-tracking' },
      { name: 'Annual Reports', icon: FileText, href: '/national/reports/annual-reports' },
      { name: 'Recognition Leaderboard', icon: Award, href: '/national/reports/recognition-leaderboard' },
      { name: 'Initiate Award', icon: Award, href: '/national/reports/initiate-award' },
    ],
  }
};

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const config = roleConfig[role];
  const RoleIcon = config.icon;
  const [isDataEntryOpen, setIsDataEntryOpen] = useState(true);
  const [isReportsOpen, setIsReportsOpen] = useState(true);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white border-r border-gray-200">
      {/* Role-specific Header */}
      <div className={cn("p-4 flex items-center space-x-3 border-b border-gray-200", config.bgColor)}>
        <RoleIcon className={cn("h-6 w-6", config.color)} />
        <h3 className={cn("text-md font-semibold", config.color)}>
          {config.title}
        </h3>
      </div>

      

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-6">
          {/* Dashboard */}
          <Link
            href={`/${role}/${role}-dashboard`}
            className={cn(
              "flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              pathname === `/${role}/${role}-dashboard`
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          {/* Custom Links for National Role */}
          {role === 'national' && 'customLinks' in config && config.customLinks && (
            <div className="space-y-2">
              {config.customLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      pathname === item.href
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Data Entry Section */}
          <div className="space-y-2">
            <button
              onClick={() => setIsDataEntryOpen(!isDataEntryOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold text-gray-600"
            >
              <span>Data Entry</span>
              {isDataEntryOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {isDataEntryOpen && (
              <div className="space-y-1 pl-4">
                {config.dataEntry.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        pathname === item.href
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Reports Section */}
          <div className="space-y-2">
            <button
              onClick={() => setIsReportsOpen(!isReportsOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold text-gray-600"
            >
              <span>Reports & Analytics</span>
              {isReportsOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {isReportsOpen && (
              <div className="space-y-1 pl-4">
                {config.reports.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        pathname === item.href
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="space-y-2">
         
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </Link>
        </div>
      </div>
    </div>
  );
}