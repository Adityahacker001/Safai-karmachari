"use client";
import React, { useState } from 'react';
import { Plus, Check, X, Edit2, UserPlus, Users, Clock } from 'lucide-react';

// --- Self-contained placeholder components to ensure functionality ---

import { ReactNode, HTMLAttributes } from 'react';

interface TableProps extends HTMLAttributes<HTMLTableElement> {
    children: ReactNode;
}
const Table = ({ children, ...props }: TableProps) => <table {...props}>{children}</table>;
const TableHeader = ({ children, ...props }: { children: ReactNode } & HTMLAttributes<HTMLTableSectionElement>) => <thead {...props}>{children}</thead>;
const TableBody = ({ children, ...props }: { children: ReactNode } & HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props}>{children}</tbody>;
const TableRow = ({ children, ...props }: { children: ReactNode } & HTMLAttributes<HTMLTableRowElement>) => <tr {...props}>{children}</tr>;
const TableCell = ({ children, ...props }: { children: ReactNode } & HTMLAttributes<HTMLTableCellElement>) => <td {...props}>{children}</td>;
const TableHead = ({ children, ...props }: { children: ReactNode } & HTMLAttributes<HTMLTableCellElement>) => <th {...props}>{children}</th>;


// --- Custom Styled Components ---


interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    gradient: string;
}
const StatCard = ({ title, value, icon: Icon, gradient }: StatCardProps) => (
    <div className={`relative bg-gradient-to-br ${gradient} p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg text-white overflow-hidden transition-transform transform hover:-translate-y-1.5 duration-300`}>
        <Icon className="absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4 h-16 sm:h-20 lg:h-24 w-16 sm:w-20 lg:w-24 text-white/10" />
        <div className="relative">
            <p className="font-semibold text-sm sm:text-base lg:text-lg text-white/90">{title}</p>
            <p className="text-2xl sm:text-3xl lg:text-5xl font-bold mt-1 sm:mt-2">{value}</p>
        </div>
    </div>
);


interface RoleBreakdownStats {
    state: number;
    district: number;
    nodal: number;
}
const RoleBreakdownCard = ({ stats }: { stats: RoleBreakdownStats }) => (
    <div className="relative bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg text-slate-800 overflow-hidden transition-transform transform hover:-translate-y-1.5 duration-300">
        <Users className="absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4 h-16 sm:h-20 lg:h-24 w-16 sm:w-20 lg:w-24 text-slate-500/10" />
        <div className="relative">
            <p className="font-semibold text-sm sm:text-base lg:text-lg text-slate-700/90 mb-2 sm:mb-3">Users by Role</p>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-xs sm:text-sm">State Officers:</span>
                    <span className="font-bold text-sm sm:text-base lg:text-lg text-blue-600 bg-blue-100 px-1.5 sm:px-2 py-0.5 rounded-md">{stats.state}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-xs sm:text-sm">District Officers:</span>
                    <span className="font-bold text-sm sm:text-base lg:text-lg text-green-600 bg-green-100 px-1.5 sm:px-2 py-0.5 rounded-md">{stats.district}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-xs sm:text-sm">Nodal Officers:</span>
                    <span className="font-bold text-sm sm:text-base lg:text-lg text-purple-600 bg-purple-100 px-1.5 sm:px-2 py-0.5 rounded-md">{stats.nodal}</span>
                </div>
            </div>
        </div>
    </div>
);


