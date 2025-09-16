"use client";
import React, { useState } from "react";
import DashboardCard from "@/components/dashboard/dashboard-card";
import DataTable from "@/components/ui/data-table";
import {
  MessageSquare,
  CheckCircle,
  Clock,
  AlertTriangle,
  Timer,
  Eye,
} from "lucide-react";

const Grievances = () => {
  const [activeTab, setActiveTab] = useState<"summary" | "escalated">("summary");

  const kpiData = [
    { title: "Total Grievances", value: 892, icon: MessageSquare, color: "blue" as const },
    { title: "Resolved", value: 654, icon: CheckCircle, color: "green" as const },
    { title: "Pending", value: 186, icon: Clock, color: "orange" as const },
    { title: "Escalated", value: 52, icon: AlertTriangle, color: "red" as const },
    { title: "Avg. Resolution Time", value: "4.2 days", icon: Timer, color: "purple" as const },
  ];

  const districtData = [
    { district: "Mumbai", total: 145, resolved: 128, pending: 12, escalated: 5, avgTime: "3.8 days" },
    { district: "Pune", total: 98, resolved: 82, pending: 14, escalated: 2, avgTime: "4.1 days" },
    { district: "Nashik", total: 76, resolved: 65, pending: 8, escalated: 3, avgTime: "3.9 days" },
    { district: "Nagpur", total: 112, resolved: 89, pending: 18, escalated: 5, avgTime: "4.5 days" },
    { district: "Aurangabad", total: 67, resolved: 54, pending: 9, escalated: 4, avgTime: "4.2 days" },
    { district: "Kolhapur", total: 89, resolved: 71, pending: 13, escalated: 5, avgTime: "4.0 days" },
    { district: "Solapur", total: 54, resolved: 48, pending: 5, escalated: 1, avgTime: "3.7 days" },
    { district: "Ahmednagar", total: 78, resolved: 62, pending: 12, escalated: 4, avgTime: "4.3 days" },
  ];

  const escalatedData = [
    { id: "GRV001", district: "Mumbai", officer: "Rajesh Kumar", dateRaised: "2024-01-10", daysPending: 15, status: "Under Review" },
    { id: "GRV002", district: "Pune", officer: "Priya Sharma", dateRaised: "2024-01-08", daysPending: 17, status: "Awaiting Response" },
    { id: "GRV003", district: "Nagpur", officer: "Amit Patel", dateRaised: "2024-01-12", daysPending: 13, status: "In Progress" },
    { id: "GRV004", district: "Nashik", officer: "Sunita Desai", dateRaised: "2024-01-06", daysPending: 19, status: "Urgent" },
  ];

  const districtColumns = [
    { key: "district", header: "District", sortable: true },
    { key: "total", header: "Total", sortable: true },
    {
      key: "resolved",
      header: "Resolved",
      sortable: true,
      render: (value: number) => <span className="text-green-600 font-medium">{value}</span>,
    },
    {
      key: "pending",
      header: "Pending",
      sortable: true,
      render: (value: number) => <span className="text-yellow-600 font-medium">{value}</span>,
    },
    {
      key: "escalated",
      header: "Escalated",
      sortable: true,
      render: (value: number) => <span className="text-red-600 font-medium">{value}</span>,
    },
    { key: "avgTime", header: "Avg Resolution Time", sortable: true },
    {
      key: "action",
      header: "Action",
      render: () => (
        <button className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
          <Eye className="w-4 h-4" />
          <span>View Officers</span>
        </button>
      ),
    },
  ];

  const escalatedColumns = [
    { key: "id", header: "Grievance ID", sortable: true },
    { key: "district", header: "District", sortable: true },
    { key: "officer", header: "Nodal Officer", sortable: true },
    { key: "dateRaised", header: "Date Raised", sortable: true },
    {
      key: "daysPending",
      header: "Days Pending",
      sortable: true,
      render: (value: number) => (
        <span className={`font-medium ${value > 15 ? "text-red-600" : "text-yellow-600"}`}>
          {value} days
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => {
        const colors = {
          "Under Review": "bg-blue-100 text-blue-800",
          "Awaiting Response": "bg-yellow-100 text-yellow-800",
          "In Progress": "bg-green-100 text-green-800",
          Urgent: "bg-red-100 text-red-800",
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value as keyof typeof colors]}`}>
            {value}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 bg-gradient-to-br from-indigo-50 via-cyan-50 to-pink-50 min-h-screen p-6 rounded-xl">
      {/* Page Header */}
      <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-md border border-indigo-100">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Grievances Management</h1>
        <p className="text-gray-600 mt-1">Track and resolve grievances across all districts</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {kpiData.map((kpi, index) => (
          <DashboardCard key={index} title={kpi.title} value={kpi.value} icon={kpi.icon} color={kpi.color} />
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white/70 backdrop-blur-md rounded-xl shadow-sm px-4">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("summary")}
            className={`py-3 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "summary"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            District Summary
          </button>
          <button
            onClick={() => setActiveTab("escalated")}
            className={`py-3 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "escalated"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Escalated Grievances
          </button>
        </nav>
      </div>

      {/* Table Styling */}
      <style>{`
        .excel-table {
          border-radius: 14px;
          overflow: hidden;
          border: 2px solid #222;
          box-shadow: 0 4px 16px 0 rgba(34,34,34,0.10);
        }
        .excel-table thead tr {
          background: linear-gradient(90deg, #6366f1 0%, #06b6d4 100%);
        }
        .excel-table th {
          font-weight: 700;
          color: #fff;
          border-bottom: 2.5px solid #a5b4fc;
          padding: 14px 18px;
          letter-spacing: 0.5px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.08);
        }
        .excel-table td {
          padding: 13px 18px;
          border-bottom: 1.5px solid #e0e7ff;
          background: #fff;
        }
        .excel-table tbody tr:hover td {
          background: #f0fdfa;
          transition: background 0.2s;
        }
        .excel-table td, .excel-table th {
          border-right: 1.5px solid #e0e7ff;
        }
        .excel-table td:last-child, .excel-table th:last-child {
          border-right: none;
        }
      `}</style>

      {/* Content */}
      {activeTab === "summary" ? (
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-indigo-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">District-wise Breakdown</h2>
          <div className="excel-table">
            <DataTable title="District-wise Breakdown" columns={districtColumns} data={districtData} tableClassName="excel-table" />
          </div>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-indigo-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Escalated Grievances List</h2>
          <div className="excel-table">
            <DataTable title="Escalated Grievances List" columns={escalatedColumns} data={escalatedData} tableClassName="excel-table" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Grievances;
