"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"; // Assuming Shadcn UI Card
import { Button } from "@/components/ui/button"; // Assuming Shadcn UI Button
import { Badge } from "@/components/ui/badge"; // Assuming Shadcn UI Badge
import {
  TrendingUp,
  AlertTriangle,
  FileText,
  Phone,
  CheckCircle,
  Clock,
  Briefcase,         // Changed icon for Contractors
  Users,             // Changed icon for Workers
  FolderKanban,      // Changed icon for Total Cases
  FileCheck,         // Changed icon for Completed Investigations
  FolderClock,       // Changed icon for Pending Cases
  MessageSquareWarning,// Changed icon for Grievances
  ClipboardCheck,    // Changed icon for Directions Compliance
  DollarSign,        // Changed icon for Compensations
  Inbox,             // Changed icon for Feedbacks
  FilePlus,          // Changed icon for Add Investigation
  Reply,             // Changed icon for Submit Grievance Response
  Send,              // Changed icon for Reply to Direction
  BellRing,          // Changed icon for View Exception Alerts
  FileBarChart,      // Changed icon for Generate Summary
  PhoneForwarded,    // Changed icon for Contact DGP
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
  LineChart,
  Line,
  Legend,
  CartesianGrid, // Added for grid lines
} from "recharts";
// Removed duplicate import

// Updated page component
export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-gradient-to-br from-gray-50 to-indigo-100 min-h-screen">
      {/* 🔹 Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
          SP / CP Command Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Real-time monitoring, incident tracking, and performance overview.
        </p>
      </div>

      {/* 🔹 RHS Summary Cards */}
      <SummaryCards />

      {/* 🔹 Charts & Graphs */}
      <DashboardCharts />

      {/* 🔹 Quick Action Buttons */}
      <QuickActions />

      {/* 🔹 Case Tables & Alerts */}
      <CaseSummaryTables />
    </div>
  );
}

