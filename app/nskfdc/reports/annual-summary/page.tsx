// Yeh aapki page.tsx file hai
// Ise run karne ke liye, aapke project mein React, TailwindCSS, 
// recharts, aur lucide-react install hona zaroori hai.

'use client'; // Next.js App Router ke liye

import React, { useState, useMemo, useRef } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from 'recharts';
import {
  LayoutDashboard,
  ChevronRight as ChevronRightIcon,
  CalendarCheck,
  Search,
  FileDown,
  RefreshCcw,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  BarChart3,
  Eye,
  Printer,
  Star,
  Medal,
  Trophy,
  Zap,
  AlertOctagon
} from 'lucide-react';
import IntegratedLoader from '@/components/layout/IntegratedLoader';

// --- Mock Data ---

// Helper to calculate rating based on utilization and beneficiary achievement
type PerformanceRating = 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
const calculateRating = (utilPercent: number, achievePercent: number): PerformanceRating => {
  const score = (utilPercent + achievePercent) / 2;
  if (score >= 95) return 'Excellent';
  if (score >= 85) return 'Good';
  if (score >= 70) return 'Average';
  if (score >= 50) return 'Poor';
  return 'Very Poor';
};

const MOCK_ANNUAL_DATA = [
  { id: 1, fy: '2024-25', schemeName: 'Self Employment Scheme', schemeId: 'SCH-2025-001', state: 'Uttar Pradesh', districtsCovered: 35, fundSanctioned: 25000000, fundReleased: 22500000, fundUtilized: 21000000, totalBen: 380, shgFormed: 12, individualBen: 250, scBen: 150, obcBen: 80, womenBen: 180, remarks: 'Utilization achieved on target.', lastUpdated: '2025-10-25' },
  { id: 2, fy: '2024-25', schemeName: 'Skill Development Program', schemeId: 'SCH-2025-002', state: 'Maharashtra', districtsCovered: 28, fundSanctioned: 15000000, fundReleased: 15000000, fundUtilized: 14500000, totalBen: 550, shgFormed: 0, individualBen: 550, scBen: 200, obcBen: 150, womenBen: 300, remarks: 'High participation rate.', lastUpdated: '2025-10-24' },
  { id: 3, fy: '2023-24', schemeName: 'Sanitary Mart Loan', schemeId: 'SCH-2024-003', state: 'Gujarat', districtsCovered: 15, fundSanctioned: 18000000, fundReleased: 16000000, fundUtilized: 12000000, totalBen: 120, shgFormed: 25, individualBen: 0, scBen: 40, obcBen: 50, womenBen: 90, remarks: 'Lower utilization than expected.', lastUpdated: '2025-09-30' },
  { id: 4, fy: '2024-25', schemeName: 'Education Loan', schemeId: 'SCH-2025-005', state: 'Tamil Nadu', districtsCovered: 22, fundSanctioned: 20000000, fundReleased: 18000000, fundUtilized: 17500000, totalBen: 210, shgFormed: 0, individualBen: 210, scBen: 80, obcBen: 60, womenBen: 110, remarks: 'Excellent performance.', lastUpdated: '2025-10-22' },
  { id: 5, fy: '2023-24', schemeName: 'Mechanized Cleaning Grant', schemeId: 'SCH-2024-007', state: 'Delhi', districtsCovered: 1, fundSanctioned: 30000000, fundReleased: 30000000, fundUtilized: 29000000, totalBen: 50, shgFormed: 5, individualBen: 10, scBen: 20, obcBen: 15, womenBen: 25, remarks: 'Fully utilized grant.', lastUpdated: '2025-08-15' },
  { id: 6, fy: '2024-25', schemeName: 'Self Employment Scheme', schemeId: 'SCH-2025-001', state: 'Karnataka', districtsCovered: 18, fundSanctioned: 18000000, fundReleased: 15000000, fundUtilized: 11000000, totalBen: 320, shgFormed: 8, individualBen: 200, scBen: 120, obcBen: 70, womenBen: 150, remarks: 'Average utilization, needs push.', lastUpdated: '2025-10-20' },
  // Add more data
].map(item => {
  const utilPercent = item.fundReleased > 0 ? (item.fundUtilized / item.fundReleased) * 100 : 0; // Utilized vs Released
  // Assuming a mock target for beneficiaries for rating calculation (e.g., Target = Sanctioned / 50000)
  const targetBenMock = Math.max(10, Math.floor(item.fundSanctioned / 50000)); 
  const achievePercent = targetBenMock > 0 ? (item.totalBen / targetBenMock) * 100 : 0;
  return {
    ...item,
    utilizationPercent: parseFloat(utilPercent.toFixed(1)),
    achievementPercent: parseFloat(achievePercent.toFixed(1)), // Mock achievement %
    rating: calculateRating(utilPercent, achievePercent),
    balance: item.fundReleased - item.fundUtilized, // Balance based on released vs utilized
  };
});


