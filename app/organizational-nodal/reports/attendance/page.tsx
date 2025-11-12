// app/reports/attendance/page.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react'; // useEffect ko import kiya
import {
  FiCalendar,
  FiFilter,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,    // For high score
  FiAlertTriangle,  // For medium score
  FiMinusCircle,    // For absences
  FiClock,          // For late entries
  FiDownload,
  FiTrendingUp,
  FiTrendingDown,
} from 'react-icons/fi';

// --- 1. TYPE DEFINITION ---
// Based on the 6 columns you provided
type AttendanceRecord = {
  id: number;
  workerName: string;
  totalDaysWorked: number; //
  absences: number; //
  lateEntries: number; //
  attendanceScore: number; //
};

// --- 2. MOCK DATA ---
// Data sourced from the "Safai Karmachari App"
const DUMMY_RECORDS: AttendanceRecord[] = [
  { id: 1, workerName: 'Ramesh Kumar', totalDaysWorked: 25, absences: 1, lateEntries: 0, attendanceScore: 96 },
  { id: 2, workerName: 'Sita Devi', totalDaysWorked: 22, absences: 4, lateEntries: 2, attendanceScore: 75 },
  { id: 3, workerName: 'Anil Singh', totalDaysWorked: 15, absences: 11, lateEntries: 5, attendanceScore: 40 },
  { id: 4, workerName: 'Mohammed Ali', totalDaysWorked: 26, absences: 0, lateEntries: 1, attendanceScore: 92 },
  { id: 5, workerName: 'Priya Murugan', totalDaysWorked: 24, absences: 2, lateEntries: 3, attendanceScore: 85 },
  { id: 6, workerName: 'Kavita', totalDaysWorked: 20, absences: 6, lateEntries: 1, attendanceScore: 68 },
  { id: 7, workerName: 'John P.', totalDaysWorked: 26, absences: 0, lateEntries: 0, attendanceScore: 100 },
  { id: 8, workerName: 'David L.', totalDaysWorked: 23, absences: 3, lateEntries: 4, attendanceScore: 79 },
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
  if (score >= 90) return 'statusHigh';
  if (score >= 70) return 'statusMedium';
  return 'statusLow';
};


// --- 4. MAIN PAGE COMPONENT ---

export default function AttendanceReportPage() {
  // --- STATE MANAGEMENT ---
  const [hasMounted, setHasMounted] = useState(false); // FOUC se bachne ke liye state add kiya
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // --- MOUNTING EFFECT ---
  // Yeh effect component ke client par mount hone ke baad hi chalega
  useEffect(() => {
    setHasMounted(true);
  }, []);

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
    const totalScore = DUMMY_RECORDS.reduce((acc, r) => acc + r.attendanceScore, 0);
    const averageScore = totalScore > 0 ? (totalScore / DUMMY_RECORDS.length).toFixed(0) : 0;
    const totalAbsences = DUMMY_RECORDS.reduce((acc, r) => acc + r.absences, 0);
    const totalLate = DUMMY_RECORDS.reduce((acc, r) => acc + r.lateEntries, 0);
    
    return { averageScore, totalAbsences, totalLate };
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

  // --- RENDER ---

  // Jab tak component mount nahi hota, kuch bhi render na karein
  // Isse FOUC (Flash of Unstyled Content) ya "skeleton" dikhne ki problem solve hoti hai
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="pageContainer">
        {/* --- HEADER / Title Banner --- */}
        <div className="titleBanner">
          <h1>Attendance-wise Worker Report</h1>
        </div>

        {/* --- STATS GRID --- */}
        <section className="statsGrid">
          <StatCard
            title="Average Attendance Score"
            value={`${stats.averageScore}%`}
            icon={<FiTrendingUp />}
            className="iconBlue"
          />
          <StatCard
            title="Total Absences (This Period)"
            value={stats.totalAbsences}
            icon={<FiMinusCircle />}
            className="iconRed"
          />
          <StatCard
            title="Total Late Entries"
            value={stats.totalLate}
            icon={<FiClock />}
            className="iconYellow"
          />
        </section>

        {/* --- MAIN REPORT TABLE (Report 9) --- */}
        <div className="card">
          <div className="cardHeader">
            <div className="cardTitle">
              <h2>Attendance Details</h2>
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

            {/* --- Export / Refresh moved under filters --- */}
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
                  <th>Total Days Worked</th>
                  <th>Absences</th>
                  <th>Late Entries</th>
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
                      
                      {/* 3. Total Days Worked */}
                      <td className="daysWorked">
                        {record.totalDaysWorked} days
                      </td>
                      
                      {/* 4. Absences */}
                      <td className="absences">
                        {record.absences > 0 ? (
                          <span className="statusPill statusLow">
                            <FiMinusCircle /> {record.absences}
                          </span>
                        ) : (
                          '0'
                        )}
                      </td>
                      
                      {/* 5. Late Entries */}
                      <td className="lateEntries">
                        {record.lateEntries > 0 ? (
                          <span className="statusPill statusMedium">
                            <FiClock /> {record.lateEntries}
                          </span>
                        ) : (
                          '0'
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="noResults">
                      No attendance records found matching your criteria.
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

        /* Table visual improvements (clean, professional) */
        .tableWrapper .table {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(2,6,23,0.06);
          background: white;
        }
        .table thead tr {
          background: linear-gradient(90deg, rgba(99,102,241,0.10) 0%, rgba(236,72,153,0.06) 100%);
        }
        .table th {
          color: #1f2937; /* gray-800 */
          font-weight: 600;
          padding: 0.95rem 1.25rem;
          font-size: 0.85rem;
          text-transform: none;
        }
        .table td {
          padding: 0.95rem 1.25rem;
          vertical-align: middle;
          color: #334155; /* gray-700 */
        }
        .table tbody tr:nth-child(even) {
          background: #fbfdff;
        }
        .table tbody tr:nth-child(odd) {
          background: white;
        }
        .table tbody tr {
          transition: background-color 0.18s ease, transform 0.12s ease;
        }
        .table tbody tr:hover {
          background: rgba(99,102,241,0.04);
          transform: translateY(-1px);
        }

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

        /* --- Stats Grid --- */
        .statsGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .statCard {
          background-color: #ffffff; /* --card-bg */
          border-radius: 10px;
          box-shadow: 0 8px 20px rgba(2,6,23,0.04); /* --shadow */
          padding: 1.25rem;
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
        .workerName {
          font-weight: 600;
          color: #007bff; /* --primary-color */
        }
        .daysWorked {
          font-weight: 500;
        }
        .noResults {
          text-align: center;
          padding: 3rem;
          color: #7f8c8d; /* --text-light */
          font-size: 1rem;
        }
        
        /* --- Status Pills (Absences, Late) --- */
        .statusPill {
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          letter-spacing: 0.2px;
          text-transform: none;
        }
        .statusPill :global(svg) {
          font-size: 0.9rem;
          stroke-width: 2.5;
        }
        
        .statusHigh {
          background-color: rgba(16,185,129,0.08);
          color: #059669; /* emerald-500 */
        }
        .statusMedium {
          background-color: rgba(250,204,21,0.08);
          color: #d97706; /* amber-600 */
        }
        .statusLow {
          background-color: rgba(239,68,68,0.06);
          color: #dc2626; /* red-600 */
        }
        
        /* --- Attendance Score Bar --- */
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
          transition: width 0.3s ease-out;
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
            grid-template-columns: 1fr;
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
