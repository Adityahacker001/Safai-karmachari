"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Added import for Input component
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/ui/stat-card";
import { UserCheck, UserX, Clock, Edit, Eye, Trash2, MessageCircle, Search } from "lucide-react"; // Added Search Icon
import React, { useState, useMemo } from "react"; // Added useState and useMemo
import IntegratedLoader from "@/components/IntegratedLoader";

const attendanceData = [
    {
        name: "Abishek Kumar",
        id: "WK001",
        shift: "Morning",
        status: "Present",
        checkin: "06:30 AM",
        checkout: "02:30 PM",
    },
    {
        name: "Priya Sharma",
        id: "WK002",
        shift: "Evening",
        status: "Present",
        checkin: "02:00 PM",
        checkout: "10:00 PM",
    },
    {
        name: "Abishek Yadav",
        id: "WK003",
        shift: "Morning",
        status: "Absent",
        checkin: "-",
        checkout: "-",
    },
    {
        name: "Anita Devi",
        id: "WK004",
        shift: "Morning",
        status: "Present",
        checkin: "06:45 AM",
        checkout: "02:45 PM",
    },
    {
        name: "Mohan Lal",
        id: "WK005",
        shift: "Evening",
        status: "Late",
        checkin: "02:15 PM",
        checkout: "-",
    },
];

const statusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
        Present: "bg-green-100 text-green-800",
        Absent: "bg-red-100 text-red-800",
        Late: "bg-yellow-100 text-yellow-800",
    };
    return (
        <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
                statusClasses[status] || "bg-gray-100 text-gray-800"
            }`}
        >
            {status}
        </span>
    );
};

export default function WorkerAttendance() {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = React.useState(true);
    const filteredData = useMemo(() => {
        if (!searchQuery) {
            return attendanceData;
        }
        const lowerCaseQuery = searchQuery.toLowerCase();
        return attendanceData.filter(
            (worker) =>
                worker.name.toLowerCase().includes(lowerCaseQuery) ||
                worker.id.toLowerCase().includes(lowerCaseQuery)
        );
    }, [searchQuery]);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200); // Simulate loading
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <IntegratedLoader />;
    }

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
                                Worker Attendance
                            </h1>
                            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold drop-shadow-lg">
                                Track and manage worker attendance records
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base backdrop-blur-sm">
                                Mark Attendance
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                    title="Workers Present Today"
                    value="38 / 43"
                    icon={UserCheck}
                    color="green"
                />
                
                <StatCard
                    title="Absent Workers"
                    value={5}
                    icon={UserX}
                    color="red"
                />
                
                <StatCard
                    title="Late Check-ins"
                    value={2}
                    icon={Clock}
                    color="amber"
                />
                
                <StatCard
                    title="Attendance Rate"
                    value="89%"
                    subtitle="+2% from yesterday"
                    icon={UserCheck}
                    color="blue"
                />
            </div>

            <Card className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white p-4 sm:p-6 md:p-8">
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3 mb-4">
                        <Clock className="h-6 w-6 sm:h-8 sm:w-8" />
                        Worker-wise Attendance
                    </CardTitle>
                    <div className="relative w-full">
                        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-white/70" />
                        <Input
                            placeholder="Search by name or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:max-w-md pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 text-sm sm:text-base bg-white/20 text-white placeholder:text-white/70 border-white/30 focus:border-white focus:ring-2 focus:ring-white/30 rounded-lg sm:rounded-xl"
                        />
                    </div>
                </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <Table className="w-full min-w-[600px]">
                            <TableHeader className="bg-slate-50">
                                <TableRow className="border-b border-gray-200">
                                    <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">
                                        Worker Name
                                    </TableHead>
                                    <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">
                                        Worker ID
                                    </TableHead>
                                    <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">
                                        Status
                                    </TableHead>
                                    <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">
                                        Check-in
                                    </TableHead>
                                    <TableHead className="py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">
                                        Check-out
                                    </TableHead>
                                    <TableHead className="text-right py-3 sm:py-4 px-3 sm:px-6 text-slate-600 font-bold text-sm sm:text-base">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        <TableCell className="py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-800 text-sm sm:text-base">
                                            {row.name}
                                        </TableCell>
                                        <TableCell className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">
                                            {row.id}
                                        </TableCell>
                                        <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                                            {statusBadge(row.status)}
                                        </TableCell>
                                        <TableCell className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">
                                            {row.checkin}
                                        </TableCell>
                                        <TableCell className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-sm sm:text-base">
                                            {row.checkout}
                                        </TableCell>
                                        <TableCell className="text-right py-3 sm:py-4 px-3 sm:px-6">
                                            <div className="flex space-x-1 sm:space-x-2 justify-end">
                                                <button
                                                    className="text-blue-600 hover:text-blue-800 p-1"
                                                    title="Edit Attendance"
                                                >
                                                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                                <button
                                                    className="text-gray-600 hover:text-gray-900 p-1"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-800 p-1"
                                                    title="Delete Record"
                                                >
                                                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                                <button
                                                    className="text-yellow-600 hover:text-yellow-800 p-1"
                                                    title="Add Note"
                                                >
                                                    <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                            </div>
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