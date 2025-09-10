'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Save, CheckSquare } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useState } from "react";

export default function AnnualReportInputPage() {

    // State to manage which data section is being viewed for context
    const [selectedSection, setSelectedSection] = useState('deaths');

    // Mock data for the auto-compiled sections
    const reportSections = [
        { id: 'ms-act', title: "Implementation of MS Act, 2013" },
        { id: 'deaths', title: "Sewer/Septic Tank Death Statistics" },
        { id: 'compensation', title: "Compensation Disbursement Status" },
        { id: 'mechanization', title: "Mechanization Progress" },
    ];
    
    const sectionData : { [key: string]: React.ReactNode } = {
        'deaths': (
            <Table>
                <TableHeader><TableRow><TableHead>State</TableHead><TableHead>Deaths Reported</TableHead><TableHead>Cases with FIR</TableHead></TableRow></TableHeader>
                <TableBody>
                    <TableRow><TableCell>Maharashtra</TableCell><TableCell>28</TableCell><TableCell>25</TableCell></TableRow>
                    <TableRow><TableCell>Uttar Pradesh</TableCell><TableCell>45</TableCell><TableCell>38</TableCell></TableRow>
                </TableBody>
            </Table>
        ),
        'compensation': (
             <Table>
                <TableHeader><TableRow><TableHead>State</TableHead><TableHead>Cases</TableHead><TableHead>Full Compensation Paid</TableHead></TableRow></TableHeader>
                <TableBody>
                    <TableRow><TableCell>Maharashtra</TableCell><TableCell>28</TableCell><TableCell>22</TableCell></TableRow>
                    <TableRow><TableCell>Uttar Pradesh</TableCell><TableCell>45</TableCell><TableCell>30</TableCell></TableRow>
                </TableBody>
            </Table>
        )
    };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Annual Report Section Input</h2>
        <p className="text-gray-600">Add official commentary and recommendations to the auto-compiled annual report.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Contextual Data Viewer */}
        <div className="lg:col-span-1">
          <Card className="bg-white shadow-sm border border-gray-200 sticky top-24">
            <CardHeader>
              <CardTitle>Auto-Compiled Data Sections</CardTitle>
              <CardDescription>Select a section to view its compiled data for context.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {reportSections.map(section => (
                    <Button 
                        key={section.id}
                        variant={selectedSection === section.id ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setSelectedSection(section.id)}
                    >
                        {section.title}
                    </Button>
                ))}
            </CardContent>
             <div className="p-4 border-t bg-gray-50">
                {sectionData[selectedSection] || <p className="text-sm text-gray-500">Select a section to view data.</p>}
             </div>
          </Card>
        </div>

        {/* Right Column: Commentary Editor */}
        <div className="lg:col-span-2">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-orange-600" />
                <span>NCSK Commentary & Recommendations</span>
              </CardTitle>
              <CardDescription>
                This text will be added to the final report. Focus on analysis, insights, and formal recommendations to Parliament.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Label htmlFor="commentary-summary" className="font-semibold">Executive Summary of Findings</Label>
                    <Textarea 
                        id="commentary-summary" 
                        placeholder="Based on the compiled data, the Commission has observed the following national trends..."
                        rows={8}
                    />
                </div>
                 <div>
                    <Label htmlFor="commentary-recommendations" className="font-semibold">Recommendations to Parliament</Label>
                    <Textarea 
                        id="commentary-recommendations" 
                        placeholder="The National Commission for Safai Karamcharis hereby recommends the following actions..."
                        rows={12}
                    />
                </div>
                <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button variant="outline">
                        <Save className="h-4 w-4 mr-2"/>
                        Save Draft
                    </Button>
                     <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckSquare className="h-4 w-4 mr-2"/>
                        Mark as Ready for Final Compilation
                    </Button>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}