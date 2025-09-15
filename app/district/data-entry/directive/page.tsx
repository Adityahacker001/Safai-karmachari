"use client";
import React, { useState } from 'react';
import DataTable from '@/components/ui/data-table';
import { Plus, FileText, Send, Clock, CheckCircle } from 'lucide-react';

const Directives: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const directiveData = [
    {
      directiveId: 'DIR-2024-001',
      from: 'State Government',
      to: 'All Nodal Officers',
      title: 'PPE Distribution Guidelines',
      date: '2024-01-20',
      status: 'Active',
      responses: '18/24'
    },
    {
      directiveId: 'DIR-2024-002',
      from: 'District Office',
      to: 'Zone A Officers',
      title: 'Training Schedule Update',
      date: '2024-01-18',
      status: 'Pending',
      responses: '2/8'
    },
    {
      directiveId: 'DIR-2024-003',
      from: 'District Office',
      to: 'All Contractors',
      title: 'Attendance Reporting Changes',
      date: '2024-01-15',
      status: 'Completed',
      responses: '15/15'
    }
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
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-blue-100 text-blue-800' :
          value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'responses', header: 'Responses' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Directives Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Issue New Directive</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Directives</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-600">
              <FileText className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-600">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
              <p className="text-2xl font-bold text-gray-900">28</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-600">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900">87%</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-purple-600">
              <Send className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <DataTable
        title="All Directives"
        columns={columns}
        data={directiveData}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Issue New Directive</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipients
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                  <option>All Nodal Officers</option>
                  <option>All Contractors</option>
                  <option>Zone A Officers</option>
                  <option>Zone B Officers</option>
                  <option>Zone C Officers</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter directive title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter directive message"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </form>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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