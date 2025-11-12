'use client';

import React from 'react';
import { Upload, BarChart3, FileText, CheckCircle, XCircle, TrendingUp, TrendingDown, Award, AlertTriangle } from 'lucide-react';

// --- Self-contained placeholder components to ensure functionality ---

import type { ReactNode, TextareaHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, LabelHTMLAttributes } from 'react';

type CardProps = { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>;
const Card = ({ children, className = '', ...props }: CardProps) => <div className={`bg-white rounded-2xl shadow-md ${className}`} {...props}>{children}</div>;
const CardHeader = ({ children, className = '', ...props }: CardProps) => <div className={`p-6 ${className}`} {...props}>{children}</div>;
const CardContent = ({ children, className = '', ...props }: CardProps) => <div className={`p-6 ${className}`} {...props}>{children}</div>;
const CardTitle = ({ children, className = '', ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLHeadingElement>) => <h3 className={`font-bold text-xl ${className}`} {...props}>{children}</h3>;
const CardDescription = ({ children, className = '', ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLParagraphElement>) => <p className={`text-sm ${className}`} {...props}>{children}</p>;
const Label = ({ children, className = '', ...props }: { children: ReactNode; className?: string } & LabelHTMLAttributes<HTMLLabelElement>) => <label className={`text-sm font-semibold ${className}`} {...props}>{children}</label>;
const Textarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow" {...props} />;
const Button = ({ children, className = '', ...props }: { children: ReactNode; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) => <button className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${className}`} {...props}>{children}</button>;


// --- Custom Styled Components ---

type StatCardProps = {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
};
const StatCard = ({ title, value, icon: Icon, gradient }: StatCardProps) => (
    <div className={`relative bg-gradient-to-br ${gradient} p-5 rounded-xl shadow-lg text-white overflow-hidden`}>
        <Icon className="absolute -right-3 -bottom-3 h-20 w-20 text-white/10" />
        <div className="relative">
            <p className="font-semibold text-sm text-white/90">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
    </div>
);

export default function StateComplianceFormPage() {
    // Mock auto-aggregated data (unchanged)
    const aggregatedStateData = {
        totalIncidents: 142,
        avgComplianceScore: "89%",
        avgResolutionTime: "28 Hours",
        topPerformingDistrict: "Kolkata (94%)",
        worstPerformingDistrict: "South 24 Parganas (78%)",
        totalFatalitiesYTD: 1,
    };

  return (
    <div className="min-h-screen space-y-8 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        {/* District-style title/banner */}
        <div className="w-full rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 text-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center space-x-4">
                    <div className="w-12" aria-hidden />
                    <div>
                        <h1 className="text-3xl font-bold">State-Wide Compliance Form</h1>
                        <p className="mt-1 text-sm opacity-90">Compile and submit the official state-level performance report to the NCSK.</p>
                    </div>
                </div>
            </div>
        </div>

      <Card className="bg-white/70 backdrop-blur-md shadow-2xl border border-gray-200/80 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <CardTitle className="flex items-center space-x-3 text-2xl drop-shadow"> 
                <FileText className="h-7 w-7" />
                <span>Official Report: West Bengal (July 2025)</span>
            </CardTitle>
            <CardDescription className="text-white/80">
                The system has automatically aggregated data from all district reports. Please review and add your commentary.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-10"> 
            {/* Section 1: Auto-Aggregated State-Wide Summary */}
            <div>
                <div className="flex items-center space-x-3 mb-4">
                    <BarChart3 className="h-6 w-6 text-indigo-600"/>
                    <h3 className="text-xl font-bold text-slate-700">Auto-Aggregated State Summary</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard title="Total Incidents (Month)" value={aggregatedStateData.totalIncidents} icon={AlertTriangle} gradient="from-amber-400 to-orange-500" />
                    <StatCard title="Avg. Compliance Score" value={aggregatedStateData.avgComplianceScore} icon={CheckCircle} gradient="from-green-400 to-emerald-500" />
                    <StatCard title="Fatalities (YTD)" value={aggregatedStateData.totalFatalitiesYTD} icon={XCircle} gradient="from-orange-500 to-amber-600" />
                    <StatCard title="Top Performing District" value={aggregatedStateData.topPerformingDistrict} icon={Award} gradient="from-teal-400 to-cyan-500" />
                    <StatCard title="District Requiring Attention" value={aggregatedStateData.worstPerformingDistrict} icon={TrendingDown} gradient="from-yellow-400 to-amber-500" />
                     <StatCard title="Avg. Resolution Time" value={aggregatedStateData.avgResolutionTime} icon={FileText} gradient="from-sky-400 to-blue-500" />
                </div>
            </div>

            {/* Section 2: State Administrator's Commentary */}
            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center space-x-3 mb-4">
                    <FileText className="h-6 w-6 text-indigo-600"/>
                    <h3 className="text-xl font-bold text-slate-700">State Administrator's Commentary</h3>
                </div>
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="summary" className="text-slate-600">Executive Summary for West Bengal</Label>
                        <Textarea id="summary" placeholder="Provide a brief overview of the state's performance, challenges, and successes for the month..." rows={4} />
                    </div>
                    <div>
                        <Label htmlFor="actions" className="text-slate-600">Actions Taken & Policy Recommendations</Label>
                        <Textarea id="actions" placeholder="Detail any state-level interventions, new policies, or recommendations for the NCSK..." rows={4} />
                    </div>
                </div>
            </div>

            {/* Submission Actions */}
            <div className="flex flex-col sm:flex-row justify-end items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200/80">
                <Button className="w-full sm:w-auto bg-slate-200 text-slate-700 hover:bg-slate-300 shadow-sm">Save as Draft</Button>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"> 
                    <Upload className="h-4 w-4 mr-2" />
                    Submit to National Dashboard (NCSK)
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

