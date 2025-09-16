"use client";
import React, { useState } from 'react';
import DataTable from '@/components/ui/data-table';
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
  AlertTriangle
} from 'lucide-react';

const AuditLogs: React.FC = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [actionFilter, setActionFilter] = useState('all');

  const auditData = [
    {
      timestamp: '2025-09-16 17:15:25',
      action: 'Grievance Created',
      actor: 'Rajesh Kumar',
      role: 'Nodal Officer',
      details: 'Created grievance GRV-2025-045 for contractor Clean City Services',
      ipAddress: '192.168.1.100'
    },
    {
      timestamp: '2025-09-16 16:30:12',
      action: 'Directive Issued',
      actor: 'District Admin',
      role: 'Admin',
      details: 'Issued directive DIR-2025-008 to all Zone A officers',
      ipAddress: '192.168.1.101'
    },
    {
      timestamp: '2025-09-16 15:45:08',
      action: 'User Login',
      actor: 'Priya Sharma',
      role: 'Nodal Officer',
      details: 'Successful login from Zone B office',
      ipAddress: '192.168.1.102'
    },
    {
      timestamp: '2025-09-16 14:20:33',
      action: 'Report Generated',
      actor: 'Amit Singh',
      role: 'Nodal Officer',
      details: 'Generated monthly welfare report for Zone C',
      ipAddress: '192.168.1.103'
    },
    {
      timestamp: '2025-09-16 13:55:17',
      action: 'User Role Updated',
      actor: 'System Admin',
      role: 'Super Admin',
      details: 'Updated role for user Clean City Services to Active Contractor',
      ipAddress: '192.168.1.1'
    },
    {
      timestamp: '2025-09-16 12:30:44',
      action: 'Grievance Resolved',
      actor: 'Rajesh Kumar',
      role: 'Nodal Officer',
      details: 'Resolved grievance GRV-2025-042 with contractor acknowledgment',
      ipAddress: '192.168.1.100'
    }
  ];

  // --- NEW: Helper function to determine row background color ---
  // This function applies a specific color for important actions,
  // and falls back to zebra striping for other actions.
  const getRowClass = (action: string, index: number) => {
    if (action.includes('Login')) return 'bg-sky-50';
    if (action.includes('Created') || action.includes('Issued')) return 'bg-emerald-50';
    if (action.includes('Resolved')) return 'bg-violet-50';
    if (action.includes('Updated')) return 'bg-amber-50';
    
    // Zebra striping for all other rows
    return index % 2 === 0 ? 'bg-white' : 'bg-slate-50';
  };

  // --- REVAMPED: Columns definition to add row coloring ---
  // We assume the DataTable's render prop provides (value, entireRow, rowIndex)
  const columns = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      render: (value: any) => (
        <div className="p-3 text-sm text-gray-700">{value}</div>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      render: (value: any) => (
        <span className={`p-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
          value.includes('Login') ? 'bg-blue-200 text-blue-800' :
          value.includes('Created') || value.includes('Issued') ? 'bg-green-200 text-green-800' :
          value.includes('Resolved') ? 'bg-purple-200 text-purple-800' :
          value.includes('Updated') ? 'bg-yellow-200 text-yellow-800' :
          'bg-gray-200 text-gray-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'actor',
      header: 'User',
      render: (value: any) => (
        <div className="p-3 font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (value: any) => (
        <span className={`p-3 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
          value === 'Admin' || value === 'Super Admin' ? 'bg-red-100 text-red-800' :
          value === 'Nodal Officer' ? 'bg-cyan-100 text-cyan-800' :
          'bg-slate-100 text-slate-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'details',
      header: 'Details',
      render: (value: any) => (
        <div className="p-3 text-sm text-gray-600">{value}</div>
      ),
    },
    {
      key: 'ipAddress',
      header: 'IP Address',
      render: (value: any) => (
        <code className="p-3 text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">{value}</code>
      ),
    },
  ];


  return (
    <div className="bg-slate-50/70 p-4 md:p-6 space-y-6 rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Audit Logs</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg">
            <Download className="h-4 w-4" />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* Activity Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-100 to-white rounded-lg shadow-lg p-5 transition-transform hover:scale-105 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-900/80 mb-1">Total Activities</p>
              <p className="text-3xl font-bold text-indigo-900">1,247</p>
            </div>
            <div className="bg-white/50 p-3 rounded-full">
              <Activity className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-sky-100 to-white rounded-lg shadow-lg p-5 transition-transform hover:scale-105 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sky-900/80 mb-1">Today</p>
              <p className="text-3xl font-bold text-sky-700">156</p>
            </div>
            <div className="bg-white/50 p-3 rounded-full">
              <Clock className="h-6 w-6 text-sky-600" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-100 to-white rounded-lg shadow-lg p-5 transition-transform hover:scale-105 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-900/80 mb-1">Login Events</p>
              <p className="text-3xl font-bold text-emerald-700">89</p>
            </div>
            <div className="bg-white/50 p-3 rounded-full">
              <LogIn className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-100 to-white rounded-lg shadow-lg p-5 transition-transform hover:scale-105 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-900/80 mb-1">System Changes</p>
              <p className="text-3xl font-bold text-amber-700">24</p>
            </div>
            <div className="bg-white/50 p-3 rounded-full">
              <Settings2 className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center flex-wrap gap-x-6 gap-y-3">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Date Range:</span>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          <div className="text-sm text-gray-500 font-medium">
            Showing {auditData.length} of 1,247 activities
          </div>
        </div>
      </div>

      {/* --- ENHANCED DataTable Call --- */}
      {/* Assuming your DataTable component can accept a prop for header styling */}
      <DataTable
        title="System Activity Log"
        columns={columns}
        data={auditData}
        actions={false}
        headerClassName="bg-slate-100 text-slate-600 font-semibold" // Example prop
      />

      {/* Security Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Security Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50/60 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5"><CheckCircle2 className="h-5 w-5 text-green-500" /></div>
            <div>
              <h4 className="font-medium text-green-900">Normal Activity</h4>
              <p className="text-sm text-green-700 mt-1">No suspicious activities detected in the last 24 hours.</p>
            </div>
          </div>
          <div className="bg-blue-50/60 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
             <div className="flex-shrink-0 mt-0.5"><TrendingUp className="h-5 w-5 text-blue-500" /></div>
            <div>
              <h4 className="font-medium text-blue-900">Peak Hours</h4>
              <p className="text-sm text-blue-700 mt-1">Highest activity today between 2 PM - 4 PM.</p>
            </div>
          </div>
          <div className="bg-yellow-50/60 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
             <div className="flex-shrink-0 mt-0.5"><AlertTriangle className="h-5 w-5 text-yellow-500" /></div>
            <div>
              <h4 className="font-medium text-yellow-900">Multiple Logins</h4>
              <p className="text-sm text-yellow-700 mt-1">3 users with multiple concurrent sessions detected.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;