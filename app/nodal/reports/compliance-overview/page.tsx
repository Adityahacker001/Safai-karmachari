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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Compliance Overview
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">
              Analyze contractor audit results and daily safety checklist data
            </p>
          </div>
          <Button className="mt-4 sm:mt-0 bg-white text-blue-600 hover:bg-blue-50 font-semibold">
            <Download className="h-4 w-4 mr-2" />
            Export Summary
          </Button>
        </div>
      </div>

      {/* Two-Column Layout for Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column: Official Audit Log */}
        <Card className="bg-white shadow-lg rounded-2xl overflow-hidden"> 
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardTitle className="text-xl font-bold">Official Audit Log</CardTitle>
            <CardDescription className="text-blue-100">History of compliance audits conducted by the Nodal Officer</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-blue-200">
                    <TableHead className="text-gray-700 font-semibold py-4 px-6">Contractor</TableHead>
                    <TableHead className="text-gray-700 font-semibold py-4 px-6">Audit Date</TableHead>
                    <TableHead className="text-gray-700 font-semibold py-4 px-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLog.map((log, index) => (
                    <TableRow key={log.contractor} className={`hover:bg-gray-50 transition-colors border-l-4 ${
                      log.status === 'Fully Compliant' ? 'border-l-green-400' :
                      log.status === 'Partially Compliant' ? 'border-l-yellow-400' : 'border-l-red-400'
                    } ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                      <TableCell className="font-medium text-gray-900 py-4 px-6">{log.contractor}</TableCell>
                      <TableCell className="text-gray-600 py-4 px-6">{log.auditDate}</TableCell>
                      <TableCell className="py-4 px-6">
                        <Badge 
                            className={cn("font-semibold text-xs py-1 px-3 rounded-full",
                                log.status === 'Fully Compliant' ? "bg-green-100 text-green-800 hover:bg-green-200" :
                                log.status === 'Partially Compliant' ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                                "bg-red-100 text-red-800 hover:bg-red-200"
                            )}
                        >
                            {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Top Violations from Daily Checklists */}
        <Card className="bg-white shadow-lg rounded-2xl overflow-hidden"> 
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardTitle className="text-xl font-bold">Top 5 Daily Violations</CardTitle>
            <CardDescription className="text-purple-100">Aggregated from all daily worker safety submissions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-purple-200">
                    <TableHead className="text-gray-700 font-semibold py-4 px-6">Violation Item</TableHead>
                    <TableHead className="text-gray-700 font-semibold py-4 px-6">Frequency</TableHead>
                    <TableHead className="text-gray-700 font-semibold py-4 px-6">Severity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topViolations.map((v, index) => (
                    <TableRow key={v.item} className={`hover:bg-gray-50 transition-colors border-l-4 ${
                      v.severity === 'Critical' ? 'border-l-red-400' :
                      v.severity === 'High' ? 'border-l-orange-400' :
                      v.severity === 'Medium' ? 'border-l-yellow-400' : 'border-l-blue-400'
                    } ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                      <TableCell className="font-medium text-gray-900 py-4 px-6">{v.item}</TableCell>
                      <TableCell className="font-bold text-gray-700 py-4 px-6">{v.count}</TableCell>
                      <TableCell className="py-4 px-6">
                        <Badge 
                            className={cn("font-semibold text-xs py-1 px-3 rounded-full",
                                v.severity === 'Critical' ? "bg-red-100 text-red-800 hover:bg-red-200" :
                                v.severity === 'High' ? "bg-orange-100 text-orange-800 hover:bg-orange-200" :
                                v.severity === 'Medium' ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                                "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            )}
                        >
                            {v.severity}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}