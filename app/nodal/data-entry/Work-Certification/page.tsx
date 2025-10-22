"use client";

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    IconButton,
    Tooltip,
    Modal,
    Divider,
    Button
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// --- ICONS ---
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DescriptionIcon from '@mui/icons-material/Description';

// --- ANIMATIONS & STYLES ---
const fadeIn = keyframes`from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); }`;

const GradientCard = styled(Card)(({ theme }) => ({
    color: theme.palette.common.white,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: (theme.shape.borderRadius as number) * 2,
    animation: `${fadeIn} 0.5s ease-out`,
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': { transform: 'translateY(-5px)', boxShadow: theme.shadows[10] },
}));

const CardIcon = styled(Box)({
    position: 'absolute',
    top: '50%',
    right: '16px',
    transform: 'translateY(-50%)',
    opacity: 0.2,
    fontSize: '4rem',
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.grey[50],
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[24],
    borderRadius: (theme.shape.borderRadius as number) * 2,
    padding: theme.spacing(3),
    outline: 'none',
}));

// --- TYPESCRIPT INTERFACES ---
interface CertificationRequest {
    id: string;
    org: string;
    title: string;
    by: string;
    date: string;
    status: 'Pending' | 'Overdue';
    details?: {
        workers: number;
        startDate: string;
        endDate: string;
    }
}

// --- MOCK DATA ---
const certificationRequests: CertificationRequest[] = [
    { id: 'WO-2025-001', org: 'Airport Authority', title: 'Terminal 2 Deep Cleaning', by: 'Verma Cleaners', date: '2025-10-16', status: 'Pending', details: { workers: 25, startDate: '2025-10-10', endDate: '2025-10-15' } },
    { id: 'WO-2025-002', org: 'Railway Station', title: 'Platform 1-3 Sanitation', by: 'Pragati SHG', date: '2025-10-15', status: 'Pending', details: { workers: 15, startDate: '2025-10-09', endDate: '2025-10-14' } },
    { id: 'WO-2025-003', org: 'City Hospital', title: 'Bio-waste Disposal', by: 'Gupta & Sons', date: '2025-10-13', status: 'Overdue', details: { workers: 10, startDate: '2025-10-05', endDate: '2025-10-12' } },
];

// --- MODAL COMPONENT ---
const ViewDetailsModal = ({ open, handleClose, request }: { open: boolean, handleClose: () => void, request: CertificationRequest | null }) => (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
        <ModalBox>
            <Typography variant="h6" component="h2">Work Request Details</Typography>
            <Typography variant="body2" color="text.secondary">{request?.id}</Typography>
            <Divider sx={{ my: 2 }} />
            {request && (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">Organization</Typography>
                        <Typography fontWeight="bold">{request.org}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">Work Title</Typography>
                        <Typography fontWeight="bold">{request.title}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">Executed By</Typography>
                        <Typography fontWeight="bold">{request.by}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">Workers Deployed</Typography>
                        <Typography fontWeight="bold">{request.details?.workers}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">Work Start Date</Typography>
                        <Typography fontWeight="bold">{request.details?.startDate}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">Work End Date</Typography>
                        <Typography fontWeight="bold">{request.details?.endDate}</Typography>
                    </Box>
                    <Box sx={{ gridColumn: '1 / -1' }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Submitted Documents/Photos</Typography>
                        <Button variant="outlined" startIcon={<DescriptionIcon />} size="small">View Attachment.pdf</Button>
                    </Box>
                </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
                <Button variant="outlined" onClick={handleClose}>Close</Button>
                <Button variant="contained" color="error" startIcon={<ThumbDownIcon />}>Reject</Button>
                <Button variant="contained" color="success" startIcon={<ThumbUpIcon />}>Approve</Button>
            </Box>
        </ModalBox>
    </Modal>
);

// --- MAIN PAGE COMPONENT ---
export default function WorkCertificationPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<CertificationRequest | null>(null);

    const handleOpenModal = (request: CertificationRequest) => {
        setSelectedRequest(request);
        setModalOpen(true);
    };
    const handleCloseModal = () => setModalOpen(false);

    const statusChip = (status: 'Pending' | 'Overdue') => (
        <Chip
            label={status}
            size="small"
            sx={{
                backgroundColor: status === 'Overdue' ? '#ffebee' : '#fff8e1',
                color: status === 'Overdue' ? '#c62828' : '#f57f17',
                fontWeight: 'bold',
            }}
        />
    );

    return (
        <Container maxWidth="xl" sx={{ py: 4, backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
            <ViewDetailsModal open={modalOpen} handleClose={handleCloseModal} request={selectedRequest} />

            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', background: 'linear-gradient(90deg, #673ab7, #2196f3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Work Certification Queue
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Review and approve/reject work completion requests from various organizations.
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
                <GradientCard sx={{ background: "linear-gradient(135deg, #ffa726 0%, #ffca28 100%)" }}>
                    <CardContent>
                        <CardIcon><HourglassEmptyIcon /></CardIcon>
                        <Typography variant="h5" fontWeight="bold">8</Typography>
                        <Typography>Pending Requests</Typography>
                    </CardContent>
                </GradientCard>
                <GradientCard sx={{ background: "linear-gradient(135deg, #26a69a 0%, #66bb6a 100%)" }}>
                    <CardContent>
                        <CardIcon><CheckCircleIcon /></CardIcon>
                        <Typography variant="h5" fontWeight="bold">42</Typography>
                        <Typography>Approved This Month</Typography>
                    </CardContent>
                </GradientCard>
                <GradientCard sx={{ background: "linear-gradient(135deg, #ef5350 0%, #e57373 100%)" }}>
                    <CardContent>
                        <CardIcon><CancelIcon /></CardIcon>
                        <Typography variant="h5" fontWeight="bold">5</Typography>
                        <Typography>Rejected This Month</Typography>
                    </CardContent>
                </GradientCard>
                <GradientCard sx={{ background: "linear-gradient(135deg, #d32f2f 0%, #ff7043 100%)" }}>
                    <CardContent>
                        <CardIcon><ReportProblemIcon /></CardIcon>
                        <Typography variant="h5" fontWeight="bold">2</Typography>
                        <Typography>Overdue Requests (&gt;48h)</Typography>
                    </CardContent>
                </GradientCard>
            </Box>
            
            <TableContainer component={Paper} sx={{ borderRadius: 2, animation: `${fadeIn} 0.8s ease-out` }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Work Order ID</StyledTableCell>
                            <StyledTableCell>Organization Name</StyledTableCell>
                            <StyledTableCell>Work Title</StyledTableCell>
                            <StyledTableCell>Contractor / SHG</StyledTableCell>
                            <StyledTableCell>Date Submitted</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {certificationRequests.map(row => (
                            <TableRow key={row.id} hover>
                                <TableCell sx={{ fontWeight: 500 }}>{row.id}</TableCell>
                                <TableCell>{row.org}</TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.by}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell align="center">{statusChip(row.status)}</TableCell>
                                <TableCell align="center">
                                    <Tooltip title="View Details"><IconButton color="primary" onClick={() => handleOpenModal(row)}><VisibilityIcon /></IconButton></Tooltip>
                                    <Tooltip title="Approve"><IconButton color="success"><ThumbUpIcon /></IconButton></Tooltip>
                                    <Tooltip title="Reject"><IconButton color="error"><ThumbDownIcon /></IconButton></Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}