"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/ui/stat-card";
import {
  BookOpen,
  Wallet,
  DollarSign,
  Clock,
  CheckCircle,
  Shield,
  TrendingUp,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const compensationData = [
  { id: "INC-001", worker: "Ramesh Kumar", category: "Sewer Death", fir: "FIR-123 / Closed", amount: "₹10 Lakh", status: "Paid", date: "2025-09-15", delay: "N/A" },
  { id: "INC-002", worker: "Sita Devi", category: "Injury", fir: "FIR-124 / Pending", amount: "₹5 Lakh", status: "Pending", date: "N/A", delay: "Awaiting FIR Closure" },
  { id: "INC-003", worker: "Anil Singh", category: "Sewer Death", fir: "FIR-125 / Pending", amount: "₹10 Lakh", status: "Delayed", date: "N/A", delay: "Document Mismatch" },
];

const schemeData = [
  { worker: "Anil Singh", scheme: "Skill Loan", status: "Approved", amount: "₹50,000", date: "2025-08-20", remarks: "For mechanization training" },
  { worker: "Sunita Bai", scheme: "Rehab Grant", status: "Pending", amount: "N/A", date: "N/A", remarks: "Document verification ongoing" },
  { worker: "Aditya Kumar", scheme: "Skill Loan", status: "Rejected", amount: "N/A", date: "N/A", remarks: "Ineligible criteria" },
];

export default function FinancialTrackerPage() {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Loader shows for 800ms
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    const IntegratedLoader = require("@/components/layout/IntegratedLoader").default;
    return <IntegratedLoader />;
  }

  return (
    <div className={cn("min-h-screen w-full p-0")}> 
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Financial Tracker
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">
              Monitor worker compensation and scheme utilization across your jurisdiction
            </p>
          </div>
          <Button className="mt-4 sm:mt-0 bg-white text-blue-600 hover:bg-blue-50 font-semibold">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${tab === 0 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setTab(0)}
          >
            Compensation Status
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${tab === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setTab(1)}
          >
            Scheme Utilization
          </button>
        </div>
      </div>

      {tab === 0 && (
        <div>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <StatCard title="Total Incidents Reported" value="15" icon={BookOpen} color="blue" />
            <StatCard title="Total Compensation Sanctioned" value="₹75 Lakh" icon={Wallet} color="green" />
            <StatCard title="Total Compensation Paid" value="₹50 Lakh" icon={DollarSign} color="purple" />
            <StatCard title="Pending Payment Cases" value="5" icon={Clock} color="orange" />
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Incident-wise Compensation Report</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident ID</TableHead>
                  <TableHead>Worker(s) Involved</TableHead>
                  <TableHead>Incident Category</TableHead>
                  <TableHead>FIR No. & Status</TableHead>
                  <TableHead>Compensation Amount Sanctioned</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Date Paid</TableHead>
                  <TableHead>Reason for Delay</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {compensationData.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.worker}</TableCell>
                    <TableCell>{r.category}</TableCell>
                    <TableCell>{r.fir}</TableCell>
                    <TableCell>{r.amount}</TableCell>
                    <TableCell>
                      <Badge
                        className={`font-semibold text-xs py-1 px-3 rounded-full ${
                          r.status === "Paid" ? "bg-green-100 text-green-800" :
                          r.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>{r.delay}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {tab === 1 && (
        <div>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <StatCard title="Total Scheme Applications" value="45" icon={BookOpen} color="blue" />
            <StatCard title="Applications Approved" value="32" icon={CheckCircle} color="green" />
            <StatCard title="Applications Pending" value="13" icon={Shield} color="orange" />
            <StatCard title="Total Funds Disbursed" value="₹12 Lakh" icon={TrendingUp} color="purple" />
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Worker-wise Benefits Report</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Worker Name</TableHead>
                  <TableHead>Scheme Name</TableHead>
                  <TableHead>Application Status</TableHead>
                  <TableHead>Amount Disbursed</TableHead>
                  <TableHead>Disbursement Date</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schemeData.map((r, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{r.worker}</TableCell>
                    <TableCell>{r.scheme}</TableCell>
                    <TableCell>
                      <Badge
                        className={`font-semibold text-xs py-1 px-3 rounded-full ${
                          r.status === "Approved" ? "bg-green-100 text-green-800" :
                          r.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{r.amount}</TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>{r.remarks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
