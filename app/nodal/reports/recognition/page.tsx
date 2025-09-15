'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataTable from '@/components/ui/data-table';
import { Award, Trophy, Medal, Star, TrendingUp, TrendingDown } from 'lucide-react';

const Recognition = () => {
  const kpiData = [
    { title: 'Avg Recognition Score', value: '87.3', icon: Star, color: 'blue' as const, subtitle: 'Nodal Area Average' },
    { title: 'Gold Tier Workers', value: 125, icon: Trophy, color: 'yellow' as const },
    { title: 'Silver Tier Workers', value: 298, icon: Medal, color: 'blue' as const },
    { title: 'Bronze Tier Workers', value: 156, icon: Award, color: 'green' as const },
    { title: 'Top Contractor', value: 'ABC Services', icon: Trophy, color: 'yellow' as const, subtitle: '92.5 Score' },
    { title: 'Lowest Contractor', value: 'Green Earth', icon: Award, color: 'red' as const, subtitle: '76.2 Score' },
  ];

  const contractorLeaderboard = [
    {
      rank: 1,
      contractor: 'ABC Cleaning Services',
      recognitionScore: 92.5,
      goldWorkers: 35,
      silverWorkers: 48,
      bronzeWorkers: 12,
      totalWorkers: 95,
      trend: 'up'
    },
    {
      rank: 2,
      contractor: 'Metro Clean Solutions',
      recognitionScore: 89.8,
      goldWorkers: 28,
      silverWorkers: 52,
      bronzeWorkers: 18,
      totalWorkers: 98,
      trend: 'up'
    },
    {
      rank: 3,
      contractor: 'City Maintenance Corp',
      recognitionScore: 86.2,
      goldWorkers: 32,
      silverWorkers: 68,
      bronzeWorkers: 25,
      totalWorkers: 125,
      trend: 'stable'
    },
    {
      rank: 4,
      contractor: 'Urban Sanitation Ltd',
      recognitionScore: 82.1,
      goldWorkers: 18,
      silverWorkers: 85,
      bronzeWorkers: 42,
      totalWorkers: 145,
      trend: 'down'
    },
    {
      rank: 5,
      contractor: 'Green Earth Services',
      recognitionScore: 76.2,
      goldWorkers: 12,
      silverWorkers: 45,
      bronzeWorkers: 59,
      totalWorkers: 116,
      trend: 'down'
    },
  ];

  const leaderboardColumns = [
    {
      key: 'rank',
      header: 'Rank',
      render: (value: number) => (
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
      render: (value: number) => (
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
      render: (value: string) => {
        const isUp = value === 'up';
        const isStable = value === 'stable';
        const TrendIcon = isUp ? TrendingUp : isStable ? null : TrendingDown;
        return (
          <span className={`px-2 py-1 inline-flex items-center rounded-full text-xs font-medium ${
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
    { name: 'Rajesh Kumar', contractor: 'ABC Cleaning Services', tier: 'Gold', score: 98 },
    { name: 'Priya Sharma', contractor: 'Metro Clean Solutions', tier: 'Gold', score: 96 },
    { name: 'Amit Singh', contractor: 'ABC Cleaning Services', tier: 'Gold', score: 95 },
    { name: 'Sunita Devi', contractor: 'City Maintenance Corp', tier: 'Gold', score: 94 },
    { name: 'Mohd. Ali', contractor: 'Metro Clean Solutions', tier: 'Gold', score: 93 },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Recognition & Performance</h1>
        <p className="text-gray-600 mt-2">Track and celebrate worker achievements and contractor performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <Icon className={`h-4 w-4 text-muted-foreground text-${kpi.color}-500`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Contractor Leaderboard */}
      <DataTable
        title="Contractor Leaderboard (Ranked by Recognition Score)"
        columns={leaderboardColumns}
        data={contractorLeaderboard}
        onView={(row: any) => console.log('View contractor details:', row.contractor)}
      />

      {/* Additional Recognition Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Workers */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            Top Performing Workers
          </h3>
          <div className="space-y-3">
            {topWorkers.map((worker, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{worker.name}</p>
                  <p className="text-sm text-gray-600">{worker.contractor}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recognition Tier Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-sm text-gray-600">Gold Tier (90+ Score)</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 h-3 bg-gray-200 rounded-full mr-2">
                  <div className="w-16 h-3 bg-yellow-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">125 workers</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Medal className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Silver Tier (75-89 Score)</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 h-3 bg-gray-200 rounded-full mr-2">
                  <div className="w-24 h-3 bg-gray-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">298 workers</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Award className="w-5 h-5 text-orange-500 mr-2" />
                <span className="text-sm text-gray-600">Bronze Tier (60-74 Score)</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 h-3 bg-gray-200 rounded-full mr-2">
                  <div className="w-20 h-3 bg-orange-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">156 workers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recognition;