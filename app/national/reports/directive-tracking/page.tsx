'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, Send, Clock, CheckCircle, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function DirectiveTrackingReportPage() {

    // Mock data for the directive tracking log
    const directives = [
      { id: 'DIR-001', title: "Mandate for Quarterly Safety Audits", sentTo: "All States", issued: "2025-07-01", deadline: "2025-09-30", responded: 25, total: 28, status: "In Progress" },
      { id: 'DIR-002', title: "Submission of Mechanization Progress Report", sentTo: "All States", issued: "2025-08-15", deadline: "2025-08-31", responded: 12, total: 28, status: "Overdue" },
      { id: 'DIR-003', title: "Implementation of New Compensation Guidelines", sentTo: "Lagging States (12)", issued: "2025-08-20", deadline: "2025-10-31", responded: 2, total: 12, status: "New" },
      { id: 'DIR-004', title: "MS Act 2013 - Section 14 Compliance", sentTo: "All States", issued: "2025-06-01", deadline: "2025-06-30", responded: 28, total: 28, status: "Completed" },
    ];
    
    // Mock data for the drill-down view
    const stateResponses = [
        { state: "Kerala", status: "Action Logged", date: "2025-07-15" },
        { state: "Tamil Nadu", status: "Action Logged", date: "2025-07-18" },
        { state: "West Bengal", status: "Acknowledged", date: "2025-07-20" },
        { state: "Bihar", status: "Pending", date: "---" },
    ];

  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8", contractorTheme.page.gradientBackground)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h2 className="text-3xl font-bold text-slate-800">Directive Tracking Report</h2>
            <p className="text-slate-600 mt-1">Monitor the acknowledgment and response status of all national directives.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button className={cn(contractorTheme.button.secondary)}><Download className="h-4 w-4 mr-2" />Export Log</Button>
        </div>
      </div>

      <Card className={cn(contractorTheme.card.container, "shadow-2xl border border-blue-200 bg-gradient-to-br from-white via-blue-50 to-emerald-50 rounded-2xl") }>
        <CardHeader className={cn(contractorTheme.card.header)}>
            <CardTitle className={cn(contractorTheme.card.title)}>Master Directive Log</CardTitle>
            <CardDescription className={cn(contractorTheme.card.description)}>
                Historical record of all directives issued by the National Commission.
            </CardDescription>
        </CardHeader>
        <CardContent className={cn(contractorTheme.card.content, "p-0") }>
          <div className="rounded-b-2xl overflow-hidden bg-gradient-to-br from-white via-blue-50 to-emerald-50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Directive Title</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>States Responded</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {directives.map((d) => (
                  <TableRow key={d.id} className="hover:scale-[1.01] hover:shadow-lg hover:z-10 hover:bg-gradient-to-r hover:from-blue-100 hover:via-cyan-100 hover:to-emerald-100 even:bg-gradient-to-r even:from-blue-50 even:via-blue-100 even:to-emerald-50 transition-all duration-200">
                    <TableCell className="font-medium">{d.title}</TableCell>
                    <TableCell>{d.issued}</TableCell>
                    <TableCell>{d.deadline}</TableCell>
                    <TableCell className="font-semibold">{d.responded} / {d.total}</TableCell>
                    <TableCell>
                      {d.status === 'Overdue' ? (
                        <span className="inline-block px-4 py-1 rounded-full font-semibold text-white text-sm shadow bg-gradient-to-r from-red-500 via-pink-500 to-orange-400">Overdue</span>
                      ) : d.status === 'Completed' ? (
                        <span className="inline-block px-4 py-1 rounded-full font-semibold text-white text-sm shadow bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">Completed</span>
                      ) : d.status === 'In Progress' ? (
                        <span className="inline-block px-4 py-1 rounded-full font-semibold text-white text-sm shadow bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400">In Progress</span>
                      ) : d.status === 'New' ? (
                        <span className="inline-block px-4 py-1 rounded-full font-semibold text-gray-800 text-sm shadow bg-gradient-to-r from-blue-100 via-blue-200 to-cyan-100">New</span>
                      ) : (
                        <Badge>{d.status}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                          <DialogTrigger asChild>
                              <Button className={cn(contractorTheme.button.secondary, "!px-4 !py-2 text-sm") }><Eye className="h-4 w-4 mr-2"/>View Responses</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                  <DialogTitle>Response Status: {d.title}</DialogTitle>
                                  <DialogDescription>State-by-state breakdown of responses.</DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <div className="rounded-2xl shadow-lg bg-gradient-to-br from-white via-blue-50 to-emerald-50 p-2">
                                  <Table>
                                    <TableHeader><TableRow><TableHead>State/UT</TableHead><TableHead>Response Status</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                      {stateResponses.map(r => (
                                        <TableRow key={r.state} className="even:bg-gradient-to-r even:from-blue-50 even:via-blue-100 even:to-emerald-50">
                                          <TableCell className="font-medium">{r.state}</TableCell>
                                          <TableCell>
                                            {r.status === 'Action Logged' ? (
                                              <span className="inline-block px-3 py-1 rounded-full font-semibold text-white text-xs shadow bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-400">Action Logged</span>
                                            ) : r.status === 'Acknowledged' ? (
                                              <span className="inline-block px-3 py-1 rounded-full font-semibold text-white text-xs shadow bg-gradient-to-r from-purple-500 via-pink-400 to-fuchsia-400">Acknowledged</span>
                                            ) : r.status === 'Pending' ? (
                                              <span className="inline-block px-3 py-1 rounded-full font-semibold text-white text-xs shadow bg-gradient-to-r from-red-500 via-pink-500 to-orange-400">Pending</span>
                                            ) : (
                                              <Badge>{r.status}</Badge>
                                            )}
                                          </TableCell>
                                          <TableCell>{r.date}</TableCell>
                                        </TableRow>
                                      ))}
                                      <TableRow><TableCell colSpan={3} className="text-center text-sm text-gray-500">... and 24 other states.</TableCell></TableRow>
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                              <DialogFooter><Button className={cn(contractorTheme.button.secondary)}>Close</Button></DialogFooter>
                          </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}