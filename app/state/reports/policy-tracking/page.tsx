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

  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8", contractorTheme.page.gradientBackground)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h2 className="text-3xl font-bold text-slate-800">Policy Tracking Report</h2>
            <p className="text-slate-600 mt-1">Analyze the implementation progress of state-wide policies across all districts.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button className={cn(contractorTheme.button.secondary)}><Download className="h-4 w-4 mr-2" />Export Policy Summary</Button>
        </div>
      </div>

      <Card className={cn(contractorTheme.table.container)}>
        <CardHeader className={cn(contractorTheme.table.header)}>
            <CardTitle className={cn(contractorTheme.table.headerTitle)}>Master Policy Roster</CardTitle>
            <CardDescription className={cn(contractorTheme.table.headerDescription)}>Detailed implementation status for each state-wide policy.</CardDescription>
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
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>District Breakdown: {policy.name}</DialogTitle>
                                <DialogDescription>Compliance status for each district.</DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                               <Table><TableHeader><TableRow><TableHead>District</TableHead><TableHead>Compliance Status</TableHead></TableRow></TableHeader>
                               <TableBody>
                                 {policy.breakdown.map(d => (
                                    <TableRow key={d.name}><TableCell>{d.name}</TableCell><TableCell className="font-semibold">{d.compliance}%</TableCell></TableRow>
                                 ))}
                               </TableBody></Table>
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