"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function Breadcrumb() {
  const pathname = usePathname(); // e.g. "/dashboard/settings/profile"

  // Split into segments and remove empty ones (the first split might be an empty string)
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  // You could optionally transform each segment for display
  // (e.g., "profile" -> "Profile", "user-management" -> "User Management")
  // For simplicity, we'll just use the raw segment.

  // Build up a cumulative path for each segment
  // e.g. segments: ["dashboard", "settings", "profile"]
  // so links become: "/dashboard", "/dashboard/settings", "/dashboard/settings/profile"
  let cumulativePath = "";

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-gray-500">
        {pathSegments.map((segment, index) => {
          const newStr =
            segment.charAt(0).toUpperCase() + segment.slice(1, segment.length);

          cumulativePath += `/${newStr}`; // build the path

          // Last segment is current page (no need to make it a link)
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={index} className="flex items-center">
              {!isLast ? (
                <Link
                  href={cumulativePath}
                  className="text-blue-600 hover:underline"
                >
                  {decodeURIComponent(newStr)}
                </Link>
              ) : (
                <span className="font-semibold text-gray-700">
                  {decodeURIComponent(newStr)}
                </span>
              )}
              {!isLast && <span className="mx-2">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
