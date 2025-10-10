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
    <div className={`relative bg-gradient-to-br ${gradient} p-6 rounded-2xl shadow-lg text-white overflow-hidden transition-transform transform hover:-translate-y-1.5 duration-300`}>
        <Icon className="absolute -right-4 -bottom-4 h-24 w-24 text-white/10" />
        <div className="relative">
            <p className="font-semibold text-lg text-white/90">{title}</p>
            <p className="text-5xl font-bold mt-2">{value}</p>
        </div>
    </div>
);


interface RoleBreakdownStats {
    state: number;
    district: number;
    nodal: number;
}
const RoleBreakdownCard = ({ stats }: { stats: RoleBreakdownStats }) => (
    <div className="relative bg-gradient-to-br from-slate-50 to-gray-100 p-6 rounded-2xl shadow-lg text-slate-800 overflow-hidden transition-transform transform hover:-translate-y-1.5 duration-300">
        <Users className="absolute -right-4 -bottom-4 h-24 w-24 text-slate-500/10" />
        <div className="relative">
            <p className="font-semibold text-lg text-slate-700/90 mb-3">Users by Role</p>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-slate-600">State Officers:</span>
                    <span className="font-bold text-lg text-blue-600 bg-blue-100 px-2 rounded-md">{stats.state}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-600">District Officers:</span>
                    <span className="font-bold text-lg text-green-600 bg-green-100 px-2 rounded-md">{stats.district}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-600">Nodal Officers:</span>
                    <span className="font-bold text-lg text-purple-600 bg-purple-100 px-2 rounded-md">{stats.nodal}</span>
                </div>
            </div>
        </div>
    </div>
);


export default function UserManagement() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'District', state: '', district: '' });

    const userData = [
        { id: 'USR-001', name: 'Abishek Kumar', email: 'Abishek.kumar@up.gov.in', role: 'State', state: 'Uttar Pradesh', district: 'All', status: 'Active', lastLogin: '2024-01-15 10:30', created: '2023-08-15' },
        { id: 'USR-002', name: 'Priya Sharma', email: 'priya.sharma@mh.gov.in', role: 'State', state: 'Maharashtra', district: 'All', status: 'Active', lastLogin: '2024-01-15 14:20', created: '2023-09-10' },
        { id: 'USR-003', name: 'Amit Singh', email: 'amit.singh@lucknow.gov.in', role: 'District', state: 'Uttar Pradesh', district: 'Lucknow', status: 'Active', lastLogin: '2024-01-14 16:45', created: '2023-10-05' },
        { id: 'USR-004', name: 'Sunita Devi', email: 'sunita.devi@mumbai.gov.in', role: 'District', state: 'Maharashtra', district: 'Mumbai', status: 'Pending', lastLogin: 'Never', created: '2024-01-10' },
        { id: 'USR-005', name: 'Vikram Joshi', email: 'vikram.joshi@nodal.gov.in', role: 'Nodal', state: 'All', district: 'All', status: 'Active', lastLogin: '2024-01-15 09:15', created: '2023-07-20' },
    ];

    const handleCreateUser = () => {
        console.log('Creating user:', newUser);
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

    const Pill = ({ text, gradient }: { text: string; gradient: string }) => <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm bg-gradient-to-r ${gradient}`}>{text}</span>;

    return (
        <div className="space-y-8 p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-slate-800">User Management</h1>
                    <p className="mt-1 text-md text-slate-500">Manage all system users and their roles.</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="mt-4 sm:mt-0 px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    <Plus className="w-5 h-5" />
                    <span className="font-semibold">Add New User</span>
                </button>
            </div>

            {/* User Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={roleStats.total} icon={Users} gradient="from-blue-500 to-indigo-600" />
                <StatCard title="Active Users" value={roleStats.active} icon={Check} gradient="from-green-500 to-teal-600" />
                <StatCard title="Pending Approval" value={roleStats.pending} icon={Clock} gradient="from-amber-500 to-orange-600" />
                <RoleBreakdownCard stats={roleStats.byRole} />
            </div>

            {/* Users Table */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/80 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow className="border-b-0">
                                <TableHead className="p-5 text-sm font-semibold text-slate-600">User</TableHead>
                                <TableHead className="text-sm font-semibold text-slate-600">Role</TableHead>
                                <TableHead className="text-sm font-semibold text-slate-600">Location</TableHead>
                                <TableHead className="text-sm font-semibold text-slate-600">Status</TableHead>
                                <TableHead className="text-sm font-semibold text-slate-600">Last Login</TableHead>
                                <TableHead className="text-sm font-semibold text-slate-600 text-right pr-5">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userData.map((row) => (
                                <TableRow key={row.id} className="border-gray-200/50 hover:bg-gray-50/50 transition-colors">
                                    <TableCell className="p-5">
                                        <div className="font-bold text-slate-800">{row.name}</div>
                                        <div className="text-xs text-slate-500">{row.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Pill text={row.role} gradient={
                                            row.role === 'State' ? 'from-blue-500 to-cyan-600' :
                                            row.role === 'District' ? 'from-green-500 to-teal-600' : 'from-purple-500 to-indigo-600'
                                        } />
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium text-slate-700">{row.state}</div>
                                        <div className="text-xs text-slate-500">{row.district}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Pill text={row.status} gradient={row.status === 'Active' ? 'from-green-400 to-green-500' : 'from-amber-400 to-orange-500'} />
                                    </TableCell>
                                    <TableCell className="text-sm text-slate-600">{row.lastLogin}</TableCell>
                                    <TableCell className="text-right pr-5">
                                        <div className="flex space-x-2 justify-end">
                                            {row.status === 'Pending' && (
                                                <>
                                                    <button className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors" title="Approve"><Check className="w-4 h-4" /></button>
                                                    <button className="p-2 text-orange-600 hover:bg-orange-100 rounded-full transition-colors" title="Reject"><X className="w-4 h-4" /></button>
                                                </>
                                            )}
                                            <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Create User Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-slate-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl transform transition-all">
                        <div className="p-6 border-b border-gray-200 bg-slate-50 rounded-t-2xl">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-slate-800">Add New User</h3>
                                <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">Enter the details for the new system user.</p>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Form fields... */}
                            <div>
                               <label className="block text-sm font-semibold text-slate-600 mb-1">Full Name</label>
                               <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="e.g., Anjali Verma" />
                            </div>
                             <div>
                               <label className="block text-sm font-semibold text-slate-600 mb-1">Email</label>
                               <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="e.g., anjali.verma@gov.in" />
                            </div>
                            <div>
                               <label className="block text-sm font-semibold text-slate-600 mb-1">Password</label>
                               <input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Enter a secure password" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-1">Role</label>
                                <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400">
                                    <option value="District">District Officer</option>
                                    <option value="State">State Officer</option>
                                    <option value="Nodal">Nodal Officer</option>
                                </select>
                            </div>
                             {/* Other fields */}
                        </div>
                        <div className="flex justify-end space-x-4 p-6 bg-slate-50 rounded-b-2xl">
                            <button onClick={() => setShowCreateModal(false)} className="px-5 py-2 text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors font-semibold">Cancel</button>
                            <button onClick={handleCreateUser} className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center space-x-2 shadow-md">
                                <UserPlus className="w-4 h-4" />
                                <span>Create User</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
