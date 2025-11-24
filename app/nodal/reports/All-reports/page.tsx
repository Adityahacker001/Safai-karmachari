'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users, ShieldCheck, Map, MapPin, TrendingUp, TrendingDown, Star, ThumbsDown, FileText, Briefcase, CheckCircle, Calendar, ArrowUpRight, ArrowRight, ArrowDownRight, Search, SlidersHorizontal, Award, FileWarning, Smile, Frown, Lightbulb, BarChart } from "lucide-react";
// --- STAR RATING COMPONENT ---
function StarRating({ value, max = 5 }: { value: number; max?: number }) {
    // value is expected in 0-100, map to 0-5
    const stars = Math.round((value / 100) * max);
    return (
        <span className="flex items-center gap-0.5">
            {[...Array(max)].map((_, i) => (
                <Star key={i} className={i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} size={20} fill={i < stars ? "#facc15" : "none"} />
            ))}
        </span>
    );
}
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// --- MOCK DATA (ENRICHED WITH MORE DETAILS) ---
const goodContractors = [
    { id: 'C001', name: "Apex Cleaners Inc.", region: "Maharashtra", score: 98.5, reason: "Exceeded all SLA targets for 4 consecutive quarters.", since: 2018, projects: 45, lastReview: "2025-08-15", workerSatisfaction: 95, complianceRecord: "100% Compliant" },
    { id: 'C002', name: "Urban Hygiene Solutions", region: "Delhi", score: 97.2, reason: "Lowest worker grievance rate and 100% compliance.", since: 2020, projects: 22, lastReview: "2025-09-01", workerSatisfaction: 98, complianceRecord: "100% Compliant" },
    { id: 'C003', name: "GreenScape Maintenance", region: "Karnataka", score: 96.8, reason: "Innovated a water-saving cleaning process.", since: 2019, projects: 31, lastReview: "2025-08-22", workerSatisfaction: 94, complianceRecord: "100% Compliant" },
    { id: 'C006', name: "Quality Clean LLP", region: "Tamil Nadu", score: 95.5, reason: "Highest rating in community feedback portal.", since: 2021, projects: 18, lastReview: "2025-08-19", workerSatisfaction: 96, complianceRecord: "100% Compliant" },
];
const badContractors = [
    { id: 'C004', name: "Legacy Sanitation", region: "Uttar Pradesh", score: 62.1, reason: "Multiple safety protocol violations.", since: 2017, projects: 51, lastReview: "2025-07-30", workerSatisfaction: 55, complianceRecord: "Minor Infractions Noted", activeWarnings: 2 },
    { id: 'C005', name: "Metro Sweep Co.", region: "West Bengal", score: 65.7, reason: "High equipment downtime and delayed services.", since: 2021, projects: 15, lastReview: "2025-09-05", workerSatisfaction: 61, complianceRecord: "Non-Compliant", activeWarnings: 3 },
    { id: 'C007', name: "General Maintenance", region: "Bihar", score: 68.0, reason: "Failure to submit mandatory monthly reports.", since: 2019, projects: 25, lastReview: "2025-07-25", workerSatisfaction: 65, complianceRecord: "Minor Infractions Noted", activeWarnings: 1 },
];
const goodWorkers = [
    { id: 'W001', name: "Ram Singh", region: "East Delhi", score: 99.1, reason: "Perfect attendance and recipient of 3 'Worker of the Month' awards.", since: 2019, tasksCompleted: 1520, lastReview: "2025-09-01", team: "Urban Hygiene Solutions", specialCommendations: "Safety Star Award Q2 2025" },
    { id: 'W002', name: "Priya Sharma", region: "Bangalore South", score: 98.4, reason: "Led a successful local community cleaning drive.", since: 2021, tasksCompleted: 1280, lastReview: "2025-08-28", team: "GreenScape Maintenance", specialCommendations: "Community Service Medal 2025" },
    { id: 'W004', name: "Abishek Patil", region: "Pune", score: 97.9, reason: "Consistently receives positive feedback from citizens.", since: 2020, tasksCompleted: 1450, lastReview: "2025-09-03", team: "Apex Cleaners Inc.", specialCommendations: "Citizen Choice Award 2024" },
];
const badWorkers = [
    { id: 'W003', name: "Amit Kumar", region: "Mumbai Central", score: 58.0, reason: "Repeatedly failed to adhere to waste segregation protocols.", since: 2022, tasksCompleted: 950, lastReview: "2025-07-15", team: "Legacy Sanitation", disciplinaryActions: 4 },
    { id: 'W005', name: "Rina Das", region: "Howrah", score: 63.2, reason: "Unauthorized absence from duty on multiple occasions.", since: 2021, tasksCompleted: 880, lastReview: "2025-08-01", team: "Metro Sweep Co.", disciplinaryActions: 2 },
];
const stateReports = [
    { id: 'S01', name: "Kerala", sanitationScore: 95.2, projectsCompleted: "100%", workerWelfare: 9.8, trend: 'improving' },
    { id: 'S02', name: "Maharashtra", sanitationScore: 92.8, projectsCompleted: "98%", workerWelfare: 9.5, trend: 'improving' },
    { id: 'S03', name: "Tamil Nadu", sanitationScore: 91.5, projectsCompleted: "99%", workerWelfare: 9.2, trend: 'stable' },
    { id: 'S04', name: "West Bengal", sanitationScore: 78.1, projectsCompleted: "90%", workerWelfare: 8.1, trend: 'declining' },
];
const districtReports = [
    { id: 'D01', name: "Pune, MH", sanitationScore: 98.1, projectsCompleted: "100%", workerWelfare: 9.9, trend: 'improving' },
    { id: 'D02', name: "Indore, MP", sanitationScore: 97.9, projectsCompleted: "100%", workerWelfare: 9.7, trend: 'stable' },
    { id: 'D03', name: "South Delhi, DL", sanitationScore: 94.3, projectsCompleted: "98%", workerWelfare: 9.5, trend: 'improving' },
    { id: 'D04', name: "Howrah, WB", sanitationScore: 75.4, projectsCompleted: "88%", workerWelfare: 7.9, trend: 'declining' },
];

