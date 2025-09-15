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
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <h1 className="text-3xl font-bold text-slate-800">Contractor Overview</h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Attendance Trend</h2>
              <span className="text-sm text-slate-500">Last 6 Months</span>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[240px] p-4">
              <svg width="320" height="180" viewBox="0 0 320 180" className="w-full h-full">
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
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Grievance Status</h2>
              <span className="text-sm text-slate-500">Current Month</span>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[240px]">
              <div className="flex items-center space-x-8">
                <svg width="160" height="160" viewBox="0 0 42 42" className="drop-shadow-lg">
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
                
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm"></div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">Resolved</div>
                      <div className="text-xs text-slate-500">10 cases (67%)</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 shadow-sm"></div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">Pending</div>
                      <div className="text-xs text-slate-500">5 cases (33%)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80">
          <h3 className="text-xl font-semibold text-slate-900 mb-5">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Action 1 */}
            <button className="group text-left p-4 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-3 bg-blue-100 rounded-lg inline-block group-hover:bg-blue-500 transition-colors duration-300">
                <Users className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="font-semibold text-slate-800 mt-3">Register Worker</p>
              <p className="text-sm text-slate-500">Add new worker to system</p>
            </button>
            
            {/* Action 2 */}
            <button className="group text-left p-4 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-3 bg-green-100 rounded-lg inline-block group-hover:bg-green-500 transition-colors duration-300">
                <Clock className="h-6 w-6 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="font-semibold text-slate-800 mt-3">Mark Attendance</p>
              <p className="text-sm text-slate-500">Record daily attendance</p>
            </button>
            
            {/* Action 3 */}
            <button className="group text-left p-4 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-3 bg-orange-100 rounded-lg inline-block group-hover:bg-orange-500 transition-colors duration-300">
                <AlertTriangle className="h-6 w-6 text-orange-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="font-semibold text-slate-800 mt-3">Report Issue</p>
              <p className="text-sm text-slate-500">Log grievance or incident</p>
            </button>
            
            {/* Action 4 */}
            <button className="group text-left p-4 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-3 bg-purple-100 rounded-lg inline-block group-hover:bg-purple-500 transition-colors duration-300">
                <Shield className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="font-semibold text-slate-800 mt-3">Safety Check</p>
              <p className="text-sm text-slate-500">PPE compliance audit</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}