'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, CheckCircle, Eye, FileText, Send } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function NCSKAlertsPage() {
    // Mock data for incidents escalated to the national level
    const escalatedIncidents = [
        { 
            id: 'NAT-ESC-001', 
            incident: "Worker Fatality in West Bengal", 
            state: "West Bengal", 
            district: "South 24 Parganas", 
            escalated: "2h ago", 
            status: "Awaiting NCSK Review",
            trail: [
                { status: "Reported by Citizen", by: "Citizen #C-1234", time: "2 days ago" },
                { status: "Verified by Nodal Officer", by: "N.O. Das", time: "2 days ago" },
                { status: "Escalated by District", by: "District Admin, S24P", time: "1 day ago" },
                { status: "Escalated by State", by: "WB State Command", time: "2 hours ago" },
            ]
        },
        { 
            id: 'NAT-ESC-002', 
            incident: "Pattern of Contractor Negligence", 
            state: "Uttar Pradesh", 
            district: "Lucknow", 
            escalated: "1d ago", 
            status: "Directive Issued",
            trail: []
        },
    ];

  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8", contractorTheme.page.gradientBackground)}>
      <div>
        <h2 className="text-3xl font-bold text-slate-800">National Critical Incident Review</h2>
        <p className="text-slate-600 mt-1">Review the most severe incidents escalated from State Command Centres.</p>
      </div>

      {/* National Critical Incident KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <Card className="border-0 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 text-white shadow-xl ring-2 ring-pink-400">
          <CardHeader className="pb-2 flex flex-row items-center justify-between bg-transparent"><CardTitle className="text-sm font-medium">Pending NCSK Review</CardTitle><AlertTriangle className="h-5 w-5 text-white/80" /></CardHeader>
          <CardContent><div className="text-3xl font-bold">1</div><p className="text-xs text-red-100">Urgent national-level review</p></CardContent>
        </Card>
        <Card className="border-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between bg-transparent"><CardTitle className="text-sm font-medium">Directives Issued</CardTitle><Send className="h-5 w-5 text-white/80" /></CardHeader>
          <CardContent><div className="text-3xl font-bold">1</div><p className="text-xs text-blue-100">Actions taken by NCSK this month</p></CardContent>
        </Card>
        <Card className="border-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between bg-transparent"><CardTitle className="text-sm font-medium">Marked for Annual Report</CardTitle><FileText className="h-5 w-5 text-white/80" /></CardHeader>
          <CardContent><div className="text-3xl font-bold">2</div><p className="text-xs text-purple-100">Cases to be included in report</p></CardContent>
        </Card>
      </div>
      
  <Card className={cn(contractorTheme.table.container, "shadow-2xl bg-white/70 backdrop-blur-xl border-0")}> 
        <CardHeader className={cn(contractorTheme.table.header)}>
            <CardTitle className={cn(contractorTheme.table.headerTitle)}>National Escalation Log</CardTitle>
            <CardDescription className={cn(contractorTheme.table.headerDescription)}>Master log of all incidents escalated to the National Commission.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table className="rounded-2xl overflow-hidden"> 
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Incident</TableHead>
                <TableHead>State</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {escalatedIncidents.map((incident) => (
                <TableRow
                  key={incident.id}
                  className={
                    cn(
                      "transition-all duration-200 hover:bg-gradient-to-r hover:from-orange-100/60 hover:to-yellow-100/60 group",
                      incident.status.includes('Review') ? 'bg-orange-50/80' : 'bg-white/80'
                    )
                  }
                  style={{ boxShadow: incident.status.includes('Review') ? '0 4px 24px 0 rgba(255, 140, 0, 0.10)' : undefined }}
                >
                  <TableCell className="font-bold text-slate-700 group-hover:text-orange-700 transition-colors">{incident.id}</TableCell>
                  <TableCell className="font-semibold text-slate-800 group-hover:text-orange-800 transition-colors">{incident.incident}</TableCell>
                  <TableCell className="group-hover:text-orange-700 transition-colors">{incident.state}</TableCell>
                  <TableCell className="group-hover:text-orange-700 transition-colors">{incident.district}</TableCell>
                  <TableCell>
                    {incident.status.includes('Review') ? (
                      <span className="inline-block px-4 py-2 rounded-full text-white font-bold text-sm shadow bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 drop-shadow-md ring-2 ring-pink-300/60">
                        {incident.status}
                      </span>
                    ) : (
                      <Badge variant="secondary">{incident.status}</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className={cn(contractorTheme.button.secondary, "!px-4 !py-2 text-sm shadow-md group-hover:ring-2 group-hover:ring-orange-300") }><Eye className="h-4 w-4 mr-2"/>Review Case File</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl">Case File: {incident.id}</DialogTitle>
                                <DialogDescription>{incident.incident} in {incident.district}, {incident.state}</DialogDescription>
                            </DialogHeader>
                            <div className="py-4 space-y-4">
                                <div>
                                    <h4 className="font-semibold text-sm mb-2">Escalation Trail</h4>
                                    <div className="p-4 rounded-2xl shadow bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 border-0">
                                        <ul className="space-y-2">
                                            {incident.trail.map((t, idx) => (
                                                <li key={t.status} className="text-xs flex justify-between items-center">
                                                    <span className={
                                                      idx === 0 ? "font-bold text-red-600" :
                                                      idx === 1 ? "font-bold text-yellow-700" :
                                                      idx === 2 ? "font-bold text-orange-600" :
                                                      idx === 3 ? "font-bold text-pink-600" :
                                                      "font-semibold text-slate-700"
                                                    }>
                                                      <strong>{t.status}:</strong> by {t.by}
                                                    </span>
                                                    <span className="text-gray-500 font-medium">{t.time}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm mb-2">NCSK Action</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <Button size="sm" className={cn(contractorTheme.button.secondary, "hover:bg-orange-100 hover:text-orange-700")}>Issue National Directive</Button>
                                        <Button size="sm" className={cn(contractorTheme.button.secondary, "hover:bg-orange-100 hover:text-orange-700")}>Recommend Policy Change</Button>
                                        <Button size="sm" className={cn(contractorTheme.button.secondary, "hover:bg-orange-100 hover:text-orange-700")}>Include in Annual Report</Button>
                                        <Button size="sm" className={cn(contractorTheme.button.primary, "hover:bg-orange-600")}>Mark as Closed</Button>
                                    </div>
                                </div>
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