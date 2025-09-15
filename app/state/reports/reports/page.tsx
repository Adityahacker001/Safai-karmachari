"use client";   
import React from 'react';
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
    <div className="space-y-6 min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 p-6 md:p-10">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">Generate and download comprehensive reports</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl shadow-md border border-blue-200 bg-gradient-to-br from-blue-200 via-blue-100 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Available Reports</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{reports.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>
        
  <div className="p-6 rounded-xl shadow-md border border-green-200 bg-gradient-to-br from-green-200 via-green-100 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Generated Today</p>
              <p className="text-2xl font-bold text-green-600 mt-1">3</p>
            </div>
            <div className="w-12 h-12 bg-green-50 border border-green-200 text-green-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>
        
  <div className="p-6 rounded-xl shadow-md border border-purple-200 bg-gradient-to-br from-purple-200 via-purple-100 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Downloads</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">247</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 border border-purple-200 text-purple-600 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
          </div>
        </div>
        
  <div className="p-6 rounded-xl shadow-md border border-gray-200 bg-gradient-to-br from-gray-200 via-gray-100 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Data Size</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">14.1 MB</p>
            </div>
            <div className="w-12 h-12 bg-gray-50 border border-gray-200 text-gray-600 rounded-lg flex items-center justify-center">
              <BarChart className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Reports</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reports.map((report, idx) => (
            <div
              key={report.id}
              className={
                idx % 2 === 0
                  ? "p-6 rounded-xl border shadow-md bg-gradient-to-br from-blue-100 via-white to-purple-100 hover:shadow-lg transition-shadow"
                  : "p-6 rounded-xl border shadow-md bg-gradient-to-br from-pink-100 via-white to-yellow-100 hover:shadow-lg transition-shadow"
              }
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{report.title}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getCategoryColor(report.category)}`}>
                      {report.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Last generated: {report.lastGenerated}</span>
                <span>Size: {report.size}</span>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download Excel</span>
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  Regenerate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Report Generator */}
  <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 p-6 rounded-xl border border-gray-200 shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Custom Report Generator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Grievance Analysis</option>
              <option>Welfare Statistics</option>
              <option>Performance Metrics</option>
              <option>Compliance Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Districts</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Districts</option>
              <option>Mumbai</option>
              <option>Pune</option>
              <option>Nashik</option>
            </select>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <BarChart className="w-4 h-4" />
          <span>Generate Custom Report</span>
        </button>
      </div>
    </div>
  );
};

export default Reports;