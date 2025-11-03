// This is your page.tsx file
// Ensure you have React, TailwindCSS, recharts, and lucide-react installed:
// npm install recharts lucide-react

'use client'; // For Next.js App Router

import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar
} from 'recharts';
import {
  LayoutDashboard, ChevronRight as ChevronRightIcon, Search, FileDown, RefreshCcw, Filter, X, Calendar,
  ChevronDown, ChevronUp, CheckCircle, Hourglass, XCircle, ChevronLeft,
  Users, Building, List, DollarSign, BarChart3, Info, TrendingUp, Package, SlidersHorizontal, ListFilter,
  Eye, Printer, Link as LinkIcon, BadgeCheck, BadgeHelp, BadgeAlert, Clock, MapPin, Target, WalletCards, Briefcase, FileClock, AlertOctagon, Timer,
  ClipboardList, Megaphone, ShieldCheck, FileCheck, Upload, FileWarning, AlertCircle as AlertCircleIcon, Send, Loader2, BookOpen, HandHeart, CheckSquare, ListTodo, FileQuestion, HelpCircle, FileDigit, ShieldQuestion, HeartHandshake, Sparkles, Receipt, Paperclip, UploadCloud, CalendarCheck, Percent, Wallet, Banknote, Landmark, Calculator, InfoIcon, Award, Activity, Medal, Trophy, Zap, Map as MapIcon, TrendingDown,
} from 'lucide-react';
import { Trash2, HandCoins, ListChecks, Download } from 'lucide-react';
import { Button as GradientButton } from '@/components/ui/button';
import StatCard from '@/components/ui/stat-card';

// --- Mock Data ---

// Helper to calculate utilization % and status
type UtilizationStatus = 'Fully Utilized' | 'Partially Utilized' | 'Not Utilized';
const calculateUtilization = (released: number, utilized: number): { percent: number, status: UtilizationStatus } => {
  if (released === 0) return { percent: 0, status: 'Not Utilized' };
  const percent = (utilized / released) * 100;
  let status: UtilizationStatus = 'Not Utilized';
  if (percent >= 95) status = 'Fully Utilized'; // High threshold for Fully Utilized
  else if (percent > 0) status = 'Partially Utilized';
  return { percent: parseFloat(percent.toFixed(1)), status };
};

const MOCK_MONTHLY_UTILIZATION = [
  { id: 1, month: 'October 2025', schemeName: 'Self Employment Scheme', fundSanctioned: 1500000, fundReleased: 300000, utilizedAmount: 280000, remarks: 'Equipment purchase and initial setup.' },
  { id: 2, month: 'September 2025', schemeName: 'Self Employment Scheme', fundSanctioned: 1500000, fundReleased: 250000, utilizedAmount: 240000, remarks: 'Raw material procurement.' },
  { id: 3, month: 'August 2025', schemeName: 'Self Employment Scheme', fundSanctioned: 1500000, fundReleased: 200000, utilizedAmount: 180000, remarks: 'Site preparation.' },
  { id: 4, month: 'October 2025', schemeName: 'Sanitary Mart Loan', fundSanctioned: 500000, fundReleased: 100000, utilizedAmount: 95000, remarks: 'Stock purchase for Q4.' },
  { id: 5, month: 'September 2025', schemeName: 'Sanitary Mart Loan', fundSanctioned: 500000, fundReleased: 150000, utilizedAmount: 140000, remarks: 'Marketing expenses.' },
  { id: 6, month: 'October 2025', schemeName: 'Skill Development Grant', fundSanctioned: 100000, fundReleased: 50000, utilizedAmount: 48000, remarks: 'Stipend disbursement for Batch 2.' },
  // Add more months/schemes
].map(item => ({
  ...item,
  pendingAmount: item.fundReleased - item.utilizedAmount,
  ...calculateUtilization(item.fundReleased, item.utilizedAmount),
}));

const mockSchemes = [...new Set(MOCK_MONTHLY_UTILIZATION.map(d => d.schemeName))];
const mockFinancialYears = ['2025-2026', '2024-2025', '2023-2024'];
const mockMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// --- Reusable Components ---



