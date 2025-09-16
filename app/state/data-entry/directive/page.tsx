"use client";
import React from 'react';
import DataTable from '@/components/ui/data-table';
import { FileText, Plus } from 'lucide-react';

const Directives = () => {
  const directivesData = [
    {
      id: 'DIR001',
      from: 'NCSK',
      to: 'All Districts',
      date: '2024-01-15',
      status: 'Active',
      title: 'Safety Protocol Update'
    },
    {
      id: 'DIR002',
      from: 'State Office',
      to: 'Mumbai District',
      date: '2024-01-14',
      status: 'Pending',
      title: 'PPE Distribution Guidelines'
    },
    {
      id: 'DIR003',
      from: 'NCSK',
      to: 'Nodal Officers',
      date: '2024-01-12',
      status: 'Completed',
      title: 'Monthly Reporting Format'
    },
    {
      id: 'DIR004',
      from: 'State Office',
      to: 'Pune District',
      date: '2024-01-10',
      status: 'Active',
      title: 'Training Schedule Update'
    },
    {
      id: 'DIR005',
      from: 'NCSK',
      to: 'All Districts',
      date: '2024-01-08',
      status: 'Active',
      title: 'Worker Welfare Scheme Enhancement'
    },
  ];

  const columns = [
    { key: 'id', header: 'Directive ID', sortable: true },
    { key: 'title', header: 'Title', sortable: true },
    { 
      key: 'from', 
      header: 'From', 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'NCSK' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'to', header: 'To', sortable: true },
    { key: 'date', header: 'Date', sortable: true },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Active': 'bg-green-100 text-green-800',
          'Pending': 'bg-yellow-100 text-yellow-800',
          'Completed': 'bg-blue-100 text-blue-800',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value as keyof typeof colors]}`}>
            {value}
          </span>
        );
      }
    },
    { 
      key: 'action', 
      header: 'Action',
      render: () => (
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
            View
          </button>
          <button className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            Edit
          </button>
        </div>
      )
    },
  ];

  const actionButton = (
    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
      <Plus className="w-4 h-4" />
      <span>Issue New Directive</span>
    </button>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 p-6 md:p-10 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Directives Management</h1>
          <p className="text-gray-600 mt-1">Manage and track directives across the state</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <div className="p-6 rounded-xl shadow-md border border-blue-200 bg-gradient-to-br from-blue-400 via-blue-300 to-pink-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Directives</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">247</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>
  <div className="p-6 rounded-xl shadow-md border border-green-200 bg-gradient-to-br from-green-400 via-green-200 to-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Active</p>
              <p className="text-2xl font-bold text-green-600 mt-1">89</p>
            </div>
            <div className="w-12 h-12 bg-green-50 border border-green-200 text-green-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>
  <div className="p-6 rounded-xl shadow-md border border-yellow-200 bg-gradient-to-br from-yellow-300 via-yellow-200 to-pink-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">34</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 border border-yellow-200 text-yellow-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>
  <div className="p-6 rounded-xl shadow-md border border-blue-200 bg-gradient-to-br from-blue-400 via-purple-200 to-pink-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Completed</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">124</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Directives Table */}
      <div>
        <div className="overflow-x-auto rounded-xl shadow border border-blue-100">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 via-purple-400 to-pink-400 text-white">
                <th className="px-4 py-3 font-bold text-left">Directive ID</th>
                <th className="px-4 py-3 font-bold text-left">Title</th>
                <th className="px-4 py-3 font-bold text-left">From</th>
                <th className="px-4 py-3 font-bold text-left">To</th>
                <th className="px-4 py-3 font-bold text-left">Date</th>
                <th className="px-4 py-3 font-bold text-left">Status</th>
                <th className="px-4 py-3 font-bold text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {directivesData.map((row) => (
                <tr
                  key={row.id}
                  className="bg-white"
                >
                  <td className="px-4 py-3 border-b border-blue-100 font-semibold">{row.id}</td>
                  <td className="px-4 py-3 border-b border-blue-100">{row.title}</td>
                  <td className="px-4 py-3 border-b border-blue-100">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.from === 'NCSK' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{row.from}</span>
                  </td>
                  <td className="px-4 py-3 border-b border-blue-100">{row.to}</td>
                  <td className="px-4 py-3 border-b border-blue-100">{row.date}</td>
                  <td className="px-4 py-3 border-b border-blue-100">
                    {(() => {
                      const colors = {
                        'Active': 'bg-green-100 text-green-800',
                        'Pending': 'bg-yellow-100 text-yellow-800',
                        'Completed': 'bg-blue-100 text-blue-800',
                      };
                      return (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[row.status as keyof typeof colors]}`}>{row.status}</span>
                      );
                    })()}
                  </td>
                  <td className="px-4 py-3 border-b border-blue-100">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-semibold shadow-sm">View</button>
                      <button className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-semibold shadow-sm">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Directives;