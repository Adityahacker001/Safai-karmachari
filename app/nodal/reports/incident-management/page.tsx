'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Clock, ThumbsUp, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { contractorTheme as theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


export default function IncidentReportPage() {

    // Mock data for the historical incident log
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
              <h2 className="text-3xl font-bold text-gray-800">Incident Management</h2>
              <p className="text-gray-600 mt-1">Analyze incident trends and review historical case data for your zone.</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Button className={theme.button.secondary}><Download className="h-4 w-4 mr-2" />Export Report (CSV)</Button>
          </div>
        </div>

        {/* <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
              <CardTitle>Incidents by Contractor</CardTitle>
              <CardDescription>
                  Number of verified incidents assigned to each contractor this month.
              </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
             <Bar
                data={{
                  labels: ["ABC Sanitation", "City Maintenance", "Rail Clean Services"],
                  datasets: [{ 
                      label: 'Incidents', 
                      data: [2, 2, 1], 
                      backgroundColor: ['#3b82f6', '#ef4444', '#8b5cf6'] 
                  }],
                }}
                options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }}
              />
          </CardContent>
        </Card> */}

        <Card className={theme.card.container}>
          <CardHeader className={theme.card.header}>
              <CardTitle className={theme.card.title}>Historical Incident Log</CardTitle>
              <CardDescription className={theme.card.description}>
                  Complete record of all verified incidents in your zone.
              </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Case ID</TableHead>
                  <TableHead className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Type</TableHead>
                  <TableHead className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Contractor</TableHead>
                  <TableHead className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Reported</TableHead>
                  <TableHead className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Status</TableHead>
                  <TableHead className="text-right px-6 py-4 text-sm font-semibold text-gray-500 uppercase">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidents.map((incident) => (
                  <TableRow key={incident.id} className="border-t border-gray-100">
                    <TableCell className="px-6 py-4 font-medium text-gray-800">{incident.id}</TableCell>
                    <TableCell className="px-6 py-4 text-gray-600">{incident.type}</TableCell>
                    <TableCell className="px-6 py-4 text-gray-600">{incident.contractor}</TableCell>
                    <TableCell className="px-6 py-4 text-gray-600">{incident.reported}</TableCell>
                    <TableCell className="px-6 py-4">
                    <Badge 
                        className={cn("font-semibold text-xs py-1 px-3 rounded-full",
                            incident.status === 'Resolved' ? "bg-green-100 text-green-800 border border-green-200" :
                            incident.status.includes('Overdue') ? "bg-red-100 text-red-800 border border-red-200" :
                            incident.status === 'Action Required' ? "bg-yellow-100 text-yellow-800 border border-yellow-200" :
                            "bg-purple-100 text-purple-800 border border-purple-200"
                        )}
                    >
                        {incident.status}
                    </Badge>
                    </TableCell>
                    <TableCell className="text-right px-6 py-4">
                       <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedIncident(null)}>
                          <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedIncident(incident)}><Eye className="h-4 w-4 mr-2"/>View Case File</Button>
                          </DialogTrigger>
                          {selectedIncident && selectedIncident.id === incident.id && (
                            <DialogContent className="max-w-lg rounded-2xl shadow-2xl p-0 overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
                              <div className="p-0">
                                <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                                  <DialogHeader className="p-0">
                                    <DialogTitle className="text-2xl font-bold text-white drop-shadow">Incident Case File: {selectedIncident.id}</DialogTitle>
                                    <DialogDescription className="text-indigo-100 pt-1">
                                      Full audit trail for this incident.
                                    </DialogDescription>
                                  </DialogHeader>
                                </div>
                                <div className="py-6 px-6 space-y-6 text-gray-700">
                                  <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-2">
                                    <div className="text-base font-semibold text-blue-700">Contractor:</div>
                                    <div className="text-lg font-bold text-blue-900">{selectedIncident.contractor}</div>
                                  </div>
                                  <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-2">
                                    <div className="text-base font-semibold text-purple-700">Status:</div>
                                    <Badge 
                                      className={cn("font-semibold text-xs py-1 px-3 rounded-full",
                                          selectedIncident.status === 'Resolved' ? "bg-green-200 text-green-900 border border-green-300" :
                                          selectedIncident.status.includes('Overdue') ? "bg-red-200 text-red-900 border border-red-300" :
                                          selectedIncident.status === 'Action Required' ? "bg-yellow-200 text-yellow-900 border border-yellow-300" :
                                          "bg-pink-200 text-pink-900 border border-pink-300"
                                      )}
                                    >
                                      {selectedIncident.status}
                                    </Badge>
                                  </div>
                                  <div className="space-y-2">
                                    <h4 className="font-semibold text-base text-purple-700 bg-purple-100 rounded px-3 py-1 inline-block">Nodal Officer's Verification Notes</h4>
                                    <p className="text-base p-4 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 rounded-xl border border-purple-200 shadow-sm">"Verified via photo evidence. Confirmed as a valid report of unsafe conditions."</p>
                                  </div>
                                  <div className="space-y-2">
                                    <h4 className="font-semibold text-base text-pink-700 bg-pink-100 rounded px-3 py-1 inline-block">Contractor's Resolution Notes</h4>
                                    <p className="text-base p-4 bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-xl border border-pink-200 shadow-sm">"Safety barricades have been deployed to the site as of 4:30 PM. Issue resolved."</p>
                                  </div>
                                </div>
                                <DialogFooter className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-b-2xl">
                                  <DialogClose asChild><Button className={theme.button.primary}>Close</Button></DialogClose>
                                </DialogFooter>
                              </div>
                            </DialogContent>
                          )}
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