// app/reports/medical-examination/page.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  FiHeart,          // Icon for health/medical
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,    // For completed/Yes
  FiAlertTriangle,  // For follow-up needed/Pending
  FiCalendar,       // For dates
  FiDownload,
  FiActivity,       // For Findings
  FiClock,          // For overdue
  FiXCircle,        // For No
} from 'react-icons/fi';

// --- 1. TYPE DEFINITION ---
// Based on the 6 columns
type MedicalRecord = {
  id: number;
  workerName: string;
  lastExamDate: string;
  findings: string;
  followUpRequired: boolean;
  nextExamDue: string;
};

// --- 2. MOCK DATA ---
// Data sourced from Medical Examination Input form
const DUMMY_RECORDS: MedicalRecord[] = [
  { id: 1, workerName: 'Ramesh Kumar', lastExamDate: '2025-09-15', findings: 'Normal check-up, fit for duty.', followUpRequired: false, nextExamDue: '2026-09-15' },
  { id: 2, workerName: 'Sita Devi', lastExamDate: '2025-08-20', findings: 'Slight respiratory issue noted. Advised rest.', followUpRequired: true, nextExamDue: '2025-11-20' },
  { id: 3, workerName: 'Anil Singh', lastExamDate: '2025-10-01', findings: 'Minor skin irritation.', followUpRequired: false, nextExamDue: '2026-10-01' },
  { id: 4, workerName: 'Mohammed Ali', lastExamDate: '2025-07-10', findings: 'Fit. No issues reported.', followUpRequired: false, nextExamDue: '2026-07-10' },
  { id: 5, workerName: 'Priya Murugan', lastExamDate: '2025-09-05', findings: 'Needs follow-up for blood pressure.', followUpRequired: true, nextExamDue: '2025-10-05' }, // Overdue
  { id: 6, workerName: 'Kavita', lastExamDate: '2025-10-12', findings: 'Cleared.', followUpRequired: false, nextExamDue: '2026-10-12' },
  { id: 7, workerName: 'John P.', lastExamDate: '2025-06-01', findings: 'Previous back issue resolved.', followUpRequired: false, nextExamDue: '2025-12-01' },
  { id: 8, workerName: 'David L.', lastExamDate: '2025-09-28', findings: 'Hearing test recommended.', followUpRequired: true, nextExamDue: '2025-12-28' },
  { id: 9, workerName: 'Ravi Verma', lastExamDate: '2025-05-15', findings: 'All parameters normal.', followUpRequired: false, nextExamDue: '2025-11-15' },
  { id: 10, workerName: 'Meena Kumari', lastExamDate: '2025-10-18', findings: 'General fitness check.', followUpRequired: false, nextExamDue: '2026-10-18' },
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

// Helper function to check if a date is overdue
const isOverdue = (dueDate: string): boolean => {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to beginning of the day for comparison
  const examDueDate = new Date(dueDate);
  return examDueDate < today;
};

// Helper to get styled pill for Follow-up Required
const FollowUpPill = ({ required }: { required: boolean }) => {
  return required ? (
    <span className="statusPill statusMedium">
      <FiAlertTriangle /> Yes
    </span>
  ) : (
    <span className="statusPill statusLow">
      <FiXCircle /> No
    </span>
  );
};

// --- 4. MAIN PAGE COMPONENT ---

export default function MedicalExaminationReportPage() {
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
    const completedExams = DUMMY_RECORDS.length; // Assuming all records are completed exams
    const followUpNeeded = DUMMY_RECORDS.filter(r => r.followUpRequired).length;
    const overdueCases = DUMMY_RECORDS.filter(r => isOverdue(r.nextExamDue)).length;
    
    return { completedExams, followUpNeeded, overdueCases };
  }, []);

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
            <FiHeart />
            <h1>Medical Examination Report</h1>
          </div>
          <button className="actionButton">
            <FiDownload />
            Export Report
          </button>
        </header>

        {/* --- 2. Stat Card Grid (RHS Metrics) --- */}
        <section className="statsGrid">
          <StatCard
            title="Completed Exams (Total)"
            value={stats.completedExams}
            icon={<FiCheckCircle />}
            className="iconGreen"
          />
          <StatCard
            title="Follow-up Required"
            value={stats.followUpNeeded}
            icon={<FiAlertTriangle />}
            className="iconYellow"
          />
          <StatCard
            title="Overdue Exams"
            value={stats.overdueCases}
            icon={<FiClock />}
            className="iconRed"
          />
        </section>

        {/* --- 3. Main Report Table (Report 6) --- */}
        <div className="card">
          <div className="cardHeader">
            <div className="cardTitle">
              <FiActivity />
              <h2>Medical Examination Records</h2>
            </div>
            {/* Search Bar */}
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
          </div>

          {/* --- DATA TABLE --- */}
          <div className="tableWrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Worker Name</th>
                  <th>Last Exam Date</th>
                  <th>Findings</th>
                  <th>Follow-up Required</th>
                  <th>Next Exam Due</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.length > 0 ? (
                  paginatedRecords.map((record, index) => {
                    const overdue = isOverdue(record.nextExamDue);
                    return (
                      <tr key={record.id} className={overdue ? 'overdueRow' : ''}>
                        {/* 1. Sl. No. */}
                        <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                        
                        {/* 2. Worker Name */}
                        <td className="workerName">{record.workerName}</td>
                        
                        {/* 3. Last Exam Date */}
                        <td>{record.lastExamDate}</td>
                        
                        {/* 4. Findings */}
                        <td className="findingsCell">{record.findings}</td>
                        
                        {/* 5. Follow-up Required */}
                        <td><FollowUpPill required={record.followUpRequired} /></td>
                        
                        {/* 6. Next Exam Due */}
                        <td className={overdue ? 'overdueDate' : ''}>
                          {record.nextExamDue}
                          {overdue && <FiClock style={{ marginLeft: '8px', verticalAlign: 'middle' }} />}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="noResults">
                      No medical records found matching your criteria.
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
          color: #d90429; /* --red-dark, using red for medical/heart */
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
        
        /* Highlight overdue row */
        .overdueRow {
           background-color: #fdeaea !important; /* --red-light */
        }
        .overdueDate {
          color: #d90429; /* --red-dark */
          font-weight: 600;
        }
        .overdueDate :global(svg) {
           color: #d90429; /* --red-dark */
        }
        
        /* Column Specific Styles */
        .workerName {
          font-weight: 600;
          color: #007bff; /* --primary-color */
        }
        
        .findingsCell {
          white-space: normal; /* Allow findings to wrap */
          min-width: 300px;
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
          display: inline-flex; /* Use inline-flex for icon alignment */
          align-items: center;
          gap: 0.4rem;
          text-transform: uppercase;
        }
         .statusPill :global(svg) {
          font-size: 1rem;
          margin-right: 0.1rem; /* Adjust icon spacing */
         }
        
        .statusHigh { /* Using High for 'Yes' (follow-up needed) */
          background-color: #e6f7ec; /* --green-light */
          color: #008a2e; /* --green-dark */
        }
        .statusMedium { /* Using Medium for 'Yes' (follow-up needed) */
          background-color: #fffbea; /* --yellow-light */
          color: #f39c12; /* --yellow-dark */
        }
        .statusLow { /* Using Low for 'No' (no follow-up) */
          background-color: #f1f1f1; /* lighter grey */
          color: #555; /* --grey-dark */
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
          .findingsCell {
            min-width: 200px; /* Adjust for smaller screens */
          }
        }
      `}</style>
    </>
  );
}
