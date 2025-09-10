'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';
import DashboardCard from '@/components/dashboard/dashboard-card';
import { 
  MapPin, 
  AlertTriangle, 
  Shield, 
  GraduationCap,
  DollarSign,
  FileText,
  BarChart3,
  Building
} from 'lucide-react';

export default function StateDashboard() {
  return (
   <>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <DashboardCard
            title="Training Coverage"
            value="85.2%"
            change="Target: 90% by Dec"
            changeType="neutral"
            icon={GraduationCap}
            color="orange"
            description="State-wide progress"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Budget Utilization"
            value="78.5%"
            change="₹47.2Cr utilized"
            changeType="neutral"
            icon={DollarSign}
            color="purple"
            description="Annual allocation"
          />
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

        {/* Fund Allocation Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Fund Allocation Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">₹60.1Cr</div>
              <div className="text-sm text-gray-600 mt-1">Total Allocated</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">₹47.2Cr</div>
              <div className="text-sm text-gray-600 mt-1">Utilized</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">₹12.9Cr</div>
              <div className="text-sm text-gray-600 mt-1">Available</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">₹8.3Cr</div>
              <div className="text-sm text-gray-600 mt-1">Pending Release</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Tasks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="p-4 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left">
              <BarChart3 className="h-6 w-6 text-blue-600 mb-2" />
              <p className="font-medium text-blue-900">State Compliance Review</p>
              <p className="text-sm text-blue-700">Quarterly assessment due</p>
            </button>
            <button className="p-4 border border-green-200 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
              <DollarSign className="h-6 w-6 text-green-600 mb-2" />
              <p className="font-medium text-green-900">Allocate Funds</p>
              <p className="text-sm text-green-700">5 districts awaiting approval</p>
            </button>
            <button className="p-4 border border-purple-200 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
              <FileText className="h-6 w-6 text-purple-600 mb-2" />
              <p className="font-medium text-purple-900">Policy Update</p>
              <p className="text-sm text-purple-700">New guidelines to implement</p>
            </button>
          </div>
        </div>
      </>
  );
}