'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
// UPDATED: Added new icons
import { MessageSquare, Download, Clock, ThumbsUp, Eye, Search, Hourglass, CheckCircle2, ShieldAlert } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";

export default function GrievanceTrackingReportPage() {
    // State for status filter
    const [statusFilter, setStatusFilter] = useState<string>("all");

    // Mock data for the grievance history
    const grievanceHistory = [
        {
            id: 'GRV-088',
            worker: "Rina Das",
            category: "Payment Issues",
            submitted: "2025-09-09",
            resolved: "---",
            status: "Pending",
            description: "PF amount not deducted correctly.",
            resolutionNotes: ""
        },
        {
            id: 'GRV-087',
            worker: "Ravi Kumar",
            category: "Unsafe Conditions",
            submitted: "2025-08-27",
            resolved: "---",
            status: "Pending",
            description: "Slippery floor in work area.",
            resolutionNotes: ""
        },
        {
            id: 'GRV-086',
            worker: "Sunita Yadav",
            category: "Payment Issues",
            submitted: "2025-08-24",
            resolved: "---",
            status: "Pending",
            description: "Salary not credited for August.",
            resolutionNotes: ""
        },
        {
            id: 'GRV-085',
            worker: "Amit Patel",
            category: "HR / Leave Issues",
            submitted: "2025-08-26",
            resolved: "---",
            status: "In Progress",
            description: "Leave application not approved.",
            resolutionNotes: ""
        },
        {
            id: 'GRV-084',
            worker: "Priya Sharma",
            category: "Verbal Abuse",
            submitted: "2025-08-23",
            resolved: "2025-08-24",
            status: "Escalated",
            description: "Supervisor used inappropriate language.",
            resolutionNotes: "Escalated to HR for further action."
        },
        {
            id: 'GRV-082',
            worker: "Mohan Singh",
            category: "Unsafe Conditions",
            submitted: "2025-08-25",
            resolved: "2025-08-26",
            status: "Resolved",
            description: "No gas detector in hazardous area.",
            resolutionNotes: "New gas detector provided and documented."
        },
    ];

    // Calculate KPIs
    const totalGrievances = grievanceHistory.length;

    const categoryCounts = grievanceHistory.reduce((acc, grievance) => {
        acc[grievance.category] = (acc[grievance.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b, 'N/A');

    const today = new Date('2025-09-09');
    const todayString = today.toISOString().split('T')[0];
    const grievancesToday = grievanceHistory.filter(g => g.submitted === todayString).length;

    // --- NEW: Calculate status counts ---
    const pendingGrievances = grievanceHistory.filter(g => g.status === 'Pending').length;
    const resolvedGrievances = grievanceHistory.filter(g => g.status === 'Resolved').length;
    const escalatedGrievances = grievanceHistory.filter(g => g.status === 'Escalated').length;


    const [selectedGrievance, setSelectedGrievance] = useState<any | null>(null);
    const [modalStatus, setModalStatus] = useState<string | null>(null);

    // Helper function to get badge color classes based on status (no red or black)
    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'Resolved':
                return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow';
            case 'Pending':
                return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow';
            case 'In Progress':
                return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-semibold shadow';
            case 'Escalated':
                return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        // Main container with a vibrant, modern background gradient
        <div className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-blue-100 via-purple-100 via-pink-100 via-rose-100 to-yellow-100 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight leading-tight">Grievance Tracking Report</h1>
                    <p className="text-gray-600 mt-3 text-xl">A historical log and analytical overview of all worker grievances.</p>
                </div>
                <div className="flex items-center space-x-4 mt-6 sm:mt-0">
                    <Button
                        variant="outline"
                        className="text-gray-700 border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl transition-all duration-200"
                    >
                        <Download className="h-5 w-5 mr-2" />Export History (CSV)
                    </Button>
                </div>
            </div>

            {/* Grievance Analytics KPIs */}
            {/* UPDATED: Changed grid to lg:grid-cols-3 md:grid-cols-2 to better accommodate 6 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-0 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl transform transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium text-blue-100">Total Grievances</CardTitle>
                        <MessageSquare className="h-6 w-6 text-blue-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{totalGrievances}</div>
                        <p className="text-sm text-blue-200 mt-1">Total grievances filed</p>
                    </CardContent>
                </Card>
                <Card className="border-0 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-xl transform transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium text-orange-100">Submitted Today</CardTitle>
                        <Clock className="h-6 w-6 text-orange-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{grievancesToday}</div>
                        <p className="text-sm text-orange-100 mt-1">New grievances filed today</p>
                    </CardContent>
                </Card>
                 <Card className="border-0 rounded-2xl bg-gradient-to-br from-pink-500 to-yellow-400 text-white shadow-xl transform transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium text-yellow-100">Top Grievance Category</CardTitle>
                        <ThumbsUp className="h-6 w-6 text-yellow-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{topCategory}</div>
                        <p className="text-sm text-yellow-100 mt-1">Most common complaint type</p>
                    </CardContent>
                </Card>

                {/* --- NEW CARDS START HERE --- */}
                <Card className="border-0 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-xl transform transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium text-blue-100">Pending Grievances</CardTitle>
                        <Hourglass className="h-6 w-6 text-blue-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{pendingGrievances}</div>
                        <p className="text-sm text-blue-200 mt-1">Cases awaiting action</p>
                    </CardContent>
                </Card>

                <Card className="border-0 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl transform transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium text-green-100">Resolved Grievances</CardTitle>
                        <CheckCircle2 className="h-6 w-6 text-green-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{resolvedGrievances}</div>
                        <p className="text-sm text-green-100 mt-1">Successfully closed cases</p>
                    </CardContent>
                </Card>

                <Card className="border-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl transform transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium text-purple-100">Escalated Grievances</CardTitle>
                        <ShieldAlert className="h-6 w-6 text-purple-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{escalatedGrievances}</div>
                        <p className="text-sm text-purple-200 mt-1">Cases needing higher review</p>
                    </CardContent>
                </Card>
                 {/* --- NEW CARDS END HERE --- */}
            </div>

            <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 shadow-2xl border border-gray-100 rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.005]">
                <CardHeader className="p-8 md:p-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white shadow-lg">
                    <CardTitle className="text-3xl md:text-4xl font-bold">Grievance History Log</CardTitle>
                    <CardDescription className="text-blue-100 mt-2 text-lg">
                        Browse and manage all registered grievances.
                    </CardDescription>
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input placeholder="Search by worker, ID, or category..." className="pl-12 pr-4 py-2.5 w-full sm:max-w-xs bg-white/90 text-gray-800 border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 rounded-xl placeholder:text-gray-500" />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-[180px] bg-white/90 text-gray-800 border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 rounded-xl px-4 py-2.5">
                                <SelectValue placeholder="Filter by status..." />
                            </SelectTrigger>
                            <SelectContent className="shadow-xl rounded-lg border-gray-200">
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Resolved">Resolved</SelectItem>
                                <SelectItem value="Escalated">Escalated</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table className="w-full">
                        <TableHeader className="bg-gray-50">
                            <TableRow className="border-b border-gray-200">
                                <TableHead className="py-4 px-6 text-left text-gray-700 font-bold text-base">Case ID</TableHead>
                                <TableHead className="py-4 px-6 text-left text-gray-700 font-bold text-base">Worker</TableHead>
                                <TableHead className="py-4 px-6 text-left text-gray-700 font-bold text-base">Category</TableHead>
                                <TableHead className="py-4 px-6 text-left text-gray-700 font-bold text-base">Submitted</TableHead>
                                <TableHead className="py-4 px-6 text-left text-gray-700 font-bold text-base">Resolved</TableHead>
                                <TableHead className="py-4 px-6 text-left text-gray-700 font-bold text-base">Status</TableHead>
                                <TableHead className="text-right py-4 px-6 text-gray-700 font-bold text-base">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {grievanceHistory.map((g) => (
                                <TableRow key={g.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                                    <TableCell className="py-4 px-6 font-medium text-gray-800 text-base">{g.id}</TableCell>
                                    <TableCell className="py-4 px-6 text-gray-700 text-base">{g.worker}</TableCell>
                                    <TableCell className="py-4 px-6 text-gray-700 text-base">{g.category}</TableCell>
                                    <TableCell className="py-4 px-6 text-gray-700 text-base">{g.submitted}</TableCell>
                                    <TableCell className="py-4 px-6 text-gray-700 text-base">{g.resolved}</TableCell>
                                    <TableCell className="py-4 px-6">
                                        <span className={`px-3 py-1 text-sm rounded-full inline-block whitespace-nowrap min-w-[120px] text-center ${getStatusBadgeClass(g.status)}`}>
                                            {g.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right py-4 px-6">
                                        <Dialog onOpenChange={(isOpen) => {
                                            if (!isOpen) {
                                                setSelectedGrievance(null);
                                                setModalStatus(null);
                                            }
                                        }}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-blue-600 border-blue-300 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200"
                                                    onClick={() => {
                                                        setSelectedGrievance(g);
                                                        setModalStatus(g.status);
                                                    }}
                                                >
                                                    <Eye className="h-4 w-4 mr-2" />View Details
                                                </Button>
                                            </DialogTrigger>
                                            {selectedGrievance && selectedGrievance.id === g.id && (
                                                <DialogContent className="max-w-2xl p-0 shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100">
                                                    <DialogHeader className={`p-8 text-white w-full ${selectedGrievance.status === 'Resolved' ? 'bg-gradient-to-r from-green-600 to-emerald-700' : selectedGrievance.status === 'Pending' ? 'bg-gradient-to-r from-blue-600 to-indigo-700' : selectedGrievance.status === 'In Progress' ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900' : 'bg-gradient-to-r from-purple-600 to-pink-600'}`}>
                                                        <DialogTitle className="text-3xl font-bold">Grievance Case File: {selectedGrievance.id}</DialogTitle>
                                                        <DialogDescription className="text-white/80 text-lg">
                                                            Full history and resolution details for this case.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="p-8 space-y-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 min-h-[300px]">
                                                        <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                                                            <h4 className="font-semibold text-gray-700 mb-1">Worker:</h4>
                                                            <p className="text-lg text-gray-800">{selectedGrievance.worker}</p>
                                                        </div>
                                                        <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                                                            <h4 className="font-semibold text-gray-700 mb-1">Original Complaint:</h4>
                                                            <p className="text-lg text-gray-800 italic">"{selectedGrievance.description}"</p>
                                                        </div>
                                                        {selectedGrievance.resolutionNotes && (
                                                            <div className={`p-4 border rounded-xl shadow-sm ${selectedGrievance.status === 'Resolved' ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
                                                                <h4 className={`font-semibold mb-1 ${selectedGrievance.status === 'Resolved' ? 'text-green-800' : 'text-yellow-800'}`}>
                                                                    {selectedGrievance.status === 'Resolved' ? 'Resolution Notes:' : 'Escalation Notes:'}
                                                                </h4>
                                                                <p className={`text-lg ${selectedGrievance.status === 'Resolved' ? 'text-green-900' : 'text-yellow-900'}`}>
                                                                    "{selectedGrievance.resolutionNotes}"
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <DialogFooter className="p-6 bg-gray-50 rounded-b-3xl border-t border-gray-200">
                                                        <div className="flex flex-wrap gap-2 mr-auto">
                                                            <Button
                                                                variant="secondary"
                                                                className="px-4 py-2 rounded-lg"
                                                                onClick={() => setModalStatus('Pending')}
                                                                disabled={modalStatus === 'Pending'}
                                                            >
                                                                Pending
                                                            </Button>
                                                            <Button
                                                                variant="secondary"
                                                                className="px-4 py-2 rounded-lg"
                                                                onClick={() => setModalStatus('In Progress')}
                                                                disabled={modalStatus === 'In Progress'}
                                                            >
                                                                In Progress
                                                            </Button>
                                                            <Button
                                                                variant="secondary"
                                                                className="px-4 py-2 rounded-lg"
                                                                onClick={() => setModalStatus('Resolved')}
                                                                disabled={modalStatus === 'Resolved'}
                                                            >
                                                                Resolved
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                className="px-4 py-2 rounded-lg"
                                                                onClick={() => setModalStatus('Escalated')}
                                                                disabled={modalStatus === 'Escalated' || modalStatus === 'Resolved'}
                                                            >
                                                                Escalate to Nodal Officer
                                                            </Button>
                                                        </div>
                                                        <DialogClose asChild>
                                                            <Button variant="outline" className="px-6 py-2.5 rounded-lg">Close</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            )}
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