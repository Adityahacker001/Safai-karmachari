'use client';
import React, { useState, useEffect } from 'react';
import IntegratedLoader from '@/components/layout/IntegratedLoader';
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
  const [activeTab, setActiveTab] = useState('received');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // Loader visible for 1.2s or until UI is ready
    return () => clearTimeout(timer);
  }, []);

  const receivedDirectives = [
    {
      directiveId: 'DIR-2024-001',
      from: 'District Administration',
      subject: 'PPE Distribution Protocol Update',
      date: '2024-01-20',
      status: 'Active',
      priority: 'High'
    },
    {
      directiveId: 'DIR-2024-002',
      from: 'State Health Department',
      subject: 'Health Checkup Schedule',
      date: '2024-01-18',
      status: 'Completed',
      priority: 'Medium'
    },
    {
      directiveId: 'DIR-2024-003',
      from: 'District Administration',
      subject: 'Training Program Implementation',
      date: '2024-01-15',
      status: 'Pending',
      priority: 'Medium'
    },
  ];

  const issuedDirectives = [
    {
      directiveId: 'DIR-OUT-001',
      to: 'ABC Cleaning Services',
      subject: 'Safety Compliance Audit',
      date: '2024-01-22',
      status: 'Active',
      priority: 'High'
    },
    {
      directiveId: 'DIR-OUT-002',
      to: 'All Contractors',
      subject: 'Monthly Performance Review',
      date: '2024-01-20',
      status: 'Completed',
      priority: 'Medium'
    },
    {
      directiveId: 'DIR-OUT-003',
      to: 'Urban Sanitation Ltd',
      subject: 'Grievance Resolution Protocol',
      date: '2024-01-19',
      status: 'Pending',
      priority: 'High'
    },
  ];

  const receivedColumns = [
    { 
      key: 'directiveId', 
      header: 'Directive ID',
      render: (value: string) => (
        <span className="font-mono text-sm font-semibold text-slate-700 bg-slate-50 px-2 py-1 rounded border">
          {value}
        </span>
      )
    },
    { 
      key: 'from', 
      header: 'From',
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
            {value?.split(' ').map(word => word[0]).join('').slice(0, 2)}
          </div>
          <span className="text-sm font-medium text-slate-700">{value}</span>
        </div>
      )
    },
    { 
      key: 'subject', 
      header: 'Subject',
      render: (value: string) => (
        <div className="max-w-xs">
          <span className="text-sm text-slate-800 font-medium line-clamp-2">{value}</span>
        </div>
      )
    },
    { 
      key: 'date', 
      header: 'Date',
      render: (value: string) => (
        <div className="text-sm text-slate-600">
          {new Date(value).toLocaleDateString('en-IN', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          })}
        </div>
      )
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (value: string) => (
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border-2 ${
          value === 'High' 
            ? 'bg-red-50 text-red-700 border-red-200' :
          value === 'Medium' 
            ? 'bg-amber-50 text-amber-700 border-amber-200' :
            'bg-emerald-50 text-emerald-700 border-emerald-200'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            value === 'High' ? 'bg-red-500' :
            value === 'Medium' ? 'bg-amber-500' :
            'bg-emerald-500'
          }`}></div>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border-2 ${
          value === 'Active' 
            ? 'bg-blue-50 text-blue-700 border-blue-200' :
          value === 'Completed' 
            ? 'bg-green-50 text-green-700 border-green-200' :
            'bg-orange-50 text-orange-700 border-orange-200'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            value === 'Active' ? 'bg-blue-500' :
            value === 'Completed' ? 'bg-green-500' :
            'bg-orange-500'
          }`}></div>
          {value}
        </span>
      )
    },
  ];

  const issuedColumns = [
    { 
      key: 'directiveId', 
      header: 'Directive ID',
      render: (value: string) => (
        <span className="font-mono text-sm font-semibold text-slate-700 bg-slate-50 px-2 py-1 rounded border">
          {value}
        </span>
      )
    },
    { 
      key: 'to', 
      header: 'To',
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-xs font-semibold">
            {value?.split(' ').map(word => word[0]).join('').slice(0, 2)}
          </div>
          <span className="text-sm font-medium text-slate-700">{value}</span>
        </div>
      )
    },
    { 
      key: 'subject', 
      header: 'Subject',
      render: (value: string) => (
        <div className="max-w-xs">
          <span className="text-sm text-slate-800 font-medium line-clamp-2">{value}</span>
        </div>
      )
    },
    { 
      key: 'date', 
      header: 'Date',
      render: (value: string) => (
        <div className="text-sm text-slate-600">
          {new Date(value).toLocaleDateString('en-IN', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          })}
        </div>
      )
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (value: string) => (
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border-2 ${
          value === 'High' 
            ? 'bg-red-50 text-red-700 border-red-200' :
          value === 'Medium' 
            ? 'bg-amber-50 text-amber-700 border-amber-200' :
            'bg-emerald-50 text-emerald-700 border-emerald-200'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            value === 'High' ? 'bg-red-500' :
            value === 'Medium' ? 'bg-amber-500' :
            'bg-emerald-500'
          }`}></div>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border-2 ${
          value === 'Active' 
            ? 'bg-blue-50 text-blue-700 border-blue-200' :
          value === 'Completed' 
            ? 'bg-green-50 text-green-700 border-green-200' :
            'bg-orange-50 text-orange-700 border-orange-200'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            value === 'Active' ? 'bg-blue-500' :
            value === 'Completed' ? 'bg-green-500' :
            'bg-orange-500'
          }`}></div>
          {value}
        </span>
      )
    },
  ];

  if (loading) {
    return <IntegratedLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header Card - District Dashboard Style */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Directives Management
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">
              Track received and issued directives
            </p>
          </div>
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold shadow-lg hover:bg-white/30 transition-all duration-300 w-full sm:w-auto"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm sm:text-base">Issue New Directive</span>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mx-4">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Issue New Directive</h2>
                    <p className="text-indigo-100 text-sm">Send directive to contractors and stakeholders</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Recipients</label>
                  <select className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors">
                    <option>All contractors</option>
                    <option>Contractor 1</option>
                    <option>Contractor 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Priority Level</label>
                  <select className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Directive Title</label>
                <input 
                  type="text" 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors" 
                  placeholder="Enter a clear and concise directive title" 
                />
              </div>
              
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Message Content</label>
                <textarea 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors resize-none" 
                  rows={5} 
                  placeholder="Provide detailed instructions and requirements for the directive..." 
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  className="px-6 py-3 rounded-xl border-2 border-gray-200 bg-white text-slate-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl transition-all duration-300"
                >
                  Send Directive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Cards - Using StatCard Component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <StatCard
          title="Received Directives"
          value={receivedDirectives.length}
          subtitle={`Active: ${receivedDirectives.filter(d => d.status === 'Active').length} | Completed: ${receivedDirectives.filter(d => d.status === 'Completed').length}`}
          icon={Inbox}
          color="blue"
        />
        <StatCard
          title="Issued Directives"
          value={issuedDirectives.length}
          subtitle={`Active: ${issuedDirectives.filter(d => d.status === 'Active').length} | Pending: ${issuedDirectives.filter(d => d.status === 'Pending').length}`}
          icon={Send}
          color="green"
        />
        <StatCard
          title="High Priority"
          value={[...receivedDirectives, ...issuedDirectives].filter(d => d.priority === 'High').length}
          subtitle={`Medium: ${[...receivedDirectives, ...issuedDirectives].filter(d => d.priority === 'Medium').length} | Total: ${[...receivedDirectives, ...issuedDirectives].length}`}
          icon={FileText}
          color="red"
        />
      </div>

      {/* Tabs and Tables */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-gray-50">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('received')}
              className={`relative flex-1 py-4 px-6 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'received'
                  ? 'text-indigo-700 bg-white shadow-lg border-b-2 border-indigo-500'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Inbox className="w-4 h-4" />
                <span className="hidden sm:inline">Received Directives</span>
                <span className="sm:hidden">Received</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === 'received' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {receivedDirectives.length}
                </span>
              </div>
              {activeTab === 'received' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('issued')}
              className={`relative flex-1 py-4 px-6 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'issued'
                  ? 'text-indigo-700 bg-white shadow-lg border-b-2 border-indigo-500'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Issued Directives</span>
                <span className="sm:hidden">Issued</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === 'issued' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {issuedDirectives.length}
                </span>
              </div>
              {activeTab === 'issued' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              )}
            </button>
          </nav>
        </div>

        {/* Table Container with Enhanced Styling */}
        <div className="bg-white">
          {activeTab === 'received' && (
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Received Directives</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Directives received from higher authorities
                  </p>
                </div>
              </div>
              <DataTable
                title="Received Directives"
                columns={receivedColumns}
                data={receivedDirectives}
                actions={true}
                onView={(row: Directive) => console.log('View directive:', row.directiveId)}
              />
            </div>
          )}
          
          {activeTab === 'issued' && (
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Issued Directives</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Directives issued to contractors and stakeholders
                  </p>
                </div>
              </div>
              <DataTable
                title="Issued Directives"
                columns={issuedColumns}
                data={issuedDirectives}
                actions={true}
                onView={(row: Directive) => console.log('View directive:', row.directiveId)}
                onEdit={(row: Directive) => console.log('Edit directive:', row.directiveId)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Directives;
