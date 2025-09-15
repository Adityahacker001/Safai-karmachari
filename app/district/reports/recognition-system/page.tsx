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

  const nodalColumns = [
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

  const contractorColumns = [
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
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Worker Recognition Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-yellow-100 flex items-center justify-center">
              <Crown className="h-8 w-8 text-yellow-600" />
            </div>
            <h4 className="font-medium text-gray-900">Gold Tier</h4>
            <p className="text-2xl font-bold text-yellow-600">142</p>
            <p className="text-xs text-gray-500">Top 5%</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
              <Medal className="h-8 w-8 text-gray-600" />
            </div>
            <h4 className="font-medium text-gray-900">Silver Tier</h4>
            <p className="text-2xl font-bold text-gray-600">428</p>
            <p className="text-xs text-gray-500">Next 15%</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-yellow-50 flex items-center justify-center">
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <h4 className="font-medium text-gray-900">Bronze Tier</h4>
            <p className="text-2xl font-bold text-yellow-500">856</p>
            <p className="text-xs text-gray-500">Next 30%</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center">
              <Star className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900">Standard</h4>
            <p className="text-2xl font-bold text-blue-600">1,421</p>
            <p className="text-xs text-gray-500">Remaining 50%</p>
          </div>
        </div>
      </div>

      {/* Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataTable
          title="🏆 Nodal Officer Leaderboard"
          columns={nodalColumns}
          data={nodalLeaderboard}
          actions={false}
        />
        
        <DataTable
          title="🏆 Contractor Leaderboard"
          columns={contractorColumns}
          data={contractorLeaderboard}
          actions={false}
        />
      </div>
    </div>
  );
};

export default Recognition;