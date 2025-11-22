export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
}

export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface TeamMembersResponse {
  teamMembers: {
    items: TeamMember[];
    pagination: Pagination;
  };
}
