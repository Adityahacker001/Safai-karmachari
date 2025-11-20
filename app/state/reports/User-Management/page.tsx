"use client";
import React from "react";
import DataTable from "@/components/ui/data-table";
import StatCard from "@/components/ui/stat-card";
import { Users, Plus, CheckCircle, XCircle, Clock, Eye } from "lucide-react";

const UserManagement = () => {
  const userData = [
    {
      id: "USR001",
      name: "Abishek Kumar",
      role: "District Officer",
      district: "Mumbai",
      status: "Active",
      lastLogin: "2024-01-20 10:30 AM",
      email: "abishek.kumar@gov.in",
    },
    {
      id: "USR002",
      name: "Priya Sharma",
      role: "Nodal Officer",
      district: "Pune",
      status: "Active",
      lastLogin: "2024-01-20 09:15 AM",
      email: "priya.sharma@gov.in",
    },
    {
      id: "USR003",
      name: "Amit Patel",
      role: "Contractor",
      district: "Nagpur",
      status: "Pending",
      lastLogin: "Never",
      email: "amit.patel@contractor.com",
    },
    {
      id: "USR004",
      name: "Sunita Desai",
      role: "Nodal Officer",
      district: "Nashik",
      status: "Active",
      lastLogin: "2024-01-19 04:45 PM",
      email: "sunita.desai@gov.in",
    },
    {
      id: "USR005",
      name: "Mohammed Ali",
      role: "District Officer",
      district: "Aurangabad",
      status: "Inactive",
      lastLogin: "2024-01-15 11:20 AM",
      email: "mohammed.ali@gov.in",
    },
    {
      id: "USR006",
      name: "Kavita Singh",
      role: "Contractor",
      district: "Kolhapur",
      status: "Active",
      lastLogin: "2024-01-20 08:30 AM",
      email: "kavita.singh@contractor.com",
    },
  ];

  const getRoleColor = (role: string) => {
    const colors = {
      "District Officer": "bg-blue-100 text-blue-800",
      "Nodal Officer": "bg-green-100 text-green-800",
      Contractor: "bg-purple-100 text-purple-800",
    };
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  // IntegratedLoader (inline copy) — do not modify anything else in this file
  const IntegratedLoader: React.FC = () => (
    <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
      <style jsx>{`
        .loader {
          --c: no-repeat linear-gradient(#4f46e5 0 0);
          background: 
            var(--c),var(--c),var(--c),
            var(--c),var(--c),var(--c),
            var(--c),var(--c),var(--c);
          background-size: 16px 16px;
          animation: 
            l32-1 1s infinite,
            l32-2 1s infinite;
        }
        @keyframes l32-1 {
          0%,100% {width:45px;height: 45px}
          35%,65% {width:65px;height: 65px}
        }
        @keyframes l32-2 {
          0%,40%  {background-position: 0 0,0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,  50% 50% }
          60%,100%{background-position: 0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,0 0,  50% 50% }
        }
      `}</style>
      <div className="loader"></div>
    </div>
  );

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <IntegratedLoader />;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Inactive":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const columns = [
    { key: "id", header: "User ID", sortable: true },
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email", sortable: true },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
            value
          )}`}
        >
          {value}
        </span>
      ),
    },
    { key: "district", header: "District", sortable: true },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          {getStatusIcon(value)}
          <span
            className={`text-sm font-medium ${
              value === "Active"
                ? "text-green-600"
                : value === "Inactive"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {value}
          </span>
        </div>
      ),
    },
    { key: "lastLogin", header: "Last Login", sortable: true },
    {
      key: "action",
        header: "Actions",
        // receive both cell value and full row (data-table now passes row as second arg)
        render: (_value: any, row: any) => (
          <div className="flex space-x-2">
            <button
              className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors text-sm"
              onClick={() => alert(`Viewing user: ${row.name}`)}
            >
              <Eye className="w-3 h-3" />
              <span>View</span>
            </button>
            <button
              className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-colors text-sm"
              onClick={() => alert(`Editing user: ${row.name}`)}
            >
              <span>Edit</span>
            </button>
          </div>
        ),
      },
  ];

  const actionButton = (
    <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-md">
      <Plus className="w-4 h-4" />
      <span>Add New User</span>
    </button>
  );

  return (
    <div className="space-y-6 min-h-screen w-full p-6 md:p-10">
      <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">User Management</h1>
            <p className="text-sm text-white/90">Manage users, roles, and permissions</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 hidden md:block" aria-hidden />
        </div>
      </div>
      <div className="flex justify-end">
        <button 
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg transform hover:scale-105"
          onClick={() => alert('Add New User functionality')}
        >
          <Plus className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Stats Cards (replaced with reusable StatCard component) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={userData.length}
          icon={Users}
          color="indigo"
        />

        <StatCard
          title="Active Users"
          value={userData.filter((user) => user.status === "Active").length}
          icon={CheckCircle}
          color="emerald"
        />

        <StatCard
          title="Pending Approval"
          value={userData.filter((user) => user.status === "Pending").length}
          icon={Clock}
          color="amber"
        />

        <StatCard
          title="Inactive Users"
          value={userData.filter((user) => user.status === "Inactive").length}
          icon={XCircle}
          color="red"
        />
      </div>

      {/* Role Distribution */}
      {/* <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 p-6 rounded-xl border border-gray-200 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Role Distribution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-orange-200 via-yellow-100 to-pink-200 rounded-lg shadow-lg">
            <p className="text-2xl font-bold text-orange-700 drop-shadow-sm">
              {userData.filter((user) => user.role === "District Officer").length}
            </p>
            <p className="text-sm font-semibold text-orange-900 mt-1">District Officers</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-teal-200 via-cyan-100 to-blue-200 rounded-lg shadow-lg">
            <p className="text-2xl font-bold text-teal-700 drop-shadow-sm">
              {userData.filter((user) => user.role === "Nodal Officer").length}
            </p>
            <p className="text-sm font-semibold text-teal-900 mt-1">Nodal Officers</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-fuchsia-200 via-pink-100 to-indigo-200 rounded-lg shadow-lg">
            <p className="text-2xl font-bold text-fuchsia-700 drop-shadow-sm">
              {userData.filter((user) => user.role === "Contractor").length}
            </p>
            <p className="text-sm font-semibold text-fuchsia-900 mt-1">Contractors</p>
          </div>
        </div>
      </div> */}

      {/* Users Table */}
      <style>{`
        .excel-table {
          border-radius: 12px;
          overflow: hidden;
          border: 1.5px solid #e5e7eb;
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
        }
        /* Darker, district-dashboard style header */
        .excel-table thead tr {
          background: linear-gradient(90deg, #4f46e5 0%, #8b5cf6 100%);
        }
        .excel-table th {
          font-weight: 600;
          color: #ffffff;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 12px 16px;
        }
        .excel-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #f3f4f6;
          background: #fff;
        }
        .excel-table tbody tr:nth-child(even) td {
          background: #f9fafb;
        }
        .excel-table tbody tr:nth-child(odd) td {
          background: #fff;
        }
        .excel-table tbody tr:hover td {
          background: #e0f2fe;
          transition: background 0.2s;
        }
        .excel-table td, .excel-table th {
          border-right: 1px solid #e0e7ff;
        }
        .excel-table td:last-child, .excel-table th:last-child {
          border-right: none;
        }
        .excel-table tbody tr:focus-within td, .excel-table tbody tr:active td {
          outline: 2px solid #6366f1;
          outline-offset: -2px;
        }
      `}</style>
      <div className="excel-table">
        <DataTable
          title="User Management"
          columns={columns}
          data={userData}
          tableClassName="excel-table"
        />
      </div>
    </div>
  );
};

export default UserManagement;