// --- REUSABLE COMPONENTS ---

interface StatPillProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}
const StatPill = ({ icon, label, value }: StatPillProps) => (
    <div className="flex items-center gap-2 rounded-full bg-slate-200 dark:bg-gray-700 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-200">
        {icon}
        <span>{label}: <strong>{value}</strong></span>
    </div>
);

interface DetailRowProps {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    className?: string;
}
const DetailRow = ({ icon, label, value, className = "" }: DetailRowProps) => (
    <div className={cn("flex items-center gap-3 text-sm", className)}>
        <div className="flex-shrink-0 text-gray-500 dark:text-gray-400">{icon}</div>
        <div className="font-medium text-gray-600 dark:text-gray-300">{label}</div>
        <div className="font-bold text-gray-800 dark:text-gray-100 text-right flex-grow">{value}</div>
    </div>
);


interface PerformerCardProps {
    id: string;
    name: string;
    region: string;
    score: number;
    reason: string;
    isGood?: boolean;
    since: number;
    projects?: number;
    tasksCompleted?: number;
    reportsFiled?: number;
    workerSatisfaction?: number;
    complianceRecord?: string;
    activeWarnings?: number;
    team?: string;
    specialCommendations?: string;
    disciplinaryActions?: number;
    initiativesLed?: string;
    districtRatingChange?: string;
}
const PerformerCard = (props: PerformerCardProps) => {
    const { name, region, score, reason, isGood = true, since, projects, tasksCompleted, reportsFiled, workerSatisfaction, complianceRecord, activeWarnings, team, specialCommendations, disciplinaryActions, initiativesLed, districtRatingChange } = props;
    const detailIcon = projects ? <Briefcase size={14} /> : (tasksCompleted ? <CheckCircle size={14} /> : <FileText size={14} />);
    const detailLabel = projects ? "Projects" : (tasksCompleted ? "Tasks Done" : "Reports");
    const detailValue = projects || tasksCompleted || reportsFiled;

    // Only show Worker Satisfaction and Compliance Record if not in contractors tab
    const isContractor = props && props.team === undefined && props.specialCommendations === undefined && props.disciplinaryActions === undefined;

    // Slimmer style for worker cards
    const isWorker = !!props.team;
    return (
        <Card className={cn(
            "border-l-4 shadow-md transition-all hover:shadow-lg hover:scale-[1.01]",
            isWorker ? "min-h-[70px] py-1" : "min-h-[90px]",
            isGood ? "border-green-500 bg-green-50/50 dark:bg-green-900/10" : "border-red-500 bg-red-50/50 dark:bg-red-900/10"
        )}>
            <CardHeader className={cn(
                "flex flex-row items-start justify-between px-3 md:px-4",
                isWorker ? "pb-1 pt-1" : "pb-2 pt-2"
            )}>
                <div>
                    <CardTitle className={cn("font-bold text-gray-800 dark:text-gray-100 leading-tight", isWorker ? "text-base" : "text-lg")}>{name}</CardTitle>
                    <CardDescription className={isWorker ? "text-xs" : undefined}>{region}</CardDescription>
                </div>
                 <div className={cn(
                    "font-extrabold flex items-center gap-2",
                    isWorker ? "text-xl" : "text-2xl",
                    isGood ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}>
                    {isGood ? <TrendingUp size={isWorker ? 18 : 22}/> : <TrendingDown size={isWorker ? 18 : 22}/>}
                    <StarRating value={score} />
                </div>
            </CardHeader>
            <CardContent className={cn(
                isWorker ? "space-y-1 py-1 px-3 md:px-4" : "space-y-2 py-2 px-3 md:px-4"
            )}>
                <p className={cn("italic mb-1", isWorker ? "text-[11px] text-gray-500 dark:text-gray-300" : "text-xs text-gray-600 dark:text-gray-300")}>"{reason}"</p>
                <div className={cn(
                    isWorker ? "space-y-0.5 pt-1 border-t border-slate-200 dark:border-gray-700" : "space-y-1 pt-2 border-t border-slate-200 dark:border-gray-700"
                )}>
                    {/* Contractor Details */}
                    {!isContractor && workerSatisfaction && <DetailRow icon={<Smile size={16}/>} label="Worker Satisfaction" value={<StarRating value={workerSatisfaction} />} />}
                    {!isContractor && complianceRecord && <DetailRow icon={<ShieldCheck size={16}/>} label="Compliance Record" value={complianceRecord} />}
                    {activeWarnings && <DetailRow icon={<FileWarning size={16}/>} label="Active Warnings" value={activeWarnings} className="text-red-600 dark:text-red-400" />}

                    {/* Worker Details */}
                    {team && <DetailRow icon={<Building2 size={16}/>} label="Contractor" value={team} />}
                    {/* Removed Commendations for workers as per request */}
                    {disciplinaryActions && <DetailRow icon={<FileWarning size={16}/>} label="Disciplinary Actions" value={disciplinaryActions} className="text-red-600 dark:text-red-400" />}
                    {/* Nodal Officer Details */}
                    {initiativesLed && <DetailRow icon={<Lightbulb size={16}/>} label="Initiatives Led" value={initiativesLed} />}
                    {districtRatingChange && <DetailRow icon={<BarChart size={16}/>} label="District Rating Change" value={districtRatingChange} className={districtRatingChange.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} />}
                </div>

                <div className={cn(
                    "flex flex-wrap items-center gap-2 border-t border-slate-200 dark:border-gray-700",
                    isWorker ? "pt-1" : "pt-2"
                )}>
                    <StatPill icon={<Calendar size={14} />} label="Since" value={since} />
                    <StatPill icon={detailIcon} label={detailLabel} value={detailValue ?? ''} />
                    <div className="flex-grow"/>
                    <Button variant="ghost" size="sm" className={cn("text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 px-2 py-1", isWorker ? "text-xs px-1 py-0.5" : undefined)}>
                        View Full Profile
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

interface PerformanceTabContentProps {
    goodData: PerformerCardProps[];
    badData: PerformerCardProps[];
    type: string;
}
const PerformanceTabContent = ({ goodData, badData, type }: PerformanceTabContentProps) => {
    const [activeTab, setActiveTab] = useState('good');
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' for highest first, 'asc' for lowest first

    const dataForTab = activeTab === 'good' ? goodData : badData;

    const sortedData = React.useMemo(() => 
        [...dataForTab].sort((a, b) => {
            if (sortOrder === 'desc') {
                return b.score - a.score;
            }
            return a.score - b.score;
        }),
    [dataForTab, sortOrder]);


    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                 <div className="flex space-x-1 border-b-2 border-slate-200 dark:border-gray-700">
                     <Button variant="ghost" onClick={() => setActiveTab('good')} className={cn("font-semibold pb-3 rounded-none border-b-4", activeTab === 'good' ? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent')}><Star className="mr-2 h-5 w-5"/> Good Performers</Button>
                    <Button variant="ghost" onClick={() => setActiveTab('bad')} className={cn("font-semibold pb-3 rounded-none border-b-4", activeTab === 'bad' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent')}><ThumbsDown className="mr-2 h-5 w-5"/> Bad Performers</Button>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-[180px]">
                            <SlidersHorizontal className="w-4 h-4 mr-2"/>
                            <span>Sort by Score</span>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="desc">Highest First</SelectItem>
                            <SelectItem value="asc">Lowest First</SelectItem>
                        </SelectContent>
                    </Select>
                     <Button variant="outline"><Search className="w-4 h-4 mr-2"/>Filter Region</Button>
                </div>
            </div>

            {sortedData.length > 0 ? (
                <div className="space-y-4">
                    {sortedData.map(item => <PerformerCard key={item.id} {...item} isGood={activeTab === 'good'} />)}
                </div>
            ) : (
                <div className="text-center py-12 bg-slate-50 dark:bg-gray-800/50 rounded-lg">
                    <CheckCircle className="mx-auto h-12 w-12 text-green-500"/>
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">All Clear!</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">No {type}s found in the '{activeTab} performers' category for this period.</p>
                </div>
            )}
        </div>
    );
};

interface RegionalTableData {
    id: string;
    name: string;
    sanitationScore: number;
    projectsCompleted: string;
    workerWelfare: number;
    trend: 'improving' | 'stable' | 'declining';
}
interface RegionalTableProps {
    data: RegionalTableData[];
    title: string;
}
const RegionalTable = ({ data, title }: RegionalTableProps) => {
    const TrendIcon = ({ trend }: { trend: 'improving' | 'stable' | 'declining' }) => {
        if (trend === 'improving') return <ArrowUpRight className="h-5 w-5 text-green-500" />;
        if (trend === 'stable') return <ArrowRight className="h-5 w-5 text-yellow-500" />;
        return <ArrowDownRight className="h-5 w-5 text-red-500" />;
    };

    return (
        <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className={cn(
                title.includes('State') ? "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 text-white" :
                title.includes('District') ? "bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-300 text-white" :
                "bg-slate-200 text-slate-900"
            )}>
                <CardTitle className="text-2xl flex items-center"><FileText className="mr-3 h-6 w-6"/>{title}</CardTitle>
                <CardDescription className="text-white/80">Key performance indicators across regions.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader className="bg-slate-100 dark:bg-slate-800">
                        <TableRow>
                            <TableHead className="font-bold text-base text-slate-700 dark:text-slate-300">Region Name</TableHead>
                            <TableHead className="text-center font-bold text-base text-slate-700 dark:text-slate-300">Trend</TableHead>
                            <TableHead className="text-center font-bold text-base text-slate-700 dark:text-slate-300">Sanitation Score (%)</TableHead>
                            <TableHead className="text-center font-bold text-base text-slate-700 dark:text-slate-300">Projects Completed</TableHead>
                            <TableHead className="text-center font-bold text-base text-slate-700 dark:text-slate-300">Worker Welfare (/10)</TableHead>
                            <TableHead className="text-right font-bold text-base text-slate-700 dark:text-slate-300">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-white dark:bg-gray-800 divide-y divide-slate-100 dark:divide-slate-700">
                        {data.map((item: RegionalTableData) => (
                            <TableRow key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                                <TableCell className="font-semibold text-lg text-gray-800 dark:text-gray-200">{item.name}</TableCell>
                                <TableCell className="flex justify-center items-center pt-5"><TrendIcon trend={item.trend} /></TableCell>
                                <TableCell className="text-center font-bold text-xl text-blue-600 dark:text-blue-400"><StarRating value={item.sanitationScore} /></TableCell>
                                <TableCell className="text-center font-medium text-lg text-gray-700 dark:text-gray-300">{item.projectsCompleted}</TableCell>
                                <TableCell className="text-center font-bold text-xl text-purple-600 dark:text-purple-400"><StarRating value={item.workerWelfare * 10} /></TableCell>
                                <TableCell className="text-right"><Button variant="outline" size="sm">View Report</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function PerformanceReportsPage() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800); // Loader shows for 800ms
        return () => clearTimeout(timer);
    }, []);
    const [activeMainTab, setActiveMainTab] = useState('contractors');
    const mainTabs = [
        { id: 'contractors', label: 'Contractors', icon: Building2 },
        { id: 'workers', label: 'Workers', icon: Users },
    ];

    const renderContent = () => {
        switch (activeMainTab) {
            case 'contractors': return <PerformanceTabContent goodData={goodContractors} badData={badContractors} type="Contractor" />;
            case 'workers': return <PerformanceTabContent goodData={goodWorkers} badData={badWorkers} type="Worker" />;
            default: return null;
        }
    };

    if (loading) {
        const IntegratedLoader = require("@/components/layout/IntegratedLoader").default;
        return <IntegratedLoader />;
    }
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                            Performance Reports Hub
                        </h1>
                        <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">
                            Comprehensive analysis of all stakeholders
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 text-blue-100 text-sm">
                        Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </div>

            <Card className="relative z-0 bg-white shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-3xl sm:rounded-t-3xl rounded-b-3xl sm:rounded-b-3xl overflow-hidden relative z-10">
                    <div className="flex flex-wrap items-center gap-2">
                        {mainTabs.map(tab => {
                            const Icon = tab.icon;
                            return ( <Button key={tab.id} variant="ghost" onClick={() => setActiveMainTab(tab.id)} className={cn("flex-auto justify-center text-center h-11 px-3 text-sm font-medium transition-all duration-300 rounded-lg", activeMainTab === tab.id ? 'bg-white/20 text-white font-bold shadow-md backdrop-blur-sm' : 'text-blue-100 hover:bg-white/10')}><Icon className="mr-2 h-5 w-5" /> {tab.label}</Button> );
                        })}
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 lg:p-8">
                    {renderContent()}
                </CardContent>
            </Card>
        </div>
    );
}