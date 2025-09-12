"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Eye,
  Filter
} from 'lucide-react';

export default function Grievances() {
  const [activeTab, setActiveTab] = useState<'all' | 'escalated'>('all');

  const kpiData = [
    { title: 'Total Grievances', value: 2486, icon: MessageCircle, color: 'blue' as const },
    { title: 'Verified', value: 2362, icon: CheckCircle, color: 'green' as const },
    { title: 'Resolved', value: 2189, icon: CheckCircle, color: 'green' as const },
    { title: 'Pending', value: 173, icon: Clock, color: 'yellow' as const },
    { title: 'Escalated', value: 124, icon: AlertTriangle, color: 'red' as const },
  ];

  const grievanceData = [
    {
      id: 'GR-2024-001',
      date: '2024-01-15',
      state: 'Uttar Pradesh',
      district: 'Lucknow',
      category: 'PPE Distribution',
      status: 'Pending',
      priority: 'High',
      days_pending: 3,
    },
    {
      id: 'GR-2024-002',
      date: '2024-01-14',
      state: 'Maharashtra',
      district: 'Mumbai',
      category: 'Wage Payment',
      status: 'Resolved',
      priority: 'Medium',
      days_pending: 0,
    },
    {
      id: 'GR-2024-003',
      date: '2024-01-13',
      state: 'Bihar',
      district: 'Patna',
      category: 'Training',
      status: 'Escalated',
      priority: 'High',
      days_pending: 5,
    },
    {
      id: 'GR-2024-004',
      date: '2024-01-12',
      state: 'West Bengal',
      district: 'Kolkata',
      category: 'Health Insurance',
      status: 'Verified',
      priority: 'Low',
      days_pending: 2,
    },
  ];

  const escalatedData = grievanceData.filter(g => g.status === 'Escalated');

  const columns = [
    { key: 'id', label: 'Grievance ID', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'state', label: 'State', sortable: true },
    { key: 'district', label: 'District', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => {
        const statusColors = {
          'Pending': 'bg-yellow-100 text-yellow-800',
          'Resolved': 'bg-green-100 text-green-800',
          'Escalated': 'bg-red-100 text-red-800',
          'Verified': 'bg-blue-100 text-blue-800',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value as keyof typeof statusColors]}`}>
            {value}
          </span>
        );
      }
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (value: string) => {
        const priorityColors = {
          'High': 'text-red-600',
          'Medium': 'text-yellow-600',
          'Low': 'text-green-600',
        };
        return <span className={`font-medium ${priorityColors[value as keyof typeof priorityColors]}`}>{value}</span>;
      }
    },
    { 
      key: 'days_pending', 
      label: 'Days Pending', 
      sortable: true,
      render: (value: number) => value > 0 ? `${value} days` : '-'
    },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Grievances</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Advanced Filters</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="rounded-xl shadow-lg border-0 bg-white flex flex-col items-center justify-center p-4">
            <CardHeader className="flex flex-col items-center justify-center pb-2">
              <div className={`p-2 rounded-full mb-2 ${kpi.color === 'blue' ? 'bg-blue-100' : kpi.color === 'green' ? 'bg-green-100' : kpi.color === 'yellow' ? 'bg-yellow-100' : kpi.color === 'red' ? 'bg-red-100' : ''}`}>
                {React.createElement(kpi.icon, { className: `h-6 w-6 ${kpi.color === 'blue' ? 'text-blue-600' : kpi.color === 'green' ? 'text-green-600' : kpi.color === 'yellow' ? 'text-yellow-600' : kpi.color === 'red' ? 'text-red-600' : ''}` })}
              </div>
              <CardTitle className="text-sm font-medium text-gray-500">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-2xl font-extrabold text-gray-900">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All Grievances
          </button>
          <button
            onClick={() => setActiveTab('escalated')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'escalated'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Escalated ({escalatedData.length})
          </button>
        </nav>
      </div>

      {/* Data Table */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Grievance ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>State</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Days Pending</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(activeTab === 'all' ? grievanceData : escalatedData).map((row: any) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.district}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{(() => {
                  const statusColors = {
                    'Pending': 'bg-yellow-100 text-yellow-800',
                    'Resolved': 'bg-green-100 text-green-800',
                    'Escalated': 'bg-red-100 text-red-800',
                    'Verified': 'bg-blue-100 text-blue-800',
                  };
                  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status as keyof typeof statusColors]}`}>{row.status}</span>;
                })()}</TableCell>
                <TableCell>{(() => {
                  const priorityColors = {
                    'High': 'text-red-600',
                    'Medium': 'text-yellow-600',
                    'Low': 'text-green-600',
                  };
                  return <span className={`font-medium ${priorityColors[row.priority as keyof typeof priorityColors]}`}>{row.priority}</span>;
                })()}</TableCell>
                <TableCell>{row.days_pending > 0 ? `${row.days_pending} days` : '-'}</TableCell>
                <TableCell>
                  <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
