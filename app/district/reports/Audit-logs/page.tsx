"use client";
import React, { useState } from 'react';
import DataTable from '@/components/ui/data-table';
import { Calendar, Filter, Download } from 'lucide-react';

const AuditLogs: React.FC = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [actionFilter, setActionFilter] = useState('all');

  const auditData = [
    {
      timestamp: '2024-01-25 14:30:25',
      action: 'Grievance Created',
      actor: 'Rajesh Kumar',
      role: 'Nodal Officer',
      details: 'Created grievance GRV-2024-045 for contractor Clean City Services',
      ipAddress: '192.168.1.100'
    },
    {
      timestamp: '2024-01-25 14:15:12',
      action: 'Directive Issued',
      actor: 'District Admin',
      role: 'Admin',
      details: 'Issued directive DIR-2024-008 to all Zone A officers',
      ipAddress: '192.168.1.101'
    },
    {
      timestamp: '2024-01-25 13:45:08',
      action: 'User Login',
      actor: 'Priya Sharma',
      role: 'Nodal Officer',
      details: 'Successful login from Zone B office',
      ipAddress: '192.168.1.102'
    },
    {
      timestamp: '2024-01-25 13:20:33',
      action: 'Report Generated',
      actor: 'Amit Singh',
      role: 'Nodal Officer',
      details: 'Generated monthly welfare report for Zone C',
      ipAddress: '192.168.1.103'
    },
    {
      timestamp: '2024-01-25 12:55:17',
      action: 'User Role Updated',
      actor: 'System Admin',
      role: 'Super Admin',
      details: 'Updated role for user Clean City Services to Active Contractor',
      ipAddress: '192.168.1.1'
    },
    {
      timestamp: '2024-01-25 12:30:44',
      action: 'Grievance Resolved',
      actor: 'Rajesh Kumar',
      role: 'Nodal Officer',
      details: 'Resolved grievance GRV-2024-042 with contractor acknowledgment',
      ipAddress: '192.168.1.100'
    }
  ];

  const columns = [
    { key: 'timestamp', header: 'Timestamp' },
    { 
      key: 'action', 
      header: 'Action',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value.includes('Login') ? 'bg-blue-100 text-blue-800' :
          value.includes('Created') || value.includes('Issued') ? 'bg-green-100 text-green-800' :
          value.includes('Resolved') ? 'bg-purple-100 text-purple-800' :
          value.includes('Updated') ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'actor', header: 'User' },
    { 
      key: 'role', 
      header: 'Role',
      render: (value: string) => (
        <span className={`text-xs font-medium ${
          value === 'Admin' || value === 'Super Admin' ? 'text-red-600' :
          value === 'Nodal Officer' ? 'text-blue-600' :
          'text-green-600'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'details', header: 'Details' },
    { 
      key: 'ipAddress', 
      header: 'IP Address',
      render: (value: string) => (
        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{value}</code>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Today</p>
              <p className="text-2xl font-bold text-blue-600">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Login Events</p>
              <p className="text-2xl font-bold text-green-600">89</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">System Changes</p>
              <p className="text-2xl font-bold text-yellow-600">24</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Date Range:</span>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Action:</span>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
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

          <div className="text-sm text-gray-500">
            Showing {auditData.length} of 1,247 activities
          </div>
        </div>
      </div>

      <DataTable
        title="System Activity Log"
        columns={columns}
        data={auditData}
        actions={false}
      />

      {/* Security Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900">Normal Activity</h4>
            <p className="text-sm text-green-700 mt-1">No suspicious activities detected in the last 24 hours</p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900">Peak Hours</h4>
            <p className="text-sm text-blue-700 mt-1">Highest activity between 10 AM - 2 PM daily</p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900">Multiple Logins</h4>
            <p className="text-sm text-yellow-700 mt-1">3 users with multiple concurrent sessions detected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;