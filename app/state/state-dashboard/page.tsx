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
  return (
    // Main container with a full-page gradient background and proper padding
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-100 p-6 md:p-10 space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">State-Level Dashboard</h1>
        <p className="text-gray-600 mt-2 text-xl">An overview of all district activities and compliance metrics.</p>
      </div>

      {/* Dashboard Cards - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          title="PPE Compliance"
          value="89.7%"
          change="State average improving"
          changeType="increase"
          icon={Shield}
          color="green"
          description="Across all districts"
        />
      </div>

      {/* Secondary Metrics - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Policy Compliance"
          value="92.1%"
          change="+4.3% this quarter"
          changeType="increase"
          icon={FileText}
          color="indigo"
          description="Implementation rate"
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
        <DashboardCard
          title="Coverage Map"
          value="100%"
          change="All zones operational"
          changeType="neutral"
          icon={MapPin}
          color="blue"
          description="Geographic coverage"
        />
      </div>

      {/* Fund Allocation Overview - Enhanced Card Styling */}
      <div className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-white/30">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">Fund Allocation Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-md border border-blue-200">
            <div className="text-4xl font-extrabold text-blue-600">₹60.1Cr</div>
            <div className="text-sm font-medium text-gray-600 mt-1">Total Allocated</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-100 to-white rounded-xl shadow-md border border-green-200">
            <div className="text-4xl font-extrabold text-green-600">₹47.2Cr</div>
            <div className="text-sm font-medium text-gray-600 mt-1">Utilized</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-100 to-white rounded-xl shadow-md border border-orange-200">
            <div className="text-4xl font-extrabold text-orange-600">₹12.9Cr</div>
            <div className="text-sm font-medium text-gray-600 mt-1">Available</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-white rounded-xl shadow-md border border-purple-200">
            <div className="text-4xl font-extrabold text-purple-600">₹8.3Cr</div>
            <div className="text-sm font-medium text-gray-600 mt-1">Pending Release</div>
          </div>
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
                <DollarSign className="h-7 w-7 text-green-600 transition-colors duration-300 group-hover:text-white" />
            </div>
            <p className="font-bold text-lg text-gray-800">Allocate Funds</p>
            <p className="text-sm text-gray-600">5 districts awaiting approval</p>
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
