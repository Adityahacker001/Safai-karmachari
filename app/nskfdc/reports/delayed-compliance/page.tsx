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
  LayoutDashboard, ChevronRight as ChevronRightIcon, Search, FileDown, RefreshCcw, Filter, X, ChevronDown, ChevronUp, Hourglass, ChevronLeft, BarChart3, Eye, Printer, Timer, ClipboardCheck, FileQuestion, CheckCheck, FileText,
} from "lucide-react";

// --- Mock Data ---

// Helper to calculate delay
const calculateDelay = (dueDate: string): number => {
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  const diffTime = today.getTime() - due.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0; // Show 0 if not overdue
};

const MOCK_DELAYED_DATA = [
  { id: 1, dirId: 'DIR/2025/0098', dirTitle: 'Monthly Fund Utilization Report', issuedDate: '2025-09-05', dueDate: '2025-09-20', state: 'Maharashtra', district: 'Pune', type: 'Financial', status: 'Pending', reason: 'Awaiting Approval from State Office', remarks: 'Reminder issued on 10-Oct-2025', lastUpdated: '2025-10-27', officer: 'Aditya Patil (DNO)' },
  { id: 2, dirId: 'DIR/2025/0075', dirTitle: 'Beneficiary Verification Drive Report', issuedDate: '2025-08-15', dueDate: '2025-08-30', state: 'Uttar Pradesh', district: 'Lucknow', type: 'Administrative', status: 'Pending', reason: 'Field staff delay in data collection', remarks: 'Second reminder sent.', lastUpdated: '2025-10-26', officer: 'Sunita Singh (SNO)' },
  { id: 3, dirId: 'DIR/2025/0101', dirTitle: 'SHG Formation Status Update', issuedDate: '2025-09-28', dueDate: '2025-10-10', state: 'Gujarat', district: 'Ahmedabad', type: 'Operational', status: 'Partially Complied', reason: 'Waiting for data from 2 blocks', remarks: 'Partial report submitted.', lastUpdated: '2025-10-25', officer: 'Vijay Patel (DNO)' },
  { id: 4, dirId: 'DIR/2025/0090', dirTitle: 'Action Taken Report on Grievance #130', issuedDate: '2025-09-10', dueDate: '2025-09-25', state: 'Rajasthan', district: 'Jaipur', type: 'Administrative', status: 'Awaiting Review', reason: 'Report submitted, pending HQ review', remarks: 'Submitted on 24-Sep-2025.', lastUpdated: '2025-10-20', officer: 'Manoj Sharma (SNO)' },
  { id: 5, dirId: 'DIR/2025/0105', dirTitle: 'Skill Dev. Batch Completion Report', issuedDate: '2025-10-01', dueDate: '2025-10-15', state: 'Karnataka', district: 'Bengaluru', type: 'Operational', status: 'Pending', reason: 'Training Partner delay', remarks: 'Follow-up with TP initiated.', lastUpdated: '2025-10-27', officer: 'Anjali Rao (SNO)' },
  // Add more data
].map(item => ({
  ...item,
  delay: calculateDelay(item.dueDate),
}));

const mockStates = [...new Set(MOCK_DELAYED_DATA.map(d => d.state))];
const mockDistricts = [...new Set(MOCK_DELAYED_DATA.map(d => d.district))]; // Simplified
const mockFinancialYears = ['2025-2026', '2024-2025', '2023-2024'];
const mockComplianceTypes = ['Financial', 'Administrative', 'Operational'];
const mockDelayDurations = ['0-15 Days', '16-30 Days', '31-60 Days', '60+ Days'];
const mockStatus = ['Pending', 'Partially Complied', 'Awaiting Review'];

// --- Reusable Components ---

