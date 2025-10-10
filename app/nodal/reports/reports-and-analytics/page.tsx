"use client";

import React from "react";
import { FileText, Download, Calendar, BarChart3 } from "lucide-react";

const Reports = () => {
  const reports = [
    {
      title: "Daily Attendance Report",
      description: "Worker attendance across all contractors",
      lastGenerated: "2024-01-27",
      format: "PDF, Excel",
      frequency: "Daily",
    },
    {
      title: "Grievance Report",
      description: "Complete grievance tracking and resolution status",
      lastGenerated: "2024-01-26",
      format: "PDF, Excel",
      frequency: "Weekly",
    },
    {
      title: "Contractor Performance Report",
      description: "Performance metrics and KPIs for all contractors",
      lastGenerated: "2024-01-25",
      format: "PDF, Excel",
      frequency: "Monthly",
    },
    {
      title: "Worker Welfare Report",
      description: "PPE distribution, training, and scheme enrollment",
      lastGenerated: "2024-01-24",
      format: "PDF, Excel",
      frequency: "Monthly",
    },
    {
      title: "Recognition & Awards Report",
      description: "Worker recognition scores and tier distribution",
      lastGenerated: "2024-01-23",
      format: "PDF, Excel",
      frequency: "Quarterly",
    },
    {
      title: "Compliance Audit Report",
      description: "Safety and regulatory compliance status",
      lastGenerated: "2024-01-22",
      format: "PDF",
      frequency: "Monthly",
    },
  ];

  const quickStats = [
    {
      title: "Reports Generated This Month",
      value: "24",
      icon: FileText,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "Downloads This Week",
      value: "156",
      icon: Download,
      gradient: "from-green-400 to-green-600",
    },
    {
      title: "Scheduled Reports",
      value: "8",
      icon: Calendar,
      gradient: "from-yellow-400 to-yellow-600",
    },
    {
      title: "Data Sources",
      value: "12",
      icon: BarChart3,
      gradient: "from-purple-400 to-purple-600",
    },
  ];

  const handleDownload = (reportTitle: string, format: string) => {
    console.log(`Downloading ${reportTitle} in ${format} format`);
    alert(`Downloading ${reportTitle} as ${format}...`);
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Reports & Analytics
        </h1>
        <p className="text-gray-700 mt-2">
          Generate and download comprehensive reports
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-lg bg-gradient-to-br ${stat.gradient} text-white transform hover:scale-105 transition-transform`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className="w-10 h-10 opacity-90" />
            </div>
          </div>
        ))}
      </div>

      {/* Available Reports */}
      <div className="rounded-xl shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="px-6 py-4 border-b border-blue-200 bg-gradient-to-r from-blue-200 to-blue-300 rounded-t-xl">
          <h3 className="text-lg font-semibold text-gray-900">Available Reports</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((report, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {report.title}
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                      {report.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1 text-blue-500" />
                        Last: {report.lastGenerated}
                      </span>
                      <span className="font-medium">
                        Frequency: {report.frequency}
                      </span>
                    </div>
                  </div>
                  <FileText className="w-6 h-6 text-blue-500 flex-shrink-0" />
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleDownload(report.title, 'View')}
                    className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-medium rounded-md hover:shadow-md transition"
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(report.title, 'PDF')}
                    className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs font-medium rounded-md hover:shadow-md transition"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    PDF
                  </button>
                  <button
                    onClick={() => handleDownload(report.title, 'Excel')}
                    className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-700 text-white text-xs font-medium rounded-md hover:shadow-md transition"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Excel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Report Generator */}
      <div className="rounded-xl shadow-md bg-gradient-to-br from-teal-50 to-blue-100">
        <div className="px-6 py-4 border-b border-teal-200 bg-gradient-to-r from-teal-200 to-blue-200 rounded-t-xl">
          <h3 className="text-lg font-semibold text-gray-900">
            Custom Report Generator
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Report Type
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500">
                <option>Select report type</option>
                <option>Attendance Summary</option>
                <option>Grievance Analysis</option>
                <option>Performance Metrics</option>
                <option>Welfare Statistics</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Date Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                  defaultValue="2024-01-01"
                />
                <input
                  type="date"
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                  defaultValue="2024-01-27"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Contractors
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500">
                <option>All Contractors</option>
                <option>ABC Cleaning Services</option>
                <option>City Maintenance Corp</option>
                <option>Urban Sanitation Ltd</option>
                <option>Metro Clean Solutions</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition">
              Preview
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-md hover:shadow-md transition">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
