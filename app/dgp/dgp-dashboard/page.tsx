"use client";

import React from 'react';
import StatCard from '@/components/ui/stat-card';
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
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-gray-100/50 shadow-lg">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              State Police Nodal Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Statewide oversight of law enforcement activities for Safai Karmachari cases
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <button className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Generate Monthly Summary
            </button>
            <button className="px-4 sm:px-6 py-3 border border-gray-200 bg-white/90 backdrop-blur-sm rounded-xl text-sm font-semibold hover:bg-blue-50/50 transition-all duration-300 hover:scale-105">
              Contact NSKC
            </button>
          </div>
        </header>

        {/* Metrics cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard title="Total Workers" value="124" icon={Users} color="green" />
          <StatCard title="Total Contractors" value="5,432" icon={Building2} color="purple" />
          <StatCard title="Total Incidents" value="876" icon={AlertTriangle} color="red" />
          <StatCard title="Total Cases" value="412" icon={FileText} color="blue" />
          <StatCard title="Completed Investigations" value="298" icon={CheckCircle} color="emerald" />
          <StatCard title="Pending Cases" value="114" icon={Clock} color="amber" />
          <StatCard title="Total Grievances" value="245" icon={MessageSquare} color="pink" />
          <StatCard title="District SP/CP Onboarded" value="18/20" icon={Shield} color="indigo" />
        </section>

        {/* Grievances & Directions Breakdown */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100/50 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Grievances Breakdown
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center">
                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/30 border border-blue-100/50 hover:shadow-lg hover:border-blue-200/50 hover:-translate-y-1 transition-all duration-300">
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">245</p>
                  <p className="text-sm text-blue-600/70 mt-1 font-medium">Total</p>
                </div>
              </div>
              <div className="text-center">
                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50/30 border border-green-100/50 hover:shadow-lg hover:border-green-200/50 hover:-translate-y-1 transition-all duration-300">
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent">198</p>
                  <p className="text-sm text-green-600/70 mt-1 font-medium">Replied</p>
                </div>
              </div>
              <div className="text-center">
                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-red-50 to-rose-50/30 border border-red-100/50 hover:shadow-lg hover:border-red-200/50 hover:-translate-y-1 transition-all duration-300">
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-red-600 to-rose-600 bg-clip-text text-transparent">47</p>
                  <p className="text-sm text-red-600/70 mt-1 font-medium">Pending</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100/50 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Directions Status
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center">
                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50/30 border border-indigo-100/50 hover:shadow-lg hover:border-indigo-200/50 hover:-translate-y-1 transition-all duration-300">
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-indigo-600 to-blue-600 bg-clip-text text-transparent">100</p>
                  <p className="text-sm text-indigo-600/70 mt-1 font-medium">Total</p>
                </div>
              </div>
              <div className="text-center">
                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50/30 border border-green-100/50 hover:shadow-lg hover:border-green-200/50 hover:-translate-y-1 transition-all duration-300">
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent">78</p>
                  <p className="text-sm text-green-600/70 mt-1 font-medium">Complied</p>
                </div>
              </div>
              <div className="text-center">
                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-red-50 to-rose-50/30 border border-red-100/50 hover:shadow-lg hover:border-red-200/50 hover:-translate-y-1 transition-all duration-300">
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-red-600 to-rose-600 bg-clip-text text-transparent">22</p>
                  <p className="text-sm text-red-600/70 mt-1 font-medium">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="space-y-4 sm:space-y-6">
          {/* First Row - Pie Chart and Bar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Incident Category Pie Chart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100/50 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 sm:mb-6">Incident Category (Statewide)</h3>
              <div className="h-64 sm:h-72 flex items-center justify-center">
                <Pie data={incidentCategoryData} options={incidentCategoryOptions} />
              </div>
            </div>

            {/* Investigation Status Bar Chart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100/50 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4 sm:mb-6">Investigation Status by District</h3>
              <div className="h-64 sm:h-72 flex items-center justify-center">
                <Bar data={investigationStatusData} options={investigationStatusOptions} />
              </div>
            </div>
          </div>

          {/* Second Row - Compensation Tracker Line Chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100/50 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4 sm:mb-6">Compensation Tracker (Monthly)</h3>
            <div className="h-64 sm:h-80 flex items-center justify-center">
              <Line data={compensationTrackerData} options={compensationTrackerOptions} />
            </div>
          </div>
        </section>        {/* Quick Actions */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100/50 hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
            <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Quick Actions</h3>
            <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">5 available actions</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="bg-gradient-to-br from-white to-blue-50/30 border border-gray-100 p-4 text-left w-full rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-200 group">
              <div className="flex items-start gap-3">
                <FileCheck className="h-6 w-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex-1">
                  <p className="font-medium text-blue-900 text-xs sm:text-sm">Add Investigation Update</p>
                  <p className="text-xs text-blue-700/70">Update statewide progress</p>
                </div>
              </div>
            </button>
            <button className="bg-gradient-to-br from-white to-green-50/30 border border-gray-100 p-4 text-left w-full rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-green-200 group">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-6 w-6 text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex-1">
                  <p className="font-medium text-green-900 text-sm">Submit Grievance Response</p>
                  <p className="text-xs text-green-700/70">Reply to pending grievances</p>
                </div>
              </div>
            </button>
            <button className="bg-gradient-to-br from-white to-purple-50/30 border border-gray-100 p-4 text-left w-full rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-purple-200 group">
              <div className="flex items-start gap-3">
                <FileText className="h-6 w-6 text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex-1">
                  <p className="font-medium text-purple-900 text-sm">Reply to NSKC Direction</p>
                  <p className="text-xs text-purple-700/70">Compliance updates</p>
                </div>
              </div>
            </button>
            <button className="bg-gradient-to-br from-white to-red-50/30 border border-gray-100 p-4 text-left w-full rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-red-200 group">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-red-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex-1">
                  <p className="font-medium text-red-900 text-sm">View Exception Alerts</p>
                  <p className="text-xs text-red-700/70">Low compliance districts</p>
                </div>
              </div>
            </button>
            <button className="bg-gradient-to-br from-white to-indigo-50/30 border border-gray-100 p-4 text-left w-full rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-indigo-200 group">
              <div className="flex items-start gap-3">
                <BarChart3 className="h-6 w-6 text-indigo-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex-1">
                  <p className="font-medium text-indigo-900 text-sm">Generate Annual Report</p>
                  <p className="text-xs text-indigo-700/70">Comprehensive summary</p>
                </div>
              </div>
            </button>
          </div>
        </section>

        
        
      </div>
    </div>
  );
}