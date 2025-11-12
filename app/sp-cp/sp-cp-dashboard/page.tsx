"use client";

import React, { useState, useEffect } from "react"; // Added useEffect for potential data fetching
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"; //a
import { Button } from "@/components/ui/button"; // Assuming Shadcn UI Button
import { Badge } from "@/components/ui/badge"; // Assuming Shadcn UI Badge
import StatCard from "@/components/ui/stat-card";
import {
  TrendingUp,
  AlertTriangle,
  FileText,
  Phone,
  CheckCircle,
  Clock,
  Briefcase,
  Users,
  FolderKanban,
  FileCheck,
  FolderClock,
  MessageSquareWarning,
  ClipboardCheck,
  DollarSign,
  Inbox,
  FilePlus,
  Reply,
  Send,
  BellRing,
  FileBarChart,
  PhoneForwarded,
  // AlertTriangle, // Replacing with a valid icon from lucide-react
  Shield,   // Replacing with a valid icon from lucide-react
  // WarningAmber,    // Removed as it is not exported by lucide-react
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
  CartesianGrid,
} from "recharts";
import {
    Box, // Added MUI Box
    List, // Added MUI List
    ListItem, // Added MUI ListItem
    ListItemIcon, // Added MUI ListItemIcon
    ListItemText, // Added MUI ListItemText
    Paper, // Added MUI Paper
    Table, // Added MUI Table
    TableBody, // Added MUI TableBody
    TableCell, // Added MUI TableCell
    TableContainer, // Added MUI TableContainer
    TableHead, // Added MUI TableHead
    TableRow, // Added MUI TableRow
    Typography // Added MUI Typography
} from "@mui/material"; // Added necessary MUI imports for tables/lists
import ReportProblem from "@mui/icons-material/ReportProblem"; // Added MUI ReportProblem icon

// --- INTERFACES FOR DATA ---
import { LucideIcon } from "lucide-react"; // Ensure this import exists

interface SummaryCardData {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'indigo' | 'emerald' | 'amber' | 'sky' | 'violet' | 'pink';
  subtitle?: string;
}
interface RecentCase {
  id: string;
  type: string;
  station: string;
  status: string;
  fir: string;
  days: number;
}
interface EscalatedCase {
    id: string;
    reason: string;
    to: string;
    date: string;
    response: string;
}
interface CompensationAlert {
    worker: string;
    incident: string;
    amount: string;
    paid: string;
    days: number;
}
interface StationData {
    station: string;
    incidents: number;
    firs: number;
    pending: number;
    charges: number;
    grievances: number;
    directions: number;
    compPaid: number;
}

// --- INITIAL MOCK DATA ---
const initialCardsData: SummaryCardData[] = [
    { title: "Total Contractors", value: "18", icon: Briefcase, color: "blue" },
    { title: "Total Workers", value: "45", icon: Users, color: "emerald" },
    { title: "Total Incidents", value: "25", icon: AlertTriangle, color: "red" },
    { title: "Total Cases (FIR)", value: "15", icon: FolderKanban, color: "purple" },
    { title: "Completed Investigations", value: "7", icon: FileCheck, color: "sky" },
    { title: "Pending Cases", value: "8", icon: FolderClock, color: "amber" },
    { title: "Grievances", value: "12", subtitle:"Replied: 9 | Pending: 3", icon: MessageSquareWarning, color: "orange" },
    { title: "Directions", value: "10", subtitle:"Complied: 7 | Pending: 3", icon: ClipboardCheck, color: "indigo" },
    { title: "Compensations", value: "15", subtitle:"Paid: 10 | Pending: 5", icon: DollarSign, color: "green" },
    { title: "Feedbacks", value: "6", subtitle:"Replied: 4 | Pending: 2", icon: Inbox, color: "pink" },
];
const initialRecentCases: RecentCase[] = [
    { id: 'CASE-005', type: 'Sewer Injury', station: 'North PS', status: 'In Progress', fir: 'Yes', days: 2 },
    { id: 'CASE-004', type: 'Manual Scavenging Death', station: 'Central PS', status: 'Initiated', fir: 'Yes', days: 1 },
];
const initialEscalatedCases: EscalatedCase[] = [
    { id: 'CASE-001', reason: 'Investigation Delay >30d', to: 'DGP', date: '2025-10-20', response: 'Pending' },
];
const initialCompensationAlerts: CompensationAlert[] = [
    { worker: 'Sita Devi', incident: 'INC-002', amount: '₹5 Lakh', paid: 'No', days: 50 },
    { worker: 'Ramesh Kumar', incident: 'INC-001', amount: '₹10 Lakh', paid: 'Yes', days: 0 },
];
const initialStationBreakdown: StationData[] = [
    { station: 'Central PS', incidents: 10, firs: 7, pending: 3, charges: 2, compPaid: 5, grievances: 4, directions: 3 },
    { station: 'North PS', incidents: 8, firs: 5, pending: 2, charges: 3, compPaid: 4, grievances: 5, directions: 4 },
    { station: 'West PS', incidents: 7, firs: 3, pending: 3, charges: 2, compPaid: 3, grievances: 3, directions: 3 },
];

