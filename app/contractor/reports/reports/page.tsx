"use client";
import React, { useState } from 'react';
import { 
    Download, 
    FileText, 
    Calendar, 
    BarChart3, 
    PlusCircle, 
    CalendarDays, 
    AlertTriangle, 
    ShieldCheck, 
    FileSpreadsheet, 
    Clock
} from 'lucide-react';
import StatCard from '@/components/ui/stat-card';


// --- Type Definitions ---
type Report = {
    title: string;
    description: string;
    format: ('PDF' | 'Excel')[];
    lastGenerated: string;
};

// --- Helper Component for the Intense Aurora Background ---
const AuroraBackground = () => (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-25%] left-[-25%] w-[600px] h-[600px] bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-[5%] right-[-20%] w-[600px] h-[600px] bg-sky-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-25%] left-[15%] w-[600px] h-[600px] bg-emerald-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>
);

const Reports: React.FC = () => {
    // --- State for Filters ---
    const [startDate, setStartDate] = useState('2025-09-01');
    const [endDate, setEndDate] = useState('2025-09-16');
    const [workerGroup, setWorkerGroup] = useState('All Workers');

    // --- Data updated for today: Sept 16, 2025, 6:25 PM ---
    const reports: Report[] = [
        { title: 'Daily Attendance Report', description: 'Worker attendance details for a selected date range.', format: ['PDF', 'Excel'], lastGenerated: '2025-09-16 06:25 PM' },
        { title: 'Grievance Report', description: 'Summary of all grievances raised and their current status.', format: ['PDF', 'Excel'], lastGenerated: '2025-09-16 04:30 PM' },
        { title: 'PPE & Training Coverage', description: 'Compliance status for worker PPE and mandatory training.', format: ['PDF', 'Excel'], lastGenerated: '2025-09-15 02:15 PM' },
        { title: 'Weekly Performance Summary', description: 'Comprehensive performance metrics for the last week.', format: ['PDF', 'Excel'], lastGenerated: '2025-09-12 11:20 AM' },
        { title: 'Monthly Summary Report', description: 'A complete overview of all activities and key metrics.', format: ['PDF', 'Excel'], lastGenerated: '2025-09-01 10:00 AM' }
    ];

    const quickStats = [
        { label: 'Generated This Month', value: '24', icon: FileText, color: 'sky' },
        { label: 'Last Generated', value: 'Just Now', icon: Clock, color: 'emerald' },
        { label: 'Active Report Types', value: '5', icon: BarChart3, color: 'violet' }
    ];
    
    // --- Helper Function for Report Icons & Colors ---
    const getReportStyle = (title: string) => {
        if (title.includes('Attendance')) return { icon: <CalendarDays className="w-9 h-9 text-blue-500" />, borderColor: 'border-blue-500' };
        if (title.includes('Grievance')) return { icon: <AlertTriangle className="w-9 h-9 text-orange-500" />, borderColor: 'border-orange-500' };
        if (title.includes('PPE') || title.includes('Training')) return { icon: <ShieldCheck className="w-9 h-9 text-green-500" />, borderColor: 'border-green-500' };
        return { icon: <FileText className="w-9 h-9 text-slate-500" />, borderColor: 'border-slate-500' };
    };
    
    // --- Base style for SOLID, VISIBLE cards ---
    const solidCardStyle = "bg-white/95 border border-slate-200/80 shadow-2xl rounded-2xl";

    return (
       
            <div className="min-h-screen w-full max-w-full sm:max-w-full md:max-w-7xl mx-auto p-4 sm:p-6 md:p-12 space-y-6 sm:space-y-8 md:space-y-10 overflow-hidden">

                {/* --- HEADER WITH GRADIENT TEXT --- */}
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center sm:text-left">
                        Reports & Analytics
                    </h1>
                </div>

                {/* --- VIBRANT GLOWING STATS --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {quickStats.map((stat) => (
                        <StatCard 
                            key={stat.label}
                            title={stat.label} 
                            value={stat.value} 
                            icon={stat.icon} 
                            color={stat.label === 'Active Report Types' ? 'purple' : stat.color as any} 
                        />
                    ))}
                </div>

                {/* --- AVAILABLE REPORTS (SOLID CARD) --- */}
                <div className="w-full max-w-full sm:max-w-full md:max-w-6xl mx-auto bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-2xl rounded-xl sm:rounded-2xl">
                    <div className="p-4 sm:p-5 border-b border-slate-200">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">Available Reports</h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">Generate and download standard reports in your preferred format.</p>
                    </div>
                    <div className="divide-y divide-slate-200/70">
                        {reports.map((report, index) => {
                            const { icon, borderColor } = getReportStyle(report.title);
                            return (
                                <div key={index} className={`p-4 sm:p-5 hover:bg-slate-50/70 transition-colors duration-200 border-l-4 ${borderColor}`}>
                                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
                                        <div className="flex items-start sm:items-center w-full lg:w-auto">
                                            <div className="flex-shrink-0 mr-3 sm:mr-5 hidden sm:block">{icon}</div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-slate-700 to-slate-800 text-transparent bg-clip-text break-words">{report.title}</h3>
                                                <p className="text-xs sm:text-sm text-slate-600 mt-1">{report.description}</p>
                                                <p className="text-xs text-slate-500 mt-2 font-medium">Last generated: {report.lastGenerated}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-3 w-full sm:w-auto">
                                            {report.format.includes('PDF') && (
                                                <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 text-xs sm:text-sm font-semibold">
                                                    <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    <span>PDF</span>
                                                </button>
                                            )}
                                            {report.format.includes('Excel') && (
                                                <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 text-xs sm:text-sm font-semibold">
                                                    <FileSpreadsheet className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    <span>Excel</span>
                                                </button>
                                            )}
                                            {/* View button */}
                                            <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-xs sm:text-sm font-semibold">
                                                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                                                <span>View</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* --- FILTERS & DOWNLOADS (SOLID CARDS) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    <div className="w-full max-w-full bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-2xl rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-4">Report Filters</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Date Range</label>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                    <div className="relative flex-1"><Calendar className="w-3 h-3 sm:w-4 sm:h-4 absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full pl-7 sm:pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" /></div>
                                    <div className="relative flex-1"><Calendar className="w-3 h-3 sm:w-4 sm:h-4 absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full pl-7 sm:pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" /></div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">Worker Group</label>
                                <select value={workerGroup} onChange={e => setWorkerGroup(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"><option>All Workers</option><option>Morning Shift</option><option>Evening Shift</option><option>Zone A</option><option>Zone B</option></select>
                            </div>
                            <button className="w-full mt-2 flex items-center justify-center space-x-2 bg-slate-800 text-white py-2.5 rounded-lg hover:bg-slate-900 transition-colors font-semibold shadow-lg shadow-slate-800/20 text-sm">
                                <Download className="w-4 h-4 sm:w-5 sm:h-5"/>
                                <span>Generate & Download</span>
                            </button>
                        </div>
                    </div>
                    <div className="w-full max-w-full bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-2xl rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-4">Recent Downloads</h3>
                        <div className="space-y-3">
                             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <div className="flex items-center min-w-0 flex-1"><FileText className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 sm:mr-3 flex-shrink-0"/><div className="min-w-0 flex-1"><p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">Daily Attendance Report</p><p className="text-xs text-slate-500">Downloaded just now</p></div></div>
                                <span className="text-xs font-bold bg-red-500 text-white px-2.5 py-1 rounded-full flex-shrink-0">PDF</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <div className="flex items-center min-w-0 flex-1"><FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0"/><div className="min-w-0 flex-1"><p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">Grievance Report</p><p className="text-xs text-slate-500">Downloaded 2 hours ago</p></div></div>
                                <span className="text-xs font-bold bg-green-500 text-white px-2.5 py-1 rounded-full flex-shrink-0">Excel</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    );
};

export default Reports;