"use client";
import React from 'react';
import { Activity, User, Calendar, Filter } from 'lucide-react';
import DashboardLayout from '@/components/layout/dashboard-layout';

const AuditLogs: React.FC = () => {
  const auditData = [
    { timestamp: '2024-01-15 14:30:25', action: 'Attendance Updated', actor: 'Contractor Admin', details: 'Updated attendance for Worker ID: WK003', ipAddress: '192.168.1.100' },
    { timestamp: '2024-01-15 13:45:12', action: 'Grievance Resolved', actor: 'Supervisor - Vikram Singh', details: 'Resolved grievance GR002 - Payment Delay', ipAddress: '192.168.1.101' },
    { timestamp: '2024-01-15 11:20:33', action: 'PPE Status Updated', actor: 'Contractor Admin', details: 'Updated PPE status for Worker ID: WK005', ipAddress: '192.168.1.100' },
    { timestamp: '2024-01-15 09:15:44', action: 'User Login', actor: 'Contractor Admin', details: 'System login - Dashboard accessed', ipAddress: '192.168.1.100' },
    { timestamp: '2024-01-14 17:30:55', action: 'Report Generated', actor: 'Contractor Admin', details: 'Generated Daily Attendance Report (PDF)', ipAddress: '192.168.1.100' },
    { timestamp: '2024-01-14 16:45:21', action: 'Worker Added', actor: 'Contractor Admin', details: 'Added new worker: Rajesh Gupta (WK046)', ipAddress: '192.168.1.100' },
    { timestamp: '2024-01-14 15:20:18', action: 'Training Status Updated', actor: 'Supervisor - Vikram Singh', details: 'Marked training complete for Worker ID: WK002', ipAddress: '192.168.1.101' },
    { timestamp: '2024-01-14 14:10:07', action: 'Grievance Created', actor: 'System Auto', details: 'New grievance GR005 submitted by Worker ID: WK001', ipAddress: '192.168.1.102' }
  ];
  const columns = [
    { key: 'timestamp', header: 'Timestamp', width: '180px' },
    { key: 'action', header: 'Action', width: '150px' },
    { key: 'actor', header: 'Actor', width: '180px' },
    { key: 'details', header: 'Details' },
    { key: 'ipAddress', header: 'IP Address', width: '130px' }
  ];
  const getActionBadge = (action: string) => {
    const actionColors: Record<string, string> = {
      'User Login': 'bg-blue-100 text-blue-800',
      'Attendance Updated': 'bg-green-100 text-green-800',
      'Grievance Resolved': 'bg-purple-100 text-purple-800',
      'Grievance Created': 'bg-yellow-100 text-yellow-800',
      'PPE Status Updated': 'bg-indigo-100 text-indigo-800',
      'Report Generated': 'bg-teal-100 text-teal-800',
      'Worker Added': 'bg-green-100 text-green-800',
      'Training Status Updated': 'bg-orange-100 text-orange-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${actionColors[action] || 'bg-gray-100 text-gray-800'}`}>
        {action}
      </span>
    );
  };
  return (
    <DashboardLayout role="contractor" name="Contractor Dashboard">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Export Logs
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <Activity className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-500">Total Activities</p>
                <p className="text-2xl font-bold text-blue-600">248</p>
                <p className="text-xs text-gray-400">This month</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-green-600">3</p>
                <p className="text-xs text-gray-400">Currently logged in</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-500">Today's Activities</p>
                <p className="text-2xl font-bold text-purple-600">12</p>
                <p className="text-xs text-gray-400">Since midnight</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <Filter className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-500">Log Retention</p>
                <p className="text-2xl font-bold text-orange-600">90</p>
                <p className="text-xs text-gray-400">Days</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">System Activity Log</h2>
              <div className="flex space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option>All Actions</option>
                  <option>User Login</option>
                  <option>Attendance Updated</option>
                  <option>Grievance Actions</option>
                  <option>Report Generated</option>
                  <option>User Management</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option>All Users</option>
                  <option>Contractor Admin</option>
                  <option>Supervisor</option>
                  <option>System Auto</option>
                </select>
                <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200/80">
                  <th className="text-left p-4 text-sm font-semibold text-slate-600">Timestamp</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-600">Action</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-600">Actor</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-600">Details</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-600">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {auditData.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200/50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 text-sm text-slate-700 whitespace-nowrap">{row.timestamp}</td>
                    <td className="p-4 text-sm font-medium text-slate-800">{row.action}</td>
                    <td className="p-4 text-sm text-slate-700">{row.actor}</td>
                    <td className="p-4 text-sm text-slate-600 max-w-xs truncate" title={row.details}>{row.details}</td>
                    <td className="p-4 text-sm text-slate-700 font-mono">{row.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Attendance Updates</span><span className="text-sm font-medium">5</span></div>
              <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Grievance Actions</span><span className="text-sm font-medium">3</span></div>
              <div className="flex justify-between items-center"><span className="text-sm text-gray-600">User Logins</span><span className="text-sm font-medium">2</span></div>
              <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Reports Generated</span><span className="text-sm font-medium">1</span></div>
              <div className="flex justify-between items-center"><span className="text-sm text-gray-600">System Changes</span><span className="text-sm font-medium">1</span></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Log Management</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"><div className="font-medium text-gray-900">Download Full Log</div><div className="text-sm text-gray-500">Export complete audit trail</div></button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"><div className="font-medium text-gray-900">Archive Old Logs</div><div className="text-sm text-gray-500">Move logs older than 90 days</div></button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"><div className="font-medium text-gray-900">Configure Alerts</div><div className="text-sm text-gray-500">Set up security notifications</div></button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default AuditLogs;
