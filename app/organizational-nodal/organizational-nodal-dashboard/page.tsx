"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"; // Shadcn
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Shadcn
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
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Plus,
  Send,
  BellRing,
  Phone,
  ArrowUp,
  ArrowDown,
  Star,
  Settings,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

// --- Data Interfaces ---
interface SummaryCardData {
  title: string;
  value: string;
  subtext: string;
  icon: React.ElementType;
  color: string; // Tailwind color class
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
    { title: "Total Workers", value: "350", subtext: "15 Hazardous, 20 MS, 45 RP", icon: Users, color: "text-blue-500" },
    { title: "Total Contractors", value: "4", subtext: "NSKC Verified", icon: Building, color: "text-gray-500" },
    { title: "Training", value: "85%", subtext: "52 Workers Pending", icon: GraduationCap, color: "text-cyan-500" },
    { title: "Incidents", value: "3", subtext: "1 Death, 2 Injuries, 1 FIR", icon: AlertTriangle, color: "text-red-500" },
    { title: "Grievances", value: "8", subtext: "2 Pending, 1 Escalated", icon: MessageSquareWarning, color: "text-orange-500" },
    { title: "Directions", value: "5", subtext: "1 Pending (Aging > 3 days)", icon: ClipboardCheck, color: "text-purple-500" },
    { title: "Feedback", value: "12", subtext: "3 Pending (from Public)", icon: MessageSquareHeart, color: "text-pink-500" },
    { title: "Payment Status", value: "92%", subtext: "28 Pending, 2 Contractors Delayed", icon: Banknote, color: "text-green-600" },
    { title: "Medical Exams", value: "78%", subtext: "4 Follow-up, 12 Overdue", icon: HeartPulse, color: "text-red-600" },
    { title: "Casual Worker Alerts", value: "6", subtext: "High Absenteeism/Non-compliance", icon: UserX, color: "text-yellow-600" },
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

      {/* 🔹 2. Graphs & Charts */}
      <DashboardCharts />

      {/* 🔹 3. Quick Action Buttons */}
      <QuickActions onActionClick={handleQuickAction} />

      {/* 🔹 4. Worker Performance Snapshot */}
      <PerformanceSnapshot topWorkers={topWorkers} bottomWorkers={bottomWorkers} />
    </div>
  );
}

// --- Child Components ---

