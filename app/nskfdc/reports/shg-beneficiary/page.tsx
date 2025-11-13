"use client";

import React from "react";
import {
  Users,
  IndianRupee,
  Clock,
  AlertCircle,
  FileDown,
} from "lucide-react";
import StatCard from '@/components/ui/stat-card';

const SHGBeneficiaryReport = (): JSX.Element => {
  return (
    <div className="p-6 min-h-screen"> {/* removed page-level bg color as requested */}
      {/* District-style banner (title container) */}
      <div className="rounded-xl shadow-2xl p-6 md:p-8 min-h-[96px] mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 text-white flex items-center justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="w-8 h-8 rounded-md opacity-0" aria-hidden />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SHG Beneficiary Report</h1>
            <p className="text-sm opacity-90 mt-1">Beneficiary counts, disbursements and analytics</p>
          </div>
        </div>
        <div className="hidden md:block text-sm opacity-90">&nbsp;</div>
      </div>
      {/* Header actions (export/refresh) placed below banner to preserve desktop layout */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div />
        <div className="flex flex-row items-center gap-3">
          {['PDF', 'CSV', 'XLSX', 'DOCX'].map((type) => (
            <button
              key={type}
              className="shadow-sm hover:shadow rounded-md bg-white text-slate-800 px-3 py-1 transition"
            >
              <FileDown className="inline-block w-4 h-4 mr-1" />
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Panel - polished layout */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">State</label>
            <select aria-label="State" className="p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300">
              <option value="">All States</option>
              <option>State 1</option>
              <option>State 2</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">District</label>
            <select aria-label="District" className="p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300">
              <option value="">All Districts</option>
              <option>District 1</option>
              <option>District 2</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Scheme Applied</label>
            <select aria-label="Scheme Applied" className="p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300">
              <option value="">All Schemes</option>
              <option>Loan</option>
              <option>Grant</option>
              <option>Skill Development</option>
              <option>Training Scheme</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Disbursement Status</label>
            <select aria-label="Disbursement Status" className="p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300">
              <option value="">Any</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Delayed</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Sanction Date From</label>
            <input aria-label="Sanction Date From" type="date" className="p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Sanction Date To</label>
            <input aria-label="Sanction Date To" type="date" className="p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300" />
          </div>

          <div className="col-span-1 md:col-span-3 flex flex-col sm:flex-row items-center sm:justify-end gap-2 mt-2">
            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-md hover:opacity-90 shadow">
              Apply Filters
            </button>
            <button className="w-full sm:w-auto bg-white border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50">
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards - use shared StatCard component (two per row on small screens) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total SHGs" value="1,245" icon={Users} color="blue" />
        <StatCard title="Amount Sanctioned" value="₹3.2 Cr" icon={IndianRupee} color="green" />
        <StatCard title="Pending Disbursement" value="₹45 Lakh" icon={Clock} color="amber" />
        <StatCard title="Delayed Cases" value={32} icon={AlertCircle} color="red" />
      </div>

      {/* Search Bar - stack on mobile */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search SHG Name or District"
          className="p-2 border rounded w-full max-w-md"
          aria-label="Search SHG"
        />
        <select className="mt-2 sm:mt-0 sm:ml-4 p-2 border rounded">
          <option>Rows per page</option>
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>

      {/* Report Table */}
      <div className="overflow-auto bg-white rounded shadow-md">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-blue-100">
            <tr>
              {[
                "Sl. No.",
                "SHG Name",
                "District",
                "State",
                "Scheme Applied",
                "Members Count",
                "Amount Sanctioned",
                "Date of Sanction",
                "Disbursement Status",
                "Remarks",
              ].map((col) => (
                <th key={col} className="p-3 text-left font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, i) => (
              <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                <td className="p-3">{i + 1}</td>
                <td className="p-3 text-blue-600 underline">SHG Group {i + 1}</td>
                <td className="p-3">District {i + 1}</td>
                <td className="p-3">State {i + 1}</td>
                <td className="p-3">Loan</td>
                <td className="p-3">12</td>
                <td className="p-3">₹2,00,000</td>
                <td className="p-3">2025-10-12</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                    Paid
                  </span>
                </td>
                <td className="p-3">All clear</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Using shared `StatCard` from components/ui/stat-card.tsx

export default SHGBeneficiaryReport;
