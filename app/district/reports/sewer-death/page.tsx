// app/(district)/sewer-death/page.tsx
'use client';

import React, { useMemo, useState } from 'react';
import StatCard from '@/components/ui/stat-card'; // <-- use your existing stat-card.tsx (do NOT create new)
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
import { Download, RefreshCw, Filter as FilterIcon, Search } from 'lucide-react';

/**
 * District → Sewer Death Report UI (page.tsx)
 * - Reuses components/stat-card.tsx
 * - Responsive, desktop preserved (lg => 4-column KPI)
 * - Export/Reload placed UNDER filters
 * - Expandable Fact Sheet per-row with Framer Motion
 * - Colorful tables and charts (placeholder data)
 *
 * TODO: Replace SAMPLE_* arrays with API fetches.
 */

/* ---------------------- Types & placeholder data --------------------- */
type DistrictCase = {
  id: string;
  incidentId: string;
  date: string;
  location: string;
  brief: string;
  deaths?: number;
  injuries?: number;
  firNo?: string;
  firStatus?: string;
  compensationPaid?: number;
  inquiryStatus?: string;
  policeStation?: string;
  district?: string;
  attachments?: string[];
  daysPending?: number;
};

const SAMPLE_CASES: DistrictCase[] = [
  {
    id: 'D-001',
    incidentId: 'INC-2025-01',
    date: '2025-10-05',
    location: 'Ward 12 Sewage Pit',
    brief: 'Worker entered pit without PPE; collapsed.',
    deaths: 1,
    injuries: 0,
    firNo: 'FIR-1001',
    firStatus: 'Under Investigation',
    compensationPaid: 0,
    inquiryStatus: 'Initiated',
    policeStation: 'Central PS',
    district: 'District A',
    attachments: [],
    daysPending: 22,
  },
  {
    id: 'D-002',
    incidentId: 'INC-2025-02',
    date: '2025-09-10',
    location: 'Sector 8 Drain',
    brief: 'Worker slipped; severe injuries.',
    deaths: 0,
    injuries: 1,
    firNo: 'FIR-1002',
    firStatus: 'Closed',
    compensationPaid: 150000,
    inquiryStatus: 'Completed',
    policeStation: 'North PS',
    district: 'District A',
    attachments: [],
    daysPending: 0,
  },
];

const INCIDENT_PIE = [
  { name: 'Manual Scavenging Deaths', value: 6 },
  { name: 'Sewer Death', value: 4 },
  { name: 'Sewer Injuries', value: 10 },
  { name: 'Hazardous Exposure', value: 2 },
];
const PIE_COLORS = ['#4F46E5', '#06B6D4', '#8B5CF6', '#F59E0B'];

const INVESTIGATION_BY_PS = [
  { station: 'Central PS', Initiated: 2, 'In Progress': 1, Completed: 4 },
  { station: 'North PS', Initiated: 1, 'In Progress': 0, Completed: 3 },
  { station: 'East PS', Initiated: 0, 'In Progress': 2, Completed: 1 },
];

const COMP_TRACKER = [
  { month: 'Jul', sanctioned: 120000, paid: 80000, pending: 40000 },
  { month: 'Aug', sanctioned: 150000, paid: 100000, pending: 50000 },
  { month: 'Sep', sanctioned: 90000, paid: 90000, pending: 0 },
];

