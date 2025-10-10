'use client';
import React, { useState } from 'react';
import DataTable from '@/components/ui/data-table';
import { Plus, FileText, Send, Clock, CheckCircle } from 'lucide-react';

const Directives: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'received' | 'issued'>('received');

  const receivedDirectives = [
    { directiveId: 'DIR-2024-001', from: 'State', to: 'All Nodal Officers', title: 'PPE Distribution Guidelines', date: '2024-01-20', status: 'Active', responses: '18/24' },
    { directiveId: 'DIR-2024-002', from: 'National', to: 'Zone A Officers', title: 'Training Schedule Update', date: '2024-01-18', status: 'Pending', responses: '2/8' },
    { directiveId: 'DIR-2024-003', from: 'State', to: 'All Contractors', title: 'Attendance Reporting Changes', date: '2024-01-15', status: 'Completed', responses: '15/15' }
  ];

  const issuedDirectives = [
    { directiveId: 'DIR-2024-004', from: 'You', to: 'Nodal', title: 'Site Safety Protocols', date: '2024-01-22', status: 'Active', responses: '1/1' },
    { directiveId: 'DIR-2024-005', from: 'You', to: 'Nodal', title: 'Material Quality Standards', date: '2024-01-19', status: 'Pending', responses: '0/1' }
  ];

  const columns = [
    { key: 'directiveId', header: 'Directive ID' },
    { key: 'title', header: 'Title' },
    { key: 'from', header: 'From' },
    { key: 'to', header: 'To' },
    { key: 'date', header: 'Date' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'Active' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
          value === 'Pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
          'bg-green-100 text-green-800 border border-green-200'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'responses', header: 'Responses' }
  ];

  const receivedColumns = columns;
  const issuedColumns = [
    ...columns.slice(0, -1), // All except 'responses'
    { 
      key: 'actions', 
      header: 'Actions',
      render: () => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:underline">View</button>
          <button className="text-green-600 hover:underline">Edit</button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 min-h-screen p-6 md:p-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Directives Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 text-white px-5 py-2 rounded-xl hover:scale-105 hover:shadow-lg transition-all flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Issue New Directive</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-col md:flex-row gap-6">
        {[ 
          { label: 'Total Directives', value: 45, icon: FileText, bg: 'from-blue-100 via-blue-200 to-blue-100', iconBg: 'bg-blue-300 text-blue-800' },
          { label: 'Active', value: 12, icon: Clock, bg: 'from-yellow-100 via-yellow-200 to-yellow-100', iconBg: 'bg-yellow-300 text-yellow-800' },
          { label: 'Completed', value: 28, icon: CheckCircle, bg: 'from-green-100 via-green-200 to-green-100', iconBg: 'bg-green-300 text-green-800' }
        ].map((card, idx, arr) => (
          <div key={idx} className={`flex-1 min-w-[220px] rounded-2xl shadow-lg p-6 flex justify-between items-center bg-gradient-to-br ${card.bg} hover:scale-[1.03] transition-transform hover:shadow-xl ${arr.length < 4 && idx === arr.length - 1 ? 'md:mr-auto' : ''}`}>
            <div>
              <p className="text-sm font-medium mb-1">{card.label}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${card.iconBg} shadow-inner`}>
              <card.icon className="h-6 w-6 opacity-90" />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs and Tables */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="border-b border-gray-200 bg-gradient-to-r from-indigo-100 to-pink-100">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('received')}
              className={`py-4 px-6 text-sm font-medium border-b-4 transition-all ${
                activeTab === 'received'
                  ? 'border-indigo-500 text-indigo-700 bg-indigo-50'
                  : 'border-transparent text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Directives Received from higher Authorities
            </button>
            <button
              onClick={() => setActiveTab('issued')}
              className={`py-4 px-6 text-sm font-medium border-b-4 transition-all ${
                activeTab === 'issued'
                  ? 'border-pink-500 text-pink-700 bg-pink-50'
                  : 'border-transparent text-gray-600 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              Directives Issued
            </button>
          </nav>
        </div>

        <div className="p-4">
          {activeTab === 'received' && (
            <DataTable
              title="Received Directives"
              columns={receivedColumns}
              data={receivedDirectives}
              actions={true}
              onView={(row) => console.log('View directive:', row.directiveId)}
            />
          )}
          
          {activeTab === 'issued' && (
            <DataTable
              title="Issued Directives"
              columns={issuedColumns}
              data={issuedDirectives}
              actions={true}
              onView={(row) => console.log('View directive:', row.directiveId)}
              onEdit={(row) => console.log('Edit directive:', row.directiveId)}
            />
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6 animate-fadeIn border border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 py-2 rounded-xl shadow-md">
              Issue New Directive
            </h2>

            <form className="space-y-4">
              {[
                { label: 'Recipients', type: 'select', options: ['All Nodal Officers', 'All Contractors', 'Zone A Officers', 'Zone B Officers', 'Zone C Officers'] },
                { label: 'Title', type: 'text', placeholder: 'Enter directive title' },
                { label: 'Message', type: 'textarea', placeholder: 'Enter directive message', rows: 6 },
                { label: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'] }
              ].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                  {field.type === 'select' ? (
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 hover:scale-[1.01] transition-transform">
                      {field.options!.map((opt, i) => <option key={i}>{opt}</option>)}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea rows={field.rows} placeholder={field.placeholder} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 hover:scale-[1.01] transition-transform"></textarea>
                  ) : (
                    <input type="text" placeholder={field.placeholder} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 hover:scale-[1.01] transition-transform" />
                  )}
                </div>
              ))}
            </form>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white rounded-lg hover:scale-105 hover:shadow-lg transition-all"
              >
                Send Directive
              </button>
            </div>
          </div>
        </div>
      )}
    </div> 
  );
};

export default Directives;
