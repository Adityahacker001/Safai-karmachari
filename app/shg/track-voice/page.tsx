// This is your page.tsx file
// Ensure you have React, TailwindCSS, recharts, and lucide-react installed:
// npm install recharts lucide-react

'use client'; // For Next.js App Router

import React, { useState, useMemo, Fragment } from 'react'; // Added Fragment
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from 'recharts';
import {
  LayoutDashboard, ChevronRight as ChevronRightIcon, MessageSquare, Search, FileDown, RefreshCcw, Filter, X, Calendar,
  ChevronDown, ChevronUp, CheckCircle, Hourglass, AlertTriangle, ChevronLeft,
  Users, Building, List, DollarSign, BarChart3, Info, TrendingUp, Package, SlidersHorizontal, ListFilter,
  Eye, Printer, Link as LinkIcon, BadgeCheck, BadgeHelp, BadgeAlert, Clock, MapPin, Target, WalletCards, Briefcase, FileClock, AlertOctagon, Timer,
  ClipboardList, Megaphone, ShieldCheck, FileCheck, Upload, FileWarning, AlertCircle as AlertCircleIcon, Send, Loader2, BookOpen, HandHeart, CheckSquare, ListTodo, FileQuestion, HelpCircle, FileDigit, ShieldQuestion, HeartHandshake, Sparkles, Mic, History, UserRoundCheck, ThumbsUp, Lightbulb, MessageCircleWarning, ArrowUpCircle, Bell,
} from 'lucide-react';
import { CheckCheck } from 'lucide-react';
import { Button as GradientButton } from '@/components/ui/button';
import { Select as FormSelect } from '@/components/ui/select';
import { Input as FormInput } from '@/components/ui/input';
// If using Framer Motion (optional, install it: npm install framer-motion)
// import { motion, AnimatePresence } from 'framer-motion';

// --- Mock Data ---

const MOCK_SUBMISSIONS = [
  { id: 1, ticketId: 'GRV-2025-098', category: 'Complaint', subCategory: 'Fund Delay', description: 'Delay in fund disbursement for scheme X. Submitted proofs on time.', dateSub: '2025-10-15', status: 'Resolved', lastUpdate: '2025-10-25', remarks: 'Funds released after verification.' },
  { id: 2, ticketId: 'FDBK-2025-011', category: 'Feedback', subCategory: 'Process Improvement', description: 'The online portal timed out during document upload.', dateSub: '2025-10-18', status: 'Under Review', lastUpdate: '2025-10-20', remarks: 'IT team investigating session timeout issue.' },
  { id: 3, ticketId: 'SUG-2025-034', category: 'Suggestion', subCategory: 'New Training', description: 'Request for training on digital marketing for SHGs.', dateSub: '2025-10-22', status: 'Pending', lastUpdate: '2025-10-22', remarks: 'Acknowledged. Forwarded to Training Dept.' },
  { id: 4, ticketId: 'GRV-2025-101', category: 'Complaint', subCategory: 'Harassment', description: 'Issue reported with local official interaction during site visit.', dateSub: '2025-09-05', status: 'Escalated', lastUpdate: '2025-10-10', remarks: 'Escalated to NSKC due to severity.' },
  { id: 5, ticketId: 'FDBK-2025-012', category: 'Appreciation', subCategory: 'Staff Support', description: 'District Coordinator Mr. Sharma was very helpful.', dateSub: '2025-10-26', status: 'Resolved', lastUpdate: '2025-10-26', remarks: 'Feedback noted and shared.' },
  // Add more data
];

const mockTypes = ['All', 'Complaint', 'Feedback', 'Suggestion'];
const mockStatusOptions = ['All', 'Pending', 'Under Review', 'Resolved', 'Escalated'];

// --- Reusable Components ---

