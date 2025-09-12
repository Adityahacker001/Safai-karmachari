'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import React from 'react';
import { Award, CheckCircle2, Hourglass, FileText, Calendar, User, XCircle, CheckCircle, Send, ClipboardList } from "lucide-react";


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

    const kpiData = [
        { title: "Pending Reviews", value: nominations.filter(n => n.status === 'Pending Final Vote').length, Icon: Hourglass, color: "from-yellow-400 to-orange-500" },
        { title: "Approved this Month", value: "2", Icon: CheckCircle2, color: "from-green-400 to-emerald-500" },
        { title: "Total Nominations", value: nominations.length, Icon: ClipboardList, color: "from-sky-400 to-blue-500" },
        { title: "Awards Conferred", value: "2", Icon: Award, color: "from-purple-400 to-indigo-500" },
    ];

    return (
        <div className="ml-64">
            <div className="space-y-8 p-4 md:p-6 bg-slate-50 dark:bg-gray-900 rounded-lg">
                <div>
                    <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Award Ratification Center
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400">Review, vote on, and confer national-level awards.</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpiData.map((kpi, index) => (
                        <Card key={index} className={`rounded-xl shadow-lg border-0 text-white overflow-hidden bg-gradient-to-br ${kpi.color}`}>
                            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-sm font-medium text-white/90">{kpi.title}</CardTitle>
                                <kpi.Icon className="h-5 w-5 text-white/80" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold drop-shadow-md">{kpi.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="shadow-2xl border-0 mt-8 rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
                    <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                        <CardTitle className="text-2xl font-semibold flex items-center drop-shadow">
                            <Award className="h-7 w-7 mr-3 text-yellow-300"/> National Review Inbox
                        </CardTitle>
                        <CardDescription className="text-white/80">
                            Final review and ratification of all national-level nominations.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-100 dark:bg-slate-900">
                                <TableRow>
                                    <TableHead className="text-slate-700 dark:text-slate-300 font-semibold text-base">Nominee</TableHead>
                                    <TableHead className="text-slate-700 dark:text-slate-300 font-semibold text-base">Category</TableHead>
                                    <TableHead className="text-slate-700 dark:text-slate-300 font-semibold text-base">Origin</TableHead>
                                    <TableHead className="text-slate-700 dark:text-slate-300 font-semibold text-base">Status</TableHead>
                                    <TableHead className="text-right text-slate-700 dark:text-slate-300 font-semibold text-base">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {nominations.map((nom) => (
                                    <TableRow key={nom.id} className="hover:bg-purple-50/60 dark:hover:bg-purple-900/20 transition-colors duration-200">
                                        <TableCell className="font-medium text-gray-800 dark:text-gray-200">{nom.nominee}</TableCell>
                                        <TableCell className="text-gray-600 dark:text-gray-300">{nom.category}</TableCell>
                                        <TableCell className="text-sm text-gray-500 dark:text-gray-400">{nom.nominator}</TableCell>
                                        <TableCell>
                                            <StatusBadge status={nom.status} />
                                        </TableCell>
                                        <TableCell className="text-right">
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
        </div>
    );
}
