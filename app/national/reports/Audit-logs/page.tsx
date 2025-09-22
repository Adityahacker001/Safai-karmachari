'use client';
import React, { useState } from 'react';
import { Filter, Download, Eye, CheckCircle, XCircle, Shield, User } from 'lucide-react';

// --- Re-defining components within the file for a self-contained structure ---


import { ReactNode } from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    gradient: string;
}
const StatCard = ({ title, value, icon: Icon, gradient }: StatCardProps) => (
    <div className={`relative bg-gradient-to-br ${gradient} p-6 rounded-2xl shadow-lg text-white overflow-hidden`}>
        <Icon className="absolute -right-4 -bottom-4 h-24 w-24 text-white/10" />
        <div className="relative">
            <p className="font-semibold text-lg text-white/90">{title}</p>
            <p className="text-5xl font-bold mt-2">{value}</p>
        </div>
    </div>
);

// --- Main AuditLogs Component ---
export default function AuditLogs() {
    const [selectedTimeRange, setSelectedTimeRange] = useState('7days');

    const auditData = [
    { timestamp: '2024-01-15 14:30:45', action: 'User Login', user: 'Rajesh Kumar', role: 'State Officer', details: 'Successful login from IP 203.192.45.12', status: 'Success', location: 'Lucknow, UP' },
    { timestamp: '2024-01-15 14:25:12', action: 'Directive Created', user: 'Admin User', role: 'National Admin', details: 'Created directive DIR-2024-001 for PPE Distribution', status: 'Success', location: 'New Delhi' },
    { timestamp: '2024-01-15 14:20:33', action: 'Report Downloaded', user: 'Priya Sharma', role: 'State Officer', details: 'Downloaded Monthly Grievance Report (January 2024)', status: 'Success', location: 'Mumbai, MH' },
    { timestamp: '2024-01-15 14:15:21', action: 'User Role Updated', user: 'Admin User', role: 'National Admin', details: 'Updated role for user USR-004 from District to State', status: 'Success', location: 'New Delhi' },
    { timestamp: '2024-01-15 14:10:18', action: 'Login Failed', user: 'Unknown', role: 'N/A', details: 'Failed login attempt for email: test@example.com', status: 'Failed', location: 'Unknown' },
    { timestamp: '2024-01-15 14:05:44', action: 'Grievance Status Changed', user: 'Amit Singh', role: 'District Officer', details: 'Changed status of GR-2024-001 from Pending to Resolved', status: 'Success', location: 'Lucknow, UP' },
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


        type StatusType = 'Success' | 'Failed' | 'Warning';
        const StatusPill = ({ status }: { status: StatusType }) => {
            const styles: Record<StatusType, string> = {
                Success: 'from-green-400 to-teal-500',
                Failed: 'from-amber-500 to-orange-600',
                Warning: 'from-yellow-400 to-amber-500',
            };
            return <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm bg-gradient-to-r ${styles[status] || 'from-slate-400 to-slate-500'}`}>{status}</span>;
        };

        type RoleType = 'National Admin' | 'State Officer' | 'District Officer' | 'Nodal Officer' | 'N/A';
        const RolePill = ({ role }: { role: RoleType }) => {
            const styles: Record<RoleType, string> = {
                'National Admin': 'from-indigo-500 to-purple-600',
                'State Officer': 'from-blue-500 to-cyan-600',
                'District Officer': 'from-emerald-500 to-green-600',
                'Nodal Officer': 'from-sky-500 to-blue-500',
                'N/A': 'from-slate-400 to-slate-500',
            };
            return <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm bg-gradient-to-r ${styles[role] || 'from-slate-400 to-slate-500'}`}>{role}</span>;
        };

    return (
        <div className="space-y-8 p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-slate-800">Audit Logs</h1>
                    <p className="mt-1 text-md text-slate-500">A detailed record of all system activities.</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    <select
                        value={selectedTimeRange}
                        onChange={(e) => setSelectedTimeRange(e.target.value)}
                        className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow shadow-sm"
                    >
                        <option value="1hour">Last Hour</option>
                        <option value="24hours">Last 24 Hours</option>
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                        <option value="custom">Custom Range</option>
                    </select>
                    <button
                        onClick={handleExport}
                        className="px-5 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <Download className="w-5 h-5" />
                        <span className="font-semibold">Export</span>
                    </button>
                </div>
            </div>

            {/* Activity Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Activities" value={actionStats.total} icon={Eye} gradient="from-blue-500 to-indigo-600" />
                <StatCard title="Successful Actions" value={actionStats.successful} icon={CheckCircle} gradient="from-green-500 to-teal-600" />
                <StatCard title="Failed Actions" value={actionStats.failed} icon={XCircle} gradient="from-amber-500 to-orange-600" />
                <StatCard title="Login Activities" value={actionStats.logins} icon={User} gradient="from-purple-500 to-violet-600" />
            </div>

            {/* Main Content Area with Table */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/80">
                {/* Filters */}
                <div className="p-4 flex items-center space-x-4 border-b border-gray-200">
                    <Filter className="w-6 h-6 text-slate-500" />
                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow w-full">
                            <option value="">All Actions</option>
                            <option value="login">Login/Logout</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow w-full">
                            <option value="">All Roles</option>
                            <option value="admin">National Admin</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow w-full">
                            <option value="">All Status</option>
                            <option value="success">Success</option>
                        </select>
                    </div>
                </div>

                {/* Audit Logs Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200/80">
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Timestamp</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Action</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">User</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Role</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Details</th>
                                <th className="text-center p-4 text-sm font-semibold text-slate-600">Status</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Location</th>
                                <th className="text-right p-4 text-sm font-semibold text-slate-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auditData.map((row, idx) => (
                                <tr key={idx} className="border-b border-gray-200/50 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 text-sm text-slate-700 whitespace-nowrap">{row.timestamp}</td>
                                    <td className="p-4 text-sm font-medium text-slate-800">{row.action}</td>
                                    <td className="p-4 text-sm text-slate-700">{row.user}</td>
                                    <td className="p-4"><RolePill role={row.role as 'National Admin' | 'State Officer' | 'District Officer' | 'Nodal Officer' | 'N/A'} /></td>
                                    <td className="p-4 text-sm text-slate-600 max-w-xs truncate" title={row.details}>{row.details}</td>
                                    <td className="p-4 text-center"><StatusPill status={row.status as 'Success' | 'Failed' | 'Warning'} /></td>
                                    <td className="p-4 text-sm text-slate-700">{row.location}</td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-100 rounded-full transition-all">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
