"use client";
import React, { useState } from "react";
import DataTable from "@/components/ui/data-table";
import {
  Calendar,
  Filter,
  Download,
  Activity,
  Clock,
  LogIn,
  Settings2,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const AuditLogs: React.FC = () => {
  const [dateRange, setDateRange] = useState("7days");
  const [actionFilter, setActionFilter] = useState("all");

  const auditData = [
    {
      timestamp: "2025-09-16 17:15:25",
      action: "Grievance Created",
      actor: "Rajesh Kumar",
      role: "Nodal Officer",
      details:
        "Created grievance GRV-2025-045 for contractor Clean City Services",
    },
    {
      timestamp: "2025-09-16 16:30:12",
      action: "Directive Issued",
      actor: "District Admin",
      role: "Admin",
      details: "Issued directive DIR-2025-008 to all Zone A officers",
    },
    {
      timestamp: "2025-09-16 15:45:08",
      action: "User Login",
      actor: "Priya Sharma",
      role: "Nodal Officer",
      details: "Successful login from Zone B office",
    },
    {
      timestamp: "2025-09-16 14:20:33",
      action: "Report Generated",
      actor: "Amit Singh",
      role: "Nodal Officer",
      details: "Generated monthly welfare report for Zone C",
    },
    {
      timestamp: "2025-09-16 13:55:17",
      action: "User Role Updated",
      actor: "System Admin",
      role: "Super Admin",
      details:
        "Updated role for user Clean City Services to Active Contractor",
    },
    {
      timestamp: "2025-09-16 12:30:44",
      action: "Grievance Resolved",
      actor: "Rajesh Kumar",
      role: "Nodal Officer",
      details:
        "Resolved grievance GRV-2025-042 with contractor acknowledgment",
    },
  ];

  const columns = [
    {
      key: "timestamp",
      header: "Timestamp",
      render: (value: any) => (
        <div className="p-3 text-sm text-gray-700">{value}</div>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (value: any) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
            value.includes("Login")
              ? "bg-blue-100 text-blue-800"
              : value.includes("Created") || value.includes("Issued")
              ? "bg-emerald-100 text-emerald-800"
              : value.includes("Resolved")
              ? "bg-purple-100 text-purple-800"
              : value.includes("Updated")
              ? "bg-amber-100 text-amber-800"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "actor",
      header: "User",
      render: (value: any) => (
        <div className="p-3 font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (value: any) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize shadow-sm ${
            value === "Admin" || value === "Super Admin"
              ? "bg-red-100 text-red-800"
              : value === "Nodal Officer"
              ? "bg-cyan-100 text-cyan-800"
              : "bg-slate-100 text-slate-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "details",
      header: "Details",
      render: (value: any) => (
        <div className="p-3 text-sm text-gray-600">{value}</div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 space-y-8 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Audit Logs
        </h1>
        <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2.5 rounded-lg hover:shadow-lg flex items-center gap-2 transition">
          <Download className="h-4 w-4" />
          Export Logs
        </button>
      </div>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Activities",
            value: "1,247",
            icon: Activity,
            color: "from-indigo-400 to-indigo-600",
          },
          {
            title: "Today",
            value: "156",
            icon: Clock,
            color: "from-sky-400 to-sky-600",
          },
          {
            title: "Login Events",
            value: "89",
            icon: LogIn,
            color: "from-emerald-400 to-emerald-600",
          },
          {
            title: "System Changes",
            value: "24",
            icon: Settings2,
            color: "from-amber-400 to-amber-600",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${stat.color} text-white rounded-xl shadow-md p-6 hover:shadow-xl transition transform hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 opacity-90" />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Date Range:
              </span>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Action:</span>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Actions</option>
                <option value="login">Login Events</option>
                <option value="grievance">Grievance Actions</option>
                <option value="directive">Directive Actions</option>
                <option value="user">User Management</option>
                <option value="report">Report Generation</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-600 font-medium">
            Showing {auditData.length} of 1,247 activities
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-xl border border-gray-300 bg-white shadow-lg overflow-hidden">
        <DataTable
          title="System Activity Log"
          columns={columns}
          data={auditData}
          actions={false}
          headerClassName="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 font-semibold"
          rowClassName="even:bg-slate-50 hover:bg-slate-100 transition"
        />
      </div>

      {/* Security Insights */}
      <div className="bg-gradient-to-br from-white via-slate-50 to-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          Security Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-100 border border-green-200 rounded-xl p-5 shadow hover:shadow-md transition">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <div>
                <h4 className="font-semibold text-green-900">Normal Activity</h4>
                <p className="text-sm text-green-700 mt-1">
                  No suspicious activities detected in the last 24 hours.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-blue-100 border border-blue-200 rounded-xl p-5 shadow hover:shadow-md transition">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-900">Peak Hours</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Highest activity today between 2 PM - 4 PM.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-amber-100 border border-amber-200 rounded-xl p-5 shadow hover:shadow-md transition">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
              <div>
                <h4 className="font-semibold text-amber-900">
                  Multiple Logins
                </h4>
                <p className="text-sm text-amber-700 mt-1">
                  3 users with multiple concurrent sessions detected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
