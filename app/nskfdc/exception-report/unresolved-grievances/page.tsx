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
  LayoutDashboard, ChevronRight as ChevronRightIcon, Search, FileDown, RefreshCcw, Filter, X, Calendar,
  ChevronDown, ChevronUp, CheckCircle, Hourglass, AlertCircle, ChevronLeft,
  Users, Building, List, DollarSign, BarChart3, Info, TrendingUp, Package, SlidersHorizontal, ListFilter,
  Eye, Printer, Link as LinkIcon, BadgeCheck, BadgeHelp, BadgeAlert, Clock, MapPin, Target, WalletCards, Briefcase, FileClock, AlertOctagon, Timer,
  ClipboardList, MessageSquareWarning, Siren, Clock10, UserRound, CaseSensitive, ListTodo, FileQuestion, HelpCircle,
} from 'lucide-react';

// --- Mock Data ---

// Helper to calculate days pending
const calculateDaysPending = (submitDate: string): number => {
  const today = new Date();
  const submitted = new Date(submitDate);
  today.setHours(0, 0, 0, 0);
  submitted.setHours(0, 0, 0, 0);
  const diffTime = today.getTime() - submitted.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0; // Show 0 if submitted today or future (invalid case)
};

const MOCK_UNRESOLVED_DATA = [
  { id: 1, grievanceId: 'GRV/2025/0189', benName: 'Pooja Kumari', type: 'Individual', schemeName: 'Self Employment Scheme', state: 'Uttar Pradesh', district: 'Lucknow', category: 'Fund Delay', status: 'Pending', dateSub: '2025-09-29', lastAction: 'Forwarded to State Nodal Officer', remarks: 'Awaiting bank response.', lastUpdated: '2025-10-27', officer: 'R.K. Verma (DNO)' },
  { id: 2, grievanceId: 'GRV/2025/0190', benName: 'Vikash SHG', type: 'SHG', schemeName: 'Sanitary Mart Loan', state: 'Maharashtra', district: 'Nagpur', category: 'Scheme Issue', status: 'Under Review', dateSub: '2025-10-05', lastAction: 'Query raised with SHG Leader', remarks: 'Awaiting clarification on submitted docs.', lastUpdated: '2025-10-26', officer: 'A. Joshi (SNO)' },
  { id: 3, grievanceId: 'GRV/2025/0191', benName: 'Anil Kumar', type: 'Individual', schemeName: 'Education Loan', state: 'Rajasthan', district: 'Jaipur', category: 'Beneficiary Data Error', status: 'Escalated', dateSub: '2025-08-15', lastAction: 'Escalated to HQ due to policy ambiguity', remarks: 'Policy clarification requested.', lastUpdated: '2025-10-25', officer: 'HQ Admin' },
  { id: 4, grievanceId: 'GRV/2025/0192', benName: 'Deepak Sharma', type: 'Individual', schemeName: 'Self Employment Scheme', state: 'Haryana', district: 'Gurugram', category: 'Fund Delay', status: 'Pending', dateSub: '2025-10-10', lastAction: 'Initial review completed', remarks: 'Pending disbursement approval.', lastUpdated: '2025-10-27', officer: 'S. Singh (DNO)' },
  { id: 5, grievanceId: 'GRV/2025/0193', benName: 'Sahara SHG', type: 'SHG', schemeName: 'Mechanized Cleaning Grant', state: 'Gujarat', district: 'Ahmedabad', category: 'Other', status: 'Under Review', dateSub: '2025-10-18', lastAction: 'Technical team reviewing equipment specs', remarks: 'Quotation verified.', lastUpdated: '2025-10-26', officer: 'P. Mehta (SNO)' },
  // Add more data
].map(item => ({
  ...item,
  daysPending: calculateDaysPending(item.dateSub),
}));

