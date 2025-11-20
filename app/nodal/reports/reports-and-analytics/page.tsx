"use client";

import React, { useEffect, useState } from "react";
import { FileText, Download, Calendar, BarChart3 } from "lucide-react";

const Reports = () => {
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Loader shows for 800ms
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = (reportTitle: string, format: string) => {
    console.log(`Downloading ${reportTitle} in ${format} format`);
    alert(`Downloading ${reportTitle} as ${format}...`);
  };

  if (loading) {
    const IntegratedLoader = require("@/components/layout/IntegratedLoader").default;
    return <IntegratedLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Reports & Analytics
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">
              Generate and download comprehensive reports
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Available Reports</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reports.map((report, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 shadow-md">
              <h3 className="text-md font-semibold text-gray-800 mb-2">
                {report.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {report.description}
              </p>
              <p className="text-xs text-gray-500">
                Last Generated: {report.lastGenerated}
              </p>
              <p className="text-xs text-gray-500">
                Frequency: {report.frequency}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
