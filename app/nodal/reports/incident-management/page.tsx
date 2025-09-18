'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import { contractorTheme as theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function IncidentReportPage() {
  const incidents = [
    { id: 'CASE-001', type: 'Manual Scavenging', contractor: 'ABC Sanitation', reported: '2025-08-28', status: 'Action Required' },
    { id: 'CASE-002', type: 'Unsafe Conditions', contractor: 'City Maintenance', reported: '2025-08-27', status: 'Action Overdue' },
    { id: 'CASE-003', type: 'PPE Violation', contractor: 'Rail Clean Services', reported: '2025-08-27', status: 'Resolved' },
    { id: 'CASE-004', type: 'Manual Scavenging', contractor: 'City Maintenance', reported: '2025-08-26', status: 'Resolved' },
    { id: 'CASE-005', type: 'Worker Grievance', contractor: 'ABC Sanitation', reported: '2025-08-25', status: 'Escalated' },
  ];

  const [selectedIncident, setSelectedIncident] = useState<any | null>(null);

  return (
    <div className={cn("min-h-screen w-full p-0", theme.page.gradientBackground)}>
      <div className="py-8 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 space-y-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-pink-600 to-yellow-500 bg-clip-text text-transparent">
              Incident Management
            </h2>
            <p className="text-gray-600 mt-1">
              Analyze incident trends and review historical case data for your zone.
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Button className={theme.button.secondary}>
              <Download className="h-4 w-4 mr-2" />
              Export Report (CSV)
            </Button>
          </div>
        </div>

        <Card className={theme.card.container}>
          <CardHeader className={theme.card.header}>
            <CardTitle className={theme.card.title}>Historical Incident Log</CardTitle>
            <CardDescription className={theme.card.description}>
              Complete record of all verified incidents in your zone.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table className="border border-gray-300 text-sm">
              <TableHeader>
                <TableRow className="bg-gray-100 border-b border-gray-300">
                  <TableHead className="px-4 py-3 border-r border-gray-300 text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Case ID
                  </TableHead>
                  <TableHead className="px-4 py-3 border-r border-gray-300 text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Type
                  </TableHead>
                  <TableHead className="px-4 py-3 border-r border-gray-300 text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Contractor
                  </TableHead>
                  <TableHead className="px-4 py-3 border-r border-gray-300 text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Reported
                  </TableHead>
                  <TableHead className="px-4 py-3 border-r border-gray-300 text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Status
                  </TableHead>
                  <TableHead className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidents.map((incident, i) => (
                  <TableRow
                    key={incident.id}
                    className={cn(
                      "border-t border-gray-300",
                      i % 2 === 0 ? "bg-white" : "bg-gray-50",
                      "hover:bg-blue-50 transition"
                    )}
                  >
                    <TableCell className="px-4 py-3 border-r border-gray-200 font-medium text-gray-800">
                      {incident.id}
                    </TableCell>
                    <TableCell className="px-4 py-3 border-r border-gray-200 text-gray-700">
                      {incident.type}
                    </TableCell>
                    <TableCell className="px-4 py-3 border-r border-gray-200 text-gray-700">
                      {incident.contractor}
                    </TableCell>
                    <TableCell className="px-4 py-3 border-r border-gray-200 text-gray-700">
                      {incident.reported}
                    </TableCell>
                    <TableCell className="px-4 py-3 border-r border-gray-200">
                      <Badge
                        className={cn(
                          "font-semibold text-xs py-1 px-3 rounded-full",
                          incident.status === "Resolved"
                            ? "bg-green-100 text-green-800 border border-green-300"
                            : incident.status.includes("Overdue")
                            ? "bg-red-100 text-red-800 border border-red-300"
                            : incident.status === "Action Required"
                            ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                            : "bg-purple-100 text-purple-800 border border-purple-300"
                        )}
                      >
                        {incident.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedIncident(null)}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedIncident(incident)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Case File
                          </Button>
                        </DialogTrigger>
                        {/* Keep your same dialog content here */}
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
