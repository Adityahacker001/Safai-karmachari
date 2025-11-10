"use client";

import React from "react";
import DataTable from "@/components/ui/data-table";
import StatCard from "@/components/ui/stat-card";
import { Users, UserCheck, UserX, Clock } from "lucide-react";

const UserManagement = () => {
  const users = [
    {
      userId: "USR-001",
      name: "Abishek Kumar",
      role: "Contractor",
      company: "ABC Cleaning Services",
      status: "Active",
      lastLogin: "2024-01-27",
      joinDate: "2023-06-15",
    },
    {
      userId: "USR-003",
      name: "Amit Singh",
      role: "Contractor",
      company: "Metro Clean Solutions",
      status: "Pending Approval",
      lastLogin: "Never",
      joinDate: "2024-01-25",
    },
    {
      userId: "USR-005",
      name: "Mohd. Ali",
      role: "Contractor",
      company: "Green Earth Services",
      status: "Suspended",
      lastLogin: "2024-01-20",
      joinDate: "2023-04-18",
    },
  ];

  const userColumns = [
    { key: "userId", header: "User ID" },
    { key: "name", header: "Name" },
    { key: "role", header: "Role" },
    { key: "company", header: "Company" },
    { key: "status", header: "Status" },
    { key: "lastLogin", header: "Last Login" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              User Management
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">
              Manage contractor and supervisor accounts
            </p>
          </div>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <StatCard
          title="Total Users"
          value={users.length}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Users"
          value={users.filter((u) => u.status === "Active").length}
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="Pending Approval"
          value={users.filter((u) => u.status === "Pending Approval").length}
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Suspended Users"
          value={users.filter((u) => u.status === "Suspended").length}
          icon={UserX}
          color="red"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">User List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gradient-to-r from-blue-200 to-blue-400">
              <tr>
                {userColumns.map((col, idx) => (
                  <th
                    key={idx}
                    className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800"
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, rowIdx) => (
                <tr
                  key={user.userId}
                  className={`${
                    rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-100 transition`}
                >
                  {userColumns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className="border border-gray-300 px-4 py-2 text-gray-700"
                    >
                      {(user as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
