'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, CheckCircle, Loader } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function AnnualReportsPage() {

    // Mock data for the state submission status
    const stateSubmissions = [
        { state: "Kerala", status: "Submitted", date: "2025-08-15" },
        { state: "Tamil Nadu", status: "Submitted", date: "2025-08-18" },
        { state: "West Bengal", status: "Submitted", date: "2025-08-20" },
        { state: "Bihar", status: "Pending", date: "---" },
        { state: "Uttar Pradesh", status: "Pending", date: "---" },
    ];

    const pastReports = [
        { year: 2024, title: "Annual Report on the Status of Safai Karmacharis 2024", submitted: "2025-02-01" },
        { year: 2023, title: "Annual Report on the Status of Safai Karmacharis 2023", submitted: "2024-02-01" },
    ];

    const totalStates = 28;
    const submittedStates = stateSubmissions.filter(s => s.status === 'Submitted').length;
    const progress = Math.round((submittedStates / totalStates) * 100);

  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8", contractorTheme.page.gradientBackground)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h2 className="text-3xl font-bold text-slate-800">Annual Reports Archive</h2>
            <p className="text-slate-600 mt-1">Track the compilation of the current annual report and access historical reports.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Link href="/ncsk/data-entry/annual-report-input">
            <Button className={cn(contractorTheme.button.primary)}>
                <FileText className="h-4 w-4 mr-2" />
                Go to Report Editor
            </Button>
          </Link>
        </div>
      </div>

      {/* Current Report Compilation Status */}
      <Card className={cn(contractorTheme.card.container)}>
        <CardHeader className={cn(contractorTheme.card.header)}>
            <CardTitle className={cn(contractorTheme.card.title)}>Annual Report 2025 Compilation Status</CardTitle>
            <CardDescription className={cn(contractorTheme.card.description)}>
                Tracking the submission of mandatory compliance summaries from all states and UTs.
            </CardDescription>
        </CardHeader>
        <CardContent className={cn(contractorTheme.card.content)}>
            <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">State Data Received</span>
                    <span className="text-sm font-bold text-orange-600">{submittedStates} / {totalStates} States</span>
                </div>
                <Progress value={progress} className="h-3 bg-green-200 [&>div]:bg-green-500" />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>State / UT</TableHead>
                        <TableHead>Submission Status</TableHead>
                        <TableHead>Date Received</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stateSubmissions.map(s => (
                        <TableRow key={s.state}>
                            <TableCell className="font-medium">{s.state}</TableCell>
                            <TableCell>
                                {s.status === 'Submitted' ? (
                                    <div className="flex items-center text-green-600">
                                        <CheckCircle className="h-4 w-4 mr-2"/>
                                        <span className="font-semibold">Submitted</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center text-gray-500">
                                        <Loader className="h-4 w-4 mr-2 animate-spin"/>
                                        <span className="font-semibold">Pending</span>
                                    </div>
                                )}
                            </TableCell>
                            <TableCell>{s.date}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow><TableCell colSpan={3} className="text-center text-sm text-gray-500">... and 23 other states.</TableCell></TableRow>
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}