// 1. Glass Card Wrapper
const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200/50 p-6 ${className}`}>
    {children}
  </div>
);

// 2. Status Badge Component
type Status = 'Pending' | 'Under Review' | 'Resolved' | 'Escalated';
const SubmissionStatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const config = {
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
    'Under Review': { bg: 'bg-indigo-100', text: 'text-indigo-700', icon: Search },
    Resolved: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
    Escalated: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle },
  }[status];
  return ( <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${config.bg} ${config.text}`}> <config.icon className="w-3.5 h-3.5" /> {status} </span> );
};

// 3. Reusable Form Input & Select (Styled for Filters)
const FilterInput: React.FC<{ type: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }> = 
  ({ type, name, value, onChange, placeholder }) => ( <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className="block w-full p-2 text-sm rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" /> );
const FilterSelect: React.FC<{ name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode }> =
  ({ name, value, onChange, children }) => ( <select name={name} value={value} onChange={onChange} className="block w-full p-2 text-sm rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"> {children} </select> );
// Filter Tag Pills (Example, can be implemented fully if needed)
const TagPill: React.FC<{ text: string; active: boolean; onClick: () => void }> = ({ text, active, onClick }) => (
  <button onClick={onClick} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${active ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}> {text} </button> );

// 4. Sortable Table Header (same as previous)
type SortableHeaderProps = { colKey: string; title: string; sortConfig: { key: string; direction: 'asc' | 'desc' } | null; requestSort: (key: string) => void; className?: string; };
const SortableHeader: React.FC<SortableHeaderProps> = ({ colKey, title, sortConfig, requestSort, className = '' }) => {
  const getSortIcon = () => { if (!sortConfig || sortConfig.key !== colKey) return <ChevronDown className="w-4 h-4 opacity-30" />; return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />; };
  return ( <th className={`px-4 py-3 text-left cursor-pointer transition-colors hover:bg-indigo-200 ${className}`} onClick={() => requestSort(colKey)}> <div className="flex items-center gap-1">{title}{getSortIcon()}</div> </th> );
};

