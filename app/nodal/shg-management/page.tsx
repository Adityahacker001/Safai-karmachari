"use client";

import React, { useState } from "react";
import {
    Box,
    Container,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    FormControl,
    Select,
    MenuItem,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    IconButton,
    Tooltip,
    SelectChangeEvent,
    Grid,
    Modal,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

// --- ICONS ---
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LinkIcon from "@mui/icons-material/Link";
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// --- KEYFRAMES & STYLES ---
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

const CardIcon = styled(Box)({ position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)', opacity: 0.2, fontSize: '4rem' });
const StyledTableCell = styled(TableCell)(({ theme }) => ({ fontWeight: 'bold', color: theme.palette.text.secondary, backgroundColor: theme.palette.grey[50], borderBottom: `1px solid ${theme.palette.divider}` }));
const ModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[24],
    borderRadius: (theme.shape.borderRadius as number) * 2,
    padding: theme.spacing(4),
    outline: 'none',
}));

// --- TYPESCRIPT INTERFACES ---
interface SHGData { id: number; name: string; members: number; contractor: string; jurisdiction: string; financialStatus: string; status: 'Active' | 'Awaiting Validation' | 'Inactive'; }

// --- MOCK DATA ---
const mockShgData: SHGData[] = [
    { id: 1, name: "Pragati SHG", members: 15, contractor: "Verma Cleaners", jurisdiction: "Ward 5", financialStatus: "Loan Active (NSKFDC)", status: "Active" },
    { id: 2, name: "Ekta Mahila Group", members: 12, contractor: "Gupta & Sons", jurisdiction: "Ward 2", financialStatus: "No Active Loan", status: "Active" },
    { id: 3, name: "Nai Roshni SHG", members: 10, contractor: "N/A", jurisdiction: "Ward 8", financialStatus: "No Active Loan", status: "Awaiting Validation" },
    { id: 4, name: "Safal Karmachari Dal", members: 20, contractor: "Verma Cleaners", jurisdiction: "Ward 5", financialStatus: "Loan Active (NSKFDC)", status: "Inactive" },
    { id: 5, name: "Udayan Group", members: 18, contractor: "N/A", jurisdiction: "Ward 1", financialStatus: "No Active Loan", status: "Awaiting Validation" },
];
const contractorsList = ["Verma Cleaners", "Gupta & Sons", "Citywide Services", "Unassigned"];

// --- MODAL COMPONENTS ---
const RegisterSHGModal = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => (
    <Modal open={open} onClose={handleClose}>
        <ModalBox>
            <Typography variant="h6" component="h2">Register New SHG</Typography>
            <Divider sx={{ my: 2 }} />
            <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="SHG Name" variant="outlined" fullWidth />
                <TextField label="Number of Members" type="number" variant="outlined" fullWidth />
                <TextField label="Jurisdiction (e.g., Ward 5)" variant="outlined" fullWidth />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleClose}>Submit</Button>
                </Box>
            </Box>
        </ModalBox>
    </Modal>
);

const ValidateSHGModal = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
    const shgsToValidate = mockShgData.filter(shg => shg.status === 'Awaiting Validation');
    return (
        <Modal open={open} onClose={handleClose}>
            <ModalBox>
                <Typography variant="h6" component="h2">Validate SHG Applications</Typography>
                <Divider sx={{ my: 2 }} />
                <List>
                    {shgsToValidate.map(shg => (
                        <ListItem key={shg.id} secondaryAction={
                            <Box>
                                <Tooltip title="Approve"><IconButton color="success"><CheckCircleIcon /></IconButton></Tooltip>
                                <Tooltip title="Reject"><IconButton color="error"><CancelIcon /></IconButton></Tooltip>
                            </Box>
                        }>
                            <ListItemAvatar><Avatar><GroupsIcon /></Avatar></ListItemAvatar>
                            <ListItemText primary={shg.name} secondary={`${shg.members} Members | ${shg.jurisdiction}`} />
                        </ListItem>
                    ))}
                </List>
                <Button variant="contained" onClick={handleClose} sx={{ mt: 2, float: 'right' }}>Close</Button>
            </ModalBox>
        </Modal>
    );
};