// Updated page component with state
export default function DashboardPage() {
    // --- USER ROLE DETECTION WITH URL SYNC ---
    const [userRole, setUserRole] = useState<'SP' | 'CP'>('SP');
    
    // Get URL search params to sync with layout
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const roleParam = urlParams.get('role');
        if (roleParam === 'sp' || roleParam === 'cp') {
            setUserRole(roleParam.toUpperCase() as 'SP' | 'CP');
        } else {
            // Set default role in URL if not present
            const url = new URL(window.location.href);
            url.searchParams.set('role', 'sp');
            window.history.replaceState({}, '', url.toString());
        }
    }, []);
    
    const router = useRouter();
    
    // Update URL when role changes
    const handleRoleChange = (newRole: 'SP' | 'CP') => {
        setUserRole(newRole);
        const url = new URL(window.location.href);
        url.searchParams.set('role', newRole.toLowerCase());
        window.history.replaceState({}, '', url.toString());
        // Refresh to update the layout
        router.refresh();
    };
    
    // --- STATE VARIABLES ---
    const [cardsData, setCardsData] = useState<SummaryCardData[]>(initialCardsData);
    const [recentCases, setRecentCases] = useState<RecentCase[]>(initialRecentCases);
    const [escalatedCases, setEscalatedCases] = useState<EscalatedCase[]>(initialEscalatedCases);
    const [compensationAlerts, setCompensationAlerts] = useState<CompensationAlert[]>(initialCompensationAlerts);
    const [stationBreakdown, setStationBreakdown] = useState<StationData[]>(initialStationBreakdown);

    // --- EFFECT FOR DATA FETCHING (Example) ---
    // useEffect(() => {
    //   // Replace with actual API calls
    //   // fetch('/api/spcp/summary').then(res => res.json()).then(data => setCardsData(data));
    //   // fetch('/api/spcp/recent-cases').then(res => res.json()).then(data => setRecentCases(data));
    //   // ... fetch other data
    // }, []);

    // --- EVENT HANDLERS ---
    const handleQuickAction = (actionText: string) => {
        console.log(`Action clicked: ${actionText}`);
        // Add logic here, e.g., open a modal
        // if (actionText === "Add Investigation Update") {
        //   setInvestigationModalOpen(true);
        // }
    };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 min-h-screen w-full">
      {/* District-style title banner */}
      <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">{userRole} Command Dashboard</h1>
            <p className="text-sm text-white/90 mt-1">Real-time monitoring, incident tracking, and performance overview.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 hidden md:block" aria-hidden />
        </div>
      </div>

      {/* 🔹 RHS Summary Cards */}
      <SummaryCards cards={cardsData} /> {/* Pass state data */}

      {/* 🔹 Charts & Graphs */}
      <DashboardCharts /> {/* Charts use static data for now */}

      {/* 🔹 Quick Action Buttons */}
      <QuickActions onActionClick={handleQuickAction} /> {/* Pass handler */}

      {/* 🔹 Case Tables & Alerts */}
      <CaseSummaryTables
          recentCases={recentCases}
          escalatedCases={escalatedCases}
          compensationAlerts={compensationAlerts}
          stationBreakdown={stationBreakdown}
      /> {/* Pass state data */}
    </div>
  );
}

