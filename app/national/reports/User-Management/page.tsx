"use client";
import React, { useState } from 'react';
import { Plus, Check, X, Edit2, UserPlus } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead
} from '@/components/ui/table';

export default function UserManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'District',
    state: '',
    district: '',
  });

  const userData = [
    {
      id: 'USR-001',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@up.gov.in',
      role: 'State',
      state: 'Uttar Pradesh',
      district: 'All',
      status: 'Active',
      lastLogin: '2024-01-15 10:30',
      created: '2023-08-15',
    },
    {
      id: 'USR-002',
      name: 'Priya Sharma',
      email: 'priya.sharma@mh.gov.in',
      role: 'State',
      state: 'Maharashtra',
      district: 'All',
      status: 'Active',
      lastLogin: '2024-01-15 14:20',
      created: '2023-09-10',
    },
    {
      id: 'USR-003',
      name: 'Amit Singh',
      email: 'amit.singh@lucknow.gov.in',
      role: 'District',
      state: 'Uttar Pradesh',
      district: 'Lucknow',
      status: 'Active',
      lastLogin: '2024-01-14 16:45',
      created: '2023-10-05',
    },
    {
      id: 'USR-004',
      name: 'Sunita Devi',
      email: 'sunita.devi@mumbai.gov.in',
      role: 'District',
      state: 'Maharashtra',
      district: 'Mumbai',
      status: 'Pending',
      lastLogin: 'Never',
      created: '2024-01-10',
    },
    {
      id: 'USR-005',
      name: 'Vikram Joshi',
      email: 'vikram.joshi@nodal.gov.in',
      role: 'Nodal',
      state: 'All',
      district: 'All',
      status: 'Active',
      lastLogin: '2024-01-15 09:15',
      created: '2023-07-20',
    },
  ];


  const handleCreateUser = () => {
    console.log('Creating user:', newUser);
    setShowCreateModal(false);
    setNewUser({
      name: '',
      email: '',
      role: 'District',
      state: '',
      district: '',
    });
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <UserPlus className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-xl font-bold text-gray-900">{roleStats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <Check className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-xl font-bold text-gray-900">{roleStats.active}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <X className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-600">Pending Approval</p>
              <p className="text-xl font-bold text-gray-900">{roleStats.pending}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div>
            <p className="text-sm text-gray-600 mb-2">Users by Role</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>State:</span>
                <span className="font-medium">{roleStats.byRole.state}</span>
              </div>
              <div className="flex justify-between">
                <span>District:</span>
                <span className="font-medium">{roleStats.byRole.district}</span>
              </div>
              <div className="flex justify-between">
                <span>Nodal:</span>
                <span className="font-medium">{roleStats.byRole.nodal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>State</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <span className={(() => {
                    const roleColors: { [key: string]: string } = {
                      'State': 'bg-blue-100 text-blue-800',
                      'District': 'bg-green-100 text-green-800',
                      'Nodal': 'bg-purple-100 text-purple-800',
                    };
                    return `px-2 py-1 rounded-full text-xs font-medium ${roleColors[row.role] || ''}`;
                  })()}>{row.role}</span>
                </TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.district}</TableCell>
                <TableCell>
                  <span className={(() => {
                    const statusColors: { [key: string]: string } = {
                      'Active': 'bg-green-100 text-green-800',
                      'Pending': 'bg-yellow-100 text-yellow-800',
                      'Suspended': 'bg-red-100 text-red-800',
                    };
                    return `px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status] || ''}`;
                  })()}>{row.status}</span>
                </TableCell>
                <TableCell>{row.lastLogin}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {row.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => console.log('Approve user:', row.id)}
                          className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                          title="Approve"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => console.log('Reject user:', row.id)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                          title="Reject"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => console.log('Edit user:', row.id)}
                      className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="District">District Officer</option>
                  <option value="State">State Officer</option>
                  <option value="Nodal">Nodal Officer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  value={newUser.state}
                  onChange={(e) => setNewUser({ ...newUser, state: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter state"
                />
              </div>

              {newUser.role === 'District' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <input
                    type="text"
                    value={newUser.district}
                    onChange={(e) => setNewUser({ ...newUser, district: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter district"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
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
