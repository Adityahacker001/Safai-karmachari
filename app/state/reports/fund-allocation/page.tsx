'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CircleDollarSign, Wallet, TrendingUp, Send } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function FundAllocationReportPage() {
    // Mock data for the state budget and allocations
    const budget = {
        total: 4520, // in Lakhs (45.2 Cr)
        disbursed: 3710,
        remaining: 810,
        utilization: Math.round((3710/4520)*100),
    };
    
    const allocations = [
        { id: "ALLOC-001", date: "2025-08-20", district: "South 24 Parganas", category: "Emergency Mechanization", amount: "₹50 Lakhs", notes: "Memo #WB-FIN-2025-101" },
        { id: "ALLOC-002", date: "2025-08-15", district: "Kolkata", category: "Welfare Scheme Top-up", amount: "₹1.2 Cr", notes: "Memo #WB-FIN-2025-098" },
        { id: "ALLOC-003", date: "2025-08-01", district: "Jalpaiguri", category: "Training Programs Grant", amount: "₹15 Lakhs", notes: "Memo #WB-FIN-2025-095" },
        { id: "ALLOC-004", date: "2025-07-28", district: "Howrah", category: "Mechanization Equipment", amount: "₹40 Lakhs", notes: "Memo #WB-FIN-2025-092" },
    ];
    
    const allocationByDistrict = {
        labels: ["Kolkata", "Howrah", "South 24 Parganas", "Jalpaiguri"],
        data: [120, 40, 50, 15] // in Lakhs
    };

  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8", contractorTheme.page.gradientBackground)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h2 className="text-3xl font-bold text-slate-800">Fund Allocation Report</h2>
            <p className="text-slate-600 mt-1">Analyze the disbursement and utilization of the state budget across districts.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button className={cn(contractorTheme.button.secondary)}><Download className="h-4 w-4 mr-2" />Export Financials</Button>
        </div>
      </div>

      {/* State Budget KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2 flex flex-row items-center justify-between bg-transparent">
            <CardTitle className="text-sm font-medium">Total State Budget</CardTitle>
            <CircleDollarSign className="h-5 w-5 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{budget.total / 100} Cr</div>
            <p className="text-xs text-blue-100">Fiscal Year 2025</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2 flex flex-row items-center justify-between bg-transparent">
            <CardTitle className="text-sm font-medium">Total Disbursed</CardTitle>
            <Send className="h-5 w-5 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{budget.disbursed / 100} Cr</div>
            <p className="text-xs text-purple-100">{budget.utilization}% Utilized</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-400 to-pink-500 text-white shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2 flex flex-row items-center justify-between bg-transparent">
            <CardTitle className="text-sm font-medium">Remaining Funds</CardTitle>
            <Wallet className="h-5 w-5 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{budget.remaining / 100} Cr</div>
            <p className="text-xs text-orange-100">Available to Allocate</p>
          </CardContent>
        </Card>
      </div>

      <Card className={cn(contractorTheme.table.container)}>
        <CardHeader className={cn(contractorTheme.table.header)}>
            <CardTitle className={cn(contractorTheme.table.headerTitle)}>State Allocation Roster</CardTitle>
            <CardDescription className={cn(contractorTheme.table.headerDescription)}>
                A complete, auditable log of all fund allocations made from the state level.
            </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Justification / Memo No.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.date}</TableCell>
                  <TableCell className="font-medium">{t.district}</TableCell>
                  <TableCell>{t.category}</TableCell>
                  <TableCell className="font-semibold">{t.amount}</TableCell>
                  <TableCell className="text-sm text-gray-600">{t.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}