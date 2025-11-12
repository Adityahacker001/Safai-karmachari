"use client";
import React from "react";
import DataTable from "@/components/ui/data-table";
import { ScrollText, Activity, User, Settings } from "lucide-react";
import StatCard from "@/components/ui/stat-card";

const AuditLogs = () => {
  const auditData = [
    {
      timestamp: "2024-01-20 10:30:25",
      action: "Grievance Created",
      actor: "Abishek Kumar",
      role: "District Officer",
      details: "Created grievance GRV001 for contractor ABC Ltd",
      ipAddress: "192.168.1.100",
    },
    {
      timestamp: "2024-01-20 10:15:43",
      action: "User Login",
      actor: "Priya Sharma",
      role: "Nodal Officer",
      details: "Successful login from web interface",
      ipAddress: "192.168.1.105",
    },
    {
      timestamp: "2024-01-20 09:45:12",
      action: "Directive Issued",
      actor: "System Admin",
      role: "Administrator",
      details: "Issued directive DIR002 to Mumbai District",
      ipAddress: "192.168.1.50",
    },
    {
      timestamp: "2024-01-20 09:30:08",
      action: "User Updated",
      actor: "System Admin",
      role: "Administrator",
      details: "Updated role for user USR003 from Pending to Active",
      ipAddress: "192.168.1.50",
    },
    {
      timestamp: "2024-01-20 08:55:32",
      action: "Report Generated",
      actor: "Amit Patel",
      role: "Contractor",
      details: "Generated Monthly Grievance Summary report",
      ipAddress: "192.168.1.112",
    },
    {
      timestamp: "2024-01-20 08:30:15",
      action: "PPE Distribution Updated",
      actor: "Sunita Desai",
      role: "Nodal Officer",
      details: "Updated PPE distribution status for Nashik district",
      ipAddress: "192.168.1.108",
    },
    {
      timestamp: "2024-01-19 17:45:22",
      action: "Grievance Resolved",
      actor: "Mohammed Ali",
      role: "District Officer",
      details: "Marked grievance GRV042 as resolved",
      ipAddress: "192.168.1.102",
    },
    {
      timestamp: "2024-01-19 16:20:35",
      action: "User Deactivated",
      actor: "System Admin",
      role: "Administrator",
      details: "Deactivated user USR087 due to inactivity",
      ipAddress: "192.168.1.50",
    },
    {
      timestamp: "2024-01-19 15:10:18",
      action: "Training Record Updated",
      actor: "Kavita Singh",
      role: "Contractor",
      details: "Updated training completion for 25 workers",
      ipAddress: "192.168.1.115",
    },
    {
      timestamp: "2024-01-19 14:55:44",
      action: "Recognition Score Updated",
      actor: "System",
      role: "System",
      details: "Automated update of recognition scores for all districts",
      ipAddress: "System",
    },
  ];

  const getActionIcon = (action: string) => {
    if (action.includes("Login") || action.includes("User"))
      return <User className="w-4 h-4" />;
    if (action.includes("Updated") || action.includes("Generated"))
      return <Settings className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const getActionColor = (action: string) => {
    if (action.includes("Login")) return "bg-blue-100 text-blue-800";
    if (action.includes("Created") || action.includes("Issued"))
      return "bg-green-100 text-green-800";
    if (action.includes("Updated")) return "bg-yellow-100 text-yellow-800";
    if (action.includes("Deactivated") || action.includes("Deleted"))
      return "bg-red-100 text-red-800";
    if (action.includes("Resolved")) return "bg-purple-100 text-purple-800";
    return "bg-gray-100 text-gray-800";
  };

  const columns = [
    {
      key: "timestamp",
      header: "Timestamp",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm">
          <div className="font-medium text-gray-900">
            {new Date(value).toLocaleDateString()}
          </div>
          <div className="text-gray-500">
            {new Date(value).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      key: "action",
      header: "Action",
      sortable: true,
      render: (value: string) => {
        let borderColor = "";
        if (value.includes("Login"))
          borderColor = "border-l-4 border-blue-400";
        else if (value.includes("Created") || value.includes("Issued"))
          borderColor = "border-l-4 border-green-400";
        else if (value.includes("Updated"))
          borderColor = "border-l-4 border-yellow-400";
        else if (value.includes("Deactivated") || value.includes("Deleted"))
          borderColor = "border-l-4 border-red-400";
        else if (value.includes("Resolved"))
          borderColor = "border-l-4 border-purple-400";
        else borderColor = "border-l-4 border-gray-200";
        return (
          <div
            className={`flex items-center space-x-2 pl-2 ${borderColor} bg-white/80 rounded-lg py-1`}
          >
            <div className={`p-1 rounded ${getActionColor(value)}`}>
              {getActionIcon(value)}
            </div>
            <span className="text-sm font-medium">{value}</span>
          </div>
        );
      },
    },
    {
      key: "actor",
      header: "Actor",
      sortable: true,
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: "details",
      header: "Details",
      render: (value: string) => (
        <div
          className="text-sm text-gray-600 max-w-md truncate"
          title={value}
        >
          {value}
        </div>
      ),
    },
    {
      key: "ipAddress",
      header: "IP Address",
      render: (value: string) => (
        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{value}</code>
      ),
    },
  ];

  return (
    <div className="space-y-6 min-h-screen w-full p-6 md:p-10">
      <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">Audit Logs</h1>
            <p className="text-sm text-white/90">Track all system activities and user actions</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 hidden md:block" aria-hidden />
        </div>
      </div>

      {/* Stats Cards (replaced with reusable StatCard component) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Events" value={"1,247"} icon={ScrollText} color="indigo" />
        <StatCard title="Today's Events" value={89} icon={Activity} color="emerald" />
        <StatCard title="Active Users" value={34} icon={User} color="violet" />
        <StatCard title="Failed Attempts" value={3} icon={Settings} color="red" />
      </div>

      {/* Activity Summary */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 p-6 rounded-2xl border border-gray-200 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Activity Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 p-4 shadow-md">
            <div className="text-2xl font-bold text-blue-700">45</div>
            <div className="text-sm text-gray-700">User Logins</div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-100 to-green-200 p-4 shadow-md">
            <div className="text-2xl font-bold text-green-700">23</div>
            <div className="text-sm text-gray-700">Data Updates</div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 shadow-md">
            <div className="text-2xl font-bold text-yellow-700">12</div>
            <div className="text-sm text-gray-700">Reports Generated</div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-100 to-purple-200 p-4 shadow-md">
            <div className="text-2xl font-bold text-purple-700">8</div>
            <div className="text-sm text-gray-700">Grievances Processed</div>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-red-100 to-red-200 p-4 shadow-md">
            <div className="text-2xl font-bold text-red-700">1</div>
            <div className="text-sm text-gray-700">Admin Actions</div>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <style>{`
        .excel-audit-table {
          border-radius: 14px;
          overflow: hidden;
          border: 1.5px solid #c7d2fe;
          box-shadow: 0 4px 16px 0 rgba(99,102,241,0.10);
        }
        .excel-audit-table thead tr {
          background: linear-gradient(90deg, #e0e7ff 0%, #f0fdfa 100%);
        }
        .excel-audit-table th {
          font-weight: 700;
          color: #374151;
          border-bottom: 2px solid #c7d2fe;
          padding: 13px 16px;
        }
        .excel-audit-table td {
          padding: 13px 16px;
          border-bottom: 1px solid #f3f4f6;
          background: #fff;
        }
        .excel-audit-table tbody tr:nth-child(even) td {
          background: #f9fafb;
        }
        .excel-audit-table tbody tr:nth-child(odd) td {
          background: #fff;
        }
        .excel-audit-table tbody tr:hover td {
          background: #e0f2fe;
          color: #1e293b;
          transition: background 0.2s, color 0.2s;
        }
        .excel-audit-table td, .excel-audit-table th {
          border-right: 1px solid #e0e7ff;
        }
        .excel-audit-table td:last-child, .excel-audit-table th:last-child {
          border-right: none;
        }
      `}</style>
      <div className="excel-audit-table">
        <DataTable title="Audit Logs" columns={columns} data={auditData} tableClassName="excel-audit-table" />
      </div>
    </div>
  );
};

export default AuditLogs;
