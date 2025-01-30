"use client";

import React, { useState, useMemo } from "react";

export interface ColumnDef<T> {
  key: keyof T; // which property to display
  label: string; // column header
}

interface DataTableProps<T> {
  data: T[]; // the entire dataset
  columns: ColumnDef<T>[]; // which columns to show
  getRowId: (item: T) => string; // unique ID extraction
  onCreate?: () => void; // callback for Create button
  onDeleteSelected?: (ids: string[]) => void; // callback for Delete
  filterFn?: (item: T, search: string) => boolean; // custom filter logic
  searchPlaceholder?: string; // placeholder text for search
  tableTitle?: string; // optional heading/title

  // PAGINATION
  initialPageSize?: number; // default items per page
  enablePagination?: boolean; // toggle pagination on/off
}

/**
 * A reusable DataTable with:
 * - Search/Filter (client-side)
 * - Create/Delete Selected
 * - Multi-select (including "Select All")
 * - **Optional** client-side Pagination
 */
export function DataTable<T>({
  data,
  columns,
  getRowId,
  onCreate,
  onDeleteSelected,
  filterFn,
  searchPlaceholder = "Search...",
  tableTitle = "Data Table",
  initialPageSize = 5,
  enablePagination = false,
}: Readonly<DataTableProps<T>>) {
  // Local states
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // For pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Default filter: checks each column's string value if filterFn is not provided
  const defaultFilterFn = (item: T, searchTerm: string) => {
    const lowerSearch = searchTerm.toLowerCase();
    return columns.some((col) => {
      const value = String(item[col.key]).toLowerCase();
      return value.includes(lowerSearch);
    });
  };

  // Final filter function
  const effectiveFilterFn = filterFn ?? defaultFilterFn;

  // Derive filtered data
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item) => effectiveFilterFn(item, search));
  }, [data, search, effectiveFilterFn]);

  // If pagination is disabled, we'll just show all filtered data
  // If enabled, we slice the data based on page/pageSize
  const paginatedData = useMemo(() => {
    if (!enablePagination) return filteredData;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, page, pageSize, enablePagination]);

  // Calculate total pages for pagination
  const totalPages = enablePagination
    ? Math.ceil(filteredData.length / pageSize)
    : 1;

  // Check if all visible items (on the current page) are selected
  const allVisibleSelected =
    paginatedData.length > 0 &&
    paginatedData.every((item) => selectedIds.has(getRowId(item)));

  // Toggle select all in the current "view" (page)
  const handleSelectAll = () => {
    if (allVisibleSelected) {
      // Unselect all on the current page
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        paginatedData.forEach((item) => newSet.delete(getRowId(item)));
        return newSet;
      });
    } else {
      // Select all on the current page
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        paginatedData.forEach((item) => newSet.add(getRowId(item)));
        return newSet;
      });
    }
  };

  // Toggle a single row’s selection
  const handleToggleRow = (item: T) => {
    const id = getRowId(item);
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // On delete selected
  const handleDeleteSelected = () => {
    if (onDeleteSelected && selectedIds.size > 0) {
      onDeleteSelected(Array.from(selectedIds));
      setSelectedIds(new Set()); // clear local selection
    }
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  // When pageSize changes, reset to page 1
  const handleChangePageSize = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{tableTitle}</h1>

      {/* Actions: Search, Create, Delete */}
      <div className="flex items-center gap-2">
        {/* Filter/Search */}
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="p-2 border border-gray-300 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Create button */}
        {onCreate && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={onCreate}
          >
            Create
          </button>
        )}

        {/* Delete button */}
        {onDeleteSelected && (
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
            onClick={handleDeleteSelected}
            disabled={selectedIds.size === 0}
          >
            Delete Selected
          </button>
        )}
      </div>

      {/* Table */}
      <table className="w-full border-collapse bg-white text-black">
        <thead>
          <tr className="bg-gray-100 border-b">
            {/* Checkbox col */}
            <th className="p-2 border-r">
              {onDeleteSelected && (
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={handleSelectAll}
                />
              )}
            </th>
            {columns.map((col) => (
              <th key={String(col.key)} className="p-2 border-r text-left">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => {
            const rowId = getRowId(item);
            const isSelected = selectedIds.has(rowId);

            return (
              <tr key={rowId} className="border-b hover:bg-gray-50">
                <td className="p-2 border-r">
                  {onDeleteSelected && (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleRow(item)}
                    />
                  )}
                </td>
                {columns.map((col) => (
                  <td key={String(col.key)} className="p-2 border-r">
                    {String(item[col.key])}
                  </td>
                ))}
              </tr>
            );
          })}

          {/* No data state */}
          {paginatedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="p-4 text-center text-gray-500"
              >
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls (Top or Bottom) */}
      {enablePagination && (
        <div className="flex items-center justify-between gap-2 text-black">
          {/* Page size selector */}
          <div className="flex items-center gap-1">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => handleChangePageSize(Number(e.target.value))}
              className="p-1 border border-gray-300 rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={filteredData.length}>All</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages || totalPages === 0}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
