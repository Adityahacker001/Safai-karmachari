// app/reports/grievance/page.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  FiMessageSquare,   // Icon for Grievances/Messages
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,    // For Resolved
  FiAlertTriangle,  // For Pending
  FiShare,          // For Escalated
  FiDownload,
  FiActivity,       // For Action Taken
  FiAlertOctagon,   // Alt for Escalated or high priority pending
  FiArchive,        // For Total Received
} from 'react-icons/fi';

// --- 1. TYPE DEFINITION ---
// Based on the 9 columns
type GrievanceStatus = 'Pending' | 'Resolved' | 'Escalated';
type GrievanceType = 'Safety' | 'Payment' | 'Harassment' | 'Equipment' | 'Other';
type EscalatedTarget = 'Contractor' | 'ULB' | 'District Nodal' | null;

type GrievanceRecord = {
  id: number; // Corresponds to Grievance ID from form (auto-generated)
  grievanceId: string; // Displayable ID like 'GRV001'
  workerName: string;
  type: GrievanceType;
  description: string;
  dateReceived: string;
  actionTaken: string;
  status: GrievanceStatus;
  escalatedTo: EscalatedTarget;
};

// --- 2. MOCK DATA ---
// Data sourced from Grievance Feedback Input form
const DUMMY_RECORDS: GrievanceRecord[] = [
  { id: 1, grievanceId: 'GRV001', workerName: 'Ramesh Kumar', type: 'Safety', description: 'PPE kit not provided before entering sewer line.', dateReceived: '2025-10-22', actionTaken: 'Contractor notified. PPE provided.', status: 'Resolved', escalatedTo: null },
  { id: 2, grievanceId: 'GRV002', workerName: 'Sita Devi', type: 'Payment', description: 'Salary delayed by 10 days for last month.', dateReceived: '2025-10-15', actionTaken: 'Contractor instructed to release payment immediately.', status: 'Pending', escalatedTo: null },
  { id: 3, grievanceId: 'GRV003', workerName: 'Anil Singh', type: 'Harassment', description: 'Supervisor using abusive language regularly.', dateReceived: '2025-10-18', actionTaken: 'Initial warning given to supervisor. Monitoring.', status: 'Pending', escalatedTo: null },
  { id: 4, grievanceId: 'GRV004', workerName: 'Mohammed Ali', type: 'Equipment', description: 'Cleaning machine requires maintenance, not working properly.', dateReceived: '2025-10-20', actionTaken: 'Repair request submitted.', status: 'Resolved', escalatedTo: null },
  { id: 5, grievanceId: 'GRV005', workerName: 'Priya Murugan', type: 'Payment', description: 'Still pending salary after multiple reminders.', dateReceived: '2025-10-10', actionTaken: 'Issue escalated to District Nodal officer.', status: 'Escalated', escalatedTo: 'District Nodal' },
  { id: 6, grievanceId: 'GRV006', workerName: 'Kavita', type: 'Safety', description: 'No safety harness available for high-rise cleaning.', dateReceived: '2025-10-25', actionTaken: 'Pending investigation.', status: 'Pending', escalatedTo: null },
  { id: 7, grievanceId: 'GRV007', workerName: 'John P.', type: 'Other', description: 'Requesting transfer to a different zone due to personal reasons.', dateReceived: '2025-10-21', actionTaken: 'Request under consideration.', status: 'Pending', escalatedTo: null },
  { id: 8, grievanceId: 'GRV008', workerName: 'David L.', type: 'Harassment', description: 'Continued harassment despite initial warning.', dateReceived: '2025-10-26', actionTaken: 'Escalated to ULB HR department.', status: 'Escalated', escalatedTo: 'ULB' },
];

// --- 3. HELPER COMPONENTS ---

// StatCard Component
const StatCard = ({
  title,
  value,
  icon,
  className,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className: string;
}) => (
  <div className={`statCard ${className}`}>
    <div className={`statIcon ${className}`}>{icon}</div>
    <div className="statInfo">
      <span className="statValue">{value}</span>
      <span className="statTitle">{title}</span>
    </div>
  </div>
);

// Helper to get styled pill for Status
const StatusPill = ({ status }: { status: GrievanceStatus }) => {
  switch (status) {
    case 'Resolved':
      return <span className="statusPill statusHigh"><FiCheckCircle /> Resolved</span>;
    case 'Pending':
      return <span className="statusPill statusMedium"><FiAlertTriangle /> Pending</span>;
    case 'Escalated':
      return <span className="statusPill statusLow"><FiShare /> Escalated</span>;
    default:
      return <span className="statusPill">{status}</span>;
  }
};

