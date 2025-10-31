// This is your page.tsx file
// Ensure you have React, TailwindCSS, recharts, and lucide-react installed:
// npm install recharts lucide-react

'use client'; // For Next.js App Router

import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area
} from 'recharts';
import {
  LayoutDashboard, ChevronRight, Briefcase, PlusCircle, CheckCircle, Clock, XCircle, FileClock,
  DollarSign, BarChart3, ListFilter, Search, X, Eye, Edit, Trash2, FileText,
  Users, Calendar, TrendingUp, Download, ArrowRight, Activity, Zap, FileUp, Filter, FolderKanban, ActivitySquare,
  BadgePercent, ListChecks, UploadCloud, Send, Loader2, Award, ClipboardList, Info, Sparkles, Receipt, Paperclip,
  ChevronLeft, ChevronRight as ChevronRightIcon, Wallet, Banknote, Landmark, Link as LinkIcon, RefreshCw, HandCoins, Truck, LineChart as LineChartIcon,
  PieChart as PieChartIcon
} from 'lucide-react';

// --- Mock Data ---

const MOCK_SUMMARY = {
  loanSanctioned: 1500000,
  amountReceived: 1200000,
  salaryPaid: 350000,
  balanceLoan: 1380000, // Sanctioned - (Repaid)
  repaid: 120000,
};

const MOCK_REPAYMENT_SCHEDULE = [
  { id: 1, emiDate: '2025-11-05', amount: 25000, status: 'Upcoming' },
  { id: 2, emiDate: '2025-10-05', amount: 25000, status: 'Paid' },
  { id: 3, emiDate: '2025-09-05', amount: 25000, status: 'Paid' },
  { id: 4, emiDate: '2025-08-05', amount: 25000, status: 'Paid' },
];

const MOCK_SALARY_LOG = [
  { id: 'SAL-001', memberName: 'Sunita Devi', date: '2025-10-20', amount: 8000, mode: 'Bank Transfer' },
  { id: 'SAL-002', memberName: 'Rina Kumari', date: '2025-10-20', amount: 8000, mode: 'Bank Transfer' },
  { id: 'SAL-003', memberName: 'Asha Singh', date: '2025-10-20', amount: 8000, mode: 'Bank Transfer' },
  { id: 'SAL-004', memberName: 'Geeta Prasad', date: '2025-09-20', amount: 7500, mode: 'Bank Transfer' },
];

const MOCK_ASSET_LOG = [
  { id: 'AST-001', assetType: 'Sewing Machine (x5)', date: '2025-09-01', value: 75000, source: 'Loan Fund' },
  { id: 'AST-002', assetType: 'Raw Materials (Cloth)', date: '2025-09-05', value: 40000, source: 'Loan Fund' },
  { id: 'AST-003', assetType: 'Delivery E-Rickshaw', date: '2025-09-15', value: 120000, source: 'Grant' },
];

const MOCK_REVENUE_LOG = [
  { id: 'REV-001', source: 'Govt. Contract #102', date: '2025-10-15', amount: 50000 },
  { id: 'REV-002', source: 'Local Market Sales', date: '2025-10-18', amount: 22000 },
  { id: 'REV-003', source: 'Govt. Contract #101', date: '2025-09-15', amount: 45000 },
];

const PIE_COLORS = ['#1d4ed8', '#e2e8f0']; // Royal Blue, Gray
const BAR_COLORS = ['#10b981', '#7c3aed']; // Emerald, Purple

// --- Reusable Components ---