const ViewSHGModal = ({ open, handleClose, shg }: { open: boolean, handleClose: () => void, shg: SHGData | null }) => (
    <Modal open={open} onClose={handleClose}>
        <ModalBox>
            <Typography variant="h6" component="h2">SHG Details: {shg?.name}</Typography>
            <Divider sx={{ my: 2 }} />
            {shg && <Box>
                <Typography><b>ID:</b> {shg.id}</Typography>
                <Typography><b>Members:</b> {shg.members}</Typography>
                <Typography><b>Contractor:</b> {shg.contractor}</Typography>
                <Typography><b>Jurisdiction:</b> {shg.jurisdiction}</Typography>
                <Typography><b>Financial Status:</b> {shg.financialStatus}</Typography>
                <Typography><b>Status:</b> <Chip label={shg.status} size="small" /></Typography>
            </Box>}
             <Button variant="contained" onClick={handleClose} sx={{ mt: 3, float: 'right' }}>Close</Button>
        </ModalBox>
    </Modal>
);

const MapContractorModal = ({ open, handleClose, shg }: { open: boolean, handleClose: () => void, shg: SHGData | null }) => (
    <Modal open={open} onClose={handleClose}>
        <ModalBox>
            <Typography variant="h6" component="h2">Map Contractor to {shg?.name}</Typography>
            <Divider sx={{ my: 2 }} />
            <FormControl fullWidth>
                <Select defaultValue={shg?.contractor || 'Unassigned'}>
                    {contractorsList.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
            </FormControl>
             <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleClose}>Save Mapping</Button>
            </Box>
        </ModalBox>
    </Modal>
);

