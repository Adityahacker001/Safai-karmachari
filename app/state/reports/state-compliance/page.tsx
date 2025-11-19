'use client';

import React from 'react';

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

function IntegratedLoader() {
  return (
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
}

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

    const [loading, setLoading] = React.useState(true);

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
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">State Compliance Report (West Bengal)</h2>
            <p className="text-sm text-white/90">Analyze compliance data aggregated from all district-level reports.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 hidden md:block" aria-hidden />
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-0 justify-end">
        <Button className={cn(contractorTheme.button.secondary)}><Download className="h-4 w-4 mr-2" />Export State Summary</Button>
      </div>

      <Card className={cn(contractorTheme.table.container)}>
        {/* Use a stronger, harder gradient for the header to match requested look */}
        <CardHeader className="p-6 md:p-8 bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-lg">
            <CardTitle className="text-2xl md:text-3xl font-bold">Master Compliance Roster (West Bengal)</CardTitle>
            <CardDescription className="text-white/90 mt-2">Detailed compliance metrics aggregated from each district's monthly report.</CardDescription>
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