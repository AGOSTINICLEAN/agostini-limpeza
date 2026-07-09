'use client';

import React from 'react';
import { Menu, LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { logout, getCurrentUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import logo from "@/public/logo.png";

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4 w-full justify-star">
  <Image
    src={logo}
    alt="Agostini Limpeza Especializada"
    width={180}
    height={70}
    className="object-contain"
    />

</div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <span className="text-2xl">{user.avatar}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Settings">
              <Settings className="w-5 h-5" />
            </button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
