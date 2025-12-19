"use client";

import React, { useState, useEffect } from "react";
import IntegratedLoader from "@/components/layout/IntegratedLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import StatCard from "@/components/ui/stat-card";

// --- ICONS ---
import {
  Users,
  UserCheck,
  Clock,
  Briefcase,
  Eye,
  CheckCircle,
  Link,
  X,
  Plus,
} from "lucide-react";



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
    <Dialog open={open} onOpenChange={() => handleClose()}>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>Register New SHG</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="shgName">SHG Name</Label>
                    <Input id="shgName" placeholder="Enter SHG name" className="mt-1" />
                </div>
                <div>
                    <Label htmlFor="members">Number of Members</Label>
                    <Input id="members" type="number" placeholder="Enter number of members" className="mt-1" />
                </div>
                <div>
                    <Label htmlFor="jurisdiction">Jurisdiction</Label>
                    <Input id="jurisdiction" placeholder="e.g., Ward 5" className="mt-1" />
                </div>
            </div>
            <DialogFooter className="gap-2">
                <Button variant="outline" onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Submit</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

const ValidateSHGModal = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
    const shgsToValidate = mockShgData.filter(shg => shg.status === 'Awaiting Validation');
    return (
        <Dialog open={open} onOpenChange={() => handleClose()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Validate SHG Applications</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                    {shgsToValidate.map(shg => (
                        <div key={shg.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium">{shg.name}</p>
                                    <p className="text-sm text-gray-500">{shg.members} Members | {shg.jurisdiction}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                    <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="destructive">
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button onClick={handleClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const ViewSHGModal = ({ open, handleClose, shg }: { open: boolean, handleClose: () => void, shg: SHGData | null }) => (
    <Dialog open={open} onOpenChange={() => handleClose()}>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>SHG Details: {shg?.name}</DialogTitle>
            </DialogHeader>
            {shg && (
                <div className="space-y-3">
                    <div><span className="font-medium">ID:</span> {shg.id}</div>
                    <div><span className="font-medium">Members:</span> {shg.members}</div>
                    <div><span className="font-medium">Contractor:</span> {shg.contractor}</div>
                    <div><span className="font-medium">Jurisdiction:</span> {shg.jurisdiction}</div>
                    <div><span className="font-medium">Financial Status:</span> {shg.financialStatus}</div>
                    <div className="flex items-center space-x-2">
                        <span className="font-medium">Status:</span> 
                        <Badge variant={shg.status === 'Active' ? 'default' : 'secondary'}>
                            {shg.status}
                        </Badge>
                    </div>
                </div>
            )}
            <DialogFooter>
                <Button onClick={handleClose}>Close</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

const MapContractorModal = ({ open, handleClose, shg }: { open: boolean, handleClose: () => void, shg: SHGData | null }) => (
    <Dialog open={open} onOpenChange={() => handleClose()}>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>Map Contractor to {shg?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                <div>
                    <Label>Select Contractor</Label>
                    <Select defaultValue={shg?.contractor || 'Unassigned'}>
                        <SelectTrigger className="mt-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {contractorsList.map(c => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter className="gap-2">
                <Button variant="outline" onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Save Mapping</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

// --- MAIN COMPONENT ---
export default function SHGManagementPage() {

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [contractorFilter, setContractorFilter] = useState<string>("All");
    // State for modals
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [validateModalOpen, setValidateModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [mapModalOpen, setMapModalOpen] = useState(false);
    const [selectedShg, setSelectedShg] = useState<SHGData | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <IntegratedLoader />;
    }

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
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            {/* Modals */}
            <RegisterSHGModal open={registerModalOpen} handleClose={handleCloseModals} />
            <ValidateSHGModal open={validateModalOpen} handleClose={handleCloseModals} />
            <ViewSHGModal open={viewModalOpen} handleClose={handleCloseModals} shg={selectedShg} />
            <MapContractorModal open={mapModalOpen} handleClose={handleCloseModals} shg={selectedShg} />

            {/* Header Card */}
            <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                            SHG Management
                        </h1>
                        <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">
                            Comprehensive SHG registration, validation, and contractor mapping
                        </p>
                    </div>
                    <Button 
                        onClick={() => setRegisterModalOpen(true)}
                        className="mt-4 sm:mt-0 bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Register New SHG
                    </Button>
                </div>
            </div>
            
            {/* Summary Cards - Using StatCard Component */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                <StatCard
                    title="Total SHGs"
                    value={28}
                    subtitle="Registered groups"
                    icon={Users}
                    color="blue"
                />
                <StatCard
                    title="Total Members"
                    value={350}
                    subtitle="Active participants"
                    icon={UserCheck}
                    color="green"
                />
                <StatCard
                    title="Awaiting Validation"
                    value={4}
                    subtitle="Pending approval"
                    icon={Clock}
                    color="amber"
                />
                <StatCard
                    title="SHGs Deployed"
                    value={24}
                    subtitle="Working with contractors"
                    icon={Briefcase}
                    color="purple"
                />
            </div>

            {/* Filters */}
            <Card className="bg-white shadow-lg rounded-2xl mb-6">
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            <div className="flex-1 min-w-0">
                                <Input
                                    placeholder="Search by SHG Name"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="Filter by Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Status</SelectItem>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                    <SelectItem value="Awaiting Validation">Awaiting Validation</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={contractorFilter} onValueChange={setContractorFilter}>
                                <SelectTrigger className="w-full sm:w-52">
                                    <SelectValue placeholder="Filter by Contractor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Contractors</SelectItem>
                                    {contractorsList.map(c => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button 
                            variant="outline"
                            onClick={() => setValidateModalOpen(true)}
                            className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                            Validate Applications
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card className="bg-white shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-2xl">
                    <CardTitle className="text-xl font-bold">SHG Directory</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-blue-200">
                                    <TableHead className="text-gray-700 font-semibold py-4 px-6">SHG Name</TableHead>
                                    <TableHead className="text-center text-gray-700 font-semibold py-4 px-6">Members</TableHead>
                                    <TableHead className="text-gray-700 font-semibold py-4 px-6">Assigned Contractor</TableHead>
                                    <TableHead className="text-gray-700 font-semibold py-4 px-6">Jurisdiction</TableHead>
                                    <TableHead className="text-gray-700 font-semibold py-4 px-6">Financial Status</TableHead>
                                    <TableHead className="text-center text-gray-700 font-semibold py-4 px-6">Status</TableHead>
                                    <TableHead className="text-center text-gray-700 font-semibold py-4 px-6">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRows.map((row, index) => (
                                    <TableRow 
                                        key={row.id} 
                                        className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-l-4 ${
                                            row.status === 'Active' 
                                                ? "border-l-green-400 hover:border-l-green-500" 
                                                : row.status === 'Awaiting Validation'
                                                ? "border-l-yellow-400 hover:border-l-yellow-500"
                                                : "border-l-gray-400 hover:border-l-gray-500"
                                        } ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                                    >
                                        <TableCell className="font-medium text-gray-900 py-4 px-6">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-3 h-3 rounded-full ${
                                                    row.status === 'Active' ? "bg-green-400" : 
                                                    row.status === 'Awaiting Validation' ? "bg-yellow-400" : "bg-gray-400"
                                                }`}></div>
                                                <span>{row.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center text-gray-600 py-4 px-6">{row.members}</TableCell>
                                        <TableCell className="text-gray-600 py-4 px-6">{row.contractor}</TableCell>
                                        <TableCell className="text-gray-600 py-4 px-6">{row.jurisdiction}</TableCell>
                                        <TableCell className="text-gray-600 py-4 px-6">{row.financialStatus}</TableCell>
                                        <TableCell className="text-center py-4 px-6">
                                            <Badge 
                                                variant={row.status === 'Active' ? 'default' : row.status === 'Awaiting Validation' ? 'secondary' : 'outline'}
                                                className={
                                                    row.status === 'Active' 
                                                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                                        : row.status === 'Awaiting Validation' 
                                                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }
                                            >
                                                {row.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center py-4 px-6">
                                            <div className="flex justify-center space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleOpenViewModal(row)}
                                                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-green-200 text-green-600 hover:bg-green-50"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleOpenMapModal(row)}
                                                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                                                >
                                                    <Link className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}