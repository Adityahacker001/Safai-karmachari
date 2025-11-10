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
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8">
      {/* Professional Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <Send className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-2xl" />
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white drop-shadow-2xl leading-tight">
                Issue National Directive
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-lg text-white/90 font-bold drop-shadow-lg mt-2">
                Compose and send formal directives to State or District administrations
              </p>
            </div>
          </div>
         
        </div>
      </header>
      <div className="grid gap-4 sm:gap-6 md:gap-8 items-start">
        {/* Professional Composition Form */}
        <div>
          <Card className="backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-sm border-b border-white/20 p-4 sm:p-6 md:p-8">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-3 sm:gap-4"> 
                <Send className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                <span>Directive Composition Form</span>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base md:text-lg text-gray-700 font-semibold mt-2">
                Fill out all fields to create and issue a new national directive
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8"> 
              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor="subject" className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="e.g., Mandate for 100% Mechanization of Sewer Cleaning by 2026" 
                  className="w-full p-3 sm:p-4 text-sm sm:text-base bg-white/70 backdrop-blur-sm border-white/30 rounded-xl font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="recipients" className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Target Recipients</Label>
                  <Select>
                    <SelectTrigger className="w-full p-3 sm:p-4 text-sm sm:text-base bg-white/70 backdrop-blur-sm border-white/30 rounded-xl font-semibold">
                      <SelectValue placeholder="Select target..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-states">All States & UTs</SelectItem>
                      <SelectItem value="lagging-states">Lagging States Only (Score &lt; 80%)</SelectItem>
                      <SelectItem value="all-districts">All District Administrations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="priority" className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Priority</Label>
                  <Select>
                    <SelectTrigger className="w-full p-3 sm:p-4 text-sm sm:text-base bg-white/70 backdrop-blur-sm border-white/30 rounded-xl font-semibold">
                      <SelectValue placeholder="Set priority level..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High (Immediate Action Required)</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Low (Informational)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="deadline" className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Response Deadline</Label>
                  <Input 
                    id="deadline" 
                    type="date" 
                    className="w-full p-3 sm:p-4 text-sm sm:text-base bg-white/70 backdrop-blur-sm border-white/30 rounded-xl font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor="message" className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Directive Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Enter the full, official text of the directive here. This will be sent to the selected recipients..." 
                  rows={10} 
                  className="w-full p-3 sm:p-4 text-sm sm:text-base bg-white/70 backdrop-blur-sm border-white/30 rounded-xl font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
                />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor="attachments" className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Attach Supporting Documents (Optional)</Label>
                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 border-2 border-dashed border-white/30 rounded-xl bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all">
                    <FileUp className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600"/>
                    <Input id="attachments" type="file" className="border-none p-0 h-auto bg-transparent text-sm sm:text-base font-semibold"/>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Attach any relevant guidelines, acts, or reports.</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 md:p-8 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-sm border-t border-white/20">
                <Button className="w-full py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                  Issue Directive Now
                </Button>
                <p className="text-xs sm:text-sm text-center text-gray-600 font-medium max-w-md">
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