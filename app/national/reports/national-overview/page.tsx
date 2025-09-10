'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye } from "lucide-react";
import { contractorTheme } from "@/lib/theme";

const statusColors: Record<string, string> = {
  'High Performing': 'bg-green-500 text-white',
  'Good Standing': 'bg-blue-500 text-white',
  'Under Watch': 'bg-yellow-400 text-gray-900',
  'Needs Intervention': 'bg-red-500 text-white',
};

export default function NationalOverviewReportPage() {

    // Mock data with simple, raw counts. No percentages.
    const states = [
        { name: "Kerala", incidents: 5, fatalities: 0, nonCompliantChecklists: 120, openGrievances: 15, status: "High Performing" },
        { name: "Tamil Nadu", incidents: 12, fatalities: 0, nonCompliantChecklists: 250, openGrievances: 22, status: "High Performing" },
        { name: "West Bengal", incidents: 35, fatalities: 1, nonCompliantChecklists: 800, openGrievances: 45, status: "Good Standing" },
        { name: "Maharashtra", incidents: 42, fatalities: 2, nonCompliantChecklists: 1200, openGrievances: 60, status: "Good Standing" },
        { name: "Bihar", incidents: 88, fatalities: 4, nonCompliantChecklists: 2500, openGrievances: 150, status: "Under Watch" },
        { name: "Uttar Pradesh", incidents: 110, fatalities: 5, nonCompliantChecklists: 3100, openGrievances: 210, status: "Under Watch" },
        { name: "Jharkhand", incidents: 95, fatalities: 3, nonCompliantChecklists: 1800, openGrievances: 90, status: "Needs Intervention" },
    ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h2 className="text-3xl font-bold text-blue-700 mb-1">National Overview Report</h2>
            <p className="text-base text-gray-600 dark:text-gray-300">A comprehensive, data-driven overview of all states and union territories.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" className="border-primary-300 text-primary-700 bg-gradient-to-r from-primary-50 to-secondary-50"><Download className="h-4 w-4 mr-2" />Export National Data (CSV)</Button>
        </div>
      </div>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-50 text-gray-900 dark:text-white">
        <CardHeader className="bg-gradient-to-r from-primary-500 via-secondary-400 to-accent-400 rounded-t-lg text-white">
            <CardTitle className="text-lg font-semibold text-blue-600 drop-shadow">National Performance Roster</CardTitle>
            <CardDescription className="text-white/90">
                This master table aggregates key performance indicators from all state-level reports.
            </CardDescription>
             <div className="flex items-center space-x-2 pt-2">
                <Input placeholder="Search by state/UT name..." className="max-w-xs bg-white text-gray-900 border-accent-200" />
             </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="rounded-b-lg overflow-hidden">
            <TableHeader className="bg-gradient-to-r from-blue-100 via-blue-50 to-accent-100">
              <TableRow>
                <TableHead className="text-blue-700 font-bold">State / UT</TableHead>
                <TableHead className="text-blue-700 font-bold">Incidents (30d)</TableHead>
                <TableHead className="text-blue-700 font-bold">Fatalities (YTD)</TableHead>
                <TableHead className="text-blue-700 font-bold">Non-Compliant Checklists (30d)</TableHead>
                <TableHead className="text-blue-700 font-bold">Open Grievances</TableHead>
                <TableHead className="text-blue-700 font-bold">Status</TableHead>
                <TableHead className="text-right text-blue-700 font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {states.map(s => (
                <TableRow key={s.name} className="hover:bg-blue-50/60 even:bg-blue-50/30 transition">
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className={`font-semibold text-center ${s.incidents > 50 ? 'text-red-600' : 'text-green-600'}`}>{s.incidents}</TableCell>
                  <TableCell className={`font-bold text-center ${s.fatalities > 0 ? 'text-red-600' : 'text-green-600'}`}>{s.fatalities}</TableCell>
                  <TableCell className="text-center">{s.nonCompliantChecklists.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{s.openGrievances}</TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[s.status as keyof typeof statusColors] || 'bg-gray-300 text-gray-800'}`}>{s.status}</span>
                  </TableCell>
                  <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 bg-gradient-to-r from-blue-50 to-accent-50"><Eye className="h-4 w-4 mr-2"/>View State Dashboard</Button>
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