function SummaryCards({ data }: { data: SummaryCardData[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {data.map((item) => (
        <Card
          key={item.title}
          className="relative overflow-hidden bg-white shadow-lg border border-gray-100 rounded-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
        >
          <div className={`absolute top-4 right-4 p-2 rounded-lg bg-gray-100 ${item.color}`}>
            <item.icon className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-500">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-800">{item.value}</p>
            <p className="text-xs text-gray-500 mt-1 truncate" title={item.subtext}>{item.subtext}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DashboardCharts() {
  // Mock data for charts
  const workerPieData = [ { name: 'Ordinary', value: 270 }, { name: 'Hazardous', value: 15 }, { name: 'Ragpickers', value: 45 }, { name: 'Manual Scav.', value: 20 }, ];
  const incidentBarData = [ { name: 'Death', count: 1 }, { name: 'Injury', count: 2 }, { name: 'FIR Filed', count: 1 }, { name: 'Comp. Paid', count: 0 }, ];
  const compliancePieData = [ { name: 'Complied', value: 4 }, { name: 'Pending', value: 1 } ];
  const grievanceBarData = [ { name: 'Safety', Total: 3, Complied: 2, Pending: 1, Escalated: 0 }, { name: 'Payment', Total: 4, Complied: 2, Pending: 1, Escalated: 1 }, { name: 'Equipment', Total: 1, Complied: 1, Pending: 0, Escalated: 0 } ];
  const feedbackLineData = [ { month: 'Jan', Received: 5, Complied: 3, Pending: 2 }, { month: 'Feb', Received: 8, Complied: 5, Pending: 3 }, { month: 'Mar', Received: 6, Complied: 4, Pending: 2 } ];
  const trainingBarData = [ { name: 'Module A', Completed: 300, Pending: 50 }, { name: 'Module B', Completed: 250, Pending: 100 } ];
  const medicalPieData = [ { name: 'Completed', value: 273 }, { name: 'Follow-up', value: 4 }, { name: 'Overdue', value: 12 } ];
  const PIE_COLORS = { 'Ordinary': '#3b82f6', 'Hazardous': '#f97316', 'Ragpickers': '#eab308', 'Manual Scav.': '#ef4444' };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">📊 Visual Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Worker Distribution Pie */}
        <ChartCard title="Worker Distribution" icon={PieChartIcon} className="lg:col-span-1">
          <ChartFilters filters={['Caste', 'Religion', 'Gender', 'Age']} />
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={workerPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`} fontSize={11}>
                {workerPieData.map((entry) => (<Cell key={entry.name} fill={PIE_COLORS[entry.name as keyof typeof PIE_COLORS]} />))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Incident Bar Chart */}
        <ChartCard title="Incident Summary" icon={BarChart3} className="lg:col-span-2">
           <ChartFilters filters={['Date Range', 'Contractor', 'Location']} />
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={incidentBarData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Direction Compliance Pie */}
        <ChartCard title="Direction Compliance" icon={PieChartIcon} className="lg:col-span-1">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={compliancePieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} label={({ name, value }) => `${name}: ${value}`}>
                 <Cell fill="#22c55e" />
                 <Cell fill="#f97316" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Grievance Status Stacked Bar */}
        <ChartCard title="Grievance Status" icon={BarChart3} className="lg:col-span-2">
           <ChartFilters filters={['Source', 'Type', 'Contractor']} />
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={grievanceBarData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }}/>
              <Bar dataKey="Complied" stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Pending" stackId="a" fill="#f59e0b" />
              <Bar dataKey="Escalated" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Feedback Status Line Chart */}
        <ChartCard title="Feedback Status (Monthly)" icon={LineChartIcon} className="lg:col-span-2">
           <ChartFilters filters={['Source', 'Type']} />
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={feedbackLineData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }}/>
              <Line type="monotone" dataKey="Received" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="Complied" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="Pending" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Training Completion Bar */}
        <ChartCard title="Training Completion" icon={BarChart3} className="lg:col-span-1">
           <ChartFilters filters={['Contractor', 'Category']} />
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trainingBarData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="Completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        
        {/* Medical Examination Pie */}
        <ChartCard title="Medical Examination Tracker" icon={PieChartIcon} className="lg:col-span-3"> {/* Spanning full width */}
           <ChartFilters filters={['Contractor', 'Category']} />
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={medicalPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${value}`}>
                 <Cell fill="#22c55e" /> {/* Completed */}
                 <Cell fill="#f97316" /> {/* Follow-up */}
                 <Cell fill="#ef4444" /> {/* Overdue */}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  );
}

// Helper for Chart Cards
function ChartCard({ title, icon: Icon, className, children }: { title: string, icon: React.ElementType, className?: string, children: React.ReactNode }) {
  return (
    <Card className={`shadow-lg border border-gray-100 rounded-lg bg-white ${className || ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b bg-gray-50/70 p-4">
        <CardTitle className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <Icon className="w-5 h-5 text-indigo-600" />
          {title}
        </CardTitle>
        <Settings className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" /> {/* Placeholder for chart settings */}
      </CardHeader>
      <CardContent className="pt-4 px-2">
        {children}
      </CardContent>
    </Card>
  );
}

// Helper for Chart Filters
function ChartFilters({ filters }: { filters: string[] }) {
    return (
        <div className="flex flex-wrap gap-2 px-4 pb-3 border-b mb-2">
            {filters.map(f => (
                <Select key={f} onValueChange={(value) => console.log(`Filter ${f} set to ${value}`)}>
                    <SelectTrigger className="w-auto h-7 text-xs rounded-full border-gray-300">
                        <SelectValue placeholder={f} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="option1">{f} Option 1</SelectItem>
                        <SelectItem value="option2">{f} Option 2</SelectItem>
                    </SelectContent>
                </Select>
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
                  <TableHead>Attendance</TableHead>
                  <TableHead>Safety</TableHead>
                  <TableHead>Training</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topWorkers.map((w) => (
                  <TableRow key={w.rank} className="hover:bg-green-50/50">
                    <TableCell className="font-bold">{w.rank}</TableCell>
                    <TableCell className="font-medium">{w.name}</TableCell>
                    <TableCell className="text-green-600">{w.attendance}%</TableCell>
                    <TableCell className="text-green-600">{w.safety}%</TableCell>
                    <TableCell className="text-green-600">{w.training}%</TableCell>
                    <TableCell className="flex items-center gap-1 text-yellow-500"><Star className="w-4 h-4"/>{w.rating}</TableCell>
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
                  <TableHead>Absent (Days)</TableHead>
                  <TableHead>Violations</TableHead>
                  <TableHead>Pending (Train)</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bottomWorkers.map((w) => (
                  <TableRow key={w.rank} className="hover:bg-red-50/50">
                    <TableCell className="font-bold">{w.rank}</TableCell>
                    <TableCell className="font-medium">{w.name}</TableCell>
                    <TableCell className="text-red-600 font-medium">{w.absenteeism}</TableCell>
                    <TableCell className="text-red-600 font-medium">{w.violations}</TableCell>
                    <TableCell className="text-orange-600 font-medium">{w.pendingTraining}</TableCell>
                    <TableCell className="text-xs text-gray-600">{w.remarks}</TableCell>
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