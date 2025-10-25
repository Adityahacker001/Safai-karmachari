// app/reports/training/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import {
  FiClipboard,
  FiFilter,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiAlertTriangle,
  FiBarChart2,
  FiBookOpen,
  FiTrendingUp,
  FiTrendingDown,
  FiPlusCircle,
  FiAlertOctagon, // For overdue
} from 'react-icons/fi';

// --- 1. TYPE DEFINITIONS ---

// For Main Training Report (Report 4)
type MainTrainingRecord = {
  id: number;
  workerName: string;
  module: string;
  completionDate: string | null;
  trainer: string;
  status: 'Completed' | 'Pending';
  contractor: string; // For filtering
  workerCategory: 'Hazardous' | 'Ordinary SK' | 'Ragpicker'; // For filtering
};

// For Pending Training Report (Exception Report 1)
type PendingTrainingRecord = {
  id: number;
  workerName: string;
  assignedModule: string;
  dueDate: string;
  status: 'Pending' | 'Overdue';
  trainer: string;
};

// For Worker Performance Snapshot
type WorkerPerformance = {
  id: number;
  workerName: string;
  // Based on your text, one shows a score, the other just the status
  trainingStatus: string; 
};

// --- 2. MOCK DATA ---
// Data sourced from "Training Completion Input" forms
const DUMMY_MAIN_RECORDS: MainTrainingRecord[] = [
  { id: 1, workerName: 'Ramesh Kumar', module: 'Sewer Safety', completionDate: '2025-10-15', trainer: 'A. Gupta', status: 'Completed', contractor: 'CleanCo Ltd.', workerCategory: 'Hazardous' },
  { id: 2, workerName: 'Sita Devi', module: 'PPE Usage', completionDate: '2025-10-12', trainer: 'R. Sharma', status: 'Completed', contractor: 'EnviroClean', workerCategory: 'Ragpicker' },
  { id: 3, workerName: 'Anil Singh', module: 'Sewer Safety', completionDate: null, trainer: 'A. Gupta', status: 'Pending', contractor: 'CleanCo Ltd.', workerCategory: 'Hazardous' },
  { id: 4, workerName: 'Mohammed Ali', module: 'Mechanized Cleaning', completionDate: '2025-09-30', trainer: 'S. Iyer', status: 'Completed', contractor: 'Urban Solutions', workerCategory: 'Ordinary SK' },
  { id: 5, workerName: 'Priya Murugan', module: 'PPE Usage', completionDate: null, trainer: 'R. Sharma', status: 'Pending', contractor: 'EnviroClean', workerCategory: 'Ragpicker' },
  { id: 6, workerName: 'Kavita', module: 'Mechanized Cleaning', completionDate: '2025-10-01', trainer: 'S. Iyer', status: 'Completed', contractor: 'CleanCo Ltd.', workerCategory: 'Ordinary SK' },
  { id: 7, workerName: 'John P.', module: 'First Aid', completionDate: '2025-10-20', trainer: 'Dr. B. Das', status: 'Completed', contractor: 'EnviroClean', workerCategory: 'Hazardous' },
  { id: 8, workerName: 'Ramesh Kumar', module: 'PPE Usage', completionDate: '2025-10-15', trainer: 'R. Sharma', status: 'Completed', contractor: 'CleanCo Ltd.', workerCategory: 'Hazardous' },
  { id: 9, workerName: 'Sita Devi', module: 'First Aid', completionDate: null, trainer: 'Dr. B. Das', status: 'Pending', contractor: 'EnviroClean', workerCategory: 'Ragpicker' },
  { id: 10, workerName: 'David L.', module: 'Sewer Safety', completionDate: null, trainer: 'A. Gupta', status: 'Pending', contractor: 'Urban Solutions', workerCategory: 'Hazardous' },
];

// Data for Exception Report (Report 1)
const DUMMY_PENDING_RECORDS: PendingTrainingRecord[] = [
  { id: 3, workerName: 'Anil Singh', assignedModule: 'Sewer Safety', dueDate: '2025-10-20', status: 'Pending', trainer: 'A. Gupta' },
  { id: 5, workerName: 'Priya Murugan', assignedModule: 'PPE Usage', dueDate: '2025-10-18', status: 'Pending', trainer: 'R. Sharma' },
  { id: 9, workerName: 'Sita Devi', assignedModule: 'First Aid', dueDate: '2025-10-25', status: 'Pending', trainer: 'Dr. B. Das' },
  { id: 10, workerName: 'David L.', assignedModule: 'Sewer Safety', dueDate: '2025-10-01', status: 'Overdue', trainer: 'A. Gupta' },
];

