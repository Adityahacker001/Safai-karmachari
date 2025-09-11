'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';
import DashboardCard from '@/components/dashboard/dashboard-card';
import { 
  Globe, 
  AlertTriangle, 
  BarChart3, 
  FileText,
  Award,
  TrendingUp,
  MapPin,
  Shield
} from 'lucide-react';

export default function NationalDashboard() {
  return (
    // Added a soft light gradient background for visual appeal
  <div className="space-y-8 min-h-screen py-8 bg-gradient-to-br from-blue-100 via-slate-50 to-purple-100">

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-xl shadow-md bg-gradient-to-r from-indigo-200 via-blue-100 to-purple-100 p-1">
          <DashboardCard
            title="State Count"
            value="28"
            icon={MapPin}
            color="indigo"
            description="Total States"
          />
        </div>
        <div className="rounded-xl shadow-md bg-gradient-to-r from-blue-200 via-cyan-100 to-green-100 p-1">
          <DashboardCard
            title="District Count"
            value="806"
            icon={Globe}
            color="blue"
            description="Total Districts"
          />
        </div>
        <div className="rounded-xl shadow-md bg-gradient-to-r from-purple-200 via-indigo-100 to-blue-100 p-1">
          <DashboardCard
            title="Nodal Count"
            value="452"
            icon={Shield}
            color="indigo"
            description="Nodal Officers"
          />
        </div>
        <div className="rounded-xl shadow-md bg-gradient-to-r from-blue-200 via-green-100 to-yellow-100 p-1">
          <DashboardCard
            title="Contractor Count"
            value="12,834"
            icon={FileText}
            color="blue"
            description="Registered Contractors"
          />
        </div>
        <div className="rounded-xl shadow-md bg-gradient-to-r from-orange-200 via-yellow-100 to-pink-100 p-1">
          <DashboardCard
            title="Workers Count"
            value="5.2M"
            icon={TrendingUp}
            color="orange"
            description="Registered Workers"
          />
        </div>
        <div className="rounded-xl shadow-md bg-gradient-to-r from-red-200 via-orange-100 to-yellow-100 p-1">
          <DashboardCard
            title="Nationwide Incident Count"
            value="1,247"
            icon={AlertTriangle}
            color="red"
            description="All states combined"
          />
        </div>
        <div className="rounded-xl shadow-md bg-gradient-to-r from-indigo-200 via-blue-100 to-purple-100 p-1">
          <DashboardCard
            title="States Monitored"
            value="28"
            icon={MapPin}
            color="indigo"
            description="Plus 8 UTs"
          />
        </div>
        <div className="rounded-xl shadow-md bg-gradient-to-r from-purple-200 via-pink-100 to-yellow-100 p-1">
          <DashboardCard
            title="Recognition Programs"
            value="347"
            icon={Award}
            color="purple"
            description="Awards distributed"
          />
        </div>
      </div>

      {/* National Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {/* Changed title to solid black color for visibility */}
        <h3 className="text-lg font-semibold text-gray-900 mb-6">National Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">5.2M</div>
            <div className="text-sm text-gray-600 mt-1">Total Workers</div>
          </div>
          
          <div className="text-center p-4 bg-indigo-50 rounded-lg">
            <div className="text-xl font-bold text-indigo-600">2,847</div>
            <div className="text-sm text-gray-600 mt-1">Districts Covered</div>
          </div>
        </div>
      </div>

      {/* Strategic Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {/* Changed title to solid black color for visibility */}
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Initiatives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left">
            <FileText className="h-6 w-6 text-blue-600 mb-2" />
            <p className="font-medium text-blue-900">Issue New Directive</p>
            <p className="text-sm text-blue-700">Policy implementation nationwide</p>
          </button>
          <button className="p-4 border border-green-200 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
            <BarChart3 className="h-6 w-6 text-green-600 mb-2" />
            <p className="font-medium text-green-900">Annual Report</p>
            <p className="text-sm text-green-700">Compile national data</p>
          </button>
          <button className="p-4 border border-purple-200 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
            <Award className="h-6 w-6 text-purple-600 mb-2" />
            <p className="font-medium text-purple-900">National Recognition</p>
            <p className="text-sm text-purple-700">Review state nominations</p>
          </button>
        </div>
      </div>
     </div>
  );
}