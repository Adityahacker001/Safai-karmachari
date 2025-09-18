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
import { UserCheck, UserX, Clock, Edit, Eye, Trash2, MessageCircle, Search } from "lucide-react"; // Added Search Icon
import React, { useState, useMemo } from "react"; // Added useState and useMemo

const attendanceData = [
    {
        name: "Ramesh Kumar",
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
        name: "Suresh Yadav",
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
        <div className="space-y-6 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-100 via-purple-100 via-pink-100 via-rose-100 to-yellow-100 min-h-screen">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Worker Attendance</h1>
                <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Mark Attendance
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-green-500 via-green-400 to-emerald-400 text-white">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium text-white">
                            Workers Present Today
                        </CardTitle>
                        <div className="p-2 bg-green-500/30 rounded-lg">
                            <UserCheck className="w-6 h-6 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">
                            38{" "}
                            <span className="text-lg font-normal text-green-100">/ 43</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-red-500 via-red-400 to-rose-400 text-white">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium text-white">
                            Absent Workers
                        </CardTitle>
                        <div className="p-2 bg-red-500/30 rounded-lg">
                            <UserX className="w-6 h-6 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">5</div>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-yellow-500 via-yellow-400 to-amber-400 text-white">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium text-white">
                            Late Check-ins
                        </CardTitle>
                        <div className="p-2 bg-yellow-500/30 rounded-lg">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">2</div>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-blue-500 via-blue-400 to-sky-400 text-white">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-medium text-white">
                            Attendance Rate
                        </CardTitle>
                        <div className="p-2 bg-blue-500/30 rounded-lg">
                            <UserCheck className="w-6 h-6 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">89%</div>
                        <p className="text-sm text-blue-100 mt-1">+2% from yesterday</p>
                    </CardContent>
                </Card>
            </div>

            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Worker-wise Attendance
                </h2>
                <Card className="bg-gradient-to-br from-cyan-50 via-blue-50 to-emerald-100 shadow-2xl border border-gray-100 rounded-3xl overflow-hidden">
                    <CardHeader className="p-4 sm:p-6 bg-blue-800 rounded-t-3xl">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                            <Input
                                placeholder="Search by name or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full max-w-md pl-12 pr-4 py-2.5 text-gray-900 placeholder:text-gray-400 border-blue-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-300/50 rounded-xl bg-white"
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table className="w-full">
                            <TableHeader className="bg-slate-50">
                                <TableRow className="border-b border-gray-200">
                                    <TableHead className="py-4 px-6 text-slate-600 font-bold text-base">
                                        Worker Name
                                    </TableHead>
                                    <TableHead className="py-4 px-6 text-slate-600 font-bold text-base">
                                        Worker ID
                                    </TableHead>
                                    <TableHead className="py-4 px-6 text-slate-600 font-bold text-base">
                                        Attendance Status
                                    </TableHead>
                                    <TableHead className="py-4 px-6 text-slate-600 font-bold text-base">
                                        Check-in Time
                                    </TableHead>
                                    <TableHead className="py-4 px-6 text-slate-600 font-bold text-base">
                                        Check-out Time
                                    </TableHead>
                                    <TableHead className="text-right py-4 px-6 text-slate-600 font-bold text-base">
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
                                        <TableCell className="py-4 px-6 font-semibold text-gray-800 text-base">
                                            {row.name}
                                        </TableCell>
                                        <TableCell className="py-4 px-6 text-gray-700 text-base">
                                            {row.id}
                                        </TableCell>
                                        <TableCell className="py-4 px-6">
                                            {statusBadge(row.status)}
                                        </TableCell>
                                        <TableCell className="py-4 px-6 text-gray-700">
                                            {row.checkin}
                                        </TableCell>
                                        <TableCell className="py-4 px-6 text-gray-700">
                                            {row.checkout}
                                        </TableCell>
                                        <TableCell className="text-right py-4 px-6">
                                            <div className="flex space-x-2 justify-end">
                                                <button
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Edit Attendance"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="text-gray-600 hover:text-gray-900"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Delete Record"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="text-yellow-600 hover:text-yellow-800"
                                                    title="Add Note"
                                                >
                                                    <MessageCircle className="w-4 h-4" />
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