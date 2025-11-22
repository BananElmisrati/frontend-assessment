"use client";

"use client";

import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_TEAM_MEMBERS } from "@/graphql/queries/getTeamMembers";
import { useTeamStore } from "@/store/teamStore";
import { TeamMembersResponse } from "@/types/team"; // <- use shared type

export function useFetchTeamMembers(limit: number = 5) {
  const { filters, pagination, setTeamMembers, updatePagination } = useTeamStore();

  const { data, loading, error, refetch } = useQuery<TeamMembersResponse>(
    GET_TEAM_MEMBERS,
    {
      variables: {
        page: pagination.currentPage,
        limit,
        role: filters.role || null,
        search: filters.searchTerm || null,
      },
      fetchPolicy: "network-only",
    }
  );

  // 1️⃣ Handle data OR inject fallback mock
  useEffect(() => {
    if (data) {
      setTeamMembers(data.teamMembers.items);
      updatePagination({
        totalPages: data.teamMembers.pagination.totalPages,
      });
    } else {
      // 👉 Mock fallback if no backend
      setTeamMembers([
        {
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
        },
      ]);

      updatePagination({ totalPages: 1 });
    }
  }, [data, setTeamMembers, updatePagination]);

  // Refetch when filters or page change
  useEffect(() => {
    refetch({
      page: pagination.currentPage,
      limit,
      role: filters.role || null,
      search: filters.searchTerm || null,
    });
  }, [filters, pagination.currentPage, limit, refetch]);

  return { loading, error };
}
