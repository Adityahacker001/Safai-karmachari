'use client';

import React from 'react';
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

function IntegratedLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
      <style jsx>{`
        .loader {
          --c: no-repeat linear-gradient(#4f46e5 0 0);
          background: 
            var(--c),var(--c),var(--c),
            var(--c),var(--c),var(--c),
            var(--c),var(--c),var(--c);
          background-size: 16px 16px;
          animation: 
            l32-1 1s infinite,
            l32-2 1s infinite;
        }
        @keyframes l32-1 {
          0%,100% {width:45px;height: 45px}
          35%,65% {width:65px;height: 65px}
        }
        @keyframes l32-2 {
          0%,40%  {background-position: 0 0,0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,  50% 50% }
          60%,100%{background-position: 0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,0 0,  50% 50% }
        }
      `}</style>
      <div className="loader"></div>
    </div>
  );
}

export default function ContractorDashboard() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <IntegratedLoader />;
  }

  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
      {/* Enhanced Header */}
      <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
        <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight">
            Contractor Overview
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold drop-shadow-lg">
            Monitor and manage your workforce efficiently
          </p>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 my-6 sm:my-8">
        {/* Attendance Trend Graph */}
        <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-0">Attendance Trend</h3>
            <span className="text-xs sm:text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">Last 6 Months</span>
          </div>
          <div className="h-48 sm:h-64 flex items-center justify-center">
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
                  <circle cx={point.x} cy={point.y} r="5" fill="#fff" stroke="#3b82f6" strokeWidth="3" />
                  <circle cx={point.x} cy={point.y} r="2" fill="#3b82f6" />
                </g>
              ))}
            </svg>
          </div>
        </div>
        {/* Grievance Status Graph */}
        <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-0">Grievance Status</h3>
            <span className="text-xs sm:text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">Current Month</span>
          </div>
          <div className="h-48 sm:h-64 flex items-center justify-center">
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
                    <div className="text-sm sm:text-base font-bold text-gray-800">Resolved</div>
                    <div className="text-xs sm:text-sm text-gray-500 font-medium">10 cases (67%)</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 shadow-md"></div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-gray-800">Pending</div>
                    <div className="text-xs sm:text-sm text-gray-500 font-medium">5 cases (33%)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 mt-6">
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Action 1 */}
              <button className="bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/50 rounded-lg sm:rounded-xl p-4 text-left text-sm w-full transition-all duration-200 hover:shadow-lg">
                <Users className="h-6 w-6 text-blue-600 mb-2" />
                <p className="font-medium text-blue-900">Register Worker</p>
                <p className="text-sm text-blue-700">Add new worker to system</p>
              </button>
              {/* Action 2 */}
              <button className="bg-green-50/80 hover:bg-green-100/80 border border-green-200/50 rounded-lg sm:rounded-xl p-4 text-left text-sm w-full transition-all duration-200 hover:shadow-lg">
                <Clock className="h-6 w-6 text-green-600 mb-2" />
                <p className="font-medium text-green-900">Mark Attendance</p>
                <p className="text-sm text-green-700">Record daily attendance</p>
              </button>
              {/* Action 3 */}
              <button className="bg-orange-50/80 hover:bg-orange-100/80 border border-orange-200/50 rounded-lg sm:rounded-xl p-4 text-left text-sm w-full transition-all duration-200 hover:shadow-lg">
                <AlertTriangle className="h-6 w-6 text-orange-600 mb-2" />
                <p className="font-medium text-orange-900">Report Issue</p>
                <p className="text-sm text-orange-700">Log grievance or incident</p>
              </button>
              {/* Action 4 */}
              <button className="bg-purple-50/80 hover:bg-purple-100/80 border border-purple-200/50 rounded-lg sm:rounded-xl p-4 text-left text-sm w-full transition-all duration-200 hover:shadow-lg">
                <Shield className="h-6 w-6 text-purple-600 mb-2" />
                <p className="font-medium text-purple-900">Safety Check</p>
                <p className="text-sm text-purple-700">PPE compliance audit</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}