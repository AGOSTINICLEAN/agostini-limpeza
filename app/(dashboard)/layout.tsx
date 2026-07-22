import React from 'react';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { profile } from 'console';

export default async function DashboardRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();

//if (!user) {
  //redirect("/login");
//}

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single()

    const roleProfile = profile?.role ?? "client";

  return (
    <DashboardLayout role={roleProfile}>
      {children}
    </DashboardLayout>
  );
}