// 1. Status Badge Component
type Status = 'Pending' | 'Partially Complied' | 'Awaiting Review';
const ComplianceStatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const config = {
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Hourglass, label: 'Pending' },
    'Partially Complied': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCheck, label: 'Partial' },
    'Awaiting Review': { bg: 'bg-red-100', text: 'text-red-700', icon: FileQuestion, label: 'Awaiting Review' },
  }[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${config.bg} ${config.text}`}>
      <config.icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};

// 2. Reusable Form Input & Select (same as previous)
const FormInput: React.FC<{ label: string, type: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }> = 
  ({ label, type, name, value, onChange, placeholder }) => (
  <div><label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label><input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} className="block w-full p-2 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200" /></div> );
const FormSelect: React.FC<{ label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode }> =
  ({ label, name, value, onChange, children }) => (
  <div><label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label><select id={name} name={name} value={value} onChange={onChange} className="block w-full p-2 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 bg-white">{children}</select></div> );

// 3. Sortable Table Header (same as previous)
type SortableHeaderProps = { colKey: string; title: string; sortConfig: { key: string; direction: 'asc' | 'desc' } | null; requestSort: (key: string) => void; className?: string; };
const SortableHeader: React.FC<SortableHeaderProps> = ({ colKey, title, sortConfig, requestSort, className = '' }) => {
  const getSortIcon = () => { if (!sortConfig || sortConfig.key !== colKey) return <ChevronDown className="w-4 h-4 opacity-30" />; return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />; };
  return ( <th className={`px-4 py-3 text-left cursor-pointer transition-colors hover:bg-indigo-200 ${className}`} onClick={() => requestSort(colKey)}> <div className="flex items-center gap-1">{title}{getSortIcon()}</div> </th> );
};

// --- Currency Formatter --- (Not needed here but kept)
const formatCurrency = (amount: number) => amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });

// 4. View Details Modal
type DetailsModalProps = { item: any | null; isOpen: boolean; onClose: () => void; };
const ViewDetailsModal: React.FC<DetailsModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-modal-enter">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-red-50 to-orange-50">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><ClipboardCheck className="w-6 h-6 text-red-600" /> Delayed Compliance Details</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
        </div>
        <div className="p-6 space-y-5 overflow-y-auto">
          <h3 className="text-lg font-bold text-red-700">{item.dirId} - {item.dirTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
             <DetailItem label="Direction ID" value={item.dirId} />
             <DetailItem label="Direction Title" value={item.dirTitle} className="md:col-span-2"/>
             <DetailItem label="Issued Date" value={new Date(item.issuedDate).toLocaleDateString('en-GB')} />
             <DetailItem label="Due Date" value={new Date(item.dueDate).toLocaleDateString('en-GB')} />
             <DetailItem label="Delay Duration" value={`${item.delay} Days`} className="font-bold text-red-700"/>
             <DetailItem label="Compliance Type" value={item.type} />
             <DetailItem label="State" value={item.state} />
             <DetailItem label="District" value={item.district} />
             <DetailItem label="Current Status" value={<ComplianceStatusBadge status={item.status as Status} />} />
             <DetailItem label="Responsible Officer" value={item.officer || 'N/A'} />
             <DetailItem label="Last Updated" value={new Date(item.lastUpdated).toLocaleDateString('en-GB')} />
          </div>
           <DetailItem label="Reason for Delay" value={item.reason || 'N/A'} className="md:col-span-3 font-medium" isBlock />
           <DetailItem label="Remarks" value={item.remarks || 'N/A'} className="md:col-span-3" isBlock />
        </div>
        <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50 gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.03]"><Printer className="w-4 h-4" /> Print Report</button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.03]"><FileDown className="w-4 h-4" /> Download PDF</button>
          <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.03] shadow-md"><X className="w-4 h-4" /> Close</button>
        </div>
      </div>
    </div>
  );
};
const DetailItem: React.FC<{ label: string; value: React.ReactNode; className?: string; isBlock?: boolean }> = 
  ({ label, value, className = '', isBlock = false }) => (
  <div className={`${className} ${isBlock ? 'col-span-full' : ''}`}>
    <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
    <p className={`font-medium text-slate-800 ${isBlock ? 'bg-red-50 p-3 rounded-md border border-red-100 whitespace-pre-wrap' : ''}`}>{value}</p>
  </div>
);

// 5. Insights Panel Component
type InsightsPanelProps = { data: any[]; isOpen: boolean; onClose: () => void; };
const InsightsPanel: React.FC<InsightsPanelProps> = ({ data, isOpen, onClose }) => {
  // Chart Data Preparation
  const typeDistribution = useMemo(() => {
    const counts: { [key: string]: number } = {};
    data.forEach(item => { counts[item.type] = (counts[item.type] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);

  const stateDelayCount = useMemo(() => {
     const stateMap = new Map<string, number>();
     data.forEach(item => { stateMap.set(item.state, (stateMap.get(item.state) || 0) + 1); });
     return Array.from(stateMap.entries()).map(([name, value]) => ({ name, value })).sort((a,b)=>b.value - a.value).slice(0, 10); // Top 10 states
  }, [data]);
  
  // Mock monthly trend data
  const monthlyTrend = [
    { month: 'May', delayed: 8 }, { month: 'Jun', delayed: 10 }, { month: 'Jul', delayed: 7 },
    { month: 'Aug', delayed: 12 }, { month: 'Sep', delayed: 15 }, { month: 'Oct', delayed: 11 },
  ]; 

  const PIE_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042']; // Colors for types

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><BarChart3 className="w-6 h-6 text-indigo-600" /> Delayed Compliance Insights</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
      </div>
      <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
        {/* Compliance Type Pie Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Delayed Cases by Compliance Type</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={typeDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {typeDistribution.map((entry, index) => ( <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} /> ))} </Pie>
                <RechartsTooltip formatter={(value, name) => [`${value} Cases`, name]} /> <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* State-wise Delay Count Bar Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Top 10 States by Delayed Cases</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <BarChart data={stateDelayCount} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /> <XAxis type="number" fontSize={10} />
                <YAxis dataKey="name" type="category" fontSize={10} width={80} interval={0} /> <RechartsTooltip />
                <Bar dataKey="value" fill="#EF4444" name="Delayed Cases" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Monthly Delay Trend Line Chart */}
        <div>
           <h3 className="text-lg font-medium text-slate-700 mb-4">Monthly Trend of Delayed Cases</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer>
               <LineChart data={monthlyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/> <XAxis dataKey="month" fontSize={10} /> <YAxis fontSize={10}/>
                 <RechartsTooltip /> <Legend />
                 <Line type="monotone" dataKey="delayed" name="Delayed Cases" stroke="#EF4444" strokeWidth={2} activeDot={{ r: 6 }}/>
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const DelayedComplianceReportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ financialYear: '2025-2026', state: '', district: '', type: '', delayDuration: '', status: '', dateFrom: '', dateTo: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === 'state') setFilters(prev => ({ ...prev, district: '' }));
  };
  const clearFilters = () => { setFilters({ financialYear: '', state: '', district: '', type: '', delayDuration: '', status: '', dateFrom: '', dateTo: '' }); setSearchQuery(''); setCurrentPage(1); setSortConfig(null); };
  const applyFilters = () => setCurrentPage(1);

  // --- Data Logic ---
  const filteredData = useMemo(() => {
    let data = [...MOCK_DELAYED_DATA];
    // Search
    if (searchQuery) { data = data.filter(item => item.dirId.toLowerCase().includes(searchQuery.toLowerCase()) || item.district.toLowerCase().includes(searchQuery.toLowerCase()) || item.state.toLowerCase().includes(searchQuery.toLowerCase())); }
    // Filters
    // if (filters.financialYear) // Need FY data
    if (filters.state) data = data.filter(item => item.state === filters.state);
    if (filters.district) data = data.filter(item => item.district === filters.district);
    if (filters.type) data = data.filter(item => item.type === filters.type);
    if (filters.status) data = data.filter(item => item.status === filters.status);
    if (filters.delayDuration) {
      const [min, max] = filters.delayDuration.replace(' Days', '').replace('+', '').split('–');
      const minDays = parseInt(min);
      const maxDays = max ? parseInt(max) : Infinity;
      data = data.filter(item => item.delay >= minDays && item.delay <= maxDays);
    }
    // if (filters.dateFrom) // Filter by issuedDate?
    // if (filters.dateTo)
    // Sorting
    if (sortConfig !== null) { data.sort((a, b) => { // @ts-ignore
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1; // @ts-ignore
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1; return 0; }); }
    return data;
  }, [searchQuery, filters, sortConfig]);

  // --- Pagination ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage), [filteredData, currentPage, rowsPerPage]);

  // --- Sorting ---
  const requestSort = (key: string) => { let direction: 'asc' | 'desc' = 'asc'; if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') { direction = 'desc'; } setSortConfig({ key, direction }); };
  
  // --- Summary ---
  const summary = useMemo(() => {
    const totalDelayed = filteredData.length;
    const totalComplied = MOCK_DELAYED_DATA.length * 3; // Mock total complied count
    const totalIssued = totalComplied + totalDelayed; // Mock total issued
    const avgDelay = totalDelayed > 0 ? (filteredData.reduce((sum, item) => sum + item.delay, 0) / totalDelayed).toFixed(0) : 0;
    // Find top delay reason
    const reasonCounts: Record<string, number> = {};
    filteredData.forEach(item => { reasonCounts[item.reason] = (reasonCounts[item.reason] || 0) + 1; });
    const topReason = Object.entries(reasonCounts).sort(([,a],[,b]) => b-a)[0]?.[0] || 'N/A';

    return { totalIssued, totalComplied, totalDelayed, avgDelay: `${avgDelay} Days`, topReason };
  }, [filteredData]);

  // --- Modal ---
  const openModal = (item: any) => { setSelectedItem(item); setIsModalOpen(true); };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-indigo-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
         <header className="mb-6">
           <nav className="flex items-center text-sm font-medium text-slate-500 mb-2"> <LayoutDashboard className="w-4 h-4 mr-1.5" /> Dashboard <ChevronRightIcon className="w-4 h-4 mx-1" /> Reports & Analytics <ChevronRightIcon className="w-4 h-4 mx-1" /> <span className="font-semibold text-indigo-600">Delayed Compliance Report</span> </nav>
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div className="flex items-center space-x-3">
               <span className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-full text-white shadow-lg"><ClipboardCheck className="w-8 h-8" /></span>
               <div> <h1 className="text-3xl font-bold text-slate-800">Delayed Compliance Report</h1> <p className="text-slate-500 mt-1">Monitor delayed directive compliances across states and districts.</p> </div>
             </div>
             <div className="flex items-center gap-2">
               <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.03] shadow-md hover:shadow-lg" onClick={() => setIsInsightsOpen(true)}> <BarChart3 className="w-4 h-4" /> View Insights </button>
               <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export CSV"><FileDown className="w-5 h-5 text-green-600" /></button>
               <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export PDF"><FileDown className="w-5 h-5 text-red-600" /></button>
               <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Refresh"><RefreshCcw className="w-5 h-5 text-blue-600" /></button>
             </div>
           </div>
         </header>
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 mb-6">
           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800"><Filter className="w-5 h-5 text-indigo-600" /> Filters</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4"> {/* More cols */}
             <FormSelect label="FY" name="financialYear" value={filters.financialYear} onChange={handleFilterChange}><option value="">All</option>{mockFinancialYears.map(y=><option key={y} value={y}>{y}</option>)}</FormSelect>
             <FormSelect label="State" name="state" value={filters.state} onChange={handleFilterChange}><option value="">All</option>{mockStates.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             <FormSelect label="District" name="district" value={filters.district} onChange={handleFilterChange}><option value="">All</option>{mockDistricts.filter(d=> filters.state ? MOCK_DELAYED_DATA.find(data => data.state === filters.state && data.district === d) : true).map(d=><option key={d} value={d}>{d}</option>)}</FormSelect>
             <FormSelect label="Compliance Type" name="type" value={filters.type} onChange={handleFilterChange}><option value="">All</option>{mockComplianceTypes.map(t=><option key={t} value={t}>{t}</option>)}</FormSelect>
             <FormSelect label="Delay Duration" name="delayDuration" value={filters.delayDuration} onChange={handleFilterChange}><option value="">All</option>{mockDelayDurations.map(d=><option key={d} value={d}>{d}</option>)}</FormSelect>
             <FormSelect label="Status" name="status" value={filters.status} onChange={handleFilterChange}><option value="">All</option>{mockStatus.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             {/* <div className="grid grid-cols-2 gap-2"><FormInput label="From Date" type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} /><FormInput label="To Date" type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} /></div> */}
             <div className="relative col-span-2">
               <label htmlFor="search" className="block text-sm font-medium text-slate-600 mb-1">Search</label>
               <input type="text" id="search" placeholder="Direction ID/Office..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="block w-full p-2 pl-9 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm"/>
               <Search className="w-4 h-4 text-slate-400 absolute left-3 top-[37px]" />
             </div>
           </div>
           <div className="flex justify-end gap-3 mt-5 border-t border-slate-200 pt-5">
             <button onClick={clearFilters} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.02]"><X className="w-4 h-4" /> Clear Filters</button>
             <button onClick={applyFilters} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.02] shadow-md hover:shadow-lg"><Search className="w-4 h-4" /> Apply Filters</button>
           </div>
         </div>
        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
           <div className="overflow-x-auto">
             <table className="w-full text-sm">
               <thead className="bg-indigo-100 text-indigo-800 font-semibold sticky top-0 z-10">
                 <tr>
                   <th className="px-4 py-3 text-left">Sl.</th>
                   <SortableHeader colKey="dirId" title="Direction ID" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[150px]" />
                   <th className="px-4 py-3 text-left min-w-[200px]">Direction Title</th>
                   <SortableHeader colKey="issuedDate" title="Issued Date" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <SortableHeader colKey="dueDate" title="Due Date" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <SortableHeader colKey="state" title="State" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <SortableHeader colKey="district" title="District" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <th className="px-4 py-3 text-left min-w-[120px]">Type</th>
                   {/* <SortableHeader colKey="status" title="Status" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px]" /> */}
                   <SortableHeader colKey="delay" title="Delay (Days)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[110px] text-right" />
                   <th className="px-4 py-3 text-left min-w-[200px]">Reason for Delay</th>
                   <th className="px-4 py-3 text-left min-w-[200px]">Remarks</th>
                   <SortableHeader colKey="lastUpdated" title="Last Updated" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <th className="px-4 py-3 text-center">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-200">
                 {paginatedData.map((item, index) => (
                   <tr key={item.id} className="hover:bg-indigo-50/70 transition-colors">
                     <td className="px-4 py-3 text-slate-500">{(currentPage-1)*rowsPerPage+index+1}</td>
                     <td className="px-4 py-3 text-slate-700 font-medium">{item.dirId}</td>
                     <td className="px-4 py-3 text-indigo-700 font-semibold truncate max-w-xs">{item.dirTitle}</td>
                     <td className="px-4 py-3 text-slate-700">{new Date(item.issuedDate).toLocaleDateString('en-GB')}</td>
                     <td className="px-4 py-3 text-slate-700">{new Date(item.dueDate).toLocaleDateString('en-GB')}</td>
                     <td className="px-4 py-3 text-slate-700">{item.state}</td>
                     <td className="px-4 py-3 text-slate-700">{item.district}</td>
                     <td className="px-4 py-3 text-slate-700">{item.type}</td>
                     {/* <td className="px-4 py-3"><ComplianceStatusBadge status={item.status as Status} /></td> */}
                     <td className="px-4 py-3 text-red-600 font-bold text-right">{item.delay}</td>
                     <td className="px-4 py-3 text-slate-600 text-xs truncate max-w-xs">{item.reason}</td>
                     <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-xs">{item.remarks}</td>
                     <td className="px-4 py-3 text-slate-700">{new Date(item.lastUpdated).toLocaleDateString('en-GB')}</td>
                     <td className="px-4 py-3 text-center"><button onClick={()=>openModal(item)} className="p-1.5 rounded-md text-indigo-600 hover:bg-indigo-100" title="View Details"><Eye className="w-5 h-5" /></button></td>
                   </tr>
                 ))}
                 {paginatedData.length === 0 && (<tr><td colSpan={13} className="text-center py-10 text-slate-500">No delayed compliance records found.</td></tr>)}
               </tbody>
             </table>
           </div>
           {/* Pagination */}
           {totalPages > 1 && (
             <div className="flex justify-between items-center p-4 border-t border-slate-200 bg-slate-50">
               <div className="flex items-center gap-2"><label htmlFor="rowsPerPage" className="text-xs text-slate-600">Rows:</label><select id="rowsPerPage" value={rowsPerPage} onChange={(e)=>{setRowsPerPage(Number(e.target.value));setCurrentPage(1);}} className="p-1.5 rounded-md border-slate-300 text-xs focus:ring-indigo-500"><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option></select></div>
               <div className="flex items-center gap-3"><span className="text-xs text-slate-600">Page {currentPage} of {totalPages} (Total: {filteredData.length})</span><div className="flex items-center gap-1"><button onClick={()=>setCurrentPage(p=>Math.max(p-1,1))} disabled={currentPage===1} className="p-2 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronLeft className="w-4 h-4"/></button><button onClick={()=>setCurrentPage(p=>Math.min(p+1,totalPages))} disabled={currentPage===totalPages} className="p-2 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronRightIcon className="w-4 h-4"/></button></div></div>
             </div>
           )}
         </div>
        {/* Summary Footer */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mt-6 shadow-sm text-slate-600 text-sm flex flex-col md:flex-row flex-wrap justify-between items-center gap-3">
           <div className="flex flex-wrap items-center gap-x-4 gap-y-1"><span><FileText className="w-4 h-4 inline mr-1 text-blue-600"/><strong>Total Issued:</strong> {summary.totalIssued}</span><span className="text-green-600"><CheckCheck className="w-4 h-4 inline mr-1"/><strong>Complied:</strong> {summary.totalComplied}</span><span className="text-red-600"><ClipboardCheck className="w-4 h-4 inline mr-1"/><strong>Delayed:</strong> {summary.totalDelayed}</span></div>
           <span className="font-semibold text-orange-600"><Timer className="w-4 h-4 inline mr-1"/>Average Delay: {summary.avgDelay}</span>
           <span className="font-semibold text-slate-700">Top Delay Reason: {summary.topReason}</span>
         </div>
        {/* Audit Footer */}
        <footer className="text-center mt-8 text-xs text-slate-500">
           <p>Report Generated By: NSKFDC Officer – Automated System • Generated On: 27 Oct 2025, 19:00 IST</p>
           <p className="mt-1">Data Source: NSKFDC Direction & Compliance Records</p>
         </footer>
        {/* Modals & Panels */}
        <ViewDetailsModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
        <InsightsPanel data={filteredData} isOpen={isInsightsOpen} onClose={() => setIsInsightsOpen(false)} />
        {isInsightsOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsInsightsOpen(false)}></div>}
      </div>
    </div>
  );
};

export default DelayedComplianceReportPage;

// Add this CSS to your global stylesheet (e.g., globals.css) for the modal animation
/*
@keyframes modalEnter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.animate-modal-enter { animation: modalEnter 0.2s ease-out forwards; }
*/