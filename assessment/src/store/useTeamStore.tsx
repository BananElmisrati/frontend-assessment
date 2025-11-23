import { create } from "zustand";

export type Filters = {
  searchTerm: string;
  role: string;
};

type TeamStore = {
  filters: Filters;
  updateFilters: (patch: Partial<Filters>) => void;
  setFilters: (filters: Filters) => void;
  clearFilters: () => void;
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

  setFilters: (filters) => set({ filters }),

  clearFilters: () =>
    set({
      filters: { searchTerm: "", role: "" },
    }),
}));
