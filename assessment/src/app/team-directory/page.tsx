"use client";

import { useEffect } from "react";
import { useTeamStore } from "@/store/teamStore";
import TeamFilters from "../../../components/TeamFilters";
import Image from "next/image";
import TeamTable from "../../../components/TeamTable";
export default function TeamDir() {
  const { teamMembers, setTeamMembers, filters } = useTeamStore();

  // Mock data
  useEffect(() => {
    setTeamMembers([{
    id: "1",
    name: "John Doe",
    role: "Frontend Engineer",
    email: "john@example.com",
    avatar: "/avatars/john.png",
  },
  {
    id: "2",
    name: "Sarah Smith",
    role: "UI/UX Designer",
    email: "sarah@example.com",
    avatar: "/avatars/sarah.png",
  },
  {
    id: "3",
    name: "Mohammed Khaled",
    role: "Backend Developer",
    email: "mohammed@example.com",
    avatar: "/avatars/mohammed.png",
    
  }])}, [setTeamMembers]);

  // Apply filtering
  const filtered = teamMembers.filter((m) => {
    const matchName = filters.searchTerm
      ? m.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      : true;

    const matchRole = filters.role
      ? m.role.toLowerCase().includes(filters.role.toLowerCase())
      : true;

    return matchName && matchRole;
  });

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-xl font-semibold text-black">Team Directory</h1>

      <TeamFilters />

      {filtered.length > 0 ? (
<ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((member) => (

            <li
              key={member.id}
              className="p-3 border rounded shadow-sm bg-white"
            >
                 <Image
  src={member.avatar ?? "/default.png"}
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
        <p className=" text-black ">No team members found.</p>
      )}
      <TeamTable></TeamTable>
    </main>
  );
}
