'use client';

import { contractorTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/layout/dashboard-layout';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Award,
  FileSearch,
  Building,
  BarChart3,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, Box, Paper, Grid, List, ListItem, ListItemIcon, ListItemText, Divider, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import Typography from '@mui/material/Typography';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ConstructionIcon from '@mui/icons-material/Construction';

// --- KEYFRAMES & STYLES (local to this file) ---
const fadeIn = keyframes`from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); }`;

const GradientCard = styled(Card)(({ theme }) => ({
  color: theme.palette.common.white,
  position: 'relative',
  overflow: 'hidden',
  borderRadius: (typeof theme.shape.borderRadius === 'number' ? theme.shape.borderRadius * 2 : Number(theme.shape.borderRadius) || 16),
  animation: `${fadeIn} 0.5s ease-out`,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': { transform: 'translateY(-5px)', boxShadow: theme.shadows[10] },
}));

const CardIcon = styled(Box)({ position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)', opacity: 0.2, fontSize: '4rem' });
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ChartConfig } from '@/components/ui/chart';

const barChartData = [
  { month: 'January', resolved: 186, pending: 80 },
  { month: 'February', resolved: 305, pending: 200 },
  { month: 'March', resolved: 237, pending: 120 },
  { month: 'April', resolved: 73, pending: 190 },
  { month: 'May', resolved: 209, pending: 130 },
  { month: 'June', resolved: 214, pending: 140 },
];

const barChartConfig = {
  resolved: {
    label: 'Resolved',
    color: '#22c55e',
  },
  pending: {
    label: 'Pending',
    color: '#ef4444',
  },
} satisfies ChartConfig;

const pieChartData = [
  { status: 'Compliant', value: 45, fill: '#22c55e' },
  { status: 'Pending', value: 15, fill: '#f97316' },
  { status: 'Non-Compliant', value: 10, fill: '#ef4444' },
];

const pieChartConfig = {
  compliant: {
    label: 'Compliant',
    color: '#22c55e',
  },
  pending: {
    label: 'Pending',
    color: '#f97316',
  },
  'non-compliant': {
    label: 'Non-Compliant',
    color: '#ef4444',
  },
} satisfies ChartConfig;

export default function NodalDashboard() {
  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Nodal Officer Dashboard</h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          {/* Row 1: 3 Cards */}
          <div className={cn(contractorTheme.kpiCard.base, 'bg-gradient-to-br from-blue-500 to-blue-700')}>
            <Building className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Total Contractors</p>
            <p className="text-4xl font-bold">28</p>
            <p className="text-sm text-white/80 mt-1">Registered contractors</p>
          </div>
          <div className={cn(contractorTheme.kpiCard.base, 'bg-gradient-to-br from-green-500 to-emerald-600')}>
            <Award className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Total Workers</p>
            <p className="text-4xl font-bold">1,247</p>
            <p className="text-sm text-white/80 mt-1">Registered workers</p>
          </div>
          <div className={cn(contractorTheme.kpiCard.base, 'bg-gradient-to-br from-amber-500 to-yellow-600')}>
            <FileSearch className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Total Grievances</p>
            <p className="text-4xl font-bold">47</p>
            <p className="text-sm text-white/80 mt-1">Resolved: 35 | Pending: 8 | Escalated: 4</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Row 2: 3 Cards */}
          <div className={cn(contractorTheme.kpiCard.base, 'bg-gradient-to-br from-teal-500 to-cyan-600')}>
            <Users className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Today's Attendance</p>
            <p className="text-4xl font-bold">1125/1,247</p>
            <p className="text-sm text-white/80 mt-1">90%</p>
          </div>
          <div className={cn(contractorTheme.kpiCard.base, 'bg-gradient-to-br from-fuchsia-600 to-pink-600')}>
            <Award className={cn(contractorTheme.kpiCard.icon)} strokeWidth={1} />
            <p className="text-base font-medium text-white/80">Recognition Pending</p>
            <p className="text-4xl font-bold">12</p>
            <p className="text-sm text-white/80 mt-1">Nominations to review</p>
          </div>
          {/* Police Case Tracker card (replaces Contractors Monitored) */}
          <div>
            <GradientCard sx={{ background: 'linear-gradient(135deg, #d32f2f 0%, #ff7043 100%)' }}>
              <CardContent>
                <CardIcon>
                  <LocalPoliceIcon sx={{ fontSize: 'inherit' }} />
                </CardIcon>
                <Typography variant="h4" component="div" fontWeight="bold">
                  15
                </Typography>
                <Typography>Total Cases</Typography>
                <Typography variant="caption">FIR Lodged: 12 | Pending: 3</Typography>
              </CardContent>
            </GradientCard>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className={cn(contractorTheme.card.container, 'lg:col-span-3 bg-white')}>
            <div className={cn(contractorTheme.card.content, 'p-6')}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Grievance Resolution Trends</h3>
              <ChartContainer config={barChartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={barChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="resolved" fill="var(--color-resolved)" radius={4} />
                  <Bar dataKey="pending" fill="var(--color-pending)" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
          <div className={cn(contractorTheme.card.container, 'lg:col-span-2 bg-white')}>
            <div className={cn(contractorTheme.card.content, 'p-6')}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status Distribution</h3>
              <ChartContainer config={pieChartConfig} className="min-h-[200px] w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="status" />} />
                  <Pie data={pieChartData} dataKey="value" nameKey="status" cx="50%" cy="50%" outerRadius={80}>
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartLegend
                    content={<ChartLegendContent nameKey="status" />}
                    className="-translate-y-[2rem] flex-wrap gap-2"
                  />
                </PieChart>
              </ChartContainer>
            </div>
          </div>
        </div>

        {/* NEW OPERATIONAL STATUS WIDGET */}
        <Paper sx={{ p: 3, borderRadius: 2, animation: `${fadeIn} 0.8s ease-out`, background: 'white' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom color="text.primary">
            Operational Status
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 1 }}>
            {/* Left Side: Pending Certifications (colorful) */}
            <Box sx={{ p: 3, borderRadius: 2, background: 'linear-gradient(135deg,#0ea5e9 0%, #3b82f6 100%)', color: 'common.white' }}>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom sx={{ color: 'common.white' }}>
                Pending Certifications
              </Typography>
              <List dense>
                <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TaskAltIcon sx={{ color: 'rgba(255,255,255,0.9)' }} />
                    <Typography sx={{ color: 'rgba(255,255,255,0.95)' }}>Total Requests</Typography>
                  </Box>
                  <Chip label="8" color="secondary" sx={{ background: 'rgba(255,255,255,0.15)', color: 'common.white', fontWeight: 700, fontSize: '1rem' }} />
                </ListItem>
                <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <ReportProblemIcon sx={{ color: 'rgba(255,255,255,0.9)' }} />
                    <Typography sx={{ color: 'rgba(255,255,255,0.95)' }}>Overdue (&gt;48h)</Typography>
                  </Box>
                  <Chip label="2" sx={{ background: '#ef4444', color: 'common.white', fontWeight: 800, fontSize: '1rem' }} />
                </ListItem>
              </List>
            </Box>

            {/* Right Side: Alerts from Organizations (colorful) */}
            <Box sx={{ p: 3, borderRadius: 2, background: 'linear-gradient(135deg,#f97316 0%, #ef4444 100%)', color: 'common.white' }}>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom sx={{ color: 'common.white' }}>
                Alerts from Organizations
              </Typography>
              <List dense>
                <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <WarningAmberIcon sx={{ color: 'rgba(255,255,255,0.9)' }} />
                    <Typography sx={{ color: 'rgba(255,255,255,0.95)' }}>Safety Violations</Typography>
                  </Box>
                  <Chip label="3" sx={{ background: 'rgba(255,255,255,0.15)', color: 'common.white', fontWeight: 700, fontSize: '1rem' }} />
                </ListItem>
                <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <ConstructionIcon sx={{ color: 'rgba(255,255,255,0.9)' }} />
                    <Typography sx={{ color: 'rgba(255,255,255,0.95)' }}>Resource Shortage</Typography>
                  </Box>
                  <Chip label="1" sx={{ background: 'rgba(255,255,255,0.15)', color: 'common.white', fontWeight: 700, fontSize: '1rem' }} />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Paper>
      </div>
    </div>
  );
}