// --- 4. MAIN PAGE COMPONENT ---

export default function GrievanceReportPage() {
  // --- STATE MANAGEMENT ---
  const [hasMounted, setHasMounted] = useState(false); // FOUC prevention
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // --- MOUNTING EFFECT ---
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // --- DERIVED STATE & MEMOIZATION ---

  // Memoized stats for RHS Metrics
  const stats = useMemo(() => {
    const totalReceived = DUMMY_RECORDS.length;
    const resolved = DUMMY_RECORDS.filter(r => r.status === 'Resolved').length;
    const pending = DUMMY_RECORDS.filter(r => r.status === 'Pending').length;
    const escalated = DUMMY_RECORDS.filter(r => r.status === 'Escalated').length;
    
    return { totalReceived, resolved, pending, escalated };
  }, []);

  // Memoized calculation for filtered records (by Worker Name or Grievance ID)
  const filteredRecords = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return DUMMY_RECORDS.filter((record) =>
      record.workerName.toLowerCase().includes(lowerSearchTerm) ||
      record.grievanceId.toLowerCase().includes(lowerSearchTerm)
    );
  }, [searchTerm]);

  // Memoized calculation for paginated records
  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredRecords.slice(startIndex, endIndex);
  }, [filteredRecords, currentPage]);

  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);

  // --- HANDLERS ---
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // --- RENDER ---
  if (!hasMounted) {
    return null; // Prevent FOUC
  }

  if (loading) {
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

  return (
    <>
      <div className="pageContainer">
        {/* --- TITLE BANNER --- */}
        <div className="titleBanner">
          <h1>Grievance Report</h1>
        </div>

        {/* --- 2. Stat Card Grid (RHS Metrics) --- */}
        <section className="statsGrid">
          <StatCard
            title="Total Grievances Received"
            value={stats.totalReceived}
            icon={<FiArchive />}
            className="iconBlue"
          />
          <StatCard
            title="Resolved Grievances"
            value={stats.resolved}
            icon={<FiCheckCircle />}
            className="iconGreen"
          />
          <StatCard
            title="Pending Grievances"
            value={stats.pending}
            icon={<FiAlertTriangle />}
            className="iconYellow"
          />
          <StatCard
            title="Escalated Grievances"
            value={stats.escalated}
            icon={<FiShare />}
            className="iconRed"
          />
        </section>

        {/* --- 3. Main Report Table (Report 12) --- */}
        <div className="card">
          <div className="cardHeader">
            <div className="cardTitle">
              <FiActivity />
              <h2>Grievance Records</h2>
            </div>
            {/* Search Bar */}
            <div className="filters">
              <div className="filterInput">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search by Worker or Grievance ID..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset page on search
                  }}
                />
              </div>
            </div>

            {/* Export controls moved under filters */}
            <div className="exportControls" style={{ marginTop: 12 }}>
              <button className="actionButton">
                <FiDownload />
                Export Report
              </button>
            </div>
          </div>

          {/* --- DATA TABLE --- */}
          <div className="tableWrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Grievance ID</th>
                  <th>Worker Name</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Date Received</th>
                  <th>Action Taken</th>
                  <th>Status</th>
                  <th>Escalated To</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.length > 0 ? (
                  paginatedRecords.map((record, index) => (
                    <tr key={record.id}>
                      {/* 1. Sl. No. */}
                      <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                      
                      {/* 2. Grievance ID */}
                      <td>{record.grievanceId}</td>
                      
                      {/* 3. Worker Name */}
                      <td className="workerName">{record.workerName}</td>
                      
                      {/* 4. Type */}
                      <td>{record.type}</td>
                      
                      {/* 5. Description */}
                      <td className="descriptionCell">{record.description}</td>
                      
                      {/* 6. Date Received */}
                      <td>{record.dateReceived}</td>
                      
                      {/* 7. Action Taken */}
                      <td className="actionCell">{record.actionTaken}</td>
                      
                      {/* 8. Status */}
                      <td><StatusPill status={record.status} /></td>
                      
                      {/* 9. Escalated To */}
                      <td>{record.escalatedTo || 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="noResults">
                      No grievance records found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- PAGINATION CONTROLS --- */}
          <div className="pagination">
            <span className="paginationInfo">
              Showing{' '}
              <strong>
                {paginatedRecords.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}
              </strong>
              -
              <strong>
                {(currentPage - 1) * ITEMS_PER_PAGE + paginatedRecords.length}
              </strong>{' '}
              of <strong>{filteredRecords.length}</strong>
            </span>
            <div className="paginationControls">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                <FiChevronLeft /> Prev
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- STYLES (CSS-in-JS using styled-jsx) --- */}
      <style jsx>{`
        /* --- Root Variables --- */
        :root {
          --primary-color: #007bff;
          --primary-hover: #0056b3;
          --bg-color: #f4f7fa;
          --card-bg: #ffffff;
          --text-dark: #2c3e50;
          --text-light: #7f8c8d;
          --border-color: #e_a_eb_e_c;
          --shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          
          --green-light: #e6f7ec;
          --green-dark: #008a2e;
          --yellow-light: #fffbea;
          --yellow-dark: #f39c12;
          --red-light: #fdeaea;
          --red-dark: #d90429; /* Using red for Escalated */
          --blue-light: #e7f3ff;
          --blue-dark: #007bff; /* Using blue for Total */
        }

        .pageContainer {
          padding: 1.5rem 2rem;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
            Arial, sans-serif;
        }

        /* Title banner */
        .titleBanner {
          width: 100%;
          background: linear-gradient(90deg, #4f46e5 0%, #8b5cf6 40%, #ec4899 100%);
          border-radius: 8px;
          padding: 1rem 1.25rem;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.12);
          color: white;
          margin-bottom: 1rem;
        }
        .titleBanner h1 { margin:0; font-size:1.75rem; font-weight:700 }

        /* Table visual improvements */
        .tableWrapper .table { border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(2,6,23,0.06); background:white }
        .table thead tr { background: linear-gradient(90deg, rgba(240,249,255,0.9) 0%, rgba(230,247,255,0.9) 100%); }
        .table tbody tr:nth-child(even) { background:#fbfdff }
        .table tbody tr:hover { background: rgba(99,102,241,0.04); transform:translateY(-1px); transition:all 0.15s }

        /* --- 1. Page Header --- */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e_a_eb_e_c; /* --border-color */
        }

        .headerTitle {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #2c3e50; /* --text-dark */
        }
        .headerTitle h1 {
          font-size: 1.75rem;
          font-weight: 600;
          margin: 0;
        }
        .headerTitle :global(svg) {
          font-size: 1.75rem;
          stroke-width: 2.5;
          color: #007bff; /* --primary-color */
        }

        .actionButton {
          background-color: #007bff; /* --primary-color */
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.75rem 1.25rem;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .actionButton :global(svg) {
          font-size: 1.1rem;
        }
        .actionButton:hover {
          background-color: #0056b3; /* --primary-hover */
        }

        /* --- 2. Stats Grid (RHS Metrics) --- */
        .statsGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .statCard {
          background-color: #ffffff; /* --card-bg */
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* --shadow */
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-left: 5px solid #007bff; /* --primary-color */
        }
        /* Color Overrides for Stat Cards */
        .statCard.iconBlue { border-color: #007bff; /* --blue-dark */ }
        .statCard.iconGreen { border-color: #008a2e; /* --green-dark */ }
        .statCard.iconYellow { border-color: #f39c12; /* --yellow-dark */ }
        .statCard.iconRed { border-color: #d90429; /* --red-dark */ }

        .statIcon {
          font-size: 1.5rem;
          padding: 0.75rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* Icon Background/Color */
        .statIcon.iconBlue { background-color: #e7f3ff; color: #007bff; }
        .statIcon.iconGreen { background-color: #e6f7ec; color: #008a2e; }
        .statIcon.iconYellow { background-color: #fffbea; color: #f39c12; }
        .statIcon.iconRed { background-color: #fdeaea; color: #d90429; }

        .statInfo {
          display: flex;
          flex-direction: column;
        }
        .statValue {
          font-size: 1.75rem;
          font-weight: 700;
          color: #2c3e50; /* --text-dark */
        }
        .statTitle {
          font-size: 0.9rem;
          color: #7f8c8d; /* --text-light */
        }

        /* --- 3. Card --- */
        .card {
          background-color: #ffffff; /* --card-bg */
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* --shadow */
          overflow: hidden;
        }

        .cardHeader {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #e_a_eb_e_c; /* --border-color */
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .cardTitle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #2c3e50; /* --text-dark */
        }
        .cardTitle h2 {
          margin: 0;
          font-size: 1.25rem;
        }
        .cardTitle :global(svg) {
           color: #007bff; /* --primary-color */
           font-size: 1.2rem;
        }

        /* --- Filters (Search Bar) --- */
        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .filterInput {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #f4f7fa; /* --bg-color */
          border: 1px solid #e_a_eb_e_c; /* --border-color */
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
        }
        .filterInput :global(svg) {
          color: #7f8c8d; /* --text-light */
        }
        .filterInput input {
          border: none;
          background-color: transparent;
          outline: none;
          font-size: 0.9rem;
          width: 100%;
          min-width: 250px;
        }

        /* --- Tables --- */
        .tableWrapper {
          overflow-x: auto;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .table th,
        .table td {
          padding: 1rem 1.5rem;
          text-align: left;
          white-space: nowrap;
          border-bottom: 1px solid #e_a_eb_e_c; /* --border-color */
          vertical-align: middle;
        }

        .table th {
          background-color: #f4f7fa; /* --bg-color */
          font-size: 0.8rem;
          text-transform: uppercase;
          color: #7f8c8d; /* --text-light */
          font-weight: 600;
        }

        .table td {
          font-size: 0.9rem;
          color: #2c3e50; /* --text-dark */
        }
        .table tbody tr:last-child td {
          border-bottom: none;
        }
        .table tbody tr:hover {
          background-color: #fcfcfc;
        }
        
        /* Column Specific Styles */
        .workerName {
          font-weight: 600;
          color: #007bff; /* --primary-color */
        }
        
        .descriptionCell, .actionCell {
          white-space: normal; /* Allow text wrapping */
          min-width: 250px; /* Adjust width as needed */
        }
        
        .noResults {
          text-align: center;
          padding: 3rem;
          color: #7f8c8d; /* --text-light */
          font-size: 1rem;
        }
        
        /* --- Status Pills --- */
        .statusPill {
          padding: 0.3rem 0.85rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          text-transform: uppercase;
        }
         .statusPill :global(svg) {
          font-size: 1rem;
          margin-right: 0.1rem;
         }
        
        .statusHigh { /* Resolved */
          background-color: #e6f7ec; /* --green-light */
          color: #008a2e; /* --green-dark */
        }
        .statusMedium { /* Pending */
          background-color: #fffbea; /* --yellow-light */
          color: #f39c12; /* --yellow-dark */
        }
        .statusLow { /* Escalated */
          background-color: #fdeaea; /* --red-light */
          color: #d90429; /* --red-dark */
        }


        /* --- Pagination --- */
        .pagination {
          padding: 1.5rem;
          border-top: 1px solid #e_a_eb_e_c; /* --border-color */
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .paginationInfo {
          font-size: 0.9rem;
          color: #7f8c8d; /* --text-light */
        }
        .paginationControls {
          display: flex;
          gap: 0.5rem;
        }
        .paginationControls button {
          background: #ffffff; /* --card-bg */
          border: 1px solid #e_a_eb_e_c; /* --border-color */
          color: #2c3e50; /* --text-dark */
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 500;
        }
        .paginationControls button:hover:not(:disabled) {
          background-color: #f4f7fa; /* --bg-color */
        }
        .paginationControls button:disabled {
          color: #7f8c8d; /* --text-light */
          cursor: not-allowed;
        }

        /* --- Responsive Design --- */
        @media (max-width: 992px) { /* Adjust breakpoint if needed */
           .descriptionCell, .actionCell {
             min-width: 150px;
           }
        }
        
        @media (max-width: 768px) {
          .pageContainer {
            padding: 1rem;
          }
          .header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .statsGrid {
            grid-template-columns: 1fr 1fr; /* 2 columns on smaller screens */
          }
          .cardHeader {
            flex-direction: column;
            align-items: flex-start;
          }
          .filters {
            width: 100%;
          }
          .filterInput {
            width: 100%;
          }
          .pagination {
            flex-direction: column;
            gap: 1rem;
          }
        }
         @media (max-width: 576px) {
             .statsGrid {
               grid-template-columns: 1fr; /* 1 column on very small screens */
             }
         }
      `}</style>
    </>
  );
}
