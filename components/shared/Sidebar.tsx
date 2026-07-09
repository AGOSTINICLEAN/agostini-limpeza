'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Users,
  UserCheck,
  Settings,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { DASHBOARD_NAV_ITEMS } from '@/lib/constants'
import Image from "next/image";
import logo from "@/public/logo.png";

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  UserCheck: <UserCheck className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
}

interface SidebarProps {
  isOpen: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  const user =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("currentUser") ?? '{"role":"client"}')
    : { role: "client" };

  const filteredNavItems = DASHBOARD_NAV_ITEMS.filter((item) => {
    if (!item.roles) return true;
    return item.roles.includes(user.role)
  })
  const isClient = user?.role === 'client'

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
  'fixed lg:static left-0 top-0 h-full w-64 bg-gray-900 text-white pt-6 z-40 transform transition-transform',
  isOpen ? 'translate-x-0 lg:translate-x-0' : '-translate-x-full lg:translate-x-0'
)}
      >

        <nav className="space-y-1 px-8">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href
            const icon = ICON_MAP[item.icon]

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg transition',
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
                )}
              >
                {icon}
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
