'use client';

import { contractorTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/layout/dashboard-layout';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Award,
  FileSearch,
  Building,
  BarChart3,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ChartConfig } from '@/components/ui/chart';

const barChartData = [
  { month: 'January', resolved: 186, pending: 80 },
  { month: 'February', resolved: 305, pending: 200 },
  { month: 'March', resolved: 237, pending: 120 },
  { month: 'April', resolved: 73, pending: 190 },
  { month: 'May', resolved: 209, pending: 130 },
  { month: 'June', resolved: 214, pending: 140 },
];

const barChartConfig = {
  resolved: {
    label: 'Resolved',
    color: '#22c55e',
  },
  pending: {
    label: 'Pending',
    color: '#ef4444',
  },
} satisfies ChartConfig;

const pieChartData = [
  { status: 'Compliant', value: 45, fill: '#22c55e' },
  { status: 'Pending', value: 15, fill: '#f97316' },
  { status: 'Non-Compliant', value: 10, fill: '#ef4444' },
];

const pieChartConfig = {
  compliant: {
    label: 'Compliant',
    color: '#22c55e',
  },
  pending: {
    label: 'Pending',
    color: '#f97316',
  },
  'non-compliant': {
    label: 'Non-Compliant',
    color: '#ef4444',
  },
} satisfies ChartConfig;

export default function NodalDashboard() {
  return (
    <div className={cn('min-h-screen p-4 sm:p-6 lg:p-8', contractorTheme.page.background)}>
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-slate-800">Nodal Officer Dashboard</h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Row 1: 3 Cards */}
          <div className={cn(contractorTheme.kpiCard.base, 'bg-gradient-to-br from-blue-500 to-blue-700')}>
            <Building className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Total Contractors</p>
            <p className="text-4xl font-bold">28</p>
            <p className="text-sm text-white/80 mt-1">Registered contractors</p>
          </div>
          <div className={cn(contractorTheme.kpiCard.base, 'bg-gradient-to-br from-green-500 to-emerald-600')}>
            <Award className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Total Workers</p>
            <p className="text-4xl font-bold">1,247</p>
            <p className="text-sm text-white/80 mt-1">Registered workers</p>
          </div>
          <div className={cn(contractorTheme.kpiCard.base, 'bg-gradient-to-br from-amber-500 to-yellow-600')}>
            <FileSearch className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Total Grievances</p>
            <p className="text-4xl font-bold">47</p>
            <p className="text-sm text-white/80 mt-1">Resolved: 35 | Pending: 8 | Escalated: 4</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Row 2: 3 Cards */}
          <div className={cn(contractorTheme.kpiCard.base, 'bg-gradient-to-br from-teal-500 to-cyan-600')}>
            <Users className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Today's Attendance</p>
            <p className="text-4xl font-bold">1125/1,247</p>
            <p className="text-sm text-white/80 mt-1">90%</p>
          </div>
          <div className={cn(contractorTheme.kpiCard.base, 'bg-gradient-to-br from-fuchsia-600 to-pink-600')}>
            <Award className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Recognition Pending</p>
            <p className="text-4xl font-bold">12</p>
            <p className="text-sm text-white/80 mt-1">Nominations to review</p>
          </div>
          <div className={cn(contractorTheme.kpiCard.base, contractorTheme.kpiCard.workers)}>
            <Building className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Contractors Monitored</p>
            <p className="text-4xl font-bold">28</p>
            <p className="text-sm text-white/80 mt-1">Active contractors</p>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className={cn(contractorTheme.card.container, 'lg:col-span-3 bg-white')}>
            <div className={cn(contractorTheme.card.content, 'p-6')}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Grievance Resolution Trends</h3>
              <ChartContainer config={barChartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={barChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="resolved" fill="var(--color-resolved)" radius={4} />
                  <Bar dataKey="pending" fill="var(--color-pending)" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
          <div className={cn(contractorTheme.card.container, 'lg:col-span-2 bg-white')}>
            <div className={cn(contractorTheme.card.content, 'p-6')}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status Distribution</h3>
              <ChartContainer config={pieChartConfig} className="min-h-[200px] w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="status" />} />
                  <Pie data={pieChartData} dataKey="value" nameKey="status" cx="50%" cy="50%" outerRadius={80}>
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartLegend
                    content={<ChartLegendContent nameKey="status" />}
                    className="-translate-y-[2rem] flex-wrap gap-2"
                  />
                </PieChart>
              </ChartContainer>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={cn(contractorTheme.card.container, 'bg-white')}>
          <div className={cn(contractorTheme.card.content, 'p-6')}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="p-4 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-left">
                <AlertTriangle className="h-6 w-6 text-red-600 mb-2" />
                <p className="font-medium text-red-900">Verify Critical Incident</p>
                <p className="text-sm text-red-700">3 incidents awaiting verification</p>
              </button>
              <button className="p-4 border border-orange-200 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left">
                <FileSearch className="h-6 w-6 text-orange-600 mb-2" />
                <p className="font-medium text-orange-900">Review Compliance</p>
                <p className="text-sm text-orange-700">5 zones due for inspection</p>
              </button>
              <button className="p-4 border border-purple-200 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
                <Award className="h-6 w-6 text-purple-600 mb-2" />
                <p className="font-medium text-purple-900">Process Recognition</p>
                <p className="text-sm text-purple-700">12 nominations pending</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}