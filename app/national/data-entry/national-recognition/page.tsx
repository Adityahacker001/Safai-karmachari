'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

export default function NationalRecognitionPage() {
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    const IntegratedLoader = require("@/components/layout/IntegratedLoader").default;
    return <IntegratedLoader />;
  }

  // Mock data preserved
  const nominations = [
    { id: 'NOM-NAT-01', nominee: "State of Kerala", category: "Best Performing State", nominator: "NCSK (Auto-generated)", status: "Approved" },
    { id: 'NOM-NAT-02', nominee: "State of West Bengal", category: "Most Improved State", nominator: "NCSK (Self-Nominated)", status: "Pending Final Vote" },
    { id: 'NOM-ST-WB-01', nominee: "Abishek Das (WB)", category: "National Safai Karmachari of the Year", nominator: "Escalated from West Bengal", status: "Approved" },
    { id: 'NOM-ST-TN-01', nominee: "Priya Krishnan (TN)", category: "National Safai Karmachari of the Year", nominator: "Escalated from Tamil Nadu", status: "Pending Final Vote" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 space-y-8 font-sans">
      
      {/* Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-2xl shadow-xl border-b-4 border-blue-900">
        <div className="relative p-6 md:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1 flex items-center gap-6">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20 shadow-inner">
              <Award className="w-10 h-10 text-white drop-shadow-md" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-md leading-tight">
                National Recognition Awards
              </h1>
              <p className="text-blue-100 font-medium text-lg mt-2 drop-shadow-sm">
                Initiate and ratify nominations for the highest national-level awards
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-8 items-start max-w-5xl mx-auto">
        
        {/* Professional Nomination Form */}
        <div>
          <Card className="bg-white border-0 shadow-2xl shadow-slate-200/70 rounded-2xl overflow-hidden ring-1 ring-slate-200">
            
            <CardHeader className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 border-b border-purple-700 p-8 md:p-10 lg:p-12">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl md:text-3xl font-extrabold text-white"> 
                    Initiate National Nomination
                  </CardTitle>
                  <CardDescription className="text-lg text-white/90 font-medium mt-1">
                    Nominate a State or other entity for a national award
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 md:p-8 space-y-8"> 
              
              {/* Category Field */}
              <div className="space-y-3">
                <Label htmlFor="nat-category" className="text-lg font-bold text-slate-800">
                  National Award Category
                </Label>
                <Select>
                  <SelectTrigger className="w-full h-16 px-5 text-lg bg-slate-50 border-2 border-slate-300 rounded-xl text-slate-900 font-medium focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all">
                    <SelectValue placeholder="Select award category..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best-state-perf" className="text-lg py-3">Best Performing State</SelectItem>
                    <SelectItem value="most-improved-state" className="text-lg py-3">Most Improved State</SelectItem>
                    <SelectItem value="best-innovation" className="text-lg py-3">National Award for Innovation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Nominee Field */}
              <div className="space-y-3">
                <Label htmlFor="nat-nominee" className="text-lg font-bold text-slate-800">
                  Nominee (State or Entity Name)
                </Label>
                <Input 
                  id="nat-nominee" 
                  placeholder="e.g., State of Gujarat" 
                  className="w-full h-16 px-5 text-lg bg-slate-50 border-2 border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm" 
                />
              </div>

              {/* Justification Field */}
              <div className="space-y-3">
                <Label htmlFor="nat-justification" className="text-lg font-bold text-slate-800">
                  Justification & Data Citation
                </Label>
                <Textarea 
                  id="nat-justification" 
                  placeholder="Provide the official justification, citing data from the national dashboard..." 
                  rows={8} 
                  className="w-full p-5 text-lg leading-relaxed bg-slate-50 border-2 border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm resize-none" 
                />
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Button className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-900/20 transition-all transform hover:-translate-y-1">
                  Submit Nomination
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}