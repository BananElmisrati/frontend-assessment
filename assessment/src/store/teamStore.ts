import { create } from "zustand";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
}

interface Filters {
  role: string;
  searchTerm: string;
}

interface TeamStore {
  teamMembers: TeamMember[];
  filters: Filters;

  loading: boolean;                     
  setLoading: (value: boolean) => void; 

  setTeamMembers: (members: TeamMember[]) => void;
  updateFilters: (filters: Partial<Filters>) => void;
  clearFilters: () => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teamMembers: [],
  filters: { role: "", searchTerm: "" },

  loading: false,                               
  setLoading: (value) => set({ loading: value }),

  setTeamMembers: (members) => set({ teamMembers: members }),

  updateFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  clearFilters: () =>
    set({
      filters: { role: "", searchTerm: "" },
    }),
}));
