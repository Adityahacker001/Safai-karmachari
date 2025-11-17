// app/(nskfdc)/sewer-death/page.tsx
'use client';

import React, { useMemo, useState } from 'react';
// This component is NOT defined here. It is imported as requested.
// I am respecting the 'color' prop and not changing it to 'gradient'.
import StatCard from '@/components/ui/stat-card';
import {
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  BarChart2,
  Users,
  ChevronRight,
  ChevronDown,
  Search,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RefreshCw, Filter as FilterIcon } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* ALL YOUR EXISTING DATA AND LOGIC (UNCHANGED)                               */
/* -------------------------------------------------------------------------- */

type CaseItem = {
  caseId: string;
  incidentId: string;
  district: string;
  policeStation: string;
  category: string;
  date: string;
  workersInvolved?: string[]; // names or ids
  deaths?: number;
  injuries?: number;
  firNo?: string;
  firStatus?: string;
  compensationSanctioned?: number;
  compensationPaid?: number;
  inquiryStatus?: string;
  narrative?: string;
  attachments?: string[];
  daysPending?: number;
  sections?: string;
  workersInvolvedCount?: number;
};

const SAMPLE_CASES: CaseItem[] = [
  {
    caseId: 'NSK-001',
    incidentId: 'INC-1001',
    district: 'Kolkata',
    policeStation: 'Central PS',
    category: 'Sewer Death',
    date: '2025-10-10',
    workersInvolved: ['Ramesh'],
    workersInvolvedCount: 1,
    deaths: 1,
    injuries: 0,
    firNo: 'FIR-909',
    firStatus: 'Under Investigation',
    sections: '304A IPC',
    compensationSanctioned: 500000,
    compensationPaid: 0,
    inquiryStatus: 'Initiated',
    narrative: 'Worker entered septic pit without permit; no PPE available.',
    attachments: ['photo.jpg'],
    daysPending: 28,
  },
  {
    caseId: 'NSK-002',
    incidentId: 'INC-1002',
    district: 'Howrah',
    policeStation: 'North PS',
    category: 'Sewer Injury',
    date: '2025-09-20',
    workersInvolved: ['Sita'],
    workersInvolvedCount: 1,
    deaths: 0,
    injuries: 1,
    firNo: 'FIR-910',
    firStatus: 'Closed',
    sections: '338 IPC',
    compensationSanctioned: 150000,
    compensationPaid: 150000,
    inquiryStatus: 'Completed',
    narrative: 'Worker injured while clearing obstruction, treated and compensated.',
    attachments: [],
    daysPending: 0,
  },
];

const PIE_DATA = [
  { name: 'Manual Scavenging Deaths', value: 18 },
  { name: 'Sewer Death', value: 9 },
  { name: 'Sewer Injuries', value: 22 },
  { name: 'Hazardous Exposure', value: 6 },
];
const PASTEL_COLORS = ['#A7F3D0', '#BFDBFE', '#FDE68A', '#FBCFE8'];

const INVESTIGATION_DATA = [
  { district: 'Kolkata', Initiated: 5, 'In Progress': 3, Completed: 8 },
  { district: 'Howrah', Initiated: 2, 'In Progress': 2, Completed: 4 },
  { district: 'Darjeeling', Initiated: 1, 'In Progress': 0, Completed: 2 },
];

const COMP_DATA = [
  { month: 'Jan', Sanctioned: 120000, Paid: 80000, Pending: 40000 },
  { month: 'Feb', Sanctioned: 90000, Paid: 90000, Pending: 0 },
  { month: 'Mar', Sanctioned: 150000, Paid: 100000, Pending: 50000 },
];

