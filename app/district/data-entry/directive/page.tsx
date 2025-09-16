'use client';
import React, { useState } from 'react';
import DataTable from '@/components/ui/data-table';
import { Plus, FileText, Send, Clock, CheckCircle } from 'lucide-react';

const Directives: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const directiveData = [
    { directiveId: 'DIR-2024-001', from: 'State Government', to: 'All Nodal Officers', title: 'PPE Distribution Guidelines', date: '2024-01-20', status: 'Active', responses: '18/24' },
    { directiveId: 'DIR-2024-002', from: 'District Office', to: 'Zone A Officers', title: 'Training Schedule Update', date: '2024-01-18', status: 'Pending', responses: '2/8' },
    { directiveId: 'DIR-2024-003', from: 'District Office', to: 'All Contractors', title: 'Attendance Reporting Changes', date: '2024-01-15', status: 'Completed', responses: '15/15' }
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Directives', value: 45, icon: FileText, bg: 'from-blue-100 via-blue-200 to-blue-100', iconBg: 'bg-blue-300 text-blue-800' },
          { label: 'Active', value: 12, icon: Clock, bg: 'from-yellow-100 via-yellow-200 to-yellow-100', iconBg: 'bg-yellow-300 text-yellow-800' },
          { label: 'Completed', value: 28, icon: CheckCircle, bg: 'from-green-100 via-green-200 to-green-100', iconBg: 'bg-green-300 text-green-800' },
          { label: 'Response Rate', value: '87%', icon: Send, bg: 'from-purple-100 via-purple-200 to-purple-100', iconBg: 'bg-purple-300 text-purple-800' }
        ].map((card, idx) => (
          <div key={idx} className={`rounded-2xl shadow-lg p-6 flex justify-between items-center bg-gradient-to-br ${card.bg} hover:scale-[1.03] transition-transform hover:shadow-xl`}>
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

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-lg p-4 overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-gray-800">
          <thead>
            <tr className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-gray-900">
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 py-2 border border-gray-300 text-left">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {directiveData.map((row, idx) => (
              <tr key={idx} className="bg-white hover:bg-pink-50 transition-colors">
                {columns.map((col, cIdx) => (
                  <td key={cIdx} className="px-4 py-2 border border-gray-300">
                    {col.render ? col.render((row as any)[col.key]) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
