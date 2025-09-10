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
} from 'lucide-react';

export default function NodalDashboard() {
  return (
    <div className={cn('min-h-screen p-4 sm:p-6 lg:p-8', contractorTheme.page.background)}>
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-slate-800">Nodal Officer Dashboard</h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={cn(contractorTheme.kpiCard.base, contractorTheme.kpiCard.grievances)}>
            <AlertTriangle className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Manual Scavenging Alerts</p>
            <p className="text-4xl font-bold">3</p>
            <p className="text-sm text-white/80 mt-1">Critical incidents</p>
          </div>
          <div className={cn(contractorTheme.kpiCard.base, 'bg-gradient-to-br from-amber-500 to-yellow-600')}>
            <FileSearch className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Grievances Pending</p>
            <p className="text-4xl font-bold">47</p>
            <p className="text-sm text-white/80 mt-1">Under review</p>
          </div>
          <div className={cn(contractorTheme.kpiCard.base, contractorTheme.kpiCard.safety)}>
            <Shield className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Safety Compliance</p>
            <p className="text-4xl font-bold">91.5%</p>
            <p className="text-sm text-white/80 mt-1">Zone average</p>
          </div>
          <div className={cn(contractorTheme.kpiCard.base, 'bg-gradient-to-br from-fuchsia-600 to-pink-600')}>
            <Award className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Recognition Pending</p>
            <p className="text-4xl font-bold">12</p>
            <p className="text-sm text-white/80 mt-1">Nominations to review</p>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={cn(contractorTheme.kpiCard.base, contractorTheme.kpiCard.workers)}>
            <Building className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Contractors Monitored</p>
            <p className="text-4xl font-bold">28</p>
            <p className="text-sm text-white/80 mt-1">Active contractors</p>
          </div>
          <div className={cn(contractorTheme.kpiCard.base, contractorTheme.kpiCard.attendance)}>
            <CheckCircle className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Incident Resolution Rate</p>
            <p className="text-4xl font-bold">89%</p>
            <p className="text-sm text-white/80 mt-1">Within 48 hours</p>
          </div>
          <div className={cn(contractorTheme.kpiCard.base, 'bg-gradient-to-br from-indigo-500 to-violet-600')}>
            <BarChart3 className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Compliance Score</p>
            <p className="text-4xl font-bold">9.1</p>
            <p className="text-sm text-white/80 mt-1">Out of 10</p>
          </div>
          <div className={cn(contractorTheme.kpiCard.base, contractorTheme.kpiCard.attendance)}>
            <TrendingUp className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Performance Trend</p>
            <p className="text-4xl font-bold">Improving</p>
            <p className="text-sm text-white/80 mt-1">Overall trajectory</p>
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