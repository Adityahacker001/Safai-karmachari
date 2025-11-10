"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Removed duplicate import of StatCard
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Clock, 
  CheckCircle, 
  X, 
  AlertTriangle, 
  Eye, 
  ThumbsUp, 
  ThumbsDown, 
  FileText,
  Users,
  Building2
} from "lucide-react";
import StatCard from "@/components/ui/stat-card";

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

// --- MAIN PAGE COMPONENT ---
export default function WorkCertificationPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<CertificationRequest | null>(null);

    const handleOpenModal = (request: CertificationRequest) => {
        setSelectedRequest(request);
        setModalOpen(true);
    };
    const handleCloseModal = () => setModalOpen(false);

    const statusBadge = (status: 'Pending' | 'Overdue') => (
        <Badge 
            variant={status === 'Overdue' ? 'destructive' : 'secondary'}
            className={status === 'Overdue' ? '' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}
        >
            {status}
        </Badge>
    );

    return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        {/* Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Work Request Details</DialogTitle>
                    <DialogDescription>{selectedRequest?.id}</DialogDescription>
                </DialogHeader>
                {selectedRequest && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div>
                            <p className="text-sm text-gray-600">Organization</p>
                            <p className="font-semibold">{selectedRequest.org}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Work Title</p>
                            <p className="font-semibold">{selectedRequest.title}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Executed By</p>
                            <p className="font-semibold">{selectedRequest.by}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Workers Deployed</p>
                            <p className="font-semibold">{selectedRequest.details?.workers}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Work Start Date</p>
                            <p className="font-semibold">{selectedRequest.details?.startDate}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Work End Date</p>
                            <p className="font-semibold">{selectedRequest.details?.endDate}</p>
                        </div>
                        <div className="col-span-full">
                            <p className="text-sm text-gray-600 mb-2">Submitted Documents/Photos</p>
                            <Button variant="outline" size="sm">
                                <FileText className="w-4 h-4 mr-2" />
                                View Attachment.pdf
                            </Button>
                        </div>
                    </div>
                )}
                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={handleCloseModal}>Close</Button>
                    <Button variant="destructive">
                        <ThumbsDown className="w-4 h-4 mr-2" />
                        Reject
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Approve
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Work Certification Queue
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">
                Review and approve/reject work completion requests from various organizations.
            </p>
        </div>

        {/* Summary Cards - Using StatCard Component */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <StatCard
                title="Pending Requests"
                value={8}
                subtitle="Awaiting review"
                icon={Clock}
                color="amber"
            />
            <StatCard
                title="Approved This Month"
                value={42}
                subtitle="Successfully approved"
                icon={CheckCircle}
                color="green"
            />
            <StatCard
                title="Rejected This Month"
                value={5}
                subtitle="Did not meet criteria"
                icon={X}
                color="red"
            />
            <StatCard
                title="Overdue Requests"
                value={2}
                subtitle="More than 48h"
                icon={AlertTriangle}
                color="purple"
            />
        </div>
        
        {/* Table */}
        <Card className="bg-white shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle>Work Certification Requests</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Work Order ID</TableHead>
                                <TableHead>Organization</TableHead>
                                <TableHead>Work Title</TableHead>
                                <TableHead>Contractor/SHG</TableHead>
                                <TableHead>Date Submitted</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {certificationRequests.map(row => (
                                <TableRow key={row.id} className="hover:bg-gray-50">
                                    <TableCell className="font-medium">{row.id}</TableCell>
                                    <TableCell>{row.org}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.by}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{statusBadge(row.status)}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex justify-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleOpenModal(row)}
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                title="Approve"
                                            >
                                                <ThumbsUp className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                title="Reject"
                                            >
                                                <ThumbsDown className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}