// 5. Details Drawer Component
const DetailsDrawer: React.FC<{ item: any | null; isOpen: boolean; onClose: () => void; }> = ({ item, isOpen, onClose }) => {
   // Simple timeline component - Adapt based on actual status flow if needed
  const Timeline = () => (
      <div className="mt-4 space-y-4 pl-5 border-l-2 border-indigo-200 relative">
          <div className="relative"><span className="absolute -left-[27px] top-0.5 w-4 h-4 bg-indigo-500 rounded-full border-4 border-white ring-1 ring-indigo-200"></span><p className="text-xs font-semibold text-indigo-700">Submitted</p><p className="text-xs text-slate-500">{new Date(item.dateSub).toLocaleString('en-GB')}</p></div>
          {item.status !== 'Pending' && <div className="relative"><span className="absolute -left-[27px] top-0.5 w-4 h-4 bg-blue-500 rounded-full border-4 border-white ring-1 ring-blue-200"></span><p className="text-xs font-semibold text-blue-700">Reviewed / Action Taken</p><p className="text-xs text-slate-500">{new Date(item.lastUpdate).toLocaleString('en-GB')}</p></div>}
          {item.status === 'Resolved' && <div className="relative"><span className="absolute -left-[27px] top-0.5 w-4 h-4 bg-green-500 rounded-full border-4 border-white ring-1 ring-green-200"></span><p className="text-xs font-semibold text-green-700">Resolved</p><p className="text-xs text-slate-500">{new Date(item.lastUpdate).toLocaleString('en-GB')}</p></div>}
          {item.status === 'Escalated' && <div className="relative"><span className="absolute -left-[27px] top-0.5 w-4 h-4 bg-red-500 rounded-full border-4 border-white ring-1 ring-red-200"></span><p className="text-xs font-semibold text-red-700">Escalated</p><p className="text-xs text-slate-500">{new Date(item.lastUpdate).toLocaleString('en-GB')}</p></div>}
      </div>
  );

  // Determine if escalation is possible (e.g., pending > 15 days)
   const daysPending = item ? Math.ceil((new Date().getTime() - new Date(item.dateSub).getTime()) / (1000 * 3600 * 24)) : 0;
   const canEscalate = (item?.status === 'Pending' || item?.status === 'Under Review') && daysPending > 15; // Example: Escalate after 15 days

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose}></div>}
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-gradient-to-br from-white via-sky-50 to-blue-100 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-slate-200">
             <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><Info className="w-6 h-6 text-indigo-600" /> Submission Details</h2>
             <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
          </div>
          {/* Body */}
          {item && (
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
               <h3 className="text-lg font-bold text-indigo-700">{item.ticketId}</h3>
               <div className="grid grid-cols-2 gap-4 text-sm">
                 <DetailItem label="Category" value={item.category} />
                 <DetailItem label="Sub-Category" value={item.subCategory || 'N/A'} />
                 <DetailItem label="Date Submitted" value={new Date(item.dateSub).toLocaleDateString('en-GB')} />
                 <DetailItem label="Current Status" value={<SubmissionStatusBadge status={item.status as Status} />} />
               </div>
                <DetailItem label="Description" value={item.description} isBlock />
                <DetailItem label="Last Action Taken / Remarks" value={item.actionTaken || item.remarks || 'No action recorded yet.'} isBlock />
                {/* Attachments Placeholder */}
                <div>
                   <p className="text-xs font-semibold text-slate-500 mb-1">Attachments</p>
                   <div className="flex gap-2 flex-wrap">
                      {/* Map through actual attachments here */}
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">proof.pdf</span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">image.jpg</span>
                   </div>
                </div>
                {/* Timeline */}
                <h4 className="text-md font-semibold text-slate-700 pt-3 border-t border-slate-200">Timeline</h4>
                <Timeline />
            </div>
          )}
          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-slate-200 bg-slate-50 gap-3 mt-auto">
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
    </>
  );
};
const DetailItem: React.FC<{ label: string; value: React.ReactNode; className?: string; isBlock?: boolean }> = 
  ({ label, value, className = '', isBlock = false }) => (
  <div className={`${className} ${isBlock ? 'col-span-full' : ''}`}>
    <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
    <p className={`font-medium text-slate-800 ${isBlock ? 'bg-slate-50 p-3 rounded-md border border-slate-200 whitespace-pre-wrap' : ''}`}>{value}</p>
  </div>
);

