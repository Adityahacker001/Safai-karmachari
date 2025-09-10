'client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Plus } from "lucide-react";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function PolicyImplementationLogPage() {
  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8", contractorTheme.page.gradientBackground)}>
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Policy Implementation Log</h2>
        <p className="text-slate-600 mt-1">Formally log new state-wide policies and directives to begin tracking their implementation.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Log New Policy Form */}
        <div className="lg:col-span-3">
          <Card className={cn(contractorTheme.card.container)}>
            <CardHeader className={cn(contractorTheme.card.header)}>
              <CardTitle className={cn(contractorTheme.card.title, "flex items-center space-x-2")}> 
                <Plus className="h-5 w-5" />
                <span>Log New Policy Initiative</span>
              </CardTitle>
              <CardDescription className={cn(contractorTheme.card.description)}>
                This will create a new tracker and notify all districts.
              </CardDescription>
            </CardHeader>
            <CardContent className={cn(contractorTheme.card.content, "space-y-4")}> 
              <div>
                <Label htmlFor="policy-name" className={cn(contractorTheme.form.label)}>Policy Name / Directive Title</Label>
                <Input id="policy-name" placeholder="e.g., Waste Segregation Mandate 2025" className={cn(contractorTheme.form.input)} />
              </div>
              <div>
                <Label htmlFor="policy-desc" className={cn(contractorTheme.form.label)}>Objectives & Key Goals</Label>
                <Textarea id="policy-desc" placeholder="Describe the primary goals of this policy..." rows={4} className={cn(contractorTheme.form.textarea)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="policy-target" className={cn(contractorTheme.form.label)}>Target Compliance (%)</Label>
                  <Input id="policy-target" type="number" placeholder="e.g., 90" className={cn(contractorTheme.form.input)} />
                </div>
                <div>
                  <Label htmlFor="policy-deadline" className={cn(contractorTheme.form.label)}>Implementation Deadline</Label>
                  <Input id="policy-deadline" type="date" className={cn(contractorTheme.form.input)} />
                </div>
              </div>
               <div>
                <Label htmlFor="policy-memo" className={cn(contractorTheme.form.label)}>Official Announcement Memo</Label>
                <Textarea id="policy-memo" placeholder="Write the official memo that will be sent to all District Administrators..." rows={4} className={cn(contractorTheme.form.textarea)} />
              </div>
              <Button className={cn(contractorTheme.button.primary, "w-full flex items-center")}> 
                <CheckCircle className="h-4 w-4 mr-2" />
                Log & Announce Policy
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}