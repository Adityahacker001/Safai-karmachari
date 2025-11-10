"use client";
import React, { useState } from 'react';
import { Plus, Check, X, Edit2, UserPlus, Users, Clock } from 'lucide-react';
import StatCard from "@/components/ui/stat-card";

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
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
            {/* Enhanced Header */}
            <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
                <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1 flex items-center gap-4">
                            <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-2xl" />
                            <div>
                                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white drop-shadow-2xl leading-tight">
                                    User Management
                                </h1>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-bold drop-shadow-lg">
                                    Manage all system users and their roles
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setShowCreateModal(v => !v)}
                                className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-200 text-sm sm:text-base backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center gap-2 shadow-xl hover:shadow-2xl transform hover:scale-105 font-bold"
                            >
                                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Add New User</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                    title="Total Users"
                    value={roleStats.total}
                    icon={Users}
                    color="blue"
                />
                <StatCard
                    title="Active Users"
                    value={roleStats.active}
                    icon={Check}
                    color="green"
                />
                <StatCard
                    title="Pending Approval"
                    value={roleStats.pending}
                    icon={Clock}
                    color="amber"
                />
                <StatCard
                    title="State Officers"
                    value={roleStats.byRole.state}
                    subtitle={`District: ${roleStats.byRole.district} | Nodal: ${roleStats.byRole.nodal}`}
                    icon={Users}
                    color="purple"
                />
            </div>

            {/* Users Table */}
            <div className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white p-4 sm:p-6 md:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                        <Users className="h-6 w-6 sm:h-8 sm:w-8" />
                        System Users
                    </h3>
                    <p className="text-white/80 text-sm sm:text-base mt-1">Manage all registered users and their permissions</p>
                </div>
                <div className="p-0 overflow-x-auto">
                    <Table className="w-full min-w-[900px] border-collapse">
                        <TableHeader className="bg-slate-50">
                            <TableRow className="border-b border-gray-200">
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base text-left">ID</TableHead>
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base text-left">Name</TableHead>
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base text-left">Email</TableHead>
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base text-left">Role</TableHead>
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base text-left">State</TableHead>
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base text-left">District</TableHead>
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base text-left">Status</TableHead>
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base text-left">Last Login</TableHead>
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userData.map((row, index) => (
                                <TableRow key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-800 text-sm sm:text-base">{row.id}</TableCell>
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-800 text-sm sm:text-base">{row.name}</TableCell>
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">{row.email}</TableCell>
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            row.role === 'State' ? 'bg-blue-100 text-blue-800' :
                                            row.role === 'District' ? 'bg-green-100 text-green-800' : 
                                            'bg-purple-100 text-purple-800'
                                        }`}>
                                            {row.role}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">{row.state}</TableCell>
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">{row.district}</TableCell>
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {row.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">{row.lastLogin}</TableCell>
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6 text-center">
                                        <div className="flex justify-center space-x-1 sm:space-x-2">
                                            {row.status === 'Pending' && (
                                                <>
                                                    <button className="p-1 text-green-600 hover:bg-green-100 rounded" title="Approve">
                                                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    </button>
                                                    <button className="p-1 text-red-600 hover:bg-red-100 rounded" title="Reject">
                                                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    </button>
                                                </>
                                            )}
                                            <button className="p-1 text-blue-600 hover:bg-blue-100 rounded" title="Edit">
                                                <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
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
