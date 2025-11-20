"use client";
import React, { useState } from "react";
import DashboardCard from "@/components/dashboard/dashboard-card";
import DataTable from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  MessageSquare,
  CheckCircle,
  Clock,
  AlertTriangle,
  Timer,
  Eye,
  User,
  MapPin,
  Calendar,
  Flag,
} from "lucide-react";

function IntegratedLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
      <style jsx>{`
        .loader {
          --c: no-repeat linear-gradient(#4f46e5 0 0);
          background: 
            var(--c),var(--c),var(--c),
            var(--c),var(--c),var(--c),
            var(--c),var(--c),var(--c);
          background-size: 16px 16px;
          animation: 
            l32-1 1s infinite,
            l32-2 1s infinite;
        }
        @keyframes l32-1 {
          0%,100% {width:45px;height: 45px}
          35%,65% {width:65px;height: 65px}
        }
        @keyframes l32-2 {
          0%,40%  {background-position: 0 0,0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,  50% 50% }
          60%,100%{background-position: 0 50%, 0 100%,50% 100%,100% 100%,100% 50%,100% 0,50% 0,0 0,  50% 50% }
        }
      `}</style>
      <div className="loader"></div>
    </div>
  );
}

const Grievances = () => {
  const [activeTab, setActiveTab] = useState<"summary" | "escalated">("summary");
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [isGrievanceDetailsOpen, setIsGrievanceDetailsOpen] = useState(false);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <IntegratedLoader />;

  const kpiData = [
    { title: "Total Grievances", value: 892, icon: MessageSquare, color: "blue" as const },
    { title: "Resolved", value: 654, icon: CheckCircle, color: "green" as const },
    { title: "Pending", value: 186, icon: Clock, color: "orange" as const },
    { title: "Escalated", value: 52, icon: AlertTriangle, color: "red" as const },
   
  ];

  const districtData = [
    { district: "Kolkata", total: 145, resolved: 128, pending: 12, escalated: 5 },
    { district: "Howrah", total: 98, resolved: 82, pending: 14, escalated: 2 },
    { district: "North 24 Parganas", total: 76, resolved: 65, pending: 8, escalated: 3 },
    { district: "South 24 Parganas", total: 112, resolved: 89, pending: 18, escalated: 5 },
    { district: "Darjeeling", total: 67, resolved: 54, pending: 9, escalated: 4 },
    { district: "Hooghly", total: 89, resolved: 71, pending: 13, escalated: 5 },
    { district: "Murshidabad", total: 54, resolved: 48, pending: 5, escalated: 1 },
    { district: "Nadia", total: 78, resolved: 62, pending: 12, escalated: 4 },
  ];

  // Sample grievance details data
  const grievanceDetails = {
    "GRV-001": {
      caseId: "GRV-001",
      type: "Manual Scavenging",
      contractor: "ABC Sanitation Services",
      reportedDate: "2025-01-15",
      location: "Railway Station, Platform No. 2",
      reportedBy: "Station Master - rahul Kumar",
      priority: "High",
      status: "Action Required",
      description: "Reported manual scavenging activity at Railway Station Area. Workers were seen entering septic tank without proper safety equipment. Immediate action required to ensure worker safety and provide proper training and equipment.",
      officers: [
        { name: "Dr. Amit Kumar", designation: "District Nodal Officer", contact: "+91 9876543210", email: "amit.kumar@wb.gov.in" },
        { name: "Mrs. Priya Singh", designation: "Assistant Engineer", contact: "+91 9876543211", email: "priya.singh@wb.gov.in" },
        { name: "Mr. Ravi Sharma", designation: "Safety Inspector", contact: "+91 9876543212", email: "ravi.sharma@wb.gov.in" }
      ]
    }
  };

  const escalatedData = [
    { id: "GRV001", district: "Kolkata", officer: "Abishek Kumar", dateRaised: "2024-01-10", status: "Under Review" },
    { id: "GRV002", district: "Howrah", officer: "Priya Sharma", dateRaised: "2024-01-08", status: "Awaiting Response" },
    { id: "GRV003", district: "North 24 Parganas", officer: "Amit Patel", dateRaised: "2024-01-12", status: "In Progress" },
    { id: "GRV004", district: "Darjeeling", officer: "Sunita Desai", dateRaised: "2024-01-06", status: "Urgent" },
  ];

  const districtColumns = [
    { key: "district", header: "District", sortable: true },
    { key: "total", header: "Total", sortable: true },
    {
      key: "resolved",
      header: "Resolved",
      sortable: true,
      render: (value: number) => <span className="text-green-600 font-medium">{value}</span>,
    },
    {
      key: "pending",
      header: "Pending",
      sortable: true,
      render: (value: number) => <span className="text-yellow-600 font-medium">{value}</span>,
    },
    {
      key: "escalated",
      header: "Escalated",
      sortable: true,
      render: (value: number) => <span className="text-red-600 font-medium">{value}</span>,
    },

  ];

  const escalatedColumns = [
    { key: "id", header: "Grievance ID", sortable: true },
    { key: "district", header: "District", sortable: true },
    { key: "officer", header: "Nodal Officer", sortable: true },
    { key: "dateRaised", header: "Date Raised", sortable: true },
    {
      key: "status",
      header: "Status",
      render: (value: string) => {
        const colors = {
          "Under Review": "bg-blue-100 text-blue-800",
          "Awaiting Response": "bg-yellow-100 text-yellow-800",
          "In Progress": "bg-green-100 text-green-800",
          Urgent: "bg-red-100 text-red-800",
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value as keyof typeof colors]}`}>
            {value}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 min-h-screen p-6">
      <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">Grievances Management</h1>
            <p className="text-sm text-white/90">Track and resolve grievances across all districts</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 hidden md:block" aria-hidden />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {kpiData.map((kpi, index) => (
          <DashboardCard key={index} title={kpi.title} value={kpi.value} icon={kpi.icon} color={kpi.color} />
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white/70 backdrop-blur-md rounded-xl shadow-sm px-4">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("summary")}
            className={`py-3 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "summary"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            District Summary
          </button>
          <button
            onClick={() => setActiveTab("escalated")}
            className={`py-3 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "escalated"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Escalated Grievances
          </button>
        </nav>
      </div>

      {/* Table Styling */}
      <style>{`
        .excel-table {
          border-radius: 14px;
          overflow: hidden;
          border: 2px solid #222;
          box-shadow: 0 4px 16px 0 rgba(34,34,34,0.10);
        }
        .excel-table thead tr {
          background: linear-gradient(90deg, #6366f1 0%, #06b6d4 100%);
        }
        .excel-table th {
          font-weight: 700;
          color: #fff;
          border-bottom: 2.5px solid #a5b4fc;
          padding: 14px 18px;
          letter-spacing: 0.5px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.08);
        }
        .excel-table td {
          padding: 13px 18px;
          border-bottom: 1.5px solid #e0e7ff;
          background: #fff;
        }
        .excel-table tbody tr:hover td {
          background: #f0fdfa;
          transition: background 0.2s;
        }
        .excel-table td, .excel-table th {
          border-right: 1.5px solid #e0e7ff;
        }
        .excel-table td:last-child, .excel-table th:last-child {
          border-right: none;
        }
      `}</style>

      {/* Content */}
      {activeTab === "summary" ? (
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-indigo-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">District-wise Breakdown</h2>
          <div className="excel-table">
            <DataTable 
              title="District-wise Breakdown" 
              columns={districtColumns} 
              data={districtData} 
              tableClassName="excel-table"
              actions={true}
              onView={(row) => {
                setSelectedDistrict(row.district);
                setIsGrievanceDetailsOpen(true);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-indigo-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Escalated Grievances List</h2>
          <div className="excel-table">
            <DataTable title="Escalated Grievances List" columns={escalatedColumns} data={escalatedData} tableClassName="excel-table" />
          </div>
        </div>
      )}

      {/* Grievance Details Modal */}
      <Dialog open={isGrievanceDetailsOpen} onOpenChange={setIsGrievanceDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
              <Eye className="w-6 h-6 text-blue-600" />
              <span>Grievance Case Details - GRV-001</span>
            </DialogTitle>
            <DialogDescription>
              Complete case information and grievance details for {selectedDistrict}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {/* Case Overview */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Overview</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Case ID</label>
                    <p className="text-gray-900 font-semibold">GRV-001</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Contractor</label>
                    <p className="text-gray-900">ABC Sanitation Services</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Location</label>
                    <p className="text-gray-900 flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>Railway Station, Platform No. 2</span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Priority</label>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <Flag className="w-3 h-3 mr-1" />
                      High
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Type</label>
                    <p className="text-gray-900">Manual Scavenging</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Reported Date</label>
                    <p className="text-gray-900 flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>2025-01-15</span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Reported By</label>
                    <p className="text-gray-900 flex items-center space-x-1">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>Station Master - rahul Kumar</span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Action Required
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grievance Details */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Grievance Details</h3>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Message Description</h4>
                <p className="text-gray-700 leading-relaxed">
                  Reported manual scavenging activity at Railway Station Area. Workers were seen entering septic tank without proper safety equipment. Immediate action required to ensure worker safety and provide proper training and equipment.
                </p>
              </div>
            </div>

            {/* Assigned Officers */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned Officers</h3>
              <div className="grid gap-4">
                {grievanceDetails["GRV-001"].officers.map((officer, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{officer.name}</h4>
                          <p className="text-sm text-gray-600">{officer.designation}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>📱 {officer.contact}</span>
                            <span>✉️ {officer.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                          Contact
                        </button>
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                          Assign Task
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Grievances;
