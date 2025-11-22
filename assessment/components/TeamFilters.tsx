"use client";

import { ChangeEvent } from "react";
import { useTeamStore } from "@/store/useTeamStore";

export default function TeamFilters() {
  const { filters, updateFilters, clearFilters } = useTeamStore();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFilters({ searchTerm: e.target.value });
  };

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ role: e.target.value });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Search */}
      <input
        type="text"
        value={filters.searchTerm}
        onChange={handleNameChange}
        placeholder="Search by name..."
        className="border p-2 rounded"
      />

      {/* Role Dropdown */}
      <select
        value={filters.role}
        onChange={handleRoleChange}
        className="border p-2 rounded"
      >
        <option value="">All Roles</option>
        <option value="Frontend Engineer">Frontend Engineer</option>
        <option value="Backend Developer">Backend Developer</option>
        <option value="UI/UX Designer">UI/UX Designer</option>
      </select>

      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
      >
        Clear Filters
      </button>
    </div>
  );
}
