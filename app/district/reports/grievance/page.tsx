"use client";
import React, { useState } from 'react';
import DashboardCard from '@/components/dashboard/dashboard-card';
import DataTable from '@/components/ui/data-table';
import {
  MessageSquareWarning,
  CheckCircle,
  Clock,
  AlertTriangle,
  Timer
} from 'lucide-react';

const Grievances: React.FC = () => {
  const [activeTab, setActiveTab] = useState('summary');

  const nodalOfficerData = [
    {
      officer: 'Abishek Kumar',
      zone: 'Zone A',
      total: 45,
      resolved: 38,
      pending: 5,
      escalated: 2,
      avgTime: '2.3 days'
    },
    {
      officer: 'Priya Sharma',
      zone: 'Zone B',
      total: 52,
      resolved: 45,
      pending: 4,
      escalated: 3,
      avgTime: '1.8 days'
    },
    {
      officer: 'Amit Singh',
      zone: 'Zone C',
      total: 38,
      resolved: 32,
      pending: 4,
      escalated: 2,
      avgTime: '2.1 days'
    }
  ];

  const escalatedGrievances = [
    {
      grievanceId: 'GRV-2024-001',
      contractor: 'Clean City Services',
      officer: 'Abishek Kumar',
      dateRaised: '2024-01-15',
      daysPending: 12,
      status: 'Under Review'
    },
    {
      grievanceId: 'GRV-2024-002',
      contractor: 'Green Solutions Ltd',
      officer: 'Priya Sharma',
      dateRaised: '2024-01-18',
      daysPending: 9,
      status: 'Awaiting Response'
    },
    {
      grievanceId: 'GRV-2024-003',
      contractor: 'Urban Care Co.',
      officer: 'Amit Singh',
      dateRaised: '2024-01-20',
      daysPending: 7,
      status: 'Investigation'
    }
  ];

  const summaryColumns = [
    { key: 'officer', header: 'Nodal Officer' },
    { key: 'zone', header: 'Zone' },
    { key: 'grievanceId', header: 'Grievance ID' },
    { key: 'dateRaised', header: 'Date Raised' },
    { key: 'pending', header: 'Pending Days' },
    { key: 'status', header: 'Status' },
    {
      key: 'actions',
      header: 'Actions',
      render: (row: any) => (
        <button
          className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md text-xs font-medium hover:scale-105 transition"
          onClick={() => alert(`Escalate grievance ${row.grievanceId} to State?`)}
        >
          Escalate to State
        </button>
      )
    }
  ];

  // Example data for grievances escalated to you by nodal officers
  const escalatedToYou = [
    { officer: 'Abishek Kumar', zone: 'Zone A', grievanceId: 'GRV-2024-011', dateRaised: '2024-01-10', pending: 5, status: 'Escalated' },
    { officer: 'Priya Sharma', zone: 'Zone B', grievanceId: 'GRV-2024-012', dateRaised: '2024-01-12', pending: 3, status: 'Escalated' },
    { officer: 'Amit Singh', zone: 'Zone C', grievanceId: 'GRV-2024-013', dateRaised: '2024-01-14', pending: 1, status: 'Escalated' }
  ];

  const escalatedColumns = [
    { key: 'grievanceId', header: 'Grievance ID' },
    { key: 'contractor', header: 'Contractor' },
    { key: 'officer', header: 'Nodal Officer' },
    { key: 'dateRaised', header: 'Date Raised' },
    { key: 'daysPending', header: 'Days Pending' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
          value === 'Awaiting Response' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Grievances Management</h1>
        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Export Report
        </button> */}
      </div>

      {/* KPI Cards */}
      <div className="w-full flex flex-col md:flex-row md:items-stretch gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
          <DashboardCard
            title="Total Grievances"
            value="135"
            icon={MessageSquareWarning}
            color="blue"
          />
          <DashboardCard
            title="Resolved"
            value="115"
            icon={CheckCircle}
            color="green"
          />
          <DashboardCard
            title="Pending"
            value="13"
            icon={Clock}
            color="orange"
          />
          <DashboardCard
            title="Escalated"
            value="7"
            icon={AlertTriangle}
            color="red"
          />
          {/* <DashboardCard
            title="Avg. Resolution Time"
            value="2.1 days"
            icon={Timer}
            color="purple"
          /> */}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'summary'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Grievances Escalated to Me
          </button>
          <button
            onClick={() => setActiveTab('escalated')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'escalated'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Escalated Grievances
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'summary' && (
        <div className="overflow-x-auto rounded-xl shadow-lg p-8 max-w-7xl mx-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-gray-900">
                {summaryColumns.map(col => (
                  <th key={col.key} className="border border-gray-400 px-4 py-2 text-center font-extrabold">{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {escalatedToYou.map((row, idx) => (
                <tr key={row.grievanceId} className={idx % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white hover:bg-gray-100'}>
                  <td className="border border-gray-300 px-4 py-2 text-center font-medium">{row.officer}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.zone}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.grievanceId}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.dateRaised}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.pending}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.status}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{summaryColumns.find(c => c.key === 'actions')!.render!(row)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'escalated' && (
        <div className="overflow-x-auto rounded-xl shadow-lg p-8 max-w-7xl mx-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-gray-900">
                {escalatedColumns.map(col => (
                  <th key={col.key} className="border border-gray-400 px-4 py-2 text-center font-extrabold">{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {escalatedGrievances.map((row, idx) => (
                <tr key={row.grievanceId} className={idx % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white hover:bg-gray-100'}>
                  <td className="border border-gray-300 px-4 py-2 text-center font-medium">{row.grievanceId}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.contractor}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.officer}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.dateRaised}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center font-bold">{row.daysPending}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                      row.status === 'Awaiting Response' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}    
    </div>
  );
};

export default Grievances;