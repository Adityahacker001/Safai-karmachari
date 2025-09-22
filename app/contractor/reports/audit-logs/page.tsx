"use client";
import React, { useState, useMemo } from 'react';
import { 
    Activity, 
    User, 
    Calendar, 
    Filter, 
    Download, 
    Archive, 
    Bell, 
    ChevronRight,
    Users
} from 'lucide-react';
import DashboardLayout from '@/components/layout/dashboard-layout';

// --- Type Definition for Audit Log Entry ---
type AuditLog = {
    timestamp: string;
    action: string;
    actor: string;
    details: string;
    ipAddress: string;
};

const AuditLogs: React.FC = () => {
    // --- State for Filters ---
    const [actionFilter, setActionFilter] = useState('All Actions');
    const [userFilter, setUserFilter] = useState('All Users');
    const [dateFilter, setDateFilter] = useState('2025-09-16'); // Default to today

    // --- Updated Audit Data for Today (Sept 16, 2025) ---
    const auditData: AuditLog[] = [
        { timestamp: '2025-09-16 17:15:25', action: 'Attendance Updated', actor: 'Contractor Admin', details: 'Updated attendance for Worker ID: WK003', ipAddress: '192.168.1.100' },
        { timestamp: '2025-09-16 16:30:12', action: 'Grievance Resolved', actor: 'Supervisor - Vikram Singh', details: 'Resolved grievance GR002 - Payment Delay', ipAddress: '192.168.1.101' },
        { timestamp: '2025-09-16 15:45:08', action: 'User Login', actor: 'Priya Sharma', details: 'Successful login from Zone B office', ipAddress: '192.168.1.102' },
        { timestamp: '2025-09-16 14:20:33', action: 'PPE Status Updated', actor: 'Contractor Admin', details: 'Updated PPE status for Worker ID: WK005', ipAddress: '192.168.1.100' },
        { timestamp: '2025-09-16 11:10:00', action: 'User Login', actor: 'Supervisor - Vikram Singh', details: 'System login - Dashboard accessed', ipAddress: '192.168.1.101' },
        { timestamp: '2025-09-15 17:30:55', action: 'Report Generated', actor: 'Contractor Admin', details: 'Generated Daily Attendance Report (PDF)', ipAddress: '192.168.1.100' },
        { timestamp: '2025-09-15 16:45:21', action: 'Worker Added', actor: 'Contractor Admin', details: 'Added new worker: Abishek Gupta (WK046)', ipAddress: '192.168.1.100' },
        { timestamp: '2025-09-15 15:20:18', action: 'Training Status Updated', actor: 'Supervisor - Vikram Singh', details: 'Marked training complete for Worker ID: WK002', ipAddress: '192.168.1.101' },
        { timestamp: '2025-09-15 14:10:07', action: 'Grievance Created', actor: 'System Auto', details: 'New grievance GR005 submitted by Worker ID: WK001', ipAddress: '192.168.1.102' }
    ];

    // --- Memoized Filtering Logic ---
    const filteredData = useMemo(() => {
        return auditData.filter(log => {
            const actionMatch = actionFilter === 'All Actions' || log.action === actionFilter;
            const userMatch = userFilter === 'All Users' || log.actor === userFilter || (userFilter === 'Supervisor' && log.actor.startsWith('Supervisor'));
            const dateMatch = !dateFilter || log.timestamp.startsWith(dateFilter);
            return actionMatch && userMatch && dateMatch;
        });
    }, [auditData, actionFilter, userFilter, dateFilter]);

    // --- Helper Function for VIBRANT Action Badges ---
    const getActionBadge = (action: string) => {
        const actionColors: Record<string, string> = {
            'User Login': 'bg-blue-500 text-white', 'Attendance Updated': 'bg-emerald-500 text-white',
            'Grievance Resolved': 'bg-violet-500 text-white', 'Grievance Created': 'bg-amber-500 text-white',
            'PPE Status Updated': 'bg-indigo-500 text-white', 'Report Generated': 'bg-teal-500 text-white',
            'Worker Added': 'bg-lime-500 text-white', 'Training Status Updated': 'bg-orange-500 text-white'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${actionColors[action] || 'bg-gray-500 text-white'}`}>
                {action}
            </span>
        );
    };

    // --- Helper Function for User Avatars ---
    const getAvatar = (actor: string) => {
        const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2);
        let initials = getInitials(actor);
        let colorClass = 'bg-gray-200 text-gray-700';

        if (actor.toLowerCase().includes('admin')) {
            colorClass = 'bg-sky-200 text-sky-800';
        } else if (actor.toLowerCase().includes('supervisor')) {
            initials = 'S';
            colorClass = 'bg-orange-200 text-orange-800';
        } else if (actor.toLowerCase().includes('system')) {
            initials = 'SA';
            colorClass = 'bg-slate-200 text-slate-800';
        } else {
             colorClass = 'bg-pink-200 text-pink-800';
        }
        return (
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${colorClass} mr-3 ring-2 ring-white`}>
                {initials}
            </div>
        );
    };
    
    // Calculate stats based on today's data
    const todaysActivities = auditData.filter(log => log.timestamp.startsWith('2025-09-16')).length;


    return (
        <DashboardLayout role="contractor" name="Rohan Builders">
            <div className="bg-slate-100 min-h-full p-4 md:p-6 space-y-8">

                {/* --- HEADER --- */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Audit & Activity Logs</h1>
                    <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg hover:shadow-xl transition-all duration-300 shadow-lg">
                        <Download className="w-5 h-5" />
                        <span className="font-semibold">Export Logs</span>
                    </button>
                </div>

                {/* --- VIBRANT STATS CARDS --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-sky-400 to-blue-500 text-white p-6 rounded-xl shadow-2xl shadow-blue-200 transition-transform hover:-translate-y-2 duration-300">
                        <div className="flex items-center justify-between"><p className="font-semibold">Total Activities</p><Activity className="w-6 h-6 opacity-70" /></div>
                        <p className="text-4xl font-bold mt-2">248</p><p className="text-sm opacity-80">This month</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-400 to-green-500 text-white p-6 rounded-xl shadow-2xl shadow-green-200 transition-transform hover:-translate-y-2 duration-300">
                        <div className="flex items-center justify-between"><p className="font-semibold">Active Users</p><Users className="w-6 h-6 opacity-70" /></div>
                        <p className="text-4xl font-bold mt-2">3</p><p className="text-sm opacity-80">Currently logged in</p>
                    </div>
                    <div className="bg-gradient-to-br from-violet-400 to-purple-500 text-white p-6 rounded-xl shadow-2xl shadow-purple-200 transition-transform hover:-translate-y-2 duration-300">
                        <div className="flex items-center justify-between"><p className="font-semibold">Today's Activities</p><Calendar className="w-6 h-6 opacity-70" /></div>
                        <p className="text-4xl font-bold mt-2">{todaysActivities}</p><p className="text-sm opacity-80">Since midnight (IST)</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white p-6 rounded-xl shadow-2xl shadow-orange-200 transition-transform hover:-translate-y-2 duration-300">
                        <div className="flex items-center justify-between"><p className="font-semibold">Log Retention</p><Archive className="w-6 h-6 opacity-70" /></div>
                        <p className="text-4xl font-bold mt-2">90</p><p className="text-sm opacity-80">Days</p>
                    </div>
                </div>

                {/* --- SYSTEM ACTIVITY LOG TABLE --- */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <h2 className="text-xl font-bold text-gray-800">System Activity Log</h2>
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="relative"><Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><select value={actionFilter} onChange={e => setActionFilter(e.target.value)} className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none"><option>All Actions</option><option>User Login</option><option>Attendance Updated</option><option>Grievance Created</option><option>Grievance Resolved</option></select></div>
                                <div className="relative"><User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><select value={userFilter} onChange={e => setUserFilter(e.target.value)} className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none"><option>All Users</option><option>Contractor Admin</option><option>Supervisor</option><option>System Auto</option></select></div>
                                <div className="relative"><Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500">
                                <tr>
                                    <th className="text-left p-4 text-sm font-semibold text-white uppercase tracking-wider">Timestamp</th>
                                    <th className="text-left p-4 text-sm font-semibold text-white uppercase tracking-wider">Action</th>
                                    <th className="text-left p-4 text-sm font-semibold text-white uppercase tracking-wider">Actor</th>
                                    <th className="text-left p-4 text-sm font-semibold text-white uppercase tracking-wider">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/70">
                                {filteredData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-sky-50 transition-colors duration-200">
                                        <td className="p-4 text-sm text-slate-700 whitespace-nowrap font-medium">{row.timestamp}</td>
                                        <td className="p-4">{getActionBadge(row.action)}</td>
                                        <td className="p-4 text-sm text-slate-800 flex items-center"><div className="flex-shrink-0">{getAvatar(row.actor)}</div><span className="font-semibold">{row.actor}</span></td>
                                        <td className="p-4 text-sm text-slate-600 max-w-sm truncate" title={row.details}>{row.details}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- SUMMARY & MANAGEMENT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity Summary</h3>
                        <div className="space-y-4">
                            <div><div className="flex justify-between items-center mb-1"><span className="text-sm font-semibold text-gray-600">Attendance Updates</span><span className="text-sm font-bold text-emerald-600">5</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full" style={{width: '75%'}}></div></div></div>
                            <div><div className="flex justify-between items-center mb-1"><span className="text-sm font-semibold text-gray-600">Grievance Actions</span><span className="text-sm font-bold text-violet-600">3</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-gradient-to-r from-violet-400 to-purple-500 h-2 rounded-full" style={{width: '45%'}}></div></div></div>
                            <div><div className="flex justify-between items-center mb-1"><span className="text-sm font-semibold text-gray-600">User Logins</span><span className="text-sm font-bold text-blue-600">2</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-gradient-to-r from-sky-400 to-blue-500 h-2 rounded-full" style={{width: '30%'}}></div></div></div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Log Management</h3>
                        <div className="space-y-3">
                            <button className="w-full group text-left p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors flex items-center justify-between"><div className="flex items-center"><Download className="w-6 h-6 text-blue-500 mr-4"/><div ><div className="font-semibold text-gray-800">Download Full Log</div><div className="text-sm text-gray-500">Export complete audit trail as CSV</div></div></div><ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"/></button>
                            <button className="w-full group text-left p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-400 transition-colors flex items-center justify-between"><div className="flex items-center"><Archive className="w-6 h-6 text-orange-500 mr-4"/><div ><div className="font-semibold text-gray-800">Archive Old Logs</div><div className="text-sm text-gray-500">Move logs older than 90 days</div></div></div><ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors"/></button>
                            <button className="w-full group text-left p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-400 transition-colors flex items-center justify-between"><div className="flex items-center"><Bell className="w-6 h-6 text-red-500 mr-4"/><div ><div className="font-semibold text-gray-800">Configure Alerts</div><div className="text-sm text-gray-500">Set up security notifications</div></div></div><ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors"/></button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AuditLogs;