"use client";

import { DashboardContent } from "@/components/Dashboard";
import { SessionProvider } from 'next-auth/react'
export default function Home() {
  return (
    <SessionProvider>
      <DashboardContent />
    </SessionProvider>


  );
}
