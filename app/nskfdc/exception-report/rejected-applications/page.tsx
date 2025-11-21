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
  LayoutDashboard,
  ChevronRight as ChevronRightIcon,
  Search,
  FileDown,
  RefreshCcw,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  BarChart3,
  Package,
  Eye,
  Printer,
  FileX2,
  UserCog,
  TowerControl,
  Server
} from 'lucide-react';

// --- Mock Data ---

const MOCK_REJECTED_DATA = [
  { id: 1, appId: 'APP/2025/0145', benName: 'Sunita Devi', schemeName: 'Self Employment Scheme', benType: 'Individual', state: 'Bihar', district: 'Patna', dateSub: '2025-08-10', dateRej: '2025-08-25', rejLevel: 'District Nodal', rejReason: 'Missing Income Certificate', remarks: 'Asked to reapply with correct document', lastUpdated: '2025-10-26', rejBy: 'Anil Kumar (DN)', reviewedBy: 'State Nodal Officer', contact: 'District Office' },
  { id: 2, appId: 'APP/2025/0146', benName: 'Rakesh SHG', schemeName: 'Sanitary Mart Loan', benType: 'SHG', state: 'Maharashtra', district: 'Pune', dateSub: '2025-07-15', dateRej: '2025-08-05', rejLevel: 'State Nodal', rejReason: 'Eligibility Issue - SHG Not Registered > 1 Year', remarks: 'Advised to register SHG properly and reapply later.', lastUpdated: '2025-10-25', rejBy: 'Priya Singh (SN)', reviewedBy: 'HQ Officer', contact: 'State Office' },
  { id: 3, appId: 'APP/2025/0147', benName: 'Amit Kumar', schemeName: 'Education Loan', benType: 'Individual', state: 'Uttar Pradesh', district: 'Lucknow', dateSub: '2025-09-01', dateRej: '2025-09-20', rejLevel: 'HQ Level', rejReason: 'Data Mismatch in Aadhaar & Application', remarks: 'Beneficiary contacted to rectify data.', lastUpdated: '2025-10-24', rejBy: 'S. Verma (HQ)', reviewedBy: 'Director', contact: 'HQ Office' },
  { id: 4, appId: 'APP/2025/0148', benName: 'Jyoti SHG', schemeName: 'Mechanized Cleaning Grant', benType: 'SHG', state: 'Gujarat', district: 'Ahmedabad', dateSub: '2025-08-20', dateRej: '2025-09-05', rejLevel: 'District Nodal', rejReason: 'Document Error - Quotation Invalid', remarks: 'Requested revised quotation.', lastUpdated: '2025-10-23', rejBy: 'R. Patel (DN)', reviewedBy: 'State Nodal Officer', contact: 'District Office' },
  { id: 5, appId: 'APP/2025/0149', benName: 'Manoj Singh', schemeName: 'Self Employment Scheme', benType: 'Individual', state: 'Rajasthan', district: 'Jaipur', dateSub: '2025-09-10', dateRej: '2025-09-25', rejLevel: 'State Nodal', rejReason: 'Other - Scheme Quota Exhausted for FY', remarks: 'Applicant informed, can apply next FY.', lastUpdated: '2025-10-22', rejBy: 'M. Sharma (SN)', reviewedBy: 'HQ Officer', contact: 'State Office' },
  // Add more data
];

const mockSchemes = [...new Set(MOCK_REJECTED_DATA.map(d => d.schemeName))];
const mockBenTypes = ['Individual', 'SHG'];
const mockStates = [...new Set(MOCK_REJECTED_DATA.map(d => d.state))];
const mockDistricts = [...new Set(MOCK_REJECTED_DATA.map(d => d.district))]; // Simplified
const mockFinancialYears = ['2025-2026', '2024-2025', '2023-2024'];
const mockRejectionLevels = ['District Nodal', 'State Nodal', 'HQ Level'];
const mockRejectionReasons = ['Document Error', 'Eligibility Issue', 'Data Mismatch', 'Other', 'Scheme Quota Exhausted for FY', 'Missing Income Certificate', 'Quotation Invalid'];

