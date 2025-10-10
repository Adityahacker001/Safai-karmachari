'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye } from "lucide-react";
import { contractorTheme } from "@/lib/theme";

const statusGradients: Record<string, string> = {
  'High Performing': 'bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-white',
  'Good Standing': 'bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 text-white',
  'Under Watch': 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-300 text-gray-900',
  'Needs Intervention': 'bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white',
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
            <h2 className="text-3xl font-bold text-gray-900 mb-1">National Overview Report</h2>
            <p className="text-base text-gray-600 dark:text-gray-300">A comprehensive, data-driven overview of all states and union territories.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" className="border-primary-300 text-primary-700 bg-gradient-to-r from-primary-50 to-secondary-50"><Download className="h-4 w-4 mr-2" />Export National Data (CSV)</Button>
        </div>
      </div>

      <Card className="shadow-2xl border-none rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white shadow-md">
            <CardTitle className="text-4xl font-bold text-white drop-shadow-lg">National Performance</CardTitle>
            <CardDescription className="text-purple-200">
                This master table aggregates key performance indicators from all state-level reports.
            </CardDescription>
             <div className="flex items-center space-x-2 pt-4">
                <Input placeholder="Search by state/UT name..." className="max-w-xs bg-white/10 text-white placeholder:text-purple-200 border-purple-400/50 focus:ring-purple-400" />
             </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-gradient-to-br from-white via-blue-50 to-emerald-50">
            <Table>
              <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="text-slate-600 font-bold">State / UT</TableHead>
                <TableHead className="text-slate-600 font-bold text-center">Incidents (30d)</TableHead>
                <TableHead className="text-slate-600 font-bold text-center">Fatalities (YTD)</TableHead>
                <TableHead className="text-slate-600 font-bold text-center">Non-Compliant Checklists (30d)</TableHead>
                <TableHead className="text-slate-600 font-bold text-center">Open Grievances</TableHead>
                <TableHead className="text-slate-600 font-bold text-center">Status</TableHead>
                <TableHead className="text-right text-slate-600 font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {states.map(s => (
                <TableRow key={s.name} className="hover:shadow-lg hover:z-10 hover:bg-white transition-all duration-200 border-b border-slate-100">
                  <TableCell className="font-medium text-slate-800">{s.name}</TableCell>
                  <TableCell className={`font-semibold text-center ${s.incidents > 50 ? 'text-red-600' : 'text-green-600'}`}>{s.incidents}</TableCell>
                  <TableCell className={`font-bold text-center ${s.fatalities > 0 ? 'text-red-600' : 'text-green-600'}`}>{s.fatalities}</TableCell>
                  <TableCell className="text-center text-slate-600">{s.nonCompliantChecklists.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-slate-600">{s.openGrievances}</TableCell>
                  <TableCell>
                      <div className="flex justify-center">
                          <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg transition-transform duration-200 ${statusGradients[s.status as keyof typeof statusGradients] || 'bg-gray-300 text-gray-800'} hover:scale-105`}>
                            {s.status}
                          </span>
                      </div>
                  </TableCell>
                  <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 bg-white hover:bg-blue-50"><Eye className="h-4 w-4 mr-2"/>View Dashboard</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

