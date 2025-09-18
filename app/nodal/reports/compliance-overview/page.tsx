'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ShieldCheck, AlertTriangle, FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { contractorTheme as theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function ComplianceOverviewReportPage() {

    // Mock data for the audit log
    const auditLog = [
        { contractor: "ABC Sanitation", auditDate: "2025-08-20", status: "Fully Compliant", finding: "All records in order." },
        { contractor: "City Maintenance", auditDate: "2025-08-18", status: "Partially Compliant", finding: "Minor delays in salary disbursement records." },
        { contractor: "Rail Clean Services", auditDate: "2025-08-19", status: "Fully Compliant", finding: "Excellent PPE stock and logs." },
        { contractor: "Municipal Services", auditDate: "2025-08-17", status: "Action Required", finding: "PPE distribution logs are incomplete. Warning issued." },
    ];
    
    // Mock data for top violations from daily worker checklists
    const topViolations = [
        { item: "Boots (Damaged/Missing)", count: 22, severity: "High" },
        { item: "Gas Detector (Not available)", count: 15, severity: "Critical" },
        { item: "Masks (Missing)", count: 12, severity: "Medium" },
        { item: "Late Checklist Submission", count: 9, severity: "Low" },
        { item: "Gloves (Damaged/Missing)", count: 7, severity: "High" },
    ];

 return (
    // UPDATED: Added padding here to ensure the background covers the full page with content spacing
    <div className={cn("min-h-screen w-full p-6 md:p-12", theme.page.gradientBackground)}>
        {/* UPDATED: Removed vertical padding from this inner container to prevent doubling up */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-pink-600 to-yellow-500 bg-clip-text text-transparent">Compliance Overview</h2>
              <p className="text-gray-600 mt-1">Analyze contractor audit results and daily safety checklist data.</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Button className={theme.button.secondary}><Download className="h-4 w-4 mr-2" />Export Summary</Button>
          </div>
        </div>

        {/* Two-Column Layout for Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Column: Official Audit Log */}
          <Card className={cn(theme.card.container, "flex flex-col min-h-[420px]")}> 
            <div className="rounded-t-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-500 px-8 py-7">
              <h3 className="text-3xl font-extrabold text-white mb-1">Official Audit Log</h3>
              <p className="text-white/80 text-lg">History of compliance audits conducted by the Nodal Officer.</p>
            </div>
            <CardContent className="p-0 flex-1 flex flex-col justify-end">
              <Table>
                <TableHeader><TableRow><TableHead className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Contractor</TableHead><TableHead className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Audit Date</TableHead><TableHead className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {auditLog.map((log) => (
                    <TableRow key={log.contractor} className="border-t border-gray-100">
                      <TableCell className="px-6 py-4 font-medium text-gray-800">{log.contractor}</TableCell>
                      <TableCell className="px-6 py-4 text-gray-600">{log.auditDate}</TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge 
                            className={cn("font-semibold text-xs py-1 px-3 rounded-full",
                                log.status === 'Fully Compliant' ? "bg-green-100 text-green-800 border border-green-200" :
                                log.status === 'Partially Compliant' ? "bg-yellow-100 text-yellow-800 border border-yellow-200" :
                                "bg-red-100 text-red-800 border border-red-200"
                            )}
                        >
                            {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Right Column: Top Violations from Daily Checklists */}
          <Card className={cn(theme.card.container, "flex flex-col min-h-[420px]")}> 
            <div className="rounded-t-3xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 px-8 py-7">
              <h3 className="text-3xl font-extrabold text-white mb-1">Top 5 Daily Violations</h3>
              <p className="text-white/80 text-lg">Aggregated from all daily worker safety submissions.</p>
            </div>
            <CardContent className="p-0 flex-1 flex flex-col justify-end">
              <Table>
                <TableHeader><TableRow><TableHead className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Violation Item</TableHead><TableHead className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Frequency</TableHead><TableHead className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Severity</TableHead></TableRow></TableHeader>
                <TableBody>
                  {topViolations.map((v) => (
                    <TableRow key={v.item} className="border-t border-gray-100">
                      <TableCell className="px-6 py-4 font-medium text-gray-800">{v.item}</TableCell>
                      <TableCell className="px-6 py-4 font-bold text-gray-700">{v.count}</TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge 
                            className={cn("font-semibold text-xs py-1 px-3 rounded-full",
                                v.severity === 'Critical' ? "bg-red-100 text-red-800 border border-red-200" :
                                v.severity === 'High' ? "bg-orange-100 text-orange-800 border border-orange-200" :
                                v.severity === 'Medium' ? "bg-yellow-100 text-yellow-800 border border-yellow-200" :
                                "bg-blue-100 text-blue-800 border border-blue-200"
                            )}
                        >
                            {v.severity}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}