"use client";
import React from "react";
import { useTeamStore } from "@/store/teamStore";
import TeamMemberCard from "./TeamMemberCard";

export default function TeamGrid() {
  const { teamMembers } = useTeamStore();

  if (!teamMembers.length) return <p>No team members found.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {teamMembers.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}
