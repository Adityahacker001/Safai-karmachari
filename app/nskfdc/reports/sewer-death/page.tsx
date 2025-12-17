 // app/(nskfdc)/sewer-death/page.tsx
'use client';

import React, { useMemo, useState, useCallback } from 'react';
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
  Eye,
  ChevronRight,
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
import IntegratedLoader from '@/components/layout/IntegratedLoader';

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
  workersInvolved?: string[]; // names or ids
  deaths?: number;
  injuries?: number;
  firNo?: string;
  firStatus?: string;
  compensationSanctioned?: number;
  compensationPaid?: number;
  compensationPaidDate?: string;
  inquiryStatus?: string;
  narrative?: string;
  attachments?: string[];
  daysPending?: number;
  sections?: string;
  workersInvolvedCount?: number;
  notes?: string;
};

const SAMPLE_CASES: CaseItem[] = [
  {
    caseId: 'NSK-001',
    incidentId: 'INC-1001',
    district: 'Kolkata',
    policeStation: 'Central PS',
    category: 'Sewer Death',
    date: '2025-10-10',
    time: '09:30',
    workersInvolved: ['Ramesh'],
    workersInvolvedCount: 1,
    deaths: 1,
    injuries: 0,
    firNo: 'FIR-909',
    firStatus: 'Under Investigation',
    sections: '304A IPC',
    compensationSanctioned: 500000,
    compensationPaid: 0,
    compensationPaidDate: '',
    inquiryStatus: 'Initiated',
    narrative: 'Worker entered septic pit without permit; no PPE available.',
    attachments: ['photo.jpg'],
    daysPending: 28,
    notes: 'No supervisor present at time of incident.',
  },
  {
    caseId: 'NSK-002',
    incidentId: 'INC-1002',
    district: 'Howrah',
    policeStation: 'North PS',
    category: 'Sewer Injury',
    date: '2025-09-20',
    time: '14:10',
    workersInvolved: ['Sita'],
    workersInvolvedCount: 1,
    deaths: 0,
    injuries: 1,
    firNo: 'FIR-910',
    firStatus: 'Closed',
    sections: '338 IPC',
    compensationSanctioned: 150000,
    compensationPaid: 150000,
    compensationPaidDate: '2025-10-05',
    inquiryStatus: 'Completed',
    narrative: 'Worker injured while clearing obstruction, treated and compensated.',
    attachments: [],
    daysPending: 0,
    notes: 'Victim received immediate medical attention and compensation.',
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
  const [selectedIncident, setSelectedIncident] = useState<CaseItem | null>(null);
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // Derived state must be declared before any early returns that would skip hooks.
  // Move derived hooks here so hook order is consistent across renders.
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

  const handleDownload = useCallback((inc: CaseItem | null) => {
    if (!inc) return;
    try {
      const payload = {
        exportedAt: new Date().toISOString(),
        source: 'NSKFDC Sewer Death - Total Incident Report',
        incident: inc,
      };
      const json = JSON.stringify(payload, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const filenameBase = inc.incidentId || inc.caseId || 'incident';
      const safeDate = (inc.date || '').replace(/[:\s]/g, '-') || new Date().toISOString().slice(0,10);
      const filename = `${filenameBase}-${safeDate}.json`;
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err) {
      console.error('Download failed', err);
      alert('Download failed — check console for details.');
    }
  }, []);

  if (loading) return <IntegratedLoader />;

  // YOUR EXISTING FUNCTIONS (UNCHANGED)
  function exportCSV() {
    alert('Export (placeholder) — implement export logic');
  }
  function reloadData() {
    alert('Reload (placeholder) — implement API refresh');
  }

  // Create a printable window containing only the incident details and trigger print (Save as PDF)
  function downloadIncidentPDF(inc: CaseItem | null) {
    if (!inc) return;
    const win = window.open('', '_blank', 'width=900,height=700');
    if (!win) {
      alert('Popup blocked. Please allow popups for this site to download PDF.');
      return;
    }

    const html = `
      <html>
        <head>
          <title>Incident ${inc.incidentId || inc.caseId}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body{font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111; padding:24px}
            h1{font-size:20px; margin-bottom:6px}
            .section{border:1px solid #e6e6e6;padding:12px;margin-bottom:12px;border-radius:6px}
            .k{font-weight:600;color:#333;width:220px;display:inline-block}
            .v{color:#111}
            .grid{display:flex;flex-wrap:wrap}
            .col{flex:1 1 50%;min-width:240px;padding:6px 12px}
            .small{font-size:12px;color:#666}
          </style>
        </head>
        <body>
          <h1>Incident Details — ${inc.incidentId || inc.caseId}</h1>
          <div class="small">Generated: ${new Date().toLocaleString()}</div>

          <div class="section">
            <div style="font-weight:700;margin-bottom:8px">Basic Details</div>
            <div class="grid">
              <div class="col"><span class="k">Incident ID:</span><span class="v">${inc.incidentId}</span></div>
              <div class="col"><span class="k">Case ID:</span><span class="v">${inc.caseId}</span></div>
              <div class="col"><span class="k">Date / Time:</span><span class="v">${inc.date}${inc.time ? ' ' + inc.time : ''}</span></div>
              <div class="col"><span class="k">District:</span><span class="v">${inc.district}</span></div>
              <div class="col"><span class="k">Police Station:</span><span class="v">${inc.policeStation}</span></div>
              <div class="col"><span class="k">Category:</span><span class="v">${inc.category}</span></div>
            </div>
          </div>

          <div class="section">
            <div style="font-weight:700;margin-bottom:8px">Narrative</div>
            <div class="v">${(inc.narrative || 'N/A').replace(/\n/g, '<br/>')}</div>
          </div>

          <div class="section">
            <div style="font-weight:700;margin-bottom:8px">FIR & Inquiry</div>
            <div class="grid">
              <div class="col"><span class="k">FIR No:</span><span class="v">${inc.firNo || 'N/A'}</span></div>
              <div class="col"><span class="k">FIR Status:</span><span class="v">${inc.firStatus || 'N/A'}</span></div>
              <div class="col"><span class="k">Inquiry Status:</span><span class="v">${inc.inquiryStatus || 'N/A'}</span></div>
              <div class="col"><span class="k">Days Pending:</span><span class="v">${inc.daysPending ?? 'N/A'}</span></div>
            </div>
          </div>

          <div class="section">
            <div style="font-weight:700;margin-bottom:8px">Compensation</div>
            <div class="grid">
              <div class="col"><span class="k">Sanctioned:</span><span class="v">${inc.compensationSanctioned ? '₹' + formatINR(inc.compensationSanctioned) : 'N/A'}</span></div>
              <div class="col"><span class="k">Paid:</span><span class="v">${inc.compensationPaid ? '₹' + formatINR(inc.compensationPaid) : '₹0'}</span></div>
              <div class="col"><span class="k">Date Paid:</span><span class="v">${inc.compensationPaidDate || 'N/A'}</span></div>
            </div>
          </div>

          <div class="section">
            <div style="font-weight:700;margin-bottom:8px">Counts</div>
            <div class="grid">
              <div class="col"><span class="k">Deaths:</span><span class="v">${inc.deaths ?? 0}</span></div>
              <div class="col"><span class="k">Injuries:</span><span class="v">${inc.injuries ?? 0}</span></div>
              <div class="col"><span class="k">Workers Involved:</span><span class="v">${(inc.workersInvolved || []).join(', ') || 'N/A'}</span></div>
            </div>
          </div>

          <div class="small">This report contains only the details for the selected incident.</div>
        </body>
      </html>
    `;

    win.document.write(html);
    win.document.close();
    // Give browser a moment to render then trigger print
    setTimeout(() => {
      try {
        win.focus();
        win.print();
        // Optionally close the tab after print
        // win.close();
      } catch (e) {
        console.error('Print failed', e);
      }
    }, 500);
  }

  // handleDownload is defined above to keep hook order stable
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
      

      {/* 6. Main Table (full-width) + Widgets moved below */}
      <section className="mb-8 grid grid-cols-1 gap-6">
        {/* Table (full-width) */}
        <div className="overflow-hidden">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Total Incident Report</h3>
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full leading-normal">
              <thead className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-t-lg">
                <tr>
                  <th className={`${tableHeaderStyle} rounded-tl-lg w-10`}>Sl. No.</th>
                  <th className={tableHeaderStyle}>Incident ID</th>
                  <th className={tableHeaderStyle}>Date</th>
                  <th className={tableHeaderStyle}>Location</th>
                  <th className={tableHeaderStyle}>Brief Particulars</th>
                  <th className={tableHeaderStyle}>Deaths</th>
                  <th className={tableHeaderStyle}>Injuries</th>
                  <th className={tableHeaderStyle}>FIR No</th>
                  <th className={tableHeaderStyle}>FIR Status</th>
                  <th className={tableHeaderStyle}>Compensation Paid</th>
                  <th className={tableHeaderStyle}>Inquiry Status</th>
                  <th className={`${tableHeaderStyle} rounded-tr-lg`}>Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filtered.map((c, index) => (
                  <tr key={c.caseId} className="even:bg-gray-50 hover:bg-emerald-50 transition-colors">
                    <td className={tableCellStyle}>
                      <p className="font-medium text-gray-900">{index + 1}</p>
                    </td>
                    <td className={tableCellStyle}>
                      <p className="font-medium text-gray-900">{c.incidentId}</p>
                    </td>
                    <td className={tableCellStyle}>{c.date}</td>
                    <td className={tableCellStyle}>{c.policeStation || c.district}</td>
                    <td className={tableCellStyle}>
                      <p className="text-sm text-gray-700">{truncate(c.narrative, 80)}</p>
                    </td>
                    <td className={tableCellStyle}>
                      <p className="text-red-600 font-bold">{c.deaths ?? 0}</p>
                    </td>
                    <td className={tableCellStyle}>
                      <p className="text-gray-900">{c.injuries ?? 0}</p>
                    </td>
                    <td className={tableCellStyle}>{c.firNo || '-'}</td>
                    <td className={tableCellStyle}>{c.firStatus || 'N/A'}</td>
                    <td className={tableCellStyle}>{c.compensationPaid ? `₹${formatINR(c.compensationPaid)}` : '₹0'}</td>
                    <td className={tableCellStyle}>{c.inquiryStatus || 'N/A'}</td>
                    <td className={tableCellStyle}>
                      <button
                        className="p-2 rounded-full hover:bg-gray-100"
                        aria-label={`View ${c.incidentId}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedIncident(c);
                        }}
                      >
                        <Eye className="h-5 w-5 text-emerald-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal details: show incident details in centered overlay when eye icon is clicked */}
          <AnimatePresence>
            {selectedIncident && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="fixed inset-0 z-50 flex items-center justify-center"
              >
                <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setSelectedIncident(null)}
                />

                <motion.div
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.98, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="relative w-full max-w-3xl mx-4 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 z-50"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold">Incident Details - {selectedIncident.incidentId}</h3>
                    <button
                      onClick={() => setSelectedIncident(null)}
                      aria-label="Close details"
                      className="text-gray-500 hover:text-gray-900 text-sm"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {/* Basic Details (left column) */}
                    <div className="bg-emerald-50 p-4 rounded border border-emerald-100 shadow-sm">
                      <h4 className="text-sm font-semibold text-emerald-900 mb-3">1. Basic Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Incident ID</div>
                          <div className="text-gray-900 font-medium">{selectedIncident.incidentId}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Date</div>
                          <div className="text-gray-900">{selectedIncident.date}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Time</div>
                          <div className="text-gray-900">{selectedIncident.time || 'N/A'}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Location</div>
                          <div className="text-gray-900">{selectedIncident.policeStation || '-'}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">District</div>
                          <div className="text-gray-900">{selectedIncident.district}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Category</div>
                          <div className="text-gray-900">{selectedIncident.category}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Deaths</div>
                          <div className="text-red-600 font-semibold">{selectedIncident.deaths ?? 0}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Injuries</div>
                          <div className="text-gray-900">{selectedIncident.injuries ?? 0}</div>
                        </div>
                      </div>
                    </div>

                    {/* Narrative (spans right column full width) */}
                    <div className="md:col-span-1 bg-sky-50 p-4 rounded border border-sky-100 shadow-sm">
                      <h4 className="text-sm font-semibold text-sky-900 mb-2">2. Narrative Summary</h4>
                      <p className="text-gray-700 leading-relaxed min-h-[6rem]">{selectedIncident.narrative || 'No narrative available.'}</p>
                    </div>

                    {/* FIR Details (highlighted) */}
                    <div className="bg-red-50 p-4 rounded border border-red-200 shadow-sm">
                      <h4 className="text-sm font-semibold text-red-700 mb-2">3. FIR Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Police Station</div>
                          <div className="text-red-700 font-semibold">{selectedIncident.policeStation || 'N/A'}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Status</div>
                          <div className={`text-sm font-semibold ${selectedIncident.firStatus === 'Under Investigation' ? 'text-red-700' : 'text-red-600'}`}>{selectedIncident.firStatus || 'N/A'}</div>
                        </div>
                        {selectedIncident.firNo && (
                          <div className="flex items-center justify-between">
                            <div className="text-gray-600">FIR No</div>
                            <div className="inline-flex items-center">
                              <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-medium">{selectedIncident.firNo}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Compensation Details */}
                    <div className="bg-green-50 p-4 rounded border border-green-100 shadow-sm">
                      <h4 className="text-sm font-semibold text-green-800 mb-2">4. Compensation Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Amount Sanctioned</div>
                          <div className="text-gray-900">{selectedIncident.compensationSanctioned ? `₹${formatINR(selectedIncident.compensationSanctioned)}` : 'Not Sanctioned'}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Paid</div>
                          <div className="text-gray-900">{selectedIncident.compensationPaid ? 'Yes' : 'No'}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Date Paid</div>
                          <div className="text-gray-900">{selectedIncident.compensationPaidDate || 'N/A'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Inquiry Status */}
                    <div className="bg-amber-50 p-4 rounded border border-amber-100 shadow-sm">
                      <h4 className="text-sm font-semibold text-amber-900 mb-2">5. Inquiry Status</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Inquiry Status</div>
                          <div className="text-gray-900">{selectedIncident.inquiryStatus || 'N/A'}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-600">Days Pending</div>
                          <div className="text-gray-900">{selectedIncident.daysPending ?? 'N/A'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Misc Notes (span full width) */}
                    <div className="md:col-span-2 bg-slate-50 p-4 rounded border border-slate-100 shadow-sm">
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">6. Miscellaneous Notes</h4>
                      <p className="text-gray-700">{selectedIncident.notes || 'No additional notes.'}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button onClick={() => setSelectedIncident(null)} className="px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">Close</button>
                    <button
                      onClick={() => downloadIncidentPDF(selectedIncident)}
                      className="px-4 py-2 rounded-md bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                    >
                      Download
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Widgets moved below the table: Escalated Districts and Top Worker Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col min-h-64">
            <h4 className="text-lg font-semibold mb-3">Escalated Districts</h4>
            <div className="flex-1 overflow-hidden">
              <div className="overflow-x-auto h-full">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className={`${tableHeaderStyle} bg-gradient-to-r from-red-400 to-red-500 rounded-tl-lg`}>District</th>
                      <th className={`${tableHeaderStyle} bg-gradient-to-r from-red-400 to-red-500`}>Reason</th>
                      <th className={`${tableHeaderStyle} bg-gradient-to-r from-red-400 to-red-500 rounded-tr-lg`}>Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="hover:bg-gray-100">
                      <td className={tableCellStyle}>Darjeeling</td>
                      <td className={tableCellStyle}>Pending Comp. {'>'}60 days</td>
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
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 h-full flex flex-col min-h-64">
            <div className="mb-3 rounded-md bg-emerald-50 p-3">
              <h4 className="text-lg font-semibold text-emerald-900">Top Worker Impact</h4>
            </div>
            <div className="flex-1 flex flex-col gap-3 justify-start">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium">Ramesh (NSK-001)</div>
                <div className="text-sm text-gray-700 font-medium">₹5,00,000</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium">Sita (NSK-002)</div>
                <div className="text-sm text-gray-700 font-medium">₹1,50,000</div>
              </div>
            </div>
          </div>
        </div>
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
                <strong>FIR No:</strong>{' '}
                <span className="text-red-700 font-semibold">{caseItem.firNo || 'N/A'}</span>
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`font-semibold ${caseItem.firStatus === 'Under Investigation' ? 'text-red-700' : 'text-gray-900'}`}>{caseItem.firStatus || 'N/A'}</span>
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