// 2. Glass Card Wrapper
const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => ( <div className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 p-6 ${className}`}> {children} </div> );

// 3. Status Badge Component
const UtilizationStatusBadge: React.FC<{ status: UtilizationStatus }> = ({ status }) => {
  const config = { 'Fully Utilized': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle }, 'Partially Utilized': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Hourglass }, 'Not Utilized': { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle } }[status];
  return ( <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}> <config.icon className="w-3.5 h-3.5" /> {status} </span> );
};

// 4. Reusable Form Input & Select (same as previous)
const FormInput: React.FC<{ label: string, type: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }> = ({ label, type, name, value, onChange, placeholder }) => ( <div><label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label><input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} className="block w-full p-2 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200" /></div> );
const FormSelect: React.FC<{ label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode }> = ({ label, name, value, onChange, children }) => ( <div><label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label><select id={name} name={name} value={value} onChange={onChange} className="block w-full p-2 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 sm:text-sm transition-colors duration-200 bg-white">{children}</select></div> );

// 5. Sortable Table Header (same as previous)
type SortableHeaderProps = { colKey: string; title: string; sortConfig: { key: string; direction: 'asc' | 'desc' } | null; requestSort: (key: string) => void; className?: string; };
const SortableHeader: React.FC<SortableHeaderProps> = ({ colKey, title, sortConfig, requestSort, className = '' }) => {
  const getSortIcon = () => { if (!sortConfig || sortConfig.key !== colKey) return <ChevronDown className="w-4 h-4 opacity-30" />; return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />; };
  return ( <th className={`px-4 py-3 text-left cursor-pointer transition-colors hover:bg-indigo-200 ${className}`} onClick={() => requestSort(colKey)}> <div className="flex items-center gap-1">{title}{getSortIcon()}</div> </th> );
};

// --- Currency Formatter ---
const formatCurrency = (amount: number) => amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });

// 6. Upload Documents Modal
const UploadModal: React.FC<{ isOpen: boolean; onClose: () => void; month: string; scheme: string }> = ({ isOpen, onClose, month, scheme }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [remarks, setRemarks] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)].slice(0, 5)); }; // Limit 5 files
  const removeFile = (index: number) => { setFiles(files.filter((_, i) => i !== index)); };
  
  const handleUpload = () => {
      setIsUploading(true);
      console.log("Uploading for:", month, scheme, { files, remarks });
      // Simulate upload
      setTimeout(() => {
          setIsUploading(false);
          alert("Documents Uploaded Successfully!");
          onClose();
          setFiles([]); setRemarks('');
      }, 1500);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-modal-enter">
      <div className="bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col scale-100">
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <div><h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><UploadCloud className="w-6 h-6 text-indigo-600" /> Upload Utilization Proof</h2><p className="text-sm text-slate-500">For {scheme} - {month}</p></div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
           {/* File Drop Area */}
           <div className="flex flex-col space-y-1"> <label className="text-xs font-medium text-slate-600">Upload Bills / Receipts / UC *</label> <div className="mt-1 flex justify-center rounded-lg border border-dashed border-slate-300 px-6 py-8 bg-slate-50/50 hover:border-indigo-400 transition-colors"> <div className="text-center"> <UploadCloud className="mx-auto h-10 w-10 text-slate-400" /> <div className="mt-2 flex text-xs leading-5 text-slate-600"> <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"> <span>Upload files</span> <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} /> </label> <p className="pl-1">or drag and drop</p> </div> <p className="text-[10px] leading-4 text-slate-500">PDF, JPG, PNG up to 5MB each</p> </div> </div> </div>
           {/* File List */}
           {files.length > 0 && <div className="space-y-2 max-h-32 overflow-y-auto pr-2">{files.map((file, idx) => <div key={idx} className="flex items-center justify-between text-xs p-2 bg-slate-100 rounded border border-slate-200"><span className="truncate flex items-center gap-1.5"><Paperclip size={12}/>{file.name}</span><button onClick={() => removeFile(idx)} className="p-0.5 rounded text-slate-400 hover:bg-red-100 hover:text-red-600"><Trash2 size={12} /></button></div>)}</div>}
           {/* Remarks */}
           <div className="flex flex-col space-y-1"> <label htmlFor="remarks" className="text-xs font-medium text-slate-600">Remarks (Optional)</label> <textarea id="remarks" name="remarks" value={remarks} onChange={(e)=>setRemarks(e.target.value)} rows={3} placeholder="Add any notes regarding this utilization..." className="block w-full p-2 text-sm rounded-lg border border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none" /> </div>
        </div>
        <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50 gap-3 mt-auto">
          <button type="button" onClick={onClose} disabled={isUploading} className="px-5 py-2 rounded-full text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.03]">Cancel</button>
          <GradientButton variant="default" size="default" onClick={handleUpload} disabled={isUploading || files.length === 0}>
            {isUploading ? <Loader2 className="mr-2" /> : <CheckCircle className="mr-2" />} {isUploading ? "Uploading..." : "Save Submission"}
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

// 7. Insights Panel Component
type InsightsPanelProps = { data: any[] };
const InsightsPanel: React.FC<InsightsPanelProps> = ({ data }) => {
  // Chart Data Preparation (Assuming expense categories are added later)
  const expenseBreakdown = [ { name: 'Equipment', value: 400000 }, { name: 'Training', value: 150000 }, { name: 'Salary', value: 300000 }, { name: 'Admin/Misc', value: 50000 } ];
  const monthlyUtilTrend = data.map(d => ({ month: d.month.split(' ')[0], Utilized: d.utilizedAmount, Released: d.fundReleased })).reverse(); // Assuming sorted data

  const PIE_COLORS_EXPENSE = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B']; // Blue, Green, Purple, Amber

  return (
    <GlassCard className="mt-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><BarChart3 className="w-6 h-6 text-indigo-600" /> Utilization Insights</h2>
      <div className="space-y-8">
        {/* Spending Breakdown Pie Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Monthly Spending Breakdown (Example)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={expenseBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {expenseBreakdown.map((entry, index) => ( <Cell key={`cell-${index}`} fill={PIE_COLORS_EXPENSE[index % PIE_COLORS_EXPENSE.length]} /> ))} </Pie>
                <RechartsTooltip formatter={(value) => formatCurrency(value as number)} /> <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Monthly Release vs Utilization Line Chart */}
        <div>
           <h3 className="text-lg font-medium text-slate-700 mb-4">Monthly Fund Release vs. Utilization</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer>
               <LineChart data={monthlyUtilTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5}/> <XAxis dataKey="month" fontSize={10} /> <YAxis fontSize={10} tickFormatter={(value) => `₹${value/1000}k`}/>
                 <RechartsTooltip formatter={(value) => formatCurrency(value as number)} /> <Legend />
                 <Line type="monotone" dataKey="Released" stroke="#3B82F6" strokeWidth={2}/>
                 <Line type="monotone" dataKey="Utilized" stroke="#10B981" strokeWidth={2} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </GlassCard>
  );
};

// --- Main Page Component ---
const MonthlyUtilizationReportPage = () => {
  const [filters, setFilters] = useState({ financialYear: '2025-2026', month: 'October', schemeName: 'Self Employment Scheme', district: '', dateFrom: '', dateTo: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadContext, setUploadContext] = useState({ month: '', scheme: '' });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { setFilters(prev => ({ ...prev, [e.target.name]: e.target.value })); };
  const clearFilters = () => { setFilters({ financialYear: '', month: '', schemeName: '', district: '', dateFrom: '', dateTo: '' }); setCurrentPage(1); setSortConfig(null); };
  const applyFilters = () => setCurrentPage(1);

  // --- Data Logic ---
  const filteredData = useMemo(() => {
    let data = [...MOCK_MONTHLY_UTILIZATION];
    if (filters.month) data = data.filter(item => item.month.startsWith(filters.month));
    if (filters.schemeName) data = data.filter(item => item.schemeName === filters.schemeName);
    return data;
  }, [filters, sortConfig]);

  // --- Pagination ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage), [filteredData, currentPage, rowsPerPage]);

  // --- Sorting ---
  const requestSort = (key: string) => { let direction: 'asc' | 'desc' = 'asc'; if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') { direction = 'desc'; } setSortConfig({ key, direction }); };
  
  // --- Summary Card Calculation ---
  const summary = useMemo(() => {
    // Calculate summary based on the *filtered* data for the selected period/scheme
    const currentMonthData = filteredData.find(d => d.month.startsWith(filters.month)); // Example: get current month's data
    const totalSanctioned = currentMonthData?.fundSanctioned || MOCK_SUMMARY.loanSanctioned; // Fallback to overall if no month selected
    const totalReleased = filteredData.reduce((sum, item) => sum + item.fundReleased, 0); // Cumulative released in filtered data
    const monthlyUtilized = currentMonthData?.utilizedAmount || 0;
    const overallUtilized = filteredData.reduce((sum, item) => sum + item.utilizedAmount, 0);
    const balance = totalReleased - overallUtilized;

    return { totalSanctioned: formatCurrency(totalSanctioned), totalReleased: formatCurrency(totalReleased), monthlyUtilized: formatCurrency(monthlyUtilized), balance: formatCurrency(balance) };
  }, [filteredData, filters.month]);

   // --- Modal Handlers ---

  const openUploadModal = (month: string, scheme: string) => { setUploadContext({ month, scheme }); setIsUploadModalOpen(true); };
  const closeUploadModal = () => setIsUploadModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-blue-100 p-4 md:p-8 font-sans animate-fade-in">
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
           <nav className="flex items-center text-sm font-medium text-slate-500 mb-3"> <LayoutDashboard className="w-4 h-4 mr-1.5" /> SHG Dashboard <ChevronRightIcon className="w-4 h-4 mx-1" /> Reports & Analytics <ChevronRightIcon className="w-4 h-4 mx-1" /> <span className="font-semibold text-indigo-600">Monthly Utilization Report</span> </nav>
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div className="flex items-center space-x-4">
               <span className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl text-white shadow-lg"><TrendingUp className="w-8 h-8" /></span>
               <div> <h1 className="text-3xl font-bold text-slate-800">Monthly Utilization Report</h1> <p className="text-slate-500 mt-1">Track scheme fund usage month-wise.</p> </div>
             </div>
             <div className="flex items-center gap-2">
               {/* Insights button removed: InsightsPanel is now always visible below the table */}
               <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export CSV"><FileDown className="w-5 h-5 text-green-600" /></button>
               <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Export PDF"><FileDown className="w-5 h-5 text-red-600" /></button>
               <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm" title="Refresh"><RefreshCcw className="w-5 h-5 text-blue-600" /></button>
             </div>
           </div>
         </header>
        {/* Filters */}
        <GlassCard>
           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-700"><Filter className="w-5 h-5 text-indigo-600" /> Filters</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
             <FormSelect label="Financial Year" name="financialYear" value={filters.financialYear} onChange={handleFilterChange}><option value="">All</option>{mockFinancialYears.map(y=><option key={y} value={y}>{y}</option>)}</FormSelect>
             <FormSelect label="Month" name="month" value={filters.month} onChange={handleFilterChange}><option value="">All</option>{mockMonths.map(m=><option key={m} value={m}>{m}</option>)}</FormSelect>
             <FormSelect label="Scheme Name" name="schemeName" value={filters.schemeName} onChange={handleFilterChange}><option value="">All</option>{mockSchemes.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             {/* Add District filter if needed */}
             <div className="relative md:col-span-2 lg:col-span-2"> {/* Search spans more */}
               <label htmlFor="search" className="block text-sm font-medium text-slate-600 mb-1">Search</label>
               <input type="text" id="search" placeholder="Scheme ID/Name..." value={''} onChange={() => {}} /* Add search state */ className="block w-full p-2 pl-9 text-sm rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
               <Search className="w-4 h-4 text-slate-400 absolute left-3 top-[37px]" />
             </div>
           </div>
           <div className="flex justify-end gap-3 mt-4">
             <button onClick={clearFilters} className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"> Reset Filters</button>
             <GradientButton variant="default" size="default" onClick={applyFilters}>
               <Search className="mr-2" /> Apply Filters
             </GradientButton>
           </div>
         </GlassCard>
        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard 
                title="Sanctioned (Cumulative)" 
                value={summary.totalSanctioned} 
                icon={Package} 
                color="blue" 
            />
            <StatCard 
                title="Released (Cumulative)" 
                value={summary.totalReleased} 
                icon={HandCoins} 
                color="sky" 
            />
            <StatCard 
                title="Utilized (Selected Month)" 
                value={summary.monthlyUtilized} 
                icon={DollarSign} 
                color="green" 
            />
            <StatCard 
                title="Balance (Released - Utilized)" 
                value={summary.balance} 
                icon={Wallet} 
                color="amber" 
            />
        </section>
        {/* Table */}
        <GlassCard>
           <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><ListChecks className="text-indigo-600"/> Monthly Utilization Details</h2>
            <div className="overflow-x-auto">
             <table className="w-full text-sm">
               <thead className="bg-slate-100/70 text-slate-700 font-medium">
                 <tr>
                   <th className="px-4 py-2 text-left">Sl.</th>
                   <SortableHeader colKey="month" title="Month" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <SortableHeader colKey="schemeName" title="Scheme Name" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[180px]" />
                   <SortableHeader colKey="fundReleased" title="Released (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px] text-right" />
                   <SortableHeader colKey="utilizedAmount" title="Utilized (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px] text-right" />
                   <SortableHeader colKey="pendingAmount" title="Balance (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px] text-right" />
                   <th className="px-4 py-2 text-left min-w-[200px]">Remarks</th>
                   <th className="px-4 py-2 text-center">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-200/50">
                 {paginatedData.map((item, index) => (
                   <tr key={item.id} className="hover:bg-sky-50/30 transition-colors group">
                     <td className="px-4 py-3 text-slate-500">{(currentPage-1)*rowsPerPage+index+1}</td>
                     <td className="px-4 py-3 text-slate-700 font-medium">{item.month}</td>
                     <td className="px-4 py-3 text-indigo-700 font-semibold">{item.schemeName}</td>
                     <td className="px-4 py-3 text-green-700 font-bold text-right">{formatCurrency(item.fundReleased)}</td>
                     <td className="px-4 py-3 text-emerald-700 font-bold text-right">{formatCurrency(item.utilizedAmount)}</td>
                     <td className="px-4 py-3 text-orange-700 font-bold text-right">{formatCurrency(item.pendingAmount)}</td>
                     <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-xs">{item.remarks}</td>
                     <td className="px-4 py-3 text-center">
                         <button onClick={() => openUploadModal(item.month, item.schemeName)} className="p-1.5 rounded-full text-blue-600 group-hover:bg-blue-100 transition-colors mx-1" title="Upload Documents"> <UploadCloud className="w-5 h-5" /> </button>
                         {/* Optional View Button if there's more details */}
                         {/* <button onClick={() => {}} className="p-1.5 rounded-full text-indigo-600 group-hover:bg-indigo-100 transition-colors mx-1" title="View Details"><Eye className="w-5 h-5" /></button> */}
                     </td>
                   </tr>
                 ))}
                 {paginatedData.length === 0 && (<tr><td colSpan={8} className="text-center py-8 text-slate-500">No utilization data found for this period/scheme.</td></tr>)}
               </tbody>
             </table>
           </div>
           {/* Pagination */}
           {totalPages > 1 && (
             <div className="flex justify-between items-center p-3 border-t border-slate-200/50">
               <div className="flex items-center gap-2"><label htmlFor="rowsPerPage" className="text-xs text-slate-600">Rows:</label><select id="rowsPerPage" value={rowsPerPage} onChange={(e)=>{setRowsPerPage(Number(e.target.value));setCurrentPage(1);}} className="p-1.5 rounded-md border-slate-300 text-xs focus:ring-indigo-500"><option value={5}>5</option><option value={10}>10</option><option value={20}>20</option></select></div>
               <div className="flex items-center gap-2"><span className="text-xs text-slate-600">Page {currentPage} of {totalPages}</span><button onClick={()=>setCurrentPage(p=>Math.max(p-1,1))} disabled={currentPage===1} className="p-1.5 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronLeft className="w-4 h-4"/></button><button onClick={()=>setCurrentPage(p=>Math.min(p+1,totalPages))} disabled={currentPage===totalPages} className="p-1.5 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronRightIcon className="w-4 h-4"/></button></div>
             </div>
           )}
        </GlassCard>
        
        {/* Modals */}
        <UploadModal isOpen={isUploadModalOpen} onClose={closeUploadModal} month={uploadContext.month} scheme={uploadContext.scheme} />
        {/* Insights Panel as row section below table */}
        <InsightsPanel data={filteredData} />
        {/* Footer CTA - now below InsightsPanel */}
        <div className="text-center mt-10 py-6 border-t border-dashed border-indigo-200/50">
          <Sparkles className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
          <p className="text-md font-semibold text-slate-700">Your SHG progress matters. Keep reporting and stay funded. 💪🌼</p>
          <GradientButton variant="default" size="default" onClick={() => alert("Downloading PDF...")} className="mt-4 inline-flex w-auto">
            <Download className="mr-2" /> Download Full Report (PDF)
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default MonthlyUtilizationReportPage;

// Define MOCK_SUMMARY properly
const MOCK_SUMMARY = {
  loanSanctioned: 0, // Replace with actual default value if available
};