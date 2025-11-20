// app/reports/safety-compliance/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import {
  FiShield,
  FiFilter,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiAlertTriangle,
  FiAlertOctagon,
  FiDownload,
  FiTrendingUp,
  FiTrendingDown,
} from 'react-icons/fi';

// --- 1. TYPE DEFINITION ---
// Based on the 6 columns you provided
type SafetyRecord = {
  id: number;
  workerName: string;
  ppeChecklist: 'Completed' | 'Pending' | 'Failed';
  lastViolation: string | null;
  complianceScore: number;
  supervisorRemarks: string;
};

// --- 2. MOCK DATA ---
// Data sourced from the "Safai Karmachari App" daily checklist
const DUMMY_RECORDS: SafetyRecord[] = [
  { id: 1, workerName: 'Ramesh Kumar', ppeChecklist: 'Completed', lastViolation: null, complianceScore: 95, supervisorRemarks: 'Excellent adherence to protocols.' },
  { id: 2, workerName: 'Sita Devi', ppeChecklist: 'Completed', lastViolation: '2025-10-15 (Damaged Boots)', complianceScore: 72, supervisorRemarks: 'Needs to report damaged PPE faster.' },
  { id: 3, workerName: 'Anil Singh', ppeChecklist: 'Failed', lastViolation: '2025-10-24 (No Mask)', complianceScore: 30, supervisorRemarks: 'Repeated non-compliance. Alert triggered.' },
  { id: 4, workerName: 'Mohammed Ali', ppeChecklist: 'Completed', lastViolation: null, complianceScore: 88, supervisorRemarks: 'Good, consistent performer.' },
  { id: 5, workerName: 'Priya Murugan', ppeChecklist: 'Pending', lastViolation: '2025-10-20 (Late start)', complianceScore: 65, supervisorRemarks: 'Checklist submitted late.' },
  { id: 6, workerName: 'Kavita', ppeChecklist: 'Completed', lastViolation: null, complianceScore: 92, supervisorRemarks: 'Very reliable.' },
  { id: 7, workerName: 'John P.', ppeChecklist: 'Failed', lastViolation: '2025-10-25 (No Gas Detector)', complianceScore: 20, supervisorRemarks: 'High-risk violation. Immediate follow-up.' },
  { id: 8, workerName: 'David L.', ppeChecklist: 'Completed', lastViolation: '2025-09-10 (Improper gloves)', complianceScore: 81, supervisorRemarks: 'Improved since last month.' },
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

// Helper function to get color based on score
const getScoreColor = (score: number) => {
  if (score >= 80) return 'statusHigh';
  if (score >= 50) return 'statusMedium';
  return 'statusLow';
};

// Helper function for PPE Checklist pill
const getPillForPPE = (status: 'Completed' | 'Pending' | 'Failed') => {
  switch (status) {
    case 'Completed':
      return <span className="statusPill statusHigh"><FiCheckCircle /> Completed</span>;
    case 'Pending':
      return <span className="statusPill statusMedium"><FiAlertTriangle /> Pending</span>;
    case 'Failed':
      return <span className="statusPill statusLow"><FiAlertOctagon /> Failed</span>;
    default:
      return <span className="statusPill">{status}</span>;
  }
};

// --- 4. MAIN PAGE COMPONENT ---

export default function SafetyComplianceReportPage() {
  // --- STATE MANAGEMENT ---
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // --- DERIVED STATE & MEMOIZATION ---

  // Memoized calculation for filtered records
  const filteredRecords = useMemo(() => {
    return DUMMY_RECORDS.filter((record) =>
      record.workerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Memoized calculation for paginated records
  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredRecords.slice(startIndex, endIndex);
  }, [filteredRecords, currentPage]);

  // Memoized stats for the dashboard cards
  const stats = useMemo(() => {
    const total = DUMMY_RECORDS.length;
    const totalScore = DUMMY_RECORDS.reduce((acc, r) => acc + r.complianceScore, 0);
    const averageScore = total > 0 ? (totalScore / total).toFixed(0) : 0;
    const activeViolations = DUMMY_RECORDS.filter(r => r.lastViolation !== null).length;
    const highRisk = DUMMY_RECORDS.filter(r => r.complianceScore < 50).length;
    
    return { averageScore, activeViolations, highRisk };
  }, []);

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

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // --- RENDER ---
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
        {/* --- HEADER / Title Banner --- */}
        <div className="titleBanner">
          <h1>Safety Compliance Report</h1>
        </div>

        {/* --- STATS GRID --- */}
        <section className="statsGrid">
          <StatCard
            title="Overall Compliance Score"
            value={`${stats.averageScore}%`}
            icon={<FiTrendingUp />}
            className="iconBlue"
          />
          <StatCard
            title="Active Violations"
            value={stats.activeViolations}
            icon={<FiAlertTriangle />}
            className="iconYellow"
          />
          <StatCard
            title="High-Risk Workers"
            value={stats.highRisk}
            icon={<FiTrendingDown />}
            className="iconRed"
          />
        </section>

        {/* --- MAIN REPORT TABLE (Report 8) --- */}
        <div className="card">
          <div className="cardHeader">
            <div className="cardTitle">
              <h2>Compliance Details</h2>
            </div>
            {/* --- FILTERS --- */}
            <div className="filters">
              <div className="filterInput">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search by worker name..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset page on search
                  }}
                />
              </div>
            </div>

            {/* --- Export moved under filters --- */}
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
                  <th>Worker Name</th>
                  <th>PPE Checklist</th>
                  <th>Last Violation</th>
                  <th>Supervisor Remarks</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.length > 0 ? (
                  paginatedRecords.map((record, index) => (
                    <tr key={record.id}>
                      {/* 1. Sl. No. */}
                      <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                      
                      {/* 2. Worker Name */}
                      <td className="workerName">{record.workerName}</td>
                      
                      {/* 3. PPE Checklist */}
                      <td className="ppeCell">
                        {getPillForPPE(record.ppeChecklist)}
                      </td>
                      
                      {/* 4. Last Violation */}
                      <td className={record.lastViolation ? 'violationCell' : ''}>
                        {record.lastViolation || 'N/A'}
                      </td>
                      
                      {/* 5. Supervisor Remarks */}
                      <td className="remarksCell">
                        {record.supervisorRemarks}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="noResults">
                      No safety records found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- PAGINATION --- */}
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
          padding: 1.5rem 2rem;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
            Arial, sans-serif;
        }

        /* Title banner to match district-dashboard style */
        .titleBanner {
          width: 100%;
          background: linear-gradient(90deg, #4f46e5 0%, #8b5cf6 40%, #ec4899 100%);
          border-radius: 8px;
          padding: 1rem 1.25rem;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.12);
          color: white;
          margin-bottom: 1rem;
        }
        .titleBanner h1 {
          margin: 0;
          font-size: 1.75rem;
          font-weight: 700;
        }

        /* Table visual improvements */
        .tableWrapper .table {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
        }
        .table thead tr {
          background: linear-gradient(90deg, #f0f9ff 0%, #e6f7ff 100%);
        }
        .table tbody tr:nth-child(even) { background: #fbfdff; }
        .table tbody tr:hover { background: rgba(16, 185, 129, 0.06); }

        /* --- Header --- */
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
          color: #008a2e; /* --green-dark */
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

        /* --- Stats Grid --- */
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
        .statCard.iconBlue { border-color: #007bff; /* --blue-dark */ }
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
        .statIcon.iconBlue { background-color: #e7f3ff; color: #007bff; }
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

        /* --- Card --- */
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

        /* --- Filters --- */
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
          min-width: 200px;
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
        .workerName {
          font-weight: 600;
          color: #007bff; /* --primary-color */
        }
        .noResults {
          text-align: center;
          padding: 3rem;
          color: #7f8c8d; /* --text-light */
          font-size: 1rem;
        }
        
        .remarksCell {
          white-space: normal;
          min-width: 250px;
        }
        
        .violationCell {
          color: #d90429; /* --red-dark */
          font-weight: 500;
        }

        /* --- Status Pills --- */
        .statusPill {
          padding: 0.3rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          text-transform: uppercase;
        }
        .statusPill :global(svg) {
          font-size: 0.9rem;
        }
        
        .statusHigh {
          background-color: #e6f7ec; /* --green-light */
          color: #008a2e; /* --green-dark */
        }
        .statusMedium {
          background-color: #fffbea; /* --yellow-light */
          color: #f39c12; /* --yellow-dark */
        }
        .statusLow {
          background-color: #fdeaea; /* --red-light */
          color: #d90429; /* --red-dark */
        }
        
        /* --- Compliance Score Bar --- */
        .scoreCell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          min-width: 150px;
        }
        .scoreBarWrapper {
          width: 100px;
          height: 8px;
          background-color: #e_a_eb_e_c; /* --border-color */
          border-radius: 4px;
          overflow: hidden;
        }
        .scoreBar {
          height: 100%;
          border-radius: 4px;
        }
        .scoreBar.statusHigh { background-color: #008a2e; }
        .scoreBar.statusMedium { background-color: #f39c12; }
        .scoreBar.statusLow { background-color: #d90429; }
        
        .scoreText {
          font-weight: 600;
          font-size: 0.9rem;
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
            grid-template-columns: 1fr 1fr;
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
      `}</style>
    </>
  );
}