// Updated Summary Cards component
function SummaryCards() {
  const cards = [
    { title: "Total Contractors", value: "18", icon: Briefcase, color: "from-blue-500 to-blue-700" },
    { title: "Total Workers", value: "45", icon: Users, color: "from-green-500 to-emerald-600" },
    { title: "Total Incidents", value: "25", icon: AlertTriangle, color: "from-red-500 to-red-700" },
    { title: "Total Cases (FIR)", value: "15", icon: FolderKanban, color: "from-purple-500 to-purple-700" },
    { title: "Completed Investigations", value: "7", icon: FileCheck, color: "from-cyan-500 to-cyan-700" },
    { title: "Pending Cases", value: "8", icon: FolderClock, color: "from-amber-500 to-yellow-600" },
    { title: "Grievances", value: "12", subtext:"Replied: 9 | Pending: 3", icon: MessageSquareWarning, color: "from-yellow-400 to-orange-500 text-black" },
    { title: "Directions", value: "10", subtext:"Complied: 7 | Pending: 3", icon: ClipboardCheck, color: "from-gray-500 to-gray-700" },
    { title: "Compensations", value: "15", subtext:"Paid: 10 | Pending: 5", icon: DollarSign, color: "from-lime-500 to-green-600" },
    { title: "Feedbacks", value: "6", subtext:"Replied: 4 | Pending: 2", icon: Inbox, color: "from-pink-500 to-rose-600" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((item, i) => (
        <Card
          key={i}
          className={`relative overflow-hidden text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br ${item.color}`}
        >
          <div className="absolute top-0 right-0 p-3 opacity-20">
             <item.icon className="h-10 w-10" strokeWidth={1.5} />
          </div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-white/90">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-3xl font-bold">{item.value}</p>
            {item.subtext && <p className="text-xs text-white/80 mt-1">{item.subtext}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Updated Charts component
function DashboardCharts() {
    const pieData = [ { name: "Manual Scavenging Deaths", value: 6 }, { name: "Sewer Injuries", value: 10 }, { name: "Hazardous Exposure", value: 5 }, { name: "Other", value: 4 }, ];
    const barData = [ { station: "North PS", Initiated: 3, "In Progress": 4, Completed: 2 }, { station: "East PS", Initiated: 1, "In Progress": 3, Completed: 3 }, { station: "South PS", Initiated: 2, "In Progress": 1, Completed: 4 }, ];
    const lineData = [ { month: "Jan", Sanctioned: 200000, Paid: 180000, Pending: 20000 }, { month: "Feb", Sanctioned: 150000, Paid: 120000, Pending: 30000 }, { month: "Mar", Sanctioned: 250000, Paid: 220000, Pending: 30000 }, { month: "Apr", Sanctioned: 180000, Paid: 180000, Pending: 0 }, { month: "May", Sanctioned: 300000, Paid: 250000, Pending: 50000 }, ];
    const COLORS_PIE = ["#ef4444", "#f97316", "#eab308", "#84cc16"]; // Red, Orange, Yellow, Lime
    const COLORS_BAR = { Initiated: "#fbbf24", "In Progress": "#3b82f6", Completed: "#22c55e" }; // Amber, Blue, Green
    const COLORS_LINE = { Sanctioned: "#3b82f6", Paid: "#22c55e", Pending: "#f97316" }; // Blue, Green, Orange

  return (
    <div className="space-y-6">
       <h2 className="text-xl font-semibold text-gray-700">Analytics Overview</h2>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

         {/* Incident Category Pie */}
         <Card className="shadow-md lg:col-span-1">
           <CardHeader><CardTitle className="text-base font-semibold">Incident Categories</CardTitle></CardHeader>
           <CardContent className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                   {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />))}
                 </Pie>
                 <Tooltip />
               </PieChart>
             </ResponsiveContainer>
           </CardContent>
         </Card>

         {/* Investigation Status Bar */}
         <Card className="shadow-md lg:col-span-2">
           <CardHeader><CardTitle className="text-base font-semibold">Investigation Status by Station</CardTitle></CardHeader>
           <CardContent className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                 <XAxis dataKey="station" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis fontSize={12} tickLine={false} axisLine={false} />
                 <Tooltip cursor={{ fill: 'transparent' }}/>
                 <Legend wrapperStyle={{ fontSize: '12px' }}/>
                 <Bar dataKey="Initiated" stackId="a" fill={COLORS_BAR.Initiated} radius={[4, 4, 0, 0]} />
                 <Bar dataKey="In Progress" stackId="a" fill={COLORS_BAR["In Progress"]} />
                 <Bar dataKey="Completed" stackId="a" fill={COLORS_BAR.Completed} radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </CardContent>
         </Card>

         {/* Directions Compliance Pie */}
         <Card className="shadow-md lg:col-span-1">
           <CardHeader><CardTitle className="text-base font-semibold">Direction Compliance</CardTitle></CardHeader>
           <CardContent className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={[{ name: "Complied", value: 15 }, { name: "Pending", value: 4 }]} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} label={({ name, value }) => `${name}: ${value}`}>
                    <Cell fill={COLORS_BAR.Completed} />
                    <Cell fill={COLORS_BAR.Initiated} />
                 </Pie>
                 <Tooltip />
               </PieChart>
             </ResponsiveContainer>
           </CardContent>
         </Card>

         {/* Grievance Resolution Chart */}
         <Card className="shadow-md lg:col-span-1">
            <CardHeader><CardTitle className="text-base font-semibold">Grievance Status</CardTitle></CardHeader>
            <CardContent className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={[{ type: "Safety", Replied: 5, Pending: 2, Escalated: 1 }, { type: "Payment", Replied: 3, Pending: 4, Escalated: 2 }, { type: "Other", Replied: 8, Pending: 1, Escalated: 0 }]} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                 <XAxis dataKey="type" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis fontSize={12} tickLine={false} axisLine={false}/>
                 <Tooltip />
                 <Legend wrapperStyle={{ fontSize: '12px' }}/>
                 <Bar dataKey="Replied" fill={COLORS_BAR.Completed} radius={[4, 4, 0, 0]} />
                 <Bar dataKey="Pending" fill={COLORS_BAR.Initiated} radius={[4, 4, 0, 0]} />
                 <Bar dataKey="Escalated" fill={COLORS_PIE[0]} radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </CardContent>
         </Card>

          {/* Compensation Tracker Line */}
         <Card className="shadow-md lg:col-span-1">
           <CardHeader><CardTitle className="text-base font-semibold">Compensation Tracker</CardTitle></CardHeader>
           <CardContent className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={lineData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false}/>
                 <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`}/>
                 <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`}/>
                 <Legend wrapperStyle={{ fontSize: '12px' }}/>
                 <Line type="monotone" dataKey="Sanctioned" stroke={COLORS_LINE.Sanctioned} strokeWidth={2} dot={false}/>
                 <Line type="monotone" dataKey="Paid" stroke={COLORS_LINE.Paid} strokeWidth={2} dot={false}/>
                 <Line type="monotone" dataKey="Pending" stroke={COLORS_LINE.Pending} strokeWidth={2} dot={false}/>
               </LineChart>
             </ResponsiveContainer>
           </CardContent>
         </Card>
       </div>
    </div>
  );
}

// Updated Quick Actions component
function QuickActions() {
  const actions = [
    { text: "Add Investigation Update", icon: FilePlus, variant: "default" as const },
    { text: "Submit Grievance Response", icon: Reply, variant: "outline" as const },
    { text: "Reply to Direction", icon: Send, variant: "outline" as const },
    { text: "View Exception Alerts", icon: BellRing, variant: "destructive" as const },
    { text: "Generate Monthly Summary", icon: FileBarChart, variant: "outline" as const },
    { text: "Contact DGP Office", icon: PhoneForwarded, variant: "outline" as const },
  ];

  return (
    <Card className="shadow-md">
       <CardHeader><CardTitle className="text-base font-semibold">Quick Actions</CardTitle></CardHeader>
       <CardContent className="flex flex-wrap gap-3 justify-center sm:justify-start">
         {actions.map((action, i) => (
           <Button key={i} variant={action.variant} size="sm" className="flex items-center gap-2">
             <action.icon className="h-4 w-4" />
             {action.text}
           </Button>
         ))}
       </CardContent>
    </Card>
  );
}

// Updated Case Summary Tables component
function CaseSummaryTables() {
  return (
    <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">Case Management & Alerts</h2>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Recent Cases */}
          <Card className="shadow-md xl:col-span-2">
            <CardHeader><CardTitle className="text-base font-semibold">Recent Cases Snapshot</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm text-left border-collapse">
                <thead className="text-gray-600 border-b bg-gray-50">
                  <tr>
                    <th className="p-2 font-medium">Case ID</th>
                    <th className="p-2 font-medium">Type</th>
                    <th className="p-2 font-medium">Station</th>
                    <th className="p-2 font-medium">Status</th>
                    <th className="p-2 font-medium text-center">Days Since</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentCases.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                       <td className="p-2 font-medium">{row.id}</td>
                       <td className="p-2">{row.type}</td>
                       <td className="p-2">{row.station}</td>
                       <td className="p-2">
                         <Badge variant={row.status === 'Initiated' ? 'secondary' : 'default'} className={row.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : ''}>{row.status}</Badge>
                       </td>
                       <td className="p-2 text-center">{row.days}</td>
                    </tr>
                  ))}
                   {recentCases.length === 0 && (<tr><td colSpan={5} className="p-4 text-center text-gray-500">No recent cases</td></tr>)}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Escalated & Alerts */}
          <Card className="shadow-md bg-yellow-50 border-yellow-200">
             <CardHeader><CardTitle className="text-base font-semibold text-yellow-800 flex items-center gap-2"><AlertTriangle className="h-5 w-5"/>Critical Alerts & Escalations</CardTitle></CardHeader>
             <CardContent>
               <ul className="space-y-3 text-sm">
                 {escalatedCases.map(ec => (
                    <li key={ec.id} className="flex items-start gap-2 text-red-700">
                      <ReportProblem className="h-4 w-4 mt-0.5 flex-shrink-0"/>
                      <span><strong>Escalated Case {ec.id}:</strong> {ec.reason} to {ec.to} ({ec.date}). Response: <Badge variant="destructive">{ec.response}</Badge></span>
                    </li>
                 ))}
                 {compensationAlerts.filter(ca => ca.paid === 'No' && ca.days >= 30).map(ca => (
                    <li key={ca.incident} className="flex items-start gap-2 text-orange-700">
                      <DollarSign className="h-4 w-4 mt-0.5 flex-shrink-0"/>
                      <span><strong>Comp. Alert:</strong> {ca.worker} ({ca.incident}) - {ca.amount} pending for <span className="font-bold">{ca.days} days</span>.</span>
                    </li>
                 ))}
                  <li className="flex items-start gap-2 text-gray-600">
                      <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0"/>
                      <span>Check stations with {'>'}3 unresolved cases / {'>'}60 days comp delay.</span>
                  </li>
               </ul>
                {escalatedCases.length === 0 && compensationAlerts.filter(ca => ca.paid === 'No' && ca.days >= 30).length === 0 && (
                    <p className="text-sm text-gray-500 text-center mt-2">No critical alerts.</p>
                )}
             </CardContent> 
          </Card>

           {/* Station Breakdown */}
          <Card className="shadow-md xl:col-span-3">
            <CardHeader><CardTitle className="text-base font-semibold">Police Station Performance</CardTitle></CardHeader>
            <CardContent>
               <table className="w-full text-sm text-left border-collapse">
                <thead className="text-gray-600 border-b bg-gray-50">
                  <tr>
                    <th className="p-2 font-medium">Station</th>
                    <th className="p-2 font-medium text-center">Incidents</th>
                    <th className="p-2 font-medium text-center">FIRs</th>
                    <th className="p-2 font-medium text-center">Pending</th>
                    <th className="p-2 font-medium text-center">Charge Sheets</th>
                    <th className="p-2 font-medium text-center">Grievances</th>
                    <th className="p-2 font-medium text-center">Directions</th>
                    <th className="p-2 font-medium text-center">Comp. Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                   {stationBreakdown.map(row => (
                    <tr key={row.station} className="hover:bg-gray-50">
                       <td className="p-2 font-medium flex items-center gap-2"><LocalPolice className="h-4 w-4 text-blue-600"/>{row.station}</td>
                       <td className="p-2 text-center">{row.incidents}</td>
                       <td className="p-2 text-center">{row.firs}</td>
                       <td className={`p-2 text-center font-bold ${row.pending > 0 ? 'text-red-600' : 'text-green-600'}`}>{row.pending}</td>
                       <td className="p-2 text-center">{row.charges}</td>
                       <td className="p-2 text-center">{row.grievances}</td>
                       <td className="p-2 text-center">{row.directions}</td>
                       <td className="p-2 text-center">{row.compPaid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}

// Dummy LocalPolice icon if not imported from lucide-react or MUI
const LocalPolice = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
  </svg>
);

// Correcting icon imports
import { ReportProblem } from '@mui/icons-material';

// Ensuring variables are properly scoped
const recentCases = [
  { id: 'CASE-005', type: 'Sewer Injury', station: 'North PS', status: 'In Progress', fir: 'Yes', days: 2 },
  { id: 'CASE-004', type: 'Manual Scavenging Death', station: 'Central PS', status: 'Initiated', fir: 'Yes', days: 1 },
];

const escalatedCases = [
  { id: 'CASE-001', reason: 'Investigation Delay >30d', to: 'DGP', date: '2025-10-20', response: 'Pending' },
];

const compensationAlerts = [
  { worker: 'Sita Devi', incident: 'INC-002', amount: '₹5 Lakh', paid: 'No', days: 50 },
  { worker: 'Ramesh Kumar', incident: 'INC-001', amount: '₹10 Lakh', paid: 'Yes', days: 0 },
];

const stationBreakdown = [
  { station: 'Central PS', incidents: 10, firs: 7, pending: 3, charges: 2, compPaid: 5, grievances: 4, directions: 3 },
  { station: 'North PS', incidents: 8, firs: 5, pending: 2, charges: 3, compPaid: 4, grievances: 5, directions: 4 },
  { station: 'West PS', incidents: 7, firs: 3, pending: 3, charges: 2, compPaid: 3, grievances: 3, directions: 3 },
];

// Adding explicit types
recentCases.map((row: { id: string; type: string; station: string; status: string; fir: string; days: number }) => {
  // ...existing code...
});

escalatedCases.map((ec: { id: string; reason: string; to: string; date: string; response: string }) => {
  // ...existing code...
});

compensationAlerts.filter((ca: { worker: string; incident: string; amount: string; paid: string; days: number }) => ca.paid === 'No' && ca.days >= 30).map((ca) => {
  // ...existing code...
});

stationBreakdown.map((row: { station: string; incidents: number; firs: number; pending: number; charges: number; grievances: number; directions: number; compPaid: number }) => {
  // ...existing code...
});

// Fixing div reference issue
<div>{'>'}3 unresolved cases / {'>'}60 days comp delay.</div>