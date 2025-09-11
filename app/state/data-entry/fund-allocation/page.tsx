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
    <div className={cn("min-h-screen space-y-8 p-6 md:p-10", contractorTheme.page.gradientBackground)}>
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">Fund Allocation Tracker</h1>
        <p className="text-gray-600 mt-2 text-xl">Allocate and track the disbursement of state funds to districts.</p>
      </div>

      {/* State Budget KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Allocate New Funds Form */}
      <div>
        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="p-6 md:p-8 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <CardTitle className="text-2xl font-bold flex items-center">
              <Plus className="h-6 w-6 mr-3" />
              <span>Allocate New Funds</span>
            </CardTitle>
            <CardDescription className="text-purple-100 mt-1">
              Create a new, trackable fund allocation for a district.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div>
              <Label htmlFor="target-district" className="text-gray-700 font-semibold mb-2 block">Target District</Label>
              <Select>
                <SelectTrigger className={cn(contractorTheme.form.select, "py-2.5 px-4 rounded-lg")}><SelectValue placeholder="Select a district..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="kolkata">Kolkata</SelectItem>
                  <SelectItem value="howrah">Howrah</SelectItem>
                  <SelectItem value="s24p">South 24 Parganas</SelectItem>
                  <SelectItem value="jalpaiguri">Jalpaiguri</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fund-category" className="text-gray-700 font-semibold mb-2 block">Fund Category</Label>
              <Select>
                <SelectTrigger className={cn(contractorTheme.form.select, "py-2.5 px-4 rounded-lg")}><SelectValue placeholder="Select category..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mechanization">Mechanization Equipment</SelectItem>
                  <SelectItem value="welfare">Emergency Welfare / Compensation</SelectItem>
                  <SelectItem value="training">Training Programs Grant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount" className="text-gray-700 font-semibold mb-2 block">Amount (in ₹ Lakhs)</Label>
              <Input id="amount" type="number" placeholder="e.g., 50" className={cn(contractorTheme.form.input, "py-2.5 px-4 rounded-lg")} />
            </div>
            <div>
              <Label htmlFor="notes" className="text-gray-700 font-semibold mb-2 block">Justification / Memo No.</Label>
              <Textarea id="notes" placeholder="Provide official reason and memo number for tracking..." className={cn(contractorTheme.form.textarea, "min-h-[100px] rounded-lg")} />
            </div>
            <Button className={cn(
                "w-full py-3.5 text-base font-bold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl",
                "bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg"
            )}>
              <Plus className="h-5 w-5 mr-2" />
              Authorize & Log Allocation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
