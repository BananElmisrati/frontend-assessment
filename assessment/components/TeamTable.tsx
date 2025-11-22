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
import { useTeamMembers, TeamMember } from "../hooks/useTeamMembers";
import LoadingSpinner from "./LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";

export default function TeamTable() {
  const { filters } = useTeamStore();

  const { data, loading, error } = useTeamMembers(filters);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
  });

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
          <span className="px-2 py-1 text-xs bg-[#FFE5B4] text-[#FF5F1F] rounded">
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

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!data.length) return <p className="text-black">No results found</p>;

  return (
    <div className="overflow-x-auto text-black">
      <table className="min-w-full border shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sorted = header.column.getIsSorted();

                return (
                  <th
                    key={header.id}
                    className="text-left p-3 border-b border-gray-200 cursor-pointer select-none "
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1 font-bold">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {sorted === "asc" ? "▲" : sorted === "desc" ? "▼" : ""}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          <AnimatePresence>
            {table.getRowModel().rows.map((row) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                whileHover={{
                  scale: 1.01,
                  backgroundColor: "rgba(243,244,246,0.5)",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-3 border-b border-gray-200 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4 text-sm">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 border rounded bg-[#FF5F1F] hover:bg-black text-white disabled:opacity-50"
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
          className="px-4 py-2 border rounded bg-[#FF5F1F] hover:bg-black text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
