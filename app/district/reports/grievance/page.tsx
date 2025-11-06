"use client";
import React, { useState } from 'react';
import DashboardCard from '@/components/dashboard/dashboard-card';
import DataTable from '@/components/ui/data-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  MessageSquareWarning,
  CheckCircle,
  Clock,
  AlertTriangle,
  Timer,
  Search,
  X
} from 'lucide-react';

const Grievances: React.FC = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter functions for both tables
  const filteredEscalatedToYou = escalatedToYou.filter(item =>
    item.officer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.grievanceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEscalatedGrievances = escalatedGrievances.filter(item =>
    item.grievanceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.contractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.officer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="min-h-screen p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-4 sm:space-y-6">
      {/* Professional Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-red-600/95 via-pink-600/95 to-purple-600/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <MessageSquareWarning className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-2xl" />
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white drop-shadow-2xl leading-tight">
                Grievance Monitoring Dashboard
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-bold drop-shadow-lg mt-2">
                Track and monitor contractor and worker grievances across zones
              </p>
            </div>
          </div>
          <div className="text-sm sm:text-base md:text-lg text-white/90 font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </header>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
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
      </div>

      {/* Professional Tab Navigation */}
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-4 sm:p-6">
        <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 border-2 flex-1 ${
              activeTab === 'summary'
                ? 'bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white border-white/30 shadow-xl transform scale-105'
                : 'text-gray-700 bg-white/50 hover:bg-white/70 border-white/20 hover:border-white/40 hover:shadow-lg'
            }`}
          >
            Grievances Escalated to Me
          </button>
          <button
            onClick={() => setActiveTab('escalated')}
            className={`py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 border-2 flex-1 ${
              activeTab === 'escalated'
                ? 'bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white border-white/30 shadow-xl transform scale-105'
                : 'text-gray-700 bg-white/50 hover:bg-white/70 border-white/20 hover:border-white/40 hover:shadow-lg'
            }`}
          >
            Escalated Grievances
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'summary' && (
        <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl p-3 sm:p-4 md:p-6">
          {/* Search Box */}
          <div className="mb-4 sm:mb-6">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search grievances, officers, zones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-9 sm:pl-10 pr-10 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm placeholder-gray-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                </button>
              )}
            </div>
            <div className="mt-2 text-xs sm:text-sm text-gray-600">
              Showing {filteredEscalatedToYou.length} of {escalatedToYou.length} grievances
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b-2 border-blue-200">
                  {summaryColumns.map(col => (
                    <TableHead key={col.key} className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">{col.header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white/50 backdrop-blur-sm">
                {filteredEscalatedToYou.length > 0 ? (
                  filteredEscalatedToYou.map((row, idx) => (
                    <TableRow key={row.grievanceId} className="hover:bg-blue-50/70 transition-colors border-b border-gray-100">
                      <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-gray-800">{row.officer}</TableCell>
                      <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-gray-800">{row.zone}</TableCell>
                      <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-gray-800">{row.grievanceId}</TableCell>
                      <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-gray-800">{row.dateRaised}</TableCell>
                      <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-gray-800">{row.pending}</TableCell>
                      <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-gray-800">{row.status}</TableCell>
                      <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center">{summaryColumns.find(c => c.key === 'actions')!.render!(row)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-24 text-gray-500 text-sm">
                      {searchTerm ? `No grievances found matching "${searchTerm}"` : 'No grievances available'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {activeTab === 'escalated' && (
        <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl p-3 sm:p-4 md:p-6">
          {/* Search Box */}
          <div className="mb-4 sm:mb-6">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search grievances, contractors, officers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-9 sm:pl-10 pr-10 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm placeholder-gray-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                </button>
              )}
            </div>
            <div className="mt-2 text-xs sm:text-sm text-gray-600">
              Showing {filteredEscalatedGrievances.length} of {escalatedGrievances.length} escalated grievances
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b-2 border-blue-200">
                  {escalatedColumns.map(col => (
                    <TableHead key={col.key} className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">{col.header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white/50 backdrop-blur-sm">
                {filteredEscalatedGrievances.length > 0 ? (
                  filteredEscalatedGrievances.map((row, idx) => (
                    <TableRow key={row.grievanceId} className="hover:bg-blue-50/70 transition-colors border-b border-gray-100">
                      <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-gray-800">{row.grievanceId}</TableCell>
                      <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-gray-800">{row.contractor}</TableCell>
                      <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-gray-800">{row.officer}</TableCell>
                      <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-gray-800">{row.dateRaised}</TableCell>
                      <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-bold text-gray-800">{row.daysPending}</TableCell>
                      <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                          row.status === 'Awaiting Response' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {row.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-gray-500 text-sm">
                      {searchTerm ? `No escalated grievances found matching "${searchTerm}"` : 'No escalated grievances available'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}    
    </div>
  );
};

export default Grievances;