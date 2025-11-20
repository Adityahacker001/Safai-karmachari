// Yeh aapki page.tsx file hai
// Ise run karne ke liye, aapke project mein React, TailwindCSS, 
// recharts, aur lucide-react install hona zaroori hai.

'use client'; // Next.js App Router ke liye

import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from 'recharts';
import {
  LayoutDashboard, ChevronRight as ChevronRightIcon, MessageSquare, Search, FileDown, RefreshCcw, Filter, X, Calendar,
  ChevronDown, ChevronUp, CheckCircle, Hourglass, ChevronLeft, Users, List, BarChart3, Info, TrendingUp, Package,
  SlidersHorizontal, ListFilter, Eye, Printer, BadgeCheck, BadgeHelp, Smile, MessageCircleWarning, BookOpen
} from 'lucide-react';

// --- Mock Data ---

const MOCK_FEEDBACK_DATA = [
  { id: 1, feedbackId: 'FDBK-2025-004', source: 'Beneficiary', type: 'Suggestion', description: 'Suggested more training programs for SHG women in tailoring.', dateReceived: '2025-10-14', actionTaken: 'Forwarded to training division for consideration in next FY plan.', status: 'Resolved' },
  { id: 2, feedbackId: 'FDBK-2025-005', source: 'Staff', type: 'Complaint', description: 'Delay in response from the finance department regarding query #123.', dateReceived: '2025-10-20', actionTaken: 'Finance head notified. Response provided on 2025-10-22.', status: 'Resolved' },
  { id: 3, feedbackId: 'FDBK-2025-006', source: 'Public', type: 'Appreciation', description: 'NSKFDC website is very informative and easy to navigate.', dateReceived: '2025-10-22', actionTaken: 'Feedback noted and shared with the IT team.', status: 'Resolved' },
  { id: 4, feedbackId: 'FDBK-2025-007', source: 'Beneficiary', type: 'Complaint', description: 'The helpline number is frequently busy or unresponsive.', dateReceived: '2025-10-25', actionTaken: 'Investigating the issue with the call center vendor.', status: 'Pending' },
  { id: 5, feedbackId: 'FDBK-2025-008', source: 'Staff', type: 'Suggestion', description: 'Need a dashboard widget for pending tasks.', dateReceived: '2025-10-10', actionTaken: 'Suggestion added to the product backlog for future consideration.', status: 'Resolved' },
  { id: 6, feedbackId: 'FDBK-2025-009', source: 'SHG', type: 'Complaint', description: 'Difficulty uploading group documents on the portal.', dateReceived: '2025-10-26', actionTaken: 'IT support contacted the SHG leader to assist.', status: 'Pending' },
  { id: 7, feedbackId: 'FDBK-2025-010', source: 'Beneficiary', type: 'Appreciation', description: 'Timely disbursement of education loan helped my daughter.', dateReceived: '2025-09-15', actionTaken: 'Positive feedback recorded.', status: 'Resolved' },
  // Add more data for pagination
  { id: 8, feedbackId: 'FDBK-2025-011', source: 'Public', type: 'Suggestion', description: 'Include success stories section on the website.', dateReceived: '2025-10-05', actionTaken: 'Content team evaluating feasibility.', status: 'Pending' },
  { id: 9, feedbackId: 'FDBK-2025-012', source: 'Staff', type: 'Complaint', description: 'Office AC not working properly in Wing B.', dateReceived: '2025-10-23', actionTaken: 'Admin department logged a maintenance request.', status: 'Pending' },
  { id: 10, feedbackId: 'FDBK-2025-013', source: 'Beneficiary', type: 'Suggestion', description: 'Provide scheme information in regional languages.', dateReceived: '2025-10-02', actionTaken: 'Translation work initiated for key schemes.', status: 'Resolved' },
  { id: 11, feedbackId: 'FDBK-2025-014', source: 'SHG', type: 'Appreciation', description: 'Skill development training was very helpful.', dateReceived: '2025-09-28', actionTaken: 'Feedback shared with the training partner.', status: 'Resolved' },
  { id: 12, feedbackId: 'FDBK-2025-015', source: 'Individual SK', type: 'Complaint', description: 'Application status not updated online for 2 weeks.', dateReceived: '2025-10-27', actionTaken: 'Checking with the concerned department.', status: 'Pending' },
];

