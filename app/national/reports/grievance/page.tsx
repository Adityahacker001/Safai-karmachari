"use client";
import React from 'react';
import { MessageCircle, CheckCircle, Clock, AlertTriangle, Eye, Filter } from 'lucide-react';

// --- Helper components defined within the file ---


import { ReactNode } from 'react';

interface TableProps {
  className?: string;
  children: ReactNode;
}
const Table = ({ className = '', children }: TableProps) => <table className={className}>{children}</table>;
const TableHeader = ({ children }: { children: ReactNode }) => <thead>{children}</thead>;
const TableBody = ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>;
interface TableRowProps {
  className?: string;
  children: ReactNode;
}
const TableRow = ({ className = '', children }: TableRowProps) => <tr className={className}>{children}</tr>;
const TableHead = ({ className = '', children }: TableRowProps) => <th className={className}>{children}</th>;
const TableCell = ({ className = '', children }: TableRowProps) => <td className={className}>{children}</td>;

// Updated KPI Card Component to match the new design

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: 'yellow' | 'blue' | 'purple' | 'green';
}
const KPICard = ({ title, value, icon: Icon, color }: KPICardProps) => {
  const colorSchemes: Record<KPICardProps['color'], string> = {
    yellow: 'bg-gradient-to-br from-amber-400 to-orange-500',
    blue: 'bg-gradient-to-br from-sky-400 to-blue-600',
    purple: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    green: 'bg-gradient-to-br from-emerald-400 to-green-500',
  };
  const scheme = colorSchemes[color] || colorSchemes.blue;
  return (
    <div className={`relative ${scheme} p-6 rounded-2xl shadow-lg text-white overflow-hidden transition-transform transform hover:-translate-y-1 duration-300`}>
      <Icon className="absolute -right-5 -bottom-5 h-28 w-28 text-white/20 transform" />
      <div className="relative">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-5xl font-bold mt-2">{value}</p>
      </div>
    </div>
  );
};


export default function Grievances() {
  // Only one tab now, so no need for activeTab state

  const kpiData = [
    { title: 'Total Grievances', value: 2486, icon: MessageCircle, color: 'blue' },
    { title: 'Verified', value: 2362, icon: CheckCircle, color: 'green' },
    { title: 'Pending', value: 173, icon: Clock, color: 'yellow' },
    { title: 'Escalated (this month)', value: 124, icon: AlertTriangle, color: 'purple' }, // Changed to purple for the new design
  ];

  const grievanceData = [
    { id: 'GR-2024-001', date: '2024-01-15', state: 'Uttar Pradesh', district: 'Lucknow', category: 'PPE Distribution', status: 'Pending', priority: 'High', days_pending: 3, },
    { id: 'GR-2024-002', date: '2024-01-14', state: 'Maharashtra', district: 'Mumbai', category: 'Wage Payment', status: 'Resolved', priority: 'Medium', days_pending: 0, },
    { id: 'GR-2024-003', date: '2024-01-13', state: 'Bihar', district: 'Patna', category: 'Training', status: 'Escalated', priority: 'High', days_pending: 5, },
    { id: 'GR-2024-004', date: '2024-01-12', state: 'West Bengal', district: 'Kolkata', category: 'Health Insurance', status: 'Verified', priority: 'Low', days_pending: 2, },
     { id: 'GR-2024-005', date: '2024-01-11', state: 'Tamil Nadu', district: 'Chennai', category: 'Safety Gear', status: 'Resolved', priority: 'Low', days_pending: 0, },
  ];

  // Removed escalatedData, not needed


  type StatusType = 'Pending' | 'Resolved' | 'Escalated' | 'Verified';
  const StatusPill = ({ value }: { value: StatusType }) => {
    const statusStyles: Record<StatusType, string> = {
      Pending: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white',
      Resolved: 'bg-gradient-to-r from-green-400 to-teal-500 text-white',
      Escalated: 'bg-gradient-to-r from-orange-500 to-pink-600 text-white',
      Verified: 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${statusStyles[value]}`}>
        {value}
      </span>
    );
  };


  type PriorityType = 'High' | 'Medium' | 'Low';
  const PriorityPill = ({ value }: { value: PriorityType }) => {
    const priorityStyles: Record<PriorityType, string> = {
      High: 'text-orange-600 font-bold',
      Medium: 'text-yellow-600 font-bold',
      Low: 'text-green-600 font-bold',
    };
    return <span className={`${priorityStyles[value]}`}>{value}</span>;
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8">
      {/* Professional Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-2xl" />
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white drop-shadow-2xl leading-tight">
                Grievance Management
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-bold drop-shadow-lg mt-2">
                Track, manage, and resolve all reported grievances efficiently
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="text-sm sm:text-base md:text-lg text-white/90 font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
              Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <button className="px-4 sm:px-5 py-2 sm:py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all font-bold rounded-xl flex items-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Advanced Filters</span>
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {kpiData.map((kpi) => (
          <KPICard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value.toLocaleString()}
            icon={kpi.icon}
            color={kpi.color as 'yellow' | 'blue' | 'purple' | 'green'}
          />
        ))}
      </div>

      {/* Professional Main Content Area with Table */}
      <div className="backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl overflow-hidden">
        {/* Only All Grievances tab remains, so remove tab UI */}

        {/* Data Table */}
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b-0">
                <TableHead className="text-sm font-semibold text-gray-600 p-6">Grievance ID</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">Date</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">State</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">District</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">Category</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600 text-center">Status</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">Priority</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">Days Pending</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grievanceData.map((row) => (
                <TableRow key={row.id} className="border-gray-200 hover:bg-gray-50/50 transition-colors">
                  <TableCell className="font-medium text-gray-800 p-6">{row.id}</TableCell>
                  <TableCell className="text-gray-600">{row.date}</TableCell>
                  <TableCell className="text-gray-600">{row.state}</TableCell>
                  <TableCell className="text-gray-600">{row.district}</TableCell>
                  <TableCell className="text-gray-600">{row.category}</TableCell>
                  <TableCell className="text-center"><StatusPill value={row.status as 'Pending' | 'Resolved' | 'Escalated' | 'Verified'} /></TableCell>
                  <TableCell className=""><PriorityPill value={row.priority as 'High' | 'Medium' | 'Low'} /></TableCell>
                  <TableCell className="text-gray-600">{row.days_pending > 0 ? `${row.days_pending} days` : '-'}</TableCell>
                  <TableCell className="text-right pr-6">
                    <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 rounded-full transition-all">
                      <Eye className="w-5 h-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

