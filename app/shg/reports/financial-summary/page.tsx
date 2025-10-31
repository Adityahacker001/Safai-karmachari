// This is your page.tsx file
// Required installs:
// npm install recharts lucide-react framer-motion

'use client'; // For Next.js App Router

import React, { useState, useMemo, useEffect } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import {
  LayoutDashboard,
  ChevronRight,
  Search,
  FileDown,
  RefreshCcw,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertTriangle,
  ChevronLeft,
  Clock,
  Wallet,
  Package,
  PiggyBank,
  Landmark,
  HandCoins,
  Receipt,
  Eye,
  Banknote,
  UploadCloud,
  MessageSquare,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';

// --- MOCK DATA & TYPES ---

type RepaymentStatus = 'On Track' | 'Delayed' | 'At Risk' | 'Pending';

interface FinancialRecord {
  id: string;
  schemeName: string;
  sanctioned: number;
  disbursed: number;
  utilized: number;
  loanAmount: number;
  loanRepaid: number;
  lastPaymentDate: string | null;
  // Calculated fields
  remaining: number;
  outstanding: number;
  status: RepaymentStatus;
}

// Helper to calculate status
const calculateStatus = (outstanding: number, lastPaymentDate: string | null): RepaymentStatus => {
  if (outstanding <= 0) return 'On Track';
  if (!lastPaymentDate) return 'Pending';
  const today = new Date();
  const lastPaid = new Date(lastPaymentDate);
  const diffTime = today.getTime() - lastPaid.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 60) return 'At Risk';
  if (diffDays > 30) return 'Delayed';
  return 'On Track';
};

// Mock Data for the Table
const MOCK_TABLE_DATA: Omit<FinancialRecord, 'remaining' | 'outstanding' | 'status'>[] = [
  { id: 'SHG-001', schemeName: 'Mahila Shakti Udyam', sanctioned: 500000, disbursed: 450000, utilized: 420000, loanAmount: 450000, loanRepaid: 150000, lastPaymentDate: '2025-10-15' },
  { id: 'SHG-002', schemeName: 'Grameen Vikas Loan', sanctioned: 300000, disbursed: 300000, utilized: 280000, loanAmount: 300000, loanRepaid: 50000, lastPaymentDate: '2025-08-20' }, // Delayed
  { id: 'SHG-003', schemeName: 'Swayam Rojgar Yojna', sanctioned: 700000, disbursed: 600000, utilized: 550000, loanAmount: 600000, loanRepaid: 100000, lastPaymentDate: '2025-05-01' }, // At Risk
  { id: 'SHG-004', schemeName: 'Kushal Karigar Grant', sanctioned: 200000, disbursed: 200000, utilized: 200000, loanAmount: 0, loanRepaid: 0, lastPaymentDate: null }, // Grant, On Track
  { id: 'SHG-005', schemeName: 'Mahila E-Rickshaw', sanctioned: 150000, disbursed: 150000, utilized: 140000, loanAmount: 150000, loanRepaid: 120000, lastPaymentDate: '2025-10-20' },
  { id: 'SHG-006', schemeName: 'Annapurna Catering', sanctioned: 400000, disbursed: 200000, utilized: 180000, loanAmount: 200000, loanRepaid: 20000, lastPaymentDate: '2025-10-05' },
];

// Processing data to add calculated fields
const processedTableData: FinancialRecord[] = MOCK_TABLE_DATA.map(item => {
  const remaining = item.disbursed - item.utilized;
  const outstanding = item.loanAmount - item.loanRepaid;
  const status = item.loanAmount > 0 ? calculateStatus(outstanding, item.lastPaymentDate) : 'On Track';
  return { ...item, remaining, outstanding, status };
});

