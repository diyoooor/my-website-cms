"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  return (
    <aside className="w-64 bg-gray-200 p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="text-blue-600">
              Home
            </Link>
          </li>

          <li>
            <Link href="/dashboard/products" className="text-blue-600">
              Products
            </Link>
          </li>

          <li>
            <Link href="/dashboard/orders" className="text-blue-600">
              Orders
            </Link>
          </li>

          {/* Toggleable Settings Menu */}
          <li>
            <button
              type="button"
              onClick={() => setSettingsOpen((prev) => !prev)}
              className="flex items-center text-blue-600 hover:underline"
            >
              Settings{" "}
              <span className="ml-1 text-sm"> {settingsOpen ? "▲" : "▼"} </span>
            </button>
            {settingsOpen && (
              <ul className="ml-4 mt-1 space-y-1">
                <li>
                  <Link
                    href="/dashboard/settings/category"
                    className="text-blue-600"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/settings/sub-category"
                    className="text-blue-600"
                  >
                    Sub Category
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
