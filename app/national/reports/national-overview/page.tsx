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
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8">
      {/* Professional Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white drop-shadow-2xl leading-tight">
              National Overview Report
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-lg text-white/90 font-bold drop-shadow-lg mt-2">
              A comprehensive, data-driven overview of all states and union territories
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
           
            <Button variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all font-bold rounded-xl">
              <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Export National Data (CSV)
            </Button>
          </div>
        </div>
      </header>

      {/* Professional Performance Table */}
      <Card className="backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-sm border-b border-white/20 p-4 sm:p-6 md:p-8">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 drop-shadow-lg">National Performance</CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg text-gray-700 font-semibold mt-2">
                This master table aggregates key performance indicators from all state-level reports
            </CardDescription>
             <div className="flex items-center gap-3 pt-4">
                <Input 
                  placeholder="Search by state/UT name..." 
                  className="max-w-xs bg-white/70 backdrop-blur-sm text-gray-900 placeholder:text-gray-500 border-white/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl font-semibold" 
                />
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

