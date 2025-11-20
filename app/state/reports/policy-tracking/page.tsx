'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle, AlertTriangle, Loader, Eye, FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function PolicyTrackingReportPage() {
    // Mock data for policies
    const policies = [
        { 
            name: "Mandatory Mechanization Drive (Phase 2)", 
            compliance: 65,
            target: 80,
            status: "Lagging",
            compliantDistricts: 15,
            totalDistricts: 23,
            topPerformer: "Kolkata (90%)",
            breakdown: [
                { name: "Kolkata", compliance: 90},
                { name: "Jalpaiguri", compliance: 75},
                { name: "South 24 Parganas", compliance: 40},
            ]
        },
        { 
            name: "Quarterly Safety Audits Mandate", 
            compliance: 92,
            target: 100,
            status: "On Track",
            compliantDistricts: 21,
            totalDistricts: 23,
            topPerformer: "Darjeeling (100%)",
            breakdown: []
        },
        { 
            name: "Waste Management Policy Implementation", 
            compliance: 78,
            target: 85,
            status: "Lagging",
            compliantDistricts: 18,
            totalDistricts: 23,
            topPerformer: "Howrah (88%)",
            breakdown: [
                { name: "Howrah", compliance: 88},
                { name: "Hooghly", compliance: 80},
                { name: "Nadia", compliance: 70},
            ]
        },
        { 
            name: "Sanitation Worker Safety Training", 
            compliance: 95,
            target: 95,
            status: "On Track",
            compliantDistricts: 23,
            totalDistricts: 23,
            topPerformer: "All Districts (95%)",
            breakdown: []
        },
        { 
            name: "Public Awareness Campaigns", 
            compliance: 50,
            target: 75,
            status: "Lagging",
            compliantDistricts: 10,
            totalDistricts: 23,
            topPerformer: "Darjeeling (70%)",
            breakdown: [
                { name: "Darjeeling", compliance: 70},
                { name: "Siliguri", compliance: 60},
                { name: "Cooch Behar", compliance: 40},
            ]
        }
    ];

  // IntegratedLoader (inline copy) — do not modify anything else in this file
  const IntegratedLoader: React.FC = () => (
    <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
      <style jsx>{`
        .loader {
          --c: no-repeat linear-gradient(#4f46e5 0 0);
          background: 
            var(--c),var(--c),var(--c),
            var(--c),var(--c),var(--c),
            var(--c),var(--c),var(--c);
          background-size: 16px 16px;
          animation: 
            l32-1 1s infinite,
            l32-2 1s infinite;
        }
        @keyframes l32-1 {
          0%,100% {width:45px;height: 45px}
          35%,65% {width:65px;height: 65px}
        }
        @keyframes l32-2 {
          0%,40%  {background-position: 0 0,0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,  50% 50% }
          60%,100%{background-position: 0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,0 0,  50% 50% }
        }
      `}</style>
      <div className="loader"></div>
    </div>
  );

  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <IntegratedLoader />;

  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8")}>
      <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Policy Tracking Report</h2>
            <p className="text-sm text-white/90">Analyze the implementation progress of state-wide policies across all districts.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 hidden md:block" aria-hidden />
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-0 justify-end">
        <Button className={cn(contractorTheme.button.secondary)}><Download className="h-4 w-4 mr-2" />Export Policy Summary</Button>
      </div>

      <Card className={cn(contractorTheme.table.container)}>
        {/* Stronger, harder header color per request */}
        <CardHeader className="p-6 md:p-8 bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-lg">
            <CardTitle className="text-2xl md:text-3xl font-bold">Master Policy Roster</CardTitle>
            <CardDescription className="text-white/90 mt-2">Detailed implementation status for each state-wide policy.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Initiative</TableHead>
                <TableHead>Compliant Districts</TableHead>
                <TableHead>Top Performer</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.name}>
                  <TableCell className="font-medium">{policy.name}</TableCell>
                  <TableCell className="font-semibold text-center">{policy.compliantDistricts} / {policy.totalDistricts}</TableCell>
                  <TableCell>{policy.topPerformer}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                        <DialogTrigger asChild><Button className={cn(contractorTheme.button.secondary, "!px-4 !py-2 text-sm") }><Eye className="h-4 w-4 mr-2"/>View Breakdown</Button></DialogTrigger>
                        <DialogContent className="p-0 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-2xl shadow-xl border-0">
                          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-4">
                            <DialogHeader>
                              <DialogTitle className="text-white text-2xl font-bold drop-shadow">District Breakdown: {policy.name}</DialogTitle>
                              <DialogDescription className="text-blue-100">Compliance status for each district.</DialogDescription>
                            </DialogHeader>
                          </div>
                          <div className="py-6 px-6">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="text-lg text-blue-700">District</TableHead>
                                  <TableHead className="text-lg text-blue-700">Compliance Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {policy.breakdown.map(d => (
                                  <TableRow key={d.name} className="hover:bg-blue-50/60 transition-colors">
                                    <TableCell className="font-semibold text-purple-700">{d.name}</TableCell>
                                    <TableCell>
                                      <span
                                        className={
                                          d.compliance >= 85
                                            ? 'inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold shadow'
                                            : d.compliance >= 70
                                            ? 'inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-bold shadow'
                                            : 'inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold shadow'
                                        }
                                      >
                                        {d.compliance}%
                                      </span>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
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