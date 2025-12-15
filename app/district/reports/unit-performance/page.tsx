'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, Download, Star, Shield, GraduationCap, AlertTriangle, Building, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import IntegratedLoader from "@/components/layout/IntegratedLoader";

const UnitPerformancePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [zoneFilter, setZoneFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    const performanceData = [
        { id: "U-001", zone: "North Zone A", type: "Contractor", ppe: 98, training: 95, grievances: 1, score: 9.2 },
        { id: "U-002", zone: "North Zone B", type: "Contractor", ppe: 95, training: 100, grievances: 0, score: 9.5 },
        { id: "U-003", zone: "West Zone A", type: "Municipality", ppe: 88, training: 92, grievances: 4, score: 8.1 },
        { id: "U-004", zone: "West Zone B", type: "Contractor", ppe: 92, training: 85, grievances: 2, score: 8.5 },
        { id: "U-005", zone: "South Zone", type: "Municipality", ppe: 78, training: 80, grievances: 7, score: 7.0 },
        { id: "U-006", zone: "East Zone", type: "Contractor", ppe: 99, training: 99, grievances: 0, score: 9.8 },
        { id: "U-007", zone: "Central Zone", type: "Contractor", ppe: 91, training: 93, grievances: 3, score: 8.7 },
    ];

    // Filter data based on search term and filters
    const filteredData = performanceData.filter(unit => {
        // Search filter
        const matchesSearch = searchTerm === '' || 
            unit.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            unit.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
            unit.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            unit.ppe.toString().includes(searchTerm) ||
            unit.training.toString().includes(searchTerm) ||
            unit.grievances.toString().includes(searchTerm) ||
            unit.score.toString().includes(searchTerm);

        // Zone filter
        const matchesZone = zoneFilter === 'all' || 
            unit.zone.toLowerCase().includes(zoneFilter.toLowerCase());

        // Type filter
        const matchesType = typeFilter === 'all' || 
            unit.type.toLowerCase() === typeFilter.toLowerCase();

        return matchesSearch && matchesZone && matchesType;
    });

    const getTypeColor = (type: string) => {
        if (type === "Contractor") return "bg-blue-100 text-blue-800 border-blue-200";
        if (type === "Municipality") return "bg-purple-100 text-purple-800 border-purple-200";
        return "bg-gray-100 text-gray-800 border-gray-200";
    };

    const getScoreColor = (score: number) => {
        if (score >= 9) return "bg-green-100 text-green-800 border-green-200";
        if (score >= 8) return "bg-yellow-100 text-yellow-800 border-yellow-200";
        return "bg-red-100 text-red-800 border-red-200";
    };

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(t);
    }, []);

    if (loading) return <IntegratedLoader />;

    return (
        <div className="min-h-screen space-y-4 sm:space-y-6 md:space-y-8 p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8"> 
            {/* Professional Header */}
            <header className="relative overflow-hidden bg-gradient-to-r from-green-600/95 via-teal-600/95 to-blue-600/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                    <div className="flex-1">
                                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white drop-shadow-2xl leading-tight">
                                    Unit Performance Report
                                </h1>
                                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-bold drop-shadow-lg mt-1">
                                    Review and compare the performance of all operational units
                                </p>
                    </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="text-sm sm:text-base md:text-lg text-white/90 font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-xl border border-white/30">
                            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <Button className="bg-white/20 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-xl hover:bg-white/30 transition-all border border-white/30 font-bold">
                            <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                            <span className="text-sm sm:text-base">Export Report</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Professional Filters Card */}
            <Card className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-sm border-b border-white/20 p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                        <div>
                            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">Performance Metrics</CardTitle>
                            <CardDescription className="text-sm sm:text-base md:text-lg text-gray-700 mt-2 font-semibold">Filter and analyze unit data</CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                            <div className="flex items-center gap-3">
                                <Filter className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                                <Select value={zoneFilter} onValueChange={setZoneFilter}>
                                    <SelectTrigger className="w-full sm:w-[160px] md:w-[200px] text-sm sm:text-base bg-white/70 backdrop-blur-sm border-white/30 rounded-xl font-semibold"> 
                                        <SelectValue placeholder="Filter by Zone..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Zones</SelectItem>
                                        <SelectItem value="north">North Zone</SelectItem>
                                        <SelectItem value="south">South Zone</SelectItem>
                                        <SelectItem value="east">East Zone</SelectItem>
                                        <SelectItem value="west">West Zone</SelectItem>
                                        <SelectItem value="central">Central Zone</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="w-full sm:w-[160px] md:w-[200px] text-sm sm:text-base bg-white/70 backdrop-blur-sm border-white/30 rounded-xl font-semibold"> 
                                    <SelectValue placeholder="Filter by Type..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="contractor">Contractor</SelectItem>
                                    <SelectItem value="municipality">Municipality</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {/* Global Search */}
                    <div className="p-4 sm:p-6 border-b border-gray-200/50">
                        <div className="relative max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search units, zones, scores..."
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
                        <div className="mt-2 text-xs sm:text-sm text-gray-600">
                            Showing {filteredData.length} of {performanceData.length} units
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200/50">
                                    <TableHead className="text-xs sm:text-sm text-blue-700 font-bold px-2 sm:px-4 py-3"><Building className="inline-block h-3 w-3 sm:h-4 sm:w-4 mr-1" />Unit ID</TableHead>
                                    <TableHead className="text-xs sm:text-sm text-blue-700 font-bold px-2 sm:px-4 py-3">Zone</TableHead>
                                    <TableHead className="text-xs sm:text-sm text-blue-700 font-bold px-2 sm:px-4 py-3">Unit Type</TableHead>
                                    <TableHead className="text-center text-xs sm:text-sm text-blue-700 font-bold px-2 sm:px-4 py-3"><Shield className="inline-block h-3 w-3 sm:h-4 sm:w-4 mr-1" />PPE</TableHead>
                                    <TableHead className="text-center text-xs sm:text-sm text-blue-700 font-bold px-2 sm:px-4 py-3"><GraduationCap className="inline-block h-3 w-3 sm:h-4 sm:w-4 mr-1" />Training</TableHead>
                                    <TableHead className="text-center text-xs sm:text-sm text-blue-700 font-bold px-2 sm:px-4 py-3"><AlertTriangle className="inline-block h-3 w-3 sm:h-4 sm:w-4 mr-1" />Issues</TableHead>
                                    <TableHead className="text-center text-xs sm:text-sm text-blue-700 font-bold px-2 sm:px-4 py-3"><Star className="inline-block h-3 w-3 sm:h-4 sm:w-4 mr-1" />Score</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((unit) => (
                                    <TableRow key={unit.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-colors border-b border-gray-100">
                                        <TableCell className="font-medium text-blue-900 text-xs sm:text-sm px-2 sm:px-4 py-3">{unit.id}</TableCell>
                                        <TableCell className="text-blue-700 text-xs sm:text-sm px-2 sm:px-4 py-3">{unit.zone}</TableCell>
                                        <TableCell className="px-2 sm:px-4 py-3"><Badge className={cn("font-semibold text-xs", getTypeColor(unit.type))}>{unit.type}</Badge></TableCell>
                                        <TableCell className="text-center font-semibold text-blue-900 text-xs sm:text-sm px-2 sm:px-4 py-3">{unit.ppe}%</TableCell>
                                        <TableCell className="text-center font-semibold text-blue-900 text-xs sm:text-sm px-2 sm:px-4 py-3">{unit.training}%</TableCell>
                                        <TableCell className="text-center font-semibold text-blue-900 text-xs sm:text-sm px-2 sm:px-4 py-3">{unit.grievances}</TableCell>
                                        <TableCell className="text-center px-2 sm:px-4 py-3">
                                            <Badge className={cn("font-bold text-xs", getScoreColor(unit.score))}>
                                                {unit.score.toFixed(1)}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center h-24 text-gray-500 text-sm">
                                            {searchTerm || zoneFilter !== 'all' || typeFilter !== 'all' 
                                                ? `No units found matching the current filters`
                                                : 'No performance data available'
                                            }
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

export default UnitPerformancePage;
