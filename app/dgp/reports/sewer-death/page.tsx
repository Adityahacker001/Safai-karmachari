// app/(your-route)/page.tsx
"use client";
import React, { useMemo, useState, useEffect } from 'react';
import IntegratedLoader from '@/components/layout/IntegratedLoader';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
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
import {
  Download,
  RefreshCw,
  Filter as FilterIcon,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  FileCheck,
  FileX,
  Briefcase,
  Loader,
  DollarSign,
  CheckCircle,
  Clock,
  Target,
  FileText,
  Activity,
  Shield,
  Award,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* IMPORT SHARED STAT CARD COMPONENT                                         */
/* -------------------------------------------------------------------------- */
import StatCard from "@/components/ui/stat-card";

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
  time?: string;
  status: 'Initiated' | 'In Progress' | 'Completed' | 'Pending';
  firNo?: string;
  firStatus?: string; // Added for Fact Sheet
  sections?: string; // Added for Fact Sheet
  chargeSheetFiled?: boolean;
  compensationSanctioned?: number;
  compensationPaid?: number;
  daysPending?: number;
  narrative?: string;
  attachments?: string[];
  inquiryStatus?: string; // Added for Fact Sheet
  miscNotes?: string; // Added for Fact Sheet
  workersInvolved?: number; // Added for Fact Sheet
};

const SAMPLE_CASES: CaseItem[] = [
  {
    caseId: 'CASE-2025-1001',
    incidentId: 'INC-2025-5001',
    district: 'Kolkata',
    policeStation: 'Central PS',
    category: 'Sewer Death',
    date: '2025-10-05',
    time: '07:30 AM',
    status: 'In Progress',
    firNo: 'FIR-123',
    firStatus: 'Under Investigation',
    sections: '304A IPC, Sec 9 MS Act',
    chargeSheetFiled: false,
    compensationSanctioned: 500000,
    compensationPaid: 0,
    daysPending: 34,
    narrative: 'Worker entered sewer without PPE; toxic fumes suspected.',
    attachments: ['photo.jpg', 'report.pdf'],
    inquiryStatus: 'Ongoing',
    miscNotes: 'Safety equipment failure.',
    workersInvolved: 2,
  },
  {
    caseId: 'CASE-2025-1002',
    incidentId: 'INC-2025-5002',
    district: 'Howrah',
    policeStation: 'North PS',
    category: 'Sewer Injury',
    date: '2025-09-02',
    time: '03:15 PM',
    status: 'Completed',
    firNo: 'FIR-567',
    firStatus: 'Charge Sheet Filed',
    sections: '338 IPC',
    chargeSheetFiled: true,
    compensationSanctioned: 150000,
    compensationPaid: 150000,
    daysPending: 0,
    narrative: 'Injury due to slip; compensation disbursed.',
    attachments: [],
    inquiryStatus: 'Completed',
    miscNotes: 'N/A',
    workersInvolved: 1,
  },
  {
    caseId: 'CASE-2025-1003',
    incidentId: 'INC-2025-5003',
    district: 'Darjeeling',
    policeStation: 'East PS',
    category: 'Manual Scavenging Death',
    date: '2025-08-12',
    time: '02:00 PM',
    status: 'Initiated',
    firNo: undefined,
    firStatus: 'Pending',
    sections: 'N/A',
    chargeSheetFiled: false,
    compensationSanctioned: 250000,
    compensationPaid: 0,
    daysPending: 45,
    narrative: 'Manual scavenging related death reported by contractor.',
    attachments: [],
    inquiryStatus: 'Initiated',
    miscNotes: 'Awaiting FIR.',
    workersInvolved: 1,
  },
];

const INCIDENT_PIE = [
  { name: 'Manual Scavenging Deaths', value: 24 },
  { name: 'Sewer Death', value: 14 },
  { name: 'Sewer Injuries', value: 30 },
  { name: 'Hazardous Exposure', value: 6 },
];
// Swapped to the Red color scheme from SP/CP page for incidents
const PIE_COLORS = ['#b91c1c', '#dc2626', '#f87171', '#fca5a5'];

const INVESTIGATION_BY_DISTRICT = [
  { district: 'Kolkata', Initiated: 6, 'In Progress': 4, Completed: 12 },
  { district: 'Howrah', Initiated: 3, 'In Progress': 2, Completed: 6 },
  { district: 'Darjeeling', Initiated: 2, 'In Progress': 3, Completed: 1 },
  { district: 'North 24 Pgs', Initiated: 1, 'In Progress': 0, Completed: 4 },
];

