'use client';
import React, { useState } from 'react';
import DataTable from '@/components/ui/data-table';
import StatCard from '@/components/ui/stat-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, FileText, Send, Clock, CheckCircle, Search, X } from 'lucide-react';

const Directives: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter directives based on search term
  const filteredDirectives = directiveData.filter(directive => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      directive.directiveId.toLowerCase().includes(searchLower) ||
      directive.title.toLowerCase().includes(searchLower) ||
      directive.from.toLowerCase().includes(searchLower) ||
      directive.to.toLowerCase().includes(searchLower) ||
      directive.status.toLowerCase().includes(searchLower) ||
      directive.date.toLowerCase().includes(searchLower)
    );
  });

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
    <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-4 sm:space-y-6 min-h-screen">

      {/* Enhanced Header */}
      <header className="mb-4 sm:mb-6 lg:mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
        <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-2xl leading-tight">
              Directives Management
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-bold drop-shadow-lg mt-1 sm:mt-2">
              Issue and track directives across all district units
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:scale-105 hover:shadow-lg transition-all flex items-center space-x-1.5 sm:space-x-2 border border-white/30"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base font-semibold">Issue New Directive</span>
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <StatCard
          title="Total Directives"
          value={45}
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Active"
          value={12}
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Completed"
          value={28}
          icon={CheckCircle}
          color="green"
        />
      </div>

      {/* Data Table */}
      <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl p-3 sm:p-4 md:p-6">
        {/* Global Search and Export */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search directives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button className="px-3 sm:px-4 py-2 sm:py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base font-medium">
              Export Excel
            </button>
            <button className="px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base font-medium">
              Export PDF
            </button>
          </div>
        </div>
        
        {/* Table Container */}
        <div className="overflow-x-auto">
          <Table className="min-w-full table-auto border-collapse text-gray-800">
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b-2 border-blue-200">
              {columns.map((col, idx) => (
                <TableHead key={idx} className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white/50 backdrop-blur-sm">
            {filteredDirectives.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-blue-50/70 transition-colors border-b border-gray-100">
                {columns.map((col, cIdx) => (
                  <TableCell key={cIdx} className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-800">
                    {col.render ? col.render((row as any)[col.key]) : (row as any)[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
