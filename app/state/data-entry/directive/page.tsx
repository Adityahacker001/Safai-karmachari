"use client";
import React, { useState } from 'react';
import DataTable from '@/components/ui/data-table';
import { FileText, Plus } from 'lucide-react';
import StatCard from '@/components/ui/stat-card';

const Directives = () => {

  // Tab state
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  // Data for each tab
  const receivedDirectives = [
    { directiveId: 'DIR-2024-001', from: 'State Government', to: 'All Nodal Officers', title: 'PPE Distribution Guidelines', date: '2024-01-20', status: 'Active', responses: '18/24' },
    { directiveId: 'DIR-2024-002', from: 'District Office', to: 'Zone A Officers', title: 'Training Schedule Update', date: '2024-01-18', status: 'Pending', responses: '2/8' },
  ];
  const sentDirectives = [
    { directiveId: 'DIR-2024-003', from: 'District Office', to: 'All Contractors', title: 'Attendance Reporting Changes', date: '2024-01-15', status: 'Completed', responses: '15/15' }
  ];

  // Columns for both tables

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

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    recipients: 'All Nodal Officers',
    title: '',
    message: '',
    priority: 'High',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full p-6 md:p-10 space-y-8">
      {/* Page Header (District-style banner) */}
      <div className="w-full rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            {/* Icon removed visually per request; spacer keeps text placement */}
            <div className="w-12" aria-hidden />
            <div>
              <h1 className="text-3xl font-bold">Directives Management</h1>
              <p className="mt-1 text-sm opacity-90">Manage and track directives across the state</p>
            </div>
          </div>

          <div>
            <button
              className="flex items-center space-x-2 px-5 py-2 bg-white/90 text-slate-800 rounded-2xl font-medium shadow hover:bg-white transition-all text-base"
              onClick={() => setModalOpen(true)}
            >
              <Plus className="w-5 h-5 text-slate-800" />
              <span>Issue New Directive</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-0 relative border border-gray-200">
            <div className="rounded-t-2xl px-8 py-4 bg-gradient-to-r from-purple-200 via-blue-100 to-pink-200">
              <h2 className="text-2xl font-bold text-gray-800 text-center">Issue New Directive</h2>
            </div>
            <form className="p-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Recipients</label>
                <select
                  name="recipients"
                  value={form.recipients}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                >
                  <option>All Nodal Officers</option>
                  <option>All Districts</option>
                  <option>State Office</option>
                  <option>NCSK</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter directive title"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Enter directive message"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none placeholder-gray-400 min-h-[100px]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100 transition"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-700 transition"
                >
                  Send Directive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Cards (use StatCard component) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Directives" value={247} icon={FileText} color="blue" />
        <StatCard title="Active" value={89} icon={FileText} color="green" />
        <StatCard title="Pending" value={34} icon={FileText} color="orange" />
        <StatCard title="Completed" value={124} icon={FileText} color="indigo" />
      </div>

      {/* Tabs for Received and Sent Directives */}
      <div className="flex space-x-2 mb-4 mt-8">
        <button
          className={`px-5 py-2 rounded-t-xl font-semibold transition-all border-b-4 ${activeTab === 'received' ? 'bg-white border-blue-500 text-blue-700 shadow' : 'bg-slate-100 border-transparent text-gray-500'}`}
          onClick={() => setActiveTab('received')}
        >
          Received Directives
        </button>
        <button
          className={`px-5 py-2 rounded-t-xl font-semibold transition-all border-b-4 ${activeTab === 'sent' ? 'bg-white border-purple-500 text-purple-700 shadow' : 'bg-slate-100 border-transparent text-gray-500'}`}
          onClick={() => setActiveTab('sent')}
        >
          Sent Directives
        </button>
      </div>

      {/* Tab Content: Received Directives */}
      {activeTab === 'received' && (
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
              {receivedDirectives.map((row, idx) => (
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
      )}

      {/* Tab Content: Sent Directives */}
      {activeTab === 'sent' && (
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
              {sentDirectives.map((row, idx) => (
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
      )}
    </div>
  );
};

export default Directives;