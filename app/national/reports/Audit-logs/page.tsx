'use client';
import React, { use, useState } from 'react';
import { Filter, Download, Eye } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead
} from '@/components/ui/table';


export default function AuditLogs() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');

  const auditData = [
    {
      timestamp: '2024-01-15 14:30:45',
      action: 'User Login',
      user: 'Rajesh Kumar',
      role: 'State Officer',
      details: 'Successful login from IP 203.192.45.12',
      status: 'Success',
      ipAddress: '203.192.45.12',
      location: 'Lucknow, UP',
    },
    {
      timestamp: '2024-01-15 14:25:12',
      action: 'Directive Created',
      user: 'Admin User',
      role: 'National Admin',
      details: 'Created directive DIR-2024-001 for PPE Distribution',
      status: 'Success',
      ipAddress: '10.0.0.1',
      location: 'New Delhi',
    },
    {
      timestamp: '2024-01-15 14:20:33',
      action: 'Report Downloaded',
      user: 'Priya Sharma',
      role: 'State Officer',
      details: 'Downloaded Monthly Grievance Report (January 2024)',
      status: 'Success',
      ipAddress: '192.168.1.45',
      location: 'Mumbai, MH',
    },
    {
      timestamp: '2024-01-15 14:15:21',
      action: 'User Role Updated',
      user: 'Admin User',
      role: 'National Admin',
      details: 'Updated role for user USR-004 from District to State',
      status: 'Success',
      ipAddress: '10.0.0.1',
      location: 'New Delhi',
    },
    {
      timestamp: '2024-01-15 14:10:18',
      action: 'Login Failed',
      user: 'Unknown',
      role: 'N/A',
      details: 'Failed login attempt for email: test@example.com',
      status: 'Failed',
      ipAddress: '185.234.56.78',
      location: 'Unknown',
    },
    {
      timestamp: '2024-01-15 14:05:44',
      action: 'Grievance Status Changed',
      user: 'Amit Singh',
      role: 'District Officer',
      details: 'Changed status of GR-2024-001 from Pending to Resolved',
      status: 'Success',
      ipAddress: '172.16.0.23',
      location: 'Lucknow, UP',
    },
  ];


  const actionStats = {
    total: auditData.length,
    successful: auditData.filter(a => a.status === 'Success').length,
    failed: auditData.filter(a => a.status === 'Failed').length,
    logins: auditData.filter(a => a.action.includes('Login')).length,
  };

  const handleExport = () => {
    console.log('Exporting audit logs...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1hour">Last Hour</option>
            <option value="24hours">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="custom">Custom Range</option>
          </select>
          
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Activity Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{actionStats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Successful Actions</p>
              <p className="text-2xl font-bold text-green-600">{actionStats.successful}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Failed Actions</p>
              <p className="text-2xl font-bold text-red-600">{actionStats.failed}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Login Activities</p>
              <p className="text-2xl font-bold text-purple-600">{actionStats.logins}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <div className="flex items-center space-x-4">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Actions</option>
              <option value="login">Login/Logout</option>
              <option value="directive">Directives</option>
              <option value="report">Reports</option>
              <option value="user">User Management</option>
              <option value="grievance">Grievances</option>
            </select>
            
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Roles</option>
              <option value="admin">National Admin</option>
              <option value="state">State Officer</option>
              <option value="district">District Officer</option>
              <option value="nodal">Nodal Officer</option>
            </select>
            
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="warning">Warning</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>{row.action}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>
                  <span className={(() => {
                    const roleColors: { [key: string]: string } = {
                      'National Admin': 'bg-red-100 text-red-800',
                      'State Officer': 'bg-blue-100 text-blue-800',
                      'District Officer': 'bg-green-100 text-green-800',
                      'Nodal Officer': 'bg-purple-100 text-purple-800',
                      'N/A': 'bg-gray-100 text-gray-800',
                    };
                    return `px-2 py-1 rounded-full text-xs font-medium ${roleColors[row.role] || 'bg-gray-100 text-gray-800'}`;
                  })()}>{row.role}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600 max-w-xs truncate block" title={row.details}>{row.details}</span>
                </TableCell>
                <TableCell>
                  <span className={(() => {
                    const statusColors: { [key: string]: string } = {
                      'Success': 'bg-green-100 text-green-800',
                      'Failed': 'bg-red-100 text-red-800',
                      'Warning': 'bg-yellow-100 text-yellow-800',
                    };
                    return `px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status] || ''}`;
                  })()}>{row.status}</span>
                </TableCell>
                <TableCell>{row.ipAddress}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>
                  <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