const mockSchemes = [...new Set(MOCK_ANNUAL_DATA.map(d => d.schemeName))];
const mockStates = [...new Set(MOCK_ANNUAL_DATA.map(d => d.state))];
const mockDistricts = ['District A', 'District B', 'District C']; // Needs dynamic population based on state
const mockFinancialYears = ['2024-25', '2023-24'];
const mockReportTypes = ['Summary', 'Detailed', 'Utilization', 'Beneficiary'];

// --- Reusable Components ---

// 1. Performance Rating Badge
const PerformanceRatingBadge: React.FC<{ rating: PerformanceRating }> = ({ rating }) => {
  const config = {
    Excellent: { bg: 'bg-green-100', text: 'text-green-700', icon: Trophy, label: '⭐⭐⭐⭐⭐ Excellent' },
    Good: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Medal, label: '⭐⭐⭐⭐ Good' },
    Average: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Star, label: '⭐⭐⭐ Average' },
    Poor: { bg: 'bg-orange-100', text: 'text-orange-700', icon: Zap, label: '⭐⭐ Poor' },
    'Very Poor': { bg: 'bg-red-100', text: 'text-red-700', icon: AlertOctagon, label: '⭐ Very Poor' },
  }[rating];
  return ( <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${config.bg} ${config.text}`}> <config.icon className="w-3.5 h-3.5" /> {config.label} </span> );
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

// --- Currency Formatter ---
const formatCurrency = (amount: number) => amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });

// 4. View Details Modal
type DetailsModalProps = { item: any | null; isOpen: boolean; onClose: () => void; };
const ViewDetailsModal: React.FC<DetailsModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;
  const printRef = useRef<HTMLDivElement | null>(null);

  const printSummary = () => {
    try {
      const content = printRef.current?.innerHTML;
      const newWin = window.open('', '_blank', 'width=800,height=600');
      if (!newWin) return;
      newWin.document.open();
      newWin.document.write(`<!doctype html><html><head>${document.head.innerHTML}</head><body>${content}</body></html>`);
      newWin.document.close();
      newWin.focus();
      setTimeout(() => newWin.print(), 250);
    } catch (err) {
      console.error('Printing failed', err);
    }
  };

  const downloadSummary = async () => {
    try {
      const el = printRef.current;
      if (!el) return printSummary();

      const html2canvasMod = await import('html2canvas').catch(() => null);
      const jsPDFMod = await import('jspdf').catch(() => null);

      if (!html2canvasMod || !jsPDFMod) return printSummary();

      const html2canvas = html2canvasMod.default ?? html2canvasMod;
      const { jsPDF } = jsPDFMod;

      const canvas = await html2canvas(el as HTMLElement, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const usableWidth = pageWidth - margin * 2;

      const pxToMm = 0.264583;
      const imgWidthMm = canvas.width * pxToMm;
      const imgHeightMm = canvas.height * pxToMm;
      const scaledImgHeight = (usableWidth * imgHeightMm) / imgWidthMm;

      let position = 0;
      pdf.addImage(imgData, 'PNG', margin, margin, usableWidth, scaledImgHeight);

      let heightLeft = scaledImgHeight - (pageHeight - margin * 2);
      while (heightLeft > -1) {
        pdf.addPage();
        position -= (pageHeight - margin * 2);
        pdf.addImage(imgData, 'PNG', margin, position + margin, usableWidth, scaledImgHeight);
        heightLeft -= (pageHeight - margin * 2);
      }

      const filename = (item.schemeId || item.schemeName || 'annual_report').toString().replace(/\s+/g, '_');
      pdf.save(`${filename}.pdf`);
    } catch (err) {
      console.error('PDF generation failed, falling back to print', err);
      printSummary();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-modal-enter">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-sky-50">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><CalendarCheck className="w-6 h-6 text-indigo-600" /> Annual Report Details</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
        </div>
        {/* Body */}
        <div ref={printRef} className="p-6 space-y-5 overflow-y-auto">
          <h3 className="text-lg font-bold text-indigo-700">{item.schemeName} - {item.state} ({item.fy})</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
            <DetailItem label="Financial Year" value={item.fy} />
            <DetailItem label="Scheme Name" value={item.schemeName} />
            <DetailItem label="Scheme ID" value={item.schemeId} />
            <DetailItem label="State" value={item.state} />
            <DetailItem label="Districts Covered" value={item.districtsCovered} />
            <DetailItem label="Performance Rating" value={<PerformanceRatingBadge rating={item.rating} />} />
          </div>
          <hr className="my-4 border-slate-200" />
          <h4 className="text-md font-semibold text-slate-700">Financial Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
             <DetailItem label="Fund Sanctioned" value={formatCurrency(item.fundSanctioned)} className="text-blue-700 font-bold" />
             <DetailItem label="Fund Released" value={formatCurrency(item.fundReleased)} className="text-green-700 font-bold" />
             <DetailItem label="Fund Utilized" value={formatCurrency(item.fundUtilized)} className="text-emerald-700 font-bold" />
             <DetailItem label="Balance (Released - Utilized)" value={formatCurrency(item.balance)} className="text-orange-700 font-bold" />
             <DetailItem label="Utilization % (Utilized/Released)" value={`${item.utilizationPercent}%`} className="font-bold" />
          </div>
           <hr className="my-4 border-slate-200" />
          <h4 className="text-md font-semibold text-slate-700">Beneficiary Summary</h4>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
              <DetailItem label="Total Beneficiaries" value={item.totalBen} className="font-bold"/>
              <DetailItem label="SHGs Formed" value={item.shgFormed} />
              <DetailItem label="Individual Beneficiaries" value={item.individualBen} />
              <DetailItem label="SC Beneficiaries" value={item.scBen} />
              <DetailItem label="OBC Beneficiaries" value={item.obcBen} />
              <DetailItem label="Women Beneficiaries" value={item.womenBen} />
           </div>
           <DetailItem label="Remarks" value={item.remarks || 'N/A'} isBlock />
           <DetailItem label="Last Updated" value={new Date(item.lastUpdated).toLocaleDateString('en-GB')} />
        </div>
        {/* Footer Actions */}
        <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50 gap-3">
          <button onClick={printSummary} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.03]"><Printer className="w-4 h-4" /> Print Report</button>
          <button onClick={downloadSummary} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-[1.03]"><FileDown className="w-4 h-4" /> Download PDF</button>
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
  const schemeUtilization = useMemo(() => {
    const schemeMap = new Map<string, { totalUtilized: number, count: number }>();
    data.forEach(item => { const current = schemeMap.get(item.schemeName) || { totalUtilized: 0, count: 0 }; schemeMap.set(item.schemeName, { totalUtilized: current.totalUtilized + item.fundUtilized, count: current.count + 1 }); });
    return Array.from(schemeMap.entries()).map(([name, values]) => ({ name, value: values.totalUtilized }));
  }, [data]);

  const stateBeneficiaries = useMemo(() => {
     const stateMap = new Map<string, number>();
     data.forEach(item => { stateMap.set(item.state, (stateMap.get(item.state) || 0) + item.totalBen); });
     return Array.from(stateMap.entries()).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value).slice(0,10); // Top 10 states
  }, [data]);
  
  // Mock monthly trend data
  const monthlyTrend = [
    { month: 'Jan', released: 5, utilized: 4 }, { month: 'Feb', released: 6, utilized: 5 }, { month: 'Mar', released: 7, utilized: 6 },
    { month: 'Apr', released: 8, utilized: 7 }, { month: 'May', released: 9, utilized: 8 }, { month: 'Jun', released: 10, utilized: 9 },
    { month: 'Jul', released: 11, utilized: 10 }, { month: 'Aug', released: 12, utilized: 11 }, { month: 'Sep', released: 13, utilized: 12 },
    { month: 'Oct', released: 14, utilized: 13 }, { month: 'Nov', released: 15, utilized: 14 }, { month: 'Dec', released: 16, utilized: 15 },
  ]; // Assuming values in Cr for display

  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19A3'];

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><BarChart3 className="w-6 h-6 text-indigo-600" /> Annual Insights</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500"><X className="w-6 h-6" /></button>
      </div>
      <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
        {/* Scheme Utilization Pie Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Scheme-wise Fund Utilization Distribution</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={schemeUtilization} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} labelLine={false} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                  {schemeUtilization.map((entry, index) => ( <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} /> ))} </Pie>
                <RechartsTooltip formatter={(value) => formatCurrency(value as number)} /> 
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* State Beneficiary Bar Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-700 mb-4">Top 10 States by Beneficiary Coverage</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <BarChart data={stateBeneficiaries} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /> <XAxis type="number" fontSize={10} />
                <YAxis dataKey="name" type="category" fontSize={10} width={80} interval={0} /> <RechartsTooltip />
                <Bar dataKey="value" fill="#82ca9d" name="Beneficiaries" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Monthly Trend Line Chart */}
        <div>
           <h3 className="text-lg font-medium text-slate-700 mb-4">Monthly Fund Release vs Utilization Trend (Crores)</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer>
               <LineChart data={monthlyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/> <XAxis dataKey="month" fontSize={10} /> <YAxis fontSize={10} tickFormatter={(value) => `₹${value}Cr`}/>
                 <RechartsTooltip formatter={(value) => `₹${value} Cr`} /> <Legend />
                 <Line type="monotone" dataKey="released" name="Released" stroke="#8884d8" strokeWidth={2}/>
                 <Line type="monotone" dataKey="utilized" name="Utilized" stroke="#82ca9d" strokeWidth={2} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const AnnualReportSummaryPage = () => {
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ financialYear: '2024-25', state: '', district: '', schemeName: '', reportType: 'Summary', dateFrom: '', dateTo: '' });
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
  const clearFilters = () => { setFilters({ financialYear: '', state: '', district: '', schemeName: '', reportType: 'Summary', dateFrom: '', dateTo: '' }); setSearchQuery(''); setCurrentPage(1); setSortConfig(null); };
  const applyFilters = () => setCurrentPage(1);

  // --- Data Logic ---
  const filteredData = useMemo(() => {
    let data = [...MOCK_ANNUAL_DATA];
    // Search
    if (searchQuery) { data = data.filter(item => item.schemeName.toLowerCase().includes(searchQuery.toLowerCase()) || item.schemeId.toLowerCase().includes(searchQuery.toLowerCase()) || item.state.toLowerCase().includes(searchQuery.toLowerCase())); }
    // Filters
    if (filters.financialYear) data = data.filter(item => item.fy === filters.financialYear);
    if (filters.state) data = data.filter(item => item.state === filters.state);
    // Removed the district filter condition as the district property does not exist in the data
    // if (filters.district) data = data.filter(item => item.district === filters.district); // Assuming district is available
    if (filters.schemeName) data = data.filter(item => item.schemeName === filters.schemeName);
    // if (filters.reportType) // Apply different views or columns based on type
    // if (filters.dateFrom) // Filter by lastUpdated?
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
    const totalSchemes = new Set(filteredData.map(d => d.schemeName)).size;
    const totalSanctioned = filteredData.reduce((sum, item) => sum + item.fundSanctioned, 0);
    const totalReleased = filteredData.reduce((sum, item) => sum + item.fundReleased, 0);
    const totalUtilized = filteredData.reduce((sum, item) => sum + item.fundUtilized, 0);
    const totalBeneficiaries = filteredData.reduce((sum, item) => sum + item.totalBen, 0);
    const overallUtil = totalReleased === 0 ? 0 : (totalUtilized / totalReleased) * 100;
    // Simple average rating calculation
    const ratingValues = { Excellent: 5, Good: 4, Average: 3, Poor: 2, 'Very Poor': 1 };
    const avgRatingScore = filteredData.length > 0 ? filteredData.reduce((sum, item) => sum + ratingValues[item.rating], 0) / filteredData.length : 0;
    const avgRating = Object.keys(ratingValues).find(key => ratingValues[key as PerformanceRating] === Math.round(avgRatingScore)) || 'Average';

    return { totalSchemes, totalSanctioned: formatCurrency(totalSanctioned), totalReleased: formatCurrency(totalReleased), totalUtilized: formatCurrency(totalUtilized), totalBeneficiaries: totalBeneficiaries.toLocaleString('en-IN'), overallUtilization: overallUtil.toFixed(1) + '%', avgRating: avgRating as PerformanceRating };
  }, [filteredData]);

  // --- Modal ---
  const openModal = (item: any) => { setSelectedItem(item); setIsModalOpen(true); };
  const closeModal = () => setIsModalOpen(false);

  if (loading) return (
     <IntegratedLoader />
  );

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
         <header className="mb-6">
           <nav className="flex items-center text-sm font-medium text-slate-500 mb-2"> <LayoutDashboard className="w-4 h-4 mr-1.5" /> Dashboard <ChevronRightIcon className="w-4 h-4 mx-1" /> Reports & Analytics <ChevronRightIcon className="w-4 h-4 mx-1" /> <span className="font-semibold text-indigo-600">Annual Report Summary</span> </nav>
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div className="flex items-center space-x-3 rounded-xl px-6 py-4 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
               <div> <h1 className="text-3xl font-bold text-white drop-shadow">Annual Report Summary</h1> <p className="text-indigo-100 mt-1 font-medium">Yearly summary of scheme performance and fund utilization.</p> </div>
             </div>
           </div>
         </header>
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 mb-4">
           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">Filters</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
             <FormSelect label="Financial Year" name="financialYear" value={filters.financialYear} onChange={handleFilterChange}><option value="">All Years</option>{mockFinancialYears.map(y=><option key={y} value={y}>{y}</option>)}</FormSelect>
             <FormSelect label="State" name="state" value={filters.state} onChange={handleFilterChange}><option value="">All States</option>{mockStates.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             <FormSelect label="District" name="district" value={filters.district} onChange={handleFilterChange}><option value="">All Districts</option>{mockDistricts.filter(d=> filters.state ? MOCK_ANNUAL_DATA.find(data => data.state === filters.state) : true).map(d=><option key={d} value={d}>{d}</option>)}</FormSelect>
             <FormSelect label="Scheme Name" name="schemeName" value={filters.schemeName} onChange={handleFilterChange}><option value="">All Schemes</option>{mockSchemes.map(s=><option key={s} value={s}>{s}</option>)}</FormSelect>
             <FormSelect label="Report Type" name="reportType" value={filters.reportType} onChange={handleFilterChange}>{mockReportTypes.map(t=><option key={t} value={t}>{t}</option>)}</FormSelect>
             <div className="grid grid-cols-2 gap-2"><FormInput label="From Date" type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} /><FormInput label="To Date" type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} /></div>
             <div className="relative">
               <label htmlFor="search" className="block text-sm font-medium text-slate-600 mb-1">Search</label>
               <input type="text" id="search" placeholder="Scheme ID/State/Year..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="block w-full p-2 pl-9 rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm"/>
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
                   <SortableHeader colKey="fy" title="FY" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[100px]" />
                   <SortableHeader colKey="schemeName" title="Scheme Name" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[180px]" />
                   <SortableHeader colKey="state" title="State" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <SortableHeader colKey="fundSanctioned" title="Sanctioned (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px] text-right" />
                   <SortableHeader colKey="fundReleased" title="Released (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px] text-right" />
                   <SortableHeader colKey="fundUtilized" title="Utilized (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px] text-right" />
                   <SortableHeader colKey="totalBen" title="Total Ben." sortConfig={sortConfig} requestSort={requestSort} className="min-w-[110px] text-center" />
                   <th className="px-4 py-3 text-left min-w-[200px]">Remarks</th>
                   <SortableHeader colKey="lastUpdated" title="Last Updated" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                   <th className="px-4 py-3 text-center">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {paginatedData.map((item, index) => (
                   <tr key={item.id} className={index % 2 === 0 ? "bg-white hover:bg-indigo-50/70 transition-colors" : "bg-indigo-50/40 hover:bg-indigo-100 transition-colors"}>
                     <td className="px-4 py-3 text-slate-500">{(currentPage-1)*rowsPerPage+index+1}</td>
                     <td className="px-4 py-3 text-slate-700">{item.fy}</td>
                     <td className="px-4 py-3 text-indigo-700 font-semibold">{item.schemeName}</td>
                     <td className="px-4 py-3 text-slate-700">{item.state}</td>
                     <td className="px-4 py-3 text-slate-700 font-medium text-right">{formatCurrency(item.fundSanctioned)}</td>
                     <td className="px-4 py-3 text-green-700 font-bold text-right">{formatCurrency(item.fundReleased)}</td>
                     <td className="px-4 py-3 text-emerald-700 font-bold text-right">{formatCurrency(item.fundUtilized)}</td>
                     <td className="px-4 py-3 text-slate-700 font-bold text-center">{item.totalBen}</td>
                     <td className="px-4 py-3 text-slate-500 text-xs truncate max-w-xs">{item.remarks}</td>
                     <td className="px-4 py-3 text-slate-700">{new Date(item.lastUpdated).toLocaleDateString('en-GB')}</td>
                     <td className="px-4 py-3 text-center"><button onClick={()=>openModal(item)} className="p-1.5 rounded-md text-indigo-600 hover:bg-indigo-100" title="View Details"><Eye className="w-5 h-5" /></button></td>
                   </tr>
                 ))}
                 {paginatedData.length === 0 && (<tr><td colSpan={12} className="text-center py-10 text-slate-500">No records found.</td></tr>)}
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
           <div className="flex flex-wrap items-center gap-x-4 gap-y-1"><span><strong>Schemes:</strong> {summary.totalSchemes}</span><span><strong>Sanctioned:</strong> {summary.totalSanctioned}</span><span className="text-green-700"><strong>Released:</strong> {summary.totalReleased}</span><span className="text-emerald-700"><strong>Utilized:</strong> {summary.totalUtilized}</span><span><strong>Beneficiaries:</strong> {summary.totalBeneficiaries}</span></div>
           <div className="flex items-center gap-2"><strong>Avg. Performance:</strong> <PerformanceRatingBadge rating={summary.avgRating} /></div>
           <span className="font-semibold text-indigo-700">Overall Utilization: {summary.overallUtilization}</span>
         </div>
        {/* Audit Footer */}
        <footer className="text-center mt-8 text-xs text-slate-500">
           <p>Report Generated By: NSKFDC Officer – Automated System • Generated On: 26 Oct 2025, 18:20 IST</p>
           <p className="mt-1">Data Source: NSKFDC Annual Performance Records</p>
         </footer>
        {/* Modals & Panels */}
        <ViewDetailsModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
        <InsightsPanel data={filteredData} isOpen={isInsightsOpen} onClose={() => setIsInsightsOpen(false)} />
        {isInsightsOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsInsightsOpen(false)}></div>}
      </div>
    </div>
  );
};

export default AnnualReportSummaryPage;

/* Add this CSS to your global stylesheet (e.g., globals.css) for the modal animation
@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-modal-enter {
  animation: modalEnter 0.2s ease-out forwards;
} */