/* -------------------------------------------------------------------------- */
/* START OF RE-STYLED PAGE COMPONENT                                        */
/* -------------------------------------------------------------------------- */
export default function NskfdcSewerDeathPage() {
  // YOUR EXISTING UI STATE (UNCHANGED)
  const [cases] = useState<CaseItem[]>(SAMPLE_CASES);
  const [query, setQuery] = useState('');
  const [district, setDistrict] = useState<string>('All');
  const [category, setCategory] = useState<string>('Sewer Death');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [fir, setFir] = useState<'all' | 'yes' | 'no'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  // YOUR EXISTING DERIVED STATE (UNCHANGED)
  const filtered = useMemo(() => {
    return cases.filter((c) => {
      if (district !== 'All' && c.district !== district) return false;
      if (category !== 'All' && c.category !== category) return false;
      if (fir === 'yes' && !c.firNo) return false;
      if (fir === 'no' && c.firNo) return false;
      if (fromDate && c.date < fromDate) return false;
      if (toDate && c.date > toDate) return false;
      if (
        query &&
        !`${c.caseId} ${c.incidentId} ${c.policeStation} ${c.district}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [cases, district, category, fir, fromDate, toDate, query]);

  const summary = useMemo(() => {
    const total = cases.length;
    const firs = cases.filter((c) => !!c.firNo).length;
    const pendingFirs = total - firs;
    const sanctioned = cases.reduce(
      (s, c) => s + (c.compensationSanctioned || 0),
      0,
    );
    const paid = cases.reduce((s, c) => s + (c.compensationPaid || 0), 0);
    const pendingComp = sanctioned - paid;
    const completed = cases.filter(
      (c) => c.inquiryStatus === 'Completed',
    ).length;
    const ongoing = cases.filter(
      (c) => c.inquiryStatus !== 'Completed',
    ).length;
    return {
      total,
      firs,
      pendingFirs,
      sanctioned,
      paid,
      pendingComp,
      completed,
      ongoing,
    };
  }, [cases]);

  // YOUR EXISTING FUNCTIONS (UNCHANGED)
  function exportCSV() {
    alert('Export (placeholder) — implement export logic');
  }
  function reloadData() {
    alert('Reload (placeholder) — implement API refresh');
  }

  // Table header styles
  const tableHeaderStyle =
    'px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider';
  const tableCellStyle = 'px-5 py-4 border-b border-gray-200 bg-white text-sm';

  return (
    // Standard dashboard layout
    <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* 1. Header Section (Gradient Title Container) */}
      <header className="w-full mb-2">
        <div className="w-full rounded-xl shadow-lg p-6 bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-400">
          <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow">
            Sewer Death Report
          </h1>
          <nav className="text-sm text-white/90 mt-2" aria-label="Breadcrumb">
            <ol className="inline-flex list-none p-0">
              <li className="flex items-center">
                <a href="#" className="hover:text-emerald-200">
                  NSKFDC
                </a>
                <ChevronRight className="h-4 w-4 mx-1 text-white/80" />
              </li>
              <li className="flex items-center">
                <a href="#" className="hover:text-emerald-200">
                  Reports
                </a>
                <ChevronRight className="h-4 w-4 mx-1 text-white/80" />
              </li>
              <li className="flex items-center">
                <span className="text-white/70">Sewer Death Report</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. KPI Cards (moved above filter section) */}
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Cases" value={String(summary.total)} color="purple" icon={FileText} />
        <StatCard title="FIRs Filed" value={String(summary.firs)} color="blue" icon={Shield} />
        <StatCard title="FIRs Pending" value={String(summary.pendingFirs)} color="orange" icon={AlertTriangle} />
        <StatCard title="Comp. Pending (₹)" value={`₹${formatINR(summary.pendingComp)}`} color="green" icon={Clock} />
        <StatCard title="Comp. Sanctioned (₹)" value={`₹${formatINR(summary.sanctioned)}`} color="green" icon={DollarSign} />
        <StatCard title="Comp. Paid (₹)" value={`₹${formatINR(summary.paid)}`} color="blue" icon={CheckCircle2} />
        <StatCard title="Investigations Completed" value={String(summary.completed)} color="purple" icon={CheckCircle2} />
        <StatCard title="Investigations Ongoing" value={String(summary.ongoing)} color="orange" icon={Clock} />
      </section>

      {/* 5. Charts (RE-STYLED CONTAINERS) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Incident Mix</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={PIE_DATA} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={4} stroke="none">
                  {PIE_DATA.map((d, i) => (
                    <Cell key={d.name} fill={PASTEL_COLORS[i % PASTEL_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Investigation Status (District)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={INVESTIGATION_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="district" fontSize={12} />
                <YAxis fontSize={12} />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="Initiated" stackId="a" fill="#BFDBFE" />
                <Bar dataKey="In Progress" stackId="a" fill="#FDE68A" />
                <Bar dataKey="Completed" stackId="a" fill="#A7F3D0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Compensation Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={COMP_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <RechartsTooltip formatter={(value: number) => `₹${formatINR(value)}`} />
                <Legend />
                <Line type="monotone" dataKey="Sanctioned" stroke="#60A5FA" strokeWidth={2} />
                <Line type="monotone" dataKey="Paid" stroke="#34D399" strokeWidth={2} />
                <Line type="monotone" dataKey="Pending" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* 6. Filters (RE-STYLED IN GLASS CARD, now below charts) */}
      <section className="w-full p-4 bg-white/60 backdrop-blur-md shadow-md rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {/* Row 1 inputs */}
          <div className="lg:col-span-1">
            <label htmlFor="date-from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <input type="date" id="date-from" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700" />
          </div>
          <div className="lg:col-span-1">
            <label htmlFor="date-to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input type="date" id="date-to" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700" />
          </div>
          <div className="lg:col-span-1">
            <label htmlFor="filter-district" className="block text-sm font-medium text-gray-700 mb-1">District</label>
            <select id="filter-district" value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700">
              <option>All</option>
              <option>Kolkata</option>
              <option>Howrah</option>
              <option>Darjeeling</option>
            </select>
          </div>
          <div className="lg:col-span-1">
            <label htmlFor="filter-category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select id="filter-category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700">
              <option>All</option>
              <option>Sewer Death</option>
              <option>Sewer Injury</option>
              <option>Manual Scavenging Death</option>
            </select>
          </div>
          <div className="lg:col-span-1">
            <label htmlFor="filter-fir" className="block text-sm font-medium text-gray-700 mb-1">FIR Status</label>
            <select id="filter-fir" value={fir} onChange={(e) => setFir(e.target.value as 'all' | 'yes' | 'no')} className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700">
              <option value="all">All</option>
              <option value="yes">Filed</option>
              <option value="no">Not Filed</option>
            </select>
          </div>
          <div className="lg:col-span-2">
            <label htmlFor="search-query" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <input id="search-query" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Case / FIR / Worker..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Export + Reload (RE-STYLED) */}
      <section className="flex flex-col sm:flex-row gap-2">
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md shadow-md hover:bg-emerald-700 transition-colors">
          <FilterIcon className="h-4 w-4" />
          <span>Apply Filters</span>
        </button>
        <button
          onClick={exportCSV}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-800 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export as PDF</span>
        </button>
        <button
          onClick={reloadData}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Reload Data</span>
        </button>
        <div className="ml-auto flex items-center text-sm text-gray-600">
          Showing {filtered.length} of {cases.length} cases
        </div>
      </section>

      {/* 4. KPI Cards (STYLES 100% UNCHANGED, AS REQUESTED) */}
      

      {/* 5. Charts (RE-STYLED CONTAINERS) */}
      

      {/* 6. Main Table + Side Widgets (RE-STYLED) */}
      <section className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table (main) */}
        <div className="lg:col-span-2 overflow-hidden">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Total Incident Report
          </h3>
          <div className="overflow-x-auto rounded-lg shadow-md">
            {/* COLORFUL TABLE HEADER */}
            <table className="min-w-full leading-normal">
              <thead
                className={`${tableHeaderStyle} bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-t-lg`}
              >
                <tr>
                  <th className={`${tableHeaderStyle} rounded-tl-lg`}></th>
                  <th className={tableHeaderStyle}>Incident ID</th>
                  <th className={tableHeaderStyle}>Date</th>
                  <th className={tableHeaderStyle}>Location</th>
                  <th className={tableHeaderStyle}>Deaths</th>
                  <th className={tableHeaderStyle}>Injuries</th>
                  <th className={tableHeaderStyle}>FIR No</th>
                  <th className={tableHeaderStyle}>Comp. Paid</th>
                  <th className={`${tableHeaderStyle} rounded-tr-lg`}>
                    Inquiry
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filtered.map((c) => (
                  <React.Fragment key={c.caseId}>
                    {/* STRIPED & HOVERABLE ROWS */}
                    <tr
                      className="cursor-pointer hover:bg-emerald-50 even:bg-gray-50"
                      onClick={() =>
                        setExpanded(expanded === c.caseId ? null : c.caseId)
                      }
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ')
                          setExpanded(expanded === c.caseId ? null : c.caseId);
                      }}
                      aria-expanded={expanded === c.caseId}
                    >
                      <td className={`${tableCellStyle} w-10`}>
                        {expanded === c.caseId ? (
                          <ChevronDown className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        )}
                      </td>
                      <td className={tableCellStyle}>
                        <p className="font-medium">{c.incidentId}</p>
                      </td>
                      <td className={tableCellStyle}>{c.date}</td>
                      <td className={tableCellStyle}>
                        {c.district} / {c.policeStation}
                      </td>
                      <td className={`${tableCellStyle} text-red-600 font-bold`}>
                        {c.deaths ?? 0}
                      </td>
                      <td
                        className={`${tableCellStyle} text-yellow-600 font-bold`}
                      >
                        {c.injuries ?? 0}
                      </td>
                      <td className={tableCellStyle}>{c.firNo || '-'}</td>
                      <td className={tableCellStyle}>
                        {c.compensationPaid
                          ? `₹${formatINR(c.compensationPaid)}`
                          : '-'}
                      </td>
                      <td className={tableCellStyle}>
                        <StatusPill status={c.inquiryStatus} />
                      </td>
                    </tr>

                    {/* Expandable Fact Sheet */}
                    <tr>
                      <td colSpan={9} className="p-0">
                        <AnimatePresence>
                          {expanded === c.caseId && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.18 }}
                              className="overflow-hidden"
                            >
                              {/* CLEAN 2-COLUMN FACT SHEET */}
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

        {/* Right column widgets */}
        <aside className="space-y-6">
          <div className="overflow-hidden">
            <h4 className="text-lg font-semibold mb-3">Escalated Districts</h4>
            <div className="overflow-x-auto rounded-lg shadow-md">
              {/* COLORFUL TABLE HEADER */}
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className={`${tableHeaderStyle} bg-gradient-to-r from-red-500 to-red-600 rounded-tl-lg`}
                    >
                      District
                    </th>
                    <th
                      className={`${tableHeaderStyle} bg-gradient-to-r from-red-500 to-red-600`}
                    >
                      Reason
                    </th>
                    <th
                      className={`${tableHeaderStyle} bg-gradient-to-r from-red-500 to-red-600 rounded-tr-lg`}
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="hover:bg-gray-100">
                    <td className={tableCellStyle}>Darjeeling</td>
                    <td className={tableCellStyle}>
                      Pending Comp. {'>'}60 days
                    </td>
                    <td className={tableCellStyle}>2025-10-29</td>
                  </tr>
                  <tr className="even:bg-gray-50 hover:bg-gray-100">
                    <td className={tableCellStyle}>Kolkata</td>
                    <td className={tableCellStyle}>Pending FIRs {'>'}30 days</td>
                    <td className={tableCellStyle}>2025-10-05</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
            <h4 className="text-lg font-semibold mb-3">Top Worker Impact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium">Ramesh (NSK-001)</div>
                <div className="text-sm text-gray-700 font-medium">
                  ₹5,00,000
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium">Sita (NSK-002)</div>
                <div className="text-sm text-gray-700 font-medium">
                  ₹1,50,000
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* District heatmap tiles (RE-STYLED) */}
      <section className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">
          District Compliance Tiles
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ComplianceTile district="Kolkata" score={82} incidents={18} />
          <ComplianceTile district="Howrah" score={74} incidents={12} />
          <ComplianceTile district="Darjeeling" score={61} incidents={7} />
          <ComplianceTile district="North 24 Pgs" score={88} incidents={22} />
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* HELPER COMPONENTS (RE-STYLED / CLEANED)                                  */
/* -------------------------------------------------------------------------- */

// Cleaner, two-column Fact Sheet
function FactSheet({ caseItem }: { caseItem: CaseItem }) {
  return (
    <article className="p-6 bg-emerald-50/50 border-l-4 border-emerald-500">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Fact Sheet: Case {caseItem.caseId}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* --- COLUMN 1 --- */}
        <div className="space-y-4">
          {/* A. Basic Details */}
          <div className="bg-white p-4 rounded-lg shadow border">
            <h4 className="font-semibold text-emerald-700 mb-2">
              A. Basic Details
            </h4>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Incident ID:</strong> {caseItem.incidentId}
              </p>
              <p>
                <strong>Date:</strong> {caseItem.date}
              </p>
              <p>
                <strong>District:</strong> {caseItem.district}
              </p>
              <p>
                <strong>Police Station:</strong> {caseItem.policeStation}
              </p>
              <p>
                <strong>Category:</strong> {caseItem.category}
              </p>
              <p>
                <strong>Workers:</strong>{' '}
                {(caseItem.workersInvolved || []).join(', ') || 'N/A'}
              </p>
            </div>
          </div>

          {/* C. FIR Details */}
          <div className="bg-white p-4 rounded-lg shadow border">
            <h4 className="font-semibold text-emerald-700 mb-2">
              C. FIR Details
            </h4>
            <div className="space-y-1 text-sm">
              <p>
                <strong>FIR No:</strong> {caseItem.firNo || 'N/A'}
              </p>
              <p>
                <strong>Status:</strong> {caseItem.firStatus || 'N/A'}
              </p>
              <p>
                <strong>Sections:</strong> {caseItem.sections || 'N/A'}
              </p>
            </div>
          </div>

          {/* E. Inquiry Status */}
          <div className="bg-white p-4 rounded-lg shadow border">
            <h4 className="font-semibold text-emerald-700 mb-2">
              E. Inquiry Status
            </h4>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Status:</strong> {caseItem.inquiryStatus || 'N/A'}
              </p>
              <p>
                <strong>Days Pending:</strong> {caseItem.daysPending || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* --- COLUMN 2 --- */}
        <div className="space-y-4">
          {/* B. Narrative Summary */}
          <div className="bg-white p-4 rounded-lg shadow border">
            <h4 className="font-semibold text-emerald-700 mb-2">
              B. Narrative Summary
            </h4>
            <p className="text-sm">
              {caseItem.narrative || 'No narrative provided.'}
            </p>
          </div>

          {/* D. Compensation Details */}
          <div className="bg-white p-4 rounded-lg shadow border">
            <h4 className="font-semibold text-emerald-700 mb-2">
              D. Compensation Details
            </h4>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Amount Sanctioned:</strong>
                {caseItem.compensationSanctioned
                  ? ` ₹${formatINR(caseItem.compensationSanctioned)}`
                  : ' N/A'}
              </p>
              <p>
                <strong>Amount Paid:</strong>
                {caseItem.compensationPaid
                  ? ` ₹${formatINR(caseItem.compensationPaid)}`
                  : ' ₹0'}
              </p>
            </div>
          </div>

          {/* F. Miscellaneous Notes */}
          <div className="bg-white p-4 rounded-lg shadow border">
            <h4 className="font-semibold text-emerald-700 mb-2">
              F. Attachments
            </h4>
            <div className="mt-2">
              {caseItem.attachments && caseItem.attachments.length > 0 ? (
                <ul className="list-disc list-inside">
                  {caseItem.attachments.map((file, i) => (
                    <li
                      key={i}
                      className="text-sm text-blue-600 hover:underline"
                    >
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

function ComplianceTile({
  district,
  score,
  incidents,
}: {
  district: string;
  score: number;
  incidents: number;
}) {
  const bg =
    score > 80
      ? 'bg-emerald-100/70 border-emerald-300'
      : score > 60
      ? 'bg-yellow-100/70 border-yellow-300'
      : 'bg-red-100/70 border-red-300';
  const text =
    score > 80
      ? 'text-emerald-700'
      : score > 60
      ? 'text-yellow-700'
      : 'text-red-700';

  return (
    <div
      className={`rounded-lg p-3 ${bg} border flex flex-col gap-1 shadow-sm`}
    >
      <div className={`text-sm font-semibold ${text}`}>{district}</div>
      <div className={`text-2xl font-bold ${text}`}>{score}%</div>
      <div className={`text-xs ${text} opacity-80`}>Compliance</div>
      <div className={`text-xs ${text} opacity-60`}>
        Incidents: {incidents}
      </div>
    </div>
  );
}

/* ------------------------------ Small utils (UNCHANGED) ------------------- */
function formatINR(n?: number) {
  if (!n) return '0';
  return n.toLocaleString('en-IN');
}
function truncate(s?: string, n = 60) {
  if (!s) return '-';
  return s.length <= n ? s : s.slice(0, n - 1) + '…';
}

// Helper component for table pill (Added for professionalism)
function StatusPill({ status }: { status?: string }) {
  const map: Record<string, { bg: string; text: string }> = {
    Pending: { bg: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
    Initiated: { bg: 'bg-blue-100 text-blue-800', text: 'Initiated' },
    'In Progress': { bg: 'bg-orange-100 text-orange-800', text: 'In Progress' },
    Completed: { bg: 'bg-green-100 text-green-800', text: 'Completed' },
  };
  const s = (status && map[status]) || map.Pending;
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${s.bg}`}
    >
      {s.text}
    </span>
  );
}