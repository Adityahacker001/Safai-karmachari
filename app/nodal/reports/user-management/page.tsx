"use client";

import React from 'react';
import DataTable from '../../../../components/ui/data-table';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

interface User {
  userId: string;
  name: string;
  role: string;
  company: string;
  status: 'Active' | 'Pending Approval' | 'Suspended';
  lastLogin: string;
  joinDate: string;
}

const UserManagement = () => {
  const users: User[] = [
    {
      userId: 'USR-001',
      name: 'Rajesh Kumar',
      role: 'Contractor',
      company: 'ABC Cleaning Services',
      status: 'Active',
      lastLogin: '2024-01-27',
      joinDate: '2023-06-15'
    },
    {
      userId: 'USR-002',
      name: 'Priya Sharma',
      role: 'Worker Supervisor',
      company: 'City Maintenance Corp',
      status: 'Active',
      lastLogin: '2024-01-26',
      joinDate: '2023-08-22'
    },
    {
      userId: 'USR-003',
      name: 'Amit Singh',
      role: 'Contractor',
      company: 'Metro Clean Solutions',
      status: 'Pending Approval',
      lastLogin: 'Never',
      joinDate: '2024-01-25'
    },
    {
      userId: 'USR-004',
      name: 'Sunita Devi',
      role: 'Worker Supervisor',
      company: 'Urban Sanitation Ltd',
      status: 'Active',
      lastLogin: '2024-01-25',
      joinDate: '2023-09-10'
    },
    {
      userId: 'USR-005',
      name: 'Mohd. Ali',
      role: 'Contractor',
      company: 'Green Earth Services',
      status: 'Suspended',
      lastLogin: '2024-01-20',
      joinDate: '2023-04-18'
    },
  ];

  const userColumns = [
    { key: 'userId', header: 'User ID' },
    { key: 'name', header: 'Name' },
    {
      key: 'role',
      header: 'Role',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Contractor' ? 'bg-blue-100 text-blue-800' :
          'bg-green-100 text-green-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'company', header: 'Company' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-green-100 text-green-800' :
          value === 'Pending Approval' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'lastLogin', header: 'Last Login' },
  ];

  const userStats = [
    { title: 'Total Users', value: users.length, icon: Users, color: 'blue' },
    { title: 'Active Users', value: users.filter(u => u.status === 'Active').length, icon: UserCheck, color: 'green' },
    { title: 'Pending Approval', value: users.filter(u => u.status === 'Pending Approval').length, icon: Clock, color: 'yellow' },
    { title: 'Suspended Users', value: users.filter(u => u.status === 'Suspended').length, icon: UserX, color: 'red' },
  ];

  const handleApprove = (user: User) => {
    console.log('Approve user:', user.userId);
    alert(`Approving user: ${user.name}`);
  };

  const handleSuspend = (user: User) => {
    console.log('Suspend user:', user.userId);
    alert(`Suspending user: ${user.name}`);
  };

  const handleAssignRole = (user: User) => {
    console.log('Assign role to user:', user.userId);
    alert(`Assigning new role to: ${user.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-2">Manage contractor and supervisor accounts</p>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        ))}
      </div>

      {/* User Management Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Add New User
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Bulk Approve
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
            Export User List
          </button>
        </div>
      </div>

      {/* Users Table */}
      <DataTable
        title="User Accounts"
        columns={userColumns}
        data={users}
        actions={true}
        onView={(row: User) => console.log('View user profile:', row.userId)}
        onEdit={(row: User) => console.log('Edit user:', row.userId)}
        onDelete={(row: User) => console.log('Delete user:', row.userId)}
      />

      {/* Quick Actions Panel */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {users.filter(u => u.status === 'Pending Approval').map((user) => (
              <div key={user.userId} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{user.name}</h4>
                <p className="text-sm text-gray-600">{user.role} - {user.company}</p>
                <p className="text-sm text-gray-500 mb-3">Applied: {user.joinDate}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(user)}
                    className="flex-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleSuspend(user)}
                    className="flex-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {users.filter(u => u.status === 'Pending Approval').length === 0 && (
            <p className="text-gray-500 text-center py-8">No pending approvals</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;