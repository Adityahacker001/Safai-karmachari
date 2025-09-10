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
    <div className={cn("space-y-8", theme.page.gradientBackground)}>
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
                          <DialogContent className="max-w-lg bg-white rounded-2xl shadow-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold text-gray-800">Incident Case File: {selectedIncident.id}</DialogTitle>
                              <DialogDescription className="text-gray-500 pt-1">
                                Full audit trail for this incident.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4 space-y-4 text-gray-600">
                              <div className="text-sm space-y-1">
                                <p><strong>Contractor:</strong> {selectedIncident.contractor}</p>
                                <p><strong>Status:</strong> <Badge 
                                    className={cn("font-semibold text-xs py-1 px-3 rounded-full",
                                        selectedIncident.status === 'Resolved' ? "bg-green-100 text-green-800 border border-green-200" :
                                        selectedIncident.status.includes('Overdue') ? "bg-red-100 text-red-800 border border-red-200" :
                                        selectedIncident.status === 'Action Required' ? "bg-yellow-100 text-yellow-800 border border-yellow-200" :
                                        "bg-purple-100 text-purple-800 border border-purple-200"
                                    )}
                                >
                                    {selectedIncident.status}
                                </Badge></p>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-semibold text-sm text-gray-700">Nodal Officer's Verification Notes:</h4>
                                <p className="text-sm p-3 bg-slate-50 rounded-lg border">"Verified via photo evidence. Confirmed as a valid report of unsafe conditions."</p>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-semibold text-sm text-gray-700">Contractor's Resolution Notes:</h4>
                                <p className="text-sm p-3 bg-slate-50 rounded-lg border">"Safety barricades have been deployed to the site as of 4:30 PM. Issue resolved."</p>
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild><Button className={theme.button.primary}>Close</Button></DialogClose>
                            </DialogFooter>
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
  );
}