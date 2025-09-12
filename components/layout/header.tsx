'use client';

import React from 'react';
import { Bell, ChevronDown, User } from 'lucide-react';

interface HeaderProps {
  userName: string;
}


export default function Header({ userName }: HeaderProps) {
  return (
  <header className="w-full px-6 py-4 bg-white border-b flex items-center justify-between" style={{ minHeight: '68px' }}>
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 text-white rounded-md w-8 h-8 flex items-center justify-center font-bold text-lg">
          N
        </div>
        <span className="font-semibold text-lg text-gray-900">
          Safai Karmachari Management System
        </span>
      </div>



      {/* Notification & User */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Bell className="h-6 w-6 text-gray-500" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">3</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <span className="text-gray-700 text-sm">{userName}</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
