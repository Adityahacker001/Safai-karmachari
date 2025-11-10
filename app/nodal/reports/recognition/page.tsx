"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/ui/data-table";
import { Award, Trophy, Medal, Star, TrendingUp, TrendingDown } from "lucide-react";

const Recognition = () => {
  const kpiData = [
    { title: "Gold Tier Workers", value: 125, icon: Trophy, color: "yellow" },
    { title: "Silver Tier Workers", value: 298, icon: Medal, color: "blue" },
    { title: "Bronze Tier Workers", value: 156, icon: Award, color: "green" },
    { title: "Top Contractor", value: "ABC Services", icon: Trophy, color: "yellow", subtitle: "92.5 Score" },
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{kpi.value}</div>
              <p className="text-xs opacity-90">{kpi.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contractor Leaderboard */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Contractor Leaderboard</h2>
        <DataTable title="Contractor Leaderboard" columns={leaderboardColumns} data={contractorLeaderboard} />
      </div>
    </div>
  );
};

export default Recognition;
