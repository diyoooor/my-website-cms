"use client";

import { useState } from "react";
import Link from "next/link";

interface ISidebarItem {
  title: string;
  href: string;
  subItems?: ISubSidebar[];
}

interface ISubSidebar {
  title: string;
  href: string;
}

export default function Sidebar() {
  const sideBarItem: ISidebarItem[] = [
    { title: "หน้า��ลัก", href: "/dashboard" },
    { title: "สินค้า", href: "/dashboard/products" },
    {
      title: "คำสั่ง��ื้อ",
      href: "/dashboard/orders",
      subItems: [
        { title: "รายชื่อคำสั่ง��ื้อ", href: "/dashboard/orders/list" },
        { title: "รายละเอียดคำสั่ง��ื้อ", href: "/dashboard/orders/details" },
      ],
    },
  ];

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  return (
    <aside className="w-64 bg-green-400 p-4">
      <nav>
        <ul className="space-y-2 text-xl font-bold">
          <li>
            <Link href="/dashboard" className="text-blue-600">
              หน้าหลัก
            </Link>
          </li>

          <li>
            <Link href="/dashboard/products" className="text-blue-600">
              สินค้า
            </Link>
          </li>

          <li>
            <Link href="/dashboard/orders" className="text-blue-600">
              คำสั่งซื้อ
            </Link>
          </li>

          {/* Toggleable Settings Menu */}
          <li>
            <button
              type="button"
              onClick={() => setSettingsOpen((prev) => !prev)}
              className="flex items-center text-blue-600 hover:underline"
            >
              ตั้งค่า{" "}
              <span className="ml-1 text-sm"> {settingsOpen ? "▲" : "▼"} </span>
            </button>
            {settingsOpen && (
              <ul className="ml-4 mt-1 space-y-1">
                <li>
                  <Link
                    href="/dashboard/settings/category"
                    className="text-blue-600"
                  >
                    หมวดหมู่
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/settings/sub-category"
                    className="text-blue-600"
                  >
                    หมวดหมู่ย่อย
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
}
