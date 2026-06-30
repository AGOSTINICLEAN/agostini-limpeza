'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Users,
  UserCheck,
  Settings,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DASHBOARD_NAV_ITEMS } from '@/lib/constants';

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  UserCheck: <UserCheck className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
};

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full w-64 bg-gray-900 text-white pt-6 z-40 transform transition-transform lg:translate-x-0 lg:relative lg:top-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex justify-between items-center px-6 mb-8 lg:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={onClose} aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-1 px-4">
          {DASHBOARD_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const icon = ICON_MAP[item.icon as keyof typeof ICON_MAP];

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                )}
                onClick={onClose}
              >
                {icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
