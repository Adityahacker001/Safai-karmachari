"use client";

import React from 'react';
import DashboardCard from '@/components/dashboard/dashboard-card';
import {
  Building2,
  Users,
  AlertTriangle,
  FileText,
  CheckCircle,
  Clock,
  MessageSquare,
  Shield,
  AlertCircle,
  BarChart3,
  FileCheck,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { contractorTheme } from '@/lib/theme';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

// Mock district data
const DISTRICTS = [
  {
    name: 'District A',
    incidents: 34,
    firsField: 28,
    pending: 6,
    chargeSheets: 22,
    compensation: '₹12,50,000',
    complianceScore: 85,
  },
  {
    name: 'District B',
    incidents: 48,
    firsField: 41,
    pending: 12,
    chargeSheets: 35,
    compensation: '₹18,40,000',
    complianceScore: 78,
  },
  {
    name: 'District C',
    incidents: 22,
    firsField: 18,
    pending: 4,
    chargeSheets: 14,
    compensation: '₹8,20,000',
    complianceScore: 92,
  },
  {
    name: 'District D',
    incidents: 15,
    firsField: 12,
    pending: 3,
    chargeSheets: 9,
    compensation: '₹5,60,000',
    complianceScore: 88,
  },
];

export default function DGPDashboardPage() {
  // Chart data: Incident Category Pie Chart
  const incidentCategoryData = {
    labels: ['Manual Scavenging Deaths', 'Sewer Injuries', 'Hazardous Exposure', 'Other'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const incidentCategoryOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
      tooltip: { enabled: true },
    },
  };

  // Investigation Status Bar Chart
  const investigationStatusData = {
    labels: ['District A', 'District B', 'District C', 'District D'],
    datasets: [
      {
        label: 'Initiated',
        data: [20, 30, 15, 10],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 6,
      },
      {
        label: 'In Progress',
        data: [8, 11, 4, 2],
        backgroundColor: 'rgba(251, 191, 36, 0.8)',
        borderRadius: 6,
      },
      {
        label: 'Completed',
        data: [6, 7, 3, 3],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderRadius: 6,
      },
    ],
  };

  const investigationStatusOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Direction Compliance Pie Chart
  const directionComplianceData = {
    labels: ['Complied', 'Pending'],
    datasets: [
      {
        data: [78, 22],
        backgroundColor: ['rgba(16, 185, 129, 0.8)', 'rgba(239, 68, 68, 0.8)'],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const directionComplianceOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
      tooltip: { enabled: true },
    },
  };

  // Compensation Tracker Line Chart
  const compensationTrackerData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sanctioned',
        data: [450000, 520000, 610000, 680000, 750000, 820000],
        borderColor: 'rgba(59, 130, 246, 0.8)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Paid',
        data: [380000, 450000, 530000, 600000, 670000, 720000],
        borderColor: 'rgba(16, 185, 129, 0.8)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const compensationTrackerOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className={cn('min-h-screen p-2 sm:p-3 md:p-4', contractorTheme.page?.gradientBackground ?? 'bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30')}>
      <div className="max-w-[1600px] mx-auto space-y-3 md:space-y-4">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn bg-white/60 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-gray-100/50">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              State Police Nodal Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Statewide oversight of law enforcement activities for Safai Karmachari cases
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover-glow">
              Generate Monthly Summary
            </button>
            <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-200 bg-white/90 backdrop-blur-sm rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-50/50 transition-all duration-300 hover:scale-105">
              Contact NSKC
            </button>
          </div>
        </header>

        {/* Metrics cards */}
        <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3">
          <div className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <DashboardCard title="Total Workers" value="124" icon={Users} color="green" />
          </div>
          <div className="animate-slideUp" style={{ animationDelay: '0.15s' }}>
            <DashboardCard title="Total Contractors" value="5,432" icon={Building2} color="purple" />
          </div>
          <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <DashboardCard title="Total Incidents" value="876" icon={AlertTriangle} color="red" />
          </div>
          <div className="animate-slideUp" style={{ animationDelay: '0.25s' }}>
            <DashboardCard title="Total Cases" value="412" icon={FileText} color="blue" />
          </div>
          <div className="animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <DashboardCard title="Completed Investigations" value="298" icon={CheckCircle} color="green" />
          </div>
          <div className="animate-slideUp" style={{ animationDelay: '0.35s' }}>
            <DashboardCard title="Pending Cases" value="114" icon={Clock} color="orange" />
          </div>
          <div className="animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <DashboardCard title="Total Grievances" value="245" icon={MessageSquare} color="red" />
          </div>
          <div className="animate-slideUp" style={{ animationDelay: '0.45s' }}>
            <DashboardCard title="District SP/CP Onboarded" value="18/20" icon={Shield} color="indigo" />
          </div>
        </section>

        {/* Grievances & Directions Breakdown */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
          <div className="animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
            <div className={cn(
              contractorTheme.card?.container ?? 'bg-white/80 backdrop-blur-sm rounded-xl shadow-sm',
              'p-3 sm:p-4 border border-gray-100/50 card-hover gradient-border group',
              'relative overflow-hidden'
            )}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4 relative z-10">
                Grievances Breakdown
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 relative z-10">
                <div className="text-center group/item animate-scaleIn hover:animate-float" style={{ animationDelay: '0.3s' }}>
                  <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/30 border border-blue-100/50 transform transition-all duration-300 group-hover/item:shadow-lg group-hover/item:border-blue-200/50 group-hover/item:-translate-y-1">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">245</p>
                    <p className="text-xs sm:text-sm text-blue-600/70 mt-1 font-medium">Total</p>
                  </div>
                </div>
                <div className="text-center group/item animate-scaleIn" style={{ animationDelay: '0.4s' }}>
                  <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50/30 border border-green-100/50 transform transition-all duration-300 group-hover/item:shadow-lg group-hover/item:border-green-200/50 group-hover/item:-translate-y-1">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent">198</p>
                    <p className="text-xs sm:text-sm text-green-600/70 mt-1 font-medium">Replied</p>
                  </div>
                </div>
                <div className="text-center group/item animate-scaleIn" style={{ animationDelay: '0.5s' }}>
                  <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-red-50 to-rose-50/30 border border-red-100/50 transform transition-all duration-300 group-hover/item:shadow-lg group-hover/item:border-red-200/50 group-hover/item:-translate-y-1">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-br from-red-600 to-rose-600 bg-clip-text text-transparent">47</p>
                    <p className="text-xs sm:text-sm text-red-600/70 mt-1 font-medium">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-slideInRight" style={{ animationDelay: '0.3s' }}>
            <div className={cn(
              contractorTheme.card?.container ?? 'bg-white/80 backdrop-blur-sm rounded-xl shadow-sm',
              'p-3 sm:p-4 border border-gray-100/50 card-hover gradient-border group',
              'relative overflow-hidden'
            )}>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-sm sm:text-base font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4 relative z-10">
                Directions Status
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 relative z-10">
                <div className="text-center group/item animate-scaleIn" style={{ animationDelay: '0.4s' }}>
                  <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50/30 border border-indigo-100/50 transform transition-all duration-300 group-hover/item:shadow-lg group-hover/item:border-indigo-200/50 group-hover/item:-translate-y-1">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-br from-indigo-600 to-blue-600 bg-clip-text text-transparent">100</p>
                    <p className="text-xs sm:text-sm text-indigo-600/70 mt-1 font-medium">Total</p>
                  </div>
                </div>
                <div className="text-center group/item animate-scaleIn" style={{ animationDelay: '0.5s' }}>
                  <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50/30 border border-green-100/50 transform transition-all duration-300 group-hover/item:shadow-lg group-hover/item:border-green-200/50 group-hover/item:-translate-y-1">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent">78</p>
                    <p className="text-xs sm:text-sm text-green-600/70 mt-1 font-medium">Complied</p>
                  </div>
                </div>
                <div className="text-center group/item animate-scaleIn" style={{ animationDelay: '0.6s' }}>
                  <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-red-50 to-rose-50/30 border border-red-100/50 transform transition-all duration-300 group-hover/item:shadow-lg group-hover/item:border-red-200/50 group-hover/item:-translate-y-1">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-br from-red-600 to-rose-600 bg-clip-text text-transparent">22</p>
                    <p className="text-xs sm:text-sm text-red-600/70 mt-1 font-medium">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
          {/* Incident Category Pie Chart */}
          <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <div className={cn(contractorTheme.card?.container ?? 'bg-white/80 backdrop-blur-sm rounded-xl shadow-sm', 'p-3 sm:p-4 border border-gray-100/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30')}>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Incident Category (Statewide)</h3>
              <div className="h-44 sm:h-52 md:h-60 flex items-center justify-center">
                <Pie data={incidentCategoryData} options={incidentCategoryOptions} />
              </div>
            </div>
          </div>

          {/* Direction Compliance Pie Chart */}
          <div className="animate-slideUp" style={{ animationDelay: '0.25s' }}>
            <div className={cn(contractorTheme.card?.container ?? 'bg-white/80 backdrop-blur-sm rounded-xl shadow-sm', 'p-3 sm:p-4 border border-gray-100/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30')}>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Direction Compliance</h3>
              <div className="h-44 sm:h-52 md:h-60 flex items-center justify-center">
                <Pie data={directionComplianceData} options={directionComplianceOptions} />
              </div>
            </div>
          </div>

          {/* Investigation Status Bar Chart */}
          <div className="lg:col-span-2 animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <div className={cn(contractorTheme.card?.container ?? 'bg-white/80 backdrop-blur-sm rounded-xl shadow-sm', 'p-3 sm:p-4 border border-gray-100/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30')}>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Investigation Status by District</h3>
              <div className="h-44 sm:h-52 md:h-60 flex items-center justify-center">
                <Bar data={investigationStatusData} options={investigationStatusOptions} />
              </div>
            </div>
          </div>

          {/* Compensation Tracker Line Chart */}
          <div className="lg:col-span-2 animate-slideUp" style={{ animationDelay: '0.35s' }}>
            <div className={cn(contractorTheme.card?.container ?? 'bg-white/80 backdrop-blur-sm rounded-xl shadow-sm', 'p-3 sm:p-4 border border-gray-100/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30')}>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Compensation Tracker (Monthly)</h3>
              <div className="h-44 sm:h-52 md:h-60 flex items-center justify-center">
                <Line data={compensationTrackerData} options={compensationTrackerOptions} />
              </div>
            </div>
          </div>
        </section>          {/* Quick Actions */}
        <section className={cn(contractorTheme.card?.container ?? 'bg-white/80 backdrop-blur-sm rounded-xl shadow-sm', 'p-3 sm:p-4 border border-gray-100/50 animate-slideUp hover:shadow-lg transition-all duration-300')} style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Quick Actions</h3>
            <span className="text-xs text-gray-500">6 available actions</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <button className={cn(contractorTheme.button?.secondary ?? 'bg-gradient-to-br from-white to-blue-50/30 border border-gray-100', 'p-3 text-left w-full rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-102 hover:border-blue-200 hover-glow group')}>
              <div className="flex items-start gap-3">
                <FileCheck className="h-5 w-5 text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex-1">
                  <p className="font-medium text-blue-900 text-xs sm:text-sm">Add Investigation Update</p>
                  <p className="text-xs text-blue-700/70">Update statewide progress</p>
                </div>
              </div>
            </button>
            <button className={cn(contractorTheme.button?.secondary ?? 'bg-gradient-to-br from-white to-green-50/30 border border-gray-100', 'p-3 text-left w-full rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-102 hover:border-green-200 hover-glow group')}>
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex-1">
                  <p className="font-medium text-green-900 text-xs sm:text-sm">Submit Grievance Response</p>
                  <p className="text-xs text-green-700/70">Reply to pending grievances</p>
                </div>
              </div>
            </button>
            <button className={cn(contractorTheme.button?.secondary ?? 'bg-gradient-to-br from-white to-purple-50/30 border border-gray-100', 'p-3 text-left w-full rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-102 hover:border-purple-200 hover-glow group')}>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex-1">
                  <p className="font-medium text-purple-900 text-xs sm:text-sm">Reply to NSKC Direction</p>
                  <p className="text-xs text-purple-700/70">Compliance updates</p>
                </div>
              </div>
            </button>
            <button className={cn(contractorTheme.button?.secondary ?? 'bg-gradient-to-br from-white to-red-50/30 border border-gray-100', 'p-3 text-left w-full rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-102 hover:border-red-200 hover-glow group')}>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex-1">
                  <p className="font-medium text-red-900 text-xs sm:text-sm">View Exception Alerts</p>
                  <p className="text-xs text-red-700/70">Low compliance districts</p>
                </div>
              </div>
            </button>
            <button className={cn(contractorTheme.button?.secondary ?? 'bg-gradient-to-br from-white to-indigo-50/30 border border-gray-100', 'p-3 text-left w-full rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-102 hover:border-indigo-200 hover-glow group')}>
              <div className="flex items-start gap-3">
                <BarChart3 className="h-5 w-5 text-indigo-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex-1">
                  <p className="font-medium text-indigo-900 text-xs sm:text-sm">Generate Annual Report</p>
                  <p className="text-xs text-indigo-700/70">Comprehensive summary</p>
                </div>
              </div>
            </button>
            <button className={cn(contractorTheme.button?.secondary ?? 'bg-gradient-to-br from-white to-amber-50/30 border border-gray-100', 'p-3 text-left w-full rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-102 hover:border-amber-200 hover-glow group')}>
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-amber-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex-1">
                  <p className="font-medium text-amber-900 text-xs sm:text-sm">Generative AI Assistant</p>
                  <p className="text-xs text-amber-700/70">Draft reports & replies</p>
                </div>
              </div>
            </button>
          </div>
        </section>

        
        
      </div>
    </div>
  );
}