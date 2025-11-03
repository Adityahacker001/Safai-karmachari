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

    return (
        <div className="min-h-screen w-full max-w-full sm:max-w-full md:max-w-7xl mx-auto p-4 sm:p-6 md:p-12 space-y-6 sm:space-y-8 md:space-y-10">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center sm:text-left">Worker Attendance</h1>
                <Button className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium">
                    Mark Attendance
                </Button>
            </div>

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

            <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                    Worker-wise Attendance
                </h2>
                <Card className="w-full max-w-full sm:max-w-full md:max-w-6xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <CardHeader className="p-4 sm:p-6 md:p-8 bg-blue-800 rounded-t-2xl sm:rounded-t-3xl">
                        <div className="relative w-full">
                            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
                            <Input
                                placeholder="Search by name or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:max-w-md pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 border-blue-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-300/50 rounded-lg sm:rounded-xl bg-white"
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
        </div>
    );
}