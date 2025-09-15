"use client";
import React from 'react';
import { UserCheck, UserX, Edit } from 'lucide-react';
import DashboardLayout from '@/components/layout/dashboard-layout';

const UserManagement: React.FC = () => {
  const userData = [
    { id: 'WK001', name: 'Ramesh Kumar', status: 'Active', lastAttendance: '2024-01-15', role: 'Sanitation Worker', shift: 'Morning' },
    { id: 'WK002', name: 'Priya Sharma', status: 'Active', lastAttendance: '2024-01-15', role: 'Sanitation Worker', shift: 'Evening' },
    { id: 'WK003', name: 'Suresh Yadav', status: 'Inactive', lastAttendance: '2024-01-10', role: 'Sanitation Worker', shift: 'Morning' },
    { id: 'WK004', name: 'Anita Devi', status: 'Active', lastAttendance: '2024-01-15', role: 'Sanitation Worker', shift: 'Morning' },
    { id: 'WK005', name: 'Mohan Lal', status: 'Active', lastAttendance: '2024-01-15', role: 'Sanitation Worker', shift: 'Evening' },
    { id: 'SUP001', name: 'Vikram Singh', status: 'Active', lastAttendance: '2024-01-15', role: 'Supervisor', shift: 'Full Day' }
  ];
  const columns = [
    { key: 'id', header: 'Worker ID' },
    { key: 'name', header: 'Worker Name' },
    { key: 'role', header: 'Role' },
    { key: 'shift', header: 'Shift' },
    { key: 'status', header: 'Status' },
    { key: 'lastAttendance', header: 'Last Attendance' }
  ];
  const getStatusBadge = (status: string) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{status}</span>
  );
  const getRoleBadge = (role: string) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${role === 'Supervisor' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>{role}</span>
  );
  return (
    <DashboardLayout role="contractor" name="Contractor Dashboard">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Add New Worker</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200"><div className="flex items-center space-x-3"><UserCheck className="w-6 h-6 text-green-600" /><div><p className="text-sm font-medium text-gray-500">Active Workers</p><p className="text-2xl font-bold text-green-600">45</p></div></div></div>
          <div className="bg-white p-6 rounded-lg border border-gray-200"><div className="flex items-center space-x-3"><UserX className="w-6 h-6 text-red-600" /><div><p className="text-sm font-medium text-gray-500">Inactive Workers</p><p className="text-2xl font-bold text-red-600">1</p></div></div></div>
          <div className="bg-white p-6 rounded-lg border border-gray-200"><div className="flex items-center space-x-3"><UserCheck className="w-6 h-6 text-blue-600" /><div><p className="text-sm font-medium text-gray-500">Supervisors</p><p className="text-2xl font-bold text-blue-600">1</p></div></div></div>
          <div className="bg-white p-6 rounded-lg border border-gray-200"><div className="flex items-center space-x-3"><UserCheck className="w-6 h-6 text-purple-600" /><div><p className="text-sm font-medium text-gray-500">Total Users</p><p className="text-2xl font-bold text-purple-600">46</p></div></div></div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">User List</h2>
            <div className="flex space-x-2">
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"><option>All Roles</option><option>Sanitation Worker</option><option>Supervisor</option></select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"><option>All Status</option><option>Active</option><option>Inactive</option></select>
            </div>
          </div>
          {/* Table UI copied from national dashboard, adapted for user data */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200/80">
                  <th className="text-left p-4 text-sm font-semibold text-slate-600">Worker ID</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-600">Worker Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-600">Role</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-600">Shift</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-600">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-600">Last Attendance</th>
                  <th className="text-right p-4 text-sm font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200/50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 text-sm text-slate-700 whitespace-nowrap">{row.id}</td>
                    <td className="p-4 text-sm font-medium text-slate-800">{row.name}</td>
                    <td className="p-4">{getRoleBadge(row.role)}</td>
                    <td className="p-4 text-sm text-slate-700">{row.shift}</td>
                    <td className="p-4">{getStatusBadge(row.status)}</td>
                    <td className="p-4 text-sm text-slate-700">{row.lastAttendance}</td>
                    <td className="p-4 text-right">
                      <div className="flex space-x-2 justify-end">
                        <button className="text-blue-600 hover:text-blue-800"><Edit className="w-4 h-4" /></button>
                        <button className={`px-3 py-1 rounded text-xs font-medium ${row.status === 'Active' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}>{row.status === 'Active' ? 'Deactivate' : 'Activate'}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200"><h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3><div className="space-y-3"><button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"><div className="font-medium text-gray-900">Bulk Status Update</div><div className="text-sm text-gray-500">Update status for multiple workers</div></button><button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"><div className="font-medium text-gray-900">Import Workers</div><div className="text-sm text-gray-500">Upload worker list from Excel/CSV</div></button><button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"><div className="font-medium text-gray-900">Export User List</div><div className="text-sm text-gray-500">Download complete user database</div></button></div></div>
          <div className="bg-white p-6 rounded-lg border border-gray-200"><h3 className="text-lg font-semibold text-gray-900 mb-4">User Statistics</h3><div className="space-y-3"><div className="flex justify-between items-center"><span className="text-sm text-gray-600">Morning Shift Workers</span><span className="text-sm font-medium">25</span></div><div className="flex justify-between items-center"><span className="text-sm text-gray-600">Evening Shift Workers</span><span className="text-sm font-medium">20</span></div><div className="flex justify-between items-center"><span className="text-sm text-gray-600">Full Day Staff</span><span className="text-sm font-medium">1</span></div><div className="flex justify-between items-center"><span className="text-sm text-gray-600">New Joiners This Month</span><span className="text-sm font-medium">3</span></div><div className="flex justify-between items-center"><span className="text-sm text-gray-600">Pending Verifications</span><span className="text-sm font-medium">0</span></div></div></div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default UserManagement;
