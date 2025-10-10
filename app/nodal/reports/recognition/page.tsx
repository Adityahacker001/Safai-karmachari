'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataTable from '@/components/ui/data-table';
import { Award, Trophy, Medal, Star, TrendingUp, TrendingDown } from 'lucide-react';

const Recognition = () => {
  const kpiData = [
    { title: 'Gold Tier Workers', value: 125, icon: Trophy, color: 'yellow' as const },
    { title: 'Silver Tier Workers', value: 298, icon: Medal, color: 'blue' as const },
    { title: 'Bronze Tier Workers', value: 156, icon: Award, color: 'green' as const },
    { title: 'Top Contractor', value: 'ABC Services', icon: Trophy, color: 'yellow' as const, subtitle: '92.5 Score' },
    { title: 'Top Worker', value: 'Pallab Sharma', icon: Star, color: 'blue' as const, subtitle: '96 Score' },
    { title: 'Most Improved Contractor', value: 'Urban Sanitation Ltd', icon: TrendingUp, color: 'green' as const, subtitle: '+8.4 Score' },
  ];

  const contractorLeaderboard = [
    { rank: 1, contractor: 'ABC Cleaning Services', recognitionScore: 92.5, goldWorkers: 35, silverWorkers: 48, bronzeWorkers: 12, totalWorkers: 95, trend: 'up' },
    { rank: 2, contractor: 'Metro Clean Solutions', recognitionScore: 89.8, goldWorkers: 28, silverWorkers: 52, bronzeWorkers: 18, totalWorkers: 98, trend: 'up' },
    { rank: 3, contractor: 'City Maintenance Corp', recognitionScore: 86.2, goldWorkers: 32, silverWorkers: 68, bronzeWorkers: 25, totalWorkers: 125, trend: 'stable' },
    { rank: 4, contractor: 'Urban Sanitation Ltd', recognitionScore: 82.1, goldWorkers: 18, silverWorkers: 85, bronzeWorkers: 42, totalWorkers: 145, trend: 'down' },
    { rank: 5, contractor: 'Green Earth Services', recognitionScore: 76.2, goldWorkers: 12, silverWorkers: 45, bronzeWorkers: 59, totalWorkers: 116, trend: 'down' },
  ];

  type LeaderboardColumn = {
    key: string;
    header: string;
    render?: (value: any) => React.ReactNode;
  };

  const leaderboardColumns: LeaderboardColumn[] = [
    {
      key: 'rank',
      header: 'Rank',
      render: (value: any) => (
        <div className="flex items-center">
          {value === 1 && <Trophy className="w-5 h-5 text-yellow-500 mr-2" />}
          {value === 2 && <Medal className="w-5 h-5 text-gray-400 mr-2" />}
          {value === 3 && <Award className="w-5 h-5 text-yellow-600 mr-2" />}
          <span className="font-bold text-lg">#{value}</span>
        </div>
      )
    },
    { key: 'contractor', header: 'Contractor' },
    {
      key: 'recognitionScore',
      header: 'Recognition Score',
  render: (value: any) => (
        <span className={`font-bold text-lg ${
          value >= 90 ? 'text-green-600' :
          value >= 80 ? 'text-blue-600' :
          'text-red-600'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'goldWorkers', header: 'Gold' },
    { key: 'silverWorkers', header: 'Silver' },
    { key: 'bronzeWorkers', header: 'Bronze' },
    { key: 'totalWorkers', header: 'Total Workers' },
    {
      key: 'trend',
      header: 'Trend',
  render: (value: any) => {
        const isUp = value === 'up';
        const isStable = value === 'stable';
        const TrendIcon = isUp ? TrendingUp : isStable ? null : TrendingDown;
        return (
          <span className={`px-2 py-1 inline-flex items-center rounded-full text-xs font-medium shadow-md ${
            isUp ? 'bg-green-100 text-green-800' :
            isStable ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }`}>
            {TrendIcon && <TrendIcon className="w-4 h-4 mr-1" />}
            {isUp ? 'Rising' : isStable ? 'Stable' : 'Declining'}
          </span>
        )
      }
    },
  ];

  const topWorkers = [
    { name: 'Priya Sharma', contractor: 'Metro Clean Solutions', tier: 'Gold', score: 96 },
    { name: 'Amit Singh', contractor: 'ABC Cleaning Services', tier: 'Gold', score: 95 },
    { name: 'Sunita Devi', contractor: 'City Maintenance Corp', tier: 'Gold', score: 94 },
    { name: 'Mohd. Ali', contractor: 'Metro Clean Solutions', tier: 'Gold', score: 93 },
  ];

  return (
    <div className="space-y-8 bg-gradient-to-b from-blue-50 via-white to-pink-50 p-6 rounded-xl">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 text-left">
          Recognition & Performance
        </h1>
        <p className="text-gray-700 mt-2 text-lg text-left">Track and celebrate worker achievements and contractor performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          // Assign solid, vibrant colors matching the image
          let cardColor = '';
          switch (index) {
            case 0: // Avg Recognition Score
              cardColor = 'bg-blue-600 text-white';
              break;
            case 1: // Gold Tier Workers
              cardColor = 'bg-green-600 text-white';
              break;
            case 2: // Silver Tier Workers
              cardColor = 'bg-orange-500 text-white';
              break;
            case 3: // Bronze Tier Workers
              cardColor = 'bg-cyan-600 text-white';
              break;
            case 4: // Top Contractor
              cardColor = 'bg-pink-600 text-white';
              break;
            case 5: // Top Worker
              cardColor = 'bg-blue-700 text-white';
              break;
            case 6: // Most Improved Contractor
              cardColor = 'bg-green-500 text-white';
              break;
            default:
              cardColor = 'bg-gray-400 text-white';
          }
          return (
            <Card key={index} className={`shadow-lg hover:shadow-xl transition-all duration-300 ${cardColor} relative overflow-hidden`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <Icon className="h-6 w-6 opacity-80" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{kpi.value}</div>
                <p className="text-xs opacity-90">{kpi.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Contractor Leaderboard */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-100 p-6 rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gradient-to-r from-green-200 to-green-300">
            <tr>
              {leaderboardColumns.map((col, index) => (
                <th key={index} className="px-4 py-2 border border-gray-300 text-center font-bold text-gray-900">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contractorLeaderboard.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {leaderboardColumns.map((col, colIndex) => {
                  const rowObj: Record<string, any> = row;
                  return (
                    <td key={colIndex} className="px-4 py-2 border border-gray-300 text-center">
                      {col.render ? col.render(rowObj[col.key]) : rowObj[col.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional Recognition Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Workers */}
        <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-pink-50 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
            Top Performing Workers
          </h3>
          <div className="space-y-3">
            {topWorkers.map((worker, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white shadow-sm hover:shadow-md transition rounded-lg border-l-4 border-yellow-400">
                <div>
                  <p className="font-medium text-gray-900">{worker.name}</p>
                  <p className="text-sm text-gray-600">{worker.contractor}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
                    worker.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                    worker.tier === 'Silver' ? 'bg-gray-100 text-gray-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {worker.tier}
                  </span>
                  <p className="text-sm font-bold text-gray-900 mt-1">{worker.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recognition Distribution */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recognition Tier Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-sm text-gray-700">Gold Tier (90+ Score)</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 h-3 bg-gray-200 rounded-full mr-2">
                  <div className="w-16 h-3 bg-yellow-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">125 workers</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Medal className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-700">Silver Tier (75-89 Score)</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 h-3 bg-gray-200 rounded-full mr-2">
                  <div className="w-24 h-3 bg-gray-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">298 workers</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Award className="w-5 h-5 text-orange-500 mr-2" />
                <span className="text-sm text-gray-700">Bronze Tier (60-74 Score)</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 h-3 bg-gray-200 rounded-full mr-2">
                  <div className="w-20 h-3 bg-orange-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">156 workers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recognition;
