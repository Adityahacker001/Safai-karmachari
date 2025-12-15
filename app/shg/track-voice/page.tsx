// This is your page.tsx file
// Ensure you have React, TailwindCSS, recharts, and lucide-react installed:
// npm install recharts lucide-react

'use client'; // For Next.js App Router

import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from 'recharts';
import {
  LayoutDashboard, ChevronRight as ChevronRightIcon, Search, FileDown, Filter, X, Calendar,
  ChevronDown, ChevronUp, CheckCircle, Hourglass, AlertTriangle, ChevronLeft, Info,
  Eye, Printer, Clock, History, ArrowUpCircle
} from 'lucide-react';
import { CheckCheck } from 'lucide-react';
import { Button as GradientButton } from '@/components/ui/button';
import { Select as FormSelect } from '@/components/ui/select';
import { Input as FormInput } from '@/components/ui/input';
import StatCard from '@/components/ui/stat-card';
import IntegratedLoader from "@/components/layout/IntegratedLoader";

// --- Mock Data ---
const MOCK_SUBMISSIONS = [
  { id: 1, ticketId: 'GRV-2025-098', category: 'Complaint', subCategory: 'Fund Delay', description: 'Delay in fund disbursement for scheme X. Submitted proofs on time.', dateSub: '2025-10-15', status: 'Resolved', lastUpdate: '2025-10-25', remarks: 'Funds released after verification.', attachments: ['proof.pdf','image.jpg'] },
  { id: 2, ticketId: 'FDBK-2025-011', category: 'Feedback', subCategory: 'Process Improvement', description: 'The online portal timed out during document upload.', dateSub: '2025-10-18', status: 'Under Review', lastUpdate: '2025-10-20', remarks: 'IT team investigating session timeout issue.' },
  { id: 3, ticketId: 'SUG-2025-034', category: 'Suggestion', subCategory: 'New Training', description: 'Request for training on digital marketing for SHGs.', dateSub: '2025-10-22', status: 'Pending', lastUpdate: '2025-10-22', remarks: 'Acknowledged. Forwarded to Training Dept.' },
  { id: 4, ticketId: 'GRV-2025-101', category: 'Complaint', subCategory: 'Harassment', description: 'Issue reported with local official interaction during site visit.', dateSub: '2025-09-05', status: 'Escalated', lastUpdate: '2025-10-10', remarks: 'Escalated to NSKC due to severity.' },
  { id: 5, ticketId: 'FDBK-2025-012', category: 'Appreciation', subCategory: 'Staff Support', description: 'District Coordinator Mr. Sharma was very helpful.', dateSub: '2025-10-26', status: 'Resolved', lastUpdate: '2025-10-26', remarks: 'Feedback noted and shared.' },
];

const mockTypes = ['All', 'Complaint', 'Feedback', 'Suggestion'];
const mockStatusOptions = ['All', 'Pending', 'Under Review', 'Resolved', 'Escalated'];

// --- Reusable Components ---
const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200/50 p-6 ${className}`}>
    {children}
  </div>
);

type Status = 'Pending' | 'Under Review' | 'Resolved' | 'Escalated';
const SubmissionStatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const config = {
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
    'Under Review': { bg: 'bg-indigo-100', text: 'text-indigo-700', icon: Search },
    Resolved: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
    Escalated: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle },
  }[status];
  return ( <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${config.bg} ${config.text}`}><config.icon className="w-3.5 h-3.5" /> {status}</span> );
};

const SortableHeader: React.FC<{ colKey: string; title: string; sortConfig: { key: string; direction: 'asc' | 'desc' } | null; requestSort: (key: string) => void; className?: string; }> = ({ colKey, title, sortConfig, requestSort, className = '' }) => {
  const getSortIcon = () => { if (!sortConfig || sortConfig.key !== colKey) return <ChevronDown className="w-4 h-4 opacity-30" />; return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />; };
  return ( <th className={`px-4 py-3 text-left cursor-pointer transition-colors hover:bg-indigo-200 ${className}`} onClick={() => requestSort(colKey)}> <div className="flex items-center gap-1">{title}{getSortIcon()}</div> </th> );
};