// Updated Summary Cards component - accepts props
function SummaryCards({ cards }: { cards: SummaryCardData[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((item, i) => (
        <StatCard
          key={i}
          title={item.title}
          value={item.value}
          subtitle={item.subtitle}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
}

// Updated Charts component (still uses static data internally)
function DashboardCharts() {
    const pieData = [ { name: "Manual Scavenging Deaths", value: 6 }, { name: "Sewer Injuries", value: 10 }, { name: "Hazardous Exposure", value: 5 }, { name: "Other", value: 4 }, ];
    const lineData = [ { month: "Jan", Sanctioned: 200000, Paid: 180000, Pending: 20000 }, { month: "Feb", Sanctioned: 150000, Paid: 120000, Pending: 30000 }, { month: "Mar", Sanctioned: 250000, Paid: 220000, Pending: 30000 }, { month: "Apr", Sanctioned: 180000, Paid: 180000, Pending: 0 }, { month: "May", Sanctioned: 300000, Paid: 250000, Pending: 50000 }, ];
    const COLORS_PIE = ["#ef4444", "#f97316", "#eab308", "#84cc16"];
    const COLORS_LINE = { Sanctioned: "#3b82f6", Paid: "#22c55e", Pending: "#f97316" };

  return (
    <div className="space-y-6">
       <h2 className="text-xl font-semibold text-gray-700">Analytics Overview</h2>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Charts remain the same, using internal static data */}
         <Card className="shadow-md lg:col-span-1">
           <CardHeader><CardTitle className="text-base font-semibold">Incident Categories</CardTitle></CardHeader>
           <CardContent className="h-96">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie 
                   data={pieData} 
                   dataKey="value" 
                   nameKey="name" 
                   cx="50%" 
                   cy="50%" 
                   outerRadius={90}
                   innerRadius={25}
                   labelLine={true}
                   label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                   style={{ fontSize: '12px', fontWeight: 'bold' }}
                 >
                   {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />))}
                 </Pie>
                 <Tooltip 
                   formatter={(value, name) => [`${value} cases`, name]}
                   labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                   contentStyle={{ 
                     backgroundColor: 'white', 
                     border: '1px solid #e5e7eb', 
                     borderRadius: '8px',
                     fontSize: '14px'
                   }}
                 />
                 <Legend 
                   verticalAlign="bottom" 
                   height={36}
                   wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                   iconType="circle"
                 />
               </PieChart>
             </ResponsiveContainer>
           </CardContent>
         </Card>
         <Card className="shadow-md lg:col-span-1">
           <CardHeader><CardTitle className="text-base font-semibold">Compensation Tracker</CardTitle></CardHeader>
           <CardContent className="h-96">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={lineData} margin={{ top: 10, right: 30, left: -10, bottom: 10 }}>
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

// Updated Quick Actions component - accepts props
function QuickActions({ onActionClick }: { onActionClick: (action: string) => void }) {
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
           <Button
             key={i}
             variant={action.variant}
             size="sm"
             className="flex items-center gap-2"
             onClick={() => onActionClick(action.text)} // Added onClick handler
           >
             <action.icon className="h-4 w-4" />
             {action.text}
           </Button>
         ))}
       </CardContent>
    </Card>
  );
}