/* ---------------------------- Page component ------------------------- */
export default function DistrictSewerDeathPage() {
  // UI state
  const [cases] = useState<DistrictCase[]>(SAMPLE_CASES); // TODO: replace with API
  const [search, setSearch] = useState('');
  const [policeStation, setPoliceStation] = useState<string>('All');
  const [category, setCategory] = useState<string>('Sewer Death');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [investigationStatus, setInvestigationStatus] = useState<string>('All');
  const [firFilter, setFirFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Derived filtered rows
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      if (policeStation !== 'All' && c.policeStation !== policeStation) return false;
      if (category !== 'All' && c.brief && !c.brief.toLowerCase().includes(category.toLowerCase()) && category !== 'Sewer Death') {
        // keep simple: category filter mostly UI placeholder
      }
      if (investigationStatus !== 'All' && c.inquiryStatus !== investigationStatus) return false;
      if (firFilter === 'yes' && !c.firNo) return false;
      if (firFilter === 'no' && c.firNo) return false;
      if (fromDate && c.date < fromDate) return false;
      if (toDate && c.date > toDate) return false;
      if (search && !`${c.incidentId} ${c.location} ${c.policeStation} ${c.id}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [cases, policeStation, category, investigationStatus, firFilter, fromDate, toDate, search]);

  // KPI totals
  const totals = useMemo(() => {
    const total = cases.length;
    const firs = cases.filter((c) => !!c.firNo).length;
    const pendingFir = total - firs;
    const sanctioned = cases.reduce((s, c) => s + (c.compensationPaid || 0), 0); // note: placeholder: treat compensationPaid as sanctioned in this sample
    const paid = cases.reduce((s, c) => s + (c.compensationPaid || 0), 0);
    const pendingComp = sanctioned - paid;
    const completed = cases.filter((c) => c.inquiryStatus === 'Completed').length;
    const ongoing = cases.filter((c) => c.inquiryStatus && c.inquiryStatus !== 'Completed').length;
    return { total, firs, pendingFir, sanctioned, paid, pendingComp, completed, ongoing };
  }, [cases]);

  function onExport() {
    // TODO: wire real export
    alert('Export placeholder — implement CSV/PDF export');
  }
  function onReload() {
    // TODO: refetch data
    alert('Reload placeholder — implement data refresh');
  }

  return (
    <main className="min-h-screen p-6 lg:p-8 text-gray-800">
      {/* Header with gradient background */}
      <div className="mb-6 rounded-2xl shadow-sm p-6 lg:p-8 text-white bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
        <h1 className="text-2xl lg:text-3xl font-bold drop-shadow">District Dashboard</h1>
        <p className="text-sm font-semibold mt-1 drop-shadow">Comprehensive district-level monitoring and management</p>
      </div>

      {/* KPI Cards (now above charts) */}
      <section className="mb-6">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Incidents" value={totals.total} color="purple" icon={require('lucide-react').FileText} />
          <StatCard title="FIRs Filed" value={totals.firs} color="blue" icon={require('lucide-react').Shield} />
          <StatCard title="FIRs Pending" value={totals.pendingFir} color="orange" icon={require('lucide-react').AlertTriangle} />
          <StatCard title="Investigations Completed" value={totals.completed} color="green" icon={require('lucide-react').CheckCircle2} />
          <StatCard title="Investigations Ongoing" value={totals.ongoing} color="purple" icon={require('lucide-react').Clock} />
          <StatCard title="Comp. Sanctioned (₹)" value={`₹ ${formatINR(totals.sanctioned)}`} color="green" icon={require('lucide-react').DollarSign} />
          <StatCard title="Comp. Paid (₹)" value={`₹ ${formatINR(totals.paid)}`} color="blue" icon={require('lucide-react').CheckCircle2} />
          <StatCard title="Comp. Pending (₹)" value={`₹ ${formatINR(totals.pendingComp)}`} color="orange" icon={require('lucide-react').Clock} />
        </div>
      </section>

      {/* Charts (now below KPI cards) */}
      <section className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl shadow-sm p-4 sm:p-6">
          <h3 className="text-sm font-semibold mb-3">Incident Category</h3>
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={INCIDENT_PIE} innerRadius={40} outerRadius={80} paddingAngle={4} stroke="none">
                  {INCIDENT_PIE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl shadow-sm p-4 sm:p-6">
          <h3 className="text-sm font-semibold mb-3">Investigation Status by Police Station</h3>
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={INVESTIGATION_BY_PS}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="station" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="Initiated" stackId="a" fill="#60A5FA" />
                <Bar dataKey="In Progress" stackId="a" fill="#F59E0B" />
                <Bar dataKey="Completed" stackId="a" fill="#34D399" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl shadow-sm p-4 sm:p-6">
          <h3 className="text-sm font-semibold mb-3">Compensation Tracker</h3>
          <div style={{ height: 240 }}>
            <ResponsiveContainer>
              <LineChart data={COMP_TRACKER}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="sanctioned" stroke="#6366F1" strokeWidth={2} />
                <Line type="monotone" dataKey="paid" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="pending" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
      <section className="mb-4">
        <div className="rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <FilterIcon className="w-5 h-5 text-gray-600" />
            <div className="text-sm font-medium">Filters</div>
          </div>

          <div className="w-full flex flex-col lg:flex-row gap-3 items-start lg:items-center">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 w-full">
              <select value={policeStation} onChange={(e) => setPoliceStation(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200">
                <option>All</option>
                <option>Central PS</option>
                <option>North PS</option>
                <option>East PS</option>
              </select>

              <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200">
                <option>All</option>
                <option>Sewer Death</option>
                <option>Sewer Injury</option>
                <option>Manual Scavenging Death</option>
                <option>Hazardous Exposure</option>
              </select>

              <select value={investigationStatus} onChange={(e) => setInvestigationStatus(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200">
                <option value="All">Investigation: All</option>
                <option value="Initiated">Initiated</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <select value={firFilter} onChange={(e) => setFirFilter(e.target.value as 'all'|'yes'|'no')} className="px-3 py-2 rounded-lg border border-gray-200">
                <option value="all">FIR: All</option>
                <option value="yes">FIR: Yes</option>
                <option value="no">FIR: No</option>
              </select>

              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200" />
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200" />
            </div>

            <div className="flex items-center gap-3 ml-auto w-full lg:w-auto">
              <div className="relative w-full lg:w-64">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Incident ID / Case / FIR / Location..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 pl-10"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
              <button onClick={() => { setPoliceStation('All'); setCategory('Sewer Death'); setInvestigationStatus('All'); setFirFilter('all'); setFromDate(''); setToDate(''); setSearch(''); }} className="px-3 py-2 rounded-lg bg-white border border-gray-200">Reset</button>
            </div>
          </div>

          {/* Export + Reload under filters */}
          <div className="flex items-center gap-3 mt-2">
            <button onClick={onExport} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-sm hover:bg-indigo-700">
              <Download className="w-4 h-4" /> Export
            </button>
            <button onClick={onReload} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50">
              <RefreshCw className="w-4 h-4" /> Reload
            </button>
            <div className="ml-auto text-sm text-gray-600">Showing {filteredCases.length} of {cases.length} cases</div>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      

      {/* Charts */}
      

      {/* Tables & RHS */}
      <section className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main table */}
        <div className="lg:col-span-2 rounded-2xl shadow-sm p-4 sm:p-6 overflow-auto">
          <h3 className="text-lg font-semibold mb-4">Total Cases Report — District</h3>
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Sl. No</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Incident ID</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Location</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Brief Particulars</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Deaths</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Injuries</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">FIR No</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">FIR Status</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Comp. Paid</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">Inquiry Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredCases.map((c, idx) => (
                  <React.Fragment key={c.id}>
                    <tr
                      className={`cursor-pointer hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpandedId(expandedId === c.id ? null : c.id); }}
                      aria-expanded={expandedId === c.id}
                    >
                      <td className="px-4 py-3 text-sm">{idx + 1}</td>
                      <td className="px-4 py-3 text-sm font-medium">{c.incidentId}</td>
                      <td className="px-4 py-3 text-sm">{c.date}</td>
                      <td className="px-4 py-3 text-sm">{c.location}</td>
                      <td className="px-4 py-3 text-sm">{truncate(c.brief, 60)}</td>
                      <td className="px-4 py-3 text-sm">{c.deaths ?? 0}</td>
                      <td className="px-4 py-3 text-sm">{c.injuries ?? 0}</td>
                      <td className="px-4 py-3 text-sm">{c.firNo || '-'}</td>
                      <td className="px-4 py-3 text-sm">{c.firStatus || '-'}</td>
                      <td className="px-4 py-3 text-sm">{c.compensationPaid ? `₹ ${formatINR(c.compensationPaid)}` : '-'}</td>
                      <td className="px-4 py-3 text-sm">{c.inquiryStatus || '-'}</td>
                    </tr>

                    {/* Expandable fact sheet */}
                    <tr>
                      <td colSpan={11} className="p-0">
                        <AnimatePresence>
                          {expandedId === c.id && (
                            <motion.td initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }} className="px-4 py-4 bg-gray-50">
                              <FactSheet caseItem={c} />
                            </motion.td>
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

        {/* Right column */}
        <aside className="space-y-6">
          <div className="rounded-2xl shadow-sm p-4 sm:p-6">
            <h4 className="text-lg font-semibold mb-3">Pending Cases</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm">Cases pending &gt; 30 days</div>
                <div className="text-sm font-medium text-rose-600">2</div>
              </div>
              <div className="text-xs text-gray-500">Click a row to view Fact Sheet and actions</div>
            </div>
          </div>

          <div className="rounded-2xl shadow-sm p-4 sm:p-6">
            <h4 className="text-lg font-semibold mb-3">Escalations</h4>
            <table className="w-full">
              <thead className="bg-gradient-to-r from-rose-50 to-rose-100">
                <tr>
                  <th className="px-3 py-2 text-left text-sm font-semibold">District</th>
                  <th className="px-3 py-2 text-left text-sm font-semibold">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50"><td className="px-3 py-2 text-sm">District A</td><td className="px-3 py-2 text-sm">Pending Comp &gt; 60 days</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-3 py-2 text-sm">District B</td><td className="px-3 py-2 text-sm">FIR pending &gt; 30 days</td></tr>
              </tbody>
            </table>
          </div>

        
        </aside>
      </section>

      {/* District Performance Tiles */}
      <section className="mb-8 rounded-2xl shadow-sm p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">Police Station Performance</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <PerfTile name="Central PS" score={82} incidents={18} />
          <PerfTile name="North PS" score={74} incidents={12} />
          <PerfTile name="East PS" score={61} incidents={7} />
          <PerfTile name="South PS" score={88} incidents={22} />
        </div>
      </section>
    </main>
  );
}