const mockStates = [...new Set(MOCK_UNRESOLVED_DATA.map(d => d.state))];
const mockDistricts = [...new Set(MOCK_UNRESOLVED_DATA.map(d => d.district))]; // Simplified
const mockFinancialYears = ['2025-2026', '2024-2025', '2023-2024'];
const mockGrievanceTypes = ['Individual', 'SHG', 'NGO', 'Other'];
const mockCategories = ['Fund Delay', 'Scheme Issue', 'Beneficiary Data Error', 'Other', 'Safety', 'Harassment'];
const mockStatus = ['Pending', 'Under Review', 'Escalated'];
const mockDurations = ['0-15', '16-30', '31-60', '60+'];

// --- Reusable Components ---

// 1. Status Badge Component
type Status = 'Pending' | 'Under Review' | 'Escalated';
const GrievanceStatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const config = {
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Hourglass, label: 'Pending' },
    'Under Review': { bg: 'bg-orange-100', text: 'text-orange-700', icon: FileClock, label: 'Under Review' },
    Escalated: { bg: 'bg-red-100', text: 'text-red-700', icon: Siren, label: 'Escalated' },
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
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-yellow-50 to-orange-50">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FileQuestion className="w-6 h-6 text-orange-600" /> Unresolved Grievance Details</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
        </div>
        <div className="p-6 space-y-5 overflow-y-auto">
          <h3 className="text-lg font-bold text-indigo-700">{item.grievanceId} - {item.benName}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
             <DetailItem label="Grievance ID" value={item.grievanceId} />
             <DetailItem label="Beneficiary Name" value={item.benName} />
             <DetailItem label="Beneficiary Type" value={item.type} />
             <DetailItem label="Scheme Name" value={item.schemeName} />
             <DetailItem label="State" value={item.state} />
             <DetailItem label="District" value={item.district} />
             <DetailItem label="Grievance Category" value={item.category} />
             <DetailItem label="Status" value={<GrievanceStatusBadge status={item.status as Status} />} />
             <DetailItem label="Days Pending" value={`${item.daysPending} Days`} className="font-bold text-red-700"/>
             <DetailItem label="Date Submitted" value={new Date(item.dateSub).toLocaleDateString('en-GB')} />
             <DetailItem label="Responsible Officer" value={item.officer || 'N/A'} />
             <DetailItem label="Last Updated" value={new Date(item.lastUpdated).toLocaleDateString('en-GB')} />
          </div>
           <DetailItem label="Last Action Taken" value={item.lastAction || 'N/A'} className="md:col-span-3 font-medium" isBlock />
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
    <p className={`font-medium text-slate-800 ${isBlock ? 'bg-slate-50 p-3 rounded-md border border-slate-200 whitespace-pre-wrap' : ''}`}>{value}</p>
  </div>
);


