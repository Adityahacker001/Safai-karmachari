'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, BarChart3, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function MonthlyComplianceSummaryPage() {

    // Mock auto-aggregated data for the district
    const aggregatedData = {
        totalIncidents: 38,
        avgComplianceScore: "87%",
        avgResolutionTime: "32 Hours",
        topPerformingUnit: "North Zone B (95%)",
        worstPerformingUnit: "North Zone A (78%)",
    };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Monthly Compliance Summary</h2>
        <p className="text-gray-600">Compile and submit the official monthly performance report for your district to the State Command Centre.</p>
      </div>

      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-orange-600" />
            <span>District Report for July 2025</span>
          </CardTitle>
          <CardDescription>
            The system has automatically aggregated data from all Nodal units. Please review the summary and add your official commentary before submission.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">

            {/* Section 1: Auto-Aggregated Performance Summary */}
            <div className="p-6 border rounded-lg bg-gray-50/50">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="h-5 w-5 text-gray-600"/>
                <h3 className="text-lg font-semibold text-gray-800">Auto-Aggregated Performance Summary</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                 <div className="p-4 bg-white rounded border">
                    <Label className="text-xs text-gray-500">Total Incidents (Month)</Label>
                    <p className="text-2xl font-bold">{aggregatedData.totalIncidents}</p>
                 </div>
                 <div className="p-4 bg-white rounded border">
                    <Label className="text-xs text-gray-500">Avg. Compliance Score</Label>
                    <p className="text-2xl font-bold">{aggregatedData.avgComplianceScore}</p>
                 </div>
                 <div className="p-4 bg-white rounded border">
                    <Label className="text-xs text-gray-500">Avg. Grievance Resolution</Label>
                    <p className="text-2xl font-bold">{aggregatedData.avgResolutionTime}</p>
                 </div>
                 <div className="p-4 bg-white rounded border col-span-2 md:col-span-1">
                    <Label className="text-xs text-green-600">Top Performing Unit</Label>
                    <p className="text-lg font-semibold">{aggregatedData.topPerformingUnit}</p>
                 </div>
                 <div className="p-4 bg-white rounded border col-span-2">
                    <Label className="text-xs text-red-600">Unit Requiring Attention</Label>
                    <p className="text-lg font-semibold">{aggregatedData.worstPerformingUnit}</p>
                 </div>
              </div>
            </div>

            {/* Section 2: District Administrator's Commentary */}
            <div className="p-6 border rounded-lg bg-gray-50/50">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-5 w-5 text-gray-600"/>
                <h3 className="text-lg font-semibold text-gray-800">District Administrator's Commentary</h3>
              </div>
              <div className="space-y-4">
                <div>
                    <Label htmlFor="summary">Executive Summary</Label>
                    <Textarea id="summary" placeholder="Provide a brief overview of the district's performance for the month..." rows={4} />
                </div>
                <div>
                    <Label htmlFor="actions">Actions Taken & Recommendations</Label>
                    <Textarea id="actions" placeholder="Detail any interventions, warnings issued, or recommendations for the State level..." rows={4} />
                </div>
              </div>
            </div>

            {/* Submission Actions */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Upload className="h-4 w-4 mr-2" />
                Submit to State Command Centre
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}