// Updated Case Summary Tables component - accepts props
function CaseSummaryTables({ recentCases, escalatedCases, compensationAlerts, stationBreakdown }: {
    recentCases: RecentCase[];
    escalatedCases: EscalatedCase[];
    compensationAlerts: CompensationAlert[];
    stationBreakdown: StationData[];
}) {
  return (
    <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">Case Management & Alerts</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Recent Cases */}
          <Card className="shadow-md xl:col-span-1">
            <CardHeader><CardTitle className="text-base font-semibold">Recent Cases Snapshot</CardTitle></CardHeader>
            <CardContent>
              {/* Using MUI Table for consistency with previous example - ensure MUI is installed and configured */}
              <TableContainer component={Paper} elevation={0} variant="outlined">
                <Table size="small">
                  <TableHead sx={{ backgroundColor: 'grey.100' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'medium' }}>Case ID</TableCell>
                      <TableCell sx={{ fontWeight: 'medium' }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 'medium' }}>Station</TableCell>
                      <TableCell sx={{ fontWeight: 'medium' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'medium' }} align="center">Days Since</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentCases.map((row) => (
                      <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell sx={{ fontWeight: 'medium' }}>{row.id}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.station}</TableCell>
                        <TableCell>
                          {/* Using Shadcn Badge */}
                          <Badge variant={row.status === 'Initiated' ? 'secondary' : 'default'} className={row.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : ''}>{row.status}</Badge>
                        </TableCell>
                        <TableCell align="center">{row.days}</TableCell>
                      </TableRow>
                    ))}
                    {recentCases.length === 0 && (
                      <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>No recent cases</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Escalated & Alerts */}
          <Card className="shadow-md bg-yellow-50 border-yellow-200">
             <CardHeader><CardTitle className="text-base font-semibold text-yellow-800 flex items-center gap-2"><AlertTriangle className="h-5 w-5"/>Critical Alerts & Escalations</CardTitle></CardHeader>
             <CardContent>
               {/* Using MUI List */}
               <List dense>
                 {escalatedCases.map(ec => (
                    <ListItem key={ec.id} divider sx={{ alignItems: 'flex-start', py: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}><ReportProblem color="error" fontSize="small"/></ListItemIcon>
                        <ListItemText
                            primary={`Escalated Case ${ec.id}`}
                            secondary={
                                <React.Fragment>
                                <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'block' }}>
                                    {ec.reason} to {ec.to} ({ec.date})
                                </Typography>
                                Response: <Badge variant="destructive" className="ml-1">{ec.response}</Badge>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                 ))}
                 {compensationAlerts.filter(ca => ca.paid === 'No' && ca.days >= 30).map(ca => (
                    <ListItem key={ca.incident} divider sx={{ alignItems: 'flex-start', py: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}><DollarSign className="h-4 w-4 text-red-700"/></ListItemIcon>
                         <ListItemText
                            primary={`Comp. Alert: ${ca.worker} (${ca.incident})`}
                            secondary={
                                <Typography component="span" variant="body2" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                                    {ca.amount} pending for {ca.days} days
                                </Typography>
                            }
                         />
                    </ListItem>
                 ))}
                  <ListItem sx={{ alignItems: 'flex-start', py: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}><AlertTriangle className="h-5 w-5 text-yellow-600" /></ListItemIcon>
                        <ListItemText
                            primary="Exception Alerts"
                            secondary="Check stations with >3 unresolved cases / >60 days comp delay."
                        />
                  </ListItem>
               </List>
                {escalatedCases.length === 0 && compensationAlerts.filter(ca => ca.paid === 'No' && ca.days >= 30).length === 0 && (
                    <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 2}}>No critical alerts currently.</Typography>
                )}
             </CardContent>
          </Card>


        </div>
    </div>
  );
}

// Dummy LocalPolice icon if not imported from lucide-react or MUI
const LocalPolice = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" {...props}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
  </svg>
);