// --- Details Modal (centered, glassmorphic, inner-scroll) ---
const DetailsDrawer: React.FC<{ item: any | null; isOpen: boolean; onClose: () => void; }> = ({ item, isOpen, onClose }) => {
  // compute days old and escalate eligibility
  const daysPending = item ? Math.ceil((new Date().getTime() - new Date(item.dateSub).getTime()) / (1000 * 3600 * 24)) : 0;
  const canEscalate = (item?.status === 'Pending' || item?.status === 'Under Review') && daysPending > 15;

  // mock supplemental details (in real app fetch from API)
  const submitterDetails = item ? {
    name: 'John Doe',
    shgName: 'Green Earth SHG',
    shgId: 'SHG12345',
    mobile: '9876543210',
    location: 'District A, Block B, State C',
  } : null;

  const routingDetails = item ? {
    current: 'District Coordinator',
    forwardedTo: 'State Office',
    previous: 'Block Office',
    sla: '2025-12-15',
  } : null;

  const actionLogs = item ? [
    { date: '2025-11-20', performedBy: 'Block Officer', summary: 'Reviewed and forwarded to District.' },
    { date: '2025-11-25', performedBy: 'District Coordinator', summary: 'Under review.' },
  ] : [];

  if (typeof document === 'undefined') return null;
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 w-screen h-screen z-[999999] bg-black/50 backdrop-blur-[16px] backdrop-saturate-150 flex items-center justify-center overflow-y-auto p-6"
      style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}
    >
      <div
        className="
          bg-white/80 backdrop-blur-xl 
          border border-slate-200/60 
          rounded-2xl shadow-2xl 
          w-full max-w-3xl p-8 
          relative
        "
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-700">
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto max-h-[80vh] space-y-4 overflow-x-hidden">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Info className="w-6 h-6 text-indigo-600" /> Submission Details
          </h2>

          {item && (
            <div>
              <h3 className="text-lg font-bold text-indigo-700">{item.ticketId}</h3>

              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{daysPending} Days Old</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.category === 'Complaint' ? 'bg-red-100 text-red-700' : item.category === 'Feedback' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{item.category}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                <DetailItem label="Category" value={item.category} />
                <DetailItem label="Sub-Category" value={item.subCategory || 'N/A'} />
                <DetailItem label="Date Submitted" value={new Date(item.dateSub).toLocaleDateString('en-GB')} />
                <DetailItem label="Current Status" value={<SubmissionStatusBadge status={item.status as Status} />} />
              </div>

              <DetailItem label="Description" value={item.description} isBlock />
              <DetailItem label="Last Action Taken / Remarks" value={item.actionTaken || item.remarks || 'No action recorded yet.'} isBlock />

              {/* Submitter Details */}
              {submitterDetails && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg mt-2">
                  <h3 className="text-md font-semibold text-slate-700">Submitter Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                    <DetailItem label="Submitted By" value={submitterDetails.name} />
                    <DetailItem label="SHG Name" value={submitterDetails.shgName} />
                    <DetailItem label="SHG ID" value={submitterDetails.shgId} />
                    <DetailItem label="Mobile Number" value={submitterDetails.mobile} />
                    <DetailItem label="Location" value={submitterDetails.location} isBlock />
                  </div>
                </div>
              )}

              {/* Routing Details */}
              {routingDetails && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg mt-3">
                  <h3 className="text-md font-semibold text-slate-700">Routing / Department Flow</h3>
                  <DetailItem label="Currently With" value={routingDetails.current} />
                  <DetailItem label="Forwarded To" value={routingDetails.forwardedTo} />
                  <DetailItem label="Previous Level" value={routingDetails.previous} />
                  <DetailItem label="SLA / Expected Resolution" value={routingDetails.sla} />
                </div>
              )}

              {/* Attachments */}
              <div className="mt-3">
                <h3 className="text-md font-semibold text-slate-700">Attachments</h3>
                {item.attachments?.length ? (
                  <div className="space-y-2 mt-2">
                    {item.attachments.map((file: string, idx: number) => (
                      <div key={idx} className="flex justify-between items-center text-sm bg-slate-50 p-2 rounded border border-slate-200">
                        <span>{file}</span>
                        <button className="text-indigo-600 hover:underline">View</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 mt-2">No supporting documents uploaded.</p>
                )}
              </div>

              {/* Action History */}
              <div className="mt-3">
                <h3 className="text-md font-semibold text-slate-700">Action History</h3>
                <div className="space-y-2 mt-2">
                  {actionLogs.map((log, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-xs text-slate-500">{log.date}</p>
                      <p className="text-sm font-medium text-slate-700">{log.performedBy}</p>
                      <p className="text-sm text-slate-600">{log.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Escalation block */}
              {item.status === 'Escalated' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mt-3">
                  <h3 className="text-md font-semibold text-red-700">Escalation Details</h3>
                  <DetailItem label="Escalation Level" value="Level 1" />
                  <DetailItem label="Escalated To" value="State Officer" />
                  <DetailItem label="Escalated On" value="2025-11-30" />
                </div>
              )}

              <h4 className="text-md font-semibold text-slate-700 pt-3 border-t border-slate-200">Timeline</h4>
              <div className="mt-2 pl-5 border-l-2 border-indigo-200 relative w-full max-w-full overflow-x-hidden space-y-4">
                <div className="relative"><span className="absolute -left-[27px] top-0.5 w-4 h-4 bg-indigo-500 rounded-full border-4 border-white ring-1 ring-indigo-200"></span><p className="text-xs font-semibold text-indigo-700">Submitted</p><p className="text-xs text-slate-500">{new Date(item.dateSub).toLocaleString('en-GB')}</p></div>
                {item.status !== 'Pending' && <div className="relative"><span className="absolute -left-[27px] top-0.5 w-4 h-4 bg-blue-500 rounded-full border-4 border-white ring-1 ring-blue-200"></span><p className="text-xs font-semibold text-blue-700">Reviewed / Action Taken</p><p className="text-xs text-slate-500">{new Date(item.lastUpdate).toLocaleString('en-GB')}</p></div>}
                {item.status === 'Resolved' && <div className="relative"><span className="absolute -left-[27px] top-0.5 w-4 h-4 bg-green-500 rounded-full border-4 border-white ring-1 ring-green-200"></span><p className="text-xs font-semibold text-green-700">Resolved</p><p className="text-xs text-slate-500">{new Date(item.lastUpdate).toLocaleString('en-GB')}</p></div>}
                {item.status === 'Escalated' && <div className="relative"><span className="absolute -left-[27px] top-0.5 w-4 h-4 bg-red-500 rounded-full border-4 border-white ring-1 ring-red-200"></span><p className="text-xs font-semibold text-red-700">Escalated</p><p className="text-xs text-slate-500">{new Date(item.lastUpdate).toLocaleString('en-GB')}</p></div>}
              </div>
            </div>
          )}

          {/* Footer actions inside modal */}
          <div className="flex flex-col sm:flex-row justify-between items-center p-0 gap-3">
            {canEscalate && (
              <button className="flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-md transition-all hover:scale-[1.03]">
                <ArrowUpCircle className="w-4 h-4" /> Escalate Issue
              </button>
            )}

            <div className={`flex gap-3 ${canEscalate ? 'w-full sm:w-auto justify-end' : 'w-full justify-end'}`}>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.03]"><Printer className="w-3.5 h-3.5" /> Print</button>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.03]"><FileDown className="w-3.5 h-3.5" /> PDF</button>
              <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.03] shadow-md"><X className="w-4 h-4" /> Close</button>
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
};