// 5. Insights Panel Component
type InsightsPanelProps = { data: any[]; isOpen: boolean; onClose: () => void; };
const InsightsPanel: React.FC<InsightsPanelProps> = ({ data, isOpen, onClose }) => {
  // Chart Data Preparation
  const statusCounts = useMemo(() => {
    const counts: Record<Status, number> = { Pending: 0, 'Under Review': 0, Escalated: 0 };
    data.forEach(item => { if (item.status in counts) counts[item.status as Status]++; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);

  const stateCounts = useMemo(() => {
     const stateMap = new Map<string, number>();
     data.forEach(item => { stateMap.set(item.state, (stateMap.get(item.state) || 0) + 1); });
     return Array.from(stateMap.entries()).map(([name, value]) => ({ name, value })).sort((a,b)=>b.value - a.value).slice(0, 10); // Top 10 states
  }, [data]);
  
  // Mock monthly trend data
  const monthlyTrend = [
    { month: 'May', unresolved: 15, resolved: 10 }, { month: 'Jun', unresolved: 18, resolved: 12 }, { month: 'Jul', unresolved: 20, resolved: 15 },
    { month: 'Aug', unresolved: 25, resolved: 18 }, { month: 'Sep', unresolved: 28, resolved: 20 }, { month: 'Oct', unresolved: 22, resolved: 25 },
  ]; // Mock data

  const PIE_COLORS: Record<Status, string> = { Pending: '#F59E0B', 'Under Review': '#F97316', Escalated: '#EF4444' }; // Yellow, Orange, Red

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><BarChart3 className="w-6 h-6 text-indigo-600" /> Unresolved Grievance Insights</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
      </div>
      <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
        {/* Status Distribution Pie Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Distribution by Status</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {statusCounts.map((entry, index) => ( <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name as Status]} /> ))} </Pie>
                <RechartsTooltip formatter={(value, name) => [`${value} Cases`, name]} /> <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* State-wise Count Bar Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Top 10 States by Unresolved Grievances</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <BarChart data={stateCounts} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /> <XAxis type="number" fontSize={10} />
                <YAxis dataKey="name" type="category" fontSize={10} width={80} interval={0} /> <RechartsTooltip />
                <Bar dataKey="value" fill="#F97316" name="Unresolved Cases" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Monthly Trend Line Chart */}
        <div>
           <h3 className="text-lg font-medium text-slate-700 mb-4">Monthly Trend (Unresolved vs Resolved)</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer>
               <LineChart data={monthlyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/> <XAxis dataKey="month" fontSize={10} /> <YAxis fontSize={10}/>
                 <RechartsTooltip /> <Legend />
                 <Line type="monotone" dataKey="unresolved" name="Unresolved" stroke="#EF4444" strokeWidth={2}/>
                 <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#10B981" strokeWidth={2} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const UnresolvedGrievanceReportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ financialYear: '2025-2026', state: '', district: '', type: '', category: '', status: '', duration: '', dateFrom: '', dateTo: '' });
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
  const clearFilters = () => { setFilters({ financialYear: '', state: '', district: '', type: '', category: '', status: '', duration: '', dateFrom: '', dateTo: '' }); setSearchQuery(''); setCurrentPage(1); setSortConfig(null); };
  const applyFilters = () => setCurrentPage(1);

  // --- Data Logic ---
  const filteredData = useMemo(() => {
    let data = [...MOCK_UNRESOLVED_DATA];
    // Search
    if (searchQuery) { data = data.filter(item => item.grievanceId.toLowerCase().includes(searchQuery.toLowerCase()) || item.benName.toLowerCase().includes(searchQuery.toLowerCase())); }
    // Filters
    // if (filters.financialYear) // Need FY data
    if (filters.state) data = data.filter(item => item.state === filters.state);
    if (filters.district) data = data.filter(item => item.district === filters.district);
    if (filters.type) data = data.filter(item => item.type === filters.type);
    if (filters.category) data = data.filter(item => item.category === filters.category);
    if (filters.status) data = data.filter(item => item.status === filters.status);
    if (filters.duration) {
      const [min, max] = filters.duration.replace('+', '').split('–');
      const minDays = parseInt(min); const maxDays = max ? parseInt(max) : Infinity;
      data = data.filter(item => item.daysPending >= minDays && item.daysPending <= maxDays);
    }
    // if (filters.dateFrom) // Filter by dateSub?
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
    const totalReceived = MOCK_UNRESOLVED_DATA.length + 1045; // Mock total received
    const totalUnresolved = filteredData.length;
    const totalResolved = totalReceived - totalUnresolved;
    const avgPending = totalUnresolved > 0 ? (filteredData.reduce((sum, item) => sum + item.daysPending, 0) / totalUnresolved).toFixed(0) : 0;
    // Top category/state
    const categoryCounts: Record<string, number> = {}; filteredData.forEach(item => { categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1; });
    const topCategory = Object.entries(categoryCounts).sort(([,a],[,b]) => b-a)[0]?.[0] || 'N/A';
    const stateCounts: Record<string, number> = {}; filteredData.forEach(item => { stateCounts[item.state] = (stateCounts[item.state] || 0) + 1; });
    const topState = Object.entries(stateCounts).sort(([,a],[,b]) => b-a)[0]?.[0] || 'N/A';

    return { totalReceived, totalResolved, totalUnresolved, avgPending: `${avgPending} Days`, topCategory, topState };
  }, [filteredData]);

  // --- Modal ---
  const openModal = (item: any) => { setSelectedItem(item); setIsModalOpen(true); };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Title Section - Remove icon, keep text in place, apply gradient background */}
        <header className="mb-6">
          <nav className="flex items-center text-sm font-medium text-slate-500 mb-2"> Dashboard <ChevronRightIcon className="w-4 h-4 mx-1" /> Exception Reports <ChevronRightIcon className="w-4 h-4 mx-1" /> <span className="font-semibold text-indigo-600">Unresolved Grievances</span> </nav>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-3 rounded-xl px-6 py-4 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow">Unresolved Grievances Report</h1>
                <p className="text-indigo-100 mt-1 font-medium">Track and analyze unresolved grievances across districts.</p>
              </div>
            </div>
          </div>
        </header>
        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 mb-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            <FormSelect label="FY" name="financialYear" value={filters.financialYear} onChange={handleFilterChange}><option value="">All</option>{mockFinancialYears.map(y=><option key={y} value={y}>{y}</option>)}</FormSelect>
            <FormSelect label="State" name="state" value={filters.state} onChange={handleFilterChange}><option value="">All</option>{mockStates.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
            <FormSelect label="District" name="district" value={filters.district} onChange={handleFilterChange}><option value="">All</option>{mockDistricts.filter(d=> filters.state ? MOCK_UNRESOLVED_DATA.find(data => data.state === filters.state && data.district === d) : true).map(d=><option key={d} value={d}>{d}</option>)}</FormSelect>
            <FormSelect label="Type" name="type" value={filters.type} onChange={handleFilterChange}><option value="">All</option>{mockGrievanceTypes.map(t=><option key={t} value={t}>{t}</option>)}</FormSelect>
            <FormSelect label="Category" name="category" value={filters.category} onChange={handleFilterChange}><option value="">All</option>{mockCategories.map(c=><option key={c} value={c}>{c}</option>)}</FormSelect>
            <FormSelect label="Status" name="status" value={filters.status} onChange={handleFilterChange}><option value="">All</option>{mockStatus.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
            <FormSelect label="Duration" name="duration" value={filters.duration} onChange={handleFilterChange}><option value="">All</option>{mockDurations.map(d=><option key={d} value={d}>{d+' Days'}</option>)}</FormSelect>
            {/* <div className="grid grid-cols-2 gap-2"><FormInput label="From Date" type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} /><FormInput label="To Date" type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} /></div> */}
            <div className="relative col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1"> {/* Adjusted span */}
               <label htmlFor="search" className="block text-sm font-medium text-slate-600 mb-1">Search</label>
               <input type="text" id="search" placeholder="ID/Name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="block w-full p-2 pl-9 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm"/>
               <Search className="w-4 h-4 text-slate-400 absolute left-3 top-[37px]" />
             </div>
           </div>
           <div className="flex justify-end gap-3 mt-5 border-t border-slate-200 pt-5">
             <button onClick={clearFilters} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.02]"><X className="w-4 h-4" /> Clear Filters</button>
             <button onClick={applyFilters} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.02] shadow-md hover:shadow-lg"><Search className="w-4 h-4" /> Apply Filters</button>
           </div>
         </div>
         {/* Export/Reload Section - moved below Filters */}
         <div className="flex flex-wrap gap-2 mb-6">
           <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-[1.03] shadow-md hover:shadow-lg" onClick={() => setIsInsightsOpen(true)}>
             <BarChart3 className="w-4 h-4" /> View Insights
           </button>
           <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export CSV">
             <FileDown className="w-5 h-5 text-green-600" />
           </button>
           <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export PDF">
             <FileDown className="w-5 h-5 text-red-600" />
           </button>
           <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Refresh">
             <RefreshCcw className="w-5 h-5 text-blue-600" />
           </button>
         </div>
         {/* Table Section - colorful header, striped rows, hover, rounded corners, shadow */}
         <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden w-full">
           <div className="overflow-x-auto">
             <table className="w-full text-sm">
               <thead className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold">
                 <tr>
                   <th className="px-4 py-3 text-left">Sl.</th>
                   <th className="px-4 py-3 text-left min-w-[150px]">State</th>
                   <th className="px-4 py-3 text-left min-w-[150px]">District</th>
                   <th className="px-4 py-3 text-left min-w-[200px]">Grievance Type</th>
                   <th className="px-4 py-3 text-left min-w-[100px]">Status</th>
                   <th className="px-4 py-3 text-left min-w-[140px]">Last Action</th>
                   <th className="px-4 py-3 text-left min-w-[140px]">Remarks</th>
                   <th className="px-4 py-3 text-left min-w-[120px]">Last Updated</th>
                   <th className="px-4 py-3 text-center">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {paginatedData.map((item, index) => (
                   <tr key={item.id} className={index % 2 === 0 ? "bg-white hover:bg-indigo-50/70 transition-colors" : "bg-indigo-50/40 hover:bg-indigo-100 transition-colors"}>
                     <td className="px-4 py-3 text-slate-500">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                     <td className="px-4 py-3 text-slate-700">{item.state}</td>
                     <td className="px-4 py-3 text-slate-700">{item.district}</td>
                     <td className="px-4 py-3 text-slate-700">{item.grievanceId}</td>
                     <td className="px-4 py-3 text-slate-700">{item.status}</td>
                     <td className="px-4 py-3 text-slate-600 text-xs truncate max-w-xs">{item.lastAction}</td>
                     <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-xs">{item.remarks}</td>
                     <td className="px-4 py-3 text-slate-700">{new Date(item.lastUpdated).toLocaleDateString('en-GB')}</td>
                     <td className="px-4 py-3 text-center"><button onClick={()=>openModal(item)} className="p-1.5 rounded-md text-indigo-600 hover:bg-indigo-100" title="View Details"><Eye className="w-5 h-5" /></button></td>
                   </tr>
                 ))}
                 {paginatedData.length === 0 && (<tr><td colSpan={12} className="text-center py-10 text-slate-500">No unresolved grievances found.</td></tr>)}
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
           <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span><ListTodo className="w-4 h-4 inline mr-1 text-blue-600"/><strong>Total Received:</strong> {summary.totalReceived.toLocaleString('en-IN')}</span>
                <span className="text-green-600"><CheckCircle className="w-4 h-4 inline mr-1"/><strong>Resolved:</strong> {summary.totalResolved.toLocaleString('en-IN')}</span>
                <span className="text-red-600"><Hourglass className="w-4 h-4 inline mr-1"/><strong>Unresolved:</strong> {summary.totalUnresolved.toLocaleString('en-IN')}</span>
            </div>
           <span className="font-semibold text-orange-600"><Timer className="w-4 h-4 inline mr-1"/>Avg. Pending: {summary.avgPending}</span>
           <span className="font-semibold text-slate-700">Top Issue: {summary.topCategory}</span>
           <span className="font-semibold text-slate-700">Top State: {summary.topState}</span>
         </div>
        {/* Audit Footer */}
        <footer className="text-center mt-8 text-xs text-slate-500">
           <p>Report Generated By: NSKFDC Officer – Automated System • Generated On: 27 Oct 2025, 19:10 IST</p>
           <p className="mt-1">Data Source: NSKFDC Grievance Records</p>
         </footer>
        {/* Modals & Panels */}
        <ViewDetailsModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
        <InsightsPanel data={filteredData} isOpen={isInsightsOpen} onClose={() => setIsInsightsOpen(false)} />
        {isInsightsOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsInsightsOpen(false)}></div>}
      </div>
    </div>
  );
};

export default UnresolvedGrievanceReportPage;

// Add this CSS to your global stylesheet (e.g., globals.css) for the modal animation
/*
@keyframes modalEnter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.animate-modal-enter { animation: modalEnter 0.2s ease-out forwards; }
*/