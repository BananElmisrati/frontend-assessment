import { create } from "zustand";

export type Filters = {
  searchTerm: string;
  role: string;
};

type TeamStore = {
  filters: Filters;
  updateFilters: (patch: Partial<Filters>) => void;
};

export const useTeamStore = create<TeamStore>((set) => ({


  filters: {
    searchTerm: "",
    role: "",
  },
  updateFilters: (patch) =>
    set((state) => ({
      filters: { ...state.filters, ...patch },
    })),
    clearFilters: () =>
  set({
    filters: {
      searchTerm: "",
      role: "",
    },
  }),
    
}));
