'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, Search, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { contractorTheme } from "@/lib/theme";
import { useState } from "react";

export default function DistrictComplianceReportPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const units = [
        { name: "North Zone B", score: 95, warnings: 0, violations: 2, status: "Fully Compliant" },
        { name: "Central Zone A", score: 92, warnings: 0, violations: 5, status: "Fully Compliant" },
        { name: "Central Zone B", score: 89, warnings: 1, violations: 8, status: "Partially Compliant" },
        { name: "North Zone A", score: 78, warnings: 3, violations: 15, status: "Action Required" },
    ];

    // Filter units based on search term
    const filteredUnits = units.filter(unit =>
        unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.score.toString().includes(searchTerm) ||
        unit.warnings.toString().includes(searchTerm) ||
        unit.violations.toString().includes(searchTerm)
    );

    const getBadgeClass = (status: string) => {
        switch (status) {
            case "Fully Compliant":
                return "bg-green-100 text-green-800 border-green-200";
            case "Partially Compliant":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Action Required":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-slate-100 text-slate-800 border-slate-200";
        }
    };

    return (
        <div className="min-h-screen p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-4 sm:space-y-6">
            
            {/* Professional Header */}
            <header className="bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl">
                <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-2xl leading-tight">
                            Nodal Compliance Report
                        </h1>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-bold drop-shadow-lg mt-1 sm:mt-2">
                            Analyze compliance scores, audit histories, and violation trends across all Nodal units
                        </p>
                    </div>
                    <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:scale-105 hover:shadow-lg transition-all flex items-center space-x-1.5 sm:space-x-2 border border-white/30 text-xs sm:text-sm md:text-base">
                        <Download className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"/>
                        <span className="hidden sm:inline">Export Summary (PDF)</span>
                        <span className="sm:hidden">Export PDF</span>
                    </Button>
                </div>
            </header>

            {/* Table Card */}
            <Card className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl">
                <CardHeader className="p-3 sm:p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl sm:rounded-t-2xl border-b border-blue-100">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Master Compliance Roster</CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                        Detailed compliance metrics for each Nodal unit.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6">
                    {/* Global Search */}
                    <div className="mb-4 sm:mb-6">
                        <div className="relative max-w-md mx-auto">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search units, status, scores..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-9 sm:pl-10 pr-10 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm placeholder-gray-500"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b-2 border-blue-200">
                                    <TableHead className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">Nodal Unit</TableHead>
                                    <TableHead className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">Compliance Score</TableHead>
                                    <TableHead className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">Open Audit Warnings</TableHead>
                                    <TableHead className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">Avg. Daily PPE Violations</TableHead>
                                    <TableHead className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="bg-white/50 backdrop-blur-sm">
                                {filteredUnits.length > 0 ? (
                                    filteredUnits.map((unit, idx) => (
                                        <TableRow
                                            key={unit.name}
                                            className="hover:bg-blue-50/70 transition-colors border-b border-gray-100"
                                        >
                                            <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-gray-800">{unit.name}</TableCell>
                                            <TableCell className={`px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center font-bold text-sm sm:text-base md:text-lg ${unit.score >= 90 ? "text-green-600" : unit.score >= 80 ? "text-orange-600" : "text-red-600"}`}>{unit.score}%</TableCell>
                                            <TableCell className={`px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold ${unit.warnings > 0 ? 'text-orange-600' : 'text-gray-700'}`}>{unit.warnings}</TableCell>
                                            <TableCell className={`px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold ${unit.violations > 10 ? 'text-red-600' : 'text-gray-700'}`}>{unit.violations}</TableCell>
                                            <TableCell className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center">
                                                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm" size="sm">
                                                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2"/>
                                                    <span className="hidden sm:inline">View Audit History</span>
                                                    <span className="sm:hidden">View</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24 text-gray-500 text-sm">
                                            No units found matching "{searchTerm}"
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
