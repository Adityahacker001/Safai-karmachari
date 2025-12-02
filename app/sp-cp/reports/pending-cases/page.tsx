'use client';

import React, { useState, useEffect } from 'react'; // Removed useEffect as it's not used
import { createPortal } from 'react-dom';
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
  Clock,
  XCircle, // For Reset Button
} from 'lucide-react';
import StatCard from '@/components/ui/stat-card';
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

  // Additional fields for the View Details modal (optional so table remains unchanged)
  incidentId?: string;
  incidentDateTime?: string; // Date & Time of Incident
  location?: string; // Location / geo-tag if available

  // FIR Details
  firNumber?: string; // duplicate of firNo but keeps naming explicit
  firStatus?: 'Lodged' | 'Under Investigation' | 'Charge Sheet Filed' | 'Closed' | string;

  // Investigation
  investigationStatus?: 'Pending' | 'Initiated' | 'Completed' | string;
  chargeSheetFiled?: 'Yes' | 'No';
  chargeSheetDate?: string;

  // Compensation
  compensationAmount?: string;
  compensationPaid?: 'Yes' | 'No';
  compensationDatePaid?: string;

  // Outcome
  numberOfDeaths?: number;
  numberOfInjuries?: number;

  // Description / narrative
  description?: string;
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
  { title: 'Total Pending Cases', metric: '52', icon: Clock, color: 'text-white', bgColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600' },
  { title: 'Awaiting Charge Sheet', metric: '18', icon: FileWarning, color: 'text-white', bgColor: 'bg-gradient-to-r from-orange-400 to-orange-600' },
  { title: 'Total Escalated', metric: '9', icon: AlertTriangle, color: 'text-white', bgColor: 'bg-gradient-to-r from-red-400 to-red-600' },
  
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
  {
    slNo: 1,
    caseId: 'CASE002',
    firNo: 'FIR-121/2025',
    firNumber: 'FIR-121/2025',
    policeStation: 'Mumbai Central',
    status: 'In Progress',
    daysPending: 82,
    escalationTriggered: 'Yes',
    incidentId: 'INC-021',
    incidentDateTime: '2025-09-10 14:30',
    location: 'Mumbai Central - Station Road (geo:19.0760,72.8777)',
    firStatus: 'Under Investigation',
    investigationStatus: 'Pending',
    chargeSheetFiled: 'No',
    chargeSheetDate: undefined,
    compensationAmount: '0',
    compensationPaid: 'No',
    compensationDatePaid: undefined,
    numberOfDeaths: 0,
    numberOfInjuries: 1,
    description: 'Allegation of assault during an altercation near the market area.'
  },
  {
    slNo: 2,
    caseId: 'CASE003',
    firNo: 'FIR-145/2025',
    firNumber: 'FIR-145/2025',
    policeStation: 'Lucknow Zone',
    status: 'Initiated',
    daysPending: 75,
    escalationTriggered: 'Yes',
    incidentId: 'INC-030',
    incidentDateTime: '2025-08-20 09:15',
    location: 'Lucknow Zone - Old Bus Stand',
    firStatus: 'Lodged',
    investigationStatus: 'Initiated',
    chargeSheetFiled: 'No',
    chargeSheetDate: undefined,
    compensationAmount: '0',
    compensationPaid: 'No',
    compensationDatePaid: undefined,
    numberOfDeaths: 0,
    numberOfInjuries: 2,
    description: 'Two individuals injured during roadside incident; investigation started.'
  },
  {
    slNo: 3,
    caseId: 'CASE004',
    firNo: 'FIR-235/2025',
    firNumber: 'FIR-235/2025',
    policeStation: 'Delhi North',
    status: 'In Progress',
    daysPending: 41,
    escalationTriggered: 'No',
    incidentId: 'INC-033',
    incidentDateTime: '2025-10-01 22:45',
    location: 'Delhi North - Sector 12',
    firStatus: 'Under Investigation',
    investigationStatus: 'Pending',
    chargeSheetFiled: 'No',
    chargeSheetDate: undefined,
    compensationAmount: '50000',
    compensationPaid: 'Yes',
    compensationDatePaid: '2025-11-05',
    numberOfDeaths: 0,
    numberOfInjuries: 1,
    description: 'Property damage during protest; single injured person treated.'
  },
  {
    slNo: 4,
    caseId: 'CASE007',
    firNo: 'FIR-119/2025',
    firNumber: 'FIR-119/2025',
    policeStation: 'Kolkata South',
    status: 'Awaiting Charge Sheet',
    daysPending: 32,
    escalationTriggered: 'No',
    incidentId: 'INC-040',
    incidentDateTime: '2025-07-02 18:00',
    location: 'Kolkata South - Riverside',
    firStatus: 'Lodged',
    investigationStatus: 'Initiated',
    chargeSheetFiled: 'No',
    chargeSheetDate: undefined,
    compensationAmount: '0',
    compensationPaid: 'No',
    compensationDatePaid: undefined,
    numberOfDeaths: 0,
    numberOfInjuries: 0,
    description: 'Complaint alleging theft from parked vehicle.'
  },
  {
    slNo: 5,
    caseId: 'CASE009',
    firNo: 'FIR-180/2025',
    firNumber: 'FIR-180/2025',
    policeStation: 'Mumbai Central',
    status: 'Awaiting Charge Sheet',
    daysPending: 61,
    escalationTriggered: 'Yes',
    incidentId: 'INC-055',
    incidentDateTime: '2025-06-14 03:20',
    location: 'Mumbai Central - Dockyards',
    firStatus: 'Charge Sheet Filed',
    investigationStatus: 'Completed',
    chargeSheetFiled: 'Yes',
    chargeSheetDate: '2025-08-01',
    compensationAmount: '150000',
    compensationPaid: 'Yes',
    compensationDatePaid: '2025-09-10',
    numberOfDeaths: 1,
    numberOfInjuries: 3,
    description: 'Serious industrial accident resulting in casualties; chargesheet filed.'
  },
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

// Inline IntegratedLoader (same JSX/CSS as components/IntegratedLoader.tsx)
const IntegratedLoader: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
    <style jsx>{`
      .loader {
        --c: no-repeat linear-gradient(#4f46e5 0 0);
        background: 
          var(--c),var(--c),var(--c),
          var(--c),var(--c),var(--c),
          var(--c),var(--c),var(--c);
        background-size: 16px 16px;
        animation: 
          l32-1 1s infinite,
          l32-2 1s infinite;
      }
      @keyframes l32-1 {
        0%,100% {width:45px;height: 45px}
        35%,65% {width:65px;height: 65px}
      }
      @keyframes l32-2 {
        0%,40%  {background-position: 0 0,0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,  50% 50% }
        60%,100%{background-position: 0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,0 0,  50% 50% }
      }
    `}</style>
    <div className="loader"></div>
  </div>
);

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

  const [loading, setLoading] = useState(true);

  // Modal state + portal root
  const [selectedCase, setSelectedCase] = useState<PendingCase | null>(null);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // Ensure modal root is set as a hook (must run before any conditional returns)
  useEffect(() => {
    const root = document.getElementById('modal-root') || document.body;
    setModalRoot(root as HTMLElement);
  }, []);

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
  const handleViewDetails = (caseId: string) => {
    const found = tableData.find(t => t.caseId === caseId) || initialTableData.find(t => t.caseId === caseId);
    if (found) setSelectedCase(found);
  };
  const handleUpdateProgress = (caseId: string) => alert(`Updating progress for ${caseId} (simulation)`);
  const handleEscalateCase = (caseId: string) => alert(`Escalating case ${caseId} (simulation)`);

  const handleGeneratePendingReport = () => alert("Generate Pending Report (simulation)");
  const handleEscalateSelected = () => alert("Escalate Selected Cases (simulation)");


  if (loading) return <IntegratedLoader />;

  // Build modal outside return
  let ViewDetailsModal: React.ReactNode = null;
  if (selectedCase) {
    const modalContent = (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300"
          onClick={() => setSelectedCase(null)}
        />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-lg shadow-2xl border border-slate-200 p-4 sm:p-6 max-w-3xl w-full max-h-[86vh] overflow-y-auto">
          <div className="flex justify-between items-center pb-3 mb-4">
            <h2 className="text-lg font-bold text-gray-900">Case Details</h2>
            <button onClick={() => setSelectedCase(null)} className="text-gray-600 hover:text-gray-900">&times;</button>
          </div>

          <div className="space-y-4">
            {/* Basic Case Information */}
            <section>
              <h3 className="text-md font-bold text-indigo-700 mb-2">Basic Case Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase">Case ID</span>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.caseId}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase">Incident ID</span>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.incidentId || 'N/A'}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase">Date & Time of Incident</span>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.incidentDateTime || 'N/A'}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase">Location</span>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.location || 'N/A'}</div>
                </div>
              </div>
            </section>

            {/* FIR Details */}
            <section>
              <h3 className="text-md font-bold text-indigo-700 mb-2">FIR Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase">FIR Number</span>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.firNumber || selectedCase.firNo || 'N/A'}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase">Police Station</span>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.policeStation}</div>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs font-bold text-slate-600 uppercase">FIR Status</span>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.firStatus || 'N/A'}</div>
                </div>
              </div>
            </section>

            {/* Investigation Information */}
            <section>
              <h3 className="text-md font-bold text-indigo-700 mb-2">Investigation Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase">Investigation Status</span>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.investigationStatus || 'N/A'}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase">Charge Sheet Filed</span>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.chargeSheetFiled || 'No' }{selectedCase.chargeSheetDate ? ` (Date: ${selectedCase.chargeSheetDate})` : ''}</div>
                </div>
              </div>
            </section>

            {/* Compensation Information */}
            <section>
              <h3 className="text-md font-bold text-indigo-700 mb-2">Compensation Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase">Compensation Amount</span>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.compensationAmount ? `₹${selectedCase.compensationAmount}` : 'N/A'}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase">Compensation Paid</span>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.compensationPaid || 'No'}{selectedCase.compensationDatePaid ? ` (Date: ${selectedCase.compensationDatePaid})` : ''}</div>
                </div>
              </div>
            </section>

            {/* Incident Outcome */}
            <section>
              <h3 className="text-md font-bold text-indigo-700 mb-2">Incident Outcome</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase">Number of Deaths</span>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.numberOfDeaths ?? 0}</div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase">Number of Injuries</span>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.numberOfInjuries ?? 0}</div>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs font-bold text-slate-600 uppercase">Description</span>
                  <div className="text-sm text-slate-900 mt-1">{selectedCase.description || 'N/A'}</div>
                </div>
              </div>
            </section>
          </div>

          <div className="flex justify-end pt-4 mt-3">
            <button
              onClick={() => setSelectedCase(null)}
              className="px-5 py-2 bg-indigo-600 text-white font-bold hover:bg-indigo-700 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      );

      ViewDetailsModal = modalRoot ? createPortal(modalContent, modalRoot) : modalContent;
    }

  return (
    <div className="flex-1 space-y-8 p-6 md:p-10 text-slate-900 dark:text-slate-50">

      {/* District-style banner */}
      <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md opacity-0" aria-hidden />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pending Cases Report</h1>
            <p className="text-sm opacity-90 mt-1">Cases awaiting action and their escalation status</p>
          </div>
        </div>
        <div className="hidden md:block text-sm opacity-90">&nbsp;</div>
      </div>

      {/* 1️⃣ Header & Summary */}
      <div className="space-y-6">
        {/* Top Bar: Buttons only (title is in the banner above) */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-2">
          <div />
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleExport}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors text-sm font-medium">
              <Download size={16} />
              Export (CSV/PDF)
            </button>
            <button
              onClick={handleRefresh}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-sm font-medium">
              <RefreshCw size={16} />
              Refresh Data
            </button>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Pending Cases"
            value="52"
            icon={Clock}
            color="amber"
          />
          <StatCard
            title="Awaiting Charge Sheet"
            value="18"
            icon={FileWarning}
            color="orange"
          />
          <StatCard
            title="Total Escalated"
            value="9"
            icon={AlertTriangle}
            color="red"
          />
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
      <div className="grid grid-cols-1 gap-6">
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
        {ViewDetailsModal}
      </div>
    </div>
  );
}

