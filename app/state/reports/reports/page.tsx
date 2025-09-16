"use client";   
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download, Calendar, BarChart } from 'lucide-react';

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: 'Monthly Grievance Summary',
      description: 'Comprehensive overview of all grievances filed and resolved in the current month',
      lastGenerated: '2024-01-20',
      category: 'Grievances',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Worker Welfare Status Report',
      description: 'Current status of PPE distribution, training completion, and scheme enrollment',
      lastGenerated: '2024-01-19',
      category: 'Welfare',
      size: '1.8 MB'
    },
    {
      id: 3,
      title: 'Recognition Performance Analytics',
      description: 'District and contractor performance metrics with recognition scores',
      lastGenerated: '2024-01-18',
      category: 'Recognition',
      size: '3.2 MB'
    },
    {
      id: 4,
      title: 'Directives Compliance Report',
      description: 'Status and compliance tracking of all issued directives',
      lastGenerated: '2024-01-17',
      category: 'Directives',
      size: '1.1 MB'
    },
    {
      id: 5,
      title: 'State Overview Dashboard',
      description: 'Executive summary with key metrics and KPIs',
      lastGenerated: '2024-01-20',
      category: 'Overview',
      size: '856 KB'
    },
    {
      id: 6,
      title: 'Audit Trail Report',
      description: 'Complete audit log of all system activities and user actions',
      lastGenerated: '2024-01-19',
      category: 'Audit',
      size: '4.7 MB'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Grievances': 'bg-yellow-100 text-yellow-800',
      'Welfare': 'bg-green-100 text-green-800',
      'Recognition': 'bg-purple-100 text-purple-800',
      'Directives': 'bg-blue-100 text-blue-800',
      'Overview': 'bg-gray-100 text-gray-800',
      'Audit': 'bg-red-100 text-red-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8 min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 p-6 md:p-10">
      {/* Page Header */}
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
          Reports & Analytics
        </h1>
        <p className="text-gray-600 mt-2 text-lg">Generate and download comprehensive reports</p>
      </div>

      {/* Quick Stats (New Card Layout) */}
  <div className="grid gap-6 md:grid-cols-4">
        {/* Available Reports */}
        <Card className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-r from-orange-400 to-orange-500 text-white">
          <CardContent className="p-6">
            <p className="text-sm font-semibold">Available Reports</p>
            <p className="text-3xl font-bold mt-2">{reports.length}</p>
          </CardContent>
          {/* Icon Watermark */}
          <div className="absolute right-4 bottom-4 text-white/20 text-6xl">
            <FileText className="w-8 h-8" />
          </div>
        </Card>

        {/* Generated Today */}
        <Card className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-r from-emerald-400 to-teal-500 text-white">
          <CardContent className="p-6">
            <p className="text-sm font-semibold">Generated Today</p>
            <p className="text-3xl font-bold mt-2">3</p>
          </CardContent>
          {/* Icon Watermark */}
          <div className="absolute right-4 bottom-4 text-white/20 text-6xl">
            <Calendar className="w-8 h-8" />
          </div>
        </Card>

        {/* Total Downloads */}
        <Card className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-r from-purple-400 to-indigo-500 text-white">
          <CardContent className="p-6">
            <p className="text-sm font-semibold">Total Downloads</p>
            <p className="text-3xl font-bold mt-2">247</p>
          </CardContent>
          {/* Icon Watermark */}
          <div className="absolute right-4 bottom-4 text-white/20 text-6xl">
            <Download className="w-8 h-8" />
          </div>
        </Card>

        {/* Data Size */}
        <Card className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white">
          <CardContent className="p-6">
            <p className="text-sm font-semibold">Data Size</p>
            <p className="text-3xl font-bold mt-2">14.1 MB</p>
          </CardContent>
          {/* Icon Watermark */}
          <div className="absolute right-4 bottom-4 text-white/20 text-6xl">
            <BarChart className="w-8 h-8" />
          </div>
        </Card>
      </div>

      {/* Reports Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Available Reports</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reports.map((report, idx) => (
            <div
              key={report.id}
              className={
                idx % 2 === 0
                  ? "p-6 rounded-2xl border shadow-lg bg-gradient-to-br from-blue-100 via-white to-purple-100 hover:shadow-2xl hover:scale-[1.01] transition-all"
                  : "p-6 rounded-2xl border shadow-lg bg-gradient-to-br from-pink-100 via-white to-yellow-100 hover:shadow-2xl hover:scale-[1.01] transition-all"
              }
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-200 via-white to-blue-100 border border-blue-200 text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{report.title}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 shadow-sm ${getCategoryColor(report.category)}`}>
                      {report.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="font-medium">📅 {report.lastGenerated}</span>
                <span className="font-medium">💾 {report.size}</span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 shadow-md transition">
                  <Download className="w-4 h-4" />
                  <span>PDF</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:opacity-90 shadow-md transition">
                  <Download className="w-4 h-4" />
                  <span>Excel</span>
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors shadow-sm">
                  Regenerate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Report Generator */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Custom Report Generator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
              <option>Grievance Analysis</option>
              <option>Welfare Statistics</option>
              <option>Performance Metrics</option>
              <option>Compliance Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Districts</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
              <option>All Districts</option>
              <option>Mumbai</option>
              <option>Pune</option>
              <option>Nashik</option>
            </select>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-all shadow-md">
          <BarChart className="w-4 h-4" />
          <span>Generate Custom Report</span>
        </button>
      </div>
    </div>
  );
};

export default Reports;
