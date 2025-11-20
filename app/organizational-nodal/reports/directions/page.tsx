// app/reports/directions-compliance/page.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  FiCompass,        // Icon for Directions
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,    // For Complied
  FiAlertTriangle,  // For Pending
  FiDownload,
  FiFileText,       // For Documents
  FiClock,          // For Days Pending / Aging
  FiArchive,        // For Total Received
  FiInbox,          // Alt for Received
  FiEye,            // For View button
} from 'react-icons/fi';

// --- 1. TYPE DEFINITION ---
// Based on the 8 columns
type DirectionStatus = 'Complied' | 'Pending';
type IssuingAuthority = 'ULB' | 'District' | 'State' | 'NSKC';

type DirectionRecord = {
  id: number; // Internal ID
  directionId: string; // Displayable ID like 'DIR001'
  issuingAuthority: IssuingAuthority;
  dateIssued: string;
  replyDate: string | null;
  status: DirectionStatus;
  daysPending: number;
  directionMessage: string; // Direction details/message
  supportingDocsLink?: string; // Optional link to documents
};

// Helper function to calculate days pending (can be done in backend too)
const calculateDaysPending = (dateIssued: string, status: DirectionStatus, replyDate: string | null): number => {
  if (status === 'Complied' || replyDate) {
    return 0; // Or calculate days taken if needed
  }
  const issueDate = new Date(dateIssued);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - issueDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0; // Return 0 if issue date is in future
};


// --- 2. MOCK DATA ---
// Data sourced from Direction Input form
const DUMMY_RECORDS_RAW: Omit<DirectionRecord, 'daysPending'>[] = [
  { id: 1, directionId: 'DIR001', issuingAuthority: 'NSKC', dateIssued: '2025-10-15', replyDate: '2025-10-20', status: 'Complied', directionMessage: 'Implement proper waste segregation protocols in all designated areas. Ensure compliance with safety standards and provide training to all personnel.', supportingDocsLink: '#' },
  { id: 2, directionId: 'DIR002', issuingAuthority: 'District', dateIssued: '2025-10-18', replyDate: null, status: 'Pending', directionMessage: 'Submit monthly progress report on sanitation work completion. Include photographic evidence and worker attendance records.' },
  { id: 3, directionId: 'DIR003', issuingAuthority: 'State', dateIssued: '2025-09-01', replyDate: null, status: 'Pending', directionMessage: 'Ensure all sanitation workers have proper PPE equipment. Conduct health checkups for all workers and maintain health records.' },
  { id: 4, directionId: 'DIR004', issuingAuthority: 'ULB', dateIssued: '2025-10-22', replyDate: '2025-10-25', status: 'Complied', directionMessage: 'Complete street cleaning schedule as per the assigned routes. Maintain cleanliness standards and report any issues immediately.', supportingDocsLink: '#' },
  { id: 5, directionId: 'DIR005', issuingAuthority: 'NSKC', dateIssued: '2025-10-24', replyDate: null, status: 'Pending', directionMessage: 'Provide skill development training to all registered workers. Submit training completion certificates and assessment reports.' },
  { id: 6, directionId: 'DIR006', issuingAuthority: 'District', dateIssued: '2025-08-15', replyDate: '2025-08-25', status: 'Complied', directionMessage: 'Update worker database with latest information. Verify all worker documents and ensure proper registration status.', supportingDocsLink: '#' },
  { id: 7, directionId: 'DIR007', issuingAuthority: 'State', dateIssued: '2025-10-05', replyDate: null, status: 'Pending', directionMessage: 'Implement digital attendance system for all workers. Ensure proper tracking of work hours and payment processing.' },
];

// Calculate daysPending for mock data
const DUMMY_RECORDS: DirectionRecord[] = DUMMY_RECORDS_RAW.map(record => ({
  ...record,
  daysPending: calculateDaysPending(record.dateIssued, record.status, record.replyDate),
}));


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
const StatusPill = ({ status }: { status: DirectionStatus }) => {
  switch (status) {
    case 'Complied':
      return <span className="statusPill statusHigh"><FiCheckCircle /> Complied</span>;
    case 'Pending':
      return <span className="statusPill statusMedium"><FiAlertTriangle /> Pending</span>;
    default:
      return <span className="statusPill">{status}</span>;
  }
};

