// types
interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
}

interface TeamMembersArgs {
  page: number;
  limit: number;
  role?: string | null;
  search?: string | null;
}

interface TeamMembersResponse {
  items: TeamMember[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

// Mock resolver
export const mockTeamResolvers = {
  Query: {
    teamMembers: (
      _: unknown,
      args: TeamMembersArgs
    ): TeamMembersResponse => {
      const all: TeamMember[] = [
        { id: "1", name: "Ali", role: "Frontend", avatarUrl: "/avatars/1.png" },
        { id: "2", name: "Sara", role: "Backend", avatarUrl: "/avatars/2.png" },
        { id: "3", name: "Layla", role: "Frontend", avatarUrl: "/avatars/3.png" },
      ];

      let filtered = all;

      if (args.role) {
        filtered = filtered.filter((m) => m.role === args.role);
      }
      if (args.search) {
        filtered = filtered.filter((m) =>
          m.name.toLowerCase().includes(args.search!.toLowerCase())
        );
      }

      const start = (args.page - 1) * args.limit;
      const items = filtered.slice(start, start + args.limit);

      return {
        items,
        pagination: {
          totalItems: filtered.length,
          totalPages: Math.ceil(filtered.length / args.limit),
          currentPage: args.page,
        },
      };
    },
  },
};
