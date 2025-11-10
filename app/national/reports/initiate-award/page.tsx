'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import StatCard from "@/components/ui/stat-card";
import React from 'react';
import { Award, CheckCircle2, Hourglass, FileText, Calendar, User, XCircle, CheckCircle, ClipboardList } from "lucide-react";


// Helper component for consistent and attractive status badges
type StatusType = 'Approved' | 'Pending Final Vote' | string;
interface StatusBadgeProps {
    status: StatusType;
}
const statusStyles: Record<string, { icon: React.ReactNode; className: string }> = {
    'Approved': {
        icon: <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />,
        className: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
    },
    'Pending Final Vote': {
        icon: <Hourglass className="h-3.5 w-3.5 mr-1.5 animate-spin-slow" />,
        className: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700",
    },
};
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const style = statusStyles[status] || {};
    return (
        <Badge className={`inline-flex items-center text-xs font-semibold ${style.className ?? ''}`}>
            {style.icon}
            {status}
        </Badge>
    );
};


export default function InitiateAwardPage() {
    // Mock data with added justification for the dialog
    const nominations = [
        { id: 'NOM-NAT-01', nominee: "State of Kerala", category: "Best Performing State", nominator: "NCSK (Auto-generated)", status: "Approved", justification: "Automatically nominated based on achieving the highest national performance metrics across all sanitation and worker welfare categories for the fiscal year." },
        { id: 'NOM-NAT-02', nominee: "State of West Bengal", category: "Most Improved State", nominator: "NCSK (Self-Nominated)", status: "Pending Final Vote", justification: "Self-nominated by the National Commission for Safai Karmacharis based on a 40% year-over-year improvement in key performance indicators." },
        { id: 'NOM-ST-WB-01', nominee: "Abishek Das (WB)", category: "National Safai Karmachari of the Year", nominator: "Escalated from West Bengal", status: "Approved", justification: "Escalated by the West Bengal State Commission for his heroic actions during the Kolkata flood, where he single-handedly cleared critical drainage systems." },
        { id: 'NOM-ST-TN-01', nominee: "Priya Krishnan (TN)", category: "National Safai Karmachari of the Year", nominator: "Escalated from Tamil Nadu", status: "Pending Final Vote", justification: "Nominated by the State of Tamil Nadu for developing a new, efficient waste segregation technique that has been adopted by three neighboring districts." },
    ];

    return (
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
            {/* Enhanced Header */}
            <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
                <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1 flex items-center gap-4">
                            <Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-2xl" />
                            <div>
                                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white drop-shadow-2xl leading-tight">
                                    Award Ratification Center
                                </h1>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-bold drop-shadow-lg">
                                    Review, vote on, and confer national-level awards
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <StatCard
                        title="Pending Reviews"
                        value={nominations.filter(n => n.status === 'Pending Final Vote').length}
                        icon={Hourglass}
                        color="amber"
                    />
                    <StatCard
                        title="Approved this Month"
                        value="2"
                        icon={CheckCircle2}
                        color="green"
                    />
                    <StatCard
                        title="Total Nominations"
                        value={nominations.length}
                        icon={ClipboardList}
                        color="blue"
                    />
                    <StatCard
                        title="Awards Conferred"
                        value="2"
                        icon={Award}
                        color="purple"
                    />
                </div>

                <Card className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white p-4 sm:p-6 md:p-8">
                        <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300"/> 
                            National Review Inbox
                        </CardTitle>
                        <CardDescription className="text-white/80 text-sm sm:text-base">
                            Final review and ratification of all national-level nominations.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <Table className="w-full min-w-[700px]">
                            <TableHeader className="bg-slate-50">
                                <TableRow className="border-b border-gray-200">
                                    <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">Nominee</TableHead>
                                    <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">Category</TableHead>
                                    <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">Origin</TableHead>
                                    <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">Status</TableHead>
                                    <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {nominations.map((nom) => (
                                    <TableRow key={nom.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                                        <TableCell className="py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-800 text-sm sm:text-base">{nom.nominee}</TableCell>
                                        <TableCell className="py-3 sm:py-4 px-3 sm:px-6 text-gray-600 text-sm sm:text-base">{nom.category}</TableCell>
                                        <TableCell className="py-3 sm:py-4 px-3 sm:px-6 text-gray-500 text-sm sm:text-base">{nom.nominator}</TableCell>
                                        <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                                            <StatusBadge status={nom.status} />
                                        </TableCell>
                                        <TableCell className="py-3 sm:py-4 px-3 sm:px-6 text-right">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant={nom.status === 'Pending Final Vote' ? 'default' : 'outline'}
                                                        size="sm"
                                                        className={
                                                            nom.status === 'Pending Final Vote'
                                                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105'
                                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 cursor-not-allowed'
                                                        }
                                                    >
                                                        {nom.status === 'Pending Final Vote' ? 'Review & Vote' : 'View Details'}
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[525px] p-0 overflow-hidden rounded-2xl shadow-2xl border-0 bg-slate-50 dark:bg-gray-900">
                                                    <DialogHeader className="p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white">
                                                        <DialogTitle className="text-2xl flex items-center"><ClipboardList className="w-6 h-6 mr-3" />Final Ratification</DialogTitle>
                                                        <DialogDescription className="text-white/80">Review the details below before casting your final vote.</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="p-6 space-y-4">
                                                        <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg">
                                                            <CardHeader className="pb-2">
                                                                <CardTitle className="text-lg">{nom.nominee}</CardTitle>
                                                                <CardDescription>{nom.category}</CardDescription>
                                                            </CardHeader>
                                                            <CardContent className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                                                                <div className="flex items-center"><User className="w-4 h-4 mr-2 text-purple-500" /> <strong>Origin:</strong> &nbsp;{nom.nominator}</div>
                                                                <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-purple-500" /> <strong>Nomination Date:</strong> &nbsp;August 15, 2025</div>
                                                            </CardContent>
                                                        </Card>
                                                        
                                                        <div>
                                                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Summary Justification:</h4>
                                                            <p className="text-sm p-4 bg-indigo-50 dark:bg-gray-800 rounded-md border border-indigo-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">"{nom.justification}"</p>
                                                        </div>

                                                        <div>
                                                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Supporting Documents:</h4>
                                                            <div className="flex gap-2">
                                                                <Button variant="outline" size="sm" className="flex items-center gap-2"><FileText className="w-4 h-4" /> StateReport.pdf</Button>
                                                                <Button variant="outline" size="sm" className="flex items-center gap-2"><FileText className="w-4 h-4" /> PerformanceMetrics.xlsx</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <DialogFooter className="bg-slate-100 dark:bg-gray-900/50 px-6 py-4 flex justify-end gap-3">
                                                        <DialogClose asChild>
                                                            <Button variant="destructive" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                                                                <XCircle className="w-5 h-5" /> Reject
                                                            </Button>
                                                        </DialogClose>
                                                        <DialogClose asChild>
                                                            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                                                                <CheckCircle className="w-5 h-5" /> Approve & Confer
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
        </div>
    );
}
