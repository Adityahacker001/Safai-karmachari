'use client';
import React, { useState } from 'react';
import DataTable from '@/components/ui/data-table';
import StatCard from '@/components/ui/stat-card';
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
    <div className="min-h-screen w-full max-w-full sm:max-w-full md:max-w-7xl mx-auto p-4 sm:p-6 md:p-12 space-y-6 sm:space-y-8 md:space-y-10">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Directives Management
        </h1>
        <p className="text-gray-600 mt-2 sm:mt-3 text-base sm:text-lg md:text-xl">Track directives received from Nodal Officers</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-4">
          {/* <button
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition-all"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-5 h-5" />
            Issue New Directive
          </button> */}
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
      <div className="w-full max-w-full sm:max-w-full md:max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <StatCard
          title="Received Directives"
          value={receivedDirectives.length}
          subtitle={`Active: ${receivedDirectives.filter(d => d.status === 'Active').length}`}
          icon={Inbox}
          color="sky"
        />

        <StatCard
          title="High Priority Received"
          value={receivedDirectives.filter(d => d.priority === 'High').length}
          subtitle="Requiring attention"
          icon={FileText}
          color="amber"
        />
      </div>

      {/* Table */}
      <div className="w-full max-w-full sm:max-w-full md:max-w-6xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1">
        <div className="border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg">
          <div className="py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-medium">
            Directives Received from Nodal Officer
          </div>
        </div>

        <div className="p-4 sm:p-6">
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