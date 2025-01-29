// app/dashboard/layout.tsx
import Breadcrumb from "@/components/utils/Breadcrumb";
import React from "react";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Dashboard - My App",
  description: "User dashboard layout",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex min-h-screen">
      {/* Sidebar, nav, or any persistent UI for the dashboard can go here */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 bg-white p-8">
        <Breadcrumb />
        {children}
      </main>
    </section>
  );
}
