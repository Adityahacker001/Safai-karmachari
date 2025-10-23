"use client";
import React from 'react';
import { Download, FileText, Calendar, BarChart3, ChevronRight, Eye, FileSpreadsheet } from 'lucide-react';

// --- Re-defining components within the file for a self-contained structure ---


import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: 'blue' | 'green' | 'purple' | 'yellow';
}
const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => {
  const colorSchemes: Record<StatCardProps['color'], string> = {
    blue: 'from-sky-400 to-blue-600',
    green: 'from-emerald-400 to-green-600',
    purple: 'from-purple-500 to-indigo-600',
    yellow: 'from-amber-400 to-orange-500',
  };
  return (
    <div className={`relative bg-gradient-to-br ${colorSchemes[color]} p-6 rounded-2xl shadow-lg text-white overflow-hidden transition-transform transform hover:-translate-y-1.5 duration-300`}>
      <Icon className="absolute -right-6 -bottom-6 h-28 w-28 text-white/10" />
      <div className="relative">
        <p className="font-semibold text-lg text-white/90">{title}</p>
        <p className="text-5xl font-bold mt-2">{value}</p>
      </div>
    </div>
  );
};


export default function Reports() {
  const preBuiltReports = [
    { title: 'Monthly Grievance Report', description: 'Comprehensive analysis of grievances by state and category.', type: 'PDF', lastGenerated: '2024-01-15', size: '2.4 MB', category: 'Grievances' },
    { title: 'Worker Welfare Statistics', description: 'PPE distribution, training completion, and scheme enrollment data.', type: 'Excel', lastGenerated: '2024-01-14', size: '1.8 MB', category: 'Welfare' },
    { title: 'Recognition Program Summary', description: 'Performance metrics and leaderboard rankings.', type: 'PDF', lastGenerated: '2024-01-13', size: '3.2 MB', category: 'Recognition' },
    { title: 'Directive Compliance Report', description: 'Status and progress of issued directives across states.', type: 'PDF', lastGenerated: '2024-01-12', size: '1.5 MB', category: 'Directives' },
    { title: 'Financial Summary Report', description: 'Budget allocation and expenditure tracking.', type: 'Excel', lastGenerated: '2024-01-10', size: '2.1 MB', category: 'Finance' },
    { title: 'User Activity Log', description: 'System usage and audit trail information.', type: 'CSV', lastGenerated: '2024-01-15', size: '856 KB', category: 'Audit' },
  ];


  interface CategoryStyle {
    icon: React.ElementType;
    color: string;
    gradient: string;
  }
  const categoryStyles: Record<string, CategoryStyle> = {
    'Grievances': { icon: FileText, color: 'blue', gradient: 'from-blue-500 to-cyan-600' },
    'Welfare': { icon: FileText, color: 'green', gradient: 'from-green-500 to-teal-600' },
    'Recognition': { icon: FileText, color: 'purple', gradient: 'from-purple-500 to-indigo-600' },
    'Directives': { icon: FileText, color: 'yellow', gradient: 'from-yellow-500 to-amber-600' },
    'Finance': { icon: FileText, color: 'orange', gradient: 'from-orange-500 to-amber-600' },
    'Audit': { icon: FileText, color: 'cyan', gradient: 'from-cyan-500 to-sky-600' },
  };


  const handleDownload = (reportTitle: string) => {
    console.log('Downloading report:', reportTitle);
  };

  const handleGenerateAnnualReport = () => {
    console.log('Generating annual report...');
  };

  return (
    <div className="space-y-10 p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">Reports & Analytics</h1>
          <p className="mt-1 text-md text-slate-500">Access pre-built reports or generate custom analytics.</p>
        </div>
        <button
          onClick={handleGenerateAnnualReport}
          className="mt-4 sm:mt-0 px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <BarChart3 className="w-5 h-5" />
          <span className="font-semibold">Generate Annual Report</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Reports" value="24" icon={FileText} color="purple" />
        <StatCard title="Downloads This Month" value="156" icon={Download} color="green" />
        <StatCard title="Last Updated" value="Today" icon={Calendar} color="blue" />
        <StatCard title="Auto-Generated" value="18" icon={BarChart3} color="yellow" />
      </div>

      {/* Pre-Built Reports */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-700">Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preBuiltReports.map((report, index) => {
            const style = categoryStyles[report.category] || categoryStyles['Audit'];
            const Icon = style.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200/80 overflow-hidden flex flex-col">
                <div className={`bg-gradient-to-r ${style.gradient} p-5 text-white flex items-center space-x-4`}>
                    <Icon className="h-8 w-8" />
                    <h3 className="font-bold text-lg leading-tight">{report.title}</h3>
                </div>
                <div className="p-5 flex-grow">
                  <p className="text-sm text-slate-600 mb-4">{report.description}</p>
                  <div className="flex items-center space-x-3 text-xs text-slate-500">
                    <span className={`px-2 py-1 rounded-full font-medium bg-${style.color}-100 text-${style.color}-700`}>{report.category}</span>
                    <span>•</span>
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
                <div className="px-5 pb-5 mt-auto">
                    <p className="text-xs text-slate-400 mb-3">Last generated: {report.lastGenerated}</p>
                    <div className="flex items-center justify-between gap-2">
                        <button
                            onClick={() => handleDownload(report.title)}
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
                        >
                            <Eye className="w-4 h-4" />
                            <span className="font-semibold text-sm">View</span>
                        </button>
                        <button
                            onClick={() => handleDownload(report.title)}
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-300"
                        >
                            <FileText className="w-4 h-4" />
                            <span className="font-semibold text-sm">PDF</span>
                        </button>
                        <button
                            onClick={() => handleDownload(report.title)}
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all duration-300"
                        >
                            <FileSpreadsheet className="w-4 h-4" />
                            <span className="font-semibold text-sm">Excel</span>
                        </button>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Report Builder */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/80">
        <div className="p-6">
            <h3 className="text-2xl font-bold text-slate-700 mb-4">Custom Report Builder</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Report Type</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow">
                        <option>Grievance Analysis</option>
                        <option>Welfare Statistics</option>
                        <option>Performance Metrics</option>
                        <option>Financial Summary</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Time Period</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last 3 Months</option>
                        <option>Last Year</option>
                        <option>Custom Range</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Format</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow">
                        <option>PDF</option>
                        <option>Excel</option>
                        <option>CSV</option>
                    </select>
                </div>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <FileText className="w-5 h-5" />
                <span className="font-semibold">Generate Custom Report</span>
            </button>
        </div>
      </div>
    </div>
  );
};

