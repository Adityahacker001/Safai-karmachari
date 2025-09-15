'use client';
import React, { useState } from 'react';
import DataTable from '@/components/ui/data-table';
import { FileText, Send, Inbox } from 'lucide-react';

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
    { key: 'directiveId', header: 'Directive ID' },
    { key: 'from', header: 'From' },
    { key: 'subject', header: 'Subject' },
    { key: 'date', header: 'Date' },
    {
      key: 'priority',
      header: 'Priority',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'High' ? 'bg-red-100 text-red-800' :
          value === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
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
          value === 'Active' ? 'bg-blue-100 text-blue-800' :
          value === 'Completed' ? 'bg-green-100 text-green-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
  ];

  const issuedColumns = [
    { key: 'directiveId', header: 'Directive ID' },
    { key: 'to', header: 'To' },
    { key: 'subject', header: 'Subject' },
    { key: 'date', header: 'Date' },
    {
      key: 'priority',
      header: 'Priority',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'High' ? 'bg-red-100 text-red-800' :
          value === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
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
          value === 'Active' ? 'bg-blue-100 text-blue-800' :
          value === 'Completed' ? 'bg-green-100 text-green-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Directives Management</h1>
        <p className="text-gray-600 mt-2">Track received and issued directives</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Received Directives</p>
              <p className="text-3xl font-bold text-gray-900">{receivedDirectives.length}</p>
              <p className="text-sm text-gray-500">
                Active: {receivedDirectives.filter(d => d.status === 'Active').length}
              </p>
            </div>
            <Inbox className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Issued Directives</p>
              <p className="text-3xl font-bold text-gray-900">{issuedDirectives.length}</p>
              <p className="text-sm text-gray-500">
                Pending: {issuedDirectives.filter(d => d.status === 'Pending').length}
              </p>
            </div>
            <Send className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-3xl font-bold text-gray-900">
                {[...receivedDirectives, ...issuedDirectives].filter(d => d.priority === 'High').length}
              </p>
              <p className="text-sm text-gray-500">Requiring attention</p>
            </div>
            <FileText className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Tabs and Tables */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('received')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'received'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Directives Received from District Admin
            </button>
            <button
              onClick={() => setActiveTab('issued')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'issued'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Directives Issued to Contractors
            </button>
          </nav>
        </div>

        <div className="p-0">
          {activeTab === 'received' && (
            <DataTable
              title="Received Directives"
              columns={receivedColumns}
              data={receivedDirectives}
              actions={true}
              onView={(row: Directive) => console.log('View directive:', row.directiveId)}
            />
          )}
          
          {activeTab === 'issued' && (
            <DataTable
              title="Issued Directives"
              columns={issuedColumns}
              data={issuedDirectives}
              actions={true}
              onView={(row: Directive) => console.log('View directive:', row.directiveId)}
              onEdit={(row: Directive) => console.log('Edit directive:', row.directiveId)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Directives;