/* --------------------------- Small helper components ------------------------ */

function FactSheet({ caseItem }: { caseItem: DistrictCase }) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h4 className="text-sm font-semibold">Basic Details</h4>
          <dl className="mt-2 text-sm">
            <div className="flex justify-between py-1"><dt className="text-gray-600">Incident ID</dt><dd className="font-medium">{caseItem.incidentId}</dd></div>
            <div className="flex justify-between py-1"><dt className="text-gray-600">Date</dt><dd className="font-medium">{caseItem.date}</dd></div>
            <div className="flex justify-between py-1"><dt className="text-gray-600">Location</dt><dd className="font-medium">{caseItem.location}</dd></div>
            <div className="flex justify-between py-1"><dt className="text-gray-600">Police Station</dt><dd className="font-medium">{caseItem.policeStation}</dd></div>
          </dl>
        </div>

        <div>
          <h4 className="text-sm font-semibold">FIR & Compensation</h4>
          <dl className="mt-2 text-sm">
            <div className="flex justify-between py-1"><dt className="text-gray-600">FIR No</dt><dd className="font-medium">{caseItem.firNo || '-'}</dd></div>
            <div className="flex justify-between py-1"><dt className="text-gray-600">FIR Status</dt><dd className="font-medium">{caseItem.firStatus || '-'}</dd></div>
            <div className="flex justify-between py-1"><dt className="text-gray-600">Compensation Paid</dt><dd className="font-medium">{caseItem.compensationPaid ? `₹ ${formatINR(caseItem.compensationPaid)}` : '-'}</dd></div>
            <div className="flex justify-between py-1"><dt className="text-gray-600">Days Pending</dt><dd className="font-medium">{caseItem.daysPending ?? '-'}</dd></div>
          </dl>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Narrative & Attachments</h4>
          <div className="mt-2 text-sm text-gray-700">
            <div className="text-xs text-gray-600">Narrative</div>
            <div className="font-medium mt-1">{caseItem.brief || '-'}</div>

            <div className="text-xs text-gray-600 mt-3">Attachments</div>
            <div className="mt-1">
              {caseItem.attachments && caseItem.attachments.length ? (
                <ul className="list-disc ml-5">{caseItem.attachments.map((a) => <li key={a}><a className="text-indigo-600 underline" href={a}>{a}</a></li>)}</ul>
              ) : (
                <div className="text-sm text-gray-500">No attachments</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t pt-3 flex gap-3">
        <button className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm">Add Investigation Update</button>
        <button className="px-3 py-2 rounded-lg bg-white border text-sm">Submit Grievance Response</button>
        <button className="px-3 py-2 rounded-lg bg-amber-100 text-amber-800 text-sm">Escalate</button>
        <div className="ml-auto text-sm text-gray-500">Last update: {caseItem.date}</div>
      </div>
    </article>
  );
}

function PerfTile({ name, score, incidents }: { name: string; score: number; incidents: number }) {
  const bg = score > 80 ? 'bg-emerald-50' : score > 60 ? 'bg-yellow-50' : 'bg-rose-50';
  return (
    <div className={`${bg} rounded-lg p-3 flex flex-col gap-2`}>
      <div className="text-sm font-semibold">{name}</div>
      <div className="text-2xl font-bold">{score}%</div>
      <div className="text-xs text-gray-600">Compliance</div>
      <div className="text-xs text-gray-500">Incidents: {incidents}</div>
    </div>
  );
}

/* ----------------------------- utils ---------------------------------- */
function formatINR(n?: number) {
  if (!n) return '0';
  return n.toLocaleString('en-IN');
}
function truncate(s?: string, n = 60) {
  if (!s) return '-';
  return s.length <= n ? s : s.slice(0, n - 1) + '…';
}
