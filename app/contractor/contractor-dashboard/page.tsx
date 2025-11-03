'use client';

import { 
  Users, 
  UserCheck, 
  AlertTriangle, 
  Shield, 
  Clock,
  TrendingUp,
  MapPin,
  Activity,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import DashboardCard from '@/components/dashboard/dashboard-card';

// A helper component for the change indicator badge on cards
type ChangeIndicatorProps = {
  type: 'increase' | 'decrease' | 'neutral';
  text: string;
};

const ChangeIndicator = ({ type, text }: ChangeIndicatorProps) => {
  const baseClasses = "flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium";
  
  if (type === 'increase') {
    return (
      <div className={`${baseClasses} bg-white/20 text-green-50`}>
        <ArrowUp className="h-3 w-3" />
        <span>{text}</span>
      </div>
    );
  }
  if (type === 'decrease') {
    return (
      <div className={`${baseClasses} bg-white/20 text-red-50`}>
        <ArrowDown className="h-3 w-3" />
        <span>{text}</span>
      </div>
    );
  }
  return (
    <div className={`${baseClasses} bg-white/20 text-gray-50`}>
      <Minus className="h-3 w-3" />
      <span>{text}</span>
    </div>
  );
};


export default function ContractorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 space-y-6 sm:space-y-8">
        
        {/* Header Section */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            Contractor Overview
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Monitor and manage your workforce efficiently
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <DashboardCard
            title="Total Workers"
            value="60"
            icon={Users}
            color="blue"
          />
          <DashboardCard
            title="Today's Attendance"
            value="48/60 (80%)"
            change="12 not checked in"
            icon={UserCheck}
            color="green"
          />
          <DashboardCard
            title="Grievances Assigned"
            value="15"
            change="10 Resolved | 5 Pending"
            icon={AlertTriangle}
            color="red"
          />
          <DashboardCard
            title="PPE Coverage"
            value="70%"
            change="42 of 60 workers"
            icon={Shield}
            color="orange"
          />
          <DashboardCard
            title="Training Completion"
            value="60%"
            change="36 of 60 workers"
            icon={Activity}
            color="purple"
          />
          <DashboardCard
            title="Scheme Enrolment"
            value="55%"
            change="33 of 60 workers"
            icon={MapPin}
            color="indigo"
          />
        </div>

        {/* Graphs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Trend Graph */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-4 sm:p-6 flex flex-col hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 sm:mb-0">Attendance Trend</h2>
              <span className="text-xs sm:text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">Last 6 Months</span>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] p-2 sm:p-4">
              <svg width="320" height="180" viewBox="0 0 320 180" className="w-full h-full max-w-md mx-auto sm:max-w-none drop-shadow-sm">
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="1"/>
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                
                {/* Grid lines */}
                <g stroke="#e2e8f0" strokeWidth="1" opacity="0.5">
                  <line x1="40" y1="20" x2="280" y2="20"/>
                  <line x1="40" y1="50" x2="280" y2="50"/>
                  <line x1="40" y1="80" x2="280" y2="80"/>
                  <line x1="40" y1="110" x2="280" y2="110"/>
                  <line x1="40" y1="140" x2="280" y2="140"/>
                </g>
                
                {/* Y-axis labels */}
                <g fill="#64748b" fontSize="11" textAnchor="end">
                  <text x="35" y="25">100%</text>
                  <text x="35" y="55">80%</text>
                  <text x="35" y="85">60%</text>
                  <text x="35" y="115">40%</text>
                  <text x="35" y="145">20%</text>
                </g>
                
                {/* Area under curve */}
                <path
                  d="M 60,120 L 100,100 L 140,80 L 180,90 L 220,70 L 260,60 L 260,140 L 60,140 Z"
                  fill="url(#areaGradient)"
                />
                
                {/* Main line */}
                <polyline
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="60,120 100,100 140,80 180,90 220,70 260,60"
                />
                
                {/* Data points */}
                {[{x:60,y:120,val:"75%"},{x:100,y:100,val:"80%"},{x:140,y:80,val:"85%"},{x:180,y:90,val:"82%"},{x:220,y:70,val:"88%"},{x:260,y:60,val:"92%"}].map((point, i) => (
                  <g key={i}>
                    <circle cx={point.x} cy={point.y} r="5" fill="#fff" stroke="#3b82f6" strokeWidth="3"/>
                    <circle cx={point.x} cy={point.y} r="2" fill="#3b82f6"/>
                  </g>
                ))}
                
                {/* X-axis labels */}
                <g fill="#64748b" fontSize="11" textAnchor="middle">
                  <text x="60" y="165">Apr</text>
                  <text x="100" y="165">May</text>
                  <text x="140" y="165">Jun</text>
                  <text x="180" y="165">Jul</text>
                  <text x="220" y="165">Aug</text>
                  <text x="260" y="165">Sep</text>
                </g>
              </svg>
            </div>
          </div>
          
          {/* Grievance Status Graph */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-4 sm:p-6 flex flex-col hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 sm:mb-0">Grievance Status</h2>
              <span className="text-xs sm:text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">Current Month</span>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
              <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6 lg:space-x-8">
                <svg width="120" height="120" viewBox="0 0 42 42" className="drop-shadow-lg sm:w-32 sm:h-32 lg:w-40 lg:h-40">
                  <defs>
                    <linearGradient id="resolvedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981"/>
                      <stop offset="100%" stopColor="#059669"/>
                    </linearGradient>
                    <linearGradient id="pendingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b"/>
                      <stop offset="100%" stopColor="#d97706"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Background circle */}
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="3"/>
                  
                  {/* Resolved segment (67%) */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="url(#resolvedGradient)"
                    strokeWidth="3"
                    strokeDasharray="67 33"
                    strokeDashoffset="25"
                    transform="rotate(-90 21 21)"
                  />
                  
                  {/* Pending segment (33%) */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="url(#pendingGradient)"
                    strokeWidth="3"
                    strokeDasharray="33 67"
                    strokeDashoffset="-42"
                    transform="rotate(-90 21 21)"
                  />
                  
                  {/* Center circle */}
                  <circle cx="21" cy="21" r="8" fill="#fff" className="drop-shadow-sm"/>
                  
                  {/* Center text */}
                  <text x="21" y="18" textAnchor="middle" fontSize="5" fill="#374151" fontWeight="600">15</text>
                  <text x="21" y="25" textAnchor="middle" fontSize="3.5" fill="#6b7280">Total</text>
                </svg>
                
                <div className="flex flex-col space-y-4 sm:space-y-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md"></div>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-slate-800">Resolved</div>
                      <div className="text-xs sm:text-sm text-slate-500 font-medium">10 cases (67%)</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 shadow-md"></div>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-slate-800">Pending</div>
                      <div className="text-xs sm:text-sm text-slate-500 font-medium">5 cases (33%)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl border border-slate-200/60 hover:shadow-3xl transition-all duration-500">
          <div className="text-center sm:text-left mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Quick Actions</h3>
            <p className="text-sm sm:text-base text-slate-600">Streamline your daily operations</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Action 1 */}
            <button className="group text-left p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 hover:from-white hover:to-blue-50 rounded-2xl border border-slate-200/80 hover:border-blue-400/60 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 active:scale-95">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl inline-block group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <Users className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="font-bold text-slate-800 mt-3 sm:mt-4 text-sm sm:text-base">Register Worker</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Add new worker to system</p>
            </button>
            
            {/* Action 2 */}
            <button className="group text-left p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-slate-50 to-green-50/30 hover:from-white hover:to-green-50 rounded-2xl border border-slate-200/80 hover:border-green-400/60 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 active:scale-95">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-xl inline-block group-hover:from-green-500 group-hover:to-green-600 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <Clock className="h-6 w-6 sm:h-7 sm:w-7 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="font-bold text-slate-800 mt-3 sm:mt-4 text-sm sm:text-base">Mark Attendance</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Record daily attendance</p>
            </button>
            
            {/* Action 3 */}
            <button className="group text-left p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-slate-50 to-orange-50/30 hover:from-white hover:to-orange-50 rounded-2xl border border-slate-200/80 hover:border-orange-400/60 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 active:scale-95">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl inline-block group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <AlertTriangle className="h-6 w-6 sm:h-7 sm:w-7 text-orange-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="font-bold text-slate-800 mt-3 sm:mt-4 text-sm sm:text-base">Report Issue</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Log grievance or incident</p>
            </button>
            
            {/* Action 4 */}
            <button className="group text-left p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-slate-50 to-purple-50/30 hover:from-white hover:to-purple-50 rounded-2xl border border-slate-200/80 hover:border-purple-400/60 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 active:scale-95">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl inline-block group-hover:from-purple-500 group-hover:to-purple-600 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="font-bold text-slate-800 mt-3 sm:mt-4 text-sm sm:text-base">Safety Check</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">PPE compliance audit</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}