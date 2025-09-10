'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CircleDollarSign, Wallet, TrendingUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BudgetReportPage() {

    // Mock data for the budget and transactions
    const budget = {
        total: 520, // in Lakhs
        spent: 385,
        remaining: 135,
        utilization: Math.round((385/520)*100),
    };

    const transactions = [
        { id: "TRN-001", date: "2025-08-15", category: "Mechanization Equipment", amount: "₹25.0 Lakhs", notes: "Purchase of 2 new jetting machines for North Zone A." },
        { id: "TRN-002", date: "2025-08-10", category: "Emergency Welfare", amount: "₹5.0 Lakhs", notes: "Compensation disbursed for case ESC-003." },
        { id: "TRN-003", date: "2025-08-01", category: "Training Programs", amount: "₹2.5 Lakhs", notes: "District-wide safety certification drive." },
        { id: "TRN-004", date: "2025-07-25", category: "Bulk PPE Procurement", amount: "₹12.0 Lakhs", notes: "Quarterly stock replenishment." },
    ];
    
    const expenditureByCategory = {
        labels: ["Mechanization", "Welfare", "Training", "PPE"],
        data: [180, 75, 45, 85] // in Lakhs
    };
    
    const chartColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f97316']; // blue, purple, green, orange

  return (
    <div className={cn("space-y-8", contractorTheme.page.gradientBackground, "p-6 md:p-8")}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="text-white">
            <h2 className="text-3xl font-bold text-slate-800">Budget & Expenditure Report</h2>
            <p className="text-slate-600 mt-1">Analyze district-wide financial data and transaction history.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button className={cn(contractorTheme.button.secondary, "text-sm")}><Download className="h-4 w-4 mr-2" />Export Expenditure Report</Button>
        </div>
      </div>

      {/* District Budget KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className={cn(contractorTheme.kpiCard.base, contractorTheme.kpiCard.workers)}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium text-blue-100">Total Annual Budget</CardTitle><CircleDollarSign className="h-5 w-5 text-blue-200" /></CardHeader>
          <CardContent><div className="text-3xl font-bold">₹{budget.total.toFixed(1)} Lakhs</div><p className="text-xs text-blue-200">Fiscal Year 2025</p></CardContent>
        </Card>
        <Card className={cn(contractorTheme.kpiCard.base, contractorTheme.kpiCard.attendance)}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium text-green-100">Total Spent</CardTitle><TrendingUp className="h-5 w-5 text-green-200" /></CardHeader>
          <CardContent><div className="text-3xl font-bold">₹{budget.spent.toFixed(1)} Lakhs</div><p className="text-xs text-green-200">{budget.utilization}% Utilized</p></CardContent>
        </Card>
        <Card className={cn(contractorTheme.kpiCard.base, contractorTheme.kpiCard.grievances)}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium text-orange-100">Remaining Funds</CardTitle><Wallet className="h-5 w-5 text-orange-200" /></CardHeader>
          <CardContent><div className="text-3xl font-bold">₹{budget.remaining.toFixed(1)} Lakhs</div><p className="text-xs text-orange-200">Available to allocate</p></CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Expenditure Chart */}
        <div className="lg:col-span-1">
            <Card className={cn(contractorTheme.card.container, "h-full")}>
                <CardHeader>
                    <CardTitle className="text-slate-800">Expenditure by Category</CardTitle>
                    <CardDescription className="text-slate-600">Visual breakdown of all spending.</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                   <Pie
                      data={{
                        labels: expenditureByCategory.labels,
                        datasets: [{
                            label: 'Amount (in ₹ Lakhs)',
                            data: expenditureByCategory.data,
                            backgroundColor: chartColors,
                          }],
                      }}
                      options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
                    />
                </CardContent>
            </Card>
        </div>

        {/* Right Column: Transaction Log */}
        <div className="lg:col-span-2">
            <Card className={cn(contractorTheme.table.container)}>
            <CardHeader className={cn(contractorTheme.table.header)}>
              <CardTitle className={cn(contractorTheme.table.headerTitle, "text-2xl")}>District Expenditure Log</CardTitle>
              <CardDescription className={cn(contractorTheme.table.headerDescription, "text-base")}>
                A complete history of all financial transactions logged for the district.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="text-slate-600 font-bold">Date</TableHead>
                    <TableHead className="text-slate-600 font-bold">Category</TableHead>
                    <TableHead className="text-slate-600 font-bold">Amount</TableHead>
                    <TableHead className="text-slate-600 font-bold">Notes / Memo No.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((t) => (
                    <TableRow key={t.id} className="border-slate-100">
                      <TableCell className="text-slate-700">{t.date}</TableCell>
                      <TableCell className="font-medium text-slate-800">{t.category}</TableCell>
                      <TableCell className="font-semibold text-slate-900">{t.amount}</TableCell>
                      <TableCell className="text-sm text-slate-600">{t.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}