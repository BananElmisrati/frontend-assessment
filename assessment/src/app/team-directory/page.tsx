"use client";

import Image from "next/image";
import TeamFilters from "../../../components/TeamFilters";
import TeamTable from "../../../components/TeamTable";
import { useTeamStore } from "@/store/useTeamStore";
import { useTeamMembers } from "../../../hooks/useTeamMembers";

export default function TeamDir() {
  const { filters } = useTeamStore();

  const { data, loading, error } = useTeamMembers(filters);

  if (loading) {
    return <p className="text-black p-6">Loading team members...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500 p-6">
        Failed to load: {error.message}
      </p>
    );
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-xl font-semibold text-black">Team Directory</h1>

      <TeamFilters />

      {data.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((member) => (
            <li key={member.id} className="p-3 border rounded bg-white shadow-sm">
              <Image
                src={member.avatar}
                alt={member.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="font-semibold text-black">{member.name}</div>
              <div className="text-sm text-gray-500">{member.role}</div>
              <div className="text-xs text-gray-400">{member.email}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-black">No team members found.</p>
      )}

      <TeamTable />
    </main>
  );
}
