'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function IncidentReportPage() {
  const [selectedIncident, setSelectedIncident] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Loader shows for 800ms
    return () => clearTimeout(timer);
  }, []);

  const incidents = [
    { 
      id: 'CASE-001', 
      type: 'Manual Scavenging', 
      contractor: 'ABC Sanitation', 
      reported: '2025-08-28', 
      status: 'Action Required',
      message: 'Reported manual scavenging activity at Railway Station Area. Workers were seen entering septic tank without proper safety equipment. Immediate action required to ensure worker safety and provide proper PPE.',
      location: 'Railway Station, Platform No. 2',
      reportedBy: 'Station Master - Rahul Kumar',
      priority: 'High'
    },
    { 
      id: 'CASE-002', 
      type: 'Unsafe Conditions', 
      contractor: 'City Maintenance', 
      reported: '2025-08-27', 
      status: 'Action Overdue',
      message: 'Unsafe working conditions observed at construction site. Workers not wearing helmets and safety harnesses while working at height. Multiple safety violations noted during inspection.',
      location: 'Main Road Construction Site',
      reportedBy: 'Safety Inspector - Priya Sharma',
      priority: 'Critical'
    },
    { 
      id: 'CASE-003', 
      type: 'PPE Violation', 
      contractor: 'Rail Clean Services', 
      reported: '2025-08-27', 
      status: 'Resolved',
      message: 'PPE violation reported during cleaning operations. Workers were not wearing proper gloves and masks while handling cleaning chemicals. Issue has been resolved after providing proper training.',
      location: 'Central Railway Cleaning Department',
      reportedBy: 'Supervisor - Amit Singh',
      priority: 'Medium'
    },
    { 
      id: 'CASE-004', 
      type: 'Manual Scavenging', 
      contractor: 'City Maintenance', 
      reported: '2025-08-26', 
      status: 'Resolved',
      message: 'Manual scavenging reported in residential area. Workers were manually cleaning sewerage without proper equipment. Resolved by providing mechanical cleaning equipment and proper training.',
      location: 'Residential Colony, Block A',
      reportedBy: 'Colony Secretary - Sunita Devi',
      priority: 'High'
    },
    { 
      id: 'CASE-005', 
      type: 'Worker Grievance', 
      contractor: 'ABC Sanitation', 
      reported: '2025-08-25', 
      status: 'Escalated',
      message: 'Worker grievance regarding delayed salary payments and lack of proper medical facilities. Workers demanding timely payment and medical insurance coverage. Case escalated to higher authorities.',
      location: 'ABC Sanitation Office',
      reportedBy: 'Worker Union Representative - Vikram Joshi',
      priority: 'Medium'
    },
  ];

  if (loading) {
    const IntegratedLoader = require("@/components/layout/IntegratedLoader").default;
    return <IntegratedLoader />;
  }

  return (
    <div className={cn("min-h-screen w-full p-0")}> 
      <div className="py-8 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 space-y-8 w-full">
        {/* ...existing code... */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 p-6 sm:p-8 mb-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Incident Management</h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">Analyze incident trends and review historical case data for your zone.</p>
          </div>
          <Button className="mt-4 sm:mt-0 bg-white text-blue-600 hover:bg-blue-50 font-semibold">
            <Download className="h-4 w-4 mr-2" />
            Export Report (CSV)
          </Button>
        </div>

        <Card className="border border-gray-300 rounded-lg shadow-sm">
          <CardHeader className="bg-gray-50 p-4 sm:p-6 rounded-t-lg">
            <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">Historical Incident Log</CardTitle>
            <CardDescription className="text-gray-600 text-sm sm:text-base">
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
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gray-800 flex items-center">
                              <Eye className="h-5 w-5 mr-2 text-blue-600" />
                              Incident Case Details - {selectedIncident?.id}
                            </DialogTitle>
                            <DialogDescription className="text-gray-600">
                              Complete case information and grievance details
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedIncident && (
                            <div className="space-y-6 py-4">
                              {/* Case Overview */}
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-800 mb-3">Case Overview</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Case ID</label>
                                    <p className="text-gray-800 font-semibold">{selectedIncident.id}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Type</label>
                                    <p className="text-gray-800">{selectedIncident.type}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Contractor</label>
                                    <p className="text-gray-800">{selectedIncident.contractor}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Reported Date</label>
                                    <p className="text-gray-800">{selectedIncident.reported}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Location</label>
                                    <p className="text-gray-800">{selectedIncident.location}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Reported By</label>
                                    <p className="text-gray-800">{selectedIncident.reportedBy}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Priority</label>
                                    <Badge className={cn(
                                      "font-semibold",
                                      selectedIncident.priority === 'Critical' ? "bg-red-100 text-red-800" :
                                      selectedIncident.priority === 'High' ? "bg-orange-100 text-orange-800" :
                                      "bg-blue-100 text-blue-800"
                                    )}>
                                      {selectedIncident.priority}
                                    </Badge>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Status</label>
                                    <Badge className={cn(
                                      "font-semibold",
                                      selectedIncident.status === "Resolved"
                                        ? "bg-green-100 text-green-800"
                                        : selectedIncident.status.includes("Overdue")
                                        ? "bg-red-100 text-red-800"
                                        : selectedIncident.status === "Action Required"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-purple-100 text-purple-800"
                                    )}>
                                      {selectedIncident.status}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              {/* Grievance Message */}
                              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <h3 className="font-semibold text-blue-800 mb-3">Grievance Details</h3>
                                <div className="bg-white p-4 rounded border border-blue-100">
                                  <label className="text-sm font-medium text-blue-700 block mb-2">Message Description</label>
                                  <p className="text-gray-800 leading-relaxed">{selectedIncident.message}</p>
                                </div>
                              </div>

                              {/* Action Required (if applicable) */}
                              {selectedIncident.status !== 'Resolved' && (
                                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                  <h3 className="font-semibold text-yellow-800 mb-2">Action Required</h3>
                                  <p className="text-yellow-700 text-sm">
                                    This case requires immediate attention. Please review the details and take appropriate action.
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          <DialogFooter className="flex justify-end space-x-2">
                            <DialogClose asChild>
                              <Button variant="outline">Close</Button>
                            </DialogClose>
                            {selectedIncident?.status !== 'Resolved' && (
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                Take Action
                              </Button>
                            )}
                          </DialogFooter>
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
    </div>
  );
}
