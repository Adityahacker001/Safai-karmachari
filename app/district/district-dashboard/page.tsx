'use client';

import DashboardCard from '@/components/dashboard/dashboard-card';
import { 
  Building, 
  Shield, 
  GraduationCap, 
  DollarSign,
  MapPin,
  Award,
  BarChart3,
  TrendingUp,
  Briefcase,
  Users,
  UserCog,
  Building2,
  HardHat,
  MessageSquareWarning,
  Clock,
  UserCheck
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { contractorTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);
import React from 'react';

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

export default function DistrictDashboard() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <IntegratedLoader />;
  }
  // Mock data for Bar Chart (Attendance Trend)
  const attendanceData = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Attendance %',
        data: [82, 85, 88, 86, 89, 87],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 6,
      },
    ],
  };
  const attendanceOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true, max: 100, ticks: { stepSize: 10 } },
    },
  };

  // Mock data for Pie Chart (Grievance Resolution)
  const grievanceData = {
    labels: ['Resolved', 'Pending', 'Escalated'],
    datasets: [
      {
        data: [92, 28, 15],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)', // green
          'rgba(251, 191, 36, 0.7)', // yellow
          'rgba(239, 68, 68, 0.7)',  // red
        ],
        borderWidth: 1,
      },
    ],
  };
  const grievanceOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
      {/* Enhanced Header */}
      <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
        <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight">
            District Dashboard
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold drop-shadow-lg">
            Comprehensive district-level monitoring and management
          </p>
        </div>
      </header>

      {/* KPI Cards - Updated to use DashboardCard component */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <DashboardCard
          title="Total Nodal Officers"
          value="24"
          icon={Users}
          color="blue"
        />
        <DashboardCard
          title="Total Contractors"
          value="15"
          icon={Building2}
          color="green"
        />
        <DashboardCard
          title="Active Workers"
          value="2,847"
          icon={HardHat}
          color="purple"
        />
        <DashboardCard
          title="Total Grievances"
          value="135"
          icon={MessageSquareWarning}
          color="red"
        />
        <DashboardCard
          title="Attendance %"
          value="87.5%"
          icon={UserCheck}
          color="green"
        />
        <DashboardCard
          title="Total Workers"
          value="3,200"
          icon={HardHat}
          color="purple"
        />
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 my-6 sm:my-8">
        {/* Bar Chart with mock data */}
        <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl p-4 sm:p-6"> 
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Worker Attendance Trend</h3>
          <div className="h-48 sm:h-64 flex items-center justify-center">
            <Bar data={attendanceData} options={attendanceOptions} />
          </div>
        </div>
        {/* Pie Chart with mock data */}
        <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl p-4 sm:p-6"> 
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Grievance Resolution Status</h3>
          <div className="h-48 sm:h-64 flex items-center justify-center">
            <Pie data={grievanceData} options={grievanceOptions} />
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 mt-6">
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl p-4 sm:p-6"> 
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Monthly Tasks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <button className="bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/50 rounded-lg sm:rounded-xl p-4 text-left text-sm w-full transition-all duration-200 hover:shadow-lg"> 
                <BarChart3 className="h-6 w-6 text-blue-600 mb-2" />
                <p className="font-medium text-blue-900">Compliance Summary</p>
                <p className="text-sm text-blue-700">Generate monthly report</p>
              </button>
              <button className="bg-purple-50/80 hover:bg-purple-100/80 border border-purple-200/50 rounded-lg sm:rounded-xl p-4 text-left text-sm w-full transition-all duration-200 hover:shadow-lg"> 
                <Award className="h-6 w-6 text-purple-600 mb-2" />
                <p className="font-medium text-purple-900">Review Recognitions</p>
                <p className="text-sm text-purple-700">Process nominations</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}