'use client';

import DashboardCard from '@/components/dashboard/dashboard-card';
import { 
  MapPin, 
  AlertTriangle, 
  Shield, 
  GraduationCap,
  DollarSign,
  FileText,
  BarChart3,
  Building,
  Users,
  Briefcase,
  UserCog
} from 'lucide-react';

export default function StateDashboard() {
  // Updated Graph1 with modern curved gradient line chart
  const Graph1 = () => (
    <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-2xl border border-blue-200 shadow-md">
      <span className="text-lg font-bold text-blue-700 mb-2">State Sanitation Trend</span>
      <div className="w-full h-40 flex items-center justify-center relative">
        <svg width="90%" height="100%" viewBox="0 0 300 100">
          <defs>
            {/* Gradient for the line */}
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.2" />
            </linearGradient>
            {/* Shadow effect */}
            <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3b82f6" floodOpacity="0.3"/>
            </filter>
          </defs>
          {/* Area under curve */}
          <path 
            d="M0,80 C40,60 80,65 120,40 C160,30 200,50 240,20 C260,22 280,25 300,22 L300,100 L0,100 Z" 
            fill="url(#lineGradient)" 
          />
          {/* Curved line with shadow */}
          <path 
            d="M0,80 C40,60 80,65 120,40 C160,30 200,50 240,20 C260,22 280,25 300,22" 
            fill="none" 
            stroke="#2563eb" 
            strokeWidth="3.5" 
            filter="url(#shadow)" 
          />
          {/* Data points */}
          <circle cx="40" cy="60" r="4" fill="#2563eb" />
          <circle cx="120" cy="40" r="4" fill="#2563eb" />
          <circle cx="200" cy="50" r="4" fill="#2563eb" />
          <circle cx="280" cy="25" r="4" fill="#2563eb" />
        </svg>
      </div>
      <span className="text-xs text-gray-500">Monthly sanitation performance (mock)</span>
    </div>
  );

  // Updated Graph2 with 3D styled bars and gradient
  const Graph2 = () => (
    <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-green-100 via-green-50 to-white rounded-2xl border border-green-200 shadow-md">
      <span className="text-lg font-bold text-green-700 mb-2">District Incident Comparison</span>
      <div className="w-full h-40 flex items-center justify-center">
        <svg width="90%" height="100%" viewBox="0 0 300 100">
          <defs>
            {/* Gradient for bars */}
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#86efac" stopOpacity="0.7" />
            </linearGradient>
            {/* Drop shadow for bars */}
            <filter id="barShadow" x="-10%" y="-10%" width="150%" height="150%">
              <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#166534" floodOpacity="0.3"/>
            </filter>
          </defs>
          {/* Bars with gradient + shadow */}
          <rect x="20" y="60" width="30" height="30" fill="url(#barGradient)" rx="4" filter="url(#barShadow)" />
          <rect x="70" y="40" width="30" height="50" fill="url(#barGradient)" rx="4" filter="url(#barShadow)" />
          <rect x="120" y="20" width="30" height="70" fill="url(#barGradient)" rx="4" filter="url(#barShadow)" />
          <rect x="170" y="50" width="30" height="40" fill="url(#barGradient)" rx="4" filter="url(#barShadow)" />
          <rect x="220" y="30" width="30" height="60" fill="url(#barGradient)" rx="4" filter="url(#barShadow)" />
        </svg>
      </div>
      <span className="text-xs text-gray-500">Incidents by district (mock)</span>
    </div>
  );

  return (
    // Main container with a full-page gradient background and proper padding
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-100 p-6 md:p-10 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">State-Level Dashboard</h1>
        <p className="text-gray-600 mt-2 text-xl">An overview of all district activities and compliance metrics.</p>
      </div>

      {/* Dashboard Cards - Two Rows, 3 Cards Each */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <DashboardCard
          title="Total Districts"
          value="33"
          change="100% coverage achieved"
          changeType="increase"
          icon={Building}
          color="blue"
          description="Districts monitored"
        />
        <DashboardCard
          title="Total Workers"
          value="1,842"
          icon={Users}
          color="blue"
          description="Enrolled workforce"
        />
        <DashboardCard
          title="Total Contractors"
          value="12"
          icon={Briefcase}
          color="indigo"
          description="Registered agencies"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Nodal Officers"
          value="8"
          icon={UserCog}
          color="indigo"
          description="State-level nodal officers"
        />
        <DashboardCard
          title="Incidents This Month"
          value="28"
          change="-12 from last month"
          changeType="decrease"
          icon={AlertTriangle}
          color="red"
          description="State-wide incidents"
        />
        <DashboardCard
          title="District Performance"
          value="8.6"
          change="Above national average"
          changeType="increase"
          icon={BarChart3}
          color="green"
          description="Average score"
        />
      </div>

      {/* New Graphs Container for State Officer */}
      <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-white/30 flex flex-col gap-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">State Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Graph1 />
          <Graph2 />
        </div>
      </div>

      {/* Quick Actions - Enhanced Button Styling */}
      <div className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-white/30">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">Priority Tasks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <button className="group p-5 bg-white rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left border">
            <div className="p-3 bg-blue-100 rounded-lg inline-block mb-3 transition-colors duration-300 group-hover:bg-blue-500">
                <BarChart3 className="h-7 w-7 text-blue-600 transition-colors duration-300 group-hover:text-white" />
            </div>
            <p className="font-bold text-lg text-gray-800">State Compliance Review</p>
            <p className="text-sm text-gray-600">Quarterly assessment due</p>
          </button>
          <button className="group p-5 bg-white rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left border">
            <div className="p-3 bg-green-100 rounded-lg inline-block mb-3 transition-colors duration-300 group-hover:bg-green-500">
                <Shield className="h-7 w-7 text-green-600 transition-colors duration-300 group-hover:text-white" />
            </div>
            <p className="font-bold text-lg text-gray-800">District Data Audit</p>
            <p className="text-sm text-gray-600">Audit district-level data for accuracy</p>
          </button>
          <button className="group p-5 bg-white rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left border">
            <div className="p-3 bg-purple-100 rounded-lg inline-block mb-3 transition-colors duration-300 group-hover:bg-purple-500">
                <FileText className="h-7 w-7 text-purple-600 transition-colors duration-300 group-hover:text-white" />
            </div>
            <p className="font-bold text-lg text-gray-800">Policy Update</p>
            <p className="text-sm text-gray-600">New guidelines to implement</p>
          </button>
        </div>
      </div>
    </div>
  );
}
