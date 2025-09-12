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
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';


export default function NationalDashboard() {
  // Mock data for charts
  const chartData = [
    { state: 'Uttar Pradesh', grievances: 320, pending: 80, escalated: 20 },
    { state: 'Maharashtra', grievances: 280, pending: 60, escalated: 15 },
    { state: 'West Bengal', grievances: 210, pending: 40, escalated: 10 },
    { state: 'Tamil Nadu', grievances: 190, pending: 30, escalated: 8 },
    { state: 'Karnataka', grievances: 170, pending: 25, escalated: 7 },
  ];
  const pieData = [
    { name: 'Resolved', value: 720, color: '#22C55E' },
    { name: 'Pending', value: 235, color: '#F59E0B' },
    { name: 'Escalated', value: 60, color: '#EF4444' },
  ];
  const resolutionData = [
    { state: 'Uttar Pradesh', resolution_time: 3.2 },
    { state: 'Maharashtra', resolution_time: 2.8 },
    { state: 'West Bengal', resolution_time: 3.5 },
    { state: 'Tamil Nadu', resolution_time: 2.9 },
    { state: 'Karnataka', resolution_time: 3.1 },
  ];

  return (
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

      {/* Grievance Analytics (Charts) */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Grievance Analytics</h2>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grievances by State Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-md font-medium text-gray-900 mb-4">Grievances by State</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="grievances" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Resolution Status Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-md font-medium text-gray-900 mb-4">Overall Resolution Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Pending vs Escalated Comparison */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-md font-medium text-gray-900 mb-4">Pending vs Escalated Cases</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
                <Bar dataKey="escalated" fill="#EF4444" name="Escalated" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Average Resolution Time Line Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-md font-medium text-gray-900 mb-4">Average Resolution Time (Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={resolutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="resolution_time"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
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