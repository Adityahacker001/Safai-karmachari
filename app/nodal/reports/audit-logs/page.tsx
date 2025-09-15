"use client";
import React from 'react';
import DataTable from '@/components/ui/data-table';
import { ScrollText, User, Shield, Clock } from 'lucide-react';

const AuditLogs = () => {
  const auditLogs = [
    {
      timestamp: '2024-01-27 14:30:25',
      action: 'Grievance Status Updated',
      actor: 'Rajesh Kumar',
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
      actor: 'Rajesh Kumar',
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
    { key: 'ipAddress', header: 'IP Address' },
  ];

  const activityStats = [
    { title: 'Total Activities Today', value: '24', icon: ScrollText, color: 'blue' },
    { title: 'User Logins Today', value: '18', icon: User, color: 'green' },
    { title: 'System Changes', value: '12', icon: Shield, color: 'yellow' },
    { title: 'Average Response Time', value: '1.2s', icon: Clock, color: 'purple' },
  ];

  const actionTypes = [
    { type: 'User Login', count: 45, color: 'bg-blue-500' },
    { type: 'Data Update', count: 32, color: 'bg-green-500' },
    { type: 'Report Download', count: 18, color: 'bg-yellow-500' },
    { type: 'System Change', count: 12, color: 'bg-purple-500' },
    { type: 'User Creation', count: 8, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
        <p className="text-gray-600 mt-2">Track system activities and user actions</p>
      </div>

      {/* Activity Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activityStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Audit Logs</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option>Last 24 hours</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Custom range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option>All actions</option>
              <option>User Login</option>
              <option>Data Update</option>
              <option>Report Download</option>
              <option>System Change</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Role</label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
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
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Activity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Breakdown (Last 7 Days)</h3>
          <div className="space-y-3">
            {actionTypes.map((action, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${action.color} mr-3`}></div>
                  <span className="text-sm text-gray-600">{action.type}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{action.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Most Active Users</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm font-medium">Rajesh Kumar</span>
              <span className="text-sm text-gray-600">18 actions</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm font-medium">Priya Sharma</span>
              <span className="text-sm text-gray-600">15 actions</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm font-medium">System Admin</span>
              <span className="text-sm text-gray-600">12 actions</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm font-medium">Amit Singh</span>
              <span className="text-sm text-gray-600">9 actions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <DataTable
        title="Recent Activity Logs"
        columns={logColumns}
        data={auditLogs}
        actions={true}
        onView={(row) => console.log('View log details:', row)}
      />
    </div>
  );
};

export default AuditLogs;