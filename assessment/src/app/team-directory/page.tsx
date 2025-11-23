"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTeamStore } from "@/store/useTeamStore";
import TeamFilters from "../../../components/TeamFilters";
import TeamTable from "../../../components/TeamTable";
import { useTeamMembers } from "../../../hooks/useTeamMembers";
import TeamMembersCard from "../../../components/TeamMembersCard";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function TeamDir() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { filters, setFilters } = useTeamStore();

  useEffect(() => {
    const urlFilters = {
      searchTerm: searchParams.get("search") ?? "",
      role: searchParams.get("role") ?? "",
    };

    setFilters(urlFilters);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.searchTerm) params.set("search", filters.searchTerm);
    if (filters.role) params.set("role", filters.role);

    router.replace(`?${params.toString()}`);
  }, [filters]);

  const { data, loading, error } = useTeamMembers(filters);
  if (loading) return <LoadingSpinner></LoadingSpinner>
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-xl font-semibold text-black">Team Directory</h1>
      <TeamFilters />

      <TeamMembersCard data={data}></TeamMembersCard>
      <TeamTable />
    </main>
  );
}
