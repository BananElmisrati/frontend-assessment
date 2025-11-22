"use client";

import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import { useTeamStore } from "@/store/teamStore";

export default function TeamFilters() {
  const { filters, updateFilters, clearFilters } = useTeamStore();
  const [search, setSearch] = useState(filters.searchTerm);

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string) => {
        updateFilters({ searchTerm: value });
      }, 300),
    [updateFilters]
  );

  useEffect(() => {
    debouncedUpdate(search);
    return () => debouncedUpdate.cancel();
  }, [search, debouncedUpdate]);

  return (
    <div className="flex flex-wrap gap-3 items-center text-black">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2 flex-1 min-w-[160px]"
      />

      <select
        value={filters.role}
        onChange={(e) => updateFilters({ role: e.target.value })}
        className="border rounded p-2"
      >
        <option value="">All Roles</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Fullstack">Fullstack</option>
      </select>

      <button
        onClick={clearFilters}
        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Clear
      </button>
    </div>
  );
}
