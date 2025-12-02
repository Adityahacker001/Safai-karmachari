// app/dashboard/sp-cp/total-cases/page.tsx

"use client";

import React, { useState, useEffect } from 'react'; // Added useEffect
import { createPortal } from 'react-dom';
import {
    BarChart as BarChartIcon, // Renamed
    AlertTriangle,
    CheckCircle2,
    ClipboardList,
    Download,
    Eye,
    FileText,
    Filter,
    RefreshCw,
    Search,
    Settings2, // Unused, kept if needed later
    Sparkles,
    UploadCloud,
    XCircle, // Added for Reset
    PieChart as LucidePieChart // Correct import for the icon
} from 'lucide-react';
import StatCard from '@/components/ui/stat-card';
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

// --- MOCK DATA & TYPES ---

interface SummaryMetric {
    title: string;
    metric: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
}

interface CaseData {
    slNo: number;
    caseId: string;
    incidentId: string;
    policeStation: string;
    firNo: string;
    investigationStatus: 'Completed' | 'In Progress' | 'Initiated';
    chargeSheetFiled: 'Yes' | 'No';
    compensationPaid: 'Yes' | 'No';
}

interface PieChartEntry {
    name: string;
    value: number;
}

const initialSummaryMetrics: SummaryMetric[] = [
    { title: 'Total FIR Cases', metric: '245', icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    { title: 'Under Investigation', metric: '112', icon: AlertTriangle, color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { title: 'Charge Sheet Filed', metric: '98', icon: ClipboardList, color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' },
    { title: 'Compensation Paid', metric: '165', icon: CheckCircle2, color: 'text-emerald-600', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
];

const allPoliceStations = [
    'Delhi North',
    'Mumbai Central',
    'Lucknow Zone',
    'Kolkata South',
];

const allStatuses: CaseData['investigationStatus'][] = [
    'Completed',
    'In Progress',
    'Initiated',
];


const initialTableData: CaseData[] = [
    { slNo: 1, caseId: 'CASE001', incidentId: 'INC023', policeStation: 'Delhi North', firNo: 'FIR-234/2025', investigationStatus: 'Completed', chargeSheetFiled: 'Yes', compensationPaid: 'Yes' },
    { slNo: 2, caseId: 'CASE002', incidentId: 'INC027', policeStation: 'Mumbai Central', firNo: 'FIR-121/2025', investigationStatus: 'In Progress', chargeSheetFiled: 'No', compensationPaid: 'No' },
    { slNo: 3, caseId: 'CASE003', incidentId: 'INC030', policeStation: 'Lucknow Zone', firNo: 'FIR-145/2025', investigationStatus: 'Initiated', chargeSheetFiled: 'No', compensationPaid: 'No' },
    { slNo: 4, caseId: 'CASE004', incidentId: 'INC031', policeStation: 'Delhi North', firNo: 'FIR-235/2025', investigationStatus: 'In Progress', chargeSheetFiled: 'No', compensationPaid: 'Yes' },
    { slNo: 5, caseId: 'CASE005', incidentId: 'INC035', policeStation: 'Kolkata South', firNo: 'FIR-111/2025', investigationStatus: 'Completed', chargeSheetFiled: 'Yes', compensationPaid: 'Yes' },
];

const chargeSheetChartData: PieChartEntry[] = [
    { name: 'Charge Sheet Filed', value: 98 },
    { name: 'Charge Sheet Pending', value: 147 },
];

const compensationChartData: PieChartEntry[] = [
    { name: 'Compensation Paid', value: 165 },
    { name: 'Compensation Pending', value: 80 },
];

const CHARGE_SHEET_COLORS: { [key: string]: string } = {
    'Charge Sheet Filed': '#10B981', // green-500
    'Charge Sheet Pending': '#F59E0B', // amber-500
};

const COMPENSATION_COLORS: { [key: string]: string } = {
    'Compensation Paid': '#34D399', // emerald-400
    'Compensation Pending': '#EF4444', // red-500
};

// --- HELPER COMPONENTS ---

const StatusTag = ({ status }: { status: CaseData['investigationStatus'] }) => {
    let className = '';
    switch (status) {
        case 'Completed': className = 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border border-green-200 dark:border-green-700'; break;
        case 'In Progress': className = 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-700'; break;
        case 'Initiated': className = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700'; break;
        default: className = 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300 border border-gray-200 dark:border-gray-600';
    }
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}>
            {status}
        </span>
    );
};

const YesNoTag = ({ value }: { value: 'Yes' | 'No' }) => {
    const className =
        value === 'Yes'
            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'
            : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border border-red-200 dark:border-red-700';
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}>
            {value}
        </span>
    );
};

