"use client";

import React from "react";
import DataTable from "../../../../components/ui/data-table";
import { Users, UserCheck, UserX, Clock } from "lucide-react";

interface User {
  userId: string;
  name: string;
  role: string;
  company: string;
  status: "Active" | "Pending Approval" | "Suspended";
  lastLogin: string;
  joinDate: string;
}

const UserManagement = () => {
  const users: User[] = [
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
      userId: "USR-002",
      name: "Priya Sharma",
      role: "Worker Supervisor",
      company: "City Maintenance Corp",
      status: "Active",
      lastLogin: "2024-01-26",
      joinDate: "2023-08-22",
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
      userId: "USR-004",
      name: "Sunita Devi",
      role: "Worker Supervisor",
      company: "Urban Sanitation Ltd",
      status: "Active",
      lastLogin: "2024-01-25",
      joinDate: "2023-09-10",
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
    {
      key: "role",
      header: "Role",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
            value === "Contractor"
              ? "bg-blue-200 text-blue-900"
              : "bg-green-200 text-green-900"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "company", header: "Company" },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
            value === "Active"
              ? "bg-green-200 text-green-900"
              : value === "Pending Approval"
              ? "bg-yellow-200 text-yellow-900"
              : "bg-red-200 text-red-900"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "lastLogin", header: "Last Login" },
  ];

  const userStats = [
    { title: "Total Users", value: users.length, icon: Users, color: "blue" },
    {
      title: "Active Users",
      value: users.filter((u) => u.status === "Active").length,
      icon: UserCheck,
      color: "green",
    },
    {
      title: "Pending Approval",
      value: users.filter((u) => u.status === "Pending Approval").length,
      icon: Clock,
      color: "yellow",
    },
    {
      title: "Suspended Users",
      value: users.filter((u) => u.status === "Suspended").length,
      icon: UserX,
      color: "red",
    },
  ];

  const handleApprove = (user: User) => {
    console.log("Approve user:", user.userId);
    alert(`Approving user: ${user.name}`);
  };

  const handleSuspend = (user: User) => {
    console.log("Suspend user:", user.userId);
    alert(`Suspending user: ${user.name}`);
  };

  const handleAssignRole = (user: User) => {
    console.log("Assign role to user:", user.userId);
    alert(`Assigning new role to: ${user.name}`);
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          User Management
        </h1>
        <p className="text-gray-600 mt-2">
          Manage contractor and supervisor accounts
        </p>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform border-l-4 border-${stat.color}-500 bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <stat.icon className={`w-10 h-10 text-${stat.color}-700`} />
            </div>
          </div>
        ))}
      </div>

      {/* User Management Actions */}
      <div className="rounded-xl shadow-md p-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex flex-wrap gap-4 mb-6">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md shadow hover:shadow-lg transition">
            Add New User
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-md shadow hover:shadow-lg transition">
            Bulk Approve
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-md shadow hover:shadow-lg transition">
            Export User List
          </button>
        </div>
      </div>

      {/* Users Table - Excel Style */}
      <div className="rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-green-200">
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
                  } hover:bg-yellow-100 transition`}
                >
                  {userColumns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className="border border-gray-300 px-4 py-2 text-gray-700"
                    >
                      {col.render
                        ? col.render((user as any)[col.key])
                        : (user as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="rounded-xl shadow-md bg-gradient-to-r from-purple-50 to-pink-100">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-200 to-pink-200 rounded-t-xl">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {users
              .filter((u) => u.status === "Pending Approval")
              .map((user) => (
                <div
                  key={user.userId}
                  className="border border-gray-200 rounded-lg p-4 shadow bg-white hover:shadow-lg transition"
                >
                  <h4 className="font-semibold text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-600">
                    {user.role} - {user.company}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    Applied: {user.joinDate}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(user)}
                      className="flex-1 px-3 py-1 bg-gradient-to-r from-green-500 to-green-700 text-white text-sm rounded hover:shadow-md transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleSuspend(user)}
                      className="flex-1 px-3 py-1 bg-gradient-to-r from-red-500 to-red-700 text-white text-sm rounded hover:shadow-md transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {users.filter((u) => u.status === "Pending Approval").length === 0 && (
            <p className="text-gray-600 text-center py-8">
              No pending approvals
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
