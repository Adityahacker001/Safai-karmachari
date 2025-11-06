'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, BarChart3, FileText, AlertTriangle, Clock, TrendingUp, Award, AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import StatCard from "@/components/ui/stat-card";

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
    <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-4 sm:space-y-6 min-h-screen">
      {/* Enhanced Header */}
      <header className="mb-4 sm:mb-6 lg:mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
        <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-2xl leading-tight">
            Monthly Compliance Summary
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-bold drop-shadow-lg">
            Compile and submit the official monthly performance report for your district to the State Command Centre
          </p>
        </div>
      </header>

      <Card className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-xl sm:rounded-2xl">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg md:text-xl">
            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            <span>District Report for July 2025</span>
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            The system has automatically aggregated data from all Nodal units. Please review the summary and add your official commentary before submission.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-6">

            {/* Section 1: Auto-Aggregated Performance Summary */}
            <div className="p-4 sm:p-6 border border-white/20 rounded-lg sm:rounded-xl bg-white/50 backdrop-blur-sm">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600"/>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Auto-Aggregated Performance Summary</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                 <StatCard
                   title="Total Incidents (Month)"
                   value={aggregatedData.totalIncidents}
                   icon={AlertTriangle}
                   color="red"
                 />
                 <StatCard
                   title="Avg. Compliance Score"
                   value={aggregatedData.avgComplianceScore}
                   icon={BarChart3}
                   color="blue"
                 />
                 <StatCard
                   title="Avg. Grievance Resolution"
                   value={aggregatedData.avgResolutionTime}
                   icon={Clock}
                   color="purple"
                 />
                 <div className="col-span-2 md:col-span-1">
                   <StatCard
                     title="Top Performing Unit"
                     value={aggregatedData.topPerformingUnit}
                     icon={Award}
                     color="green"
                   />
                 </div>
                 <div className="col-span-2">
                   <StatCard
                     title="Unit Requiring Attention"
                     value={aggregatedData.worstPerformingUnit}
                     icon={AlertCircle}
                     color="orange"
                   />
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