"use client";
import React, { useState } from "react";
import DataTable from "@/components/ui/data-table";
import StatCard from "@/components/ui/stat-card";
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
  Search
} from "lucide-react";

// Dummy data for demonstration
const auditData = [
  {
    timestamp: "2025-12-12 10:15:00",
    action: "Login",
    actor: "John Doe",
    role: "Admin",
    details: "User logged in successfully."
  },
  {
    timestamp: "2025-12-12 11:00:00",
    action: "Created",
    actor: "Jane Smith",
    role: "Nodal Officer",
    details: "Created new user account."
  },
  {
    timestamp: "2025-12-12 12:30:00",
    action: "Updated",
    actor: "Alice Brown",
    role: "Super Admin",
    details: "Updated system settings."
  },
  {
    timestamp: "2025-12-12 13:45:00",
    action: "Resolved",
    actor: "Bob Lee",
    role: "Admin",
    details: "Resolved grievance ticket."
  },
  {
    timestamp: "2025-12-12 14:20:00",
    action: "Issued",
    actor: "Charlie Green",
    role: "Nodal Officer",
    details: "Issued directive to team."
  }
];

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("today");
  const [actionFilter, setActionFilter] = useState("all");

  // Filter logic
  const filteredAuditData = auditData.filter((item) => {
    const matchesSearch =
      item.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction =
      actionFilter === "all" ||
      item.action.toLowerCase().includes(actionFilter.toLowerCase());

    return matchesSearch && matchesAction;
  });

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
    <div className="min-h-screen space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Professional Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white drop-shadow-2xl leading-tight">
              Audit Logs
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-bold drop-shadow-lg mt-2">
              System activity monitoring and security audit trail
            </p>
          </div>
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover:scale-105 hover:shadow-xl transition-all flex items-center space-x-2 border border-white/30 text-sm sm:text-base md:text-lg font-medium">
            <Download className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"/>
            <span>Export Logs</span>
          </button>
        </div>
      </header>

      {/* Activity Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        <StatCard
          title="Total Activities"
          value="1,247"
          icon={Activity}
          color="indigo"
        />
        <StatCard
          title="Today"
          value="156"
          icon={Clock}
          color="sky"
        />
        <StatCard
          title="Login Events"
          value="89"
          icon={LogIn}
          color="emerald"
        />
        <StatCard
          title="System Changes"
          value="24"
          icon={Settings2}
          color="amber"
        />
      </div>

      {/* Filters */}
      <div className="backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-4 sm:p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search activities, users, details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 sm:pl-12 md:pl-14 pr-4 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm placeholder-gray-500 font-medium"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                <span className="text-sm sm:text-base font-semibold text-gray-700">
                  Date Range:
                </span>
              </div>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium min-w-[140px]"
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                <span className="text-sm sm:text-base font-semibold text-gray-700">Action:</span>
              </div>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium min-w-[140px]"
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
          <div className="text-sm sm:text-base text-gray-600 font-bold text-center lg:text-right bg-gray-50 px-4 py-2 rounded-xl">
            Showing {filteredAuditData.length} of {auditData.length} activities
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <DataTable
            title="System Activity Log"
            columns={columns}
            data={filteredAuditData}
            actions={false}
            headerClassName="bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 font-bold text-sm sm:text-base"
            rowClassName="even:bg-blue-50/30 odd:bg-white hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-colors text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Security Insights */}
      <div className="backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-800 mb-6 sm:mb-8">
          Security Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100/50 backdrop-blur-sm border border-green-200/50 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <div className="flex items-start gap-3 sm:gap-4">
              <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-green-900">Normal Activity</h4>
                <p className="text-sm sm:text-base text-green-700 mt-2 font-medium">
                  No suspicious activities detected in the last 24 hours.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-100/50 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <div className="flex items-start gap-3 sm:gap-4">
              <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-blue-900">Peak Hours</h4>
                <p className="text-sm sm:text-base text-blue-700 mt-2 font-medium">
                  Highest activity today between 2 PM - 4 PM.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-100/50 backdrop-blur-sm border border-amber-200/50 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <div className="flex items-start gap-3 sm:gap-4">
              <AlertTriangle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-amber-900">
                  Multiple Logins
                </h4>
                <p className="text-sm sm:text-base text-amber-700 mt-2 font-medium">
                  3 users with multiple concurrent sessions detected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
