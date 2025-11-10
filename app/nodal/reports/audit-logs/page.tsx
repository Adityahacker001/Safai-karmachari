"use client";
import React from 'react';
import DataTable from '@/components/ui/data-table';
import { ScrollText, User, Shield, Clock } from 'lucide-react';

const AuditLogs = () => {
  const auditLogs = [
    {
      timestamp: '2024-01-27 14:30:25',
      action: 'Grievance Status Updated',
      actor: 'Abishek Kumar',
      role: 'Contractor',
      details: 'Updated grievance GRV-2024-001 from Pending to Resolved',
      ipAddress: '192.168.1.45'
    },
    {
      timestamp: '2024-01-27 13:15:10',
      action: 'User Account Created',
      actor: 'System Admin',
      role: 'Administrator',
      details: 'New contractor account created for Metro Clean Solutions',
      ipAddress: '192.168.1.10'
    },
    {
      timestamp: '2024-01-27 11:45:33',
      action: 'PPE Distribution Updated',
      actor: 'Priya Sharma',
      role: 'Worker Supervisor',
      details: 'Updated PPE distribution status for 25 workers',
      ipAddress: '192.168.1.78'
    },
    {
      timestamp: '2024-01-27 10:20:17',
      action: 'Report Downloaded',
      actor: 'Amit Singh',
      role: 'Contractor',
      details: 'Downloaded Daily Attendance Report (PDF format)',
      ipAddress: '192.168.1.55'
    },
    {
      timestamp: '2024-01-27 09:30:42',
      action: 'Training Status Updated',
      actor: 'Sunita Devi',
      role: 'Worker Supervisor',
      details: 'Marked 15 workers as completed Safety Training',
      ipAddress: '192.168.1.88'
    },
    {
      timestamp: '2024-01-26 16:45:21',
      action: 'User Login',
      actor: 'Mohd. Ali',
      role: 'Contractor',
      details: 'Successful login from mobile device',
      ipAddress: '192.168.1.99'
    },
    {
      timestamp: '2024-01-26 15:22:18',
      action: 'Directive Issued',
      actor: 'System Admin',
      role: 'Administrator',
      details: 'Issued new directive DIR-OUT-003 to Urban Sanitation Ltd',
      ipAddress: '192.168.1.10'
    },
    {
      timestamp: '2024-01-26 14:10:55',
      action: 'Recognition Score Updated',
      actor: 'Abishek Kumar',
      role: 'Contractor',
      details: 'Updated recognition scores for 30 workers',
      ipAddress: '192.168.1.45'
    },
  ];

  const logColumns = [
    { key: 'timestamp', header: 'Timestamp' },
    { key: 'action', header: 'Action' },
    { key: 'actor', header: 'User' },
    {
      key: 'role',
      header: 'Role',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Administrator' ? 'bg-purple-100 text-purple-800' :
          value === 'Contractor' ? 'bg-blue-100 text-blue-800' :
          'bg-green-100 text-green-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'details', header: 'Details' },
  ];

  const activityStats = [
    { title: 'Total Activities Today', value: '24', icon: ScrollText, color: 'from-blue-500 to-indigo-500' },
    { title: 'User Logins Today', value: '18', icon: User, color: 'from-green-500 to-emerald-500' },
    { title: 'System Changes', value: '12', icon: Shield, color: 'from-yellow-500 to-orange-500' },
    { title: 'Average Response Time', value: '1.2s', icon: Clock, color: 'from-purple-500 to-pink-500' },
  ];

  const actionTypes = [
    { type: 'User Login', count: 45, color: 'bg-blue-500' },
    { type: 'Data Update', count: 32, color: 'bg-green-500' },
    { type: 'Report Download', count: 18, color: 'bg-yellow-500' },
    { type: 'System Change', count: 12, color: 'bg-purple-500' },
    { type: 'User Creation', count: 8, color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Audit Logs</h1>
        <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">Track system activities and user actions in real-time</p>
      </div>

      {/* Activity Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        {activityStats.map((stat, index) => (
          <div key={index} className={`p-4 sm:p-6 rounded-xl shadow-lg text-white bg-gradient-to-r ${stat.color} hover:scale-105 transition-transform duration-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">{stat.title}</p>
                <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 opacity-90" />
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter Audit Logs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option>Last 24 hours</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Custom range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option>All actions</option>
              <option>User Login</option>
              <option>Data Update</option>
              <option>Report Download</option>
              <option>System Change</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Role</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option>All roles</option>
              <option>Administrator</option>
              <option>Contractor</option>
              <option>Worker Supervisor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search logs..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Activity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Activity Breakdown (Last 7 Days)</h3>
          <div className="space-y-3">
            {actionTypes.map((action, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${action.color} mr-3`}></div>
                  <span className="text-sm text-gray-700">{action.type}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{action.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Most Active Users</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <span className="text-sm font-medium text-gray-800">Abishek Kumar</span>
              <span className="text-sm font-semibold text-blue-600">18 actions</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <span className="text-sm font-medium text-gray-800">Priya Sharma</span>
              <span className="text-sm font-semibold text-green-600">15 actions</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <span className="text-sm font-medium text-gray-800">System Admin</span>
              <span className="text-sm font-semibold text-purple-600">12 actions</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <span className="text-sm font-medium text-gray-800">Amit Singh</span>
              <span className="text-sm font-semibold text-yellow-600">9 actions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-6">
          <h3 className="text-lg font-bold text-white">Recent Activity Logs</h3>
        </div>
        <div className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-blue-200">
                  {logColumns.map((col, idx) => (
                    <th key={idx} className="text-gray-700 font-semibold py-4 px-6 text-left">{col.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((row, rIdx) => (
                  <tr key={rIdx} className={`hover:bg-gray-50 transition-colors border-l-4 border-l-blue-400 ${rIdx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                    {logColumns.map((col, cIdx) => (
                      <td key={cIdx} className="py-4 px-6 border-b border-gray-200">
                        {col.render ? col.render((row as any)[col.key]) : (row as any)[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
