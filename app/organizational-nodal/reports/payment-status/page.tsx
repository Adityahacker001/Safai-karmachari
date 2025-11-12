// app/reports/payment-status/page.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react'; // useEffect ko import kiya
import {
  FiDollarSign,
  FiClipboard,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiAlertTriangle,
  FiAlertOctagon,
  FiDownload,
} from 'react-icons/fi';

// --- 1. TYPE DEFINITION ---
// Based on the 6 columns
type PaymentRecord = {
  id: number;
  workerName: string;
  contractor: string;
  lastPaymentDate: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Delayed';
};

// --- 2. MOCK DATA ---
const DUMMY_RECORDS: PaymentRecord[] = [
  { id: 1, workerName: 'Ramesh Kumar', contractor: 'CleanCo Ltd.', lastPaymentDate: '2025-10-05', amount: 45000, status: 'Paid' },
  { id: 2, workerName: 'Sita Devi', contractor: 'EnviroClean', lastPaymentDate: '2025-10-02', amount: 42000, status: 'Paid' },
  { id: 3, workerName: 'Anil Singh', contractor: 'CleanCo Ltd.', lastPaymentDate: '2025-09-05', amount: 45000, status: 'Pending' },
  { id: 4, workerName: 'Mohammed Ali', contractor: 'Urban Solutions', lastPaymentDate: '2025-08-30', amount: 46000, status: 'Delayed' },
  { id: 5, workerName: 'Priya Murugan', contractor: 'EnviroClean', lastPaymentDate: '2025-10-04', amount: 42000, status: 'Paid' },
  { id: 6, workerName: 'Kavita', contractor: 'CleanCo Ltd.', lastPaymentDate: '2025-09-06', amount: 45000, status: 'Pending' },
  { id: 7, workerName: 'John P.', contractor: 'EnviroClean', lastPaymentDate: '2025-10-05', amount: 43000, status: 'Paid' },
  { id: 8, workerName: 'David L.', contractor: 'Urban Solutions', lastPaymentDate: '2025-09-01', amount: 46000, status: 'Delayed' },
  { id: 9, workerName: 'Ravi Verma', contractor: 'CleanCo Ltd.', lastPaymentDate: '2025-10-05', amount: 45000, status: 'Paid' },
  { id: 10, workerName: 'Meena Kumari', contractor: 'EnviroClean', lastPaymentDate: '2025-09-03', amount: 42000, status: 'Pending' },
  { id: 11, workerName: 'Suresh Patil', contractor: 'Urban Solutions', lastPaymentDate: '2025-10-01', amount: 46000, status: 'Paid' },
];

// --- 3. HELPER COMPONENTS ---

// StatCard Component (for RHS Metrics)
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

// Helper function to format currency (₹ 45,000)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// --- 4. MAIN PAGE COMPONENT ---

export default function PaymentStatusReportPage() {
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

  // Memoized stats for the dashboard cards
  const stats = useMemo(() => {
    const paid = DUMMY_RECORDS.filter(r => r.status === 'Paid').length;
    const pending = DUMMY_RECORDS.filter(r => r.status === 'Pending').length;
    const delayed = DUMMY_RECORDS.filter(r => r.status === 'Delayed').length;
    const totalAmount = DUMMY_RECORDS.reduce((acc, r) => (r.status === 'Paid' ? acc + r.amount : acc), 0);
    
    return { paid, pending, delayed, totalAmount: formatCurrency(totalAmount) };
  }, []);
  
  // Memoized calculation for filtered records
  const filteredRecords = useMemo(() => {
    return DUMMY_RECORDS.filter((record) =>
      record.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.contractor.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Jab tak component mount nahi hota, kuch bhi render na karein
  // Isse FOUC (Flash of Unstyled Content) ya "skeleton" dikhne ki problem solve hoti hai
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="pageContainer">
        {/* --- TITLE BANNER --- */}
        <div className="titleBanner">
          <h1>Payment Status Report</h1>
        </div>

        {/* --- 2. Stat Card Grid (RHS Metrics) --- */}
        <section className="statsGrid">
          <StatCard
            title="Workers Paid"
            value={stats.paid}
            icon={<FiCheckCircle />}
            className="iconGreen"
          />
          <StatCard
            title="Workers Pending"
            value={stats.pending}
            icon={<FiAlertTriangle />}
            className="iconYellow"
          />
          <StatCard
            title="Workers Delayed"
            value={stats.delayed}
            icon={<FiAlertOctagon />}
            className="iconRed"
          />
          <StatCard
            title="Total Amount Disbursed"
            value={stats.totalAmount}
            icon={<FiDollarSign />}
            className="iconBlue"
          />
        </section>

        {/* --- 3. Main Report Table --- */}
        <div className="card">
          <div className="cardHeader">
            <div className="cardTitle">
              <FiClipboard />
              <h2>All Payment Records</h2>
            </div>
            {/* Search Bar */}
            <div className="filters">
              <div className="filterInput">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search by Worker or Contractor..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset page on search
                  }}
                />
              </div>
            </div>
            {/* Export controls moved under filters for visual hierarchy */}
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
                  <th>Contractor</th>
                  <th>Last Payment Date</th>
                  <th>Amount</th>
                  <th>Status</th>
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
                      
                      {/* 3. Contractor */}
                      <td>{record.contractor}</td>
                      
                      {/* 4. Last Payment Date */}
                      <td>{record.lastPaymentDate}</td>
                      
                      {/* 5. Amount */}
                      <td className="amountCell">
                        {formatCurrency(record.amount)}
                      </td>
                      
                      {/* 6. Status (Crucial Visual Requirement) */}
                      <td>
                        <span className={`statusPill status${record.status}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="noResults">
                      No payment records found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- 4. Pagination Controls --- */}
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
        .table thead tr { background: linear-gradient(90deg, rgba(99,102,241,0.10) 0%, rgba(236,72,153,0.06) 100%); }
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
          color: #007bff;
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
        
        .amountCell {
          text-align: right;
          font-weight: 500;
          color: #2c3e50; /* --text-dark */
        }
        
        .noResults {
          text-align: center;
          padding: 3rem;
          color: #7f8c8d; /* --text-light */
          font-size: 1rem;
        }
        
        /* --- Status Pills (Crucial Visual Requirement) --- */
        .statusPill {
          padding: 0.3rem 0.85rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-block;
          text-transform: uppercase;
        }
        .statusPaid {
          background-color: #e6f7ec; /* --green-light */
          color: #008a2e; /* --green-dark */
        }
        .statusPending {
          background-color: #fffbea; /* --yellow-light */
          color: #f39c12; /* --yellow-dark */
        }
        .statusDelayed {
          background-color: #fdeaea; /* --red-light */
          color: #d90429; /* --red-dark */
        }

        /* --- 4. Pagination --- */
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
          .filterInput input {
            min-width: 150px;
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

