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
  LayoutDashboard, ChevronRight, Gift, DollarSign, Receipt, Wrench, GraduationCap, ShieldCheck,
  Search, Filter, X, Calendar, Download, Upload, Eye, CheckCircle, FileClock, Hourglass, FileText,
  ChevronLeft, Printer, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon,
  CheckCheck, ListChecks, PackagePlus, ShieldHalf, Sparkles, FolderKanban,
  ChevronDown, ChevronUp, UploadCloud
} from 'lucide-react';

// --- Mock Data ---

const MOCK_SUMMARY_STATS = {
  totalBenefits: 12,
  totalFinancial: 850000,
  subsidyReceived: 250000,
  assetsIssued: 5,
  membersTrained: 8,
  insuranceActive: true,
};

const MOCK_BENEFITS_DATA = [
  { id: 1, name: 'Rehabilitation Grant', type: 'Financial', scheme: 'Rehab Scheme', date: '2025-08-01', value: 40000, provider: 'District Office', docUrl: '/docs/rehab_grant.pdf', status: 'Received' },
  { id: 2, name: 'Sewing Machines (x5)', type: 'Asset', scheme: 'Self Employment Scheme', date: '2025-09-01', value: 75000, provider: 'NSKFDC Loan Disbursement', docUrl: '/docs/sewing_invoice.pdf', status: 'Received' },
  { id: 3, name: 'Tailoring Skill Training', type: 'Training', scheme: 'Skill Development Program', date: '2025-09-15', value: null, provider: 'Training Partner Inc.', docUrl: '/docs/training_cert.pdf', status: 'Completed' }, // Changed status to Completed
  { id: 4, name: 'PPE Kits (x10)', type: 'Safety', scheme: 'Safety Initiative', date: '2025-09-20', value: 5000, provider: 'Contractor', docUrl: '/docs/ppe_receipt.pdf', status: 'Received' },
  { id: 5, name: 'Working Capital Subsidy', type: 'Financial', scheme: 'Self Employment Scheme', date: '2025-10-10', value: 25000, provider: 'NSKFDC', docUrl: '/docs/subsidy_sanction.pdf', status: 'Approved' }, // Changed status
  { id: 6, name: 'Health Insurance Coverage', type: 'Welfare', scheme: 'Ayushman Bharat Linkage', date: '2025-07-01', value: null, provider: 'MoHFW', docUrl: '/docs/health_card.pdf', status: 'Active' }, // Changed status
  { id: 7, name: 'E-Rickshaw Asset', type: 'Asset', scheme: 'Sanitary Mart Loan', date: '2025-09-15', value: 120000, provider: 'State Channelizing Agency', docUrl: '/docs/erickshaw_rc.pdf', status: 'Received' },
  { id: 8, name: 'Digital Literacy Training', type: 'Training', scheme: 'Skill Development Program', date: '2025-10-25', value: null, provider: 'Govt. IT Center', docUrl: null, status: 'Ongoing' }, // Changed status
  { id: 9, name: 'Emergency Relief Fund', type: 'Financial', scheme: 'Disaster Relief Fund', date: '2025-06-10', value: 10000, provider: 'District Magistrate', docUrl: '/docs/relief_order.pdf', status: 'Received' },
];

const MOCK_ASSETS = MOCK_BENEFITS_DATA.filter(b => b.type === 'Asset');
const MOCK_TRAINING = MOCK_BENEFITS_DATA.filter(b => b.type === 'Training');
const MOCK_WELFARE = MOCK_BENEFITS_DATA.filter(b => b.type === 'Welfare' || b.type === 'Safety');

