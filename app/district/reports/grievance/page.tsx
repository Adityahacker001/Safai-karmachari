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
      officer: 'Rajesh Kumar',
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
      officer: 'Rajesh Kumar',
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
    { key: 'total', header: 'Total' },
    { key: 'resolved', header: 'Resolved' },
    { key: 'pending', header: 'Pending' },
    { key: 'escalated', header: 'Escalated' },
    { key: 'avgTime', header: 'Avg Resolution Time' }
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
        <DashboardCard
          title="Avg. Resolution Time"
          value="2.1 days"
          icon={Timer}
          color="purple"
        />
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
            Nodal Officer Summary
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
        <DataTable
          title="Nodal Officer-wise Breakdown"
          columns={summaryColumns}
          data={nodalOfficerData}
        />
      )}

      {activeTab === 'escalated' && (
        <DataTable
          title="Escalated Grievances List"
          columns={escalatedColumns}
          data={escalatedGrievances}
        />
      )}
    </div>
  );
};

export default Grievances;