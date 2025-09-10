'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Wallet, CircleDollarSign, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import DashboardCard from "@/components/dashboard/dashboard-card";

export default function FundAllocationPage() {

    // Mock data for the state budget and recent allocations
    const budget = {
        total: 4520, // in Lakhs (45.2 Cr)
        disbursed: 3710,
        remaining: 810,
    };

  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8", contractorTheme.page.gradientBackground)}>
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Fund Allocation Tracker</h2>
        <p className="text-slate-600 mt-1">Allocate and track the disbursement of state funds to districts.</p>
      </div>

      {/* State Budget KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <DashboardCard
            title="Total State Budget"
            value={`₹${budget.total / 100} Cr`}
            description="Fiscal Year 2025"
            icon={CircleDollarSign}
            color="blue"
        />
        <DashboardCard
            title="Total Disbursed"
            value={`₹${budget.disbursed / 100} Cr`}
            description="Allocated to Districts"
            icon={Send}
            color="purple"
        />
        <DashboardCard
            title="Remaining Funds"
            value={`₹${budget.remaining / 100} Cr`}
            description="Available to Allocate"
            icon={Wallet}
            color="orange"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Allocate New Funds Form */}
        <div className="lg:col-span-3">
          <Card className={cn(contractorTheme.card.container)}>
            <CardHeader className={cn(contractorTheme.card.header)}>
              <CardTitle className={cn(contractorTheme.card.title, "flex items-center space-x-2")}>
                <Plus className="h-5 w-5" />
                <span>Allocate New Funds</span>
              </CardTitle>
              <CardDescription className={cn(contractorTheme.card.description)}>
                Create a new, trackable fund allocation for a district.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="target-district" className={cn(contractorTheme.form.label)}>Target District</Label>
                <Select>
                  <SelectTrigger className={cn(contractorTheme.form.select)}><SelectValue placeholder="Select a district..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kolkata">Kolkata</SelectItem>
                    <SelectItem value="howrah">Howrah</SelectItem>
                    <SelectItem value="s24p">South 24 Parganas</SelectItem>
                    <SelectItem value="jalpaiguri">Jalpaiguri</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fund-category" className={cn(contractorTheme.form.label)}>Fund Category</Label>
                <Select>
                  <SelectTrigger className={cn(contractorTheme.form.select)}><SelectValue placeholder="Select category..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mechanization">Mechanization Equipment</SelectItem>
                    <SelectItem value="welfare">Emergency Welfare / Compensation</SelectItem>
                    <SelectItem value="training">Training Programs Grant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount" className={cn(contractorTheme.form.label)}>Amount (in ₹ Lakhs)</Label>
                <Input id="amount" type="number" placeholder="e.g., 50" className={cn(contractorTheme.form.input)} />
              </div>
              <div>
                <Label htmlFor="notes" className={cn(contractorTheme.form.label)}>Justification / Memo No.</Label>
                <Textarea id="notes" placeholder="Provide official reason and memo number..." className={cn(contractorTheme.form.textarea)} />
              </div>
              <Button className={cn(contractorTheme.button.primary, "w-full")}>
                <Plus className="h-4 w-4 mr-2" />
                Authorize & Log Allocation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}