// --- MAIN PAGE COMPONENT ---

const IntegratedLoader: React.FC = () => (
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


export default function TotalCasesReportPage() {
    // --- State ---
    const [summaryMetrics, setSummaryMetrics] = useState(initialSummaryMetrics);
    const [tableData, setTableData] = useState(initialTableData);
    const [chargeSheetData, setChargeSheetData] = useState(chargeSheetChartData);
    const [compensationData, setCompensationData] = useState(compensationChartData);
    const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

    // Filter State
    const [searchQuery, setSearchQuery] = useState("");
    const [dateRange, setDateRange] = useState(""); // Simplified state
    const [stationFilter, setStationFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [chargeSheetFilter, setChargeSheetFilter] = useState("");
    const [compFilter, setCompFilter] = useState("");
    const [loading, setLoading] = useState(true);

    // --- Handlers ---
    const resetFilters = () => {
        setSearchQuery("");
        setDateRange("");
        setStationFilter("");
        setStatusFilter("");
        setChargeSheetFilter("");
        setCompFilter("");
        setTableData(initialTableData); // Reset table
    };

    const handleRefresh = () => {
        alert("Refreshing data (simulation)...");
        setSummaryMetrics(initialSummaryMetrics);
        setChargeSheetData(chargeSheetChartData);
        setCompensationData(compensationChartData);
        resetFilters();
    };

    const handleApplyFilters = () => {
        const filtered = initialTableData.filter(row =>
            (searchQuery ? (row.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                row.firNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                row.incidentId.toLowerCase().includes(searchQuery.toLowerCase())) : true) &&
            (stationFilter ? row.policeStation === stationFilter : true) &&
            (statusFilter ? row.investigationStatus === statusFilter : true) &&
            (chargeSheetFilter ? row.chargeSheetFiled === chargeSheetFilter : true) &&
            (compFilter ? row.compensationPaid === compFilter : true)
            // Add date range logic if needed based on `dateRange` state ('7d', '30d', etc.)
        );
        setTableData(filtered);
        // alert("Filters applied (simulated)."); // Can uncomment for debugging
    };

    const handleExport = () => alert("Export functionality to be implemented.");
    const handleViewDetails = (caseId: string) => {
        const found = tableData.find(t => t.caseId === caseId) || initialTableData.find(t => t.caseId === caseId);
        if (found) setSelectedCase(found);
    };
    const handleEditRecord = (caseId: string) => alert(`Editing record for ${caseId} (simulation)`);
    const handleUploadDocs = () => alert("Upload Case Documents (simulation)");
    const handleSyncRecords = () => alert("Sync Investigation Records (simulation)");
    const handleGenerateSummary = () => alert("Generate Case Summary (simulation)");

    React.useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const root = document.getElementById('modal-root') || document.body;
        setModalRoot(root as HTMLElement);
    }, []);

    // Build the View Details modal outside the return to avoid parser issues
    let ViewDetailsModal: React.ReactNode = null;
    if (selectedCase) {
        const modalContent = (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300"
                    onClick={() => setSelectedCase(null)}
                />
                <div className="relative bg-white/80 backdrop-blur-sm rounded-lg shadow-2xl border border-slate-200 p-4 sm:p-6 max-w-2xl w-full max-h-[86vh] overflow-y-auto">
                    <div className="flex justify-between items-center pb-3 mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Case Details</h2>
                        <button onClick={() => setSelectedCase(null)} className="text-gray-600 hover:text-gray-900">&times;</button>
                    </div>

                    <div className="space-y-4 max-w-xl mx-auto">
                        {/* Case Information */}
                        <div>
                            <h3 className="text-md font-bold text-indigo-700 mb-2">Case Information</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                                <div>
                                    <span className="text-xs font-bold text-slate-600 uppercase">Case ID</span>
                                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.caseId}</div>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-slate-600 uppercase">Incident ID</span>
                                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.incidentId}</div>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-slate-600 uppercase">Police Station</span>
                                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.policeStation}</div>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-slate-600 uppercase">FIR Number</span>
                                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.firNo}</div>
                                </div>
                            </div>
                        </div>

                        {/* Investigation Details */}
                        <div>
                            <h3 className="text-md font-bold text-indigo-700 mb-2">Investigation Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                                <div>
                                    <span className="text-xs font-bold text-slate-600 uppercase">Investigation Status</span>
                                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.investigationStatus}</div>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-slate-600 uppercase">Charge Sheet Filed</span>
                                    <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.chargeSheetFiled}</div>
                                </div>
                            </div>
                        </div>

                        {/* Compensation */}
                        <div>
                            <h3 className="text-md font-bold text-indigo-700 mb-2">Compensation</h3>
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                                <span className="text-xs font-bold text-slate-600 uppercase">Compensation Paid</span>
                                <div className="text-sm font-semibold text-slate-900 mt-1">{selectedCase.compensationPaid}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 mt-3">
                        <button
                            onClick={() => setSelectedCase(null)}
                            className="px-5 py-2 bg-indigo-600 text-white font-bold hover:bg-indigo-700 rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );

        ViewDetailsModal = modalRoot ? createPortal(modalContent, modalRoot) : modalContent;
    }


    if (loading) return <IntegratedLoader />;

    return (
        <div className="flex-1 space-y-8 p-6 md:p-10 text-slate-900 dark:text-slate-50">

            {/* District-style banner */}
            <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md opacity-0" aria-hidden />
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                            <BarChartIcon size={26} className="text-white/90"/>
                            Total Cases Report
                        </h1>
                        <p className="text-sm opacity-90 mt-1">Case summaries and investigation status overview</p>
                    </div>
                </div>
                <div className="hidden md:block text-sm opacity-90">&nbsp;</div>
            </div>

            {/* 1️⃣ Header & Summary */}
            <div className="space-y-6">
                {/* Top Bar: Buttons only (title moved to banner) - container removed */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-3 p-2 md:p-0">
                    <button
                        onClick={handleExport}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm font-medium transform hover:scale-105">
                        <Download size={16} />
                        Export (CSV/PDF)
                    </button>
                    <button
                        onClick={handleRefresh}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-100 transition-colors text-sm font-medium transform hover:scale-105">
                        <RefreshCw size={16} />
                        Refresh Data
                    </button>
                </div>

                {/* Quick Summary Cards */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total FIR Cases"
                        value="245"
                        icon={FileText}
                        color="blue"
                    />
                    <StatCard
                        title="Under Investigation"
                        value="112"
                        icon={AlertTriangle}
                        color="amber"
                    />
                    <StatCard
                        title="Charge Sheet Filed"
                        value="98"
                        icon={ClipboardList}
                        color="green"
                    />
                    <StatCard
                        title="Compensation Paid"
                        value="165"
                        icon={CheckCircle2}
                        color="emerald"
                    />
                </div>
            </div>

            {/* 2️⃣ Filter Panel */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                 <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-700 dark:text-slate-300"><Filter size={18} /> Filters</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    {/* Search Box */}
                    <div className="relative lg:col-span-2">
                        <label htmlFor="search-cases" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Search Case/FIR/Incident</label>
                        <div className="absolute inset-y-0 left-0 top-6 pl-3 flex items-center pointer-events-none">
                            <Search className="text-slate-400 dark:text-slate-500" size={18} />
                        </div>
                        <input
                            id="search-cases"
                            type="text"
                            placeholder="Search Case ID, FIR No, Incident ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                     <div>
                         <label htmlFor="filter-station" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Police Station</label>
                        <select
                            id="filter-station"
                            value={stationFilter}
                            onChange={(e) => setStationFilter(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                            <option value="">All Stations</option>
                            {allPoliceStations.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="filter-status" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Investigation Status</label>
                        <select
                            id="filter-status"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                            <option value="">All Statuses</option>
                             {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="filter-chargesheet" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Charge Sheet Filed</label>
                        <select
                            id="filter-chargesheet"
                            value={chargeSheetFilter}
                            onChange={(e) => setChargeSheetFilter(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                            <option value="">Any</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="filter-compensation" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Compensation Paid</label>
                        <select
                            id="filter-compensation"
                            value={compFilter}
                            onChange={(e) => setCompFilter(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                            <option value="">Any</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                     <div className="flex gap-2 lg:col-start-4">
                        <button
                            onClick={handleApplyFilters}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors text-sm font-medium transform hover:scale-105">
                            <Filter size={16} /> Apply
                        </button>
                        <button
                            onClick={resetFilters}
                            title="Reset Filters"
                            className="px-3 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors transform hover:scale-105">
                            <XCircle size={18} />
                        </button>
                    </div>
                </div>
            </div>


            {/* 3️⃣ Main Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                        <thead className="bg-slate-100 dark:bg-slate-900/50">
                            <tr>
                                {[ 'Sl. No.', 'Case ID', 'Incident ID', 'Police Station', 'FIR No', 'Investigation Status', 'Charge Sheet Filed', 'Compensation Paid', 'Actions',
                                ].map((header) => (
                                    <th key={header} scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {tableData.map((row) => (
                                <tr
                                    key={row.caseId}
                                    className="hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors duration-150 even:bg-slate-50/70 dark:even:bg-slate-900/20"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                        {row.slNo}
                                    </td>
                                    <td
                                        onClick={() => handleViewDetails(row.caseId)}
                                        className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-700 dark:text-indigo-400 hover:underline cursor-pointer"
                                    >
                                        {row.caseId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                                        {row.incidentId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                                        {row.policeStation}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                                        {row.firNo}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <StatusTag status={row.investigationStatus} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <YesNoTag value={row.chargeSheetFiled} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <YesNoTag value={row.compensationPaid} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1.5">
                                        <button onClick={() => handleViewDetails(row.caseId)} className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-slate-700 rounded-md transition-colors duration-150" title="View Details">
                                            <Eye size={16} />
                                        </button>
                                        <button onClick={() => handleEditRecord(row.caseId)} className="p-2 text-yellow-600 hover:bg-yellow-100 dark:hover:bg-slate-700 rounded-md transition-colors duration-150" title="Edit/Update Record">
                                            <FileText size={16} /> {/* Using FileText as Edit icon */}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {tableData.length === 0 && (
                                <tr className="bg-white dark:bg-slate-800">
                                    <td colSpan={9} className="text-center py-10 text-slate-500 dark:text-slate-400">
                                        No cases found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-between p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                        Showing <strong>{tableData.length > 0 ? 1 : 0}</strong> to <strong>{tableData.length}</strong> of{' '}
                        <strong>{initialTableData.length}</strong> results
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 rounded-md text-sm border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150">
                            Previous
                        </button>
                        <button className="px-4 py-2 rounded-md text-sm border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150">
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* 4️⃣ Dashboard Visualization & Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Charge Sheet Status Chart */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
                   <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-200 flex items-center gap-3">
                       <LucidePieChart className="text-green-600" size={22} />
                       Charge Sheet Status
                   </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chargeSheetData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={3}
                                    dataKey="value"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                    className="text-xs focus:outline-none"
                                >
                                    {chargeSheetData.map((entry, index) => (
                                        <Cell
                                            key={`charge-cell-${index}`}
                                            fill={CHARGE_SHEET_COLORS[entry.name as keyof typeof CHARGE_SHEET_COLORS]}
                                            stroke={"#FFF"}
                                            strokeWidth={2}
                                            className="focus:outline-none transition-opacity duration-200 hover:opacity-80"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                     contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        border: '1px solid #cbd5e1',
                                        borderRadius: '0.75rem',
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                    }}
                                     labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                                     itemStyle={{ fontSize: '12px' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Compensation Status Chart */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
                   <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-200 flex items-center gap-3">
                       <LucidePieChart className="text-emerald-600" size={22} />
                       Compensation Status
                   </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={compensationData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={3}
                                    dataKey="value"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                    className="text-xs focus:outline-none"
                                >
                                    {compensationData.map((entry, index) => (
                                        <Cell
                                            key={`compensation-cell-${index}`}
                                            fill={COMPENSATION_COLORS[entry.name as keyof typeof COMPENSATION_COLORS]}
                                            stroke={"#FFF"}
                                            strokeWidth={2}
                                            className="focus:outline-none transition-opacity duration-200 hover:opacity-80"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                     contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        border: '1px solid #cbd5e1',
                                        borderRadius: '0.75rem',
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                    }}
                                     labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                                     itemStyle={{ fontSize: '12px' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 5️⃣ Quick Actions Panel */}
            <div className="grid grid-cols-1 gap-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
                    <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">Quick Actions</h3>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={handleGenerateSummary}
                            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium transform hover:scale-105">
                            <ClipboardList size={16} />
                            Generate Case Summary
                        </button>
                        <button
                            onClick={handleSyncRecords}
                            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium transform hover:scale-105">
                            <RefreshCw size={16} />
                            Sync Investigation Records
                        </button>
                        <button
                             onClick={handleUploadDocs}
                            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium transform hover:scale-105">
                            <UploadCloud size={16} />
                            Upload Case Documents
                        </button>
                    </div>
                </div>
            </div>
            {ViewDetailsModal}
        </div>
    );
}