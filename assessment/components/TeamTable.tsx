"use client";

import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import Image from "next/image";
import { useTeamStore } from "@/store/useTeamStore";
import { useTeamMembers, TeamMember } from "..//hooks/useTeamMembers";
import LoadingSpinner from "./LoadingSpinner";

export default function TeamTable() {
  const { filters } = useTeamStore();

  // Fetch filtered members using the mock API
  const { data, loading, error } = useTeamMembers(filters);

  // Table sorting & pagination states
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
  });

  // Columns (strict typing)
  const columns = useMemo<ColumnDef<TeamMember>[]>(
    () => [
      {
        accessorKey: "avatar",
        header: "Avatar",
        enableSorting: false,
        cell: ({ getValue }) => {
          const src = (getValue() as string | undefined) ?? "/default-avatar.png";
          return (
            <Image
              src={src}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          );
        },
      },
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
      },
      {
        accessorKey: "role",
        header: "Role",
        enableSorting: true,
        cell: ({ getValue }) => (
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        enableSorting: false,
      },
    ],
    []
  );

  // Initialize React Table
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // ──────────────────────────────── RENDER SECTION ────────────────────────────────

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!data.length) return <p className="text-black">No results found</p>;

  return (
    <div className="overflow-x-auto text-black">
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sorted = header.column.getIsSorted();

                return (
                  <th
                    key={header.id}
                    className="text-left p-2 border-b border-gray-200 cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {sorted === "asc"
                        ? "▲"
                        : sorted === "desc"
                        ? "▼"
                        : ""}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border-b border-gray-200 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-3 text-sm">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page <strong>{pagination.pageIndex + 1}</strong> of{" "}
          {table.getPageCount()}
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
