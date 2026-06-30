'use client';

import React from 'react';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}
