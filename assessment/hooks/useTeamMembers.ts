"use client";

import { useEffect, useState } from "react";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
};

export type FilterInput = {
  searchTerm?: string;
  role?: string;
};

export const useTeamMembers = (filters: FilterInput) => {
  const [data, setData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Mock dataset (as if returned from GraphQL)
  const MOCK_MEMBERS: TeamMember[] = [
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
  ];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        // Simulate network latency
        await new Promise<void>((res) => setTimeout(res, 1000));

        const filtered = MOCK_MEMBERS.filter((m) => {
          const matchesName = filters.searchTerm
            ? m.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
            : true;

          const matchesRole = filters.role
            ? m.role.toLowerCase().includes(filters.role.toLowerCase())
            : true;

          return matchesName && matchesRole;
        });

        setData(filtered);
      } catch (e) {
        setError(
          e instanceof Error ? e : new Error("Unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  return { data, loading, error };
};