// 6. Summary Card
type SummaryCardProps = { title: string; value: string | number; icon: React.ElementType; color: string; };
const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon, color }) => (
    <div className={`p-4 rounded-xl bg-gradient-to-br from-${color}-50 to-white border border-${color}-200 shadow-sm flex items-center gap-3`}>
        <div className={`p-2 rounded-lg bg-${color}-100 text-${color}-600`}> <Icon className="w-6 h-6"/> </div>
        <div> <p className="text-2xl font-bold text-slate-800">{value}</p> <p className="text-xs font-medium text-slate-500">{title}</p> </div>
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
  // const [isInsightsOpen, setIsInsightsOpen] = useState(false); // Insights panel if needed later

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Create a wrapper function for FormInput onChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleFilterChange(name, value);
  };

  const clearFilters = () => { setFilters({ type: 'All', status: 'All', dateFrom: '', dateTo: '' }); setSearchTerm(''); setCurrentPage(1); setSortConfig(null); };
  const applyFilters = () => setCurrentPage(1);

  // --- Data Logic ---
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

  // --- Pagination ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage), [filteredData, currentPage, rowsPerPage]);

  // --- Sorting ---
  const requestSort = (key: string) => { let direction: 'asc' | 'desc' = 'asc'; if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') { direction = 'desc'; } setSortConfig({ key, direction }); };
  
  // --- Summary ---
  const summary = useMemo(() => {
    const total = filteredData.length;
    const pending = filteredData.filter(d => d.status === 'Pending' || d.status === 'Under Review').length;
    const resolved = filteredData.filter(d => d.status === 'Resolved').length;
    // Mock average time
    const avgTime = resolved > 0 ? 12 : 0; 
    return { total, pending, resolved, avgTime: `${avgTime} Days` };
  }, [filteredData]);

  // --- Modal/Drawer ---
  const openDrawer = (item: any) => { setSelectedItem(item); setIsDrawerOpen(true); };
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-sky-100 p-4 md:p-8 font-sans animate-fade-in">
        {/* Inline Styles */}
        <style jsx global>{`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
          @keyframes modalEnter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          .animate-modal-enter { animation: modalEnter 0.2s ease-out forwards; }
          .recharts-default-tooltip { border-radius: 0.75rem !important; border: 1px solid #e2e8f0 !important; background-color: rgba(255, 255, 255, 0.9) !important; backdrop-filter: blur(4px); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
          .recharts-legend-item { font-size: 12px !important; }
        `}</style>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
         <header>
           <nav className="flex items-center text-sm font-medium text-slate-500 mb-3"> <LayoutDashboard className="w-4 h-4 mr-1.5" /> SHG Dashboard <ChevronRightIcon className="w-4 h-4 mx-1" /> Manage & Apply <ChevronRightIcon className="w-4 h-4 mx-1" /> <span className="font-semibold text-indigo-600">Track My Voice</span> </nav>
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div className="flex items-center space-x-4">
               <span className="p-3 bg-gradient-to-br from-sky-500 to-blue-500 rounded-2xl text-white shadow-lg relative">
                   <Megaphone className="w-8 h-8" />
                   <span className="absolute -top-1 -right-1 flex h-3 w-3">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                   </span>
               </span>
               <div> <h1 className="text-3xl font-bold text-slate-800">Track My Voice</h1> <p className="text-slate-500 mt-1">View & track issues, feedback, and suggestions raised by you.</p> </div>
             </div>
             <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 via-sky-100 to-emerald-100 text-sm font-semibold text-purple-800 shadow-sm border border-purple-200"> Your voice creates change 💪✨ </span>
           </div>
         </header>
        {/* Filters */}
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
        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <SummaryCard title="Total Submissions" value={summary.total} icon={ListTodo} color="blue" />
            <SummaryCard title="Active / Pending" value={summary.pending} icon={Hourglass} color="yellow" />
            <SummaryCard title="Resolved Issues" value={summary.resolved} icon={CheckCheck} color="green" />
            <SummaryCard title="Avg. Resolution" value={summary.avgTime} icon={Clock} color="purple" />
        </section>
        {/* Table */}
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
           {/* Pagination */}
           {totalPages > 1 && (
             <div className="flex justify-between items-center p-3 border-t border-slate-200/50">
               <span className="text-xs text-slate-600">Total: {filteredData.length}</span>
               <div className="flex items-center gap-2"> <span className="text-xs text-slate-600">Page {currentPage} of {totalPages}</span> <button onClick={()=>setCurrentPage(p=>Math.max(p-1,1))} disabled={currentPage===1} className="p-1.5 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronLeft className="w-4 h-4"/></button> <button onClick={()=>setCurrentPage(p=>Math.min(p+1,totalPages))} disabled={currentPage===totalPages} className="p-1.5 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronRightIcon className="w-4 h-4"/></button> </div>
             </div>
           )}
        </GlassCard>

        {/* Footer Encouragement */}
        <div className="text-center mt-10 py-6 border-t border-dashed border-indigo-200/50">
             <HeartHandshake className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
             <p className="text-md font-semibold text-slate-700">We hear you. Together we improve the system 💙</p>
             <GradientButton variant="default" size="default" onClick={() => alert('Navigate to Raise a Voice page')} className="mt-4 inline-flex w-auto">Raise New Voice</GradientButton>
        </div>
        
        {/* Modals & Drawers */}
        <DetailsDrawer item={selectedItem} isOpen={isDrawerOpen} onClose={closeDrawer} />
        {/* Insights Panel can be added here if needed */}
      </div>
    </div>
  );
};

export default TrackMyVoicePage;