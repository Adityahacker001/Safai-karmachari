'use client';
import React, { useState } from 'react';
import DataTable from '@/components/ui/data-table';
import { FileText, Send, Inbox, Plus } from 'lucide-react';

interface Directive {
  directiveId: string;
  from?: string;
  to?: string;
  subject: string;
  date: string;
  status: string;
  priority: string;
}

const Directives = () => {
  const [showModal, setShowModal] = useState(false);

  const receivedDirectives = [
    {
      directiveId: 'DIR-2024-001',
      from: 'Nodal Officer (District A)',
      subject: 'PPE Distribution Protocol Update',
      date: '2024-01-20',
      status: 'Active',
      priority: 'High'
    },
    {
      directiveId: 'DIR-2024-002',
      from: 'Nodal Officer (State Health)',
      subject: 'Health Checkup Schedule',
      date: '2024-01-18',
      status: 'Completed',
      priority: 'Medium'
    },
    {
      directiveId: 'DIR-2024-003',
      from: 'Nodal Officer (District B)',
      subject: 'Training Program Implementation',
      date: '2024-01-15',
      status: 'Pending',
      priority: 'Medium'
    },
  ];

  const receivedColumns = [
    { key: 'directiveId', header: 'Directive ID' },
    { key: 'from', header: 'From' },
    { key: 'subject', header: 'Subject' },
    { key: 'date', header: 'Date' },
    {
      key: 'priority',
      header: 'Priority',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'High' ? 'bg-red-200 text-red-800' :
          value === 'Medium' ? 'bg-yellow-200 text-yellow-900' :
          'bg-green-200 text-green-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-blue-200 text-blue-800' :
          value === 'Completed' ? 'bg-green-200 text-green-800' :
          'bg-yellow-200 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
  ];

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 rounded-xl shadow-lg">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-pink-600 to-yellow-500 bg-clip-text text-transparent">
            Directives Management
          </h1>
          <p className="text-gray-700 mt-2">Track directives received from Nodal Officers</p>
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition-all"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-5 h-5" />
            Issue New Directive
          </button>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 relative">
                <div className="-mx-8 -mt-8 mb-8 rounded-t-2xl px-8 py-4" style={{background: 'linear-gradient(90deg, #e0c3fc 0%, #8ec5fc 100%)'}}>
                  <h2 className="text-2xl font-bold text-black text-center">Issue New Directive</h2>
                </div>
                <form className="space-y-5">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Recipients</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                      <option>All Nodal Officers</option>
                      <option>District Admin</option>
                      <option>State Health Department</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Title</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Enter directive title" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Message</label>
                    <textarea className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" rows={4} placeholder="Enter directive message" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Priority</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" className="px-5 py-2 rounded-md border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="px-5 py-2 rounded-md bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold shadow hover:from-blue-500 hover:to-blue-700">Send Directive</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Received Directives</p>
              <p className="text-3xl font-bold">{receivedDirectives.length}</p>
              <p className="text-sm opacity-90">
                Active: {receivedDirectives.filter(d => d.status === 'Active').length}
              </p>
            </div>
            <Inbox className="w-10 h-10 opacity-90" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">High Priority Received</p>
              <p className="text-3xl font-bold">
                {receivedDirectives.filter(d => d.priority === 'High').length}
              </p>
              <p className="text-sm opacity-90">Requiring attention</p>
            </div>
            <FileText className="w-10 h-10 opacity-90" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="border-b border-gray-200 bg-gradient-to-r from-indigo-100 to-pink-100">
          <div className="py-4 px-6 text-sm font-medium text-indigo-700 bg-indigo-50">
            Directives Received from Nodal Officer
          </div>
        </div>

        <div className="p-4">
            <DataTable
              title="Received Directives"
              columns={receivedColumns}
              data={receivedDirectives}
              actions={true}
              onView={(row: Directive) => console.log('View directive:', row.directiveId)}
            />
        </div>
      </div>
    </div>
  );
};

export default Directives;