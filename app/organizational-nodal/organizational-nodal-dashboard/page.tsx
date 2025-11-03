"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"; // Shadcn
import StatCard from "@/components/ui/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Shadcn
import { Input } from "@/components/ui/input"; // Shadcn
import { Button } from "@/components/ui/button"; // Shadcn
import { Badge } from "@/components/ui/badge"; // Shadcn
import {
  Users,
  Building,
  GraduationCap,
  AlertTriangle,
  MessageSquareWarning,
  ClipboardCheck,
  MessageSquareHeart,
  Banknote,
  HeartPulse,
  UserX,
  FileText,
  Plus,
  Send,
  BellRing,
  Phone,
  ArrowUp,
  ArrowDown,
  Star,
  LucideIcon,
} from "lucide-react";

// --- Data Interfaces ---
interface SummaryCardData {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'indigo' | 'emerald' | 'amber' | 'sky' | 'violet' | 'pink';
}
interface WorkerPerformance {
  rank: number;
  name: string;
  attendance: number;
  safety: number;
  training: number;
  rating: number;
}
interface WorkerIssues {
  rank: number;
  name: string;
  absenteeism: number;
  violations: number;
  pendingTraining: number;
  remarks: string;
}

// --- Mock Data ---
const mockSummaryData: SummaryCardData[] = [
  { title: "Total Workers", value: "350", subtitle: "15 Hazardous, 20 MS, 45 RP", icon: Users as LucideIcon, color: "blue" as const },
  { title: "Total Contractors", value: "4", subtitle: "NSKC Verified", icon: Building as LucideIcon, color: "indigo" as const },
  // { title: "Training", value: "85%", subtitle: "52 Workers Pending", icon: GraduationCap as LucideIcon, color: "sky" as const },
  { title: "Incidents", value: "3", subtitle: "1 Death, 2 Injuries, 1 FIR", icon: AlertTriangle as LucideIcon, color: "red" as const },
  { title: "Grievances", value: "8", subtitle: "2 Pending, 1 Escalated", icon: MessageSquareWarning as LucideIcon, color: "orange" as const },
  { title: "Directions", value: "5", subtitle: "1 Pending (Aging > 3 days)", icon: ClipboardCheck as LucideIcon, color: "purple" as const },
  { title: "Feedback", value: "12", subtitle: "3 Pending (from Public)", icon: MessageSquareHeart as LucideIcon, color: "pink" as const },
  // { title: "Payment Status", value: "92%", subtitle: "28 Pending, 2 Contractors Delayed", icon: Banknote as LucideIcon, color: "green" as const },
  // { title: "Medical Exams", value: "78%", subtitle: "4 Follow-up, 12 Overdue", icon: HeartPulse as LucideIcon, color: "emerald" as const },
];

const mockTopWorkers: WorkerPerformance[] = [
    { rank: 1, name: "Rakesh Kumar", attendance: 100, safety: 100, training: 100, rating: 5 },
    { rank: 2, name: "Sita Sharma", attendance: 98, safety: 100, training: 100, rating: 4.9 },
    { rank: 3, name: "Amit Singh", attendance: 99, safety: 95, training: 100, rating: 4.8 },
];
const mockBottomWorkers: WorkerIssues[] = [
    { rank: 348, name: "Vikas Mehra", absenteeism: 8, violations: 3, pendingTraining: 2, remarks: "Repeated safety warnings" },
    { rank: 349, name: "Pooja Devi", absenteeism: 12, violations: 1, pendingTraining: 3, remarks: "High absenteeism" },
    { rank: 350, name: "Ravi Gupta", absenteeism: 5, violations: 5, pendingTraining: 1, remarks: "Frequent PPE violations" },
];

// --- Main Page Component ---
export default function OrganizationalNodalDashboardPage() {
  const [summaryData, setSummaryData] = useState(mockSummaryData);
  const [topWorkers, setTopWorkers] = useState(mockTopWorkers);
  const [bottomWorkers, setBottomWorkers] = useState(mockBottomWorkers);

  const handleQuickAction = (action: string) => {
    alert(`${action} clicked (simulation).`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 min-h-screen">
      {/* 🔹 Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Organizational Nodal Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Monitor deployments, manage compliance, and track worker performance for your organization.
        </p>
      </div>

      {/* 🔹 1. Summary Metrics */}
      <SummaryCards data={summaryData} />

      {/* 🔹 2. Quick Action Buttons */}
      <QuickActions onActionClick={handleQuickAction} />

      {/* 🔹 3. Worker Performance Snapshot */}
      <PerformanceSnapshot topWorkers={topWorkers} bottomWorkers={bottomWorkers} />
    </div>
  );
}

// --- Child Components ---

function SummaryCards({ data }: { data: SummaryCardData[] }) {
  // Arrange cards in 3 rows of 3
  const rows = [
    data.slice(0, 3),
    data.slice(3, 6),
    data.slice(6, 9),
  ];
  return (
    <div className="space-y-6">
      {rows.map((row, idx) => (
        <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {row.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              subtitle={item.subtitle}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>
      ))}
    </div>
  );
}



function QuickActions({ onActionClick }: { onActionClick: (action: string) => void }) {
  const actions = [
    { text: "Add New Work", icon: Plus, variant: "default" as const },
    { text: "Report Incident", icon: AlertTriangle, variant: "destructive" as const },
    { text: "Submit Feedback", icon: MessageSquareHeart, variant: "outline" as const },
    { text: "Submit Grievance", icon: MessageSquareWarning, variant: "outline" as const },
    { text: "Reply to Direction", icon: Send, variant: "outline" as const },
    { text: "View Exception Alerts", icon: BellRing, variant: "destructive" as const },
    { text: "Contact District Nodal", icon: Phone, variant: "outline" as const },
  ];

  return (
    <Card className="shadow-lg border border-gray-100 rounded-lg bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-700">⚡ Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3 justify-center sm:justify-start">
        {actions.map((action, i) => (
          <Button
            key={i}
            variant={action.variant}
            size="sm"
            className="flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow duration-200"
            onClick={() => onActionClick(action.text)}
          >
            <action.icon className="h-4 w-4" />
            {action.text}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

function PerformanceSnapshot({ topWorkers, bottomWorkers }: {
    topWorkers: WorkerPerformance[];
    bottomWorkers: WorkerIssues[];
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">🏆 Worker Performance Snapshot</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top 5 Workers */}
        <Card className="shadow-lg border border-gray-100 rounded-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b p-4">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <ArrowUp className="w-5 h-5 text-green-600" /> Top 5 Workers
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0">
            <Table>
              <TableHeader className="bg-gray-50/70">
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topWorkers.map((w) => (
                  <TableRow key={w.rank} className="hover:bg-green-50/50">
                    <TableCell className="font-bold">{w.rank}</TableCell>
                    <TableCell className="font-medium">{w.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Bottom 5 Workers */}
        <Card className="shadow-lg border border-gray-100 rounded-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b p-4">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <ArrowDown className="w-5 h-5 text-red-600" /> Bottom 5 Workers
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0">
             <Table>
              <TableHeader className="bg-gray-50/70">
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bottomWorkers.map((w) => (
                  <TableRow key={w.rank} className="hover:bg-red-50/50">
                    <TableCell className="font-bold">{w.rank}</TableCell>
                    <TableCell className="font-medium">{w.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