// --- Reusable Components ---

// 1. Rejection Level Badge
type RejectionLevel = 'District Nodal' | 'State Nodal' | 'HQ Level';
const RejectionLevelBadge: React.FC<{ level: RejectionLevel }> = ({ level }) => {
  const config = {
    'District Nodal': { bg: 'bg-orange-100', text: 'text-orange-700', icon: UserCog, label: 'District Nodal' },
    'State Nodal': { bg: 'bg-blue-100', text: 'text-blue-700', icon: TowerControl, label: 'State Nodal' },
    'HQ Level': { bg: 'bg-red-100', text: 'text-red-700', icon: Server, label: 'HQ Level' },
  }[level];

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

// --- Currency Formatter --- (Not needed here, but kept for consistency)
const formatCurrency = (amount: number) => amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });

// 4. View Details Modal
type DetailsModalProps = { item: any | null; isOpen: boolean; onClose: () => void; };
const ViewDetailsModal: React.FC<DetailsModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-modal-enter">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-red-50 to-orange-50">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FileX2 className="w-6 h-6 text-red-600" /> Rejected Application Details</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
        </div>
        <div className="p-6 space-y-5 overflow-y-auto">
          <h3 className="text-lg font-bold text-red-700">{item.appId} - {item.benName}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
            <DetailItem label="Application ID" value={item.appId} />
            <DetailItem label="Beneficiary Name" value={item.benName} />
            <DetailItem label="Beneficiary Type" value={item.benType} />
            <DetailItem label="Scheme Name" value={item.schemeName} />
            <DetailItem label="State" value={item.state} />
            <DetailItem label="District" value={item.district} />
            <DetailItem label="Date of Submission" value={new Date(item.dateSub).toLocaleDateString('en-GB')} />
            <DetailItem label="Date of Rejection" value={new Date(item.dateRej).toLocaleDateString('en-GB')} className="font-bold text-red-700"/>
            <DetailItem label="Rejection Level" value={<RejectionLevelBadge level={item.rejLevel as RejectionLevel} />} />
          </div>
           <DetailItem label="Rejection Reason" value={item.rejReason} className="md:col-span-3 font-medium text-red-800" isBlock />
           <DetailItem label="Remarks" value={item.remarks || 'N/A'} className="md:col-span-3" isBlock />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
            <DetailItem label="Rejected By" value={item.rejBy || 'N/A'} />
            <DetailItem label="Contact Person/Office" value={item.contact || 'N/A'} />
            <DetailItem label="Reviewed By" value={item.reviewedBy || 'N/A'} />
            <DetailItem label="Last Updated" value={new Date(item.lastUpdated).toLocaleDateString('en-GB')} className="md:col-span-3"/>
           </div>
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
  const rejectionLevelCounts = useMemo(() => {
    const counts: Record<RejectionLevel, number> = { 'District Nodal': 0, 'State Nodal': 0, 'HQ Level': 0 };
    data.forEach(item => { counts[item.rejLevel as RejectionLevel]++; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);

  const schemeRejectionCounts = useMemo(() => {
     const schemeMap = new Map<string, number>();
     data.forEach(item => { schemeMap.set(item.schemeName, (schemeMap.get(item.schemeName) || 0) + 1); });
     return Array.from(schemeMap.entries()).map(([name, value]) => ({ name, value })).sort((a,b)=>b.value - a.value).slice(0, 5); // Top 5 schemes
  }, [data]);
  
  // Mock monthly trend data
  const monthlyTrend = [
    { month: 'May', rejections: 5 }, { month: 'Jun', rejections: 8 }, { month: 'Jul', rejections: 6 },
    { month: 'Aug', rejections: 10 }, { month: 'Sep', rejections: 12 }, { month: 'Oct', rejections: 9 },
  ]; 

  const PIE_COLORS: Record<RejectionLevel, string> = { 'District Nodal': '#F97316', 'State Nodal': '#3B82F6', 'HQ Level': '#EF4444' }; // Orange, Blue, Red

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><BarChart3 className="w-6 h-6 text-indigo-600" /> Rejection Insights</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
      </div>
      <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
        {/* Rejection by Level Pie Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Rejection Distribution by Level</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={rejectionLevelCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {rejectionLevelCounts.map((entry, index) => ( <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name as RejectionLevel]} /> ))} </Pie>
                <RechartsTooltip formatter={(value, name) => [`${value} Rejections`, name]} /> <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Rejections by Scheme Bar Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Top 5 Schemes by Rejection Count</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <BarChart data={schemeRejectionCounts} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /> <XAxis type="number" fontSize={10} />
                <YAxis dataKey="name" type="category" fontSize={10} width={100} interval={0} /> <RechartsTooltip />
                <Bar dataKey="value" fill="#EF4444" name="Rejections" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Monthly Rejection Trend Line Chart */}
        <div>
           <h3 className="text-lg font-medium text-slate-700 mb-4">Monthly Rejection Trend</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer>
               <LineChart data={monthlyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/> <XAxis dataKey="month" fontSize={10} /> <YAxis fontSize={10}/>
                 <RechartsTooltip /> <Legend />
                 <Line type="monotone" dataKey="rejections" name="Rejections" stroke="#EF4444" strokeWidth={2} activeDot={{ r: 6 }}/>
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const RejectedApplicationsReportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ financialYear: '2025-2026', schemeName: '', benType: '', state: '', district: '', rejLevel: '', rejReason: '', dateFrom: '', dateTo: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
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
    if (e.target.name === 'state') setFilters(prev => ({ ...prev, district: '' }));
  };
  const clearFilters = () => { setFilters({ financialYear: '', schemeName: '', benType: '', state: '', district: '', rejLevel: '', rejReason: '', dateFrom: '', dateTo: '' }); setSearchQuery(''); setCurrentPage(1); setSortConfig(null); };
  const applyFilters = () => setCurrentPage(1);

  // --- Data Logic ---
  const filteredData = useMemo(() => {
    let data = [...MOCK_REJECTED_DATA];
    // Search
    if (searchQuery) { data = data.filter(item => item.appId.toLowerCase().includes(searchQuery.toLowerCase()) || item.benName.toLowerCase().includes(searchQuery.toLowerCase())); }
    // Filters
    // if (filters.financialYear) // Need FY data
    if (filters.schemeName) data = data.filter(item => item.schemeName === filters.schemeName);
    if (filters.benType) data = data.filter(item => item.benType === filters.benType);
    if (filters.state) data = data.filter(item => item.state === filters.state);
    if (filters.district) data = data.filter(item => item.district === filters.district);
    if (filters.rejLevel) data = data.filter(item => item.rejLevel === filters.rejLevel);
    if (filters.rejReason) data = data.filter(item => item.rejReason === filters.rejReason);
    if (filters.dateFrom) data = data.filter(item => new Date(item.dateSub) >= new Date(filters.dateFrom));
    if (filters.dateTo) data = data.filter(item => new Date(item.dateSub) <= new Date(filters.dateTo));
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
    const total = filteredData.length;
    const districtCount = filteredData.filter(d => d.rejLevel === 'District Nodal').length;
    const stateCount = filteredData.filter(d => d.rejLevel === 'State Nodal').length;
    const hqCount = filteredData.filter(d => d.rejLevel === 'HQ Level').length;
    // Find top rejection reason
    const reasonCounts: Record<string, number> = {};
    filteredData.forEach(item => { reasonCounts[item.rejReason] = (reasonCounts[item.rejReason] || 0) + 1; });
    const topReason = Object.entries(reasonCounts).sort(([,a],[,b]) => b-a)[0]?.[0] || 'N/A';

    return { total, districtCount, stateCount, hqCount, topReason, totalSchemes: new Set(filteredData.map(d=>d.schemeName)).size };
  }, [filteredData]);

  // --- Modal ---
  const openModal = (item: any) => { setSelectedItem(item); setIsModalOpen(true); };
  const closeModal = () => setIsModalOpen(false);

  if (loading) return (
    <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
      <style jsx>{`
      .loader {
        --c: no-repeat linear-gradient(#4f46e5 0 0);
        background: 
          var(--c),var(--c),var(--c),
          var(--c),var(--c),var(--c),
          var(--c),var(--c),var(--c);
        background-size: 16px 16px;
        animation: 
          l32-1 1s infinite,
          l32-2 1s infinite;
      }
      @keyframes l32-1 {
        0%,100% {width:45px;height: 45px}
        35%,65% {width:65px;height: 65px}
      }
      @keyframes l32-2 {
        0%,40%  {background-position: 0 0,0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,  50% 50% }
        60%,100%{background-position: 0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,0 0,  50% 50% }
      }
    `}</style>
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
         <header className="mb-6">
           <nav className="flex items-center text-sm font-medium text-slate-500 mb-2"> Dashboard <ChevronRightIcon className="w-4 h-4 mx-1" /> Exception Reports <ChevronRightIcon className="w-4 h-4 mx-1" /> <span className="font-semibold text-indigo-600">Rejected Applications</span> </nav>
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div className="flex items-center space-x-3 rounded-xl px-6 py-4 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
               <div> <h1 className="text-3xl font-bold text-white drop-shadow">Rejected Applications Report</h1> <p className="text-indigo-100 mt-1 font-medium">Monitor rejected applications and analyze reasons.</p> </div>
             </div>
           </div>
         </header>
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 mb-4">
           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">Filters</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
             <FormSelect label="FY" name="financialYear" value={filters.financialYear} onChange={handleFilterChange}><option value="">All</option>{mockFinancialYears.map(y=><option key={y} value={y}>{y}</option>)}</FormSelect>
             <FormSelect label="Scheme" name="schemeName" value={filters.schemeName} onChange={handleFilterChange}><option value="">All</option>{mockSchemes.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             <FormSelect label="Beneficiary Type" name="benType" value={filters.benType} onChange={handleFilterChange}><option value="">All</option>{mockBenTypes.map(t=><option key={t} value={t}>{t}</option>)}</FormSelect>
             <FormSelect label="State" name="state" value={filters.state} onChange={handleFilterChange}><option value="">All</option>{mockStates.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             <FormSelect label="District" name="district" value={filters.district} onChange={handleFilterChange}><option value="">All</option>{mockDistricts.filter(d=> filters.state ? MOCK_REJECTED_DATA.find(data => data.state === filters.state && data.district === d) : true).map(d=><option key={d} value={d}>{d}</option>)}</FormSelect>
             <FormSelect label="Rejection Level" name="rejLevel" value={filters.rejLevel} onChange={handleFilterChange}><option value="">All</option>{mockRejectionLevels.map(l=><option key={l} value={l}>{l}</option>)}</FormSelect>
             <div className="relative col-span-2">
               <label htmlFor="search" className="block text-sm font-medium text-slate-600 mb-1">Search</label>
               <input type="text" id="search" placeholder="App ID / Beneficiary..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="block w-full p-2 pl-9 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm"/>
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
        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden w-full">
           <div className="overflow-x-auto">
             <table className="w-full text-sm">
               <thead className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold">
                 <tr>
                   <th className="px-4 py-3 text-left">Sl.</th>
                   <SortableHeader colKey="appId" title="App ID" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <SortableHeader colKey="benName" title="Beneficiary Name" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[180px]" />
                   <SortableHeader colKey="schemeName" title="Scheme" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[200px]" />
                   <SortableHeader colKey="benType" title="Type" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[100px]" />
                   <SortableHeader colKey="state" title="State" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <SortableHeader colKey="district" title="District" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <SortableHeader colKey="dateSub" title="Submitted" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <SortableHeader colKey="dateRej" title="Rejected" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px] text-red-700" />
                   <SortableHeader colKey="rejLevel" title="Level" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <SortableHeader colKey="rejReason" title="Reason" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[180px]" />
                   <th className="px-4 py-3 text-left min-w-[180px]">Remarks</th>
                   <SortableHeader colKey="lastUpdated" title="Last Updated" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <th className="px-4 py-3 text-center">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {paginatedData.map((item, index) => (
                   <tr key={item.id} className={index % 2 === 0 ? "bg-white hover:bg-indigo-50/70 transition-colors" : "bg-indigo-50/40 hover:bg-indigo-100 transition-colors"}>
                     <td className="px-4 py-3 text-slate-500">{(currentPage-1)*rowsPerPage+index+1}</td>
                     <td className="px-4 py-3 text-slate-700 font-medium">{item.appId}</td>
                     <td className="px-4 py-3 text-indigo-700 font-semibold">{item.benName}</td>
                     <td className="px-4 py-3 text-slate-700">{item.schemeName}</td>
                     <td className="px-4 py-3 text-slate-700">{item.benType}</td>
                     <td className="px-4 py-3 text-slate-700">{item.state}</td>
                     <td className="px-4 py-3 text-slate-700">{item.district}</td>
                     <td className="px-4 py-3 text-slate-700">{new Date(item.dateSub).toLocaleDateString('en-GB')}</td>
                     <td className="px-4 py-3 text-red-700 font-medium">{new Date(item.dateRej).toLocaleDateString('en-GB')}</td>
                     <td className="px-4 py-3"><RejectionLevelBadge level={item.rejLevel as RejectionLevel} /></td>
                     <td className="px-4 py-3 text-slate-600 text-xs truncate max-w-xs">{item.rejReason}</td>
                     <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-xs">{item.remarks}</td>
                     <td className="px-4 py-3 text-slate-700">{new Date(item.lastUpdated).toLocaleDateString('en-GB')}</td>
                     <td className="px-4 py-3 text-center"><button onClick={()=>openModal(item)} className="p-1.5 rounded-md text-indigo-600 hover:bg-indigo-100" title="View Details"><Eye className="w-5 h-5" /></button></td>
                   </tr>
                 ))}
                 {paginatedData.length === 0 && (<tr><td colSpan={14} className="text-center py-10 text-slate-500">No rejected applications found.</td></tr>)}
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
        <div className="bg-white border border-slate-200 rounded-xl p-4 mt-6 shadow-sm text-slate-600 text-sm flex flex-col md:flex-row flex-wrap justify-between items-center gap-3">
           <div className="flex flex-wrap items-center gap-x-4 gap-y-1"><span><strong>Total Rejected:</strong> {summary.total}</span><span className="font-semibold text-orange-700"><strong>District Nodal:</strong> {summary.districtCount}</span><span className="font-semibold text-blue-700"><strong>State Nodal:</strong> {summary.stateCount}</span><span className="font-semibold text-red-700"><strong>HQ Level:</strong> {summary.hqCount}</span><span className="font-semibold text-indigo-700"><strong>Top Reason:</strong> {summary.topReason}</span></div>
           <span><strong>Total Schemes:</strong> {summary.totalSchemes}</span>
         </div>
        {/* Audit Footer */}
        <footer className="text-center mt-8 text-xs text-slate-500">
           <p>Report Generated By: NSKFDC Officer – Automated Reporting System • Generated On: 27 Oct 2025, 18:35 IST</p>
           <p className="mt-1">Data Source: NSKFDC Application Records & Exception Logs</p>
         </footer>
        {/* Modals & Panels */}
        <ViewDetailsModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
        <InsightsPanel data={filteredData} isOpen={isInsightsOpen} onClose={() => setIsInsightsOpen(false)} />
        {isInsightsOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsInsightsOpen(false)}></div>}
      </div>
    </div>
    );
  };

export default RejectedApplicationsReportPage;

// Add this CSS to your global stylesheet (e.g., globals.css) for the modal animation
/*
@keyframes modalEnter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.animate-modal-enter { animation: modalEnter 0.2s ease-out forwards; }
*/