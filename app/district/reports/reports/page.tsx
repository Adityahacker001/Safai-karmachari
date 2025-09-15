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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Custom Report</span>
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Schedule Report</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Reports Generated</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-600">
              <FileText className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">This Month</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-600">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Downloads</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-purple-600">
              <Download className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-600">
              <BarChart3 className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Available Reports</h3>
          <p className="text-sm text-gray-500 mt-1">Generate and download reports for analysis and compliance</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {reports.map((report, index) => (
            <div key={index} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{report.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-400">Last generated: {report.lastGenerated}</span>
                        <span className="text-xs text-gray-400">Format: {report.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>PDF</span>
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
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
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Report Insights</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900">Grievance Resolution Improved</h4>
            <p className="text-sm text-blue-700 mt-1">Average resolution time decreased by 0.3 days compared to last month</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900">PPE Distribution On Track</h4>
            <p className="text-sm text-green-700 mt-1">86% coverage achieved, exceeding the 80% monthly target</p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900">Training Completion Needs Attention</h4>
            <p className="text-sm text-yellow-700 mt-1">3 contractors are below the 85% completion threshold</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;