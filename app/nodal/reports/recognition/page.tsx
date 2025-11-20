"use client";

import React, { useEffect, useState } from "react";
import StatCard from "@/components/ui/stat-card";
import DataTable from "@/components/ui/data-table";
import { Award, Trophy, Medal, Star, TrendingUp, TrendingDown } from "lucide-react";
// ...existing code...

const Recognition = () => {
  const [loading, setLoading] = useState(true);

  const kpiData: Array<{
    title: string;
    value: string | number;
    icon: typeof Trophy;
    color?: 'orange' | 'blue' | 'green' | 'red' | 'purple' | 'indigo' | 'emerald' | 'amber' | 'sky' | 'violet' | 'pink';
    subtitle?: string;
  }> = [
    { title: "Gold Tier Workers", value: 125, icon: Trophy, color: "orange" },
    { title: "Silver Tier Workers", value: 298, icon: Medal, color: "blue" },
    { title: "Bronze Tier Workers", value: 156, icon: Award, color: "green" },
    { title: "Top Contractor", value: "ABC Services", icon: Trophy, color: "orange", subtitle: "92.5 Score" },
    { title: "Top Worker", value: "Pallab Sharma", icon: Star, color: "blue", subtitle: "96 Score" },
    { title: "Most Improved Contractor", value: "Urban Sanitation Ltd", icon: TrendingUp, color: "green", subtitle: "+8.4 Score" },
  ];

  const contractorLeaderboard = [
    { rank: 1, contractor: "ABC Cleaning Services", recognitionScore: 92.5, goldWorkers: 35, silverWorkers: 48, bronzeWorkers: 12, totalWorkers: 95, trend: "up" },
    { rank: 2, contractor: "Metro Clean Solutions", recognitionScore: 89.8, goldWorkers: 28, silverWorkers: 52, bronzeWorkers: 18, totalWorkers: 98, trend: "up" },
    { rank: 3, contractor: "City Maintenance Corp", recognitionScore: 86.2, goldWorkers: 32, silverWorkers: 68, bronzeWorkers: 25, totalWorkers: 125, trend: "stable" },
    { rank: 4, contractor: "Urban Sanitation Ltd", recognitionScore: 82.1, goldWorkers: 18, silverWorkers: 85, bronzeWorkers: 42, totalWorkers: 145, trend: "down" },
    { rank: 5, contractor: "Green Earth Services", recognitionScore: 76.2, goldWorkers: 12, silverWorkers: 45, bronzeWorkers: 59, totalWorkers: 116, trend: "down" },
  ];

  const leaderboardColumns = [
    { key: "rank", header: "Rank" },
    { key: "contractor", header: "Contractor" },
    { key: "recognitionScore", header: "Recognition Score" },
    { key: "goldWorkers", header: "Gold" },
    { key: "silverWorkers", header: "Silver" },
    { key: "bronzeWorkers", header: "Bronze" },
    { key: "totalWorkers", header: "Total Workers" },
    { key: "trend", header: "Trend" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Loader shows for 800ms
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    const IntegratedLoader = require("@/components/layout/IntegratedLoader").default;
    return <IntegratedLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 mb-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Recognition & Performance
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base lg:text-lg">
              Track and celebrate worker achievements and contractor performance
            </p>
          </div>
        </div>
      </div>

      {/* KPI StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {kpiData.map((kpi, index) => (
          <StatCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            color={kpi.color}
            subtitle={kpi.subtitle}
          />
        ))}
      </div>

      {/* Contractor Leaderboard */}
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 tracking-tight">Contractor Leaderboard</h2>
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <DataTable
              title="Contractor Leaderboard"
              columns={leaderboardColumns}
              data={contractorLeaderboard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recognition;