// --- 4. MAIN PAGE COMPONENT ---

export default function DirectionsComplianceReportPage() {
  // --- STATE MANAGEMENT ---
  const [hasMounted, setHasMounted] = useState(false); // FOUC prevention
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDirection, setSelectedDirection] = useState<DirectionRecord | null>(null);
  const [showDirectionModal, setShowDirectionModal] = useState(false);
  const ITEMS_PER_PAGE = 10;

  // --- MOUNTING EFFECT ---
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // --- DERIVED STATE & MEMOIZATION ---

  // Memoized stats for RHS Metrics
  const stats = useMemo(() => {
    const totalReceived = DUMMY_RECORDS.length;
    const complied = DUMMY_RECORDS.filter(r => r.status === 'Complied').length;
    const pending = totalReceived - complied;
    const totalPendingDays = DUMMY_RECORDS.reduce((sum, r) => sum + (r.status === 'Pending' ? r.daysPending : 0), 0);
    const averagePendingDays = pending > 0 ? Number((totalPendingDays / pending).toFixed(0)) : 0;
    
    return { totalReceived, complied, pending, averagePendingDays };
  }, []);

  // Memoized calculation for filtered records (by Direction ID or Authority)
  const filteredRecords = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return DUMMY_RECORDS.filter((record) =>
      record.directionId.toLowerCase().includes(lowerSearchTerm) ||
      record.issuingAuthority.toLowerCase().includes(lowerSearchTerm)
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

  const handleViewDirection = (direction: DirectionRecord) => {
    setSelectedDirection(direction);
    setShowDirectionModal(true);
  };

  const closeDirectionModal = () => {
    setShowDirectionModal(false);
    setSelectedDirection(null);
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
          <h1>Directions Compliance Report</h1>
        </div>

        {/* --- 2. Stat Card Grid (RHS Metrics) --- */}
        <section className="statsGrid">
          <StatCard
            title="Total Directions Received"
            value={stats.totalReceived}
            icon={<FiInbox />}
            className="iconBlue"
          />
          <StatCard
            title="Complied Directions"
            value={stats.complied}
            icon={<FiCheckCircle />}
            className="iconGreen"
          />
          <StatCard
            title="Pending Directions"
            value={stats.pending}
            icon={<FiAlertTriangle />}
            className="iconYellow"
          />
           <StatCard
            title="Avg. Pending Days" // Aging Tracker representation
            value={stats.averagePendingDays > 0 ? `${stats.averagePendingDays} Days` : 'N/A'}
            icon={<FiClock />}
            className="iconRed" // Using red to highlight potential delays
          />
        </section>

        {/* --- 3. Main Report Table (Report 10) --- */}
        <div className="card">
          <div className="cardHeader">
            <div className="cardTitle">
              <h2>Direction Records</h2>
            </div>
            {/* Search Bar */}
            <div className="filters">
              <div className="filterInput">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search by ID or Authority..."
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
                  <th>Direction ID</th>
                  <th>Issuing Authority</th>
                  <th>Date Issued</th>
                  <th>Reply Date</th>
                  <th>Supporting Docs</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.length > 0 ? (
                  paginatedRecords.map((record, index) => (
                    <tr key={record.id} className={record.daysPending > 30 ? 'longPendingRow' : ''}> {/* Highlight long pending */}
                      {/* 1. Sl. No. */}
                      <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                      
                      {/* 2. Direction ID */}
                      <td>{record.directionId}</td>
                      
                      {/* 3. Issuing Authority */}
                      <td>{record.issuingAuthority}</td>
                      
                      {/* 4. Date Issued */}
                      <td>{record.dateIssued}</td>
                      
                      {/* 5. Reply Date */}
                      <td>{record.replyDate || 'N/A'}</td>
                      
                      {/* 6. Supporting Documents */}
                      <td className="docsCell">
                        {record.supportingDocsLink ? (
                          <a href={record.supportingDocsLink} target="_blank" rel="noopener noreferrer" title="View Document">
                            <FiFileText />
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                      
                      {/* 7. Actions */}
                      <td className="actionsCell">
                        <button 
                          className="viewButton"
                          onClick={() => handleViewDirection(record)}
                          title="View Direction Details"
                        >
                          <FiEye />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="noResults">
                      No direction records found matching your criteria.
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

        {/* --- DIRECTION DETAILS MODAL --- */}
        {showDirectionModal && selectedDirection && (
          <div className="modalOverlay" onClick={closeDirectionModal}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <div className="modalHeader">
                <h3>Direction Details - {selectedDirection.directionId}</h3>
                <button className="closeButton" onClick={closeDirectionModal}>
                  ×
                </button>
              </div>
              <div className="modalBody">
                <div className="directionInfo">
                  <div className="infoRow">
                    <span className="label">Issuing Authority:</span>
                    <span className="value">{selectedDirection.issuingAuthority}</span>
                  </div>
                  <div className="infoRow">
                    <span className="label">Date Issued:</span>
                    <span className="value">{selectedDirection.dateIssued}</span>
                  </div>
                  <div className="infoRow">
                    <span className="label">Reply Date:</span>
                    <span className="value">{selectedDirection.replyDate || 'Not replied yet'}</span>
                  </div>
                  <div className="infoRow">
                    <span className="label">Status:</span>
                    <span className="value">
                      <StatusPill status={selectedDirection.status} />
                    </span>
                  </div>
                </div>
                <div className="messageSection">
                  <h4>Direction Message:</h4>
                  <p className="directionMessage">{selectedDirection.directionMessage}</p>
                </div>
              </div>
            </div>
          </div>
        )}
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
          --red-dark: #d90429; 
          --blue-light: #e7f3ff;
          --blue-dark: #007bff; 
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
        
        /* Highlight long pending rows */
         .longPendingRow {
           /* background-color: #fffbea !important; */ /* Optional: subtle yellow background */
         }
         
         .daysPendingCell {
           font-weight: 500;
         }
         .pendingWarning {
           color: #f39c12; /* --yellow-dark */
         }
         .pendingCritical {
           color: #d90429; /* --red-dark */
           font-weight: 600;
         }
        
        
        .docsCell a {
           color: #007bff; /* --primary-color */
           text-decoration: none;
        }
         .docsCell a:hover {
           text-decoration: underline;
         }
         .docsCell :global(svg) {
           font-size: 1.1rem;
           vertical-align: middle;
         }

        /* --- Actions Cell --- */
        .actionsCell {
          text-align: center;
        }

        .viewButton {
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 50%;
          padding: 0.5rem;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
        }
        .viewButton:hover {
          background-color: #0056b3;
          transform: translateY(-1px) scale(1.1);
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
        
        .statusHigh { /* Complied */
          background-color: #e6f7ec; /* --green-light */
          color: #008a2e; /* --green-dark */
        }
        .statusMedium { /* Pending */
          background-color: #fffbea; /* --yellow-light */
          color: #f39c12; /* --yellow-dark */
        }

        /* --- Direction Modal --- */
        .modalOverlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modalContent {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modalHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e_a_eb_e_c;
        }

        .modalHeader h3 {
          margin: 0;
          font-size: 1.25rem;
          color: #2c3e50;
        }

        .closeButton {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #7f8c8d;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;
        }
        .closeButton:hover {
          background-color: #f4f7fa;
          color: #2c3e50;
        }

        .modalBody {
          padding: 1.5rem;
        }

        .directionInfo {
          margin-bottom: 1.5rem;
        }

        .infoRow {
          display: flex;
          margin-bottom: 1rem;
          align-items: center;
        }

        .infoRow .label {
          font-weight: 600;
          color: #2c3e50;
          min-width: 140px;
        }

        .infoRow .value {
          color: #555;
        }

        .messageSection h4 {
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
          color: #2c3e50;
        }

        .directionMessage {
          background-color: #f8f9fa;
          border-left: 4px solid #007bff;
          padding: 1rem;
          border-radius: 6px;
          line-height: 1.6;
          color: #2c3e50;
          margin: 0;
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
        @media (max-width: 992px) { 
          /* Adjust table cell padding or font size if needed */
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
