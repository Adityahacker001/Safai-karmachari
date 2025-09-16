"use client";
import React from 'react';
import { Download, FileText, Calendar, BarChart3 } from 'lucide-react';

const Reports: React.FC = () => {
  const reports = [
    {
      title: 'Monthly District Grievance Summary',
      description: 'Comprehensive overview of all grievances filed and resolved in the district',
      lastGenerated: '2024-01-25',
      type: 'PDF/Excel'
    },
    {
      title: 'Contractor Performance Report',
      description: 'Detailed analysis of contractor performance metrics including welfare and compliance',
      lastGenerated: '2024-01-24',
      type: 'PDF/Excel'
    },
    {
      title: 'Welfare Status Report',
      description: 'Complete status of worker welfare programs, PPE distribution, and training completion',
      lastGenerated: '2024-01-23',
      type: 'PDF/Excel'
    },
    {
      title: 'Recognition & Awards Report',
      description: 'Performance rankings and recognition awards for workers and contractors',
      lastGenerated: '2024-01-22',
      type: 'PDF/Excel'
    },
    {
      title: 'Attendance Analytics Report',
      description: 'Worker attendance patterns and trends across all zones and contractors',
      lastGenerated: '2024-01-21',
      type: 'PDF/Excel'
    },
    {
      title: 'Directive Compliance Report',
      description: 'Status and compliance tracking for all issued directives',
      lastGenerated: '2024-01-20',
      type: 'PDF/Excel'
    }
  ];

  return (
    <div className="space-y-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen p-6 rounded-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between text-gray-900 px-6 py-4 rounded-xl shadow-md">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <button className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2 shadow-md">
            <BarChart3 className="h-4 w-4" />
            <span>Custom Report</span>
          </button>
          <button className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors flex items-center space-x-2 shadow-md">
            <Calendar className="h-4 w-4" />
            <span>Schedule Report</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-6 shadow-md hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800 mb-1">Reports Generated</p>
              <p className="text-2xl font-bold text-blue-900">156</p>
            </div>
            <div className="p-3 rounded-lg bg-white shadow-md text-blue-600">
              <FileText className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-6 shadow-md hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800 mb-1">This Month</p>
              <p className="text-2xl font-bold text-green-900">24</p>
            </div>
            <div className="p-3 rounded-lg bg-white shadow-md text-green-600">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-6 shadow-md hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-800 mb-1">Downloads</p>
              <p className="text-2xl font-bold text-purple-900">1,247</p>
            </div>
            <div className="p-3 rounded-lg bg-white shadow-md text-purple-600">
              <Download className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-6 shadow-md hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800 mb-1">Scheduled</p>
              <p className="text-2xl font-bold text-yellow-900">8</p>
            </div>
            <div className="p-3 rounded-lg bg-white shadow-md text-yellow-600">
              <BarChart3 className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">📑 Available Reports</h3>
          <p className="text-sm text-gray-600 mt-1">Generate and download reports for analysis and compliance</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {reports.map((report, index) => (
            <div key={index} className="p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-200 rounded-lg shadow-md">
                      <FileText className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{report.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>📅 Last generated: {report.lastGenerated}</span>
                        <span>📂 Format: {report.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform shadow-md flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>PDF</span>
                  </button>
                  <button className="bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform shadow-md flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Excel</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Insights */}
      <div className="bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">🔍 Recent Report Insights</h3>
        <div className="space-y-4">
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-blue-900">Grievance Resolution Improved</h4>
            <p className="text-sm text-blue-800 mt-1">Average resolution time decreased by 0.3 days compared to last month</p>
          </div>
          
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-green-900">PPE Distribution On Track</h4>
            <p className="text-sm text-green-800 mt-1">86% coverage achieved, exceeding the 80% monthly target</p>
          </div>
          
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-yellow-900">Training Completion Needs Attention</h4>
            <p className="text-sm text-yellow-800 mt-1">3 contractors are below the 85% completion threshold</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
