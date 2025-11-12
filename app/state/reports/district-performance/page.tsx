'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Award, ThumbsDown, Eye, BarChart3 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DistrictPerformanceReportPage() {
    // Mock data for district performance in West Bengal
    const districts = [
        { name: "Kolkata", score: 94, incidents: 8, grievances: 5, fatalities: 0, resolutionTime: "24 Hours", status: "Excellent" },
        { name: "Jalpaiguri", score: 91, incidents: 4, grievances: 2, fatalities: 0, resolutionTime: "22 Hours", status: "Excellent" },
        { name: "Purba Bardhaman", score: 88, incidents: 10, grievances: 8, fatalities: 0, resolutionTime: "30 Hours", status: "Good" },
        { name: "Howrah", score: 85, incidents: 15, grievances: 12, fatalities: 0, resolutionTime: "36 Hours", status: "Good" },
        { name: "South 24 Parganas", score: 78, incidents: 25, grievances: 18, fatalities: 1, resolutionTime: "45 Hours", status: "Needs Improvement" },
        { name: "Murshidabad", score: 76, incidents: 22, grievances: 20, fatalities: 0, resolutionTime: "52 Hours", status: "Needs Improvement" },
    ];

  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8")}>
      <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">District Performance Report</h2>
            <p className="text-sm text-white/90">Analyze and compare operational performance across all districts in West Bengal.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 hidden md:block" aria-hidden />
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-0 justify-end">
        <Button className={cn(contractorTheme.button.secondary)}><Download className="h-4 w-4 mr-2" />Export Performance Data</Button>
      </div>

      <Card className={cn(contractorTheme.table.container)}>
        {/* Stronger, harder header color per request */}
        <CardHeader className="p-6 md:p-8 bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-lg">
            <CardTitle className="text-2xl md:text-3xl font-bold">Master Performance Roster</CardTitle>
            <CardDescription className="text-white/90 mt-2">Detailed metrics aggregated from each district's monthly summary report.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>District</TableHead>
                <TableHead>Overall Score</TableHead>
                <TableHead>Incidents (30d)</TableHead>
                <TableHead>Open Grievances</TableHead>
                <TableHead>Fatalities (YTD)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {districts.map((d) => (
                <TableRow key={d.name}>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell className="font-bold text-lg text-purple-600">{d.score}%</TableCell>
                  <TableCell className={`text-center font-semibold ${d.incidents > 20 ? 'text-red-600' : ''}`}>{d.incidents}</TableCell>
                  <TableCell className="text-center">{d.grievances}</TableCell>
                  <TableCell className={`text-center font-bold ${d.fatalities > 0 ? 'text-red-600' : 'text-green-600'}`}>{d.fatalities}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild><Button className={cn(contractorTheme.button.secondary, "!px-4 !py-2 text-sm") }><Eye className="h-4 w-4 mr-2"/>View Submitted Report</Button></DialogTrigger>
                      <DialogContent className="p-0 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-2xl shadow-xl border-0">
                        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-4">
                          <DialogHeader>
                            <DialogTitle className="text-white text-2xl font-bold drop-shadow">Monthly Summary: {d.name}</DialogTitle>
                            <DialogDescription className="text-blue-100">Read-only view of the official report submitted by the District Administrator.</DialogDescription>
                          </DialogHeader>
                        </div>
                        <div className="py-6 px-6 space-y-6 text-base">
                          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 shadow-sm">
                            <span className="font-bold text-blue-700">Executive Summary:</span>
                            <span className="block text-blue-900 mt-1">"Performance in {d.name} remains steady, although an increase in incidents in the southern zones requires attention..."</span>
                          </div>
                          <div className="bg-purple-50 border-l-4 border-purple-400 rounded-lg p-4 shadow-sm">
                            <span className="font-bold text-purple-700">Actions Taken:</span>
                            <span className="block text-purple-900 mt-1">"A formal warning has been issued to the underperforming Nodal unit..."</span>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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