'use client';

import React, { useState } from 'react';
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
const goodNodals = [
    { id: 'N001', name: "Anjali Gupta", region: "Pune District", score: 99.5, reason: "Streamlined the grievance redressal system, reducing resolution time by 50%.", since: 2020, reportsFiled: 250, lastReview: "2025-09-02", initiativesLed: "Digital Attendance Rollout", districtRatingChange: "+15%" },
    { id: 'N003', name: "Sanjay Mehra", region: "South Delhi District", score: 98.2, reason: "Successfully implemented a 'Zero Waste' pilot program in 5 wards.", since: 2019, reportsFiled: 280, lastReview: "2025-08-25", initiativesLed: "'Zero Waste' Pilot Program", districtRatingChange: "+12%" },
];
const badNodals = [
     { id: 'N002', name: "Rakesh Verma", region: "Jaipur District", score: 61.2, reason: "Low adoption rate of new digital monitoring tools.", since: 2018, reportsFiled: 180, lastReview: "2025-08-10", initiativesLed: "None", districtRatingChange: "-5%" },
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
    <div className="flex items-center gap-1 sm:gap-2 rounded-full bg-blue-100/50 backdrop-blur-sm px-2 sm:px-3 py-1 text-xs font-medium text-blue-700">
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

    return (
        <Card className={cn(
            "border-l-4 bg-white/80 backdrop-blur-xl border-white/20 shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]",
            isGood ? "border-l-green-500" : "border-l-red-500"
        )}>
            <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between pb-3 gap-3">
                <div className="flex-1">
                    <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-800">{name}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">{region}</CardDescription>
                </div>
                 <div className={cn(
                    "flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-extrabold",
                    isGood ? "text-green-600" : "text-red-600"
                )}>
                    {isGood ? <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"/> : <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"/>}
                    <div className="hidden sm:block">
                        <StarRating value={score} />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{reason}"</p>
                
                <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-gray-700">
                    {/* Contractor Details */}
                    {/* Removed Worker Satisfaction and Compliance Record rows as per request */}
                    {activeWarnings && <DetailRow icon={<FileWarning size={16}/>} label="Active Warnings" value={activeWarnings} className="text-red-600 dark:text-red-400" />}

                    {/* Worker Details */}
                    {team && <DetailRow icon={<Building2 size={16}/>} label="Contractor" value={team} />}
                    {specialCommendations && <DetailRow icon={<Award size={16}/>} label="Commendations" value={specialCommendations} className="text-amber-600 dark:text-amber-400" />}
                    {disciplinaryActions && <DetailRow icon={<FileWarning size={16}/>} label="Disciplinary Actions" value={disciplinaryActions} className="text-red-600 dark:text-red-400" />}
                    
                    {/* Nodal Officer Details */}
                    {initiativesLed && <DetailRow icon={<Lightbulb size={16}/>} label="Initiatives Led" value={initiativesLed} />}
                    {districtRatingChange && <DetailRow icon={<BarChart size={16}/>} label="District Rating Change" value={districtRatingChange} className={districtRatingChange.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} />}
                </div>

                <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3 pt-3 border-t border-gray-200/50">
                    <StatPill icon={<Calendar size={14} />} label="Since" value={since} />
                    <StatPill icon={detailIcon} label={detailLabel} value={detailValue ?? ''} />
                    <div className="flex-grow"/>
                    <Button variant="ghost" size="sm" className="text-xs sm:text-sm text-blue-600 hover:bg-blue-100 w-full sm:w-auto">
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
    const [searchTerm, setSearchTerm] = useState('');

    const dataForTab = activeTab === 'good' ? goodData : badData;

    const filteredAndSortedData = React.useMemo(() => {
        // First filter by search term
        const filtered = dataForTab.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.score.toString().includes(searchTerm)
        );
        
        // Then sort
        return filtered.sort((a, b) => {
            if (sortOrder === 'desc') {
                return b.score - a.score;
            }
            return a.score - b.score;
        });
    }, [dataForTab, sortOrder, searchTerm]);


    return (
        <div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                 <div className="flex space-x-1 border-b-2 border-gray-200/50">
                     <Button variant="ghost" onClick={() => setActiveTab('good')} className={cn("font-semibold pb-3 rounded-none border-b-4 text-xs sm:text-sm", activeTab === 'good' ? 'text-green-600 border-green-600' : 'text-gray-500 border-transparent')}><Star className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5"/> <span className="hidden sm:inline">Good </span>Performers</Button>
                    <Button variant="ghost" onClick={() => setActiveTab('bad')} className={cn("font-semibold pb-3 rounded-none border-b-4 text-xs sm:text-sm", activeTab === 'bad' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent')}><ThumbsDown className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5"/> <span className="hidden sm:inline">Bad </span>Performers</Button>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search name, region, reason..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 sm:pl-10 pr-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm placeholder-gray-500 w-full sm:w-[200px]"
                        />
                    </div>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-full sm:w-[160px] lg:w-[180px] text-xs sm:text-sm">
                            <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4 mr-2"/>
                            <span>Sort by Score</span>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="desc">Highest First</SelectItem>
                            <SelectItem value="asc">Lowest First</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {filteredAndSortedData.length > 0 ? (
                <div className="space-y-4">
                    <div className="text-xs sm:text-sm text-gray-600 mb-4">
                        Showing {filteredAndSortedData.length} of {dataForTab.length} {type.toLowerCase()}s
                    </div>
                    {filteredAndSortedData.map(item => {
                        // Remove commendations for workers
                        if (type === 'Worker') {
                            const { specialCommendations, ...rest } = item;
                            return <PerformerCard key={item.id} {...rest} isGood={activeTab === 'good'} />;
                        }
                        // Remove complianceRecord for contractors
                        if (type === 'Contractor') {
                            const { complianceRecord, ...rest } = item;
                            return <PerformerCard key={item.id} {...rest} isGood={activeTab === 'good'} />;
                        }
                        // Remove districtRatingChange for nodal officers
                        if (type === 'Nodal Officer') {
                            const { districtRatingChange, ...rest } = item;
                            return <PerformerCard key={item.id} {...rest} isGood={activeTab === 'good'} />;
                        }
                        return <PerformerCard key={item.id} {...item} isGood={activeTab === 'good'} />;
                    })}
                </div>
            ) : (
                <div className="text-center py-12 bg-slate-50 dark:bg-gray-800/50 rounded-lg">
                    <CheckCircle className="mx-auto h-12 w-12 text-green-500"/>
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                        {searchTerm ? 'No Results Found' : 'All Clear!'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {searchTerm 
                            ? `No ${type.toLowerCase()}s found matching "${searchTerm}" in the '${activeTab} performers' category.`
                            : `No ${type}s found in the '${activeTab} performers' category for this period.`
                        }
                    </p>
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
    const [activeMainTab, setActiveMainTab] = useState('contractors');
    const [searchTerm, setSearchTerm] = useState('');
    const [regionFilter, setRegionFilter] = useState('all');
    
    const mainTabs = [
        { id: 'contractors', label: 'Contractors', icon: Building2 },
        { id: 'workers', label: 'Workers', icon: Users },
        { id: 'nodals', label: 'Nodal Officers', icon: ShieldCheck },
    ];

    const renderContent = () => {
        switch (activeMainTab) {
            case 'contractors':
                return <PerformanceTabContent goodData={goodContractors} badData={badContractors} type="Contractor" />;
            case 'workers':
                return <PerformanceTabContent goodData={goodWorkers} badData={badWorkers} type="Worker" />;
            case 'nodals':
                return <PerformanceTabContent goodData={goodNodals} badData={badNodals} type="Nodal Officer" />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Professional Header */}
            <header className="relative overflow-hidden bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white drop-shadow-2xl leading-tight">
                            Performance Reports Hub
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-bold drop-shadow-lg mt-2">
                            Comprehensive analysis of all stakeholders
                        </p>
                    </div>
                    <div className="text-sm sm:text-base md:text-lg text-white/90 font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                        Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </header>

            {/* Professional Navigation Tabs */}
            <Card className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl overflow-hidden">
                <CardHeader className="p-0 border-b border-white/20">
                     <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-sm">
                        {mainTabs.map(tab => {
                            const Icon = tab.icon;
                            return ( 
                                <Button 
                                    key={tab.id} 
                                    variant="ghost" 
                                    onClick={() => setActiveMainTab(tab.id)} 
                                    className={cn(
                                        "flex-1 sm:flex-auto justify-center text-center h-12 sm:h-14 px-4 sm:px-6 text-sm sm:text-base font-bold transition-all duration-300 rounded-xl border-2", 
                                        activeMainTab === tab.id 
                                            ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white border-white/30 shadow-xl transform scale-105' 
                                            : 'text-gray-700 bg-white/50 hover:bg-white/70 border-white/20 hover:border-white/40 hover:shadow-lg'
                                    )}
                                >
                                    <Icon className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" /> 
                                    <span className="hidden sm:inline font-black">{tab.label}</span>
                                    <span className="sm:hidden font-black">{tab.label.split(' ')[0]}</span>
                                </Button> 
                            );
                        })}
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
                    {renderContent()}
                </CardContent>
            </Card>
        </div>
    );
}

