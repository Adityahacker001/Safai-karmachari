'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, Download, Star, Shield, GraduationCap, AlertTriangle, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const UnitPerformancePage = () => {

    const performanceData = [
        { id: "U-001", zone: "North Zone A", type: "Contractor", ppe: 98, training: 95, grievances: 1, score: 9.2 },
        { id: "U-002", zone: "North Zone B", type: "Contractor", ppe: 95, training: 100, grievances: 0, score: 9.5 },
        { id: "U-003", zone: "West Zone A", type: "Municipality", ppe: 88, training: 92, grievances: 4, score: 8.1 },
        { id: "U-004", zone: "West Zone B", type: "Contractor", ppe: 92, training: 85, grievances: 2, score: 8.5 },
        { id: "U-005", zone: "South Zone", type: "Municipality", ppe: 78, training: 80, grievances: 7, score: 7.0 },
        { id: "U-006", zone: "East Zone", type: "Contractor", ppe: 99, training: 99, grievances: 0, score: 9.8 },
        { id: "U-007", zone: "Central Zone", type: "Contractor", ppe: 91, training: 93, grievances: 3, score: 8.7 },
    ];

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

    return (
        <div className={cn("min-h-screen space-y-8", contractorTheme.page.gradientBackground, "p-6 md:p-8")}> 
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-blue-900">Unit Performance Report</h2>
                    <p className="text-blue-700 mt-1">Review and compare the performance of all operational units.</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <Button className={cn(contractorTheme.button.secondary, "text-sm")}> <Download className="h-4 w-4 mr-2" />Export Report</Button>
                </div>
            </div>

            <Card className={cn(contractorTheme.table.container)}>
                <CardHeader className={cn(contractorTheme.table.header)}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className={cn(contractorTheme.table.headerTitle, "text-2xl")}>Performance Metrics</CardTitle>
                            <CardDescription className={cn(contractorTheme.table.headerDescription, "text-base")}>Filter and analyze unit data.</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                            <Filter className="h-5 w-5 text-slate-300" />
                            <Select>
                                <SelectTrigger className={cn(contractorTheme.form.select, "w-[180px] text-sm bg-white/10 text-white border-white/20")}> 
                                    <SelectValue placeholder="Filter by Zone..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Zones</SelectItem>
                                    <SelectItem value="north">North Zone</SelectItem>
                                    <SelectItem value="south">South Zone</SelectItem>
                                    <SelectItem value="east">East Zone</SelectItem>
                                    <SelectItem value="west">West Zone</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className={cn(contractorTheme.form.select, "w-[180px] text-sm bg-white/10 text-white border-white/20")}> 
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
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-200">
                                <TableHead className="text-blue-700 font-bold"><Building className="inline-block h-4 w-4 mr-1" />Unit ID</TableHead>
                                <TableHead className="text-blue-700 font-bold">Zone</TableHead>
                                <TableHead className="text-blue-700 font-bold">Unit Type</TableHead>
                                <TableHead className="text-center text-blue-700 font-bold"><Shield className="inline-block h-4 w-4 mr-1" />PPE Compliance</TableHead>
                                <TableHead className="text-center text-blue-700 font-bold"><GraduationCap className="inline-block h-4 w-4 mr-1" />Training Coverage</TableHead>
                                <TableHead className="text-center text-blue-700 font-bold"><AlertTriangle className="inline-block h-4 w-4 mr-1" />Grievances</TableHead>
                                <TableHead className="text-center text-blue-700 font-bold"><Star className="inline-block h-4 w-4 mr-1" />Performance Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {performanceData.map((unit) => (
                                <TableRow key={unit.id} className="border-slate-100">
                                    <TableCell className="font-medium text-blue-900">{unit.id}</TableCell>
                                    <TableCell className="text-blue-700">{unit.zone}</TableCell>
                                    <TableCell><Badge className={cn("font-semibold", getTypeColor(unit.type))}>{unit.type}</Badge></TableCell>
                                    <TableCell className="text-center font-semibold text-blue-900">{unit.ppe}%</TableCell>
                                    <TableCell className="text-center font-semibold text-blue-900">{unit.training}%</TableCell>
                                    <TableCell className="text-center font-semibold text-blue-900">{unit.grievances}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge className={cn("font-bold text-sm", getScoreColor(unit.score))}>
                                            {unit.score.toFixed(1)}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
*** End Patch
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default UnitPerformancePage;
