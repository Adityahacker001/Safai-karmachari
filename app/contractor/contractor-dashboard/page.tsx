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

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Card 0: Top 5 Workers */}
          <div className="relative p-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-pink-700 text-white shadow-xl col-span-1 min-h-[170px]">
            <div className="flex flex-col items-center justify-center w-full py-6">
              <div className="bg-white/20 rounded-full p-5 mb-3 shadow-lg flex items-center justify-center">
                <Users className="h-10 w-10 text-white drop-shadow-lg" />
              </div>
              <p className="font-extrabold text-xl tracking-tight text-white text-center drop-shadow-sm">Top 5 Workers</p>
              <span className="mt-2 text-xs text-pink-200 font-medium text-center">Based on performance & attendance</span>
            </div>
          </div>

          {/* Card 1: Total Workers */}
          <div className="relative p-6 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg">
            <Users className="absolute -right-6 -bottom-6 h-28 w-28 text-white/10" strokeWidth={1} />
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Users className="h-6 w-6" />
              </div>
              <p className="font-semibold text-blue-100">Total Workers</p>
            </div>
            <p className="mt-4 text-4xl font-bold tracking-tight">1,247</p>
            <div className="mt-2">
              <ChangeIndicator type="increase" text="+12 from last month" />
            </div>
          </div>

          {/* Card 2: Active Today */}
          <div className="relative p-6 overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg">
            <UserCheck className="absolute -right-6 -bottom-6 h-28 w-28 text-white/10" strokeWidth={1} />
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <UserCheck className="h-6 w-6" />
              </div>
              <p className="font-semibold text-green-100">Active Today</p>
            </div>
            <p className="mt-4 text-4xl font-bold tracking-tight">1,156</p>
            <div className="mt-2">
              <ChangeIndicator type="increase" text="92.7% attendance" />
            </div>
          </div>
          
          {/* Card 3: Grievances Pending */}
          <div className="relative p-6 overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-white shadow-lg">
            <AlertTriangle className="absolute -right-6 -bottom-6 h-28 w-28 text-white/10" strokeWidth={1} />
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <p className="font-semibold text-orange-100">Grievances Pending</p>
            </div>
            <p className="mt-4 text-4xl font-bold tracking-tight">23</p>
            <div className="mt-2">
              <ChangeIndicator type="decrease" text="-5 from yesterday" />
            </div>
          </div>

          {/* Card 4: Safety Compliance */}
          <div className="relative p-6 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg">
            <Shield className="absolute -right-6 -bottom-6 h-28 w-28 text-white/10" strokeWidth={1} />
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Shield className="h-6 w-6" />
              </div>
              <p className="font-semibold text-purple-100">Safety Compliance</p>
            </div>
            <p className="mt-4 text-4xl font-bold tracking-tight">94.2%</p>
            <div className="mt-2">
              <ChangeIndicator type="increase" text="+2.1% this week" />
            </div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 5: Zone Coverage */}
          <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200/80">
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-600">Zone Coverage</p>
              <MapPin className="h-6 w-6 text-indigo-500" />
            </div>
            <p className="mt-2 text-3xl font-bold text-slate-900">12</p>
            <p className="text-sm text-slate-500 mt-1">All zones active</p>
          </div>

          {/* Card 6: Training Progress */}
          <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200/80">
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-600">Training Progress</p>
              <Activity className="h-6 w-6 text-green-500" />
            </div>
            <p className="mt-2 text-3xl font-bold text-slate-900">87%</p>
            <p className="text-sm text-slate-500 mt-1">Target: 90%</p>
          </div>

          {/* Card 7: Monthly Hours */}
          <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200/80">
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-600">Monthly Hours</p>
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <p className="mt-2 text-3xl font-bold text-slate-900">28,456</p>
            <p className="text-sm text-green-600 mt-1">+8.5% vs target</p>
          </div>

          {/* Card 8: Efficiency Score */}
          <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200/80">
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-600">Efficiency Score</p>
              <TrendingUp className="h-6 w-6 text-purple-500" />
            </div>
            <p className="mt-2 text-3xl font-bold text-slate-900">8.7 <span className="text-xl text-slate-400 font-normal">/ 10</span></p>
            <p className="text-sm text-slate-500 mt-1">Above average</p>
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