const mockSource = ['Beneficiary', 'Staff', 'Public', 'SHG', 'Worker']; // Added SHG, Worker
const mockType = ['Suggestion', 'Appreciation', 'Complaint'];
const mockStatus = ['Pending', 'Resolved'];

// --- Reusable Components ---

// 1. Status Badge Component
type Status = 'Pending' | 'Resolved';
const FeedbackStatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const config = {
    Resolved: { bg: 'bg-green-100', text: 'text-green-700', icon: BadgeCheck, label: 'Resolved' },
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: BadgeHelp, label: 'Pending' },
  }[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <config.icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};

// 2. Reusable Form Input & Select (same as previous examples)
const FormInput: React.FC<{ label: string, type: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = 
  ({ label, type, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <input type={type} id={name} name={name} value={value} onChange={onChange}
           className="block w-full p-2 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200" />
  </div>
);
const FormSelect: React.FC<{ label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode }> =
  ({ label, name, value, onChange, children }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <select id={name} name={name} value={value} onChange={onChange}
            className="block w-full p-2 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 bg-white">
      {children}
    </select>
  </div>
);

// 3. Sortable Table Header (same as previous examples)
type SortableHeaderProps = {
  colKey: keyof typeof MOCK_FEEDBACK_DATA[0];
  title: string;
  sortConfig: { key: keyof typeof MOCK_FEEDBACK_DATA[0]; direction: 'asc' | 'desc' } | null;
  requestSort: (key: keyof typeof MOCK_FEEDBACK_DATA[0]) => void;
  className?: string;
};
const SortableHeader: React.FC<SortableHeaderProps> = ({ colKey, title, sortConfig, requestSort, className = '' }) => {
  const getSortIcon = () => { if (!sortConfig || sortConfig.key !== colKey) return <ChevronDown className="w-4 h-4 opacity-30" />; return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />; };
  return ( <th className={`px-4 py-3 text-left cursor-pointer transition-colors hover:bg-indigo-200 ${className}`} onClick={() => requestSort(colKey)}> <div className="flex items-center gap-1">{title}{getSortIcon()}</div> </th> );
};

// 4. View Details Modal
type FeedbackModalProps = { item: any | null; isOpen: boolean; onClose: () => void; };
const ViewDetailsModal: React.FC<FeedbackModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col scale-100 animate-modal-enter">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-sky-50">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><MessageSquare className="w-6 h-6 text-indigo-600" /> Feedback Details</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
        </div>
        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          <h3 className="text-lg font-bold text-indigo-700">{item.feedbackId}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <DetailItem label="Source" value={item.source} />
            <DetailItem label="Type" value={item.type} />
            <DetailItem label="Date Received" value={new Date(item.dateReceived).toLocaleDateString('en-GB')} />
            <DetailItem label="Status" value={<FeedbackStatusBadge status={item.status as Status} />} />
          </div>
          <DetailItem label="Description" value={item.description} className="md:col-span-2" isBlock />
          <DetailItem label="Action Taken" value={item.actionTaken || 'No action recorded yet.'} className="md:col-span-2" isBlock />
        </div>
        {/* Footer Actions */}
        <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50 gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-[1.03]"><Printer className="w-4 h-4" /> Print</button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all duration-200 hover:scale-[1.03]"><FileDown className="w-4 h-4" /> Download PDF</button>
          <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 hover:scale-[1.03] shadow-md"><X className="w-4 h-4" /> Close</button>
        </div>
      </div>
    </div>
  );
};
const DetailItem: React.FC<{ label: string; value: React.ReactNode; className?: string; isBlock?: boolean }> = 
  ({ label, value, className = '', isBlock = false }) => (
  <div className={`${className} ${isBlock ? 'col-span-full' : ''}`}>
    <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
    <p className={`font-medium text-slate-800 ${isBlock ? 'bg-slate-50 p-3 rounded-md border border-slate-200 whitespace-pre-wrap' : ''}`}>{value}</p>
  </div>
);