// 1. Shiny/Glass Metric Card
type MetricCardProps = { title: string; value: string; icon: React.ElementType; color: string; }; // color: 'blue', 'green', 'purple', 'amber'
const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', shadow: 'shadow-blue-500/30' },
    green: { bg: 'bg-green-100', text: 'text-green-600', shadow: 'shadow-green-500/30' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', shadow: 'shadow-purple-500/30' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-600', shadow: 'shadow-amber-500/30' },
  }[color] || { bg: 'bg-slate-100', text: 'text-slate-600', shadow: 'shadow-slate-500/30' };

  return (
    <div className={`relative p-5 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/50 
                   transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 transform-gpu overflow-hidden ${colorClasses.shadow} hover:shadow-lg`}>
      <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full ${colorClasses.bg} opacity-50 blur-lg`}></div>
      <div className="relative z-10 flex items-center space-x-4">
        <div className={`p-3 rounded-xl ${colorClasses.bg}`}>
          <Icon className={`w-6 h-6 ${colorClasses.text}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
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

// 3. Tab Button
type TabButtonProps = { title: string; icon: React.ElementType; active: boolean; onClick: () => void; };
const TabButton: React.FC<TabButtonProps> = ({ title, icon: Icon, active, onClick }) => (
  <button onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold rounded-lg transition-all
               ${active ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'}`}>
    <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
    {title}
  </button>
);

// 4. Status Badge
type Status = 'Paid' | 'Upcoming' | 'Pending';
const PaymentStatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const config = {
    Paid: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    Upcoming: { bg: 'bg-sky-100', text: 'text-sky-700' },
    Pending: { bg: 'bg-amber-100', text: 'text-amber-700' },
  }[status];
  return ( <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}> {status} </span> );
};

