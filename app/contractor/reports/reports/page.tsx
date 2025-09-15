"use client";
import React from 'react';
import { Download, FileText, Calendar, BarChart3 } from 'lucide-react';
import DashboardLayout from '@/components/layout/dashboard-layout';
const Reports: React.FC = () => {
  const reports = [
    { title: 'Daily Attendance Report', description: 'Worker attendance details for selected date', format: ['PDF', 'Excel'], lastGenerated: '2024-01-15 09:30 AM' },
    { title: 'Grievance Report', description: 'Summary of grievances raised and their status', format: ['PDF', 'Excel'], lastGenerated: '2024-01-14 05:45 PM' },
    { title: 'PPE/Training Coverage Report', description: 'Worker welfare status including PPE and training', format: ['PDF', 'Excel'], lastGenerated: '2024-01-13 02:15 PM' },
    { title: 'Weekly Performance Report', description: 'Comprehensive performance metrics for the week', format: ['PDF', 'Excel'], lastGenerated: '2024-01-12 11:20 AM' },
    { title: 'Monthly Summary Report', description: 'Monthly overview of all activities and metrics', format: ['PDF', 'Excel'], lastGenerated: '2024-01-01 10:00 AM' }
  ];
  const quickStats = [
    { label: 'Reports Generated This Month', value: '24', icon: FileText },
    { label: 'Last Report Generated', value: 'Today', icon: Calendar },
    { label: 'Active Report Types', value: '5', icon: BarChart3 }
  ];
  return (
    <DashboardLayout role="contractor" name="Contractor Dashboard">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Custom Report</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <stat.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Available Reports</h2>
            <p className="text-sm text-gray-500 mt-1">Generate and download reports in your preferred format</p>
          </div>
          <div className="divide-y divide-gray-200">
            {reports.map((report, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                    <p className="text-xs text-gray-400 mt-2">Last generated: {report.lastGenerated}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {report.format.map((format) => (
                      <button key={format} className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">{format}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <div className="flex space-x-2">
                  <input type="date" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  <input type="date" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Worker Group</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Workers</option>
                  <option>Morning Shift</option>
                  <option>Evening Shift</option>
                  <option>Zone A</option>
                  <option>Zone B</option>
                </select>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">Generate Custom Report</button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Downloads</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div><p className="text-sm font-medium text-gray-900">Daily Attendance Report</p><p className="text-xs text-gray-500">Downloaded 2 hours ago</p></div><span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">PDF</span></div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div><p className="text-sm font-medium text-gray-900">Grievance Report</p><p className="text-xs text-gray-500">Downloaded yesterday</p></div><span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Excel</span></div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div><p className="text-sm font-medium text-gray-900">PPE Coverage Report</p><p className="text-xs text-gray-500">Downloaded 3 days ago</p></div><span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">PDF</span></div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default Reports;
