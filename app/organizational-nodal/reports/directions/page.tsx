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
  { id: 1, directionId: 'DIR001', issuingAuthority: 'NSKC', dateIssued: '2025-10-15', replyDate: '2025-10-20', status: 'Complied', supportingDocsLink: '#' },
  { id: 2, directionId: 'DIR002', issuingAuthority: 'District', dateIssued: '2025-10-18', replyDate: null, status: 'Pending' },
  { id: 3, directionId: 'DIR003', issuingAuthority: 'State', dateIssued: '2025-09-01', replyDate: null, status: 'Pending' }, // Long pending
  { id: 4, directionId: 'DIR004', issuingAuthority: 'ULB', dateIssued: '2025-10-22', replyDate: '2025-10-25', status: 'Complied', supportingDocsLink: '#' },
  { id: 5, directionId: 'DIR005', issuingAuthority: 'NSKC', dateIssued: '2025-10-24', replyDate: null, status: 'Pending' },
  { id: 6, directionId: 'DIR006', issuingAuthority: 'District', dateIssued: '2025-08-15', replyDate: '2025-08-25', status: 'Complied', supportingDocsLink: '#' },
  { id: 7, directionId: 'DIR007', issuingAuthority: 'State', dateIssued: '2025-10-05', replyDate: null, status: 'Pending' },
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
  const ITEMS_PER_PAGE = 10;

  // --- MOUNTING EFFECT ---
  useEffect(() => {
    setHasMounted(true);
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

  // --- RENDER ---
  if (!hasMounted) {
    return null; // Prevent FOUC
  }

  return (
    <>
      <div className="pageContainer">
        {/* --- 1. Page Header --- */}
        <header className="header">
          <div className="headerTitle">
            <FiCompass />
            <h1>Directions Compliance Report</h1>
          </div>
          <button className="actionButton">
            <FiDownload />
            Export Report
          </button>
        </header>

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
                  <th>Status</th>
                  <th>Days Pending</th>
                  <th>Supporting Docs</th>
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
                      
                      {/* 6. Status */}
                      <td><StatusPill status={record.status} /></td>
                      
                      {/* 7. Days Pending */}
                      <td className={`daysPendingCell ${record.daysPending > 15 ? 'pendingWarning' : ''} ${record.daysPending > 30 ? 'pendingCritical' : ''}`}>
                         {record.status === 'Pending' ? `${record.daysPending} days` : '-'}
                      </td>
                      
                      {/* 8. Supporting Documents */}
                      <td className="docsCell">
                        {record.supportingDocsLink ? (
                          <a href={record.supportingDocsLink} target="_blank" rel="noopener noreferrer" title="View Document">
                            <FiFileText />
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="noResults">
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
          background-color: #f4f7fa; /* --bg-color */
          padding: 1.5rem 2rem;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
            Arial, sans-serif;
        }

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
