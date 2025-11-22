import { gql } from "@apollo/client";

export const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers(
    $page: Int!
    $limit: Int!
    $role: String
    $search: String
  ) {
    teamMembers(
      page: $page
      limit: $limit
      role: $role
      search: $search
    ) {
      items {
        id
        name
        role
        avatarUrl
      }
      pagination {
        totalItems
        totalPages
        currentPage
      }
    }
  }
`;
