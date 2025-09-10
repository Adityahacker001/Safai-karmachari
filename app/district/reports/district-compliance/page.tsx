'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ShieldCheck, AlertTriangle, FileText, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DistrictComplianceReportPage() {

    // Mock data for Nodal unit compliance
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
    <div className={cn("space-y-8", contractorTheme.page.gradientBackground, "p-6 md:p-8")}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h2 className="text-3xl font-bold text-slate-800">District Compliance Report</h2>
            <p className="text-slate-600 mt-1">Analyze compliance scores, audit histories, and violation trends across all Nodal units.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button className={cn(contractorTheme.button.secondary, "text-sm")}><Download className="h-4 w-4 mr-2" />Export Summary (PDF)</Button>
        </div>
      </div>

      {/* Compliance KPIs */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className={cn(contractorTheme.kpiCard.base, contractorTheme.kpiCard.attendance)}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium text-green-100">District Avg. Compliance</CardTitle><ShieldCheck className="h-5 w-5 text-green-200" /></CardHeader>
          <CardContent><div className="text-3xl font-bold">88%</div><p className="text-xs text-green-200">Average score across all units</p></CardContent>
        </Card>
        <Card className={cn(contractorTheme.kpiCard.base, contractorTheme.kpiCard.grievances)}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium text-orange-100">Units with Warnings</CardTitle><AlertTriangle className="h-5 w-5 text-orange-200" /></CardHeader>
          <CardContent><div className="text-3xl font-bold">{units.filter(u => u.warnings > 0).length}</div><p className="text-xs text-orange-200">Units with open audit issues</p></CardContent>
        </Card>
         <Card className={cn(contractorTheme.kpiCard.base, contractorTheme.kpiCard.workers)}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium text-blue-100">Total Audits This Quarter</CardTitle><FileText className="h-5 w-5 text-blue-200" /></CardHeader>
          <CardContent><div className="text-3xl font-bold">12</div><p className="text-xs text-blue-200">Official audits conducted</p></CardContent>
        </Card>
      </div> */}

      {/* <Card className={cn(contractorTheme.card.container)}>
        <CardHeader>
            <CardTitle className="text-slate-800">Nodal Unit Compliance Comparison</CardTitle>
            <CardDescription className="text-slate-600">
                Visual comparison of overall compliance scores for each Nodal unit.
            </CardDescription>
        </CardHeader>
        <CardContent className="h-72">
           <Bar
              data={{
                labels: units.map(u => u.name),
                datasets: [{ 
                    label: 'Compliance Score %', 
                    data: units.map(u => u.score), 
                    backgroundColor: units.map(u => u.score >= 90 ? '#22c55e' : u.score >= 80 ? '#f97316' : '#ef4444') // green, orange, red
                }],
              }}
              options={{ responsive: true, maintainAspectRatio: false, scales: { y: { min: 60, max: 100 } } }}
            />
        </CardContent>
      </Card> */}
      
      <Card className={cn(contractorTheme.table.container)}>
        <CardHeader className={cn(contractorTheme.table.header)}>
            <CardTitle className={cn(contractorTheme.table.headerTitle, "text-2xl")}>Master Compliance Roster</CardTitle>
            <CardDescription className={cn(contractorTheme.table.headerDescription, "text-base")}>
                Detailed compliance metrics for each Nodal unit.
            </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="text-slate-600 font-bold">Nodal Unit</TableHead>
                <TableHead className="text-slate-600 font-bold">Compliance Score</TableHead>
                <TableHead className="text-slate-600 font-bold">Open Audit Warnings</TableHead>
                <TableHead className="text-slate-600 font-bold">Avg. Daily PPE Violations</TableHead>
                <TableHead className="text-slate-600 font-bold">Status</TableHead>
                <TableHead className="text-right text-slate-600 font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => (
                <TableRow key={unit.name} className="border-slate-100">
                  <TableCell className="font-medium text-slate-800">{unit.name}</TableCell>
                  <TableCell className="font-bold text-lg text-purple-600">{unit.score}%</TableCell>
                  <TableCell className={`text-center font-semibold ${unit.warnings > 0 ? 'text-orange-600' : 'text-slate-700'}`}>{unit.warnings}</TableCell>
                  <TableCell className={`text-center font-semibold ${unit.violations > 10 ? 'text-red-600' : 'text-slate-700'}`}>{unit.violations}</TableCell>
                  <TableCell>
                    <Badge className={cn("font-semibold", getBadgeClass(unit.status))}>{unit.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button className={cn(contractorTheme.button.secondary, "text-sm")} size="sm"><Eye className="h-4 w-4 mr-2"/>View Audit History</Button>
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