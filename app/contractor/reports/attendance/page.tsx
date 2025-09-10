'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, CheckCircle, Loader, UserCheck, UserX, AlertTriangle, Users, Shield } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AttendanceReportPage() {

  // Mock data for the attendance report, mirroring Page 33 and adding more examples
  const attendanceLogs = [
      {
        workerName: "Amit Kumar",
        date: "2025-09-09",
        checkIn: "08:15",
        checkOut: "16:30",
        workType: "Sweeping",
        status: "Logged",
        flag: null,
      },
      {
        workerName: "Sunita Devi",
        date: "2025-09-09",
        checkIn: "08:20",
        checkOut: "16:10",
        workType: "Collection",
        status: "Active",
        flag: null,
      },
      {
        workerName: "Abishek Singh",
        date: "2025-09-09",
        checkIn: "08:05",
        checkOut: "",
        workType: "Sweeping",
        status: "Flagged",
        flag: "No check-out recorded",
      },
      {
        workerName: "Priya Sharma",
        date: "2025-09-09",
        checkIn: "08:10",
        checkOut: "16:00",
        workType: "Collection",
        status: "Logged",
        flag: null,
      },
      {
        workerName: "Vijay Patel",
        date: "2025-09-09",
        checkIn: "",
        checkOut: "",
        workType: "Sweeping",
        status: "Flagged",
        flag: "No check-in/out",
      },
      {
        workerName: "Meena Kumari",
        date: "2025-09-09",
        checkIn: "08:30",
        checkOut: "16:20",
        workType: "Collection",
        status: "Logged",
        flag: null,
      },
    ];

  return (
  <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-100 via-purple-100 via-pink-100 via-rose-100 to-yellow-100">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
              <h1 className="text-3xl font-bold text-slate-800">Attendance Reports</h1>
              <p className="mt-1 text-slate-500">Daily attendance logs automatically captured from the worker's app.</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Button variant="outline" className="bg-white"><Download className="h-4 w-4 mr-2" />Export Log (CSV)</Button>
          </div>
        </div>
        
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium text-white">Total Workers</CardTitle>
              <div className="p-2 bg-blue-500/30 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">1,247</div>
              <p className="text-sm text-blue-100 mt-1">+12 from last month</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-green-500 via-green-400 to-emerald-400 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium text-white">Active Today</CardTitle>
              <div className="p-2 bg-green-500/30 rounded-lg">
                  <UserCheck className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">1,156</div>
              <p className="text-sm text-green-100 mt-1">92.7% attendance</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium text-white">Grievances Pending</CardTitle>
              <div className="p-2 bg-orange-500/30 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">23</div>
              <p className="text-sm text-orange-100 mt-1">-5 from yesterday</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-purple-500 via-violet-500 to-fuchsia-500 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium text-white">Safety Compliance</CardTitle>
              <div className="p-2 bg-purple-500/30 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">94.2%</div>
              <p className="text-sm text-purple-100 mt-1">+2.1% this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Data Table and Filters */}
        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Daily Attendance Log</CardTitle>
                    <CardDescription>
                        Showing logs for the selected date and zone.
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="report-date" className="text-sm text-slate-600">Date</Label>
                        <Input id="report-date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} className="w-40 bg-white border-slate-300" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="report-zone" className="text-sm text-slate-600">Zone</Label>
                        <Select><SelectTrigger className="w-40 bg-white border-slate-300"><SelectValue placeholder="All Zones" /></SelectTrigger><SelectContent><SelectItem value="all">All Zones</SelectItem><SelectItem value="zone1">Zone 1</SelectItem><SelectItem value="zone2">Zone 2</SelectItem></SelectContent></Select>
                      </div>
                  </div>
              </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Worker Name</TableHead>
                  <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Date</TableHead>
                  <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Check-In</TableHead>
                  <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Check-Out</TableHead>
                  <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Work Type</TableHead>
                  <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceLogs.map((log) => (
                  <TableRow key={log.workerName} className={`border-slate-200 hover:bg-slate-50 ${log.flag? 'bg-amber-50' : ''}`}>
                    <TableCell className="font-medium text-slate-800">{log.workerName}</TableCell>
                    <TableCell className="text-slate-600">{log.date}</TableCell>
                    <TableCell className="text-slate-600">{log.checkIn}</TableCell>
                    <TableCell className="text-slate-600">{log.checkOut}</TableCell>
                    <TableCell className="text-slate-600">{log.workType}</TableCell>
                    <TableCell>
                      <div className="flex flex-col items-start">
                        <Badge variant="outline" className={
                            log.status === 'Logged'? 'bg-green-100 text-green-800 border-green-200' :
                            log.status === 'Active'? 'bg-sky-100 text-sky-800 border-sky-200' :
                            log.status === 'Flagged'? 'bg-amber-100 text-amber-800 border-amber-200' : ''
                        }>
                          {log.status === 'Logged' && <CheckCircle className="h-3 w-3 mr-1.5"/>}
                          {log.status === 'Active' && <Loader className="h-3 w-3 mr-1.5 animate-spin"/>}
                          {log.status === 'Flagged' && <AlertTriangle className="h-3 w-3 mr-1.5"/>}
                          {log.status}
                        </Badge>
                        {log.flag && <p className="text-xs text-red-600 mt-1.5">{log.flag}</p>}
                      </div>
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