const DetailItem: React.FC<{ label: string; value: React.ReactNode; className?: string; isBlock?: boolean }> = ({ label, value, className = '', isBlock = false }) => (
  <div className={`${className} ${isBlock ? 'col-span-full' : ''}`}>
    <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
    <p className={`font-medium text-slate-800 ${isBlock ? 'bg-slate-50 p-3 rounded-md border border-slate-200 whitespace-pre-wrap' : ''}`}>{value}</p>
  </div>
);

// --- Main Page Component ---
const TrackMyVoicePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: 'All', status: 'All', dateFrom: '', dateTo: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, []);

  const handleFilterChange = (name: string, value: string) => { setFilters((prev) => ({ ...prev, [name]: value })); };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { const { name, value } = e.target; handleFilterChange(name, value); };
  const clearFilters = () => { setFilters({ type: 'All', status: 'All', dateFrom: '', dateTo: '' }); setSearchTerm(''); setCurrentPage(1); setSortConfig(null); };
  const applyFilters = () => setCurrentPage(1);

  const filteredData = useMemo(() => {
    let data = [...MOCK_SUBMISSIONS];
    if (searchTerm) { data = data.filter(item => item.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase())); }
    if (filters.type !== 'All') data = data.filter(item => item.category === filters.type);
    if (filters.status !== 'All') data = data.filter(item => item.status === filters.status);
    if (filters.dateFrom) data = data.filter(item => new Date(item.dateSub) >= new Date(filters.dateFrom));
    if (filters.dateTo) data = data.filter(item => new Date(item.dateSub) <= new Date(filters.dateTo));
    if (sortConfig !== null) { data.sort((a, b) => { // @ts-ignore
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1; // @ts-ignore
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1; return 0; }); }
    return data;
  }, [searchTerm, filters, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage), [filteredData, currentPage, rowsPerPage]);

  const requestSort = (key: string) => { let direction: 'asc' | 'desc' = 'asc'; if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') { direction = 'desc'; } setSortConfig({ key, direction }); };

  const summary = useMemo(() => {
    const total = filteredData.length;
    const pending = filteredData.filter(d => d.status === 'Pending' || d.status === 'Under Review').length;
    const resolved = filteredData.filter(d => d.status === 'Resolved').length;
    const avgTime = resolved > 0 ? 12 : 0;
    return { total, pending, resolved, avgTime: `${avgTime} Days` };
  }, [filteredData]);

  const openDrawer = (item: any) => { setSelectedItem(item); setIsDrawerOpen(true); };
  const closeDrawer = () => setIsDrawerOpen(false);

  if (!hasMounted || loading) { return <IntegratedLoader />; }

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans animate-fade-in">
      <style jsx global>{`\n          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }\n          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }\n          @keyframes modalEnter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }\n          .animate-modal-enter { animation: modalEnter 0.2s ease-out forwards; }\n          .recharts-default-tooltip { border-radius: 0.75rem !important; border: 1px solid #e2e8f0 !important; background-color: rgba(255, 255, 255, 0.9) !important; backdrop-filter: blur(4px); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }\n          .recharts-legend-item { font-size: 12px !important; }\n        `}</style>

      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <nav className="flex items-center text-sm font-medium text-slate-500 mb-3"> <LayoutDashboard className="w-4 h-4 mr-1.5" /> SHG Dashboard <ChevronRightIcon className="w-4 h-4 mx-1" /> Manage & Apply <ChevronRightIcon className="w-4 h-4 mx-1" /> <span className="font-semibold text-indigo-600">Track My Voice</span> </nav>

          <div className="w-full bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 text-white rounded-xl shadow-2xl p-6 md:p-8 mb-6 min-h-[96px] flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Track My Voice</h1>
              <p className="text-white/90 mt-1">View & track issues, feedback, and suggestions raised by you.</p>
            </div>
            <div className="w-full md:w-auto">
              <span className="px-4 py-2 rounded-full bg-white/10 text-sm font-semibold text-white shadow-sm border border-white/20"> Your voice creates change </span>
            </div>
          </div>
        </header>

        <GlassCard>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-700"><Filter className="w-5 h-5 text-indigo-600" /> Filter Submissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <FormSelect name="type" value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
              <option value="All">All Types</option>
              {mockTypes.slice(1).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </FormSelect>
            <FormSelect name="status" value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <option value="All">All Statuses</option>
              {mockStatusOptions.slice(1).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </FormSelect>
            <div className="grid grid-cols-2 gap-2">
              <FormInput type="date" name="dateFrom" value={filters.dateFrom} onChange={handleInputChange} />
              <FormInput type="date" name="dateTo" value={filters.dateTo} onChange={handleInputChange} />
            </div>
            <div className="relative">
              <label htmlFor="search" className="block text-sm font-medium text-slate-600 mb-1">Search</label>
              <input type="text" id="search" placeholder="Ticket ID / Keyword..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full p-2 pl-9 text-sm rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-[37px]" />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={clearFilters} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"> Reset Filters</button>
            <GradientButton variant="default" size="default" onClick={applyFilters}>Apply Filters</GradientButton>
          </div>
        </GlassCard>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard title="Total Submissions" value={summary.total.toString()} icon={History} color="blue" />
          <StatCard title="Active / Pending" value={summary.pending.toString()} icon={Hourglass} color="amber" />
          <StatCard title="Resolved Issues" value={summary.resolved.toString()} icon={CheckCheck} color="green" />
          <StatCard title="Avg. Resolution" value={summary.avgTime} icon={Clock} color="purple" />
        </section>

        <GlassCard>
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><History className="text-indigo-600"/> Submission History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100/70 text-slate-700 font-medium">
                <tr>
                  <SortableHeader colKey="ticketId" title="Ticket ID" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px]" />
                  <SortableHeader colKey="category" title="Category" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                  <th className="px-4 py-2 text-left min-w-[250px]">Description Preview</th>
                  <SortableHeader colKey="dateSub" title="Date Submitted" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[130px]" />
                  <SortableHeader colKey="status" title="Status" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px]" />
                  <SortableHeader colKey="lastUpdate" title="Last Update" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[130px]" />
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50">
                {paginatedData.map(item => (
                  <tr key={item.id} className="hover:bg-sky-50/30 transition-colors group">
                    <td className="px-4 py-3 text-slate-700 font-medium">{item.ticketId}</td>
                    <td className="px-4 py-3 text-slate-700">{item.category}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-sm">{item.description}</td>
                    <td className="px-4 py-3 text-slate-700">{new Date(item.dateSub).toLocaleDateString('en-GB')}</td>
                    <td className="px-4 py-3"><SubmissionStatusBadge status={item.status as Status} /></td>
                    <td className="px-4 py-3 text-slate-700">{new Date(item.lastUpdate).toLocaleDateString('en-GB')}</td>
                    <td className="px-4 py-3 text-center"><button onClick={()=>openDrawer(item)} className="p-1.5 rounded-full text-indigo-600 group-hover:bg-indigo-100 transition-colors" title="View Details"><Eye className="w-5 h-5" /></button></td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (<tr><td colSpan={7} className="text-center py-8 text-slate-500">No submissions found matching filters.</td></tr>)}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex justify-between items-center p-3 border-t border-slate-200/50">
              <span className="text-xs text-slate-600">Total: {filteredData.length}</span>
              <div className="flex items-center gap-2"> <span className="text-xs text-slate-600">Page {currentPage} of {totalPages}</span> <button onClick={()=>setCurrentPage(p=>Math.max(p-1,1))} disabled={currentPage===1} className="p-1.5 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronLeft className="w-4 h-4"/></button> <button onClick={()=>setCurrentPage(p=>Math.min(p+1,totalPages))} disabled={currentPage===totalPages} className="p-1.5 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronRightIcon className="w-4 h-4"/></button> </div>
            </div>
          )}
        </GlassCard>

        <div className="text-center mt-10 py-6 border-t border-dashed border-indigo-200/50">
          <p className="text-md font-semibold text-slate-700">We hear you. Together we improve the system 💙</p>
          <GradientButton variant="default" size="default" onClick={() => alert('Navigate to Raise a Voice page')} className="mt-4 inline-flex w-auto">Raise New Voice</GradientButton>
        </div>

        <DetailsDrawer item={selectedItem} isOpen={isDrawerOpen} onClose={closeDrawer} />
      </div>
    </div>
  );
};

export default TrackMyVoicePage;
