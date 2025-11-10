'use client';

import { contractorTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/layout/dashboard-layout';
import StatCard from '@/components/ui/stat-card';
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
    <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Enhanced Header */}
        <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
          <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 flex items-center gap-4">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white drop-shadow-2xl" />
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white drop-shadow-2xl leading-tight">
                    Nodal Officer Dashboard
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-bold drop-shadow-lg">
                    Comprehensive oversight and management platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <StatCard
            title="Total Contractors"
            value="28"
            subtitle="Registered contractors"
            icon={Building}
            color="blue"
          />
          <StatCard
            title="Total Workers"
            value="1,247"
            subtitle="Registered workers"
            icon={Award}
            color="green"
          />
          <StatCard
            title="Total Grievances"
            value="47"
            subtitle="Resolved: 35 | Pending: 8 | Escalated: 4"
            icon={FileSearch}
            color="amber"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <StatCard
            title="Today's Attendance"
            value="1125/1,247"
            subtitle="90%"
            icon={Users}
            color="sky"
          />
          <StatCard
            title="Recognition Pending"
            value="12"
            subtitle="Nominations to review"
            icon={Award}
            color="pink"
          />
          <StatCard
            title="Total Cases"
            value="15"
            subtitle="FIR Lodged: 12 | Pending: 3"
            icon={Shield}
            color="red"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          <div className="lg:col-span-3 bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white p-4 sm:p-6 md:p-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-3">
                <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8"/>
                Grievance Resolution Trends
              </h3>
            </div>
            <div className="p-4 sm:p-6">
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
          <div className="lg:col-span-2 bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600/90 to-violet-600/90 text-white p-4 sm:p-6 md:p-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-3">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8"/>
                Compliance Status
              </h3>
            </div>
            <div className="p-4 sm:p-6">
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