// Data for Performance Snapshot
const DUMMY_TOP_WORKERS: WorkerPerformance[] = [
  { id: 1, workerName: 'Ramesh Kumar', trainingStatus: '100% (20/20)' },
  { id: 7, workerName: 'John P.', trainingStatus: '100% (20/20)' },
  { id: 4, workerName: 'Mohammed Ali', trainingStatus: '100% (20/20)' },
  { id: 6, workerName: 'Kavita', trainingStatus: '100% (20/20)' },
  { id: 2, workerName: 'Sita Devi', trainingStatus: '95% (19/20)' },
];

const DUMMY_BOTTOM_WORKERS: WorkerPerformance[] = [
  { id: 10, workerName: 'David L.', trainingStatus: '1 Module Overdue' },
  { id: 3, workerName: 'Anil Singh', trainingStatus: '1 Module Pending' },
  { id: 5, workerName: 'Priya Murugan', trainingStatus: '1 Module Pending' },
  { id: 9, workerName: 'Sita Devi (Mock)', trainingStatus: '1 Module Pending' },
  { id: 11, workerName: 'Test Worker', trainingStatus: '1 Module Pending' },
];


// --- 3. HELPER COMPONENTS ---

// StatCard Component (for RHS Metrics)
const StatCard = ({
  title,
  value,
  icon,
  className, // We will pass 'iconGreen', 'iconYellow', etc.
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className: string;
}) => (
  <div className={`statCard ${className}`}> {/* Apply className to the card itself for the border */}
    <div className={`statIcon ${className}`}>{icon}</div>
    <div className="statInfo">
      <span className="statValue">{value}</span>
      <span className="statTitle">{title}</span>
    </div>
  </div>
);

// --- 4. MAIN PAGE COMPONENT ---

