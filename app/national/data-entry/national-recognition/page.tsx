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
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8", contractorTheme.page.gradientBackground)}>
      <div>
        <h2 className="text-3xl font-bold text-slate-800">National Recognition Awards</h2>
        <p className="text-slate-600 mt-1">Initiate and ratify nominations for the highest national-level awards.</p>
      </div>
      <div className="grid gap-8 items-start">
        {/* Initiate Nomination Form */}
        <div>
          <Card className={cn(contractorTheme.card.container)}>
            <CardHeader className={cn(contractorTheme.card.header)}>
              <CardTitle className={cn(contractorTheme.card.title, "flex items-center space-x-2 text-xl")}> 
                <Plus className="h-8 w-8" />
                <span>Initiate National Nomination</span>
              </CardTitle>
              <CardDescription className={cn(contractorTheme.card.description, "text-base")}>Nominate a State or other entity for a national award.</CardDescription>
            </CardHeader>
            <CardContent className={cn(contractorTheme.card.content, "space-y-8")}> 
              <div>
                <Label htmlFor="nat-category" className={cn(contractorTheme.form.label, "text-lg")}>National Award Category</Label>
                <Select>
                  <SelectTrigger className={cn(contractorTheme.form.select, "h-14 w-full")}><SelectValue placeholder="Select award category..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best-state-perf">Best Performing State</SelectItem>
                    <SelectItem value="most-improved-state">Most Improved State</SelectItem>
                    <SelectItem value="best-innovation">National Award for Innovation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="nat-nominee" className={cn(contractorTheme.form.label, "text-lg")}>Nominee (State or Entity Name)</Label>
                <Input id="nat-nominee" placeholder="e.g., State of Gujarat" className={cn(contractorTheme.form.input, "h-14 w-full")} />
              </div>
              <div>
                <Label htmlFor="nat-justification" className={cn(contractorTheme.form.label, "text-lg")}>Justification & Data Citation</Label>
                <Textarea id="nat-justification" placeholder="Provide the official justification, citing data from the national dashboard..." rows={8} className={cn(contractorTheme.form.textarea, "resize-none w-full")} />
              </div>
              <Button className={cn(contractorTheme.button.primary, "w-full h-14 text-xl")}>
                Submit Nomination
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}