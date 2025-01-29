// app/dashboard/layout.tsx
import React from "react";

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
      <aside className="w-64 bg-gray-200 p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/dashboard" className="text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="/dashboard/products" className="text-blue-600">
                Products
              </a>
            </li>
            <li>
              <a href="/dashboard/orders" className="text-blue-600">
                Orders
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 bg-white p-8">{children}</main>
    </section>
  );
}
