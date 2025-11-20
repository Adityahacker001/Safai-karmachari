
'use client';


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Plus } from "lucide-react";
import { contractorTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function PolicyImplementationLogPage() {
  const [policyName, setPolicyName] = useState("");
  const [policyDesc, setPolicyDesc] = useState("");
  const [policyTarget, setPolicyTarget] = useState("");
  const [policyDeadline, setPolicyDeadline] = useState("");
  const [policyMemo, setPolicyMemo] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
        <style jsx>{`
          .loader {
            --c: no-repeat linear-gradient(#4f46e5 0 0);
            background: 
              var(--c),var(--c),var(--c),
              var(--c),var(--c),var(--c),
              var(--c),var(--c),var(--c);
            background-size: 16px 16px;
            animation: 
              l32-1 1s infinite,
              l32-2 1s infinite;
          }
          @keyframes l32-1 {
            0%,100% {width:45px;height: 45px}
            35%,65% {width:65px;height: 65px}
          }
          @keyframes l32-2 {
            0%,40%  {background-position: 0 0,0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,  50% 50% }
            60%,100%{background-position: 0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,0 0,  50% 50% }
          }
        `}</style>
        <div className="loader"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Policy Logged & Announced!",
        description: (
          <div>
            <div className="font-semibold">{policyName || "(No Title)"}</div>
            <div className="text-xs text-muted-foreground mt-1">All districts have been notified.</div>
          </div>
        ),
        variant: "default",
      });
      setPolicyName("");
      setPolicyDesc("");
      setPolicyTarget("");
      setPolicyDeadline("");
      setPolicyMemo("");
    }, 1200);
  };

  return (
    <div className={cn("min-h-screen space-y-8 p-6 md:p-8")}>
      {/* District-style title/banner */}
      <div className="w-full rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12" aria-hidden />
            <div>
              <h2 className="text-3xl font-bold">Policy Implementation Log</h2>
              <p className="mt-1 text-sm opacity-90">Formally log new state-wide policies and directives to begin tracking their implementation.</p>
            </div>
          </div>
        </div>
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="policy-name" className={cn(contractorTheme.form.label)}>Policy Name / Directive Title</Label>
                  <Input
                    id="policy-name"
                    placeholder="e.g., Waste Segregation Mandate 2025"
                    className={cn(contractorTheme.form.input)}
                    value={policyName}
                    onChange={e => setPolicyName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="policy-desc" className={cn(contractorTheme.form.label)}>Objectives & Key Goals</Label>
                  <Textarea
                    id="policy-desc"
                    placeholder="Describe the primary goals of this policy..."
                    rows={4}
                    className={cn(contractorTheme.form.textarea)}
                    value={policyDesc}
                    onChange={e => setPolicyDesc(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="policy-target" className={cn(contractorTheme.form.label)}>Target Compliance (%)</Label>
                    <Input
                      id="policy-target"
                      type="number"
                      placeholder="e.g., 90"
                      className={cn(contractorTheme.form.input)}
                      value={policyTarget}
                      onChange={e => setPolicyTarget(e.target.value)}
                      min={0}
                      max={100}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="policy-deadline" className={cn(contractorTheme.form.label)}>Implementation Deadline</Label>
                    <Input
                      id="policy-deadline"
                      type="date"
                      className={cn(contractorTheme.form.input)}
                      value={policyDeadline}
                      onChange={e => setPolicyDeadline(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="policy-memo" className={cn(contractorTheme.form.label)}>Official Announcement Memo</Label>
                  <Textarea
                    id="policy-memo"
                    placeholder="Write the official memo that will be sent to all District Administrators..."
                    rows={4}
                    className={cn(contractorTheme.form.textarea)}
                    value={policyMemo}
                    onChange={e => setPolicyMemo(e.target.value)}
                    required
                  />
                </div>
                <Button
                  className={cn(contractorTheme.button.primary, "w-full flex items-center")}
                  type="submit"
                  disabled={loading}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {loading ? "Logging..." : "Log & Announce Policy"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
