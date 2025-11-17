// app/(your-route)/page.tsx
'use client';

import React, { useMemo, useState } from 'react';
import StatCard from '@/components/ui/stat-card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  RefreshCw,
  Filter as FilterIcon,
  ChevronRight,
  ChevronDown,
  Calendar,
  AlertCircle,
  FileCheck,
  FileX,
  DollarSign,
  CheckCircle,
  Clock,
  Briefcase,
  Loader,
  Target,
  FileText,
  Activity,
  Shield,
  Award,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* NOTE: YOUR EXISTING STAT CARD                       */
/* (Modified to use the dashboard's 'gradient' prop instead of 'color')   */
/* -------------------------------------------------------------------------- */

// StatCard is now imported from components/ui/stat-card

/* -------------------------------------------------------------------------- */
/* ALL YOUR EXISTING DATA AND LOGIC (UNCHANGED)             */
/* -------------------------------------------------------------------------- */

type CaseItem = {
  id: string;
  date: string;
  time: string;
  location: string;
  policeStation: string;
  category: string;
  status: 'Pending' | 'Initiated' | 'In Progress' | 'Completed';
  firFiled: boolean;
  firNumber?: string;
  firStatus?: string;
  sections?: string;
  compensationSanctioned?: number;
  compensationPaid?: number;
  investigationSummary?: string;
  narrative?: string;
  attachments?: string[];
  pendingDays?: number;
  inquiryStatus?: string;
  miscNotes?: string;
  workersInvolved?: number;
};

const SAMPLE_CASES: CaseItem[] = [
  {
    id: 'CASE-2025-001',
    date: '2025-08-05',
    time: '08:15 AM',
    location: 'Ward 12 — Near Sewage Pump 4',
    policeStation: 'Central PS',
    category: 'Sewer Death',
    status: 'In Progress',
    firFiled: true,
    firNumber: '123/2025',
    firStatus: 'Under Investigation',
    sections: '304A IPC, Sec 9 MS Act',
    compensationSanctioned: 500000,
    compensationPaid: 0,
    pendingDays: 12,
    investigationSummary: 'Entry without PPE; gas detector not present.',
    narrative:
      'Worker entered septic chamber without PPE. Rescue attempted by colleagues; no immediate PPE or ventilator present.',
    attachments: ['photo1.jpg', 'report.pdf'],
    inquiryStatus: 'Ongoing',
    miscNotes: 'Safety failures noted: No gas detector.',
    workersInvolved: 2,
  },
  {
    id: 'CASE-2025-002',
    date: '2025-09-12',
    time: '02:40 PM',
    location: 'Sector 7 — Underground Drain',
    policeStation: 'North PS',
    category: 'Manual Scavenging Death',
    status: 'Completed',
    firFiled: true,
    firNumber: '124/2025',
    firStatus: 'Charge Sheet Filed',
    sections: '304 IPC',
    compensationSanctioned: 250000,
    compensationPaid: 250000,
    pendingDays: 0,
    investigationSummary: 'Charge sheet filed. Compensation disbursed.',
    narrative: 'Worker died due to toxic fumes; FIR and charge sheet completed.',
    attachments: [],
    inquiryStatus: 'Completed',
    miscNotes: 'N/A',
    workersInvolved: 1,
  },
  {
    id: 'CASE-2025-003',
    date: '2025-10-03',
    time: '10:20 AM',
    location: 'Block D — Stormwater chamber',
    policeStation: 'East PS',
    category: 'Sewer Injury',
    status: 'Initiated',
    firFiled: false,
    compensationSanctioned: 0,
    compensationPaid: 0,
    pendingDays: 25,
    investigationSummary: 'Injury being investigated; no FIR yet.',
    narrative: 'Worker slipped, sustained injuries. Further inquiry pending.',
    attachments: [],
    inquiryStatus: 'Initiated',
    miscNotes: 'N/A',
    workersInvolved: 1,
  },
];

const INCIDENT_PIE_DATA = [
  { name: 'Manual Scavenging Deaths', value: 12 },
  { name: 'Sewer Death', value: 8 },
  { name: 'Sewer Injuries', value: 15 },
  { name: 'Hazardous Exposure', value: 5 },
];

const PIE_COLORS = ['#b91c1c', '#dc2626', '#f87171', '#fca5a5'];

