"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Award, CheckCircle, XCircle, Send, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function RecognitionReportPage() {

    // Mock data for the nomination history
    const nominations = [
      { id: 'NOM-001', nominee: "Abishek Das", category: "Best Safai Karmachari", nominator: "B. Adhikari (Central Zone A)", submitted: "2025-08-20", status: "Approved" },
      { id: 'NOM-002', nominee: "North Zone B Team", category: "Best ULB/Zone", nominator: "S. Devi (North Zone B)", submitted: "2025-08-18", status: "Approved" },
      { id: 'NOM-003', nominee: "Priya Sharma", category: "Safety Champion", nominator: "P. Sharma (Central Zone B)", submitted: "2025-08-28", status: "Pending Review" },
      { id: 'NOM-004', nominee: "Citizen Reporter #C-4567", category: "Civic Engagement Award", nominator: "A. Singh (North Zone A)", submitted: "2025-08-25", status: "Pending Review" },
      { id: 'NOM-005', nominee: "Rail Clean Services", category: "Best Contractor", nominator: "B. Adhikari (Central Zone A)", submitted: "2025-07-15", status: "Rejected" },
    ];

    const getBadgeClass = (status: string) => {
        switch (status) {
            case "Approved":
                return "bg-green-100 text-green-800 border-green-200";
            case "Pending Review":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Rejected":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-slate-100 text-slate-800 border-slate-200";
        }
    };

  return (
    <div className={cn("space-y-8", contractorTheme.page.gradientBackground, "p-6 md:p-8")}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h2 className="text-3xl font-bold text-slate-800">Recognition System Report</h2>
            <p className="text-slate-600 mt-1">Analyze nomination trends and review the history of awards in your district.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button className={cn(contractorTheme.button.secondary, "text-sm")}><Download className="h-4 w-4 mr-2" />Export Summary</Button>
        </div>
      </div>

      {/* Recognition KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className={cn(contractorTheme.kpiCard.base, contractorTheme.kpiCard.workers)}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium text-blue-100">Total Nominations</CardTitle><Send className="h-5 w-5 text-blue-200" /></CardHeader>
          <CardContent><div className="text-3xl font-bold">{nominations.length}</div><p className="text-xs text-blue-200">This quarter</p></CardContent>
        </Card>
         <Card className={cn(contractorTheme.kpiCard.base, contractorTheme.kpiCard.grievances)}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium text-orange-100">Pending Review</CardTitle><Clock className="h-5 w-5 text-orange-200" /></CardHeader>
          <CardContent><div className="text-3xl font-bold">{nominations.filter(n => n.status === 'Pending Review').length}</div><p className="text-xs text-orange-200">Awaiting your approval</p></CardContent>
        </Card>
        <Card className={cn(contractorTheme.kpiCard.base, contractorTheme.kpiCard.attendance)}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium text-green-100">Awards Approved</CardTitle><CheckCircle className="h-5 w-5 text-green-200" /></CardHeader>
          <CardContent><div className="text-3xl font-bold">{nominations.filter(n => n.status === 'Approved').length}</div><p className="text-xs text-green-200">This quarter</p></CardContent>
        </Card>
        <Card className={cn(contractorTheme.kpiCard.base, "bg-gradient-to-br from-slate-500 to-slate-700")}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium text-slate-100">Nominations Rejected</CardTitle><XCircle className="h-5 w-5 text-slate-200" /></CardHeader>
          <CardContent><div className="text-3xl font-bold">{nominations.filter(n => n.status === 'Rejected').length}</div><p className="text-xs text-slate-200">This quarter</p></CardContent>
        </Card>
      </div>

      {/* <Card className={cn(contractorTheme.card.container)}>
        <CardHeader>
            <CardTitle className="text-slate-800">Nominations by Category</CardTitle>
            <CardDescription className="text-slate-600">
                Breakdown of all nominations submitted within the district.
            </CardDescription>
        </CardHeader>
        <CardContent className="h-72">
           <Bar
              data={{
                labels: ["Best SK", "Best Contractor", "Best ULB/Zone", "Safety Champion", "Civic Award"],
                datasets: [{ 
                    label: 'Number of Nominations', 
                    data: [1, 1, 1, 1, 1], // Simplified counts from mock data
                    backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f97316', '#ef4444'] 
                }],
              }}
              options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }}
            />
        </CardContent>
      </Card>
       */}
      <Card className={cn(contractorTheme.table.container)}>
        <CardHeader className={cn(contractorTheme.table.header)}>
            <CardTitle className={cn(contractorTheme.table.headerTitle, "text-2xl")}>Recognition History Log</CardTitle>
            <CardDescription className={cn(contractorTheme.table.headerDescription, "text-base")}>
                Complete record of all nominations and their final status.
            </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="text-slate-600 font-bold">Nominee</TableHead>
                <TableHead className="text-slate-600 font-bold">Category</TableHead>
                <TableHead className="text-slate-600 font-bold">Nominated By</TableHead>
                <TableHead className="text-slate-600 font-bold">Submitted On</TableHead>
                <TableHead className="text-slate-600 font-bold">Final Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nominations.map((nom) => (
                <TableRow key={nom.id} className="border-slate-100">
                  <TableCell className="font-medium text-slate-800">{nom.nominee}</TableCell>
                  <TableCell className="text-slate-700">{nom.category}</TableCell>
                  <TableCell className="text-slate-700">{nom.nominator}</TableCell>
                  <TableCell className="text-slate-700">{nom.submitted}</TableCell>
                  <TableCell>
                    <Badge className={cn("font-semibold", getBadgeClass(nom.status))}>{nom.status}</Badge>
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