'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, Building2, Eye, MapPin, AlertTriangle, Shield, DollarSign, GraduationCap } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function OversightPage() {

    // State to manage which entity's dashboard is being viewed in a modal
    const [viewingState, setViewingState] = useState<any | null>(null);
    const [viewingDistrict, setViewingDistrict] = useState<any | null>(null);

    // Mock data for states
    const states = [
        { name: "Kerala", incidents: 5, fatalities: 0, nonCompliantChecklists: 120, openGrievances: 15, status: "High Performing" },
        { name: "Tamil Nadu", incidents: 12, fatalities: 0, nonCompliantChecklists: 250, openGrievances: 22, status: "High Performing" },
        { name: "West Bengal", incidents: 35, fatalities: 1, nonCompliantChecklists: 800, openGrievances: 45, status: "Good Standing" },
    ];

    // Mock data for districts within a selected state (e.g., West Bengal)
    const districts = [
        { name: "Kolkata", incidents: 8, complianceScore: 92, status: "Excellent", fatalities: 0, openGrievances: 5 },
        { name: "Jalpaiguri", incidents: 4, complianceScore: 89, status: "Good", fatalities: 0, openGrievances: 2 },
        { name: "South 24 Parganas", incidents: 15, complianceScore: 74, status: "Needs Improvement", fatalities: 1, openGrievances: 12 },
    ];

  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8", contractorTheme.page.gradientBackground)}>
      <div>
        <h2 className="text-3xl font-bold text-slate-800">State & District Oversight</h2>
        <p className="text-slate-600 mt-1">Monitor national performance and drill down into district-level data.</p>
      </div>

      <Tabs defaultValue="state-overview">
        <TabsList className={cn(contractorTheme.tabs.list)}>
          <TabsTrigger value="state-overview" className={cn(contractorTheme.tabs.trigger)}><MapPin className="h-4 w-4 mr-2"/>State Overview</TabsTrigger>
          <TabsTrigger value="district-drilldown" className={cn(contractorTheme.tabs.trigger)}><Building2 className="h-4 w-4 mr-2"/>District Overview</TabsTrigger>
        </TabsList>

        {/* Tab 1: State Overview */}
        <TabsContent value="state-overview">
          <Card className={cn(contractorTheme.table.container)}>
            <CardHeader className={cn(contractorTheme.table.header)}><CardTitle className={cn(contractorTheme.table.headerTitle)}>National Performance Table</CardTitle><CardDescription className={cn(contractorTheme.table.headerDescription)}>Master list of all states and UTs.</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>State / UT</TableHead><TableHead>Incidents (30d)</TableHead><TableHead>Fatalities (YTD)</TableHead><TableHead>Open Grievances</TableHead><TableHead>Compliance Checks Failed</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {states.map(s => (
                    <TableRow key={s.name}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell className={`font-semibold text-center ${s.incidents > 30 ? 'text-red-600' : ''}`}>{s.incidents}</TableCell>
                      <TableCell className={`font-bold text-center ${s.fatalities > 0 ? 'text-red-600' : 'text-green-600'}`}>{s.fatalities}</TableCell>
                      <TableCell className="text-center">{s.openGrievances}</TableCell>
                      <TableCell className="text-center">{s.nonCompliantChecklists}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={s.status === 'High Performing' ? 'default' : s.status.includes('Intervention') ? 'destructive' : 'secondary'}
                          className={s.status === 'High Performing' ? 'bg-green-500 text-white' : ''}
                        >
                          {s.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog onOpenChange={(isOpen) => !isOpen && setViewingState(null)}>
                            <DialogTrigger asChild><Button size="sm" className={cn(contractorTheme.button.secondary)} onClick={() => setViewingState(s)}><Eye className="h-4 w-4 mr-2"/>View State Dashboard</Button></DialogTrigger>
                            {viewingState && viewingState.name === s.name && (
                                <DialogContent className="max-w-3xl"><DialogHeader>
                                    <DialogTitle className="text-2xl">State Dashboard Summary: {viewingState.name}</DialogTitle>
                                    <DialogDescription>A read-only overview of the state's key performance indicators.</DialogDescription>
                                </DialogHeader>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                  <div className="p-4 rounded-xl shadow bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-100 text-center border-0">
                    <p className="text-xs font-semibold text-indigo-700 mb-1">Total Districts</p>
                    <p className="text-2xl font-extrabold text-indigo-900">23</p>
                  </div>
                  <div className="p-4 rounded-xl shadow bg-gradient-to-br from-blue-200 via-cyan-100 to-green-100 text-center border-0">
                    <p className="text-xs font-semibold text-blue-700 mb-1">Incidents (30d)</p>
                    <p className="text-2xl font-extrabold text-blue-900">{viewingState.incidents}</p>
                  </div>
                  <div className="p-4 rounded-xl shadow bg-gradient-to-br from-orange-200 via-yellow-100 to-pink-100 text-center border-0">
                    <p className="text-xs font-semibold text-orange-700 mb-1">Budget Utilized</p>
                    <p className="text-2xl font-extrabold text-orange-900">82%</p>
                  </div>
                  <div className="p-4 rounded-xl shadow bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 text-center border-0">
                    <p className="text-xs font-semibold text-purple-700 mb-1">Training Coverage</p>
                    <p className="text-2xl font-extrabold text-purple-900">89%</p>
                  </div>
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
        </TabsContent>

        {/* Tab 2: District Drill-Down */}
        <TabsContent value="district-drilldown">
           <Card className={cn(contractorTheme.table.container)}>
            <CardHeader className={cn(contractorTheme.table.header)}>
                <CardTitle className={cn(contractorTheme.table.headerTitle)}>District-Level Overview</CardTitle>
                <CardDescription className={cn(contractorTheme.table.headerDescription)}>Select a state to view the performance of its districts.</CardDescription>
                <div className="pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select State / UT</label>
                  <Select>
                    <SelectTrigger className={cn(contractorTheme.form.select, "w-[300px]") }>
                      <SelectValue placeholder={<span className="text-black">Select a state...</span>} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wb">West Bengal</SelectItem>
                      <SelectItem value="mh">Maharashtra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>District</TableHead><TableHead>Incidents (30d)</TableHead><TableHead>Fatalities (YTD)</TableHead><TableHead>Open Grievances</TableHead><TableHead>Compliance Score</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {districts.map(d => (
                    <TableRow key={d.name}>
                      <TableCell className="font-medium">{d.name}</TableCell>
                      <TableCell className="text-center">{d.incidents}</TableCell>
                      <TableCell className={`font-bold text-center ${d.fatalities > 0 ? 'text-red-600' : 'text-green-600'}`}>{d.fatalities}</TableCell>
                      <TableCell className="text-center">{d.openGrievances}</TableCell>
                      <TableCell className="font-semibold text-center">{d.complianceScore}%</TableCell>
                      <TableCell>
                        {d.status === 'Excellent' ? (
                          <span className="inline-block px-4 py-1 rounded-full font-semibold text-white text-sm shadow bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">
                            Excellent
                          </span>
                        ) : d.status === 'Needs Improvement' ? (
                          <span className="inline-block px-4 py-1 rounded-full font-semibold text-white text-sm shadow bg-gradient-to-r from-red-500 via-pink-500 to-orange-400">
                            Needs Improvement
                          </span>
                        ) : (
                          <span className="inline-block px-4 py-1 rounded-full font-semibold text-gray-800 bg-gray-100 text-sm shadow">
                            {d.status}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog onOpenChange={(isOpen) => !isOpen && setViewingDistrict(null)}>
                            <DialogTrigger asChild><Button size="sm" className={cn(contractorTheme.button.secondary)} onClick={() => setViewingDistrict(d)}><Eye className="h-4 w-4 mr-2"/>View District Dashboard</Button></DialogTrigger>
                            {viewingDistrict && viewingDistrict.name === d.name && (
                                <DialogContent className="max-w-3xl"><DialogHeader>
                                    <DialogTitle className="text-2xl">District Dashboard Summary: {viewingDistrict.name}</DialogTitle>
                                    <DialogDescription>A read-only overview of the district's key performance indicators.</DialogDescription>
                                </DialogHeader>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                  <div className="p-4 rounded-xl shadow bg-gradient-to-br from-blue-200 via-cyan-100 to-green-100 text-center border-0">
                    <p className="text-xs font-semibold text-blue-700 mb-1">Total Nodal Units</p>
                    <p className="text-2xl font-extrabold text-blue-900">12</p>
                  </div>
                  <div className="p-4 rounded-xl shadow bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-100 text-center border-0">
                    <p className="text-xs font-semibold text-indigo-700 mb-1">Incidents (30d)</p>
                    <p className="text-2xl font-extrabold text-indigo-900">{viewingDistrict.incidents}</p>
                  </div>
                  <div className="p-4 rounded-xl shadow bg-gradient-to-br from-orange-200 via-yellow-100 to-pink-100 text-center border-0">
                    <p className="text-xs font-semibold text-orange-700 mb-1">PPE Compliance</p>
                    <p className="text-2xl font-extrabold text-orange-900">{viewingDistrict.complianceScore}%</p>
                  </div>
                  <div className="p-4 rounded-xl shadow bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 text-center border-0">
                    <p className="text-xs font-semibold text-purple-700 mb-1">Open Grievances</p>
                    <p className="text-2xl font-extrabold text-purple-900">{viewingDistrict.openGrievances}</p>
                  </div>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}