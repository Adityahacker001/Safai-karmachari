"use client";
import React from 'react';
import DashboardCard from '@/components/dashboard/dashboard-card';
import DataTable from '@/components/ui/data-table';
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
      officer: 'Rajesh Kumar',
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Recognition & Performance</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Generate Awards Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
     <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
  <h3 className="text-lg font-medium text-gray-900 mb-6 text-center bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 py-2 rounded-lg shadow-sm">
    Worker Recognition Distribution
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              ? `text-center rounded-xl p-4 ${bronzeBg} shadow-md hover:scale-105 transition-transform`
              : `text-center rounded-xl p-4 bg-gradient-to-br from-${tier.color}-100 to-${tier.color}-50 shadow-md hover:scale-105 transition-transform`
          }
        >
          <div
            className={
              isBronze
                ? `w-16 h-16 mx-auto mb-2 rounded-full ${bronzeCircle} flex items-center justify-center shadow-inner`
                : `w-16 h-16 mx-auto mb-2 rounded-full bg-${tier.color}-200 flex items-center justify-center shadow-inner`
            }
          >
            <tier.icon className={isBronze ? `h-8 w-8 ${bronzeText}` : `h-8 w-8 text-${tier.color}-700`} />
          </div>
          <h4 className="font-medium text-gray-900">{tier.title}</h4>
          <p className={isBronze ? `text-2xl font-bold ${bronzeText}` : `text-2xl font-bold text-${tier.color}-700`}>{tier.count}</p>
          <p className="text-xs text-gray-500">{tier.percent}</p>
        </div>
      );
    })}
  </div>
</div>

      {/* Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Nodal Officer Leaderboard */}
  <div className="overflow-x-auto rounded-xl shadow-lg">
    <table className="min-w-full border-collapse">
      <thead>
        <tr className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-gray-900">
          {nodalColumns.map(col => (
            <th key={col.key} className="border border-gray-400 px-4 py-2 text-center font-extrabold">{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {nodalLeaderboard.map((row, idx) => (
          <tr key={row.rank} className={idx % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white hover:bg-gray-100'}>
            {nodalColumns.map(col => (
              <td key={col.key} className="border border-gray-300 px-4 py-2 text-center font-medium">
                {col.render
                  ? col.render(row[col.key as keyof typeof row] as any)
                  : row[col.key as keyof typeof row]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Contractor Leaderboard */}
  <div className="overflow-x-auto rounded-xl shadow-lg">
    <table className="min-w-full border-collapse">
      <thead>
        <tr className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-gray-900">
          {contractorColumns.map(col => (
            <th key={col.key} className="border border-gray-400 px-4 py-2 text-center font-extrabold">{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {contractorLeaderboard.map((row, idx) => (
          <tr key={row.rank} className={idx % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white hover:bg-gray-100'}>
            {contractorColumns.map(col => (
              <td key={col.key} className="border border-gray-300 px-4 py-2 text-center font-medium">
                {col.render
                  ? col.render(row[col.key as keyof typeof row])
                  : row[col.key as keyof typeof row]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default Recognition;