export default function TrainingDashboardPage() {
  // --- STATE MANAGEMENT ---
  const [filterContractor, setFilterContractor] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // --- DERIVED STATE & MEMOIZATION ---

  // Get unique values for filters
  const uniqueContractors = useMemo(
    () => [...new Set(DUMMY_MAIN_RECORDS.map((r) => r.contractor))],
    []
  );
  const uniqueCategories = useMemo(
    () => [...new Set(DUMMY_MAIN_RECORDS.map((r) => r.workerCategory))],
    []
  );

  // Memoized data for Stat Cards (RHS Metrics Button)
  const stats = useMemo(() => {
    const totalRecords = DUMMY_MAIN_RECORDS.length;
    const completed = DUMMY_MAIN_RECORDS.filter(
      (r) => r.status === 'Completed'
    ).length;
    const pending = totalRecords - completed;
    const overdue = DUMMY_PENDING_RECORDS.filter(
      (r) => r.status === 'Overdue'
    ).length;
    return {
      trained: completed, // "total number of workers trained"
      pending: pending, // "pending training modules"
      overdue: overdue,
    };
  }, []);

  // Memoized & Filtered data for the Bar Chart (Chart 6)
  const barChartData = useMemo(() => {
    const filtered = DUMMY_MAIN_RECORDS.filter((r) =>
      (filterContractor === 'All' || r.contractor === filterContractor) &&
      (filterCategory === 'All' || r.workerCategory === filterCategory)
    );

    const modules = [...new Set(filtered.map((r) => r.module))];
    
    return modules.map(moduleName => {
      return {
        name: moduleName, // X-axis: Training Modules
        Completed: filtered.filter(r => r.module === moduleName && r.status === 'Completed').length,
        Pending: filtered.filter(r => r.module === moduleName && r.status === 'Pending').length,
      };
    }); // Y-axis: Number of Workers (count)
  }, [filterContractor, filterCategory]);


  // Memoized & Filtered data for Main Training Report Table (Report 4)
  const paginatedMainReport = useMemo(() => {
    const filtered = DUMMY_MAIN_RECORDS.filter(r => 
      r.workerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [searchTerm, currentPage]);

  const totalPages = Math.ceil(
    DUMMY_MAIN_RECORDS.filter(r => 
      r.workerName.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / ITEMS_PER_PAGE
  );

  // --- HANDLERS ---
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // --- RENDER ---
  return (
    <>
      <div className="pageContainer">
        {/* --- HEADER --- */}
        <header className="header">
          <div className="headerTitle">
            <FiClipboard />
            <h1>Training & Compliance Dashboard</h1>
          </div>
          {/* This button represents the action from "Source of Data" */}
          <button className="actionButton">
            <FiPlusCircle />
            Log Training Completion
          </button>
        </header>

        {/* --- 1. RHS METRICS BUTTONS (STATS ROW) --- */}
        <section className="statsGrid">
          <StatCard
            title="Total Workers Trained"
            value={stats.trained}
            icon={<FiCheckCircle />}
            className="iconGreen" // This class controls the color
          />
          <StatCard
            title="Pending Training Modules"
            value={stats.pending}
            icon={<FiAlertTriangle />}
            className="iconYellow" // This class controls the color
          />
          <StatCard
            title="Modules Overdue"
            value={stats.overdue}
            icon={<FiAlertOctagon />}
            className="iconRed" // This class controls the color
          />
          <StatCard
            title="Completion Rate"
            value={`${((stats.trained / (stats.trained + stats.pending)) * 100).toFixed(0)}%`}
            icon={<FiBarChart2 />}
            className="iconBlue" // This class controls the color
          />
        </section>

        {/* --- 2. MAIN CONTENT GRID --- */}
        <section className="mainContentGrid">
          
          {/* --- LEFT COLUMN --- */}
          <div className="leftColumn">

            {/* --- 2. TRAINING COMPLETION CHART (CHART 6) --- */}
            <div className="card">
              <div className="cardHeader">
                <div className="cardTitle">
                  <FiBarChart2 />
                  <h3>Training Completion Chart</h3>
                </div>
                {/* Chart Filters */}
                <div className="filters">
                  <div className="filterSelect">
                    <FiFilter />
                    <select
                      value={filterContractor}
                      onChange={(e) => setFilterContractor(e.target.value)}
                    >
                      <option value="All">All Contractors</option>
                      {uniqueContractors.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filterSelect">
                    <FiFilter />
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      <option value="All">All Worker Categories</option>
                      {uniqueCategories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="chartWrapper">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    {/* X-axis: Training Modules */}
                    <XAxis dataKey="name" fontSize={12} /> 
                    {/* Y-axis: Number of Workers */}
                    <YAxis fontSize={12} /> 
                    <Tooltip />
                    <Legend />
                    {/* Bars/Segments: Completed and Pending */}
                    <Bar dataKey="Completed" stackId="a" fill="#008a2e" /> {/* green-dark */}
                    <Bar dataKey="Pending" stackId="a" fill="#f39c12" /> {/* yellow-dark */}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* --- 4. PENDING TRAINING REPORT (EXCEPTION REPORT 1) --- */}
            <div className="card">
              <div className="cardHeader">
                <div className="cardTitle textRed">
                  <FiAlertTriangle />
                  <h3>Pending Training (Exception Report)</h3>
                </div>
              </div>
              <div className="tableWrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sl. No.</th>
                      <th>Worker Name</th>
                      <th>Assigned Module</th>
                      <th>Due Date</th>
                      <th>Trainer Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DUMMY_PENDING_RECORDS.map((record, index) => (
                      <tr key={record.id}>
                        <td>{index + 1}</td>
                        <td className="workerName">{record.workerName}</td>
                        <td>{record.assignedModule}</td>
                        <td>{record.dueDate}</td>
                        <td>{record.trainer}</td>
                        <td>
                          <span
                            className={`statusPill status${record.status}`}
                          >
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="rightColumn">

            {/* --- 5. WORKER PERFORMANCE SNAPSHOT --- */}
            <div className="card">
              <div className="cardHeader">
                <div className="cardTitle textGreen">
                  <FiTrendingUp />
                  <h3>Top 5 Workers</h3>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Worker Name</th>
                    <th>Training Completion Score</th>
                  </tr>
                </thead>
                <tbody>
                  {DUMMY_TOP_WORKERS.map((worker, index) => (
                    <tr key={worker.id}>
                      <td>{index + 1}</td>
                      <td className="workerName">{worker.workerName}</td>
                      <td>{worker.trainingStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr className="divider" />

              <div className="cardHeader">
                <div className="cardTitle textYellow">
                  <FiTrendingDown />
                  <h3>Bottom 5 Workers</h3>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Worker Name</th>
                    <th>Pending Training</th>
                  </tr>
                </thead>
                <tbody>
                  {DUMMY_BOTTOM_WORKERS.map((worker, index) => (
                    <tr key={worker.id}>
                      <td>{index + 1}</td>
                      <td className="workerName">{worker.workerName}</td>
                      <td>{worker.trainingStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --- 1. MAIN TRAINING REPORT (REPORT 4) --- */}
        <section className="card" style={{ marginTop: '1.5rem' }}>
          <div className="cardHeader">
            <div className="cardTitle">
              <FiBookOpen />
              <h3>Main Training Report (All Records)</h3>
            </div>
            <div className="filters">
              <div className="filterInput">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search by worker name..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="tableWrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Worker Name</th>
                  <th>Training Module</th>
                  <th>Completion Date</th>
                  <th>Trainer Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedMainReport.length > 0 ? (
                  paginatedMainReport.map((record, index) => (
                    <tr key={record.id}>
                      <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                      <td className="workerName">{record.workerName}</td>
                      <td>{record.module}</td>
                      <td>{record.completionDate || 'N/A'}</td>
                      <td>{record.trainer}</td>
                      <td>
                        <span
                          className={`statusPill status${record.status}`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="noResults">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination for Main Report */}
          <div className="pagination">
            <span className="paginationInfo">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>
            <div className="paginationControls">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                <FiChevronLeft /> Prev
              </button>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next <FiChevronRight />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* --- STYLES (CSS-in-JS using styled-jsx) --- */}
      <style jsx global>{`
        /* Global styles for Recharts Tooltip */
        .recharts-default-tooltip {
          border-radius: 6px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
          border: 1px solid #e_a_eb_e_c !important;
          background-color: #ffffff !important;
        }
        .recharts-tooltip-label {
          font-weight: 600 !important;
          color: #2c3e50 !important;
        }
      `}</style>
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

        /* --- Stats Grid (RHS Metrics) --- */
        .statsGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
        .statCard.iconBlue { border-color: #007bff; /* --blue-dark */ }

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
        .statIcon.iconBlue { background-color: #e7f3ff; color: #007bff; }

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

        /* --- Main Content Layout --- */
        .mainContentGrid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }
        .leftColumn, .rightColumn {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
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
          font-size: 1.1rem;
          font-weight: 600;
        }
        .cardTitle h3 {
          margin: 0;
        }
        .cardTitle :global(svg) {
          color: #007bff; /* --primary-color */
          font-size: 1.25rem;
        }
        .textGreen { color: #008a2e; /* --green-dark */ }
        .textGreen :global(svg) { color: #008a2e; }
        .textYellow { color: #f39c12; /* --yellow-dark */ }
        .textYellow :global(svg) { color: #f39c12; }
        .textRed { color: #d90429; /* --red-dark */ }
        .textRed :global(svg) { color: #d90429; }


        /* --- Filters --- */
        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .filterInput,
        .filterSelect {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #f4f7fa; /* --bg-color */
          border: 1px solid #e_a_eb_e_c; /* --border-color */
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
        }
        .filterInput :global(svg),
        .filterSelect :global(svg) {
          color: #7f8c8d; /* --text-light */
        }
        .filterInput input,
        .filterSelect select {
          border: none;
          background-color: transparent;
          outline: none;
          font-size: 0.9rem;
          width: 100%;
        }
        .filterSelect {
          min-width: 180px;
        }
        .filterInput {
          flex-grow: 1;
        }

        /* --- Charts --- */
        .chartWrapper {
          width: 100%;
          height: 300px;
          padding: 1.5rem;
          padding-left: 0.5rem;
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
          padding: 0.9rem 1.5rem;
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

        /* --- Status Pills --- */
        .statusPill {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-block;
          text-transform: uppercase;
        }
        .statusCompleted {
          background-color: #e6f7ec; /* --green-light */
          color: #008a2e; /* --green-dark */
        }
        .statusPending {
          background-color: #fffbea; /* --yellow-light */
          color: #f39c12; /* --yellow-dark */
        }
        .statusOverdue {
          background-color: #fdeaea; /* --red-light */
          color: #d90429; /* --red-dark */
        }

        /* --- Divider --- */
        .divider {
          border: none;
          border-top: 1px solid #e_a_eb_e_c; /* --border-color */
          margin: 0.5rem 0;
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
        @media (max-width: 1200px) {
          .mainContentGrid {
            grid-template-columns: 1fr;
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
            grid-template-columns: 1fr 1fr;
          }
          .cardHeader {
            flex-direction: column;
            align-items: flex-start;
          }
          .filters {
            width: 100%;
          }
          .filterSelect {
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