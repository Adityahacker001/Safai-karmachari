'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Send, FileUp } from "lucide-react";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function DirectiveIssuancePage() {
  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8", contractorTheme.page.gradientBackground)}>
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Issue National Directive</h2>
        <p className="text-slate-600 mt-1">Compose and send a formal, trackable directive to State or District administrations.</p>
      </div>
      <div className="grid gap-8 items-start">
        {/* Left Column: Composition Form */}
        <div>
          <Card className={cn(contractorTheme.card.container)}>
            <CardHeader className={cn(contractorTheme.card.header)}>
              <CardTitle className={cn(contractorTheme.card.title, "flex items-center space-x-2")}> 
                <Send className="h-5 w-5" />
                <span>Directive Composition Form</span>
              </CardTitle>
              <CardDescription className={cn(contractorTheme.card.description)}>
                Fill out all fields to create and issue a new national directive.
              </CardDescription>
            </CardHeader>
            <CardContent className={cn(contractorTheme.card.content, "space-y-6")}> 
              <div>
                <Label htmlFor="subject" className={cn(contractorTheme.form.label, "font-semibold")}>Subject</Label>
                <Input id="subject" placeholder="e.g., Mandate for 100% Mechanization of Sewer Cleaning by 2026" className={cn(contractorTheme.form.input)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="recipients" className={cn(contractorTheme.form.label)}>Target Recipients</Label>
                  <Select>
                    <SelectTrigger className={cn(contractorTheme.form.select)}><SelectValue placeholder="Select target..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-states">All States & UTs</SelectItem>
                      <SelectItem value="lagging-states">Lagging States Only (Score &lt; 80%)</SelectItem>
                      <SelectItem value="all-districts">All District Administrations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority" className={cn(contractorTheme.form.label)}>Priority</Label>
                  <Select>
                    <SelectTrigger className={cn(contractorTheme.form.select)}><SelectValue placeholder="Set priority level..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High (Immediate Action Required)</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Low (Informational)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="deadline" className={cn(contractorTheme.form.label)}>Response Deadline</Label>
                  <Input id="deadline" type="date" className={cn(contractorTheme.form.input)} />
                </div>
              </div>
              <div>
                <Label htmlFor="message" className={cn(contractorTheme.form.label, "font-semibold")}>Directive Message</Label>
                <Textarea id="message" placeholder="Enter the full, official text of the directive here. This will be sent to the selected recipients..." rows={10} className={cn(contractorTheme.form.textarea)} />
              </div>
              <div>
                <Label htmlFor="attachments" className={cn(contractorTheme.form.label)}>Attach Supporting Documents (Optional)</Label>
                <div className="flex items-center space-x-2 mt-1 p-4 border-2 border-dashed rounded-lg">
                    <FileUp className="h-5 w-5 text-gray-500"/>
                    <Input id="attachments" type="file" className="border-none p-0 h-auto"/>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Attach any relevant guidelines, acts, or reports.</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-2 pt-6">
                <Button className={cn(contractorTheme.button.primary, "w-full")}>Issue Directive Now</Button>
                <p className="text-xs text-center text-muted-foreground">
                    This action will send a formal notification to all selected recipients and create a new entry in the tracking dashboard.
                </p>
            </CardFooter>
          </Card>
        </div>
        {/* Right Column: Pre-submission Checklist & Action */}
        <div className="lg:col-span-1 space-y-6">
          {/* Reserved for future content */}
        </div>
      </div>
    </div>
  );
}