export default function UserManagement() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'District', state: '', district: '' });
    const [addUserSuccess, setAddUserSuccess] = useState(false);

    const userData = [
        { id: 'USR-001', name: 'Abishek Kumar', email: 'Abishek.kumar@up.gov.in', role: 'State', state: 'Uttar Pradesh', district: 'All', status: 'Active', lastLogin: '2024-01-15 10:30', created: '2023-08-15' },
        { id: 'USR-002', name: 'Priya Sharma', email: 'priya.sharma@mh.gov.in', role: 'State', state: 'Maharashtra', district: 'All', status: 'Active', lastLogin: '2024-01-15 14:20', created: '2023-09-10' },
        { id: 'USR-003', name: 'Amit Singh', email: 'amit.singh@lucknow.gov.in', role: 'District', state: 'Uttar Pradesh', district: 'Lucknow', status: 'Active', lastLogin: '2024-01-14 16:45', created: '2023-10-05' },
        { id: 'USR-004', name: 'Sunita Devi', email: 'sunita.devi@mumbai.gov.in', role: 'District', state: 'Maharashtra', district: 'Mumbai', status: 'Pending', lastLogin: 'Never', created: '2024-01-10' },
        { id: 'USR-005', name: 'Vikram Joshi', email: 'vikram.joshi@nodal.gov.in', role: 'Nodal', state: 'All', district: 'All', status: 'Active', lastLogin: '2024-01-15 09:15', created: '2023-07-20' },
    ];

    const handleCreateUser = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        console.log('Creating user:', newUser);
        setAddUserSuccess(true);
        setTimeout(() => setAddUserSuccess(false), 2000);
        setShowCreateModal(false);
        setNewUser({ name: '', email: '', password: '', role: 'District', state: '', district: '' });
    };

    const roleStats = {
        total: userData.length,
        active: userData.filter(u => u.status === 'Active').length,
        pending: userData.filter(u => u.status === 'Pending').length,
        byRole: {
            state: userData.filter(u => u.role === 'State').length,
            district: userData.filter(u => u.role === 'District').length,
            nodal: userData.filter(u => u.role === 'Nodal').length,
        }
    };

    const Pill = ({ text, gradient }: { text: string; gradient: string }) => <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold text-white shadow-sm bg-gradient-to-r ${gradient}`}>{text}</span>;

    return (
        <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8 min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">User Management</h1>
                    <p className="mt-1 text-sm sm:text-md text-slate-500">Manage all system users and their roles.</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(v => !v)}
                    className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold">Add New User</span>
                </button>
            </div>

            {/* Add User Form as Modal Overlay */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn p-3 sm:p-4">
                    <div className="w-full max-w-2xl rounded-xl sm:rounded-2xl shadow-2xl border-0 bg-gradient-to-br from-blue-100 via-cyan-100 to-purple-100 p-1 relative max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-t-xl sm:rounded-t-2xl p-4 sm:p-6 shadow-md flex items-center justify-between">
                            <div>
                                <h3 className="text-lg sm:text-xl lg:text-2xl text-white font-extrabold drop-shadow">Add New User</h3>
                                <p className="text-white/90 font-medium text-sm sm:text-base">Fill in the details to create a new user account.</p>
                            </div>
                            <button type="button" className="text-white/80 hover:text-white ml-2 sm:ml-4 flex-shrink-0" onClick={() => setShowCreateModal(false)}><X className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" /></button>
                        </div>
                        <form className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6" onSubmit={handleCreateUser}>
                            <div>
                                <label className="block text-sm sm:text-base font-semibold mb-1.5 sm:mb-2 text-blue-900">Full Name</label>
                                <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg text-sm sm:text-base lg:text-lg" placeholder="e.g., Anjali Verma" required />
                            </div>
                            <div>
                                <label className="block text-sm sm:text-base font-semibold mb-1.5 sm:mb-2 text-blue-900">Email</label>
                                <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg text-sm sm:text-base lg:text-lg" placeholder="e.g., anjali.verma@gov.in" required />
                            </div>
                            <div>
                                <label className="block text-sm sm:text-base font-semibold mb-1.5 sm:mb-2 text-blue-900">Password</label>
                                <input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg text-sm sm:text-base lg:text-lg" placeholder="Enter a secure password" required />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block text-sm sm:text-base font-semibold mb-1.5 sm:mb-2 text-blue-900">Role</label>
                                    <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg text-sm sm:text-base lg:text-lg">
                                        <option value="District">District Officer</option>
                                        <option value="State">State Officer</option>
                                        <option value="Nodal">Nodal Officer</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm sm:text-base font-semibold mb-1.5 sm:mb-2 text-blue-900">State</label>
                                    <input type="text" value={newUser.state} onChange={(e) => setNewUser({ ...newUser, state: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg text-sm sm:text-base lg:text-lg" placeholder="e.g., Maharashtra" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm sm:text-base font-semibold mb-1.5 sm:mb-2 text-blue-900">District</label>
                                <input type="text" value={newUser.district} onChange={(e) => setNewUser({ ...newUser, district: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/80 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg text-sm sm:text-base lg:text-lg" placeholder="e.g., Mumbai" />
                            </div>
                            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2 sm:pt-4">
                                <button type="button" className="px-4 sm:px-6 py-2 text-sm sm:text-base lg:text-lg rounded-lg border border-blue-300 bg-white/80 text-blue-700 font-semibold hover:bg-blue-50 transition-colors" onClick={() => setShowCreateModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-4 sm:px-6 py-2 text-sm sm:text-base lg:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
                                    <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-2" />Create User
                                </button>
                            </div>
                            {addUserSuccess && <div className="text-green-600 font-semibold text-center mt-2 text-sm sm:text-base">User added successfully!</div>}
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <StatCard title="Total Users" value={roleStats.total} icon={Users} gradient="from-blue-500 to-indigo-600" />
                <StatCard title="Active Users" value={roleStats.active} icon={Check} gradient="from-green-500 to-teal-600" />
                <StatCard title="Pending Approval" value={roleStats.pending} icon={Clock} gradient="from-amber-500 to-orange-600" />
                <RoleBreakdownCard stats={roleStats.byRole} />
            </div>

            {/* Users Table - Excel Style */}
            <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table className="w-full border-collapse">
                        <TableHeader>
                            <TableRow className="bg-gray-100 border-b-2 border-gray-300">
                                <TableHead className="p-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">ID</TableHead>
                                <TableHead className="p-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Name</TableHead>
                                <TableHead className="p-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Email</TableHead>
                                <TableHead className="p-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Role</TableHead>
                                <TableHead className="p-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">State</TableHead>
                                <TableHead className="p-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">District</TableHead>
                                <TableHead className="p-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Status</TableHead>
                                <TableHead className="p-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Last Login</TableHead>
                                <TableHead className="p-3 text-center text-sm font-semibold text-gray-700">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userData.map((row, index) => (
                                <TableRow key={row.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200 hover:bg-blue-50 transition-colors`}>
                                    <TableCell className="p-3 text-sm text-gray-900 border-r border-gray-200 font-medium">{row.id}</TableCell>
                                    <TableCell className="p-3 text-sm text-gray-900 border-r border-gray-200 font-medium">{row.name}</TableCell>
                                    <TableCell className="p-3 text-sm text-gray-700 border-r border-gray-200">{row.email}</TableCell>
                                    <TableCell className="p-3 text-sm border-r border-gray-200">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                            row.role === 'State' ? 'bg-blue-100 text-blue-800' :
                                            row.role === 'District' ? 'bg-green-100 text-green-800' : 
                                            'bg-purple-100 text-purple-800'
                                        }`}>
                                            {row.role}
                                        </span>
                                    </TableCell>
                                    <TableCell className="p-3 text-sm text-gray-700 border-r border-gray-200">{row.state}</TableCell>
                                    <TableCell className="p-3 text-sm text-gray-700 border-r border-gray-200">{row.district}</TableCell>
                                    <TableCell className="p-3 text-sm border-r border-gray-200">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                            row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {row.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="p-3 text-sm text-gray-700 border-r border-gray-200">{row.lastLogin}</TableCell>
                                    <TableCell className="p-3 text-center">
                                        <div className="flex justify-center space-x-2">
                                            {row.status === 'Pending' && (
                                                <>
                                                    <button className="p-1 text-green-600 hover:bg-green-100 rounded" title="Approve">
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1 text-red-600 hover:bg-red-100 rounded" title="Reject">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                            <button className="p-1 text-blue-600 hover:bg-blue-100 rounded" title="Edit">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};