// 5. Gradient Button
type GradientButtonProps = { text: string; icon: React.ElementType; onClick?: () => void; className?: string; };
const GradientButton: React.FC<GradientButtonProps> = ({ text, icon: Icon, onClick, className = '' }) => (
  <button onClick={onClick}
    className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full text-white text-sm font-semibold
               bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 shadow-lg hover:shadow-blue-500/30 
               transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${className}`}>
    <Icon className="w-5 h-5" /> <span>{text}</span>
  </button>
);

// Added currency formatter function
const formatCurrency = (amount: number) => amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });

// --- Main Page Component ---
const MyFinancesPage = () => {
  const [activeTab, setActiveTab] = useState<'salary' | 'assets' | 'revenue'>('salary');
  
  // Chart Data
  const repaymentData = [
    { name: 'Amount Repaid', value: MOCK_SUMMARY.repaid },
    { name: 'Balance Loan', value: MOCK_SUMMARY.balanceLoan },
  ];
  
  const incomeExpenseData = [
    { name: 'Sept', Income: 45000, Salary: 30000 },
    { name: 'Oct', Income: 72000, Salary: 32000 },
  ];
  
  const loanProgressPercent = (MOCK_SUMMARY.repaid / MOCK_SUMMARY.loanSanctioned) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-sky-100 p-4 md:p-8 font-sans animate-fade-in">
        {/* Inline Styles for Animations */}
        <style jsx global>{`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
          .recharts-default-tooltip {
            border-radius: 0.75rem !important;
            border: 1px solid #e2e8f0 !important;
            background-color: rgba(255, 255, 255, 0.8) !important;
            backdrop-filter: blur(4px);
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          }
        `}</style>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- 1. Header Section --- */}
        <header>
          <nav className="flex items-center text-sm font-medium text-slate-500 mb-3" aria-label="Breadcrumb">
            <LayoutDashboard className="w-4 h-4 mr-1.5" /> SHG Dashboard <ChevronRight className="w-4 h-4 mx-1" />
            Manage & Apply <ChevronRight className="w-4 h-4 mx-1" />
            <span className="font-semibold text-indigo-600">My Finances</span>
          </nav>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              <span className="p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl text-white shadow-lg"><Wallet className="w-8 h-8" /></span>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">My Finances</h1>
                <p className="text-slate-500 mt-1">View loan, disbursement, earnings & payment details.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
                <GradientButton text="Add Manual Entry" icon={PlusCircle} className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600" />
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-105 shadow-sm">
                    <Download className="w-4 h-4" /> Export Report
                </button>
            </div>
          </div>
        </header>

        {/* --- 2. Summary Metric Cards --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard title="Total Loan Sanctioned" value={formatCurrency(MOCK_SUMMARY.loanSanctioned)} icon={Banknote} color="blue" />
            <MetricCard title="Total Amount Received" value={formatCurrency(MOCK_SUMMARY.amountReceived)} icon={HandCoins} color="green" />
            <MetricCard title="Total Salary Paid" value={formatCurrency(MOCK_SUMMARY.salaryPaid)} icon={Users} color="purple" />
            <MetricCard title="Balance Loan" value={formatCurrency(MOCK_SUMMARY.balanceLoan)} icon={TrendingUp} color="amber" />
        </section>

        {/* --- 3. Main Content Grid --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* --- Left Column (Main) --- */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Loan & Repayment Card */}
                <GlassCard>
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Loan & Repayment Details</h2>
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">Total Sanctioned</span>
                            <span className="font-bold text-slate-800">{formatCurrency(MOCK_SUMMARY.loanSanctioned)}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                            <div className="bg-gradient-to-r from-sky-400 to-blue-500 h-3 rounded-full transition-all duration-500" style={{ width: `${loanProgressPercent}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center text-xs font-medium">
                            <span className="text-green-600">Repaid: {formatCurrency(MOCK_SUMMARY.repaid)} ({loanProgressPercent.toFixed(1)}%)</span>
                            <span className="text-slate-500">Balance: {formatCurrency(MOCK_SUMMARY.balanceLoan)}</span>
                        </div>
                    </div>

                    <h3 className="text-md font-semibold text-slate-700 mb-3">Repayment Schedule</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100/70">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-slate-600">EMI Date</th>
                                    <th className="px-4 py-2 text-right font-medium text-slate-600">Amount</th>
                                    <th className="px-4 py-2 text-center font-medium text-slate-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_REPAYMENT_SCHEDULE.map(item => (
                                <tr key={item.id} className="border-b border-slate-200/50">
                                    <td className="px-4 py-3 text-slate-700">{item.emiDate}</td>
                                    <td className="px-4 py-3 text-slate-800 font-medium text-right">{formatCurrency(item.amount)}</td>
                                    <td className="px-4 py-3 text-center"><PaymentStatusBadge status={item.status as Status} /></td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>

                {/* Financial Trackers (Tabs) */}
                <GlassCard>
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Financial Trackers</h2>
                    {/* Tab Navigation */}
                    <div className="p-1.5 rounded-xl bg-slate-100 flex items-center mb-4">
                        <TabButton title="Salary Disbursement" icon={Users} active={activeTab === 'salary'} onClick={() => setActiveTab('salary')} />
                        <TabButton title="Asset Deployment" icon={Truck} active={activeTab === 'assets'} onClick={() => setActiveTab('assets')} />
                        <TabButton title="Revenue Monitoring" icon={LineChartIcon} active={activeTab === 'revenue'} onClick={() => setActiveTab('revenue')} />
                    </div>
                    {/* Tab Content */}
                    <div className="overflow-x-auto">
                        {activeTab === 'salary' && (
                            <table className="w-full text-sm">
                                <thead className="bg-slate-100/70"><tr><th className="px-4 py-2 text-left font-medium text-slate-600">Member Name</th><th className="px-4 py-2 text-left font-medium text-slate-600">Date</th><th className="px-4 py-2 text-right font-medium text-slate-600">Amount</th><th className="px-4 py-2 text-left font-medium text-slate-600">Mode</th></tr></thead>
                                <tbody>{MOCK_SALARY_LOG.map(log => (<tr key={log.id} className="border-b border-slate-200/50"><td className="px-4 py-3 text-slate-700">{log.memberName}</td><td className="px-4 py-3 text-slate-700">{log.date}</td><td className="px-4 py-3 text-slate-800 font-medium text-right">{formatCurrency(log.amount)}</td><td className="px-4 py-3 text-slate-600">{log.mode}</td></tr>))}</tbody>
                            </table>
                        )}
                         {activeTab === 'assets' && (
                            <table className="w-full text-sm">
                                <thead className="bg-slate-100/70"><tr><th className="px-4 py-2 text-left font-medium text-slate-600">Asset Type</th><th className="px-4 py-2 text-left font-medium text-slate-600">Date</th><th className="px-4 py-2 text-right font-medium text-slate-600">Value</th><th className="px-4 py-2 text-left font-medium text-slate-600">Source</th></tr></thead>
                                <tbody>{MOCK_ASSET_LOG.map(log => (<tr key={log.id} className="border-b border-slate-200/50"><td className="px-4 py-3 text-slate-700">{log.assetType}</td><td className="px-4 py-3 text-slate-700">{log.date}</td><td className="px-4 py-3 text-slate-800 font-medium text-right">{formatCurrency(log.value)}</td><td className="px-4 py-3 text-slate-600">{log.source}</td></tr>))}</tbody>
                            </table>
                        )}
                         {activeTab === 'revenue' && (
                            <table className="w-full text-sm">
                                <thead className="bg-slate-100/70"><tr><th className="px-4 py-2 text-left font-medium text-slate-600">Source</th><th className="px-4 py-2 text-left font-medium text-slate-600">Date</th><th className="px-4 py-2 text-right font-medium text-slate-600">Amount</th></tr></thead>
                                <tbody>{MOCK_REVENUE_LOG.map(log => (<tr key={log.id} className="border-b border-slate-200/50"><td className="px-4 py-3 text-slate-700">{log.source}</td><td className="px-4 py-3 text-slate-700">{log.date}</td><td className="px-4 py-3 text-green-700 font-bold text-right">{formatCurrency(log.amount)}</td></tr>))}</tbody>
                            </table>
                        )}
                    </div>
                </GlassCard>
            </div>

            {/* --- Right Column (Sidebar) --- */}
            <div className="lg:col-span-1 space-y-6">
                
                {/* Bank Linkage Card */}
                <GlassCard>
                    <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><Landmark className="text-indigo-600" /> Bank & Integration</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-xs font-medium text-slate-500">Linked Bank Account</p>
                            <p className="text-md font-semibold text-slate-800">State Bank of India</p>
                            <p className="text-sm text-slate-600">A/C: **** **** 1234</p>
                            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-700"><CheckCircle className="w-3.5 h-3.5" /> Verified (API Synced)</div>
                        </div>
                        <GradientButton text="Sync Data Now" icon={RefreshCw} className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600" />
                        <button className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-full text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all hover:scale-105 shadow-sm">
                            <PlusCircle className="w-4 h-4" /> Add Manual Entry
                        </button>
                    </div>
                </GlassCard>
                
                {/* Repayment Progress Chart */}
                <GlassCard>
                    <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><PieChartIcon className="text-blue-600" /> Repayment Progress</h2>
                    <div className="w-full h-56">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={repaymentData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                                    {repaymentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} className="focus:outline-none" />
                                    ))}
                                </Pie>
                                <RechartsTooltip formatter={(value) => formatCurrency(value as number)} />
                                <Legend iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
                
                {/* Income vs Salary Chart */}
                <GlassCard>
                    <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><BarChart3 className="text-purple-600" /> Income vs. Salary</h2>
                    <div className="w-full h-56">
                       <ResponsiveContainer>
                            <BarChart data={incomeExpenseData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5} />
                                <XAxis dataKey="name" fontSize={11} />
                                <YAxis fontSize={11} tickFormatter={(val) => `₹${val/1000}k`} />
                                <RechartsTooltip formatter={(value) => formatCurrency(value as number)} />
                                <Legend />
                                <Bar dataKey="Income" fill={BAR_COLORS[0]} radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Salary" fill={BAR_COLORS[1]} radius={[4, 4, 0, 0]} />
                            </BarChart>
                       </ResponsiveContainer>
                    </div>
                </GlassCard>

            </div>
        </section>

        {/* --- Footer --- */}
        <footer className="text-center mt-12 text-xs text-slate-500">
           NSKFDC SHG Dashboard &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};

export default MyFinancesPage;