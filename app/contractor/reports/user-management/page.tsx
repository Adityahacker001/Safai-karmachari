"use client";
import React, { useState, useMemo } from 'react';
import { 
    UserCheck, 
    UserX, 
    Edit, 
    UserPlus, 
    Users, 
    Briefcase, 
    UserCog,
    Search,
    ChevronRight,
    Upload,
    Download as DownloadIcon,
    ListChecks
} from 'lucide-react';
import StatCard from '@/components/ui/stat-card';
import IntegratedLoader from '@/components/IntegratedLoader';

// --- Type Definition for User Data ---
type User = {
    id: string;
    name: string;
    status: 'Active' | 'Inactive';
    lastAttendance: string;
    role: 'Sanitation Worker' | 'Supervisor';
    shift: string;
};

const UserManagement: React.FC = () => {
    const [loading, setLoading] = React.useState(true);
    // --- State for Filters ---
    const [roleFilter, setRoleFilter] = useState('All Roles');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [searchTerm, setSearchTerm] = useState('');

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200); // Simulate loading
        return () => clearTimeout(timer);
    }, []);

    // --- User Data with more recent dates ---
    const userData: User[] = [
        { id: 'WK001', name: 'Abishek Kumar', status: 'Active', lastAttendance: '2025-09-16', role: 'Sanitation Worker', shift: 'Morning' },
        { id: 'WK002', name: 'Priya Sharma', status: 'Active', lastAttendance: '2025-09-16', role: 'Sanitation Worker', shift: 'Evening' },
        { id: 'WK003', name: 'Abishek Yadav', status: 'Inactive', lastAttendance: '2025-08-10', role: 'Sanitation Worker', shift: 'Morning' },
        { id: 'WK004', name: 'Anita Devi', status: 'Active', lastAttendance: '2025-09-15', role: 'Sanitation Worker', shift: 'Morning' },
        { id: 'WK005', name: 'Mohan Lal', status: 'Active', lastAttendance: '2025-09-16', role: 'Sanitation Worker', shift: 'Evening' },
        { id: 'SUP001', name: 'Vikram Singh', status: 'Active', lastAttendance: '2025-09-16', role: 'Supervisor', shift: 'Full Day' }
    ];

    // --- Memoized Filtering Logic ---
    const filteredData = useMemo(() => {
        return userData.filter(user => {
            const roleMatch = roleFilter === 'All Roles' || user.role === roleFilter;
            const statusMatch = statusFilter === 'All Status' || user.status === statusFilter;
            const searchMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.id.toLowerCase().includes(searchTerm.toLowerCase());
            return roleMatch && statusMatch && searchMatch;
        });
    }, [userData, roleFilter, statusFilter, searchTerm]);

    if (loading) {
        return <IntegratedLoader />;
    }
    
    // --- Helper for VIBRANT Badges ---
    const getBadge = (type: 'Status' | 'Role', value: string) => {
        const colors = {
            Status: { Active: 'bg-green-500 text-white', Inactive: 'bg-red-500 text-white' },
            Role: { Supervisor: 'bg-indigo-500 text-white', 'Sanitation Worker': 'bg-slate-500 text-white' }
        };
        let style = '';
        if (type === 'Status' && (value === 'Active' || value === 'Inactive')) {
            style = colors.Status[value as keyof typeof colors.Status];
        } else if (type === 'Role' && (value === 'Supervisor' || value === 'Sanitation Worker')) {
            style = colors.Role[value as keyof typeof colors.Role];
        } else {
            style = 'bg-gray-500 text-white';
        }
        return <span className={`px-3 py-1 rounded-full text-xs font-bold ${style}`}>{value}</span>;
    };
    
    // --- Helper for User Avatars ---
    const getAvatar = (user: User) => {
        const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        const colorClass = user.role === 'Supervisor' ? 'bg-indigo-200 text-indigo-800' : 'bg-slate-200 text-slate-800';
        return (
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${colorClass} mr-4 ring-2 ring-white`}>
                {initials}
            </div>
        );
    };

    return (
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
            {/* Enhanced Header */}
            <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
                <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight">
                                User Management
                            </h1>
                            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold drop-shadow-lg">
                                Manage worker accounts and permissions
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base backdrop-blur-sm flex items-center space-x-2">
                                <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="hidden sm:inline">Add New Worker</span>
                                <span className="sm:hidden">Add Worker</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

                {/* --- VIBRANT STATS CARDS --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <StatCard 
                        title="Active Workers" 
                        value="45" 
                        icon={UserCheck} 
                        color="green" 
                    />
                    <StatCard 
                        title="Inactive Workers" 
                        value="1" 
                        icon={UserX} 
                        color="red" 
                    />
                    <StatCard 
                        title="Supervisors" 
                        value="1" 
                        icon={UserCog} 
                        color="blue" 
                    />
                    <StatCard 
                        title="Total Users" 
                        value="46" 
                        icon={Users} 
                        color="purple" 
                    />
                </div>

                {/* --- USER LIST TABLE --- */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <h2 className="text-xl font-bold text-gray-800">User List</h2>
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input type="text" placeholder="Search by name or ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 pr-3 py-2 w-48 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"/></div>
                                <div className="relative"><Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none"><option>All Roles</option><option>Sanitation Worker</option><option>Supervisor</option></select></div>
                                <div className="relative"><UserCheck className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none"><option>All Status</option><option>Active</option><option>Inactive</option></select></div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500">
                                <tr>
                                    <th className="text-left p-4 text-sm font-semibold text-white uppercase tracking-wider">Worker Info</th>
                                    <th className="text-left p-4 text-sm font-semibold text-white uppercase tracking-wider">Role</th>
                                    <th className="text-left p-4 text-sm font-semibold text-white uppercase tracking-wider">Shift</th>
                                    <th className="text-left p-4 text-sm font-semibold text-white uppercase tracking-wider">Status</th>
                                    <th className="text-left p-4 text-sm font-semibold text-white uppercase tracking-wider">Last Attendance</th>
                                    <th className="text-center p-4 text-sm font-semibold text-white uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/70">
                                {filteredData.map((user) => (
                                    <tr key={user.id} className="hover:bg-blue-50 transition-colors duration-200">
                                        <td className="p-4 flex items-center">
                                            {getAvatar(user)}
                                            <div>
                                                <div className="font-bold text-blue-700">{user.name}</div>
                                                <div className="text-xs text-blue-400 font-mono">{user.id}</div>
                                            </div>
                                        </td>
                                        <td className="p-4">{getBadge('Role', user.role)}</td>
                                        <td className="p-4 text-sm text-slate-700">{user.shift}</td>
                                        <td className="p-4">{getBadge('Status', user.status)}</td>
                                        <td className="p-4 text-sm text-slate-700 font-medium">{user.lastAttendance}</td>
                                        <td className="p-4">
                                            <div className="flex space-x-2 justify-center">
                                                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Edit className="w-5 h-5" /></button>
                                                {user.status === 'Active' ? (
                                                    <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-red-100 text-red-700 hover:bg-red-200 transition-colors"><UserX className="w-4 h-4"/><span>Deactivate</span></button>
                                                ) : (
                                                    <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-green-100 text-green-700 hover:bg-green-200 transition-colors"><UserCheck className="w-4 h-4"/><span>Activate</span></button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- QUICK ACTIONS & STATS --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full group text-left p-4 border border-gray-200 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors flex items-center justify-between"><div className="flex items-center"><ListChecks className="w-6 h-6 text-slate-500 mr-4"/><div ><div className="font-semibold text-gray-800">Bulk Status Update</div><div className="text-sm text-gray-500">Update status for multiple workers at once</div></div></div><ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-slate-600 transition-colors"/></button>
                            <button className="w-full group text-left p-4 border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-400 transition-colors flex items-center justify-between"><div className="flex items-center"><Upload className="w-6 h-6 text-emerald-500 mr-4"/><div ><div className="font-semibold text-gray-800">Import Workers</div><div className="text-sm text-gray-500">Upload worker list from an Excel/CSV file</div></div></div><ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors"/></button>
                            <button className="w-full group text-left p-4 border border-gray-200 rounded-lg hover:bg-sky-50 hover:border-sky-400 transition-colors flex items-center justify-between"><div className="flex items-center"><DownloadIcon className="w-6 h-6 text-sky-500 mr-4"/><div ><div className="font-semibold text-gray-800">Export User List</div><div className="text-sm text-gray-500">Download the complete user database</div></div></div><ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-sky-600 transition-colors"/></button>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">User Statistics</h3>
                        <div className="divide-y divide-gray-200">
                           <div className="flex items-center justify-between py-3"><div className="flex items-center"><div className="w-2 h-2 rounded-full bg-yellow-400 mr-3"></div><span className="text-sm font-semibold text-gray-600">Morning Shift Workers</span></div><span className="text-sm font-bold text-gray-800">25</span></div>
                           <div className="flex items-center justify-between py-3"><div className="flex items-center"><div className="w-2 h-2 rounded-full bg-blue-400 mr-3"></div><span className="text-sm font-semibold text-gray-600">Evening Shift Workers</span></div><span className="text-sm font-bold text-gray-800">20</span></div>
                           <div className="flex items-center justify-between py-3"><div className="flex items-center"><div className="w-2 h-2 rounded-full bg-indigo-400 mr-3"></div><span className="text-sm font-semibold text-gray-600">Full Day Staff</span></div><span className="text-sm font-bold text-gray-800">1</span></div>
                           <div className="flex items-center justify-between py-3"><div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-400 mr-3"></div><span className="text-sm font-semibold text-gray-600">New Joiners This Month</span></div><span className="text-sm font-bold text-gray-800">3</span></div>
                           <div className="flex items-center justify-between py-3"><div className="flex items-center"><div className="w-2 h-2 rounded-full bg-gray-400 mr-3"></div><span className="text-sm font-semibold text-gray-600">Pending Verifications</span></div><span className="text-sm font-bold text-gray-800">0</span></div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default UserManagement;