"use client";

import Image from "next/image";
import TeamFilters from "../../../components/TeamFilters";
import TeamTable from "../../../components/TeamTable";
import { useTeamStore } from "@/store/useTeamStore";
import { useTeamMembers } from "../../../hooks/useTeamMembers";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "../../../components/LoadingSpinner";
import TeamMembersCard from "../../../components/TeamMembersCard";


export default function TeamDir() {
  const { filters } = useTeamStore();

  const { data, loading, error } = useTeamMembers(filters);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
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

    <TeamMembersCard data={data}></TeamMembersCard>


      <TeamTable />
    </main>
  );
}
