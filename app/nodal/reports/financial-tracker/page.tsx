"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Avatar,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

// Icons
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

// --- Styles ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const GradientCard = styled(Card)(({ theme }) => ({
  color: theme.palette.common.white,
  borderRadius: (theme.shape.borderRadius as number) * 2,
  overflow: 'hidden',
  animation: `${fadeIn} 450ms ease-out`,
}));

const CardIconWrap = styled(Avatar)({
  width: 44,
  height: 44,
  marginRight: 12,
  boxShadow: 'rgba(0,0,0,0.08) 0px 4px 10px',
});

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: 'linear-gradient(90deg,#673ab7,#2196f3)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

// --- Mock Data ---
type CompensationRow = {
  id: string;
  worker: string;
  category: string;
  fir: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Delayed';
  date: string;
  delay: string;
};

const compensationData: CompensationRow[] = [
  { id: 'INC-001', worker: 'Ramesh Kumar', category: 'Sewer Death', fir: 'FIR-123 / Closed', amount: '₹10 Lakh', status: 'Paid', date: '2025-09-15', delay: 'N/A' },
  { id: 'INC-002', worker: 'Sita Devi', category: 'Injury', fir: 'FIR-124 / Pending', amount: '₹5 Lakh', status: 'Pending', date: 'N/A', delay: 'Awaiting FIR Closure' },
  { id: 'INC-003', worker: 'Anil Singh', category: 'Sewer Death', fir: 'FIR-125 / Pending', amount: '₹10 Lakh', status: 'Delayed', date: 'N/A', delay: 'Document Mismatch' },
];

type SchemeRow = {
  worker: string;
  scheme: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  amount: string;
  date: string;
  remarks: string;
};

const schemeData: SchemeRow[] = [
  { worker: 'Anil Singh', scheme: 'Skill Loan', status: 'Approved', amount: '₹50,000', date: '2025-08-20', remarks: 'For mechanization training' },
  { worker: 'Sunita Bai', scheme: 'Rehab Grant', status: 'Pending', amount: 'N/A', date: 'N/A', remarks: 'Document verification ongoing' },
  { worker: 'Rajesh Kumar', scheme: 'Skill Loan', status: 'Rejected', amount: 'N/A', date: 'N/A', remarks: 'Ineligible criteria' },
];

// --- Helper for chips ---
function StatusChip({ status }: { status: CompensationRow['status'] }) {
  const common = { size: 'small' } as const;
  if (status === 'Paid') return <Chip label="Paid" color="success" {...common} />;
  if (status === 'Pending') return <Chip label="Pending" color="warning" {...common} />;
  return <Chip label="Delayed" color="error" {...common} />;
}

function SchemeStatusChip({ status }: { status: SchemeRow['status'] }) {
  const common = { size: 'small' } as const;
  if (status === 'Approved') return <Chip label="Approved" color="success" {...common} />;
  if (status === 'Pending') return <Chip label="Pending" color="warning" {...common} />;
  return <Chip label="Rejected" color="error" {...common} />;
}

// --- Gradient helpers ---
const gradients = {
  blue: 'linear-gradient(135deg,#5c6bc0 0%,#2196f3 100%)',
  green: 'linear-gradient(135deg,#26a69a 0%,#66bb6a 100%)',
  purple: 'linear-gradient(135deg,#7e57c2 0%,#ab47bc 100%)',
  orange: 'linear-gradient(135deg,#ff7043 0%,#ffca28 100%)',
};

