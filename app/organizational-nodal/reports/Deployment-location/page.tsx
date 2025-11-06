// app/reports/work-assignment/page.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  FiBriefcase,      // Icon for Work/Briefcase
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiUsers,          // For Workers
  FiMapPin,         // For Location
  FiList,           // For Category Breakdown
  FiCalendar,       // For Dates
  FiTool,           // Alt for Contractor/Work
} from 'react-icons/fi';

// --- 1. TYPE DEFINITION ---
// Based on the 9 columns
type WorkerCategoryBreakdown = {
  manualScavenging: number;
  ragpickers: number;
  hazardous: number;
  ordinarySKs: number;
};

type WorkAssignmentRecord = {
  id: number; // Internal ID
  workTitle: string;
  contractor: string;
  startDate: string;
  endDate: string;
  location: string;
  totalWorkers: number;
  categoryBreakdown: WorkerCategoryBreakdown;
  remarks: string;
};

// --- 2. MOCK DATA ---
// Data sourced from New Work Assignment form
const DUMMY_RECORDS: WorkAssignmentRecord[] = [
  { id: 1, workTitle: 'Sector 15 Sewer Line Cleaning', contractor: 'CleanCo Ltd.', startDate: '2025-10-01', endDate: '2025-12-31', location: 'Zone A, Sector 15', totalWorkers: 15, categoryBreakdown: { manualScavenging: 0, ragpickers: 0, hazardous: 10, ordinarySKs: 5 }, remarks: 'Deep cleaning required.' },
  { id: 2, workTitle: 'Hospital Waste Management Q4', contractor: 'EnviroClean', startDate: '2025-10-01', endDate: '2025-12-31', location: 'City General Hospital', totalWorkers: 8, categoryBreakdown: { manualScavenging: 0, ragpickers: 0, hazardous: 8, ordinarySKs: 0 }, remarks: 'Strict PPE adherence mandatory.' },
  { id: 3, workTitle: 'Market Area Sweeping (Nov)', contractor: 'Urban Solutions', startDate: '2025-11-01', endDate: '2025-11-30', location: 'Central Market Zone', totalWorkers: 25, categoryBreakdown: { manualScavenging: 0, ragpickers: 5, hazardous: 0, ordinarySKs: 20 }, remarks: 'Increased footfall expected.' },
  { id: 4, workTitle: 'Park Maintenance Year Contract', contractor: 'CleanCo Ltd.', startDate: '2025-01-01', endDate: '2025-12-31', location: 'Green Valley Park', totalWorkers: 12, categoryBreakdown: { manualScavenging: 0, ragpickers: 2, hazardous: 0, ordinarySKs: 10 }, remarks: 'Includes waste segregation.' },
  { id: 5, workTitle: 'Airport Zone C Cleaning', contractor: 'EnviroClean', startDate: '2025-10-15', endDate: '2026-01-15', location: 'International Airport, Zone C', totalWorkers: 18, categoryBreakdown: { manualScavenging: 0, ragpickers: 3, hazardous: 5, ordinarySKs: 10 }, remarks: '24/7 shifts required.' },
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

// Component to display Category Breakdown clearly
const CategoryBreakdownDisplay = ({ breakdown }: { breakdown: WorkerCategoryBreakdown }) => (
  <div className="categoryBreakdown">
    {breakdown.manualScavenging > 0 && <span>MS: {breakdown.manualScavenging}</span>}
    {breakdown.ragpickers > 0 && <span>RP: {breakdown.ragpickers}</span>}
    {breakdown.hazardous > 0 && <span>HZ: {breakdown.hazardous}</span>}
    {breakdown.ordinarySKs > 0 && <span>OS: {breakdown.ordinarySKs}</span>}
  </div>
);


// --- 4. MAIN PAGE COMPONENT ---

export default function WorkAssignmentReportPage() {
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
    const totalAssignments = DUMMY_RECORDS.length;
    const totalWorkersDeployed = DUMMY_RECORDS.reduce((sum, r) => sum + r.totalWorkers, 0);
    const uniqueContractors = new Set(DUMMY_RECORDS.map(r => r.contractor)).size;
    
    return { totalAssignments, totalWorkersDeployed, uniqueContractors };
  }, []);

  // Memoized calculation for filtered records (by Work Title or Contractor)
  const filteredRecords = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return DUMMY_RECORDS.filter((record) =>
      record.workTitle.toLowerCase().includes(lowerSearchTerm) ||
      record.contractor.toLowerCase().includes(lowerSearchTerm)
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
            <FiBriefcase />
            <h1>Deployment Location Report</h1>
          </div>
          <button className="actionButton">
            <FiDownload />
            Export Report
          </button>
        </header>

        {/* --- 2. Stat Card Grid --- */}
        <section className="statsGrid">
          <StatCard
            title="Total Active Assignments"
            value={stats.totalAssignments}
            icon={<FiList />}
            className="iconBlue"
          />
          <StatCard
            title="Total Workers Deployed"
            value={stats.totalWorkersDeployed}
            icon={<FiUsers />}
            className="iconGreen"
          />
          <StatCard
            title="Contractors Involved"
            value={stats.uniqueContractors}
            icon={<FiTool />}
            className="iconYellow"
          />
        </section>

        {/* --- 3. Main Report Table (Report 13) --- */}
        <div className="card">
          <div className="cardHeader">
            <div className="cardTitle">
              <FiBriefcase />
              <h2>Work Assignment Details</h2>
            </div>
            {/* Search Bar */}
            <div className="filters">
              <div className="filterInput">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search by Title or Contractor..."
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
                  <th>Work Title</th>
                  <th>Contractor</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Location</th>
                  <th>Total Workers</th>
                  <th>Category Breakdown</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.length > 0 ? (
                  paginatedRecords.map((record, index) => (
                    <tr key={record.id}>
                      {/* 1. Sl. No. */}
                      <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                      
                      {/* 2. Work Title */}
                      <td className="workTitle">{record.workTitle}</td>
                      
                      {/* 3. Contractor */}
                      <td>{record.contractor}</td>
                      
                      {/* 4. Start Date */}
                      <td>{record.startDate}</td>
                      
                      {/* 5. End Date */}
                      <td>{record.endDate}</td>
                      
                      {/* 6. Location */}
                      <td className="locationCell"><FiMapPin /> {record.location}</td>
                      
                      {/* 7. Total Workers */}
                      <td className="totalWorkersCell">{record.totalWorkers}</td>
                      
                      {/* 8. Category Breakdown */}
                      <td className="breakdownCell">
                         <CategoryBreakdownDisplay breakdown={record.categoryBreakdown} />
                      </td>
                      
                      {/* 9. Remarks */}
                      <td className="remarksCell">{record.remarks}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="noResults">
                      No work assignments found matching your criteria.
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

        /* --- 2. Stats Grid --- */
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
        .workTitle {
          font-weight: 600;
          white-space: normal; /* Allow title to wrap */
          min-width: 200px;
        }
        .locationCell {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #555;
        }
         .locationCell :global(svg) {
           color: #7f8c8d; /* --text-light */
           flex-shrink: 0;
         }
         
        .totalWorkersCell {
           font-weight: 500;
           text-align: center;
        }
        
        .breakdownCell {
           white-space: normal;
           min-width: 180px;
        }
        
        .remarksCell {
          white-space: normal; /* Allow remarks to wrap */
          min-width: 250px;
          max-width: 400px; /* Limit width */
          font-style: italic;
          color: #555;
        }
        
        .categoryBreakdown {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          font-size: 0.8rem;
        }
        .categoryBreakdown span {
          background-color: #f1f1f1; /* --grey-light */
          padding: 0.2rem 0.6rem;
          border-radius: 10px;
          color: #555; /* --grey-dark */
        }
        /* Optional: Add colors for categories */
        .categoryBreakdown span:first-child { background-color: #fdeaea; color: #d90429; } /* MS */
        .categoryBreakdown span:nth-child(2) { background-color: #e6f7ec; color: #008a2e; } /* RP */
        .categoryBreakdown span:nth-child(3) { background-color: #fffbea; color: #f39c12; } /* HZ */
        .categoryBreakdown span:last-child { background-color: #e7f3ff; color: #007bff; }  /* OS */
        
        .noResults {
          text-align: center;
          padding: 3rem;
          color: #7f8c8d; /* --text-light */
          font-size: 1rem;
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
           .remarksCell, .workTitle {
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
            grid-template-columns: 1fr; /* 1 column on smaller screens */
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
