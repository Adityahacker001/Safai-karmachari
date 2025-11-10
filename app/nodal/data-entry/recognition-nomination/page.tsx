'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import StatCard from '@/components/ui/stat-card';
import { Award, Send, User, Building, FileUp, Users, Trophy, Star, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function RecognitionNominationPage() {

    // Mock data
    const workers = [
        { id: "W-001", name: "Ram Singh" },
        { id: "W-002", name: "Sita Devi" },
        { id: "W-003", name: "Amit Kumar" },
    ];

    const contractors = [
        { id: "C-123", name: "ABC Sanitation" },
        { id: "C-124", name: "City Maintenance" },
        { id: "C-125", name: "Rail Clean Services" },
    ];

    const awards = [
        { id: "A-01", name: "Safai Mitra of the Month" },
        { id: "A-02", name: "Safety Champion Award" },
        { id: "A-03", name: "Outstanding Service Recognition" },
        { id: "A-04", name: "Best Performing Contractor" },
    ];

  // Mock data for statistics
  const nominationStats = {
    totalWorkers: workers.length,
    totalContractors: contractors.length,
    totalAwards: awards.length,
    thisMonth: 8
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Nominate for Recognition
        </h2>
        <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">
          Submit a nomination for an outstanding worker or contractor.
        </p>
      </div>

      {/* Summary Cards - Using StatCard Component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <StatCard
          title="Total Workers"
          value={nominationStats.totalWorkers}
          subtitle="Eligible for nomination"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Total Contractors"
          value={nominationStats.totalContractors}
          subtitle="Active contractors"
          icon={Building}
          color="green"
        />
        <StatCard
          title="Award Categories"
          value={nominationStats.totalAwards}
          subtitle="Available awards"
          icon={Trophy}
          color="amber"
        />
        <StatCard
          title="This Month"
          value={nominationStats.thisMonth}
          subtitle="Nominations submitted"
          icon={Star}
          color="purple"
        />
      </div>

      <Card className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl">
        <CardHeader className={cn(contractorTheme.card.header)}>
          <CardTitle className={cn(contractorTheme.card.title, "flex items-center space-x-4")}>
            <Award className="h-9 w-9" />
            <span>Nomination Form</span>
          </CardTitle>
          <CardDescription className={cn(contractorTheme.card.description)}>Fill in the details below to submit a nomination.</CardDescription>
        </CardHeader>
        <CardContent className={cn(contractorTheme.card.content)}>
          <Tabs defaultValue="worker" className="w-full">
            <TabsList className={cn(contractorTheme.tabs.list)}>
              <TabsTrigger value="worker" className={cn(contractorTheme.tabs.trigger, "data-[state=active]:text-blue-700")}>
                <User className="h-5 w-5 mr-2"/>Nominate Worker
              </TabsTrigger>
              <TabsTrigger value="contractor" className={cn(contractorTheme.tabs.trigger, "data-[state=active]:text-purple-700")}>
                <Building className="h-5 w-5 mr-2"/>Nominate Contractor
              </TabsTrigger>
            </TabsList>
            <TabsContent value="worker" className="pt-8">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="worker-select" className={cn(contractorTheme.form.label)}>Select Worker</Label>
                  <Select required>
                    <SelectTrigger id="worker-select" className={cn(contractorTheme.form.select)}><SelectValue placeholder="Choose a worker " /></SelectTrigger>
                    <SelectContent>
                      {workers.map(w => <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="contractor" className="pt-8">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contractor-select" className={cn(contractorTheme.form.label)}>Select Contractor</Label>
                  <Select required>
                    <SelectTrigger id="contractor-select" className={cn(contractorTheme.form.select)}><SelectValue placeholder="Choose a contractor..." /></SelectTrigger>
                    <SelectContent>
                      {contractors.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-8 pt-8 mt-8 border-t border-gray-200">
            <div>
              <Label htmlFor="award-select" className={cn(contractorTheme.form.label)}>Award Category</Label>
              <Select required>
                <SelectTrigger id="award-select" className={cn(contractorTheme.form.select)}><SelectValue placeholder="Select an award..." /></SelectTrigger>
                <SelectContent>
                  {awards.map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="justification" className={cn(contractorTheme.form.label)}>Nomination Justification</Label>
              <Textarea id="justification" placeholder="Provide a detailed reason for this nomination, including specific examples of excellence..." rows={5} className={cn(contractorTheme.form.input)} />
            </div>
            <div>
                <Label htmlFor="documents" className={cn(contractorTheme.form.label, "flex items-center")}>
                  <FileUp className="h-4 w-4 mr-2"/>Supporting Documents (Optional)
                </Label>
                <Input id="documents" type="file" className={cn(contractorTheme.form.input, "pt-2")}/>
                <p className="text-xs text-gray-500 mt-2">Upload any relevant files, photos, or letters of commendation.</p>
            </div>
          </div>

          <div className="flex justify-end pt-10 mt-10 border-t border-gray-200">
            <Button className={cn(contractorTheme.button.primary, "text-base py-3 px-6")}>
                <Send className="h-5 w-5 mr-2" />
                Submit Nomination
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}