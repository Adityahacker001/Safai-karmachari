'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { contractorTheme } from "@/lib/theme";

export default function DistrictComplianceReportPage() {

    const units = [
        { name: "North Zone B", score: 95, warnings: 0, violations: 2, status: "Fully Compliant" },
        { name: "Central Zone A", score: 92, warnings: 0, violations: 5, status: "Fully Compliant" },
        { name: "Central Zone B", score: 89, warnings: 1, violations: 8, status: "Partially Compliant" },
        { name: "North Zone A", score: 78, warnings: 3, violations: 15, status: "Action Required" },
    ];

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
        <div className={cn("min-h-screen space-y-8 p-6 md:p-8", contractorTheme.page.gradientBackground)}>
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">District Compliance Report</h2>
                    <p className="text-slate-700 mt-1">Analyze compliance scores, audit histories, and violation trends across all Nodal units.</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <Button className={cn(contractorTheme.button.secondary, "text-sm")}>
                        <Download className="h-4 w-4 mr-2"/>Export Summary (PDF)
                    </Button>
                </div>
            </div>

            {/* Table Card */}
            <Card className={cn(contractorTheme.table.container, "shadow-lg")}>
                <CardHeader className={cn(contractorTheme.table.header)}>
                    <CardTitle className={cn(contractorTheme.table.headerTitle, "text-2xl")}>Master Compliance Roster</CardTitle>
                    <CardDescription className={cn(contractorTheme.table.headerDescription, "text-base")}>
                        Detailed compliance metrics for each Nodal unit.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    <Table>
  <TableHeader>
    <TableRow className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-gray-900 shadow-inner">
      <TableHead className="border border-gray-400 px-4 py-2 text-center font-extrabold">Nodal Unit</TableHead>
      <TableHead className="border border-gray-400 px-4 py-2 text-center font-extrabold">Compliance Score</TableHead>
      <TableHead className="border border-gray-400 px-4 py-2 text-center font-extrabold">Open Audit Warnings</TableHead>
      <TableHead className="border border-gray-400 px-4 py-2 text-center font-extrabold">Avg. Daily PPE Violations</TableHead>
      <TableHead className="border border-gray-400 px-4 py-2 text-center font-extrabold">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {units.map((unit, idx) => (
      <TableRow
        key={unit.name}
        className={cn(
          "hover:bg-gray-100 transition-colors cursor-pointer",
          idx % 2 === 0 ? "bg-gray-50" : "bg-white"
        )}
      >
        <TableCell className="border border-gray-300 px-4 py-2 text-center font-medium">{unit.name}</TableCell>
        <TableCell className={`border border-gray-300 px-4 py-2 text-center font-bold text-lg ${unit.score >= 90 ? "text-green-600" : unit.score >= 80 ? "text-orange-600" : "text-red-600"}`}>{unit.score}%</TableCell>
        <TableCell className={`border border-gray-300 px-4 py-2 text-center font-semibold ${unit.warnings > 0 ? 'text-orange-600' : 'text-gray-700'}`}>{unit.warnings}</TableCell>
        <TableCell className={`border border-gray-300 px-4 py-2 text-center font-semibold ${unit.violations > 10 ? 'text-red-600' : 'text-gray-700'}`}>{unit.violations}</TableCell>
        <TableCell className="border border-gray-300 px-4 py-2 text-center">
          <Button className={cn(contractorTheme.button.secondary, "text-sm")} size="sm">
            <Eye className="h-4 w-4 mr-2"/>View Audit History
          </Button>
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
