'use client';
import React, { useState } from 'react';
import DataTable from '@/components/ui/data-table';
import StatCard from '@/components/ui/stat-card';
import { FileText, Send, Inbox, Plus } from 'lucide-react';
import IntegratedLoader from '@/components/IntegratedLoader';

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
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

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

  if (loading) {
    return <IntegratedLoader />;
  }

  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
      {/* Enhanced Header */}
      <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
        <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight">
            Directives Management
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold drop-shadow-lg">
            Track directives received from Nodal Officers
          </p>
        </div>
      </header>

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
      <div className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-3xl overflow-hidden">
        <div className="border-b border-gray-200/20 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white">
          <div className="py-4 sm:py-6 px-4 sm:px-6 md:px-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-3">
              <Inbox className="h-5 w-5 sm:h-6 sm:w-6" />
              Directives Received from Nodal Officer
            </h2>
          </div>
        </div>

        <div className="p-3 sm:p-4 md:p-6">
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