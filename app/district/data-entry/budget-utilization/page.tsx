'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Plus, Wallet, TrendingUp, CircleDollarSign } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { contractorTheme as theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function BudgetUtilizationPage() {

    // Mock data for the budget and recent transactions
    const budget = {
        total: 520, // in Lakhs
        spent: 385,
        remaining: 135,
    };
//sssss
    const recentTransactions = [
        { id: "TRN-001", date: "2025-08-15", category: "Mechanization Equipment", amount: "₹25 Lakhs", notes: "Purchase of 2 new jetting machines for North Zone A." },
        { id: "TRN-002", date: "2025-08-10", category: "Emergency Welfare", amount: "₹5 Lakhs", notes: "Compensation disbursed for case ESC-003." },
        { id: "TRN-003", date: "2025-08-01", category: "Training Programs", amount: "₹2.5 Lakhs", notes: "District-wide safety certification drive." },
    ];

  return (
    <div className={cn("space-y-8", theme.page.gradientBackground)}>
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Budget Utilization</h2>
        <p className="text-gray-600 mt-1">Log district-level expenditures and manage fund allocation.</p>
      </div>

      {/* District Budget KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className={cn(theme.kpiCard.base, theme.kpiCard.safety)}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium text-indigo-100">Total Annual Budget</CardTitle><CircleDollarSign className="h-5 w-5 text-white/80" /></CardHeader>
          <CardContent><div className="text-4xl font-bold">₹{budget.total.toFixed(1)} Lakhs</div><p className="text-xs text-indigo-100">Fiscal Year 2025</p></CardContent>
          <Wallet className={theme.kpiCard.icon} />
        </Card>
        <Card className={cn(theme.kpiCard.base, theme.kpiCard.attendance)}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium text-green-100">Total Spent</CardTitle><TrendingUp className="h-5 w-5 text-white/80" /></CardHeader>
          <CardContent><div className="text-4xl font-bold">₹{budget.spent.toFixed(1)} Lakhs</div><p className="text-xs text-green-100">Expenditure to date</p></CardContent>
          <TrendingUp className={theme.kpiCard.icon} />
        </Card>
        <Card className={cn(theme.kpiCard.base, theme.kpiCard.grievances)}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium text-orange-100">Remaining Funds</CardTitle><Wallet className="h-5 w-5 text-white/80" /></CardHeader>
          <CardContent><div className="text-4xl font-bold">₹{budget.remaining.toFixed(1)} Lakhs</div><p className="text-xs text-orange-100">Available to allocate</p></CardContent>
          <CircleDollarSign className={theme.kpiCard.icon} />
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Log New Transaction Form */}
        <div className="lg:col-span-3">
          <Card className={theme.card.container}>
            <CardHeader className={theme.card.header}>
              <CardTitle className={cn("flex items-center space-x-2", theme.card.title)}>
                <Plus className="h-8 w-8" />
                <span>Log New Entry</span>
              </CardTitle>
              <CardDescription className={theme.card.description}>
                Record a new expenditure or fund allocation.
              </CardDescription>
            </CardHeader>
            <CardContent className={cn("space-y-4", theme.card.content)}>
              <div>
                <Label htmlFor="transaction-date" className={theme.form.label}>Transaction Date</Label>
                <Input id="transaction-date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} className={theme.form.input} />
              </div>
              <div>
                <Label htmlFor="fund-category" className={theme.form.label}>Fund Category</Label>
                <Select>
                  <SelectTrigger className={theme.form.select}><SelectValue placeholder="Select category..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mechanization">Mechanization Equipment</SelectItem>
                    <SelectItem value="training">Training Programs</SelectItem>
                    <SelectItem value="welfare">Emergency Welfare / Compensation</SelectItem>
                    <SelectItem value="ppe">Bulk PPE Procurement</SelectItem>
                    <SelectItem value="admin">Administrative Costs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount" className={theme.form.label}>Amount (in ₹ Lakhs)</Label>
                <Input id="amount" type="number" placeholder="e.g., 25" className={theme.form.input} />
              </div>
              <div>
                <Label htmlFor="notes" className={theme.form.label}>Notes / Memo No.</Label>
                <Textarea id="notes" placeholder="Add justification, invoice, or memo number for auditing." className={theme.form.input} />
              </div>
              <Button className={cn("w-full", theme.button.primary)}>
                Log Transaction
              </Button>
            </CardContent>
          </Card>
        </div>

        
      </div>
    </div>
  );
}