const INVESTIGATION_BAR = [
  { station: 'Central PS', Initiated: 4, 'In Progress': 3, Completed: 6 },
  { station: 'North PS', Initiated: 2, 'In Progress': 1, Completed: 5 },
  { station: 'East PS', Initiated: 3, 'In Progress': 2, Completed: 4 },
  { station: 'South PS', Initiated: 1, 'In Progress': 0, Completed: 2 },
];

const COMPENSATION_DATA = [
  { month: 'Jan', Sanctioned: 120000, Paid: 90000, Pending: 30000 },
  { month: 'Feb', Sanctioned: 90000, Paid: 90000, Pending: 0 },
  { month: 'Mar', Sanctioned: 150000, Paid: 120000, Pending: 30000 },
  { month: 'Apr', Sanctioned: 130000, Paid: 130000, Pending: 0 },
  { month: 'May', Sanctioned: 170000, Paid: 100000, Pending: 70000 },
];

/* -------------------------------------------------------------------------- */
/* START OF NEW UI                             */
/* -------------------------------------------------------------------------- */

export default function Page() {
  const [cases] = useState<CaseItem[]>(SAMPLE_CASES);
  const [query, setQuery] = useState('');
  const [selectedPoliceStation, setSelectedPoliceStation] =
    useState<string>('All');
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({});
  const [onlyFIRFiled, setOnlyFIRFiled] = useState<'all' | 'yes' | 'no'>('all');
  const [compensationStatus, setCompensationStatus] = useState<string>('All');
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  // YOUR EXISTING FILTER LOGIC (UNCHANGED)
  const filtered = useMemo(() => {
    return cases.filter((c) => {
      if (
        selectedPoliceStation !== 'All' &&
        c.policeStation !== selectedPoliceStation
      )
        return false;
      if (onlyFIRFiled === 'yes' && !c.firFiled) return false;
      if (onlyFIRFiled === 'no' && c.firFiled) return false;
      if (
        compensationStatus === 'Paid' &&
        (c.compensationPaid || 0) <= 0
      )
        return false;
      if (
        compensationStatus === 'Pending' &&
        (c.compensationPaid || 0) > 0
      )
        return false;
      if (
        query &&
        !`${c.id} ${c.location} ${c.policeStation}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
        return false;
      if (dateRange.from && c.date < dateRange.from) return false;
      if (dateRange.to && c.date > dateRange.to) return false;
      return true;
    });
  }, [
    cases,
    selectedPoliceStation,
    onlyFIRFiled,
    query,
    dateRange,
    compensationStatus,
  ]);

  // YOUR EXISTING SUMMARY LOGIC (UNCHANGED)
  const totals = useMemo(() => {
    const totalCases = cases.length;
    const firFiled = cases.filter((c) => c.firFiled).length;
    const firPending = totalCases - firFiled;
    const compSanctioned = cases.reduce(
      (s, c) => s + (c.compensationSanctioned || 0),
      0,
    );
    const compPaid = cases.reduce(
      (s, c) => s + (c.compensationPaid || 0),
      0,
    );
    const compPending = compSanctioned - compPaid;
    const investigationsCompleted = cases.filter(
      (c) => c.status === 'Completed',
    ).length;
    const investigationsOngoing = cases.filter(
      (c) => c.status === 'In Progress' || c.status === 'Initiated',
    ).length;
    return {
      totalCases,
      firFiled,
      firPending,
      compSanctioned,
      compPaid,
      compPending,
      investigationsCompleted,
      investigationsOngoing,
    };
  }, [cases]);

  // YOUR EXISTING HELPER FUNCTIONS (UNCHANGED)
  function onExport() {
    alert('Exporting current filtered results (placeholder).');
  }
  function onReload() {
    alert('Reload triggered (placeholder).');
  }

  // Table header style
  const tableHeaderStyle =
    'px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider';
  const tableCellStyle = 'px-5 py-4 border-b border-gray-200 bg-white text-sm';
  const tableRowStriped = 'even:bg-gray-50';

  return (
    <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* 1. Header Section (NEW) */}
      <div className="rounded-2xl mb-4 p-8 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
          Sewer Death Report
        </h1>
        <p className="text-lg text-white/80 mb-2">Comprehensive sewer death monitoring and management</p>
        <nav className="text-sm text-white/80" aria-label="Breadcrumb">
          <ol className="inline-flex list-none p-0">
            <li className="flex items-center">
              <a href="#" className="hover:text-white underline">
                SP/CP
              </a>
              <ChevronRight className="h-4 w-4 mx-1 text-white/70" />
            </li>
            <li className="flex items-center">
              <a href="#" className="hover:text-white underline">
                Reports
              </a>
              <ChevronRight className="h-4 w-4 mx-1 text-white/70" />
            </li>
            <li className="flex items-center">
              <span className="text-white/60">Sewer Death Report</span>
            </li>
          </ol>
        </nav>
      </div>



      {/* 4. Summary Cards Section (RE-STYLED with GRADIENTS) */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Sewer Death Cases"
          value={String(totals.totalCases)}
          icon={AlertCircle}
          color="sky"
        />
        <StatCard
          title="FIR Filed"
          value={String(totals.firFiled)}
          icon={FileCheck}
          color="green"
        />
        <StatCard
          title="FIR Pending"
          value={String(totals.firPending)}
          icon={FileX}
          color="orange"
        />
        <StatCard
          title="Compensation Sanctioned"
          value={`₹${formatCurrency(totals.compSanctioned)}`}
          icon={DollarSign}
          color="pink"
        />
        <StatCard
          title="Compensation Paid"
          value={`₹${formatCurrency(totals.compPaid)}`}
          icon={CheckCircle}
          color="emerald"
        />
        <StatCard
          title="Compensation Pending"
          value={`₹${formatCurrency(totals.compPending)}`}
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Investigations Completed"
          value={String(totals.investigationsCompleted)}
          icon={Briefcase}
          color="indigo"
        />
        <StatCard
          title="Investigations Ongoing"
          value={String(totals.investigationsOngoing)}
          icon={Loader}
          color="purple"
        />
      </section>

      {/* 5. Analytics Charts Section (RE-STYLED CONTAINERS) */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* (A) Incident Category Pie Chart */}
        <div className="lg:col-span-1 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Incident Category
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={INCIDENT_PIE_DATA}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => `${entry.name} (${entry.value})`}
                >
                  {INCIDENT_PIE_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* (B) Investigation Status Bar Chart */}
        <div className="lg:col-span-1 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Investigation Status
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={INVESTIGATION_BAR}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="station" fontSize={12} />
                <YAxis fontSize={12} />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="Initiated" stackId="a" fill="#60A5FA" />
                <Bar dataKey="In Progress" stackId="a" fill="#FBBF24" />
                <Bar dataKey="Completed" stackId="a" fill="#34D399" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* (C) Compensation Tracker Line Chart */}
        <div className="lg:col-span-1 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Compensation Tracker
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={COMPENSATION_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <RechartsTooltip
                  formatter={(value: number) => `₹${formatCurrency(value)}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Sanctioned"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Paid"
                  stroke="#10b981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Pending"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* 2. Filters Section (RE-STYLED) - MOVED BELOW CHARTS */}
      <section className="w-full p-4 bg-white/60 backdrop-blur-md shadow-md rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Date Range (From) */}
          <div className="relative">
            <label
              htmlFor="date-from"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              From
            </label>
            <input
              id="date-from"
              type="date"
              aria-label="From date"
              onChange={(e) =>
                setDateRange((d) => ({ ...d, from: e.target.value }))
              }
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700"
            />
          </div>
          {/* Date Range (To) */}
          <div className="relative">
            <label
              htmlFor="date-to"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              To
            </label>
            <input
              id="date-to"
              type="date"
              aria-label="To date"
              onChange={(e) =>
                setDateRange((d) => ({ ...d, to: e.target.value }))
              }
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700"
            />
          </div>
          {/* Police Station Dropdown */}
          <div className="relative">
            <label
              htmlFor="police-station"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Police Station
            </label>
            <select
              id="police-station"
              aria-label="Police station"
              value={selectedPoliceStation}
              onChange={(e) => setSelectedPoliceStation(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700"
            >
              <option>All</option>
              <option>Central PS</option>
              <option>North PS</option>
              <option>East PS</option>
              <option>South PS</option>
            </select>
          </div>
          {/* Incident Category Dropdown */}
          <div className="relative">
            <label
              htmlFor="incident-category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Incident Category
            </label>
            <select
              id="incident-category"
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700"
            >
              <option>All Categories</option>
              <option>Sewer Death</option>
              <option>Manual Scavenging Death</option>
              <option>Sewer Injury</option>
              <option>Hazard Exposure</option>
            </select>
          </div>
          {/* FIR Filed (Yes/No) */}
          <div className="relative">
            <label
              htmlFor="fir-filed"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              FIR Filed
            </label>
            <select
              id="fir-filed"
              aria-label="FIR filed"
              value={onlyFIRFiled}
              onChange={(e) =>
                setOnlyFIRFiled(e.target.value as 'all' | 'yes' | 'no')
              }
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700"
            >
              <option value="all">All</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          {/* Compensation Status */}
          <div className="relative">
            <label
              htmlFor="compensation-status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Compensation Status
            </label>
            <select
              id="compensation-status"
              value={compensationStatus}
              onChange={(e) => setCompensationStatus(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700"
            >
              <option>All</option>
              <option>Paid</option>
              <option>Pending</option>
            </select>
          </div>
        </div>
        {/* Export + Reload Section (img section detail) moved under filter container */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors">
            <FilterIcon className="h-4 w-4" />
            <span>Apply Filters</span>
          </button>
          <button
            onClick={onExport}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-800 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export as PDF</span>
          </button>
          <button
            onClick={onReload}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reload Data</span>
          </button>
          <div className="ml-auto flex items-center text-sm text-gray-600">
            Showing {filtered.length} of {cases.length} cases
          </div>
        </div>
      </section>

      {/* 6. Tables Section (RE-STYLED) */}
      <section className="space-y-8">
        {/* (A) Recent Sewer Death Cases Table */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Recent Sewer Death Cases
          </h2>
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    className={`${tableHeaderStyle} bg-gradient-to-r from-blue-500 to-blue-600 rounded-tl-lg`}
                  ></th>
                  <th
                    className={`${tableHeaderStyle} bg-gradient-to-r from-blue-500 to-blue-600`}
                  >
                    Case ID
                  </th>
                  <th
                    className={`${tableHeaderStyle} bg-gradient-to-r from-blue-500 to-blue-600`}
                  >
                    Incident
                  </th>
                  <th
                    className={`${tableHeaderStyle} bg-gradient-to-r from-blue-500 to-blue-600`}
                  >
                    Police Station
                  </th>
                  <th
                    className={`${tableHeaderStyle} bg-gradient-to-r from-blue-500 to-blue-600`}
                  >
                    Status
                  </th>
                  <th
                    className={`${tableHeaderStyle} bg-gradient-to-r from-blue-500 to-blue-600`}
                  >
                    FIR
                  </th>
                  <th
                    className={`${tableHeaderStyle} bg-gradient-to-r from-blue-500 to-blue-600`}
                  >
                    Compensation
                  </th>
                  <th
                    className={`${tableHeaderStyle} bg-gradient-to-r from-blue-500 to-blue-600 rounded-tr-lg`}
                  >
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className={tableCellStyle}>
                      <div className="text-center text-gray-500 py-4">
                        No cases match your filters.
                      </div>
                    </td>
                  </tr>
                )}
                {filtered.map((c, idx) => (
                  <React.Fragment key={c.id}>
                    <tr
                      className={`${
                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } hover:bg-blue-50 cursor-pointer`}
                      onClick={() =>
                        setExpandedCase(expandedCase === c.id ? null : c.id)
                      }
                    >
                      <td className={`${tableCellStyle} w-10`}>
                        {expandedCase === c.id ? (
                          <ChevronDown className="h-5 w-5 text-blue-600" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        )}
                      </td>
                      <td className={tableCellStyle}>
                        <p className="text-gray-900 whitespace-no-wrap font-medium">
                          {c.id}
                        </p>
                      </td>
                      <td className={tableCellStyle}>
                        <p className="text-gray-900 whitespace-no-wrap">
                          {c.category}
                        </p>
                      </td>
                      <td className={tableCellStyle}>
                        <p className="text-gray-900 whitespace-no-wrap">
                          {c.policeStation}
                        </p>
                      </td>
                      <td className={tableCellStyle}>
                        <StatusPill status={c.status} />
                      </td>
                      <td className={tableCellStyle}>
                        <p
                          className={`whitespace-no-wrap ${
                            c.firFiled ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {c.firFiled ? 'Yes' : 'No'}
                        </p>
                      </td>
                      <td className={tableCellStyle}>
                        <p className="text-gray-900 whitespace-no-wrap">
                          {c.compensationSanctioned
                            ? `₹${formatCurrency(c.compensationSanctioned)}`
                            : '-'}
                        </p>
                      </td>
                      <td className={tableCellStyle}>
                        <p className="text-gray-900 whitespace-no-wrap">
                          {c.date}
                        </p>
                      </td>
                    </tr>

                    {/* Expandable Fact Sheet row */}
                    <tr>
                      <td colSpan={8} className="p-0">
                        <AnimatePresence>
                          {expandedCase === c.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <FactSheet caseItem={c} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* (B & C) Other Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Escalated Cases Table */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Escalated Cases
            </h2>
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className={`${tableHeaderStyle} bg-gradient-to-r from-red-500 to-red-600 rounded-tl-lg`}
                    >
                      Case ID
                    </th>
                    <th
                      className={`${tableHeaderStyle} bg-gradient-to-r from-red-500 to-red-600`}
                    >
                      Reason
                    </th>
                    <th
                      className={`${tableHeaderStyle} bg-gradient-to-r from-red-500 to-red-600`}
                    >
                      Escalated To
                    </th>
                    <th
                      className={`${tableHeaderStyle} bg-gradient-to-r from-red-500 to-red-600`}
                    >
                      Date
                    </th>
                    <th
                      className={`${tableHeaderStyle} bg-gradient-to-r from-red-500 to-red-600 rounded-tr-lg`}
                    >
                      Response
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="hover:bg-gray-100">
                    <td className={tableCellStyle}>CASE-2025-001</td>
                    <td className={tableCellStyle}>Comp. Delay</td>
                    <td className={tableCellStyle}>DGP Office</td>
                    <td className={tableCellStyle}>2025-08-15</td>
                    <td className={tableCellStyle}>Pending</td>
                  </tr>
                  <tr className={`${tableRowStriped} hover:bg-gray-100`}>
                    <td className={tableCellStyle}>CASE-2025-003</td>
                    <td className={tableCellStyle}>FIR Not Filed</td>
                    <td className={tableCellStyle}>NSKC</td>
                    <td className={tableCellStyle}>2025-10-10</td>
                    <td className={tableCellStyle}>Acknowledged</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Compensation Alerts Table */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Compensation Alerts
            </h2>
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className={`${tableHeaderStyle} bg-gradient-to-r from-green-500 to-green-600 rounded-tl-lg`}
                    >
                      Worker Name
                    </th>
                    <th
                      className={`${tableHeaderStyle} bg-gradient-to-r from-green-500 to-green-600`}
                    >
                      Sanctioned
                    </th>
                    <th
                      className={`${tableHeaderStyle} bg-gradient-to-r from-green-500 to-green-600`}
                    >
                      Paid
                    </th>
                    <th
                      className={`${tableHeaderStyle} bg-gradient-to-r from-green-500 to-green-600 rounded-tr-lg`}
                    >
                      Pending Days
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="hover:bg-gray-100">
                    <td className={tableCellStyle}>Ramesh (for CASE-001)</td>
                    <td className={tableCellStyle}>₹5,00,000</td>
                    <td className={tableCellStyle}>₹0</td>
                    <td className={tableCellStyle}>
                      <span className="text-red-600 font-semibold">12</span>
                    </td>
                  </tr>
                  <tr className={`${tableRowStriped} hover:bg-gray-100`}>
                    <td className={tableCellStyle}>Sita (for CASE-002)</td>
                    <td className={tableCellStyle}>₹2,50,000</td>
                    <td className={tableCellStyle}>₹2,50,000</td>
                    <td className={tableCellStyle}>
                      <span className="text-green-600 font-semibold">0</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Police Station-Wise Breakdown Section (RE-STYLED as GRID) */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Police Station-Wise Breakdown
        </h2>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 min-w-[1000px]">
            {/* Headers */}
            <div className="font-semibold text-gray-700 text-sm p-3 bg-gray-100 rounded-lg col-span-2 lg:col-span-1">
              Police Station
            </div>
            <div className="font-semibold text-gray-700 text-sm p-3 bg-gray-100 rounded-lg">
              Total Incidents
            </div>
            <div className="font-semibold text-gray-700 text-sm p-3 bg-gray-100 rounded-lg">
              FIRs Filed
            </div>
            <div className="font-semibold text-gray-700 text-sm p-3 bg-gray-100 rounded-lg">
              Pending Invest.
            </div>
            <div className="font-semibold text-gray-700 text-sm p-3 bg-gray-100 rounded-lg">
              Charge Sheets
            </div>
            <div className="font-semibold text-gray-700 text-sm p-3 bg-gray-100 rounded-lg">
              Comp. Paid
            </div>
            <div className="font-semibold text-gray-700 text-sm p-3 bg-gray-100 rounded-lg">
              Grievances
            </div>
            <div className="font-semibold text-gray-700 text-sm p-3 bg-gray-100 rounded-lg">
              Compliance Score
            </div>

            {/* Data Row 1 */}
            <div className="p-3 bg-white rounded-lg shadow col-span-2 lg:col-span-1 border-l-4 border-blue-500">
              Central PS
            </div>
            <div className="p-3 bg-white rounded-lg shadow text-center">4</div>
            <div className="p-3 bg-white rounded-lg shadow text-center">3</div>
            <div className="p-3 bg-white rounded-lg shadow text-center">1</div>
            <div className="p-3 bg-white rounded-lg shadow text-center">2</div>
            <div className="p-3 bg-white rounded-lg shadow text-center">
              ₹20 L
            </div>
            <div className="p-3 bg-white rounded-lg shadow text-center">2</div>
            <div className="p-3 bg-white rounded-lg shadow text-center font-bold text-green-600">
              92%
            </div>

            {/* Data Row 2 */}
            <div className="p-3 bg-white rounded-lg shadow col-span-2 lg:col-span-1 border-l-4 border-green-500">
              North PS
            </div>
            <div className="p-3 bg-white rounded-lg shadow text-center">2</div>
            <div className="p-3 bg-white rounded-lg shadow text-center">2</div>
            <div className="p-3 bg-white rounded-lg shadow text-center">0</div>
            <div className="p-3 bg-white rounded-lg shadow text-center">2</div>
            <div className="p-3 bg-white rounded-lg shadow text-center">
              ₹30 L
            </div>
            <div className="p-3 bg-white rounded-lg shadow text-center">0</div>
            <div className="p-3 bg-white rounded-lg shadow text-center font-bold text-green-600">
              98%
            </div>

            {/* Data Row 3 */}
            <div className="p-3 bg-white rounded-lg shadow col-span-2 lg:col-span-1 border-l-4 border-red-500">
              East PS
            </div>
            <div className="p-3 bg-white rounded-lg shadow text-center">1</div>
            <div className="p-3 bg-white rounded-lg shadow text-center">0</div>
            <div className="p-3 bg-white rounded-lg shadow text-center">1</div>
            <div className="p-3 bg-white rounded-lg shadow text-center">0</div>
            <div className="p-3 bg-white rounded-lg shadow text-center">₹0 L</div>
            <div className="p-3 bg-white rounded-lg shadow text-center">1</div>
            <div className="p-3 bg-white rounded-lg shadow text-center font-bold text-red-600">
              45%
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* HELPER COMPONENTS (RE-STYLED/NEW)                      */
/* -------------------------------------------------------------------------- */

function formatCurrency(n: number) {
  if (!n) return '0';
  // Format to Indian currency style
  return n.toLocaleString('en-IN');
}

function StatusPill({ status }: { status: CaseItem['status'] }) {
  const map: Record<string, { bg: string; text: string }> = {
    Pending: { bg: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
    Initiated: { bg: 'bg-blue-100 text-blue-800', text: 'Initiated' },
    'In Progress': { bg: 'bg-orange-100 text-orange-800', text: 'In Progress' },
    Completed: { bg: 'bg-green-100 text-green-800', text: 'Completed' },
  };
  const style = map[status] || map.Pending;
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg}`}
    >
      {style.text}
    </span>
  );
}

// NOTE: This component was not in your code but was in the prompt.
// I've added it back as a simple bar.
function ScoreBar({ score }: { score: number }) {
  const getBarColor = () => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  return (
    <div className="w-full">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-2 rounded-full ${getBarColor()}`}
          style={{ width: `${Math.min(score, 100)}%` }}
        />
      </div>
      <div className="text-xs text-gray-600 mt-1 text-right">{score}%</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. FACT SHEET COMPONENT (COMPLETELY RE-STYLED)             */
/* -------------------------------------------------------------------------- */

function FactSheet({ caseItem }: { caseItem: CaseItem }) {
  return (
    <article className="p-6 bg-gray-50 border-l-4 border-blue-600">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Fact Sheet: Case {caseItem.id}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* --- COLUMN 1 --- */}
        <div className="space-y-4">
          {/* A. Basic Details */}
          <div className="bg-white p-4 rounded-lg shadow border">
            <h4 className="font-semibold text-blue-700 mb-2">
              A. Basic Details
            </h4>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Date / Time:</strong> {caseItem.date} / {caseItem.time}
              </p>
              <p>
                <strong>Location:</strong> {caseItem.location}
              </p>
              <p>
                <strong>Category:</strong> {caseItem.category}
              </p>
              <p>
                <strong>Workers Involved:</strong> {caseItem.workersInvolved || 'N/A'}
              </p>
            </div>
          </div>

          {/* C. FIR Details */}
          <div className="bg-white p-4 rounded-lg shadow border">
            <h4 className="font-semibold text-blue-700 mb-2">C. FIR Details</h4>
            <div className="space-y-1 text-sm">
              <p>
                <strong>FIR No:</strong> {caseItem.firNumber || 'N/A'}
              </p>
              <p>
                <strong>Police Station:</strong> {caseItem.policeStation}
              </p>
              <p>
                <strong>Status:</strong> {caseItem.firStatus || (caseItem.firFiled ? 'Filed' : 'Not Filed')}
              </p>
              <p>
                <strong>Sections:</strong> {caseItem.sections || 'N/A'}
              </p>
            </div>
          </div>

          {/* E. Inquiry Status */}
          <div className="bg-white p-4 rounded-lg shadow border">
            <h4 className="font-semibold text-blue-700 mb-2">
              E. Inquiry Status
            </h4>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Status:</strong> {caseItem.inquiryStatus || 'N/A'}
              </p>
              <p>
                <strong>Summary:</strong> {caseItem.investigationSummary || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* --- COLUMN 2 --- */}
        <div className="space-y-4">
          {/* B. Narrative Summary */}
          <div className="bg-white p-4 rounded-lg shadow border">
            <h4 className="font-semibold text-blue-700 mb-2">
              B. Narrative Summary
            </h4>
            <p className="text-sm">{caseItem.narrative || 'No narrative provided.'}</p>
          </div>

          {/* D. Compensation Details */}
          <div className="bg-white p-4 rounded-lg shadow border">
            <h4 className="font-semibold text-blue-700 mb-2">
              D. Compensation Details
            </h4>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Amount Sanctioned:</strong>
                {caseItem.compensationSanctioned
                  ? ` ₹${formatCurrency(caseItem.compensationSanctioned)}`
                  : ' N/A'}
              </p>
              <p>
                <strong>Amount Paid:</strong>
                {caseItem.compensationPaid
                  ? ` ₹${formatCurrency(caseItem.compensationPaid)}`
                  : ' ₹0'}
              </p>
              <p>
                <strong>Pending Days:</strong> {caseItem.pendingDays || 'N/A'}
              </p>
            </div>
          </div>

          {/* F. Miscellaneous Notes */}
          <div className="bg-white p-4 rounded-lg shadow border">
            <h4 className="font-semibold text-blue-700 mb-2">
              F. Miscellaneous Notes
            </h4>
            <p className="text-sm">{caseItem.miscNotes || 'N/A'}</p>
            <div className="mt-2">
              <h5 className="text-xs font-semibold text-gray-600">Attachments:</h5>
              {caseItem.attachments && caseItem.attachments.length > 0 ? (
                <ul className="list-disc list-inside">
                  {caseItem.attachments.map((file, i) => (
                    <li key={i} className="text-sm text-blue-600 hover:underline">
                      <a href="#">{file}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No attachments.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}