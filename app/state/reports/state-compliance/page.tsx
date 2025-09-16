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

export default function StateComplianceReportPage() {
    // Mock data for district compliance in West Bengal
    const districts = [
        { name: "Kolkata", score: 94, warnings: 0, incidents: 8, status: "Excellent" },
        { name: "Jalpaiguri", score: 91, warnings: 1, incidents: 4, status: "Good" },
        { name: "Purba Bardhaman", score: 88, warnings: 1, incidents: 10, status: "Good" },
        { name: "Howrah", score: 85, warnings: 2, incidents: 15, status: "Good" },
        { name: "South 24 Parganas", score: 78, warnings: 5, incidents: 25, status: "Needs Improvement" },
        { name: "Murshidabad", score: 76, warnings: 4, incidents: 22, status: "Needs Improvement" },
    ];

  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8", contractorTheme.page.gradientBackground)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">State Compliance Report (West Bengal)</h2>
            <p className="text-slate-600 mt-1">Analyze compliance data aggregated from all district-level reports.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button className={cn(contractorTheme.button.secondary)}><Download className="h-4 w-4 mr-2" />Export State Summary</Button>
        </div>
      </div>

      <Card className={cn(contractorTheme.table.container)}>
        <CardHeader className={cn(contractorTheme.table.header)}>
            <CardTitle className={cn(contractorTheme.table.headerTitle)}>Master Compliance Roster (West Bengal)</CardTitle>
            <CardDescription className={cn(contractorTheme.table.headerDescription)}>Detailed compliance metrics aggregated from each district's monthly report.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>District</TableHead>
                <TableHead>Compliance Score</TableHead>
                <TableHead>Open Audit Warnings</TableHead>
                <TableHead>Total Incidents (30d)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {districts.map((d) => (
                <TableRow key={d.name}>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell className="font-bold text-lg text-purple-600">{d.score}%</TableCell>
                  <TableCell className={`text-center font-semibold ${d.warnings > 0 ? 'text-orange-600' : ''}`}>{d.warnings}</TableCell>
                  <TableCell className={`text-center font-semibold ${d.incidents > 20 ? 'text-red-600' : ''}`}>{d.incidents}</TableCell>
                  <TableCell className="text-right">
                    <Button className={cn(contractorTheme.button.secondary, "!px-4 !py-2 text-sm") }><Eye className="h-4 w-4 mr-2"/>View District Report</Button>
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