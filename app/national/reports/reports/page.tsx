"use client";
import React from 'react';
import { Download, FileText, Calendar, BarChart3 } from 'lucide-react';

export default function Reports() {
  const preBuiltReports = [
    {
      title: 'Monthly Grievance Report',
      description: 'Comprehensive analysis of grievances by state and category',
      type: 'PDF',
      lastGenerated: '2024-01-15',
      size: '2.4 MB',
      category: 'Grievances'
    },
    {
      title: 'Worker Welfare Statistics',
      description: 'PPE distribution, training completion, and scheme enrollment data',
      type: 'Excel',
      lastGenerated: '2024-01-14',
      size: '1.8 MB',
      category: 'Welfare'
    },
    {
      title: 'Recognition Program Summary',
      description: 'Performance metrics and leaderboard rankings',
      type: 'PDF',
      lastGenerated: '2024-01-13',
      size: '3.2 MB',
      category: 'Recognition'
    },
    {
      title: 'Directive Compliance Report',
      description: 'Status and progress of issued directives across states',
      type: 'PDF',
      lastGenerated: '2024-01-12',
      size: '1.5 MB',
      category: 'Directives'
    },
    {
      title: 'Financial Summary Report',
      description: 'Budget allocation and expenditure tracking',
      type: 'Excel',
      lastGenerated: '2024-01-10',
      size: '2.1 MB',
      category: 'Finance'
    },
    {
      title: 'User Activity Log',
      description: 'System usage and audit trail information',
      type: 'CSV',
      lastGenerated: '2024-01-15',
      size: '856 KB',
      category: 'Audit'
    },
  ];

  const categoryColors = {
    'Grievances': 'bg-blue-100 text-blue-800',
    'Welfare': 'bg-green-100 text-green-800',
    'Recognition': 'bg-purple-100 text-purple-800',
    'Directives': 'bg-yellow-100 text-yellow-800',
    'Finance': 'bg-red-100 text-red-800',
    'Audit': 'bg-gray-100 text-gray-800',
  };

  const handleDownload = (reportTitle: string) => {
    console.log('Downloading report:', reportTitle);
    // Simulate download
  };

  const handleGenerateAnnualReport = () => {
    console.log('Generating annual report...');
    // Simulate annual report generation
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <button
          onClick={handleGenerateAnnualReport}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <BarChart3 className="w-4 h-4" />
          <span>Generate Annual Report</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total Reports</p>
              <p className="text-xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <Download className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Downloads This Month</p>
              <p className="text-xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Last Updated</p>
              <p className="text-xl font-bold text-gray-900">Today</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-600">Auto-Generated</p>
              <p className="text-xl font-bold text-gray-900">18</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Built Reports */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Pre-Built Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preBuiltReports.map((report, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[report.category as keyof typeof categoryColors]}`}>
                      {report.category}
                    </span>
                    <span className="text-xs text-gray-500">{report.type}</span>
                  </div>
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Last generated: {report.lastGenerated}</div>
                    <div>Size: {report.size}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Preview
                </button>
                <button
                  onClick={() => handleDownload(report.title)}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Report Builder */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Report Builder</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Grievance Analysis</option>
              <option>Welfare Statistics</option>
              <option>Performance Metrics</option>
              <option>Financial Summary</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last Year</option>
              <option>Custom Range</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
        </div>
        
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <FileText className="w-4 h-4" />
          <span>Generate Custom Report</span>
        </button>
      </div>
    </div>
  );
};
