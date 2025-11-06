"use client";
import React from 'react';
import DashboardCard from '@/components/dashboard/dashboard-card';
import DataTable from '@/components/ui/data-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Award,
  TrendingUp,
  Star,
  Trophy,
  Medal,
  Crown
} from 'lucide-react';

const Recognition: React.FC = () => {
  const nodalLeaderboard = [
    {
      rank: 1,
      officer: 'Priya Sharma',
      zone: 'Zone B',
      score: 94.5,
      grievances: '45/52',
      compliance: '98%'
    },
    {
      rank: 2,
      officer: 'Abishek Kumar',
      zone: 'Zone A',
      score: 91.2,
      grievances: '38/45',
      compliance: '95%'
    },
    {
      rank: 3,
      officer: 'Amit Singh',
      zone: 'Zone C',
      score: 89.7,
      grievances: '32/38',
      compliance: '94%'
    }
  ];

  const contractorLeaderboard = [
    {
      rank: 1,
      contractor: 'Clean City Services',
      workers: 150,
      welfare: '92%',
      recognition: 'A+',
      score: 95.2
    },
    {
      rank: 2,
      contractor: 'Metro Clean Services',
      workers: 110,
      welfare: '88%',
      recognition: 'A',
      score: 91.8
    },
    {
      rank: 3,
      contractor: 'Green Solutions Ltd',
      workers: 120,
      welfare: '85%',
      recognition: 'A',
      score: 90.5
    }
  ];

  const nodalColumns: Array<{
    key: string;
    header: string;
    render?: (value: any) => React.ReactNode;
  }> = [
    { 
      key: 'rank', 
      header: 'Rank',
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          {value === 1 && <Crown className="h-4 w-4 text-yellow-500" />}
          {value === 2 && <Medal className="h-4 w-4 text-gray-400" />}
          {value === 3 && <Medal className="h-4 w-4 text-yellow-600" />}
          <span className="font-bold">{value}</span>
        </div>
      )
    },
    { key: 'officer', header: 'Nodal Officer' },
    { key: 'zone', header: 'Zone' },
    { key: 'score', header: 'Score' },
    { key: 'grievances', header: 'Grievances Resolved' },
    { key: 'compliance', header: 'Compliance Rate' }
  ];

  const contractorColumns: Array<{
    key: string;
    header: string;
    render?: (value: any) => React.ReactNode;
  }> = [
    { 
      key: 'rank', 
      header: 'Rank',
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          {value === 1 && <Crown className="h-4 w-4 text-yellow-500" />}
          {value === 2 && <Medal className="h-4 w-4 text-gray-400" />}
          {value === 3 && <Medal className="h-4 w-4 text-yellow-600" />}
          <span className="font-bold">{value}</span>
        </div>
      )
    },
    { key: 'contractor', header: 'Contractor' },
    { key: 'workers', header: 'Workers' },
    { key: 'welfare', header: 'Welfare Coverage' },
    { 
      key: 'recognition', 
      header: 'Grade',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value.startsWith('A') ? 'bg-green-100 text-green-800' :
          value.startsWith('B') ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'score', header: 'Total Score' }
  ];

  return (
    <div className="min-h-screen p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-4 sm:space-y-6">
      {/* Professional Header */}
      <header className="bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl">
        <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-2xl leading-tight">
              Recognition & Performance
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-bold drop-shadow-lg mt-1 sm:mt-2">
              Track performance metrics and awards across district units
            </p>
          </div>
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:scale-105 hover:shadow-lg transition-all flex items-center space-x-1.5 sm:space-x-2 border border-white/30 text-xs sm:text-sm md:text-base">
            <Award className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"/>
            <span className="hidden sm:inline">Generate Awards Report</span>
            <span className="sm:hidden">Awards Report</span>
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <DashboardCard
          title="Avg Recognition Score"
          value="91.5%"
          icon={Award}
          color="orange"
          description="2.3% up"
        />
        <DashboardCard
          title="Top Performers"
          value="18"
          icon={Star}
          color="blue"
        />
        <DashboardCard
          title="Performance Growth"
          value="8.5%"
          icon={TrendingUp}
          color="green"
          description="this quarter"
        />
      </div>

      {/* Worker Tier Distribution */}
      <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl p-3 sm:p-4 md:p-6">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center bg-gradient-to-r from-blue-50 to-indigo-50 py-2 sm:py-3 rounded-lg shadow-sm">
          Worker Recognition Distribution
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[
            { title: 'Gold Tier', count: '142', color: 'yellow', percent: 'Top 5%', icon: Crown },
            { title: 'Silver Tier', count: '428', color: 'gray', percent: 'Next 15%', icon: Medal },
            { title: 'Bronze Tier', count: '856', color: 'bronze', percent: 'Next 30%', icon: Trophy },
            { title: 'Standard', count: '1,421', color: 'blue', percent: 'Remaining 50%', icon: Star },
          ].map((tier, idx) => {
      // Custom bronze color for Bronze Tier
      const isBronze = tier.title === 'Bronze Tier';
      const bronzeBg = 'bg-gradient-to-br from-[#cd7f32] via-[#e6b980] to-[#f8e0b0]';
      const bronzeCircle = 'bg-[#e6b980]';
      const bronzeText = 'text-[#a97142]';
      return (
            <div
              key={idx}
              className={
                isBronze
                  ? `text-center rounded-lg sm:rounded-xl p-3 sm:p-4 ${bronzeBg} shadow-md hover:scale-105 transition-transform`
                  : `text-center rounded-lg sm:rounded-xl p-3 sm:p-4 bg-gradient-to-br from-${tier.color}-100 to-${tier.color}-50 shadow-md hover:scale-105 transition-transform`
              }
            >
              <div
                className={
                  isBronze
                    ? `w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 rounded-full ${bronzeCircle} flex items-center justify-center shadow-inner`
                    : `w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 rounded-full bg-${tier.color}-200 flex items-center justify-center shadow-inner`
                }
              >
                <tier.icon className={isBronze ? `h-6 w-6 sm:h-8 sm:w-8 ${bronzeText}` : `h-6 w-6 sm:h-8 sm:w-8 text-${tier.color}-700`} />
              </div>
              <h4 className="text-sm sm:text-base font-medium text-gray-900">{tier.title}</h4>
              <p className={isBronze ? `text-lg sm:text-2xl font-bold ${bronzeText}` : `text-lg sm:text-2xl font-bold text-${tier.color}-700`}>{tier.count}</p>
              <p className="text-xs text-gray-500">{tier.percent}</p>
            </div>
      );
          })}
        </div>
      </div>

      {/* Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Nodal Officer Leaderboard */}
        <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl p-3 sm:p-4 md:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Nodal Officer Leaderboard</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b-2 border-blue-200">
                  {nodalColumns.map(col => (
                    <TableHead key={col.key} className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">{col.header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white/50 backdrop-blur-sm">
                {nodalLeaderboard.map((row, idx) => (
                  <TableRow key={row.rank} className="hover:bg-blue-50/70 transition-colors border-b border-gray-100">
                    {nodalColumns.map(col => (
                      <TableCell key={col.key} className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-gray-800">
                        {col.render
                          ? col.render(row[col.key as keyof typeof row] as any)
                          : row[col.key as keyof typeof row]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Contractor Leaderboard */}
        <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl p-3 sm:p-4 md:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Contractor Leaderboard</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b-2 border-blue-200">
                  {contractorColumns.map(col => (
                    <TableHead key={col.key} className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">{col.header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white/50 backdrop-blur-sm">
                {contractorLeaderboard.map((row, idx) => (
                  <TableRow key={row.rank} className="hover:bg-blue-50/70 transition-colors border-b border-gray-100">
                    {contractorColumns.map(col => (
                      <TableCell key={col.key} className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-gray-800">
                        {col.render
                          ? col.render(row[col.key as keyof typeof row])
                          : row[col.key as keyof typeof row]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Recognition;