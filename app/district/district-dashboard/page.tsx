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

export default function DistrictDashboard() {
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
    <div className={cn("p-6 md:p-8 space-y-6 md:space-y-8 min-h-screen", contractorTheme.page.gradientBackground)}>
      {/* KPI Cards - Updated to use DashboardCard component */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          title="Training Completion %"
          value="86.7%"
          icon={GraduationCap}
          color="purple"
        />
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        {/* Bar Chart with mock data */}
        <div className={cn(contractorTheme.card.container, "p-6")}> 
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Worker Attendance Trend</h3>
          <div className="h-64 flex items-center justify-center">
            <Bar data={attendanceData} options={attendanceOptions} />
          </div>
        </div>
        {/* Pie Chart with mock data */}
        <div className={cn(contractorTheme.card.container, "p-6")}> 
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Grievance Resolution Status</h3>
          <div className="h-64 flex items-center justify-center">
            <Pie data={grievanceData} options={grievanceOptions} />
          </div>
        </div>
      </div>

      {/* UPDATED: Layout is now a single column as the chart was removed */}
      <div className="grid grid-cols-1 gap-8 mt-6">
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className={cn(contractorTheme.card.container, "p-6")}> 
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Tasks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className={cn(contractorTheme.button.secondary, "p-4 text-left text-sm w-full")}> 
                <BarChart3 className="h-6 w-6 text-blue-600 mb-2" />
                <p className="font-medium text-blue-900">Compliance Summary</p>
                <p className="text-sm text-blue-700">Generate monthly report</p>
              </button>
              <button className={cn(contractorTheme.button.secondary, "p-4 text-left text-sm w-full")}> 
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