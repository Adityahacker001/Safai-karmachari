'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Award, Plus, Check, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import React, { useState } from "react";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";


export default function NationalRecognitionPage() {

    // Mock data for national-level nominations
    const nominations = [
      { id: 'NOM-NAT-01', nominee: "State of Kerala", category: "Best Performing State", nominator: "NCSK (Auto-generated)", status: "Approved" },
      { id: 'NOM-NAT-02', nominee: "State of West Bengal", category: "Most Improved State", nominator: "NCSK (Self-Nominated)", status: "Pending Final Vote" },
      { id: 'NOM-ST-WB-01', nominee: "Abishek Das (WB)", category: "National Safai Karmachari of the Year", nominator: "Escalated from West Bengal", status: "Approved" },
      { id: 'NOM-ST-TN-01', nominee: "Priya Krishnan (TN)", category: "National Safai Karmachari of the Year", nominator: "Escalated from Tamil Nadu", status: "Pending Final Vote" },
    ];

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8">
      {/* Professional Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-2xl" />
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white drop-shadow-2xl leading-tight">
                National Recognition Awards
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-bold drop-shadow-lg mt-2">
                Initiate and ratify nominations for the highest national-level awards
              </p>
            </div>
          </div>
          
        </div>
      </header>
      <div className="grid gap-4 sm:gap-6 md:gap-8 items-start">
        {/* Professional Nomination Form */}
        <div>
          <Card className="backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-sm border-b border-white/20 p-4 sm:p-6 md:p-8">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-3 sm:gap-4"> 
                <Plus className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                <span>Initiate National Nomination</span>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base md:text-lg text-gray-700 font-semibold mt-2">
                Nominate a State or other entity for a national award
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8"> 
              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor="nat-category" className="text-sm sm:text-base md:text-lg font-bold text-gray-900">National Award Category</Label>
                <Select>
                  <SelectTrigger className="w-full h-12 sm:h-14 p-3 sm:p-4 text-sm sm:text-base bg-white/70 backdrop-blur-sm border-white/30 rounded-xl font-semibold">
                    <SelectValue placeholder="Select award category..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best-state-perf">Best Performing State</SelectItem>
                    <SelectItem value="most-improved-state">Most Improved State</SelectItem>
                    <SelectItem value="best-innovation">National Award for Innovation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor="nat-nominee" className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Nominee (State or Entity Name)</Label>
                <Input 
                  id="nat-nominee" 
                  placeholder="e.g., State of Gujarat" 
                  className="w-full h-12 sm:h-14 p-3 sm:p-4 text-sm sm:text-base bg-white/70 backdrop-blur-sm border-white/30 rounded-xl font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor="nat-justification" className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Justification & Data Citation</Label>
                <Textarea 
                  id="nat-justification" 
                  placeholder="Provide the official justification, citing data from the national dashboard..." 
                  rows={8} 
                  className="w-full p-3 sm:p-4 text-sm sm:text-base bg-white/70 backdrop-blur-sm border-white/30 rounded-xl font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
                />
              </div>
              <Button className="w-full h-12 sm:h-14 py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                Submit Nomination
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}