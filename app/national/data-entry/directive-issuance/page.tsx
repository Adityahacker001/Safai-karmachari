'use client';
import { useState, useEffect } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Send, FileUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DirectiveIssuancePage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(timer);
    }, []);

    if (loading) {
      // Assuming you have this component, otherwise use a simple div
      const IntegratedLoader = require('@/components/layout/IntegratedLoader').default;
      return <IntegratedLoader />;
    }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 space-y-8 font-sans">
      
      {/* Professional Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 rounded-3xl shadow-xl border-b-4 border-blue-900">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        
        <div className="relative p-6 md:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1 flex items-center gap-6">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 shadow-inner">
                <Send className="w-10 h-10 text-white drop-shadow-md" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-md leading-tight">
                Issue National Directive
              </h1>
              <p className="text-blue-100 font-medium text-base md:text-lg mt-2 max-w-2xl leading-snug">
                Compose and send formal directives to State or District administrations.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-8 items-start max-w-7xl mx-auto">
        
        {/* Professional Composition Form */}
        <div>
          <Card className="bg-white border-0 shadow-2xl shadow-slate-200 rounded-2xl overflow-hidden ring-1 ring-slate-100">
            
            <CardHeader className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 border-b border-purple-700 p-8 md:p-10 lg:p-12">
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-white"> 
                        Directive Composition Form
                    </CardTitle>
                    <CardDescription className="text-base text-white/90 font-medium mt-1">
                        Fill out all fields below to issue a formal mandate.
                    </CardDescription>
                  </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 md:p-8 space-y-8"> 
              
              {/* Subject */}
              <div className="space-y-3">
                <Label htmlFor="subject" className="text-base font-bold text-slate-700">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="e.g., Mandate for 100% Mechanization of Sewer Cleaning by 2026" 
                  className="w-full h-14 px-4 text-base bg-white border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm" 
                />
              </div>

              {/* 3-Column Grid for Selects */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Label htmlFor="recipients" className="text-base font-bold text-slate-700">Target Recipients</Label>
                  <Select>
                    <SelectTrigger className="w-full h-12 px-4 text-base bg-white border-slate-300 rounded-xl text-slate-700 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select target..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-states">All States & UTs</SelectItem>
                      <SelectItem value="lagging-states">Lagging States Only (Score &lt; 80%)</SelectItem>
                      <SelectItem value="all-districts">All District Administrations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="priority" className="text-base font-bold text-slate-700">Priority</Label>
                  <Select>
                    <SelectTrigger className="w-full h-12 px-4 text-base bg-white border-slate-300 rounded-xl text-slate-700 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Set priority level..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high" className="font-bold text-red-600">High (Immediate Action)</SelectItem>
                      <SelectItem value="normal" className="font-bold text-blue-600">Normal</SelectItem>
                      <SelectItem value="low" className="font-bold text-slate-600">Low (Informational)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="deadline" className="text-base font-bold text-slate-700">Response Deadline</Label>
                  <Input 
                    id="deadline" 
                    type="date" 
                    className="w-full h-12 px-4 text-base bg-white border-slate-300 rounded-xl text-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm" 
                  />
                </div>
              </div>

              {/* Message Box */}
              <div className="space-y-3">
                <Label htmlFor="message" className="text-base font-bold text-slate-700">Directive Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Enter the full, official text of the directive here. This will be sent to the selected recipients..." 
                  rows={12} 
                  className="w-full p-5 text-base leading-relaxed bg-white border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm resize-none" 
                />
              </div>

              {/* Attachments - Improved Dropzone Look */}
              <div className="space-y-3">
                <Label htmlFor="attachments" className="text-base font-bold text-slate-700">Attach Supporting Documents (Optional)</Label>
                
                <div className="relative group flex items-center gap-4 p-6 border-2 border-dashed border-slate-300 bg-slate-50/50 rounded-xl hover:bg-blue-50/50 hover:border-blue-400 transition-all cursor-pointer">
                    <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-200">
                        <FileUp className="h-6 w-6 text-blue-600"/>
                    </div>
                    <div className="flex-1 z-0">
                        <div className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">
                            Click to browse or drop file here
                        </div>
                        <p className="text-xs text-slate-500 mt-1">PDF, DOCX, or Official Memos</p>
                    </div>
                    {/* The actual input covers the area but is invisible */}
                    <Input id="attachments" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
                </div>
              </div>

            </CardContent>

            <CardFooter className="flex flex-col items-center gap-4 p-8 bg-slate-50 border-t border-slate-100">
                <Button className="w-full md:w-auto py-6 px-12 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all transform hover:-translate-y-0.5">
                  Issue Directive Now
                </Button>
                <p className="text-sm text-center text-slate-500 font-medium max-w-lg">
                    This action will send a formal notification to all selected recipients and create a new entry in the tracking dashboard.
                </p>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}