// Chart data
const benefitTypeDistribution = MOCK_BENEFITS_DATA.reduce((acc, curr) => {
  acc[curr.type] = (acc[curr.type] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
const pieData = Object.entries(benefitTypeDistribution).map(([name, value]) => ({ name, value }));

const monthlyBenefitTrend = [ // Mock trend data (value in Lakhs)
  { month: 'Jul', value: 0.1 }, { month: 'Aug', value: 0.4 }, { month: 'Sep', value: 1.0 }, { month: 'Oct', value: 0.25 },
];

const PIE_COLORS = ['#10b981', '#f59e0b', '#8b5cf6', '#3b82f6', '#ec4899']; // Emerald, Amber, Purple, Blue, Pink

// --- Reusable Components ---

// 1. Shiny Metric Card
type MetricCardProps = { title: string; value: string | number; icon: React.ElementType; color: string; }; // color: 'blue', 'green', 'purple', 'amber', 'sky'
const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', shadow: 'shadow-blue-500/30' },
    green: { bg: 'bg-green-100', text: 'text-green-600', shadow: 'shadow-green-500/30' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', shadow: 'shadow-purple-500/30' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-600', shadow: 'shadow-amber-500/30' },
    sky: { bg: 'bg-sky-100', text: 'text-sky-600', shadow: 'shadow-sky-500/30' },
  }[color] || { bg: 'bg-slate-100', text: 'text-slate-600', shadow: 'shadow-slate-500/30' };

  return (
    <div className={`relative p-5 bg-gradient-to-br from-white/80 to-${color}-50/50 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 
                   transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 transform-gpu overflow-hidden ${colorClasses.shadow} hover:shadow-lg group`}>
      <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full ${colorClasses.bg} opacity-30 blur-xl group-hover:opacity-60 transition-opacity duration-300`}></div>
      <div className="relative z-10 flex items-center space-x-4">
        <div className={`p-3 rounded-xl ${colorClasses.bg} shadow-sm`}>
          <Icon className={`w-7 h-7 ${colorClasses.text}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

// 2. Glass Card Wrapper
const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 p-6 ${className}`}>
    {children}
  </div>
);

// 3. Benefit Status Badge
type BenefitStatus = 'Received' | 'Pending' | 'Approved' | 'Completed' | 'Active' | 'Ongoing';
const BenefitStatusBadge: React.FC<{ status: BenefitStatus }> = ({ status }) => {
  const config = {
    Received: { bg: 'bg-green-100', text: 'text-green-700' },
    Approved: { bg: 'bg-blue-100', text: 'text-blue-700' },
    Completed: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
    Active: { bg: 'bg-sky-100', text: 'text-sky-700' },
    Ongoing: { bg: 'bg-purple-100', text: 'text-purple-700' },
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  }[status];
  return ( <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}> {status} </span> );
};

// 4. Sortable Table Header
type SortableHeaderProps = { colKey: string; title: string; sortConfig: { key: string; direction: 'asc' | 'desc' } | null; requestSort: (key: string) => void; className?: string; };
const SortableHeader: React.FC<SortableHeaderProps> = ({ colKey, title, sortConfig, requestSort, className = '' }) => {
  const getSortIcon = () => { if (!sortConfig || sortConfig.key !== colKey) return <ChevronDown className="w-4 h-4 opacity-30" />; return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />; };
  return ( <th className={`px-4 py-3 text-left cursor-pointer transition-colors hover:bg-indigo-200 ${className}`} onClick={() => requestSort(colKey)}> <div className="flex items-center gap-1">{title}{getSortIcon()}</div> </th> );
};

// --- Currency Formatter ---
const formatCurrency = (amount: number | null) => amount ? amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }) : 'N/A';

// --- Main Page Component ---
const BenefitsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Start with fewer rows for benefits table
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // --- Data Logic ---
  const filteredBenefits = useMemo(() => {
    let data = [...MOCK_BENEFITS_DATA];
    if (searchTerm) { data = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.scheme.toLowerCase().includes(searchTerm.toLowerCase()) || item.type.toLowerCase().includes(searchTerm.toLowerCase())); }
    if (sortConfig !== null) { data.sort((a, b) => { // @ts-ignore
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1; // @ts-ignore
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1; return 0; }); }
    return data;
  }, [searchTerm, sortConfig]);

  // --- Pagination ---
  const totalPages = Math.ceil(filteredBenefits.length / rowsPerPage);
  const paginatedBenefits = useMemo(() => filteredBenefits.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage), [filteredBenefits, currentPage, rowsPerPage]);

  // --- Sorting ---
  const requestSort = (key: string) => { let direction: 'asc' | 'desc' = 'asc'; if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') { direction = 'desc'; } setSortConfig({ key, direction }); };

  // --- Handlers ---
  const handleViewDocument = (url: string | null) => { if (url) window.open(url, '_blank'); else alert('No document available.'); };
  const handleUploadProof = () => alert('Trigger file upload for utilization proof.');
  const handleDownloadCertificate = (url: string | null) => { if (url) window.open(url, '_blank'); else alert('Certificate not available.'); };
  const handleExport = (type: 'CSV' | 'PDF') => alert(`Exporting Benefits Report as ${type}`);
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100 p-4 md:p-8 font-sans animate-fade-in">
        {/* Inline Styles for Animations */}
        <style jsx global>{`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
          .recharts-default-tooltip { border-radius: 0.75rem !important; border: 1px solid #e2e8f0 !important; background-color: rgba(255, 255, 255, 0.9) !important; backdrop-filter: blur(4px); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
          .recharts-legend-item { font-size: 12px !important; }
        `}</style>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- 1. Header Section --- */}
        <header>
          <nav className="flex items-center text-sm font-medium text-slate-500 mb-3" aria-label="Breadcrumb">
            <LayoutDashboard className="w-4 h-4 mr-1.5" /> SHG Dashboard <ChevronRight className="w-4 h-4 mx-1" />
            Manage & Apply <ChevronRight className="w-4 h-4 mx-1" />
            <span className="font-semibold text-indigo-600">Benefits</span>
          </nav>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              <span className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl text-white shadow-lg"><Gift className="w-8 h-8" /></span>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Benefits Received by SHG</h1>
                <p className="text-slate-500 mt-1">View subsidy, welfare, asset, and training benefits.</p>
              </div>
            </div>
             <div className="flex items-center gap-2">
                 <button onClick={() => handleExport('CSV')} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-105 shadow-sm"> <Download className="w-4 h-4 text-green-600" /> Export CSV </button>
                 <button onClick={() => handleExport('PDF')} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-105 shadow-sm"> <Download className="w-4 h-4 text-red-600" /> Export PDF </button>
                 <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-105 shadow-sm"> <Printer className="w-4 h-4" /> Print </button>
             </div>
          </div>
        </header>

        {/* --- 2. Summary Metric Cards --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            <MetricCard title="Total Benefits" value={MOCK_SUMMARY_STATS.totalBenefits} icon={Gift} color="blue" />
            <MetricCard title="Financial Benefits" value={formatCurrency(MOCK_SUMMARY_STATS.totalFinancial)} icon={DollarSign} color="green" />
            <MetricCard title="Subsidy Received" value={formatCurrency(MOCK_SUMMARY_STATS.subsidyReceived)} icon={Receipt} color="sky" />
            <MetricCard title="Assets Issued" value={MOCK_SUMMARY_STATS.assetsIssued} icon={Wrench} color="purple" />
            <MetricCard title="Members Trained" value={MOCK_SUMMARY_STATS.membersTrained} icon={GraduationCap} color="amber" />
            <MetricCard title="Insurance / Safety" value={MOCK_SUMMARY_STATS.insuranceActive ? "Active" : "N/A"} icon={ShieldCheck} color="blue" />
        </section>

        {/* --- 3. Detailed Benefits Table --- */}
        <GlassCard>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><ListChecks className="text-indigo-600"/> Detailed Benefits Log</h2>
                 <div className="relative w-full sm:w-60">
                    <input type="text" placeholder="Search benefits..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-full p-2 pl-9 text-sm rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-sm">
                   <thead className="bg-slate-100/70 text-slate-700 font-medium">
                        <tr>
                            <SortableHeader colKey="name" title="Benefit Name" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[180px]" />
                            <SortableHeader colKey="type" title="Type" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[100px]" />
                            <SortableHeader colKey="scheme" title="Scheme/Program" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[180px]" />
                            <SortableHeader colKey="date" title="Date Availed" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                            <SortableHeader colKey="value" title="Amount/Value (₹)" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[140px] text-right" />
                            <th className="px-4 py-2 text-left min-w-[150px]">Provider Office</th>
                            <th className="px-4 py-2 text-center min-w-[120px]">Proof Document</th>
                            <SortableHeader colKey="status" title="Status" sortConfig={sortConfig} requestSort={requestSort} className="min-w-[120px]" />
                        </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-200/50">
                        {paginatedBenefits.map(item => (
                            <tr key={item.id} className="hover:bg-sky-50/30 transition-colors">
                                <td className="px-4 py-3 text-indigo-700 font-semibold">{item.name}</td>
                                <td className="px-4 py-3 text-slate-700">{item.type}</td>
                                <td className="px-4 py-3 text-slate-700">{item.scheme}</td>
                                <td className="px-4 py-3 text-slate-700">{new Date(item.date).toLocaleDateString('en-GB')}</td>
                                <td className="px-4 py-3 text-slate-800 font-medium text-right">{formatCurrency(item.value)}</td>
                                <td className="px-4 py-3 text-slate-600">{item.provider}</td>
                                <td className="px-4 py-3 text-center">
                                    <button onClick={() => handleViewDocument(item.docUrl)} disabled={!item.docUrl}
                                            className="p-1.5 rounded-md text-indigo-600 hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed" title="View Document">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </td>
                                <td className="px-4 py-3"><BenefitStatusBadge status={item.status as BenefitStatus} /></td>
                            </tr>
                        ))}
                        {paginatedBenefits.length === 0 && (<tr><td colSpan={8} className="text-center py-8 text-slate-500">No benefits found.</td></tr>)}
                   </tbody>
                </table>
             </div>
             {/* Pagination */}
             {totalPages > 1 && (
                 <div className="flex justify-between items-center p-3 border-t border-slate-200/50">
                   <div className="flex items-center gap-2"><label htmlFor="rowsPerPage" className="text-xs text-slate-600">Rows:</label><select id="rowsPerPage" value={rowsPerPage} onChange={(e)=>{setRowsPerPage(Number(e.target.value));setCurrentPage(1);}} className="p-1.5 rounded-md border-slate-300 text-xs focus:ring-indigo-500"><option value={5}>5</option><option value={10}>10</option><option value={20}>20</option></select></div>
                   <div className="flex items-center gap-2"><span className="text-xs text-slate-600">Page {currentPage} of {totalPages}</span><button onClick={()=>setCurrentPage(p=>Math.max(p-1,1))} disabled={currentPage===1} className="p-1.5 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronLeft className="w-4 h-4"/></button><button onClick={()=>setCurrentPage(p=>Math.min(p+1,totalPages))} disabled={currentPage===totalPages} className="p-1.5 rounded-md disabled:opacity-50 hover:bg-indigo-100"><ChevronRight className="w-4 h-4"/></button></div>
                 </div>
             )}
        </GlassCard>

        {/* --- 4, 5, 6. Subsidy, Assets, Training Sections --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subsidy/Grant Card */}
            <GlassCard className="lg:col-span-1">
                <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><Receipt className="text-purple-600"/> Subsidy & Grant Status</h2>
                {/* Placeholder for Timeline/Progress */}
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center text-sm text-slate-600 mb-4">
                    <p>Timeline for Subsidy 'Working Capital Subsidy'</p>
                    {/* Basic Progress: Approved -> Pending Release -> Released */}
                    <div className="w-full bg-slate-200 rounded-full h-2.5 mt-2"><div className="bg-blue-500 h-2.5 rounded-l-full w-[33%]"></div></div> 
                    <p className="text-xs mt-1">Status: Approved</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleUploadProof} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-105 shadow-sm"> <UploadCloud className="w-4 h-4" /> Upload Utilization </button>
                    <button onClick={() => handleDownloadCertificate('/docs/subsidy_sanction.pdf')} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-105 shadow-sm"> <Download className="w-4 h-4" /> Download Sanction </button>
                </div>
            </GlassCard>

            {/* Assets Card */}
             <GlassCard className="lg:col-span-1">
                 <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><PackagePlus className="text-sky-600"/> Assets & Equipment</h2>
                 <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                     {MOCK_ASSETS.map(asset => (
                         <div key={asset.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center text-sm">
                            <div>
                                <p className="font-semibold text-slate-800">{asset.name}</p>
                                <p className="text-xs text-slate-500">Issued: {new Date(asset.date).toLocaleDateString('en-GB')} | Source: {asset.provider}</p>
                            </div>
                            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded">New</span>
                         </div>
                     ))}
                     {MOCK_ASSETS.length === 0 && <p className="text-sm text-slate-500 text-center py-4">No assets recorded.</p>}
                 </div>
             </GlassCard>
             
             {/* Training & Welfare Card */}
             <GlassCard className="lg:col-span-2"> {/* Span across two columns */}
                 <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><GraduationCap className="text-amber-600"/> Training & Welfare</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {/* Training List */}
                     <div className="space-y-3">
                         <h3 className="font-medium text-slate-700">Completed Training</h3>
                         {MOCK_TRAINING.map(train => (
                            <div key={train.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm">
                                <p className="font-semibold text-slate-800">{train.name}</p>
                                <p className="text-xs text-slate-500">Completed: {new Date(train.date).toLocaleDateString('en-GB')}</p>
                                <button onClick={() => handleDownloadCertificate(train.docUrl)} disabled={!train.docUrl} className="mt-1 text-xs font-medium text-indigo-600 hover:underline disabled:opacity-50 disabled:no-underline">Download Certificate</button>
                            </div>
                         ))}
                         {MOCK_TRAINING.length === 0 && <p className="text-sm text-slate-500 text-center py-4">No training completed.</p>}
                     </div>
                      {/* Welfare Items */}
                     <div className="space-y-3">
                         <h3 className="font-medium text-slate-700">Welfare & Safety Items</h3>
                         {MOCK_WELFARE.map(item => (
                             <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center text-sm">
                                <div>
                                    <p className="font-semibold text-slate-800">{item.name}</p>
                                    <p className="text-xs text-slate-500">Received: {new Date(item.date).toLocaleDateString('en-GB')}</p>
                                </div>
                                <BenefitStatusBadge status={item.status as BenefitStatus} />
                             </div>
                         ))}
                         {MOCK_WELFARE.length === 0 && <p className="text-sm text-slate-500 text-center py-4">No welfare items recorded.</p>}
                     </div>
                 </div>
             </GlassCard>
        </section>

        {/* --- 7. Charts Section --- */}
        <GlassCard>
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><BarChart3 className="text-purple-600"/> Benefit Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-72">
                 {/* Pie Chart */}
                 <div>
                    <h3 className="text-md font-semibold text-slate-700 mb-2 text-center">Benefit Category Distribution</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                          {pieData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} className="focus:outline-none"/> ))} </Pie>
                        <RechartsTooltip formatter={(value, name) => [`${value} Benefits`, name]} />
                        <Legend iconType="circle" wrapperStyle={{fontSize: "12px"}}/>
                      </PieChart>
                    </ResponsiveContainer>
                 </div>
                 {/* Line Chart */}
                 <div>
                    <h3 className="text-md font-semibold text-slate-700 mb-2 text-center">Financial Benefits Trend (Lakhs ₹)</h3>
                     <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={monthlyBenefitTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5}/> 
                         <XAxis dataKey="month" fontSize={11} /> 
                         <YAxis fontSize={11} tickFormatter={(val) => `₹${val}L`}/>
                         <RechartsTooltip formatter={(value) => [`₹${value} Lakh`, 'Value']} />
                         <Line type="monotone" dataKey="value" name="Benefit Value" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                       </LineChart>
                     </ResponsiveContainer>
                 </div>
            </div>
        </GlassCard>

        {/* --- Footer --- */}
        <footer className="text-center mt-12 text-xs text-slate-500">
           NSKFDC SHG Dashboard &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};

export default BenefitsPage;