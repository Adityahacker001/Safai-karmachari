'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: typeof LucideIcon;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'indigo';
  description?: string;
}

const colorVariants = {
  blue: {
    bg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    text: 'text-blue-600',
    lightBg: 'bg-blue-50'
  },
  green: {
    bg: 'bg-gradient-to-br from-emerald-500 to-green-600',
    text: 'text-green-600',
    lightBg: 'bg-green-50'
  },
  orange: {
    bg: 'bg-gradient-to-br from-amber-500 to-yellow-600',
    text: 'text-orange-600',
    lightBg: 'bg-orange-50'
  },
  red: {
    bg: 'bg-gradient-to-br from-red-600 to-rose-700',
    text: 'text-red-600',
    lightBg: 'bg-red-50'
  },
  purple: {
    bg: 'bg-gradient-to-br from-fuchsia-600 to-pink-600',
    text: 'text-purple-600',
    lightBg: 'bg-purple-50'
  },
  indigo: {
    bg: 'bg-gradient-to-br from-indigo-500 to-violet-600',
    text: 'text-indigo-600',
    lightBg: 'bg-indigo-50'
  }
};

const changeIcons = {
    increase: <TrendingUp className="h-4 w-4 text-white/90" />,
    decrease: <TrendingDown className="h-4 w-4 text-white/90" />,
    neutral: <Minus className="h-4 w-4 text-white/90" />,
};

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'neutral',
  color = 'blue',
  description
}: DashboardCardProps) {
  const colorConfig = colorVariants[color];

  const displayValue = typeof value === 'string' && value.includes('%') 
    ? value.replace('%', '') 
    : value;

  return (
    <Card className={cn("overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl text-white", colorConfig.bg)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/90">{title}</CardTitle>
        <div className={cn('p-2 rounded-full bg-white/20')}>
          <Icon className={cn('h-5 w-5 text-white')} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{displayValue}{typeof value === 'string' && value.includes('%') && <span className="text-2xl opacity-80">%</span>}</div>
        {change && (
            <div className="flex items-center text-xs text-white/80 pt-1">
                {changeIcons[changeType]}
                <span className="ml-1">{change}</span>
            </div>
        )}
        {description && !change && (
          <p className="text-xs text-white/80 pt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}