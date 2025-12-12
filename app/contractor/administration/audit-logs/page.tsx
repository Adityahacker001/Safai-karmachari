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
    Users,
    Shield,
    CheckCircle
} from 'lucide-react';
import StatCard from '@/components/ui/stat-card';
import IntegratedLoader from '@/components/layout/IntegratedLoader';
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
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200); // Simulate loading
        return () => clearTimeout(timer);
    }, []);

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

    if (loading) {
        return <IntegratedLoader />;
    }

    return (
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
            {/* Breadcrumb showing Administration */}
            <div className="text-sm text-slate-500 flex items-center space-x-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="font-medium">Administration</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="font-semibold text-slate-700">Audit & Activity Logs</span>
            </div>

            {/* Enhanced Header */}
            <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
                <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight">
                                Audit & Activity Logs
                            </h1>
                            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold drop-shadow-lg">
                                Track system activities and user actions
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base backdrop-blur-sm flex items-center space-x-2">
                                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Export Logs</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

                {/* --- VIBRANT STATS CARDS --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <StatCard 
                        title="Total Activities" 
                        value="248" 
                        subtitle="This month"
                        icon={Activity} 
                        color="blue" 
                    />
                    <StatCard 
                        title="Active Users" 
                        value="3" 
                        subtitle="Currently logged in"
                        icon={Users} 
                        color="green" 
                    />
                    <StatCard 
                        title="Today's Activities" 
                        value={todaysActivities.toString()} 
                        subtitle="Since midnight (IST)"
                        icon={Calendar} 
                        color="purple" 
                    />
                    <StatCard 
                        title="Log Retention" 
                        value="90" 
                        subtitle="Days"
                        icon={Archive} 
                        color="amber" 
                    />
                </div>

                {/* --- SYSTEM ACTIVITY LOG TABLE --- */}
                <div className="w-full max-w-full sm:max-w-full md:max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">System Activity Log</h2>
                            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
                                <div className="relative w-full sm:w-auto"><Filter className="w-3 h-3 sm:w-4 sm:h-4 absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400"/><select value={actionFilter} onChange={e => setActionFilter(e.target.value)} className="w-full sm:w-auto pl-7 sm:pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm appearance-none"><option>All Actions</option><option>User Login</option><option>Attendance Updated</option><option>Grievance Created</option><option>Grievance Resolved</option></select></div>
                                <div className="relative w-full sm:w-auto"><User className="w-3 h-3 sm:w-4 sm:h-4 absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400"/><select value={userFilter} onChange={e => setUserFilter(e.target.value)} className="w-full sm:w-auto pl-7 sm:pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm appearance-none"><option>All Users</option><option>Contractor Admin</option><option>Supervisor</option><option>System Auto</option></select></div>
                                <div className="relative w-full sm:w-auto"><Calendar className="w-3 h-3 sm:w-4 sm:h-4 absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="w-full sm:w-auto pl-7 sm:pl-9 pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500">
                                <tr>
                                    <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Timestamp</th>
                                    <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Action</th>
                                    <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Actor</th>
                                    <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/70">
                                {filteredData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-sky-50 transition-colors duration-200">
                                        <td className="p-3 sm:p-4 text-xs sm:text-sm text-slate-700 whitespace-nowrap font-medium">{row.timestamp}</td>
                                        <td className="p-3 sm:p-4">{getActionBadge(row.action)}</td>
                                        <td className="p-3 sm:p-4 text-xs sm:text-sm text-slate-800 flex items-center"><div className="flex-shrink-0">{getAvatar(row.actor)}</div><span className="font-semibold truncate">{row.actor}</span></td>
                                        <td className="p-3 sm:p-4 text-xs sm:text-sm text-slate-600 max-w-xs sm:max-w-sm truncate" title={row.details}>{row.details}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- SUMMARY & MANAGEMENT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="w-full max-w-full bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Recent Activity Summary</h3>
                        <div className="space-y-4">
                            <div><div className="flex justify-between items-center mb-1"><span className="text-sm font-semibold text-gray-600">Attendance Updates</span><span className="text-sm font-bold text-emerald-600">5</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full" style={{width: '75%'}}></div></div></div>
                            <div><div className="flex justify-between items-center mb-1"><span className="text-sm font-semibold text-gray-600">Grievance Actions</span><span className="text-sm font-bold text-violet-600">3</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-gradient-to-r from-violet-400 to-purple-500 h-2 rounded-full" style={{width: '45%'}}></div></div></div>
                            <div><div className="flex justify-between items-center mb-1"><span className="text-sm font-semibold text-gray-600">User Logins</span><span className="text-sm font-bold text-blue-600">2</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-gradient-to-r from-sky-400 to-blue-500 h-2 rounded-full" style={{width: '30%'}}></div></div></div>
                        </div>
                    </div>
                    <div className="w-full max-w-full bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Log Management</h3>
                        <div className="space-y-3">
                            <button className="w-full group text-left p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors flex items-center justify-between"><div className="flex items-center"><Download className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-3 sm:mr-4 flex-shrink-0"/><div ><div className="text-sm sm:text-base font-semibold text-gray-800">Download Full Log</div><div className="text-xs sm:text-sm text-gray-500">Export complete audit trail as CSV</div></div></div><ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0"/></button>
                            <button className="w-full group text-left p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-400 transition-colors flex items-center justify-between"><div className="flex items-center"><Archive className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-3 sm:mr-4 flex-shrink-0"/><div ><div className="text-sm sm:text-base font-semibold text-gray-800">Archive Old Logs</div><div className="text-xs sm:text-sm text-gray-500">Move logs older than 90 days</div></div></div><ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-orange-600 transition-colors flex-shrink-0"/></button>
                            <button className="w-full group text-left p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-400 transition-colors flex items-center justify-between"><div className="flex items-center"><Bell className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mr-3 sm:mr-4 flex-shrink-0"/><div ><div className="text-sm sm:text-base font-semibold text-gray-800">Configure Alerts</div><div className="text-xs sm:text-sm text-gray-500">Set up security notifications</div></div></div><ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-red-600 transition-colors flex-shrink-0"/></button>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default AuditLogs;