// --- MAIN COMPONENT ---
export default function SHGManagementPage() {
    const [search, setSearch] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [contractorFilter, setContractorFilter] = useState<string>("All");
    
    // State for modals
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [validateModalOpen, setValidateModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [mapModalOpen, setMapModalOpen] = useState(false);
    const [selectedShg, setSelectedShg] = useState<SHGData | null>(null);

    const handleOpenViewModal = (shg: SHGData) => { setSelectedShg(shg); setViewModalOpen(true); };
    const handleOpenMapModal = (shg: SHGData) => { setSelectedShg(shg); setMapModalOpen(true); };
    const handleCloseModals = () => { setRegisterModalOpen(false); setValidateModalOpen(false); setViewModalOpen(false); setMapModalOpen(false); };

    const filteredRows = mockShgData.filter(row => {
        const contractorNormalized = (row.contractor && row.contractor !== 'N/A') ? row.contractor : 'Unassigned';
        return row.name.toLowerCase().includes(search.toLowerCase()) &&
               (statusFilter === 'All' || row.status === statusFilter) &&
               (contractorFilter === 'All' || contractorNormalized === contractorFilter);
    });

    return (
        <Container maxWidth="xl" sx={{ py: 4, backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
            {/* Modals */}
            <RegisterSHGModal open={registerModalOpen} handleClose={handleCloseModals} />
            <ValidateSHGModal open={validateModalOpen} handleClose={handleCloseModals} />
            <ViewSHGModal open={viewModalOpen} handleClose={handleCloseModals} shg={selectedShg} />
            <MapContractorModal open={mapModalOpen} handleClose={handleCloseModals} shg={selectedShg} />

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                 <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', background: 'linear-gradient(90deg, #673ab7, #2196f3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    SHG Management
                </Typography>
                 <Button variant="contained" onClick={() => setRegisterModalOpen(true)} sx={{ backgroundColor: '#2196f3', '&:hover': { backgroundColor: '#1976d2' }, borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}>
                    + Register New SHG
                </Button>
            </Box>
            
            {/* Cards and Table */}
            {/* The rest of your UI code remains the same as the previous version */}
            <Box sx={{ display: 'grid', gap: 3, mb: 4, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
                <Box>
                    <GradientCard sx={{ background: "linear-gradient(135deg, #5c6bc0 0%, #2196f3 100%)" }}><CardContent><CardIcon><GroupsIcon /></CardIcon><Typography variant="h4" component="div" fontWeight="bold">28</Typography><Typography>Total SHGs</Typography></CardContent></GradientCard>
                </Box>
                <Box>
                    <GradientCard sx={{ background: "linear-gradient(135deg, #26a69a 0%, #66bb6a 100%)" }}><CardContent><CardIcon><PersonIcon /></CardIcon><Typography variant="h4" component="div" fontWeight="bold">350</Typography><Typography>Total Members</Typography></CardContent></GradientCard>
                </Box>
                <Box>
                    <GradientCard sx={{ background: "linear-gradient(135deg, #ffa726 0%, #ffca28 100%)" }}><CardContent><CardIcon><PendingActionsIcon /></CardIcon><Typography variant="h4" component="div" fontWeight="bold">4</Typography><Typography>Awaiting Validation</Typography></CardContent></GradientCard>
                </Box>
                <Box>
                    <GradientCard sx={{ background: "linear-gradient(135deg, #7e57c2 0%, #ab47bc 100%)" }}><CardContent><CardIcon><WorkHistoryIcon /></CardIcon><Typography variant="h4" component="div" fontWeight="bold">24</Typography><Typography>SHGs Deployed</Typography></CardContent></GradientCard>
                </Box>
            </Box>

            <Paper sx={{ p: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, borderRadius: 2 }}>
                <Box display="flex" gap={2} flexWrap="wrap">
                    <TextField size="small" variant="outlined" label="Search by SHG Name" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} displayEmpty><MenuItem value="All"><em>Filter by Status (All)</em></MenuItem><MenuItem value="Active">Active</MenuItem><MenuItem value="Inactive">Inactive</MenuItem><MenuItem value="Awaiting Validation">Awaiting Validation</MenuItem></Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 220 }}>
                        <Select value={contractorFilter} onChange={(e) => setContractorFilter(e.target.value)} displayEmpty><MenuItem value="All"><em>Filter by Contractor (All)</em></MenuItem>{contractorsList.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}</Select>
                    </FormControl>
                </Box>
                 <Button variant="outlined" color="primary" onClick={() => setValidateModalOpen(true)}>Validate Applications</Button>
            </Paper>

            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead><TableRow><StyledTableCell>SHG Name</StyledTableCell><StyledTableCell align="center">Members</StyledTableCell><StyledTableCell>Assigned Contractor</StyledTableCell><StyledTableCell>Jurisdiction</StyledTableCell><StyledTableCell>Financial Status</StyledTableCell><StyledTableCell align="center">Status</StyledTableCell><StyledTableCell align="center">Actions</StyledTableCell></TableRow></TableHead>
                    <TableBody>
                        {filteredRows.map(row => (
                            <TableRow key={row.id} hover>
                                <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                                <TableCell align="center">{row.members}</TableCell>
                                <TableCell>{row.contractor}</TableCell>
                                <TableCell>{row.jurisdiction}</TableCell>
                                <TableCell>{row.financialStatus}</TableCell>
                                <TableCell align="center"><Chip label={row.status} size="small" sx={row.status === 'Active' ? {backgroundColor: '#e3f2fd', color: '#1565c0', fontWeight: 'bold'} : row.status === 'Awaiting Validation' ? {backgroundColor: '#fff8e1', color: '#f57f17', fontWeight: 'bold'} : {backgroundColor: '#f5f5f5', color: '#616161', fontWeight: 'bold'}}/></TableCell>
                                <TableCell align="center">
                                    <Tooltip title="View Details"><IconButton color="primary" size="small" onClick={() => handleOpenViewModal(row)}><VisibilityIcon /></IconButton></Tooltip>
                                    <Tooltip title="Validate SHG"><IconButton color="success" size="small"><CheckCircleOutlineIcon /></IconButton></Tooltip>
                                    <Tooltip title="Map Contractor"><IconButton color="secondary" size="small" onClick={() => handleOpenMapModal(row)}><LinkIcon /></IconButton></Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}