// app/dashboard/sp-cp/pending-cases/page.tsx

"use client";

import React, { useState } from 'react'; // Removed useEffect as it's not used
import {
  BarChart as BarChartIcon,
  AlertTriangle,
  Download,
  Edit,
  Eye,
  FileWarning,
  Filter,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  Clock,
  XCircle, // For Reset Button
} from 'lucide-react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// --- MOCK DATA & TYPES ---

interface SummaryMetric {
  title: string;
  metric: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

interface PendingCase {
  slNo: number;
  caseId: string;
  firNo: string;
  policeStation: string;
  status: 'In Progress' | 'Initiated' | 'Awaiting Charge Sheet';
  daysPending: number;
  escalationTriggered: 'Yes' | 'No';
}

interface BarChartEntry {
  name: string;
  'In Progress': number;
  'Awaiting Charge Sheet': number;
}

interface PieChartEntry {
  name: string;
  value: number;
}

const initialSummaryMetrics: SummaryMetric[] = [
  { title: 'Total Pending Cases', metric: '52', icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { title: 'Awaiting Charge Sheet', metric: '18', icon: FileWarning, color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
  { title: 'Total Escalated', metric: '9', icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900/30' },
  { title: 'Avg. Pending Days', metric: '46', icon: Clock, color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
];

const allPoliceStations = [
    'Mumbai Central',
    'Lucknow Zone',
    'Delhi North',
    'Kolkata South',
];

const allStatuses: PendingCase['status'][] = [
    'In Progress',
    'Initiated',
    'Awaiting Charge Sheet',
];

const initialTableData: PendingCase[] = [
  { slNo: 1, caseId: 'CASE002', firNo: 'FIR-121/2025', policeStation: 'Mumbai Central', status: 'In Progress', daysPending: 82, escalationTriggered: 'Yes' },
  { slNo: 2, caseId: 'CASE003', firNo: 'FIR-145/2025', policeStation: 'Lucknow Zone', status: 'Initiated', daysPending: 75, escalationTriggered: 'Yes' },
  { slNo: 3, caseId: 'CASE004', firNo: 'FIR-235/2025', policeStation: 'Delhi North', status: 'In Progress', daysPending: 41, escalationTriggered: 'No' },
  { slNo: 4, caseId: 'CASE007', firNo: 'FIR-119/2025', policeStation: 'Kolkata South', status: 'Awaiting Charge Sheet', daysPending: 32, escalationTriggered: 'No' },
  { slNo: 5, caseId: 'CASE009', firNo: 'FIR-180/2025', policeStation: 'Mumbai Central', status: 'Awaiting Charge Sheet', daysPending: 61, escalationTriggered: 'Yes' },
];

const initialChartBarData: BarChartEntry[] = [
  { name: 'Delhi North', 'In Progress': 12, 'Awaiting Charge Sheet': 5 },
  { name: 'Mumbai Central', 'In Progress': 8, 'Awaiting Charge Sheet': 7 },
  { name: 'Lucknow Zone', 'In Progress': 15, 'Awaiting Charge Sheet': 2 },
  { name: 'Kolkata South', 'In Progress': 5, 'Awaiting Charge Sheet': 4 },
];

const initialChartPieData: PieChartEntry[] = [
  { name: '0-30 Days', value: 11 },
  { name: '31-60 Days', value: 22 },
  { name: '61-90 Days', value: 14 },
  { name: '> 90 Days', value: 5 },
];

const PIE_COLORS: { [key: string]: string } = {
  '0-30 Days': '#34D399', // emerald-400
  '31-60 Days': '#F59E0B', // amber-500
  '61-90 Days': '#F97316', // orange-500
  '> 90 Days': '#EF4444', // red-500
};

// --- HELPER COMPONENTS ---

const StatusTag = ({ status }: { status: PendingCase['status'] }) => {
  let className = '';
  switch (status) {
    case 'In Progress': className = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-700'; break;
    case 'Initiated': className = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700'; break;
    case 'Awaiting Charge Sheet': className = 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 border border-orange-200 dark:border-orange-700'; break;
    default: className = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600';
  }
  return (<span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}> {status} </span>);
};

const EscalationTag = ({ value }: { value: 'Yes' | 'No' }) => {
  const className =
    value === 'Yes'
      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border border-red-200 dark:border-red-700'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600';
  return (<span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}> {value} </span>);
};

// --- MAIN PAGE COMPONENT ---

export default function PendingCasesReportPage() {
  // --- State ---
  const [summaryMetrics, setSummaryMetrics] = useState(initialSummaryMetrics);
  const [tableData, setTableData] = useState(initialTableData);
  const [chartBarData, setChartBarData] = useState(initialChartBarData);
  const [chartPieData, setChartPieData] = useState(initialChartPieData);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [stationFilter, setStationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [pendingDaysFilter, setPendingDaysFilter] = useState("");
  const [escalatedFilter, setEscalatedFilter] = useState("");

  // --- Handlers ---
  
  const resetFilters = () => {
    setSearchQuery("");
    setStationFilter("");
    setStatusFilter("");
    setPendingDaysFilter("");
    setEscalatedFilter("");
    setTableData(initialTableData); // Reset table to initial data
  };

  const handleRefresh = () => {
    alert("Refreshing data (simulation)...");
    // Reset to initial mock data
    setSummaryMetrics(initialSummaryMetrics);
    setChartBarData(initialChartBarData);
    setChartPieData(initialChartPieData);
    // Reset filters and table
    resetFilters();
  };

  const handleApplyFilters = () => {
    // Client-side filtering (example):
    const filtered = initialTableData.filter(row =>
      (searchQuery ? (row.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.firNo.toLowerCase().includes(searchQuery.toLowerCase())) : true) &&
      (stationFilter ? row.policeStation === stationFilter : true) &&
      (statusFilter ? row.status === statusFilter : true) &&
      (escalatedFilter ? row.escalationTriggered === escalatedFilter : true) &&
      (pendingDaysFilter ? (
        pendingDaysFilter === '0-30' ? row.daysPending <= 30 :
        pendingDaysFilter === '31-60' ? (row.daysPending > 30 && row.daysPending <= 60) :
        pendingDaysFilter === '61-90' ? (row.daysPending > 60 && row.daysPending <= 90) :
        row.daysPending > 90
      ) : true)
    );
    setTableData(filtered); // Update table data state
  };

  const handleExport = () => alert("Export functionality to be implemented.");
  const handleViewDetails = (caseId: string) => alert(`Viewing details for ${caseId} (simulation)`);
  const handleUpdateProgress = (caseId: string) => alert(`Updating progress for ${caseId} (simulation)`);
  const handleEscalateCase = (caseId: string) => alert(`Escalating case ${caseId} (simulation)`);

  const handleGeneratePendingReport = () => alert("Generate Pending Report (simulation)");
  const handleEscalateSelected = () => alert("Escalate Selected Cases (simulation)");
  const handleAISummarize = () => alert("AI: Summarize Delays (simulation)");
  const handleAIDraftMemo = () => alert("AI: Draft Escalation Memo (simulation)");
  const handleAIBottlenecks = () => alert("AI: Identify Bottlenecks (simulation)");


  return (
    <div className="flex-1 space-y-8 p-6 md:p-10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">

      {/* 1️⃣ Header & Summary */}
      <div className="space-y-6">
        {/* Top Bar: Title & Buttons */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            ⏳ Pending Cases Report
          </h1>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors text-sm font-medium">
              <Download size={16} />
              Export (CSV/PDF)
            </button>
            <button 
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-sm font-medium">
              <RefreshCw size={16} />
              Refresh Data
            </button>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {summaryMetrics.map((item) => (
            <div
              key={item.title}
              className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg p-5 border border-slate-200 dark:border-slate-700 transition-transform duration-200 hover:scale-[1.03] hover:shadow-xl`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${item.bgColor} border border-slate-200 dark:border-slate-700`}
                >
                  <item.icon size={24} className={item.color} />
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                    {item.title}
                  </div>
                  <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{item.metric}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2️⃣ Filter Panel */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Filter size={18} /> Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Box */}
          <div className="relative lg:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-slate-400 dark:text-slate-500" size={18} />
            </div>
            <input
              type="text"
              placeholder="Search Case ID, FIR No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select 
            value={stationFilter}
            onChange={(e) => setStationFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <option value="">All Police Stations</option>
            {allPoliceStations.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <option value="">All Statuses</option>
            {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select 
            value={pendingDaysFilter}
            onChange={(e) => setPendingDaysFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <option value="">All Pending Days</option>
            <option value="0-30">0-30 Days</option>
            <option value="31-60">31-60 Days</option>
            <option value="61-90">61-90 Days</option>
            <option value=">90">Over 90 Days</option>
          </select>
          <select 
            value={escalatedFilter}
            onChange={(e) => setEscalatedFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <option value="">All Escalation</option>
            <option value="Yes">Escalated: Yes</option>
            <option value="No">Escalated: No</option>
          </select>
          <button 
            onClick={handleApplyFilters}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors text-sm font-medium">
            <Filter size={16} />
            Apply Filters
          </button>
          <button 
            onClick={resetFilters}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-sm font-medium">
            <XCircle size={16} />
            Reset
          </button>
        </div>
      </div>


      {/* 3️⃣ Main Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                {[
                  'Sl. No.',
                  'Case ID',
                  'FIR No',
                  'Police Station',
                  'Status',
                  'Days Pending',
                  'Escalation Triggered',
                  'Actions',
                ].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {tableData.map((row) => (
                <tr
                  key={row.caseId}
                  className="hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors duration-150 even:bg-slate-50/70 dark:even:bg-slate-900/20"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {row.slNo}
                  </td>
                  <td 
                    onClick={() => handleViewDetails(row.caseId)}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-700 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    {row.caseId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {row.firNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {row.policeStation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <StatusTag status={row.status} />
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      row.daysPending > 60
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-yellow-600 dark:text-yellow-400'
                    }`}
                  >
                    {row.daysPending} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <EscalationTag value={row.escalationTriggered} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1">
                    <button
                      onClick={() => handleViewDetails(row.caseId)}
                      title="View Case Details"
                      className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-slate-700 rounded-md transition-colors duration-150"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleUpdateProgress(row.caseId)}
                      title="Update Progress"
                      className="p-1.5 text-green-600 hover:bg-green-100 dark:hover:bg-slate-700 rounded-md transition-colors duration-150"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleEscalateCase(row.caseId)}
                      title="Escalate Case"
                      className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-slate-700 rounded-md transition-colors duration-150"
                    >
                      <AlertTriangle size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {tableData.length === 0 && (
                <tr className="bg-white dark:bg-slate-800">
                  <td
                    colSpan={8}
                    className="text-center py-10 text-slate-500 dark:text-slate-400"
                  >
                    No pending cases found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Showing <strong>{tableData.length > 0 ? 1 : 0}</strong> to <strong>{tableData.length}</strong> of{' '}
            <strong>{initialTableData.length}</strong> results
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 rounded-md text-sm border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150">
              Previous
            </button>
            <button className="px-3 py-1 rounded-md text-sm border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* 4️⃣ Dashboard Visualization & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <BarChartIcon className="text-blue-600" size={22} />
            Pending Cases by Police Station
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartBarData}
                margin={{ top: 20, right: 30, left: -10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  strokeOpacity={0.2}
                  className="stroke-slate-300 dark:stroke-slate-700"
                />
                <XAxis
                  dataKey="name"
                  className="text-xs"
                  stroke="currentColor"
                />
                <YAxis className="text-xs" stroke="currentColor" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }}
                  cursor={{ fill: 'rgba(220, 230, 255, 0.4)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Bar
                  dataKey="In Progress"
                  stackId="a"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar
                  dataKey="Awaiting Charge Sheet"
                  stackId="a"
                  fill="#F97316"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Clock size={20} className="text-red-600" />
            Pending Case Aging
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  fill="#8884d8"
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent, value }) =>
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                  labelLine={false}
                  className="text-xs"
                >
                  {chartPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[entry.name as keyof typeof PIE_COLORS]}
                      stroke={PIE_COLORS[entry.name as keyof typeof PIE_COLORS]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 5️⃣ Quick Actions Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleGeneratePendingReport}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
            >
              <FileWarning size={16} />
              Generate Pending Report
            </button>
            <button
              onClick={handleEscalateSelected}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border border-red-300 dark:border-red-700 rounded-lg shadow-sm hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm font-medium"
            >
              <Send size={16} />
              Escalate Selected Cases
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-900/30 dark:via-indigo-900/30 dark:to-blue-900/30 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-800 dark:text-purple-300">
            <Sparkles className="text-purple-500" size={20} />
            AI Assistance Tools
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAISummarize}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 border border-purple-300 dark:border-purple-700 rounded-lg shadow-sm hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium"
            >
              Summarize Delays
            </button>
            <button
              onClick={handleAIDraftMemo}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 border border-purple-300 dark:border-purple-700 rounded-lg shadow-sm hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium"
            >
              Draft Escalation Memo
            </button>
            <button
              onClick={handleAIBottlenecks}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 border border-purple-300 dark:border-purple-700 rounded-lg shadow-sm hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium"
            >
              Identify Bottlenecks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}