export default function FinancialTrackerPage() {
  const [tab, setTab] = React.useState(0);

  return (
    <Container maxWidth="xl" sx={{ py: 4, backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3} flexWrap="wrap">
        <Box>
          <Title variant="h4">Financial Tracker</Title>
          <Typography variant="subtitle1" color="text.secondary">Monitor worker compensation and scheme utilization across your jurisdiction.</Typography>
        </Box>
      </Box>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} textColor="primary" indicatorColor="primary">
          <Tab label="Compensation Status" />
          <Tab label="Scheme Utilization" />
        </Tabs>
      </Paper>

      {tab === 0 && (
        <Box>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4,1fr)' }, mb: 3 }}>
            <GradientCard sx={{ background: gradients.blue }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <CardIconWrap sx={{ bgcolor: 'rgba(255,255,255,0.12)' }}><LibraryBooksIcon /></CardIconWrap>
                <Box>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 700 }}>Total Incidents Reported</Typography>
                  <Typography variant="h5">15</Typography>
                </Box>
              </CardContent>
            </GradientCard>

            <GradientCard sx={{ background: gradients.green }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <CardIconWrap sx={{ bgcolor: 'rgba(255,255,255,0.12)' }}><AccountBalanceWalletIcon /></CardIconWrap>
                <Box>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 700 }}>Total Compensation Sanctioned</Typography>
                  <Typography variant="h5">₹75 Lakh</Typography>
                </Box>
              </CardContent>
            </GradientCard>

            <GradientCard sx={{ background: gradients.purple }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <CardIconWrap sx={{ bgcolor: 'rgba(255,255,255,0.12)' }}><PriceCheckIcon /></CardIconWrap>
                <Box>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 700 }}>Total Compensation Paid</Typography>
                  <Typography variant="h5">₹50 Lakh</Typography>
                </Box>
              </CardContent>
            </GradientCard>

            <GradientCard sx={{ background: gradients.orange }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <CardIconWrap sx={{ bgcolor: 'rgba(255,255,255,0.12)' }}><HourglassEmptyIcon /></CardIconWrap>
                <Box>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 700 }}>Pending Payment Cases</Typography>
                  <Typography variant="h5">5</Typography>
                </Box>
              </CardContent>
            </GradientCard>
          </Box>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Incident-wise Compensation Report</Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Incident ID</TableCell>
                    <TableCell>Worker(s) Involved</TableCell>
                    <TableCell>Incident Category</TableCell>
                    <TableCell>FIR No. & Status</TableCell>
                    <TableCell>Compensation Amount Sanctioned</TableCell>
                    <TableCell>Payment Status</TableCell>
                    <TableCell>Date Paid</TableCell>
                    <TableCell>Reason for Delay</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {compensationData.map((r) => (
                    <TableRow key={r.id} hover>
                      <TableCell>{r.id}</TableCell>
                      <TableCell>{r.worker}</TableCell>
                      <TableCell>{r.category}</TableCell>
                      <TableCell>{r.fir}</TableCell>
                      <TableCell>{r.amount}</TableCell>
                      <TableCell><StatusChip status={r.status} /></TableCell>
                      <TableCell>{r.date}</TableCell>
                      <TableCell>{r.delay}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}

      {tab === 1 && (
        <Box>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4,1fr)' }, mb: 3 }}>
            <GradientCard sx={{ background: gradients.blue }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <CardIconWrap sx={{ bgcolor: 'rgba(255,255,255,0.12)' }}><LibraryBooksIcon /></CardIconWrap>
                <Box>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 700 }}>Total Scheme Applications</Typography>
                  <Typography variant="h5">45</Typography>
                </Box>
              </CardContent>
            </GradientCard>

            <GradientCard sx={{ background: gradients.green }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <CardIconWrap sx={{ bgcolor: 'rgba(255,255,255,0.12)' }}><PlaylistAddCheckIcon /></CardIconWrap>
                <Box>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 700 }}>Applications Approved</Typography>
                  <Typography variant="h5">32</Typography>
                </Box>
              </CardContent>
            </GradientCard>

            <GradientCard sx={{ background: gradients.orange }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <CardIconWrap sx={{ bgcolor: 'rgba(255,255,255,0.12)' }}><DomainVerificationIcon /></CardIconWrap>
                <Box>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 700 }}>Applications Pending</Typography>
                  <Typography variant="h5">13</Typography>
                </Box>
              </CardContent>
            </GradientCard>

            <GradientCard sx={{ background: gradients.purple }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <CardIconWrap sx={{ bgcolor: 'rgba(255,255,255,0.12)' }}><MonetizationOnIcon /></CardIconWrap>
                <Box>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 700 }}>Total Funds Disbursed</Typography>
                  <Typography variant="h5">₹12 Lakh</Typography>
                </Box>
              </CardContent>
            </GradientCard>
          </Box>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Worker-wise Benefits Report</Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Worker Name</TableCell>
                    <TableCell>Scheme Name</TableCell>
                    <TableCell>Application Status</TableCell>
                    <TableCell>Amount Disbursed</TableCell>
                    <TableCell>Disbursement Date</TableCell>
                    <TableCell>Remarks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schemeData.map((r, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{r.worker}</TableCell>
                      <TableCell>{r.scheme}</TableCell>
                      <TableCell><SchemeStatusChip status={r.status} /></TableCell>
                      <TableCell>{r.amount}</TableCell>
                      <TableCell>{r.date}</TableCell>
                      <TableCell>{r.remarks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}
    </Container>
  );
}
