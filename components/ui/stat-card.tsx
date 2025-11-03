'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'indigo' | 'emerald' | 'amber' | 'sky' | 'violet' | 'pink';
  className?: string;
  onClick?: () => void;
}

const colorVariants = {
  blue: {
    bg: 'from-sky-500 to-blue-600',
    hoverBg: 'hover:from-sky-600 hover:to-blue-700',
    shadow: 'shadow-blue-200',
    hoverShadow: 'hover:shadow-sky-300/50',
    ring: 'hover:ring-sky-300/30',
    textHover: 'group-hover:text-blue-50'
  },
  green: {
    bg: 'from-emerald-500 to-green-600',
    hoverBg: 'hover:from-emerald-600 hover:to-green-700',
    shadow: 'shadow-green-200',
    hoverShadow: 'hover:shadow-emerald-300/50',
    ring: 'hover:ring-emerald-300/30',
    textHover: 'group-hover:text-emerald-50'
  },
  orange: {
    bg: 'from-amber-500 to-orange-600',
    hoverBg: 'hover:from-amber-600 hover:to-orange-700',
    shadow: 'shadow-orange-200',
    hoverShadow: 'hover:shadow-amber-300/50',
    ring: 'hover:ring-amber-300/30',
    textHover: 'group-hover:text-amber-50'
  },
  red: {
    bg: 'from-red-500 to-red-600',
    hoverBg: 'hover:from-red-600 hover:to-red-700',
    shadow: 'shadow-red-200',
    hoverShadow: 'hover:shadow-red-300/50',
    ring: 'hover:ring-red-300/30',
    textHover: 'group-hover:text-red-50'
  },
  purple: {
    bg: 'from-violet-500 to-purple-600',
    hoverBg: 'hover:from-violet-600 hover:to-purple-700',
    shadow: 'shadow-purple-200',
    hoverShadow: 'hover:shadow-violet-300/50',
    ring: 'hover:ring-violet-300/30',
    textHover: 'group-hover:text-violet-50'
  },
  indigo: {
    bg: 'from-indigo-500 to-indigo-600',
    hoverBg: 'hover:from-indigo-600 hover:to-indigo-700',
    shadow: 'shadow-indigo-200',
    hoverShadow: 'hover:shadow-indigo-300/50',
    ring: 'hover:ring-indigo-300/30',
    textHover: 'group-hover:text-indigo-50'
  },
  emerald: {
    bg: 'from-emerald-500 to-emerald-600',
    hoverBg: 'hover:from-emerald-600 hover:to-emerald-700',
    shadow: 'shadow-emerald-200',
    hoverShadow: 'hover:shadow-emerald-300/50',
    ring: 'hover:ring-emerald-300/30',
    textHover: 'group-hover:text-emerald-50'
  },
  amber: {
    bg: 'from-amber-500 to-amber-600',
    hoverBg: 'hover:from-amber-600 hover:to-amber-700',
    shadow: 'shadow-amber-200',
    hoverShadow: 'hover:shadow-amber-300/50',
    ring: 'hover:ring-amber-300/30',
    textHover: 'group-hover:text-amber-50'
  },
  sky: {
    bg: 'from-sky-500 to-sky-600',
    hoverBg: 'hover:from-sky-600 hover:to-sky-700',
    shadow: 'shadow-sky-200',
    hoverShadow: 'hover:shadow-sky-300/50',
    ring: 'hover:ring-sky-300/30',
    textHover: 'group-hover:text-sky-50'
  },
  violet: {
    bg: 'from-violet-500 to-violet-600',
    hoverBg: 'hover:from-violet-600 hover:to-violet-700',
    shadow: 'shadow-violet-200',
    hoverShadow: 'hover:shadow-violet-300/50',
    ring: 'hover:ring-violet-300/30',
    textHover: 'group-hover:text-violet-50'
  },
  pink: {
    bg: 'from-pink-500 to-pink-600',
    hoverBg: 'hover:from-pink-600 hover:to-pink-700',
    shadow: 'shadow-pink-200',
    hoverShadow: 'hover:shadow-pink-300/50',
    ring: 'hover:ring-pink-300/30',
    textHover: 'group-hover:text-pink-50'
  }
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'blue',
  className,
  onClick
}: StatCardProps) {
  const colorConfig = colorVariants[color];

  return (
    <div 
      className={cn(
        "group w-full max-w-full bg-gradient-to-br text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl hover:ring-2 transition-all duration-300 relative overflow-hidden",
        colorConfig.bg,
        colorConfig.hoverBg,
        colorConfig.shadow,
        colorConfig.hoverShadow,
        colorConfig.ring,
        onClick ? "cursor-pointer" : "",
        className
      )}
      onClick={onClick}
    >      
      <div className="flex items-center justify-between relative z-10">
        <div className="relative">
          {/* Title with localized glow */}
          <div className="relative">
            <p className={cn(
              "text-sm sm:text-base font-semibold transition-colors duration-300 relative z-10",
              colorConfig.textHover
            )}>
              {title}
            </p>
            {/* Title Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md" />
          </div>
          
          {/* Value with localized glow */}
          <div className="relative">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 group-hover:scale-105 transition-transform duration-300 relative z-10">
              {value}
            </p>
            {/* Value Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
            {/* Underline Effect */}
            <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-white/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </div>
          
          {subtitle && (
            <div className="relative">
              <p className="text-xs sm:text-sm opacity-80 group-hover:opacity-90 transition-opacity duration-300 mt-1 relative z-10">
                {subtitle}
              </p>
              {/* Subtitle Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />
            </div>
          )}
        </div>
        
        {/* Icon Container */}
        <div className="p-2 sm:p-3 bg-white/20 rounded-xl group-hover:bg-white/30 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300 relative">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 opacity-70 group-hover:opacity-100 transition-opacity duration-300 relative z-10" />
          {/* Icon Glow Effect - More focused */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/8 via-white/10 to-white/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl" />
        </div>
      </div>
    </div>
  );
}