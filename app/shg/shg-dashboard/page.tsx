"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/ui/stat-card";
import {
  Users,
  Briefcase,
  FilePlus,
  FileText,
  CreditCard,
  Wallet,
  Banknote,
  AlertTriangle,
  ClipboardCheck,
  DollarSign,
  Shield,
  PieChart as PieIcon,
  BarChart as BarIcon,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Area,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import IntegratedLoader from '@/components/layout/IntegratedLoader';

// --- TYPES ---
interface SHGMember { id: string; name: string; age: number; gender: string; caste?: string; aadhaar?: string; role?: string; training?: string; bankLinked?: boolean; }
interface Project { id: string; title: string; scheme: string; loanSanctioned: number; status: string; assets: string; manpower: number; paymentReceived: number; salaryPaid: number; remarks?: string }
interface SchemeCard { id: string; name: string; type: string; eligibility: string; benefits: string; deadline?: string }
interface Benefit { id: string; title: string; type: string; description: string }
interface Application { id: string; applicant: string; scheme: string; type: string; status: string; submittedOn: string }

// --- MOCK DATA ---
const initialMembers: SHGMember[] = [
  { id: 'M-001', name: 'Sunita Devi', age: 34, gender: 'F', caste: 'SC', aadhaar: 'XXXX-XXXX-1111', role: 'Leader', training: 'Completed', bankLinked: true },
  { id: 'M-002', name: 'Gopal Yadav', age: 40, gender: 'M', caste: 'OBC', aadhaar: 'XXXX-XXXX-2222', role: 'Member', training: 'Pending', bankLinked: false },
];

const initialProjects: Project[] = [
  { id: 'P-001', title: 'Street Cleaning', scheme: 'Urban Sanitation', loanSanctioned: 50000, status: 'Ongoing', assets: 'Cart, Brooms', manpower: 6, paymentReceived: 45000, salaryPaid: 30000, remarks: 'Monthly target ongoing' },
  { id: 'P-002', title: 'Compost Unit', scheme: 'Eco Grants', loanSanctioned: 120000, status: 'Completed', assets: 'Shredders', manpower: 4, paymentReceived: 120000, salaryPaid: 70000 },
];

const initialSchemes: SchemeCard[] = [
  { id: 'S-001', name: 'Micro Loan', type: 'Loan', eligibility: 'SHG groups with 3+ members', benefits: 'Up to ₹2 Lakh', deadline: '2025-12-31' },
  { id: 'S-002', name: 'Health Cover', type: 'Insurance', eligibility: 'All SKs', benefits: 'Hospitalization cover', deadline: 'Ongoing' },
];

const initialBenefits: Benefit[] = [
  { id: 'B-001', title: 'Skill Training', type: 'Grant', description: 'Free skill development courses for members' },
  { id: 'B-002', title: 'Emergency Relief', type: 'Relief', description: 'Immediate support for critical events' },
];

const initialApplications: Application[] = [
  { id: 'A-001', applicant: 'SHG - Sunita', scheme: 'Micro Loan', type: 'SHG', status: 'Under Review', submittedOn: '2025-09-20' },
];

// --- SUMMARY CARDS DATA ---
const summaryCards = [
  // Row 1
  { title: 'SHG Members', value: '12', icon: Users, color: 'blue' as const },
  { title: 'Active Projects', value: '4', icon: Briefcase, color: 'green' as const },
  { title: 'Loan Sanctioned', value: '₹1.4L', icon: CreditCard, color: 'amber' as const },
  // Row 2
  { title: 'Loan Balance', value: '₹40k', icon: Wallet, color: 'red' as const },
  { title: 'Assets', value: '8', icon: Banknote, color: 'sky' as const },
  { title: 'Applications', value: '2', icon: FileText, color: 'indigo' as const },
];

export default function SHGDashboardPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);
  const [members] = useState<SHGMember[]>(initialMembers);
  const [projects] = useState<Project[]>(initialProjects);
  const [schemes] = useState<SchemeCard[]>(initialSchemes);
  const [benefits] = useState<Benefit[]>(initialBenefits);
  const [applications] = useState<Application[]>(initialApplications);

  if (loading) return <IntegratedLoader />;

  const handleAction = (text: string) => { console.log('Action:', text); };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 min-h-screen">
      {/* Title banner — styled to match District Dashboard reference image */}
      <div className="w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 rounded-lg p-6 shadow-md text-white mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          SHG Dashboard — NSKFDC Beneficiary
        </h1>
        <p className="text-sm sm:text-base text-white/90 max-w-3xl mt-1">
          Manage members, projects, finances, schemes and applications from the web portal.
        </p>
      </div>

      {/* --- Summary Metrics --- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </section>

      <DashboardCharts projects={projects} />

      <QuickActions onActionClick={handleAction} />

      <div className="space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-800 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-slate-700" />
          Core Modules
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="shadow-md lg:col-span-1 hover:shadow-xl transition-all duration-300 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base font-semibold text-slate-800 flex items-center gap-2">
                <Users className="h-4 w-4 text-indigo-600" />
                My SHG
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Typography variant="subtitle2" className="mb-3 font-semibold text-slate-700">Members</Typography>
              <List dense>
                {members.map(m => (
                  <ListItem key={m.id} divider className="hover:bg-slate-50 transition-colors rounded">
                    <ListItemIcon><Users className="h-4 w-4 text-indigo-600" /></ListItemIcon>
                    <ListItemText 
                      primary={<span className="font-medium text-slate-800">{`${m.name} (${m.role})`}</span>}
                      secondary={<span className="text-xs text-slate-600">{`Age ${m.age} • Bank: ${m.bankLinked ? 'Yes' : 'No'}`}</span>}
                    />
                  </ListItem>
                ))}
              </List>
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <Button variant="default" size="sm" className="flex-1" onClick={() => handleAction('Edit Members')}>Manage Members</Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleAction('Upload Docs')}>Upload Docs</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md lg:col-span-2 hover:shadow-xl transition-all duration-300 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base font-semibold text-slate-800 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-emerald-600" />
                My Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <TableContainer component={Paper} elevation={0} className="rounded-lg border border-slate-200">
                <Table size="small">
                  <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                    <TableRow>
                      <TableCell className="font-semibold text-slate-700">Project</TableCell>
                      <TableCell className="font-semibold text-slate-700">Scheme</TableCell>
                      <TableCell align="center" className="font-semibold text-slate-700">Loan</TableCell>
                      <TableCell align="center" className="font-semibold text-slate-700">Status</TableCell>
                      <TableCell align="center" className="font-semibold text-slate-700">Manpower</TableCell>
                      <TableCell align="center" className="font-semibold text-slate-700">Salary Paid</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projects.map(p => (
                      <TableRow key={p.id} hover className="hover:bg-slate-50 transition-colors">
                        <TableCell className="font-medium text-slate-800">{p.title}</TableCell>
                        <TableCell className="text-slate-600">{p.scheme}</TableCell>
                        <TableCell align="center" className="font-medium text-slate-800">₹{p.loanSanctioned.toLocaleString()}</TableCell>
                        <TableCell align="center">
                          <Badge className={p.status === 'Completed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-100 text-blue-700 border-blue-200'}>
                            {p.status}
                          </Badge>
                        </TableCell>
                        <TableCell align="center" className="text-slate-700">{p.manpower}</TableCell>
                        <TableCell align="center" className="font-medium text-emerald-600">₹{p.salaryPaid.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base font-semibold text-slate-800 flex items-center gap-2">
                <FilePlus className="h-4 w-4 text-purple-600" />
                New Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <List dense>
                {applications.map(a => (
                  <ListItem key={a.id} divider className="hover:bg-slate-50 transition-colors rounded">
                    <ListItemIcon><FilePlus className="h-4 w-4 text-purple-600" /></ListItemIcon>
                    <ListItemText 
                      primary={<span className="font-medium text-slate-800">{`${a.scheme} — ${a.applicant}`}</span>}
                      secondary={<span className="text-xs text-slate-600">{`${a.status} • ${a.submittedOn}`}</span>}
                    />
                  </ListItem>
                ))}
              </List>
              <div className="mt-4">
                <Button size="sm" className="w-full" onClick={() => handleAction('View Applications')}>View All</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base font-semibold text-slate-800 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                New Schemes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {schemes.map(s => (
                  <div key={s.id} className="p-3 sm:p-4 border border-slate-200 rounded-lg bg-gradient-to-br from-white to-slate-50/50 hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">{s.name}</div>
                        <div className="text-xs text-slate-500 mt-1">{s.type} • {s.eligibility}</div>
                      </div>
                      <div className="text-xs text-slate-600 whitespace-nowrap">{s.deadline}</div>
                    </div>
                    <div className="mt-2 text-sm text-slate-600">{s.benefits}</div>
                    <div className="mt-3">
                      <Button size="sm" className="w-full" onClick={() => handleAction('Apply:'+s.id)}>Apply Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base font-semibold text-slate-800 flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-pink-600" />
                Benefits Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <List dense>
                {benefits.map(b => (
                  <ListItem key={b.id} divider className="hover:bg-slate-50 transition-colors rounded">
                    <ListItemIcon><ClipboardCheck className="h-4 w-4 text-pink-600" /></ListItemIcon>
                    <ListItemText 
                      primary={<span className="font-medium text-slate-800">{b.title}</span>}
                      secondary={<span className="text-xs text-slate-600">{b.description}</span>}
                    />
                    <Button size="sm" variant="outline" onClick={() => handleAction('Claim:'+b.id)}>Apply</Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </div>

        <AdminPanel members={members} />
      </div>
    </div>
  );
}



function DashboardCharts({ projects }: { projects: Project[] }) {
  const pieData = [ { name: 'Loans', value: 3 }, { name: 'Grants', value: 1 }, { name: 'Insurance', value: 2 } ];
  const barData = projects.map(p => ({ project: p.title, Ongoing: p.status === 'Ongoing' ? 1 : 0, Completed: p.status === 'Completed' ? 1 : 0 }));
  const lineData = [ { month: 'Jan', income: 20000 }, { month: 'Feb', income: 30000 }, { month: 'Mar', income: 25000 }, { month: 'Apr', income: 40000 } ];
  
  // Enhanced color scheme with gradients
  const COLORS = {
    primary: ['#3b82f6', '#2563eb'],
    success: ['#10b981', '#059669'],
    warning: ['#f59e0b', '#d97706'],
    info: ['#06b6d4', '#0891b2']
  };

  // Custom tooltip styles
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-lg">
          <p className="text-sm font-medium text-slate-900">{label}</p>
          {payload.map((pld: any, idx: number) => (
            <p key={idx} className="text-sm" style={{ color: pld.color }}>
              {pld.name}: {typeof pld.value === 'number' ? 
                (pld.name.toLowerCase().includes('income') ? 
                  `₹${pld.value.toLocaleString()}` : 
                  pld.value.toLocaleString()) 
                : pld.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-800 flex items-center gap-2">
        <Activity className="h-5 w-5 text-blue-600" />
        Analytics & Finance
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <Card className="shadow-md md:col-span-1 hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm sm:text-base flex items-center gap-2">
              <PieIcon className="h-4 w-4 text-blue-500" />
              Scheme Mix
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[240px] sm:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {Object.entries(COLORS).map(([key, [start, end]], idx) => (
                    <linearGradient key={key} id={`color${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={start} stopOpacity={1}/>
                      <stop offset="100%" stopColor={end} stopOpacity={1}/>
                    </linearGradient>
                  ))}
                </defs>
                <Pie 
                  data={pieData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60}
                  outerRadius={80} 
                  paddingAngle={5}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={idx} fill={`url(#color${idx})`} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md md:col-span-1 hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm sm:text-base flex items-center gap-2">
              <BarIcon className="h-4 w-4 text-emerald-500" />
              Project Status
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[240px] sm:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={barData} 
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                barGap={0}
                barSize={32}
              >
                <defs>
                  <linearGradient id="barColor1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.9}/>
                  </linearGradient>
                  <linearGradient id="barColor2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0.9}/>
                  </linearGradient>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15"/>
                  </filter>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke="#e5e7eb" 
                  opacity={0.5}
                />
                <XAxis 
                  dataKey="project" 
                  tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={{ stroke: '#e5e7eb' }}
                  padding={{ left: 16, right: 16 }}
                />
                <YAxis 
                  tick={{ fill: '#4b5563', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={{ stroke: '#e5e7eb' }}
                  tickCount={5}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(229, 231, 235, 0.2)' }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  wrapperStyle={{ 
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    fontSize: '13px',
                    fontWeight: 500
                  }}
                  iconType="circle"
                  iconSize={8}
                />
                <Bar 
                  dataKey="Ongoing" 
                  stackId="a" 
                  fill="url(#barColor1)"
                  radius={[6, 6, 0, 0]}
                  animationBegin={200}
                  animationDuration={1200}
                  animationEasing="ease-out"
                  filter="url(#shadow)"
                  onMouseEnter={(data, index) => {
                    // Add hover effect if needed
                  }}
                />
                <Bar 
                  dataKey="Completed" 
                  stackId="a" 
                  fill="url(#barColor2)"
                  radius={[6, 6, 0, 0]}
                  animationBegin={400}
                  animationDuration={1200}
                  animationEasing="ease-out"
                  filter="url(#shadow)"
                  onMouseEnter={(data, index) => {
                    // Add hover effect if needed
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md md:col-span-1 hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm sm:text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-500" />
              Income Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[240px] sm:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={lineData} 
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.info[0]} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={COLORS.info[1]} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#e5e7eb" 
                  vertical={false}
                />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  tickFormatter={(v) => `₹${v/1000}k`}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke={COLORS.info[0]}
                  fillOpacity={1}
                  fill="url(#lineColor)"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke={COLORS.info[0]}
                  strokeWidth={2}
                  dot={{ r: 4, fill: COLORS.info[0] }}
                  activeDot={{ r: 6, fill: COLORS.info[1] }}
                  animationBegin={200}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function QuickActions({ onActionClick }: { onActionClick: (a: string) => void }) {
  const actions = [
    { text: 'New Application', icon: FilePlus, color: 'text-blue-600 hover:bg-blue-50' },
    { text: 'Apply Benefit', icon: FileText, color: 'text-purple-600 hover:bg-purple-50' },
    { text: 'Add Member', icon: Users, color: 'text-indigo-600 hover:bg-indigo-50' },
    { text: 'Submit Monthly Report', icon: FileText, color: 'text-emerald-600 hover:bg-emerald-50' },
    { text: 'Link Bank', icon: Shield, color: 'text-cyan-600 hover:bg-cyan-50' },
    { text: 'Raise a Voice', icon: AlertTriangle, color: 'text-orange-600 hover:bg-orange-50' },
  ];

  return (
    <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm sm:text-base font-semibold text-slate-800 flex items-center gap-2">
          <Activity className="h-4 w-4 text-slate-700" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2 sm:gap-3">
        {actions.map((a, i) => (
          <Button 
            key={i} 
            size="sm" 
            variant="outline" 
            className={`flex items-center gap-2 transition-all duration-200 ${a.color}`}
            onClick={() => onActionClick(a.text)}
          >
            <a.icon className="h-4 w-4" />
            <span className="text-xs sm:text-sm">{a.text}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

function AdminPanel({ members }: { members: SHGMember[] }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-lg sm:text-xl font-semibold text-slate-800 flex items-center gap-2">
        <Shield className="h-5 w-5 text-slate-700" />
        SHG Admin Controls
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-indigo-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-800 flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-600" />
              Member Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="body2" className="text-slate-600">Add / Edit SHG members and their roles.</Typography>
            <div className="mt-3">
              <Button size="sm" className="w-full">Add Member</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-emerald-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-800 flex items-center gap-2">
              <Wallet className="h-4 w-4 text-emerald-600" />
              Financial Oversight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="body2" className="text-slate-600">View loans, repayments and disbursement approvals.</Typography>
            <div className="mt-3">
              <Button size="sm" className="w-full">View Ledgers</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-800 flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              Reporting & Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="body2" className="text-slate-600">Upload constitution, submit monthly utilization reports and track applications.</Typography>
            <div className="mt-3 flex flex-col sm:flex-row gap-2">
              <Button size="sm" className="flex-1">Upload</Button>
              <Button size="sm" variant="outline" className="flex-1">Submit Report</Button>
            </div>
          </CardContent>
        </Card>

      </div>

      <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm sm:text-base font-semibold text-slate-800 flex items-center gap-2">
            <Banknote className="h-5 w-5 text-emerald-600" />
            Financial Integration Modules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <List>
            <ListItem className="hover:bg-slate-50 transition-colors rounded">
              <ListItemIcon><Banknote className="h-5 w-5 text-emerald-600" /></ListItemIcon>
              <ListItemText 
                primary={<span className="font-semibold text-slate-800">Bank Linkage</span>}
                secondary={<span className="text-sm text-slate-600">Bank verification & API sync for disbursements and reconciliations.</span>}
              />
            </ListItem>
            <ListItem className="hover:bg-slate-50 transition-colors rounded">
              <ListItemIcon><DollarSign className="h-5 w-5 text-blue-600" /></ListItemIcon>
              <ListItemText 
                primary={<span className="font-semibold text-slate-800">Salary Disbursement</span>}
                secondary={<span className="text-sm text-slate-600">Member-wise ledger and payment tracking (mode, date, remarks).</span>}
              />
            </ListItem>
            <ListItem className="hover:bg-slate-50 transition-colors rounded">
              <ListItemIcon><Briefcase className="h-5 w-5 text-purple-600" /></ListItemIcon>
              <ListItemText 
                primary={<span className="font-semibold text-slate-800">Asset Deployment</span>}
                secondary={<span className="text-sm text-slate-600">Track assets, usage logs and maintenance status.</span>}
              />
            </ListItem>
            <ListItem className="hover:bg-slate-50 transition-colors rounded">
              <ListItemIcon><Activity className="h-5 w-5 text-cyan-600" /></ListItemIcon>
              <ListItemText 
                primary={<span className="font-semibold text-slate-800">Revenue Monitoring</span>}
                secondary={<span className="text-sm text-slate-600">Track income, government payments and generate exportable reports.</span>}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}
// SPCP dashboard has been moved to its own page file to avoid multiple top-level exports in this file.