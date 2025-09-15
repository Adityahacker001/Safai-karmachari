"use client";
import React from 'react';
import DataTable from '@/components/ui/data-table';
import { ScrollText, Activity, User, Settings } from 'lucide-react';

const AuditLogs = () => {
  const auditData = [
    {
      timestamp: '2024-01-20 10:30:25',
      action: 'Grievance Created',
      actor: 'Rajesh Kumar',
      role: 'District Officer',
      details: 'Created grievance GRV001 for contractor ABC Ltd',
      ipAddress: '192.168.1.100'
    },
    {
      timestamp: '2024-01-20 10:15:43',
      action: 'User Login',
      actor: 'Priya Sharma',
      role: 'Nodal Officer',
      details: 'Successful login from web interface',
      ipAddress: '192.168.1.105'
    },
    {
      timestamp: '2024-01-20 09:45:12',
      action: 'Directive Issued',
      actor: 'System Admin',
      role: 'Administrator',
      details: 'Issued directive DIR002 to Mumbai District',
      ipAddress: '192.168.1.50'
    },
    {
      timestamp: '2024-01-20 09:30:08',
      action: 'User Updated',
      actor: 'System Admin',
      role: 'Administrator',
      details: 'Updated role for user USR003 from Pending to Active',
      ipAddress: '192.168.1.50'
    },
    {
      timestamp: '2024-01-20 08:55:32',
      action: 'Report Generated',
      actor: 'Amit Patel',
      role: 'Contractor',
      details: 'Generated Monthly Grievance Summary report',
      ipAddress: '192.168.1.112'
    },
    {
      timestamp: '2024-01-20 08:30:15',
      action: 'PPE Distribution Updated',
      actor: 'Sunita Desai',
      role: 'Nodal Officer',
      details: 'Updated PPE distribution status for Nashik district',
      ipAddress: '192.168.1.108'
    },
    {
      timestamp: '2024-01-19 17:45:22',
      action: 'Grievance Resolved',
      actor: 'Mohammed Ali',
      role: 'District Officer',
      details: 'Marked grievance GRV042 as resolved',
      ipAddress: '192.168.1.102'
    },
    {
      timestamp: '2024-01-19 16:20:35',
      action: 'User Deactivated',
      actor: 'System Admin',
      role: 'Administrator',
      details: 'Deactivated user USR087 due to inactivity',
      ipAddress: '192.168.1.50'
    },
    {
      timestamp: '2024-01-19 15:10:18',
      action: 'Training Record Updated',
      actor: 'Kavita Singh',
      role: 'Contractor',
      details: 'Updated training completion for 25 workers',
      ipAddress: '192.168.1.115'
    },
    {
      timestamp: '2024-01-19 14:55:44',
      action: 'Recognition Score Updated',
      actor: 'System',
      role: 'System',
      details: 'Automated update of recognition scores for all districts',
      ipAddress: 'System'
    }
  ];

  const getActionIcon = (action: string) => {
    if (action.includes('Login') || action.includes('User')) return <User className="w-4 h-4" />;
    if (action.includes('Updated') || action.includes('Generated')) return <Settings className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const getActionColor = (action: string) => {
    if (action.includes('Login')) return 'bg-blue-100 text-blue-800';
    if (action.includes('Created') || action.includes('Issued')) return 'bg-green-100 text-green-800';
    if (action.includes('Updated')) return 'bg-yellow-100 text-yellow-800';
    if (action.includes('Deactivated') || action.includes('Deleted')) return 'bg-red-100 text-red-800';
    if (action.includes('Resolved')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  const columns = [
    { 
      key: 'timestamp', 
      header: 'Timestamp', 
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
      )
    },
    { 
      key: 'action', 
      header: 'Action', 
      sortable: true,
      render: (value: string) => {
        let borderColor = '';
        if (value.includes('Login')) borderColor = 'border-l-4 border-blue-400';
        else if (value.includes('Created') || value.includes('Issued')) borderColor = 'border-l-4 border-green-400';
        else if (value.includes('Updated')) borderColor = 'border-l-4 border-yellow-400';
        else if (value.includes('Deactivated') || value.includes('Deleted')) borderColor = 'border-l-4 border-red-400';
        else if (value.includes('Resolved')) borderColor = 'border-l-4 border-purple-400';
        else borderColor = 'border-l-4 border-gray-200';
        return (
          <div className={`flex items-center space-x-2 pl-2 ${borderColor} bg-white/80 rounded-lg py-1`}> 
            <div className={`p-1 rounded ${getActionColor(value)}`}>
              {getActionIcon(value)}
            </div>
            <span className="text-sm font-medium">{value}</span>
          </div>
        );
      }
    },
    { 
      key: 'actor', 
      header: 'Actor', 
      sortable: true,
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      )
    },
    { 
      key: 'details', 
      header: 'Details', 
      render: (value: string) => (
        <div className="text-sm text-gray-600 max-w-md truncate" title={value}>
          {value}
        </div>
      )
    },
    { 
      key: 'ipAddress', 
      header: 'IP Address', 
      render: (value: string) => (
        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
          {value}
        </code>
      )
    }
  ];

  return (
    <div className="space-y-6 min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 p-6 md:p-10">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
        <p className="text-gray-600 mt-1">Track all system activities and user actions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl shadow-md border border-blue-200 bg-gradient-to-br from-blue-200 via-blue-100 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Events</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">1,247</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg flex items-center justify-center">
              <ScrollText className="w-6 h-6" />
            </div>
          </div>
        </div>
        
  <div className="p-6 rounded-xl shadow-md border border-green-200 bg-gradient-to-br from-green-200 via-green-100 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Today's Events</p>
              <p className="text-2xl font-bold text-green-600 mt-1">89</p>
            </div>
            <div className="w-12 h-12 bg-green-50 border border-green-200 text-green-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>
        
  <div className="p-6 rounded-xl shadow-md border border-purple-200 bg-gradient-to-br from-purple-200 via-purple-100 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Active Users</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">34</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 border border-purple-200 text-purple-600 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
          </div>
        </div>
        
  <div className="p-6 rounded-xl shadow-md border border-red-200 bg-gradient-to-br from-red-200 via-red-100 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Failed Attempts</p>
              <p className="text-2xl font-bold text-red-600 mt-1">3</p>
            </div>
            <div className="w-12 h-12 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
  <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 p-6 rounded-xl border border-gray-200 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">45</div>
            <div className="text-sm text-gray-600">User Logins</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">23</div>
            <div className="text-sm text-gray-600">Data Updates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">12</div>
            <div className="text-sm text-gray-600">Reports Generated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">8</div>
            <div className="text-sm text-gray-600">Grievances Processed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-600">Admin Actions</div>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-purple-50">
        <DataTable
          title="Audit Logs"
          columns={columns}
          data={auditData}
        />
      </div>
    </div>
  );
};

export default AuditLogs;