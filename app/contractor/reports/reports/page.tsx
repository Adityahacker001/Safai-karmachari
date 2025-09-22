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
import DashboardLayout from '@/components/layout/dashboard-layout';

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
        <DashboardLayout role="contractor" name="Rohan Builders">
            <div className="relative bg-slate-100 min-h-full p-4 md:p-6 space-y-8 overflow-hidden">
                <AuroraBackground />

                {/* --- HEADER WITH GRADIENT TEXT --- */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Reports & Analytics
                    </h1>
                    <button className="relative group flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-lg hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 shadow-xl">
                        <span className="absolute top-0 left-0 w-full h-full rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),rgba(255,255,255,0))]"></span>
                        <PlusCircle className="w-5 h-5" />
                        <span className="font-semibold">Create Custom Report</span>
                    </button>
                </div>

                {/* --- VIBRANT GLOWING STATS --- */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {quickStats.map((stat) => {
                                                // Make 'Active Report Types' card more visible
                                                const isActiveReports = stat.label === 'Active Report Types';
                                                const cardClass = isActiveReports
                                                    ? 'text-white p-6 rounded-2xl transition-transform hover:-translate-y-2 duration-300 bg-gradient-to-br from-violet-600 to-purple-700 shadow-2xl shadow-violet-500/40 border-2 border-violet-400'
                                                    : `text-white p-6 rounded-2xl transition-transform hover:-translate-y-2 duration-300 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 shadow-2xl shadow-${stat.color}-500/40`;
                                                return (
                                                    <div key={stat.label} className={cardClass}>
                                                        <div className="flex items-center justify-between"><p className="font-semibold">{stat.label}</p><stat.icon className="w-8 h-8 opacity-70" /></div>
                                                        <p className="text-5xl font-bold mt-2">{stat.value}</p>
                                                    </div>
                                                );
                                        })}
                                </div>

                {/* --- AVAILABLE REPORTS (SOLID CARD) --- */}
                <div className={`${solidCardStyle}`}>
                    <div className="p-5 border-b border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-800">Available Reports</h2>
                        <p className="text-sm text-slate-500 mt-1">Generate and download standard reports in your preferred format.</p>
                    </div>
                    <div className="divide-y divide-slate-200/70">
                        {reports.map((report, index) => {
                            const { icon, borderColor } = getReportStyle(report.title);
                            return (
                                <div key={index} className={`p-5 hover:bg-slate-50/70 transition-colors duration-200 border-l-4 ${borderColor}`}>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                        <div className="flex items-center mb-4 sm:mb-0">
                                            <div className="flex-shrink-0 mr-5 hidden sm:block">{icon}</div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold bg-gradient-to-r from-slate-700 to-slate-800 text-transparent bg-clip-text">{report.title}</h3>
                                                <p className="text-sm text-slate-600 mt-1">{report.description}</p>
                                                <p className="text-xs text-slate-500 mt-2 font-medium">Last generated: {report.lastGenerated}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 self-end sm:self-center">
                                            {report.format.includes('PDF') && <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 text-sm font-semibold"><FileText className="w-4 h-4" /><span>PDF</span></button>}
                                            {report.format.includes('Excel') && <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 text-sm font-semibold"><FileSpreadsheet className="w-4 h-4" /><span>Excel</span></button>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* --- FILTERS & DOWNLOADS (SOLID CARDS) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className={`${solidCardStyle} p-6`}>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">Report Filters</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Date Range</label>
                                <div className="flex space-x-2">
                                    <div className="relative flex-1"><Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
                                    <div className="relative flex-1"><Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Worker Group</label>
                                <select value={workerGroup} onChange={e => setWorkerGroup(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"><option>All Workers</option><option>Morning Shift</option><option>Evening Shift</option><option>Zone A</option><option>Zone B</option></select>
                            </div>
                            <button className="w-full mt-2 flex items-center justify-center space-x-2 bg-slate-800 text-white py-2.5 rounded-lg hover:bg-slate-900 transition-colors font-semibold shadow-lg shadow-slate-800/20">
                                <Download className="w-5 h-5"/>
                                <span>Generate & Download</span>
                            </button>
                        </div>
                    </div>
                    <div className={`${solidCardStyle} p-6`}>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">Recent Downloads</h3>
                        <div className="space-y-3">
                             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <div className="flex items-center"><FileText className="w-5 h-5 text-red-500 mr-3"/><div><p className="text-sm font-semibold text-slate-800">Daily Attendance Report</p><p className="text-xs text-slate-500">Downloaded just now</p></div></div>
                                <span className="text-xs font-bold bg-red-500 text-white px-2.5 py-1 rounded-full">PDF</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <div className="flex items-center"><FileSpreadsheet className="w-5 h-5 text-green-500 mr-3"/><div><p className="text-sm font-semibold text-slate-800">Grievance Report</p><p className="text-xs text-slate-500">Downloaded 2 hours ago</p></div></div>
                                <span className="text-xs font-bold bg-green-500 text-white px-2.5 py-1 rounded-full">Excel</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Reports;