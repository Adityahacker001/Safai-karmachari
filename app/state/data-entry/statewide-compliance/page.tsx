'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, BarChart3, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function StateComplianceFormPage() {
    // Mock auto-aggregated data for the state of West Bengal
    const aggregatedStateData = {
        totalIncidents: 142,
        avgComplianceScore: "89%",
        avgResolutionTime: "28 Hours",
        topPerformingDistrict: "Kolkata (94%)",
        worstPerformingDistrict: "South 24 Parganas (78%)",
        totalFatalitiesYTD: 1,
    };

  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8", contractorTheme.page.gradientBackground)}>
      <div>
        <h2 className="text-3xl font-bold text-slate-800">State-Wide Compliance Form</h2>
        <p className="text-slate-600 mt-1">Compile and submit the official state-level performance report to the NCSK.</p>
      </div>

      <Card className={cn(contractorTheme.card.container)}>
        <CardHeader className={cn(contractorTheme.card.header)}>
          <CardTitle className={cn(contractorTheme.card.title, "flex items-center space-x-2")}> 
            <FileText className="h-5 w-5" />
            <span>Official Report for West Bengal (July 2025)</span>
          </CardTitle>
          <CardDescription className={cn(contractorTheme.card.description)}>
            The system has automatically aggregated data from all district reports. Please review and add your commentary before submission.
          </CardDescription>
        </CardHeader>
        <CardContent className={cn(contractorTheme.card.content, "space-y-8")}> 
            {/* Section 1: Auto-Aggregated State-Wide Summary */}
            <div className={cn(contractorTheme.card.section)}>
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="h-5 w-5 text-gray-600"/>
                <h3 className="text-lg font-semibold text-blue-600">Auto-Aggregated State Summary</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                 <div className="p-4 bg-white/80 rounded-2xl border">
                    <Label className="text-xs text-gray-500">Total Incidents (Month)</Label>
                    <p className="text-2xl font-bold text-slate-800">{aggregatedStateData.totalIncidents}</p>
                 </div>
                 <div className="p-4 bg-white/80 rounded-2xl border">
                    <Label className="text-xs text-gray-500">Avg. Compliance Score</Label>
                    <p className="text-2xl font-bold text-slate-800">{aggregatedStateData.avgComplianceScore}</p>
                 </div>
                 <div className="p-4 bg-white/80 rounded-2xl border">
                    <Label className="text-xs text-gray-500">Fatalities (YTD)</Label>
                    <p className="text-2xl font-bold text-red-600">{aggregatedStateData.totalFatalitiesYTD}</p>
                 </div>
                 <div className="p-4 bg-white/80 rounded-2xl border col-span-2 md:col-span-1">
                    <Label className="text-xs text-green-600">Top Performing District</Label>
                    <p className="text-lg font-semibold text-slate-800">{aggregatedStateData.topPerformingDistrict}</p>
                 </div>
                 <div className="p-4 bg-white/80 rounded-2xl border col-span-2">
                    <Label className="text-xs text-red-600">District Requiring Attention</Label>
                    <p className="text-lg font-semibold text-slate-800">{aggregatedStateData.worstPerformingDistrict}</p>
                 </div>
              </div>
            </div>

            {/* Section 2: State Administrator's Commentary */}
            <div className={cn(contractorTheme.card.section)}>
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-5 w-5 text-gray-100"/>
                <h3 className="text-lg font-semibold text-white">State Administrator's Commentary</h3>
              </div>
              <div className="space-y-4">
                <div>
                    <Label htmlFor="summary" className={cn(contractorTheme.form.label)}>Executive Summary for West Bengal</Label>
                    <Textarea id="summary" placeholder="Provide a brief overview of the state's performance, challenges, and successes for the month..." rows={4} className={cn(contractorTheme.form.textarea)} />
                </div>
                <div>
                    <Label htmlFor="actions" className={cn(contractorTheme.form.label)}>Actions Taken & Policy Recommendations</Label>
                    <Textarea id="actions" placeholder="Detail any state-level interventions, new policies, or recommendations for the NCSK..." rows={4} className={cn(contractorTheme.form.textarea)} />
                </div>
              </div>
            </div>

            {/* Submission Actions */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <Button className={cn(contractorTheme.button.secondary)}>Save as Draft</Button>
              <Button className={cn(contractorTheme.button.primary, "flex items-center")}> 
                <Upload className="h-4 w-4 mr-2" />
                Submit to National Dashboard (NCSK)
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}