const COMP_TRACKER = [
  { month: 'Jan', Sanctioned: 250000, Paid: 200000, Pending: 50000 },
  { month: 'Feb', Sanctioned: 150000, Paid: 100000, Pending: 50000 },
  { month: 'Mar', Sanctioned: 350000, Paid: 300000, Pending: 50000 },
  { month: 'Apr', Sanctioned: 400000, Paid: 350000, Pending: 50000 },
];

/* -------------------------------------------------------------------------- */
/* START OF RE-STYLED PAGE COMPONENT                                        */
/* -------------------------------------------------------------------------- */
export default function DgpSewerDeathPage() {
  // YOUR EXISTING UI STATE (UNCHANGED)
  const [cases] = useState<CaseItem[]>(SAMPLE_CASES);
  const [districtFilter, setDistrictFilter] = useState<string>('All');
  const [psFilter, setPsFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('Sewer Death');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [firStatus, setFirStatus] = useState<'all' | 'yes' | 'no'>('all');
  const [investigationFilter, setInvestigationFilter] = useState<string>('All');
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  // Show the shared integrated loader briefly on first mount so the
  // page's loading experience matches other report pages.
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // YOUR EXISTING DERIVED STATE (UNCHANGED)
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      if (districtFilter !== 'All' && c.district !== districtFilter)
        return false;
      if (psFilter !== 'All' && c.policeStation !== psFilter) return false;
      if (
        categoryFilter &&
        categoryFilter !== 'All' &&
        c.category !== categoryFilter
      )
        return false;
      if (firStatus === 'yes' && !c.firNo) return false;
      if (firStatus === 'no' && c.firNo) return false;
      if (fromDate && c.date < fromDate) return false;
      if (toDate && c.date > toDate) return false;
      if (investigationFilter !== 'All' && c.status !== investigationFilter)
        return false;
      return true;
    });
  }, [
    cases,
    districtFilter,
    psFilter,
    categoryFilter,
    firStatus,
    fromDate,
    toDate,
    investigationFilter,
  ]);

  const totals = useMemo(() => {
    const total = cases.length;
    const firs = cases.filter((c) => !!c.firNo).length;
    const pendingFir = total - firs;
    const sanctioned = cases.reduce(
      (s, c) => s + (c.compensationSanctioned || 0),
      0,
    );
    const paid = cases.reduce((s, c) => s + (c.compensationPaid || 0), 0);
    const pendingComp = sanctioned - paid;
    const completed = cases.filter((c) => c.status === 'Completed').length;
    const ongoing = cases.filter(
      (c) => c.status === 'In Progress' || c.status === 'Initiated',
    ).length;
    return {
      total,
      firs,
      pendingFir,
      sanctioned,
      paid,
      pendingComp,
      completed,
      ongoing,
    };
  }, [cases]);

  // YOUR EXISTING FUNCTIONS (UNCHANGED)
  function onExport() {
    alert('Export placeholder: implement server export or client CSV generation');
  }
  function onReload() {
    alert('Reload placeholder: implement data refresh / API re-fetch');
  }

  // Helper styles for tables
  const tableHeaderStyle =
    'px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider';
  const tableCellStyle = 'px-5 py-4 border-b border-gray-200 bg-white text-sm';

  if (loading) return <IntegratedLoader />;

  return (
    <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">

      {/* Page Title & Breadcrumb (colored container) */}
      <div className="mb-4">
        <div className="rounded-xl p-6 md:p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 shadow-lg">
          <header className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Sewer Death Report
              </h1>
              <nav className="text-sm text-white/80" aria-label="Breadcrumb">
                <ol className="inline-flex list-none p-0">
                  <li className="flex items-center">
                    <a href="#" className="hover:text-blue-200">
                      DGP
                    </a>
                    <ChevronRight className="h-4 w-4 mx-1 text-white/60" />
                  </li>
                  <li className="flex items-center">
                    <a href="#" className="hover:text-blue-200">
                      Reports
                    </a>
                    <ChevronRight className="h-4 w-4 mx-1 text-white/60" />
                  </li>
                  <li className="flex items-center">
                    <span className="text-white/60">Sewer Death Report</span>
                  </li>
                </ol>
              </nav>
            </div>
          </header>
        </div>
      </div>

      {/* 1. KPI Cards (RE-STYLED with GRADIENTS & ICONS) */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Incidents"
          value={String(totals.total)}
          icon={AlertCircle}
          color="red"
        />
        <StatCard
          title="FIRs Filed"
          value={String(totals.firs)}
          icon={FileCheck}
          color="green"
        />
        <StatCard
          title="FIRs Pending"
          value={String(totals.pendingFir)}
          icon={FileX}
          color="orange"
        />
        <StatCard
          title="Investigations Completed"
          value={String(totals.completed)}
          icon={Briefcase}
          color="indigo"
        />
        <StatCard
          title="Investigations Ongoing"
          value={String(totals.ongoing)}
          icon={Loader}
          color="purple"
        />
        <StatCard
          title="Compensation Sanctioned"
          value={`₹${formatINR(totals.sanctioned)}`}
          icon={DollarSign}
          color="blue"
        />
        <StatCard
          title="Compensation Paid"
          value={`₹${formatINR(totals.paid)}`}
          icon={CheckCircle}
          color="emerald"
        />
        <StatCard
          title="Compensation Pending"
          value={`₹${formatINR(totals.pendingComp)}`}
          icon={Clock}
          color="amber"
        />
      </section>

      {/* 2. Charts Section (RE-STYLED CONTAINERS) */}
      <section className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Incident Category (Statewide)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={INCIDENT_PIE}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  stroke="none"
                >
                  {INCIDENT_PIE.map((entry, idx) => (
                    <Cell
                      key={entry.name}
                      fill={PIE_COLORS[idx % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Investigation Status by District
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={INVESTIGATION_BY_DISTRICT}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="district" fontSize={12} />
                <YAxis fontSize={12} />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="Initiated" stackId="a" fill="#60A5FA" />
                <Bar dataKey="In Progress" stackId="a" fill="#F59E0B" />
                <Bar dataKey="Completed" stackId="a" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Compensation Tracker (Month)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={COMP_TRACKER}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <RechartsTooltip
                  formatter={(value: number) => `₹${formatINR(value)}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Sanctioned"
                  stroke="#6366F1"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Paid"
                  stroke="#10B981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Pending"
                  stroke="#F59E0B"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* 2. Filters (GLASS CARD) */}
      <section className="w-full p-4 bg-white/60 backdrop-blur-md shadow-md rounded-lg border border-gray-200 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
          {/* Row 1 inputs */}
          <div className="lg:col-span-1">
            <label
              htmlFor="date-from"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              From
            </label>
            <input
              type="date"
              id="date-from"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700"
            />
          </div>
          <div className="lg:col-span-1">
            <label
              htmlFor="date-to"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              To
            </label>
            <input
              type="date"
              id="date-to"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700"
            />
          </div>
          <div className="lg:col-span-1">
            <label
              htmlFor="filter-district"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              District
            </label>
            <select
              id="filter-district"
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700"
            >
              <option>All</option>
              <option>Kolkata</option>
              <option>Howrah</option>
              <option>Darjeeling</option>
              <option>North 24 Pgs</option>
            </select>
          </div>
          <div className="lg:col-span-1">
            <label
              htmlFor="filter-ps"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Police Station
            </label>
            <select
              id="filter-ps"
              value={psFilter}
              onChange={(e) => setPsFilter(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700"
            >
              <option>All</option>
              <option>Central PS</option>
              <option>North PS</option>
              <option>East PS</option>
            </select>
          </div>
          <div className="lg:col-span-1">
            <label
              htmlFor="filter-category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="filter-category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700"
            >
              <option>All</option>
              <option>Sewer Death</option>
              <option>Sewer Injury</option>
              <option>Manual Scavenging Death</option>
              <option>Hazardous Exposure</option>
            </select>
          </div>
          <div className="lg:col-span-1">
            <label
              htmlFor="filter-investigation"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Investigation
            </label>
            <select
              id="filter-investigation"
              value={investigationFilter}
              onChange={(e) => setInvestigationFilter(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700"
            >
              <option value="All">All</option>
              <option value="Initiated">Initiated</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="lg:col-span-1">
            <label
              htmlFor="filter-fir"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              FIR Status
            </label>
            <select
              id="filter-fir"
              value={firStatus}
              onChange={(e) =>
                setFirStatus(e.target.value as 'all' | 'yes' | 'no')
              }
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700"
            >
              <option value="all">All</option>
              <option value="yes">Filed</option>
              <option value="no">Not Filed</option>
            </select>
          </div>
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1 invisible">
              Reset
            </label>
            <button
              onClick={() => {
                setDistrictFilter('All');
                setPsFilter('All');
                setCategoryFilter('Sewer Death');
                setFirStatus('all');
                setFromDate('');
                setToDate('');
                setInvestigationFilter('All');
              }}
              className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
        {/* Export + Reload (RE-STYLED & POSITIONED) */}
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
            Showing {filteredCases.length} of {cases.length} cases
          </div>
        </div>
      </section>

      {/* 4. KPI Cards (RE-STYLED with GRADIENTS & ICONS) */}
      

      {/* 5. Charts (RE-STYLED CONTAINERS) */}
      

      {/* 6. Tables & Side Panels (RE-STYLED) */}
      <section className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cases table (larger) */}
        <div className="lg:col-span-2 overflow-hidden">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Total Cases Report
          </h3>
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
                    District
                  </th>
                  <th
                    className={`${tableHeaderStyle} bg-gradient-to-r from-blue-500 to-blue-600`}
                  >
                    Police Station
                  </th>
                  <th
                    className={`${tableHeaderStyle} bg-gradient-to-r from-blue-500 to-blue-600`}
                  >
                    FIR No
                  </th>
                  <th
                    className={`${tableHeaderStyle} bg-gradient-to-r from-blue-500 to-blue-600`}
                  >
                    Status
                  </th>
                  <th
                    className={`${tableHeaderStyle} bg-gradient-to-r from-blue-500 to-blue-600`}
                  >
                    Charge Sheet
                  </th>
                  <th
                    className={`${tableHeaderStyle} bg-gradient-to-r from-blue-500 to-blue-600 rounded-tr-lg`}
                  >
                    Compensation
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredCases.map((c) => (
                  <React.Fragment key={c.caseId}>
                    <tr
                      className={`hover:bg-blue-50 cursor-pointer even:bg-gray-50`}
                      onClick={() =>
                        setExpandedCase(
                          expandedCase === c.caseId ? null : c.caseId,
                        )
                      }
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ')
                          setExpandedCase(
                            expandedCase === c.caseId ? null : c.caseId,
                          );
                      }}
                      aria-expanded={expandedCase === c.caseId}
                    >
                      <td className={`${tableCellStyle} w-10`}>
                        {expandedCase === c.caseId ? (
                          <ChevronDown className="h-5 w-5 text-blue-600" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        )}
                      </td>
                      <td className={tableCellStyle}>
                        <p className="text-gray-900 whitespace-no-wrap font-medium">
                          {c.caseId}
                        </p>
                      </td>
                      <td className={tableCellStyle}>
                        <p className="text-gray-900 whitespace-no-wrap">
                          {c.district}
                        </p>
                      </td>
                      <td className={tableCellStyle}>
                        <p className="text-gray-900 whitespace-no-wrap">
                          {c.policeStation}
                        </p>
                      </td>
                      <td className={tableCellStyle}>
                        <p className="text-gray-900 whitespace-no-wrap">
                          {c.firNo || '-'}
                        </p>
                      </td>
                      <td className={tableCellStyle}>
                        <StatusPill status={c.status} />
                      </td>
                      <td className={tableCellStyle}>
                        <p
                          className={`whitespace-no-wrap ${
                            c.chargeSheetFiled
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {c.chargeSheetFiled ? 'Yes' : 'No'}
                        </p>
                      </td>
                      <td className={tableCellStyle}>
                        <p className="text-gray-900 whitespace-no-wrap">
                          {c.compensationSanctioned
                            ? `₹${formatINR(c.compensationSanctioned)}`
                            : '-'}
                        </p>
                      </td>
                    </tr>
                    {/* expandable fact sheet */}
                    <tr>
                      <td colSpan={8} className="p-0">
                        <AnimatePresence>
                          {expandedCase === c.caseId && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                              aria-hidden={expandedCase !== c.caseId}
                            >
                              {/* Re-using the cleaner FactSheet component */}
                              <FactSheetDGP caseItem={c} />
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

        {/* Right column: Escalations & Compensations */}
        <aside className="space-y-6">
          <div className="overflow-hidden">
            <h4 className="text-lg font-semibold mb-3">Escalated Districts</h4>
            <div className="overflow-x-auto rounded-lg shadow-md">
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

          <div className="overflow-hidden">
            <h4 className="text-lg font-semibold mb-3">Compensation Alerts</h4>
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className={`${tableHeaderStyle} bg-gradient-to-r from-green-500 to-green-600 rounded-tl-lg`}
                    >
                      Case ID
                    </th>
                    <th
                      className={`${tableHeaderStyle} bg-gradient-to-r from-green-500 to-green-600`}
                    >
                      District
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
                    <td className={tableCellStyle}>CASE-2025-1001</td>
                    <td className={tableCellStyle}>Kolkata</td>
                    <td className={`${tableCellStyle} text-red-600 font-bold`}>
                      34
                    </td>
                  </tr>
                  <tr className="even:bg-gray-50 hover:bg-gray-100">
                    <td className={tableCellStyle}>CASE-2025-1003</td>
                    <td className={tableCellStyle}>Darjeeling</td>
                    <td className={`${tableCellStyle} text-red-600 font-bold`}>
                      45
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </aside>
      </section>

      {/* District heatmap-ish grid (RE-STYLED) */}
      <section className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">
          District Compliance Heatmap
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <HeatmapTile district="Kolkata" score={82} />
          <HeatmapTile district="Howrah" score={74} />
          <HeatmapTile district="Darjeeling" score={61} />
          <HeatmapTile district="North 24 Pgs" score={88} />
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* HELPER COMPONENTS (RE-STYLED/NEW)                                        */
/* -------------------------------------------------------------------------- */

function StatusPill({ status }: { status: CaseItem['status'] }) {
  const map: Record<string, { bg: string; text: string }> = {
    Pending: { bg: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
    Initiated: { bg: 'bg-blue-100 text-blue-800', text: 'Initiated' },
    'In Progress': { bg: 'bg-orange-100 text-orange-800', text: 'In Progress' },
    Completed: { bg: 'bg-green-100 text-green-800', text: 'Completed' },
  };
  const s = map[status] || map.Pending;
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${s.bg}`}
    >
      {s.text}
    </span>
  );
}

function formatINR(n?: number) {
  if (!n) return '0';
  return n.toLocaleString('en-IN');
}

// Cleaner, two-column Fact Sheet
function FactSheetDGP({ caseItem }: { caseItem: CaseItem }) {
  return (
    <article className="p-6 bg-gray-50 border-l-4 border-blue-600">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Fact Sheet: Case {caseItem.caseId}
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
                <strong>Date / Time:</strong> {caseItem.date} /{' '}
                {caseItem.time || 'N/A'}
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
                <strong>Workers Involved:</strong>{' '}
                {caseItem.workersInvolved || 'N/A'}
              </p>
            </div>
          </div>

          {/* C. FIR Details */}
          <div className="bg-white p-4 rounded-lg shadow border">
            <h4 className="font-semibold text-blue-700 mb-2">C. FIR Details</h4>
            <div className="space-y-1 text-sm">
              <p>
                <strong>FIR No:</strong> {caseItem.firNo || 'N/A'}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {caseItem.firStatus || (caseItem.firNo ? 'Filed' : 'Not Filed')}
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
                <strong>Days Pending:</strong> {caseItem.daysPending || 'N/A'}
              </p>
              <p>
                <strong>Charge Sheet:</strong>{' '}
                {caseItem.chargeSheetFiled ? 'Yes' : 'No'}
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
            <p className="text-sm">
              {caseItem.narrative || 'No narrative provided.'}
            </p>
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
            <h4 className="font-semibold text-blue-700 mb-2">
              F. Miscellaneous Notes
            </h4>
            <p className="text-sm">{caseItem.miscNotes || 'N/A'}</p>
            <div className="mt-2">
              <h5 className="text-xs font-semibold text-gray-600">
                Attachments:
              </h5>
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

// Polished DistrictMetricRow
function DistrictMetricRow({
  district,
  incidents,
  firs,
  pending,
  compPaid,
  score,
}: {
  district: string;
  incidents: number;
  firs: number;
  pending: number;
  compPaid: number;

  score: number;
}) {
  const getBarColor = () => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg shadow border">
      <div>
        <div className="text-sm font-medium">{district}</div>
        <div className="text-xs text-gray-500">
          Incidents: {incidents} · FIRs: {firs} · Pending: {pending}
        </div>
      </div>
      <div className="w-24 text-right">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-2 rounded-full ${getBarColor()}`}
            style={{ width: `${Math.min(score, 100)}%` }}
          />
        </div>
        <div className="text-xs text-gray-600 mt-1">{score}%</div>
      </div>
    </div>
  );
}

// Polished HeatmapTile
function HeatmapTile({ district, score }: { district: string; score: number }) {
  const bg =
    score > 80
      ? 'bg-green-100 border-green-300'
      : score > 60
      ? 'bg-yellow-100 border-yellow-300'
      : 'bg-red-100 border-red-300';
  const text =
    score > 80
      ? 'text-green-700'
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
    </div>
  );
}