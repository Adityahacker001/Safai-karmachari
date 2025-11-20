'use client';
import { useState, useEffect } from 'react';


import DashboardLayout from '@/components/layout/dashboard-layout';
import {
  Public as Globe,
  WarningAmber as AlertTriangle,
  BarChart as BarChart3,
  Description as FileText,
  EmojiEvents as Award,
  TrendingUp,
  Place as MapPin,
  Security as Shield,
} from "@mui/icons-material";
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
import { ReactNode } from 'react';
import DashboardCard from '@/components/dashboard/dashboard-card';


// --- KPI Card Component (copied from grievance page) ---
interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: 'yellow' | 'blue' | 'purple' | 'green';
}
const KPICard = ({ title, value, icon: Icon, color }: KPICardProps) => {
  const colorSchemes: Record<KPICardProps['color'], string> = {
    yellow: 'bg-gradient-to-br from-amber-400 to-orange-500',
    blue: 'bg-gradient-to-br from-sky-400 to-blue-600',
    purple: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    green: 'bg-gradient-to-br from-emerald-400 to-green-500',
  };
  const scheme = colorSchemes[color] || colorSchemes.blue;
  return (
    <div className={`relative ${scheme} p-6 rounded-2xl shadow-lg text-white overflow-hidden transition-transform transform hover:-translate-y-1 duration-300`}>
      <Icon className="absolute -right-5 -bottom-5 h-28 w-28 text-white/20 transform" />
      <div className="relative">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-5xl font-bold mt-2">{value}</p>
      </div>
    </div>
  );
};


export default function NationalDashboard() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(timer);
    }, []);

    if (loading) {
      const IntegratedLoader = require('@/components/layout/IntegratedLoader').default;
      return <IntegratedLoader />;
    }
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

  // Dashboard KPI data
  const kpiData = [
    { title: "State Count", value: "28", icon: MapPin, color: "blue" },
    { title: "District Count", value: "806", icon: Globe, color: "green" },
    { title: "Nodal Count", value: "452", icon: Shield, color: "purple" },
    { title: "Contractor Count", value: "12,834", icon: FileText, color: "yellow" },
    { title: "Workers Count", value: "5.2M", icon: TrendingUp, color: "blue" },
    { title: "Nationwide Incident Count", value: "1,247", icon: AlertTriangle, color: "purple" },
  ];

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8">
      {/* Professional Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white drop-shadow-2xl leading-tight">
              National Dashboard
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-bold drop-shadow-lg mt-2">
              Comprehensive oversight of nationwide sanitation initiatives
            </p>
          </div>
         
        </div>
      </header>

      {/* Enhanced Dashboard Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        <DashboardCard
          title="States Monitored"
          value="28"
          icon={MapPin}
          color="indigo"
          description="Plus 8 UTs"
        />
        <DashboardCard
          title="District Count"
          value="806"
          icon={Globe}
          color="blue"
          description="Total Districts"
        />
        <DashboardCard
          title="Nodal Count"
          value="452"
          icon={Shield}
          color="indigo"
          description="Nodal Officers"
        />
        <DashboardCard
          title="Contractor Count"
          value="12,834"
          icon={FileText}
          color="blue"
          description="Registered Contractors"
        />
        <DashboardCard
          title="Workers Count"
          value="5.2M"
          icon={TrendingUp}
          color="orange"
          description="Registered Workers"
        />
        <DashboardCard
          title="Nationwide Incident Count"
          value="1,247"
          icon={AlertTriangle}
          color="red"
          description="All states combined"
        />
        <DashboardCard
          title="Recognition Programs"
          value="347"
          icon={Award}
          color="purple"
          description="Awards distributed"
        />
        <DashboardCard
          title="Active Grievances"
          value="1,573"
          icon={AlertTriangle}
          color="blue"
          description="Nationwide pending"
        />
      </div>

      {/* Professional Grievance Analytics Section */}
      <div className="space-y-4 sm:space-y-6">
        <div className="backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-2">Grievance Analytics</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 font-semibold">Comprehensive nationwide grievance monitoring</p>
        </div>

        {/* Enhanced Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Professional Grievances by State Chart */}
          <div className="backdrop-blur-xl bg-white/60 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Grievances by State</h3>
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

          {/* Professional Resolution Status Chart */}
          <div className="backdrop-blur-xl bg-white/60 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Overall Resolution Status</h3>
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

          {/* Professional Pending vs Escalated Chart */}
          <div className="backdrop-blur-xl bg-white/60 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Pending vs Escalated Cases</h3>
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

          {/* Professional Resolution Time Chart */}
          <div className="backdrop-blur-xl bg-white/60 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Average Resolution Time (Days)</h3>
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

      {/* Professional Strategic Actions Section */}
      <div className="backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
        <div className="mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-2">Strategic Initiatives</h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 font-semibold">National policy implementation and oversight</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <button className="p-4 sm:p-6 border-2 border-blue-300/50 bg-gradient-to-br from-blue-50/80 to-blue-100/60 backdrop-blur-sm rounded-2xl hover:from-blue-100/90 hover:to-blue-200/70 hover:border-blue-400/60 hover:shadow-xl transition-all duration-300 text-left transform hover:scale-105">
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-3" />
            <p className="font-black text-base sm:text-lg text-blue-900 mb-2">Issue New Directive</p>
            <p className="text-sm sm:text-base text-blue-700 font-semibold">Policy implementation nationwide</p>
          </button>
          <button className="p-4 sm:p-6 border-2 border-green-300/50 bg-gradient-to-br from-green-50/80 to-green-100/60 backdrop-blur-sm rounded-2xl hover:from-green-100/90 hover:to-green-200/70 hover:border-green-400/60 hover:shadow-xl transition-all duration-300 text-left transform hover:scale-105">
            <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-3" />
            <p className="font-black text-base sm:text-lg text-green-900 mb-2">Annual Report</p>
            <p className="text-sm sm:text-base text-green-700 font-semibold">Compile national data</p>
          </button>
          <button className="p-4 sm:p-6 border-2 border-purple-300/50 bg-gradient-to-br from-purple-50/80 to-purple-100/60 backdrop-blur-sm rounded-2xl hover:from-purple-100/90 hover:to-purple-200/70 hover:border-purple-400/60 hover:shadow-xl transition-all duration-300 text-left transform hover:scale-105">
            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mb-3" />
            <p className="font-black text-base sm:text-lg text-purple-900 mb-2">National Recognition</p>
            <p className="text-sm sm:text-base text-purple-700 font-semibold">Review state nominations</p>
          </button>
        </div>
      </div>
     </div>
  );
}