'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/ui/stat-card";
// UPDATED: Added new icons
import { MessageSquare, Download, Clock, ThumbsUp, Eye, Search, Hourglass, CheckCircle2, ShieldAlert } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";
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
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
            {/* Enhanced Header */}
            <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
                <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight">
                                Grievance Tracking Report
                            </h1>
                            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold drop-shadow-lg">
                                A historical log and analytical overview of all worker grievances
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base backdrop-blur-sm"
                            >
                                <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Export History (CSV)</span>
                                <span className="sm:hidden">Export</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Grievance Analytics KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <StatCard
                    title="Total Grievances"
                    value={totalGrievances}
                    subtitle="Total grievances filed"
                    icon={MessageSquare}
                    color="blue"
                />
                
                <StatCard
                    title="Submitted Today"
                    value={grievancesToday}
                    subtitle="New grievances filed today"
                    icon={Clock}
                    color="orange"
                />
                
                <StatCard
                    title="Top Grievance Category"
                    value={topCategory}
                    subtitle="Most common complaint type"
                    icon={ThumbsUp}
                    color="pink"
                />

                <StatCard
                    title="Pending Grievances"
                    value={pendingGrievances}
                    subtitle="Cases awaiting action"
                    icon={Hourglass}
                    color="indigo"
                />

                <StatCard
                    title="Resolved Grievances"
                    value={resolvedGrievances}
                    subtitle="Successfully closed cases"
                    icon={CheckCircle2}
                    color="green"
                />

                <StatCard
                    title="Escalated Grievances"
                    value={escalatedGrievances}
                    subtitle="Cases needing higher review"
                    icon={ShieldAlert}
                    color="purple"
                />
            </div>

            <Card className="w-full max-w-full sm:max-w-full md:max-w-6xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.005]">
                <CardHeader className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white shadow-lg">
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Grievance History Log</CardTitle>
                    <CardDescription className="text-blue-100 mt-2 text-sm sm:text-base md:text-lg">
                        Browse and manage all registered grievances.
                    </CardDescription>
                    <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 pt-4 sm:pt-6">
                        <div className="relative flex-grow w-full lg:max-w-md">
                            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <Input placeholder="Search by worker, ID, or category..." className="pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 w-full bg-white/90 text-gray-800 border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 rounded-lg sm:rounded-xl placeholder:text-gray-500 text-sm sm:text-base" />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full lg:w-[180px] bg-white/90 text-gray-800 border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base">
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
                <CardContent className="p-0 overflow-x-auto">
                    <Table className="w-full min-w-[700px]">
                        <TableHeader className="bg-gray-50">
                            <TableRow className="border-b border-gray-200">
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-700 font-bold text-sm sm:text-base">Case ID</TableHead>
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-700 font-bold text-sm sm:text-base">Worker</TableHead>
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-700 font-bold text-sm sm:text-base">Category</TableHead>
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-700 font-bold text-sm sm:text-base">Submitted</TableHead>
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-700 font-bold text-sm sm:text-base">Resolved</TableHead>
                                <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-700 font-bold text-sm sm:text-base">Status</TableHead>
                                <TableHead className="text-right py-3 sm:py-4 px-3 sm:px-6 text-gray-700 font-bold text-sm sm:text-base">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {grievanceHistory.map((g) => (
                                <TableRow key={g.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6 font-medium text-gray-800 text-sm sm:text-base">{g.id}</TableCell>
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">{g.worker}</TableCell>
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">{g.category}</TableCell>
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">{g.submitted}</TableCell>
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">{g.resolved}</TableCell>
                                    <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                                        <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full inline-block whitespace-nowrap min-w-[100px] sm:min-w-[120px] text-center ${getStatusBadgeClass(g.status)}`}>
                                            {g.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right py-3 sm:py-4 px-3 sm:px-6">
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
                                                    className="text-blue-600 border-blue-300 hover:bg-blue-50 px-2 sm:px-4 py-1 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm"
                                                    onClick={() => {
                                                        setSelectedGrievance(g);
                                                        setModalStatus(g.status);
                                                    }}
                                                >
                                                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                                    <span className="hidden sm:inline">View Details</span>
                                                    <span className="sm:hidden">View</span>
                                                </Button>
                                            </DialogTrigger>
                                            {selectedGrievance && selectedGrievance.id === g.id && (
                                                <DialogContent className="max-w-2xl p-0 shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100">
                                                    {/* Custom close (cross) button in top right with white bg */}
                                                    <DialogClose asChild>
                                                        <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white hover:bg-gray-200 focus:outline-none shadow">
                                                            <X className="h-6 w-6 text-gray-800" />
                                                        </button>
                                                    </DialogClose>
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