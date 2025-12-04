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
import { UserCheck, UserX, Clock, Edit, Eye, Trash2, MessageCircle, Search, MapPin, AlertTriangle, Map } from "lucide-react"; // Added icons
import React, { useState, useMemo } from "react"; // Added useState and useMemo
import IntegratedLoader from "@/components/layout/IntegratedLoader";

const attendanceData = [
    {
        name: "Abishek Kumar",
        id: "WK001",
        shift: "Morning",
        status: "Present",
        checkin: "06:30 AM",
        checkout: "02:30 PM",
        category: 'Ordinary SK',
        assignedLocation: 'Ward 12',
        date: '2025-12-04',
        workType: 'Sweeping',
        remarks: 'Completed assigned path',
        checkinCoords: { lat: 22.5726, lng: 88.3639 },
        checkoutCoords: { lat: 22.5730, lng: 88.3645 },
        irregularities: { late: false, missedCheckout: false, outsideZone: false }
    },
    {
        name: "Priya Sharma",
        id: "WK002",
        shift: "Evening",
        status: "Present",
        checkin: "02:00 PM",
        checkout: "10:00 PM",
        category: 'Hazardous',
        assignedLocation: 'Sector 7',
        date: '2025-12-04',
        workType: 'Sewer Cleaning',
        remarks: 'Used PPE correctly',
        checkinCoords: { lat: 22.5720, lng: 88.3620 },
        checkoutCoords: { lat: 22.5725, lng: 88.3627 },
        irregularities: { late: false, missedCheckout: false, outsideZone: false }
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
    const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

    React.useEffect(() => {
        if (selectedRecord) {
            console.log('Attendance modal opened for:', selectedRecord.id || selectedRecord.name, selectedRecord);
        }
    }, [selectedRecord]);
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
            <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative z-10 rounded-3xl sm:rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-3xl sm:rounded-3xl border border-white/20 shadow-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-3xl sm:rounded-3xl"></div>
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
                <CardHeader className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white p-4 sm:p-6 md:p-8 rounded-t-3xl sm:rounded-t-3xl rounded-b-3xl sm:rounded-b-3xl">
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
                                                    type="button"
                                                    className="text-blue-600 hover:text-blue-800 p-1"
                                                    title="Edit Attendance"
                                                    aria-label={`Edit attendance ${row.id}`}
                                                >
                                                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-gray-600 hover:text-gray-900 p-1"
                                                    title="View Details"
                                                    aria-label={`View attendance details ${row.id}`}
                                                    onClick={() => { console.log('Eye clicked for', row.id); setSelectedRecord(row); }}
                                                >
                                                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-red-600 hover:text-red-800 p-1"
                                                    title="Delete Record"
                                                    aria-label={`Delete attendance ${row.id}`}
                                                >
                                                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-yellow-600 hover:text-yellow-800 p-1"
                                                    title="Add Note"
                                                    aria-label={`Add note ${row.id}`}
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
                {/* Attendance Detail Modal */}
                {selectedRecord && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedRecord(null)}></div>
                        <div className="relative w-full max-w-5xl mx-4 lg:mx-0 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 overflow-hidden transform transition-all duration-200 scale-100">
                            <div className="p-6 lg:p-8">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gradient-to-br from-blue-500 to-teal-400 text-white rounded-lg p-3 shadow-lg">
                                            <UserCheck className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl lg:text-2xl font-bold text-slate-900">{selectedRecord.name}</h3>
                                            <div className="text-sm text-slate-600">ID: {selectedRecord.id} • {selectedRecord.category}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button onClick={() => window.print()} className="px-3 py-2 bg-white border rounded-md text-sm">Print</button>
                                        <button onClick={() => setSelectedRecord(null)} className="px-3 py-2 bg-white border rounded-md text-sm">Close</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                                    {/* Left column: Worker info & attendance details */}
                                    <div className="space-y-4">
                                        <div className="p-4 bg-white/60 rounded-lg border border-white/30 shadow-sm">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <MapPin className="w-4 h-4 text-slate-600" />
                                                    <div>
                                                        <div className="text-xs text-slate-500">Assigned Location</div>
                                                        <div className="font-medium text-slate-800">{selectedRecord.assignedLocation || 'N/A'}</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500">Shift</div>
                                                    <div className="font-medium text-slate-800">{selectedRecord.shift}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-white/60 rounded-lg border border-white/30 shadow-sm">
                                            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2"><Clock className="w-4 h-4"/> Attendance Details</h4>
                                            <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
                                                <div>
                                                    <div className="text-xs text-slate-500">Date</div>
                                                    <div className="font-medium">{selectedRecord.date || new Date().toISOString().slice(0,10)}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500">Status</div>
                                                    <div className="font-medium">{selectedRecord.status}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500">Check-in</div>
                                                    <div className="font-medium">{selectedRecord.checkin}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500">Check-out</div>
                                                    <div className="font-medium">{selectedRecord.checkout}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500">Work Type</div>
                                                    <div className="font-medium">{selectedRecord.workType || '—'}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500">Remarks</div>
                                                    <div className="font-medium">{selectedRecord.remarks || '—'}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Irregularities (moved under Attendance Details) */}
                                        <div className="p-4 bg-white/60 rounded-lg border border-white/30 shadow-sm">
                                            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600"/> Irregularities</h4>
                                            <div className="text-sm text-slate-700 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <div>Late Check-in</div>
                                                    <div className={`font-medium ${selectedRecord.irregularities?.late ? 'text-amber-700' : 'text-green-700'}`}>{selectedRecord.irregularities?.late ? 'Yes' : 'No'}</div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>Missed Check-out</div>
                                                    <div className={`font-medium ${selectedRecord.irregularities?.missedCheckout ? 'text-amber-700' : 'text-green-700'}`}>{selectedRecord.irregularities?.missedCheckout ? 'Yes' : 'No'}</div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>Outside Assigned Zone</div>
                                                    <div className={`font-medium ${selectedRecord.irregularities?.outsideZone ? 'text-amber-700' : 'text-green-700'}`}>{selectedRecord.irregularities?.outsideZone ? 'Yes' : 'No'}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Attachments (moved under Attendance Details) */}
                                        <div className="p-4 bg-white/60 rounded-lg border border-white/30 shadow-sm">
                                            <h4 className="text-sm font-semibold text-slate-700 mb-3">Attachments</h4>
                                            {selectedRecord.attachments ? (
                                                selectedRecord.attachments.map((a: any, idx: number) => (
                                                    <div key={idx} className="flex items-center justify-between py-2 border-t border-white/20">
                                                        <div className="text-sm text-slate-800">{a.name || a}</div>
                                                        {a.url ? (
                                                            <a href={a.url} target="_blank" rel="noreferrer" className="text-teal-600">View</a>
                                                        ) : (
                                                            <div className="text-slate-500">—</div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-sm text-slate-600">No attachments</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right column: Attendance History only (expanded) */}
                                    <div className="space-y-4 flex flex-col">
                                        <div className="p-6 bg-gradient-to-br from-sky-50 via-emerald-50 to-teal-50 rounded-lg border border-white/20 shadow-lg flex flex-col">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="text-lg font-semibold text-slate-800">Attendance History (last 7 days)</h4>
                                                <div className="text-sm text-slate-500">Most recent first</div>
                                            </div>
                                            <div className="overflow-y-auto max-h-[560px] pt-2">
                                                <table className="w-full text-sm text-slate-700">
                                                    <thead>
                                                        <tr className="text-left text-xs text-slate-600">
                                                            <th className="py-3">Date</th>
                                                            <th className="py-3">Status</th>
                                                            <th className="py-3">Check-in</th>
                                                            <th className="py-3">Check-out</th>
                                                            <th className="py-3">Late</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Array.from({ length: 14 }).map((_, i) => {
                                                            const d = new Date();
                                                            d.setDate(d.getDate() - i);
                                                            const dateStr = d.toISOString().slice(0,10);
                                                            const status = i % 6 === 0 ? 'Absent' : i % 6 === 2 ? 'Late' : 'Present';
                                                            const isLate = i % 6 === 1 || i % 6 === 2;
                                                            const statusClass = status === 'Present' ? 'bg-green-100 text-green-800' : status === 'Late' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800';
                                                            return (
                                                                <tr key={i} className="border-t border-white/30 hover:bg-white/60 transition-colors">
                                                                    <td className="py-3 font-medium">{dateStr}</td>
                                                                    <td className="py-3">
                                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}>{status}</span>
                                                                    </td>
                                                                    <td className="py-3">{status === 'Absent' ? '-' : '06:30'}</td>
                                                                    <td className="py-3">{status === 'Absent' ? '-' : '14:30'}</td>
                                                                    <td className="py-3">{isLate ? <span className="text-amber-700 font-semibold">Yes</span> : <span className="text-green-700 font-semibold">No</span>}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}