// Mock Data for Charts
const fundFlowData = [
  { name: 'Apr', S: 5, D: 3, U: 2 },
  { name: 'May', S: 8, D: 6, U: 5 },
  { name: 'Jun', S: 12, D: 10, U: 8 },
  { name: 'Jul', S: 15, D: 14, U: 12 },
  { name: 'Aug', S: 18, D: 16, U: 15 },
  { name: 'Sep', S: 22, D: 19, U: 18 },
  { name: 'Oct', S: 25, D: 22, U: 21 },
]; // Values in Lakhs

const totalLoan = processedTableData.reduce((acc, item) => acc + item.loanAmount, 0);
const totalRepaid = processedTableData.reduce((acc, item) => acc + item.loanRepaid, 0);
const totalOutstanding = totalLoan - totalRepaid;

const loanRepaymentData = [
  { name: 'Total Loan', value: totalLoan },
  { name: 'Repaid', value: totalRepaid },
  { name: 'Outstanding', value: totalOutstanding },
];

const categoryData = [
  { name: 'Equipment', value: 45 },
  { name: 'Training', value: 15 },
  { name: 'Supplies', value: 25 },
  { name: 'Admin', value: 10 },
  { name: 'Misc.', value: 5 },
];

const CHART_COLORS = {
  S: '#8884d8', // Violet (Sanctioned)
  D: '#38bdf8', // Sky (Disbursed)
  U: '#2dd4bf', // Emerald (Utilized)
  Loan: '#8b5cf6', // Violet
  Repaid: '#10b981', // Emerald
  Outstanding: '#f59e0b', // Amber
};

const PIE_COLORS = ['#8b5cf6', '#38bdf8', '#2dd4bf', '#f59e0b', '#a855f7'];

const mockFilters = {
  fy: ['2024-25', '2023-24', '2022-23'],
  schemes: ['Mahila Shakti Udyam', 'Grameen Vikas Loan', 'Swayam Rojgar Yojna', 'Kushal Karigar Grant', 'Mahila E-Rickshaw', 'Annapurna Catering'],
  districts: ['Pune', 'Mumbai', 'Nagpur', 'Nashik'],
  shgs: ['Navchetana Mahila Bachat Gat'],
};

// --- Reusable Components ---

/**
 * Formats a number as Indian Rupee currency.
 */
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * A reusable glassmorphism card wrapper.
 */