// 5. Insights Panel Component
type InsightsPanelProps = { data: any[]; isOpen: boolean; onClose: () => void; };
const InsightsPanel: React.FC<InsightsPanelProps> = ({ data, isOpen, onClose }) => {
  // Chart Data Preparation
  const typeCounts = useMemo(() => {
    const counts: { [key: string]: number } = { Suggestion: 0, Appreciation: 0, Complaint: 0 };
    data.forEach(item => { if (item.type in counts) counts[item.type]++; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);

  const sourceCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    data.forEach(item => { counts[item.source] = (counts[item.source] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);
  
  // Mock monthly trend data
  const monthlyTrend = [
    { month: 'May', count: 12 }, { month: 'Jun', count: 15 }, { month: 'Jul', count: 22 },
    { month: 'Aug', count: 18 }, { month: 'Sep', count: 25 }, { month: 'Oct', count: 30 },
  ];

  const PIE_COLORS: Record<string, string> = { Suggestion: '#3B82F6', Appreciation: '#10B981', Complaint: '#EF4444' }; // Blue, Green, Red

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><BarChart3 className="w-6 h-6 text-indigo-600" /> Feedback Insights</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
      </div>
      <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
        {/* Feedback Type Pie Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Feedback Type Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={typeCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {typeCounts.map((entry, index) => ( <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name]} /> ))} </Pie>
                <RechartsTooltip formatter={(value, name) => [`${value} Feedbacks`, name]} /> <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Feedback by Source Bar Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Feedback by Source</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <BarChart data={sourceCounts} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" fontSize={10} /> <YAxis fontSize={10} /> <RechartsTooltip />
                <Bar dataKey="value" fill="#8884d8" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Monthly Trend Line Chart */}
        <div>
           <h3 className="text-lg font-medium text-slate-700 mb-4">Monthly Feedback Trend</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer>
               <LineChart data={monthlyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/> <XAxis dataKey="month" fontSize={10} /> <YAxis fontSize={10}/>
                 <RechartsTooltip /> <Legend />
                 <Line type="monotone" dataKey="count" name="Feedbacks Received" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 6 }}/>
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Page Component ---
const GeneralFeedbackReportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ dateFrom: '', dateTo: '', source: '', type: '', status: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof typeof MOCK_FEEDBACK_DATA[0];
    direction: 'asc' | 'desc';
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const clearFilters = () => { setFilters({ dateFrom: '', dateTo: '', source: '', type: '', status: '' }); setSearchQuery(''); setCurrentPage(1); setSortConfig(null); };
  const applyFilters = () => setCurrentPage(1);

  // --- Data Logic (Filtering, Sorting) ---
  const filteredData = useMemo(() => {
    let data = [...MOCK_FEEDBACK_DATA];
    if (searchQuery) {
      data = data.filter(item =>
        item.feedbackId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.source.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.source) data = data.filter(item => item.source === filters.source);
    if (filters.type) data = data.filter(item => item.type === filters.type);
    if (filters.status) data = data.filter(item => item.status === filters.status);
    if (filters.dateFrom) data = data.filter(item => new Date(item.dateReceived) >= new Date(filters.dateFrom));
    if (filters.dateTo) data = data.filter(item => new Date(item.dateReceived) <= new Date(filters.dateTo));
    if (sortConfig !== null) {
      data.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof MOCK_FEEDBACK_DATA[0]];
        const bValue = b[sortConfig.key as keyof typeof MOCK_FEEDBACK_DATA[0]];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [searchQuery, filters, sortConfig]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage), [filteredData, currentPage, rowsPerPage]);

  // --- Sorting Handler ---
  const requestSort = (key: keyof typeof MOCK_FEEDBACK_DATA[0]) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // --- Summary Calculation ---
  const summary = useMemo(() => {
    const total = filteredData.length;
    const resolved = filteredData.filter(d => d.status === 'Resolved').length;
    const pending = filteredData.filter(d => d.status === 'Pending').length;
    const resolutionRate = total === 0 ? 0 : (resolved / total) * 100;
    return { total, resolved, pending, resolutionRate: resolutionRate.toFixed(0) + '%' };
  }, [filteredData]);

  // --- Modal Handlers ---
  const openModal = (item: any) => { setSelectedItem(item); setIsModalOpen(true); };
  const closeModal = () => setIsModalOpen(false);
  if (loading) return (
    <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
      <div className="loader" />
      <style jsx>{`
        .loader{width:45px;height:45px;border-radius:9999px;--_c:no-repeat linear-gradient(#4f46e5 0 0);background:var(--_c),var(--_c),var(--_c),var(--_c),var(--_c),var(--_c),var(--_c),var(--_c),var(--_c);background-size:16px 16px,16px 16px,16px 16px,16px 16px,16px 16px,16px 16px,16px 16px,16px 16px,16px 16px;animation:l32-1 1s infinite linear,l32-2 1s infinite linear}
        @keyframes l32-1{0%{width:45px;height:45px}50%{width:65px;height:65px}100%{width:45px;height:45px}}
        @keyframes l32-2{0%{background-position:0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0}100%{background-position:16px 16px,8px 8px,0 0,-8px -8px,-16px -16px,-24px -24px,-32px -32px,-40px -40px,-48px -48px}}
      `}</style>
    </div>
  );
  return (
    <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full">
        {/* Header */}
        <header className="mb-6">
          <nav className="flex items-center text-sm font-medium text-slate-500 mb-2">
            <LayoutDashboard className="w-4 h-4 mr-1.5" /> Dashboard <ChevronRightIcon className="w-4 h-4 mx-1" /> Reports & Analytics <ChevronRightIcon className="w-4 h-4 mx-1" /> <span className="font-semibold text-indigo-600">General Feedback Report</span>
          </nav>
          <div className="w-full">
            <div className="rounded-xl px-6 py-4 bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500 shadow-lg w-full">
              <h1 className="text-3xl font-bold text-white tracking-tight">General Feedback Report</h1>
              <p className="text-white/80 mt-1 font-medium">View and analyze feedback from multiple sources.</p>
            </div>
          </div>
        </header>
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 mb-6 w-full">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800"><Filter className="w-5 h-5 text-indigo-600" /> Filters</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            <FormSelect label="Source" name="source" value={filters.source} onChange={handleFilterChange}><option value="">All Sources</option>{mockSource.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
            <FormSelect label="Type" name="type" value={filters.type} onChange={handleFilterChange}><option value="">All Types</option>{mockType.map(t=><option key={t} value={t}>{t}</option>)}</FormSelect>
            <FormSelect label="Status" name="status" value={filters.status} onChange={handleFilterChange}><option value="">All Statuses</option>{mockStatus.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
            <div className="grid grid-cols-2 gap-2"><FormInput label="From Date" type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} /><FormInput label="To Date" type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} /></div>
            <div className="relative">
              <label htmlFor="search" className="block text-sm font-medium text-slate-600 mb-1">Search</label>
              <input type="text" id="search" placeholder="ID / Type / Source..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="block w-full p-2 pl-9 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm"/>
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-[37px]" />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-5 border-t border-slate-200 pt-5">
            <button onClick={clearFilters} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.02]"><X className="w-4 h-4" /> Clear Filters</button>
            <button onClick={applyFilters} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.02] shadow-md hover:shadow-lg"><Search className="w-4 h-4" /> Apply Filters</button>
          </div>
        </div>
        {/* Export/Reload/Insights Section */}
        <div className="flex flex-wrap gap-2 mb-6 w-full">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.03] shadow-md hover:shadow-lg" onClick={() => setIsInsightsOpen(true)}> <BarChart3 className="w-4 h-4" /> View Insights </button>
          <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export CSV"><FileDown className="w-5 h-5 text-green-600" /></button>
          <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export PDF"><FileDown className="w-5 h-5 text-red-600" /></button>
          <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Refresh"><RefreshCcw className="w-5 h-5 text-blue-600" /></button>
        </div>
        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-indigo-200 via-sky-100 to-blue-100 text-indigo-900 font-semibold sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left">Sl.</th>
                  <SortableHeader colKey="feedbackId" title="Feedback ID" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px]" />
                  <SortableHeader colKey="source" title="Source" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                  <SortableHeader colKey="type" title="Type" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                  <th className="px-4 py-3 text-left min-w-[300px]">Description</th>
                  <SortableHeader colKey="dateReceived" title="Date Received" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[130px]" />
                  <th className="px-4 py-3 text-left min-w-[250px]">Action Taken</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item.id} className={
                    `${index % 2 === 0 ? 'bg-white' : 'bg-sky-50'} hover:bg-indigo-50/70 transition-colors rounded-lg`}
                  >
                    <td className="px-4 py-3 text-slate-500">{(currentPage-1)*rowsPerPage+index+1}</td>
                    <td className="px-4 py-3 text-slate-700 font-medium">{item.feedbackId}</td>
                    <td className="px-4 py-3 text-slate-700">{item.source}</td>
                    <td className="px-4 py-3 text-slate-700">{item.type}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-sm">{item.description}</td>
                    <td className="px-4 py-3 text-slate-700">{new Date(item.dateReceived).toLocaleDateString('en-GB')}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-xs">{item.actionTaken}</td>
                    <td className="px-4 py-3 text-center"><button onClick={()=>openModal(item)} className="p-1.5 rounded-md text-indigo-600 hover:bg-indigo-100" title="View Details"><Eye className="w-5 h-5" /></button></td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (<tr><td colSpan={8} className="text-center py-10 text-slate-500">No feedback found.</td></tr>)}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center p-4 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2"><label htmlFor="rowsPerPage" className="text-xs text-slate-600">Rows:</label><select id="rowsPerPage" value={rowsPerPage} onChange={(e)=>{setRowsPerPage(Number(e.target.value));setCurrentPage(1);}} className="p-1.5 rounded-md border-slate-300 text-xs focus:ring-indigo-500"><option value={10}>10</option><option value={20}>20</option><option value={50}>50</option></select></div>
              <div className="flex items-center gap-3"><span className="text-xs text-slate-600">Page {currentPage} of {totalPages} (Total: {filteredData.length})</span><div className="flex items-center gap-1"><button onClick={()=>setCurrentPage(p=>Math.max(p-1,1))} disabled={currentPage===1} className="p-2 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronLeft className="w-4 h-4"/></button><button onClick={()=>setCurrentPage(p=>Math.min(p+1,totalPages))} disabled={currentPage===totalPages} className="p-2 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronRightIcon className="w-4 h-4"/></button></div></div>
            </div>
          )}
        </div>
        {/* Summary Footer */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mt-6 shadow-sm text-slate-600 text-sm flex flex-col md:flex-row flex-wrap justify-between items-center gap-2 w-full">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1"><span><strong>Total Feedbacks:</strong> {summary.total}</span><span className="text-yellow-600"><strong>Pending:</strong> {summary.pending}</span><span className="text-green-600"><strong>Resolved:</strong> {summary.resolved}</span></div>
          <span className="font-semibold text-indigo-700">Resolution Rate: {summary.resolutionRate}</span>
        </div>
        {/* Audit Footer */}
        <footer className="text-center mt-8 text-xs text-slate-500">
          <p>Created By: Officer Name • Created On: 26 Oct 2025</p>
          <p className="mt-1">Last Updated By: Admin • Updated On: 26 Oct 2025, 17:00 IST</p>
        </footer>
        {/* Modals & Panels */}
        <ViewDetailsModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
        <InsightsPanel data={filteredData} isOpen={isInsightsOpen} onClose={() => setIsInsightsOpen(false)} />
        {isInsightsOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsInsightsOpen(false)}></div>}
      </div>
    </div>
  );
};

export default GeneralFeedbackReportPage;