const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 dark:border-slate-700/50 ${className}`}>
    {children}
  </div>
);

/**
 * Animated Counter for KPI Cards
 */
const AnimatedCounter: React.FC<{ value: number; format: (val: number) => string }> = ({ value, format }) => {
  const spring = useSpring(0, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  });
  const display = useTransform(spring, (current) => format(current));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
};

/**
 * KPI Summary Card
 */
type SummaryCardProps = {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  format?: 'currency' | 'number';
};

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon, color, format = 'currency' }) => {
  const formatter = format === 'currency' ? formatCurrency : (val: number) => val.toLocaleString();
  return (
    <motion.div whileHover={{ y: -5, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
      <GlassCard className="p-5">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-full bg-gradient-to-br ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{title}</span>
        </div>
        <div className="mt-4 text-right">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            <AnimatedCounter value={value} format={formatter} />
          </h3>
        </div>
      </GlassCard>
    </motion.div>
  );
};

/**
 * Status Badge Component
 */
const StatusBadge: React.FC<{ status: RepaymentStatus }> = ({ status }) => {
  const config = {
    'On Track': {
      bg: 'bg-emerald-100 dark:bg-emerald-900/50',
      text: 'text-emerald-700 dark:text-emerald-300',
      icon: CheckCircle,
    },
    'Delayed': {
      bg: 'bg-amber-100 dark:bg-amber-900/50',
      text: 'text-amber-700 dark:text-amber-300',
      icon: Clock,
    },
    'At Risk': {
      bg: 'bg-red-100 dark:bg-red-900/50',
      text: 'text-red-700 dark:text-red-300',
      icon: AlertTriangle,
    },
    'Pending': {
      bg: 'bg-slate-100 dark:bg-slate-700/50',
      text: 'text-slate-500 dark:text-slate-400',
      icon: Calendar,
    },
  };

  const { bg, text, icon: Icon } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};

/**
 * Sortable Table Header
 */
type SortConfig = { key: keyof FinancialRecord; direction: 'asc' | 'desc' } | null;
type SortableHeaderProps = {
  colKey: keyof FinancialRecord;
  title: string;
  sortConfig: SortConfig;
  requestSort: (key: keyof FinancialRecord) => void;
  className?: string;
};

const SortableHeader: React.FC<SortableHeaderProps> = ({ colKey, title, sortConfig, requestSort, className = '' }) => {
  const getSortIcon = () => {
    if (!sortConfig || sortConfig.key !== colKey) return <ChevronDown className="w-4 h-4 opacity-30" />;
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };
  return (
    <th
      className={`px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer transition-colors hover:bg-indigo-50 dark:hover:bg-slate-700 ${className}`}
      onClick={() => requestSort(colKey)}
    >
      <div className="flex items-center gap-1">{title}{getSortIcon()}</div>
    </th>
  );
};

/**
 * Monthly Breakdown Modal
 */
const BreakdownModal: React.FC<{ item: FinancialRecord | null; isOpen: boolean; onClose: () => void }> = ({ item, isOpen, onClose }) => {
  const modalBackdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.9, y: 50 },
  };

  const mockModalData = {
    utilization: [
      { month: 'Oct 2025', amount: 50000, proofs: ['invoice_oct.pdf', 'bank_stmt_oct.pdf'] },
      { month: 'Sep 2025', amount: 70000, proofs: ['invoice_sep.pdf'] },
      { month: 'Aug 2025', amount: 100000, proofs: ['invoice_aug.pdf', 'uc_aug.pdf'] },
    ],
    emi: [
      { date: '2025-10-15', amount: 12500, status: 'Paid' },
      { date: '2025-09-15', amount: 12500, status: 'Paid' },
      { date: '2025-08-15', amount: 12500, status: 'Paid' },
      { date: '2025-11-15', amount: 12500, status: 'Upcoming' },
    ],
    comments: [
      { user: 'Officer Ramesh K.', date: '2025-10-16', text: 'Reviewed October proofs. All in order. Next EMI payment on time.' },
      { user: 'SHG Member Priya S.', date: '2025-10-01', text: 'Uploaded October invoices for equipment purchase.' },
    ],
  };

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalContentVariants}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <div>
                <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{item.schemeName}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Monthly Breakdown & EMI Timeline</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Section: Monthly Utilization */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    <PiggyBank className="w-5 h-5 text-emerald-500" />
                    Month-wise Utilization
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {mockModalData.utilization.map((util) => (
                      <div key={util.month} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-sm text-slate-600 dark:text-slate-300">{util.month}</span>
                          <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400">{formatCurrency(util.amount)}</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          {util.proofs.map((proof) => (
                            <span key={proof} className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                              <UploadCloud className="w-3 h-3" />
                              {proof}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section: EMI Payment Timeline */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-sky-500" />
                    EMI Payment Timeline
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {mockModalData.emi.map((emi) => (
                      <div key={emi.date} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                        <div>
                          <span className="font-semibold text-sm text-slate-600 dark:text-slate-300">{emi.date}</span>
                          <span className="ml-2 font-bold text-sm text-slate-800 dark:text-slate-100">{formatCurrency(emi.amount)}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${emi.status === 'Paid' ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' : 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'}`}>
                          {emi.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section: Officer Comments */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-violet-500" />
                  Officer Comments
                </h3>
                <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                  {mockModalData.comments.map((comment) => (
                    <div key={comment.date} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <p className="text-sm text-slate-700 dark:text-slate-300">{comment.text}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                        — {comment.user} on {comment.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end items-center p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 gap-3 mt-auto">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


// --- Main Page Component ---
const FinancialSummaryPage: React.FC = () => {
  // --- State ---
  const [filters, setFilters] = useState({ fy: '2024-25', scheme: '', district: '', shg: 'Navchetana Mahila Bachat Gat', search: '' });
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'sanctioned', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FinancialRecord | null>(null);

  // --- Handlers ---
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetFilters = () => {
    setFilters({ fy: '', scheme: '', district: '', shg: 'Navchetana Mahila Bachat Gat', search: '' });
  };

  const handleSort = (key: keyof FinancialRecord) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const openModal = (item: FinancialRecord) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // --- Memoized Data ---

  // 1. Filtered & Sorted Data
  const sortedData = useMemo(() => {
    let data = [...processedTableData];

    // Apply search
    if (filters.search) {
      data = data.filter(item =>
        item.schemeName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    // Apply filters (example for scheme)
    if (filters.scheme) {
      data = data.filter(item => item.schemeName === filters.scheme);
    }
    // Note: Add other filters (fy, district) here if needed

    // Apply sorting
    if (sortConfig !== null) {
      data.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];

        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        if (valA < valB) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [filters, sortConfig]);

  // 2. Paginated Data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  // 3. KPI Summary Calculations
  const kpiData = useMemo(() => {
    const totalSanctioned = processedTableData.reduce((acc, item) => acc + item.sanctioned, 0);
    const totalDisbursed = processedTableData.reduce((acc, item) => acc + item.disbursed, 0);
    const totalUtilized = processedTableData.reduce((acc, item) => acc + item.utilized, 0);
    const totalRemaining = totalDisbursed - totalUtilized;
    const totalLoan = processedTableData.reduce((acc, item) => acc + item.loanAmount, 0);
    const totalRepaid = processedTableData.reduce((acc, item) => acc + item.loanRepaid, 0);
    const totalOutstanding = totalLoan - totalRepaid;
    
    // Simple overall status
    const atRiskCount = processedTableData.filter(item => item.status === 'At Risk').length;
    const delayedCount = processedTableData.filter(item => item.status === 'Delayed').length;
    let overallStatus: RepaymentStatus = 'On Track';
    if (atRiskCount > 0) overallStatus = 'At Risk';
    else if (delayedCount > 0) overallStatus = 'Delayed';

    return { totalSanctioned, totalDisbursed, totalUtilized, totalRemaining, totalLoan, totalRepaid, totalOutstanding, overallStatus };
  }, [processedTableData]);

  // --- Page Fade-in Animation ---
  const pageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  return (
    <>
      <motion.div
        className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-white via-indigo-50 to-blue-100 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950 text-slate-900 dark:text-slate-200"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* 1. Header */}
          <header>
            <nav className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
              <LayoutDashboard className="w-4 h-4 mr-1.5" />
              SHG Dashboard
              <ChevronRight className="w-4 h-4 mx-1" />
              Reports
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">Financial Summary</span>
            </nav>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center space-x-4">
                <span className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
                  <Wallet className="w-8 h-8" />
                </span>
                <div>
                  <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Financial Summary Report</h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Track sanctioned funds, disbursement, utilization & repayment.
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* 2. Filter Panel */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Filter className="w-5 h-5 text-indigo-500" />
              Filter Report
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Financial Year */}
              <div className="flex-1">
                <label htmlFor="fy" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Financial Year</label>
                <select id="fy" name="fy" value={filters.fy} onChange={handleFilterChange} className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                  <option value="">All Years</option>
                  {mockFilters.fy.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
              </div>
              {/* Scheme */}
              <div className="flex-1">
                <label htmlFor="scheme" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Scheme / Project</label>
                <select id="scheme" name="scheme" value={filters.scheme} onChange={handleFilterChange} className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                  <option value="">All Schemes</option>
                  {mockFilters.schemes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {/* District */}
              <div className="flex-1">
                <label htmlFor="district" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">District (Officers Only)</label>
                <select id="district" name="district" value={filters.district} onChange={handleFilterChange} className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                  <option value="">All Districts</option>
                  {mockFilters.districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              {/* SHG Name */}
              <div className="flex-1">
                <label htmlFor="shg" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">SHG Name</label>
                <select id="shg" name="shg" value={filters.shg} onChange={handleFilterChange} className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                  {mockFilters.shgs.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={resetFilters}
                className="px-5 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
              >
                Reset Filter
              </button>
              <button
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 transition-all"
              >
                <Search className="w-4 h-4" />
                Apply Filter
              </button>
            </div>
          </GlassCard>

          {/* 3. KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard title="Total Sanctioned" value={kpiData.totalSanctioned} icon={Package} color="from-violet-500 to-purple-600" />
            <SummaryCard title="Total Funds Released" value={kpiData.totalDisbursed} icon={HandCoins} color="from-sky-500 to-blue-600" />
            <SummaryCard title="Total Utilized" value={kpiData.totalUtilized} icon={PiggyBank} color="from-emerald-500 to-green-600" />
            <SummaryCard title="Remaining Balance" value={kpiData.totalRemaining} icon={Banknote} color="from-amber-500 to-orange-600" />
            <SummaryCard title="Loan Amount" value={kpiData.totalLoan} icon={Landmark} color="from-purple-500 to-indigo-600" />
            <SummaryCard title="Loan Repaid" value={kpiData.totalRepaid} icon={CheckCircle} color="from-green-500 to-emerald-600" />
            <SummaryCard title="Loan Outstanding" value={kpiData.totalOutstanding} icon={AlertTriangle} color="from-orange-500 to-red-600" />
            
            {/* Special KPI for Status */}
            <motion.div whileHover={{ y: -5, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
              <GlassCard className="p-5 flex flex-col justify-center h-full">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Repayment Status</span>
                </div>
                <div className="mt-4 text-right">
                  <StatusBadge status={kpiData.overallStatus} />
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* 4. Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Line Chart - Fund Flow (Larger) */}
            <motion.div className="lg:col-span-3" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Fund Flow (in Lakhs)</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={fundFlowData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} />
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)', borderRadius: '0.75rem', border: '1px solid rgba(0,0,0,0.1)' }}
                        formatter={(value) => [`${value} Lakh`, null]}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="S" name="Sanctioned" stroke={CHART_COLORS.S} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="D" name="Disbursed" stroke={CHART_COLORS.D} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="U" name="Utilized" stroke={CHART_COLORS.U} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </motion.div>

            {/* Bar + Pie (Smaller) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bar Chart - Loan Repayment */}
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Loan Repayment</h3>
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={loanRepaymentData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" hide />
                        <RechartsTooltip formatter={(value) => [formatCurrency(value as number), null]} />
                        <Bar dataKey="value" barSize={20} radius={[0, 10, 10, 0]}>
                          <Cell fill={CHART_COLORS.Loan} />
                          <Cell fill={CHART_COLORS.Repaid} />
                          <Cell fill={CHART_COLORS.Outstanding} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Custom Legend */}
                  <div className="flex justify-around mt-4 text-xs">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{backgroundColor: CHART_COLORS.Loan}}></span>Loan</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{backgroundColor: CHART_COLORS.Repaid}}></span>Repaid</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{backgroundColor: CHART_COLORS.Outstanding}}></span>Outstanding</span>
                  </div>
                </GlassCard>
              </motion.div>
              
              {/* Pie Chart - Category Utilization */}
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Category-wise Utilization</h3>
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip formatter={(value) => [`${value}%`, null]} />
                        <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{fontSize: "12px", lineHeight: "1.5"}}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>

          {/* 5. Financial Summary Data Table */}
          <GlassCard>
            {/* Table Header + Search */}
            <div className="flex flex-col md:flex-row justify-between items-center p-4">
              <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Financial Summary</h2>
              <div className="relative w-full md:w-1/3 mt-3 md:mt-0">
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search by Scheme Name..."
                  className="w-full p-2.5 pl-10 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <SortableHeader colKey="schemeName" title="Scheme Name" sortConfig={sortConfig} requestSort={handleSort} className="min-w-[180px]" />
                    <SortableHeader colKey="sanctioned" title="Sanctioned" sortConfig={sortConfig} requestSort={handleSort} className="text-right" />
                    <SortableHeader colKey="disbursed" title="Disbursed" sortConfig={sortConfig} requestSort={handleSort} className="text-right" />
                    <SortableHeader colKey="utilized" title="Utilized" sortConfig={sortConfig} requestSort={handleSort} className="text-right" />
                    <SortableHeader colKey="remaining" title="Balance" sortConfig={sortConfig} requestSort={handleSort} className="text-right" />
                    <SortableHeader colKey="loanAmount" title="Loan Amt" sortConfig={sortConfig} requestSort={handleSort} className="text-right" />
                    <SortableHeader colKey="loanRepaid" title="Loan Repaid" sortConfig={sortConfig} requestSort={handleSort} className="text-right" />
                    <SortableHeader colKey="outstanding" title="Outstanding" sortConfig={sortConfig} requestSort={handleSort} className="text-right" />
                    <SortableHeader colKey="lastPaymentDate" title="Last Payment" sortConfig={sortConfig} requestSort={handleSort} />
                    <SortableHeader colKey="status" title="Status" sortConfig={sortConfig} requestSort={handleSort} />
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-indigo-50/50 dark:hover:bg-slate-700/50 transition-colors duration-150">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-indigo-700 dark:text-indigo-400">{item.schemeName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300 text-right">{formatCurrency(item.sanctioned)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-sky-700 dark:text-sky-400 font-medium text-right">{formatCurrency(item.disbursed)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-emerald-700 dark:text-emerald-400 font-medium text-right">{formatCurrency(item.utilized)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-amber-700 dark:text-amber-400 font-medium text-right">{formatCurrency(item.remaining)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300 text-right">{formatCurrency(item.loanAmount)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-green-700 dark:text-green-400 font-medium text-right">{formatCurrency(item.loanRepaid)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-700 dark:text-red-400 font-medium text-right">{formatCurrency(item.outstanding)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{item.lastPaymentDate || 'N/A'}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={item.status} /></td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => openModal(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                        >
                          <Eye className="w-4 h-4" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex justify-between items-center p-4 border-t border-slate-200 dark:border-slate-700">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Showing {Math.min((currentPage - 1) * rowsPerPage + 1, sortedData.length)}
                - {Math.min(currentPage * rowsPerPage, sortedData.length)} of {sortedData.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg enabled:hover:bg-indigo-100 dark:enabled:hover:bg-slate-700 disabled:opacity-50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg enabled:hover:bg-indigo-100 dark:enabled:hover:bg-slate-700 disabled:opacity-50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </GlassCard>
          
          {/* 7. Footer */}
          <footer className="text-center mt-10 py-6 border-t border-dashed border-indigo-200/50 dark:border-slate-700">
            <Sparkles className="w-10 h-10 text-violet-400 mx-auto mb-3" />
            <p className="text-md font-semibold text-slate-700 dark:text-slate-200">
              Financial growth empowers SHGs to succeed 🌼💪
            </p>
            <div className="flex justify-center gap-4 mt-5">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all transform hover:scale-105">
                <FileDown className="w-4 h-4" />
                Export PDF
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all transform hover:scale-105">
                <FileDown className="w-4 h-4" />
                Download Excel
              </button>
            </div>
          </footer>

        </div>
      </motion.div>

      {/* 6. Monthly Breakdown Modal */}
      <BreakdownModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default FinancialSummaryPage;
