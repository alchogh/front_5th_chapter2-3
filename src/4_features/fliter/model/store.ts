import { create } from "zustand"
import { createJSONStorage } from "zustand/middleware"
import { persist } from "zustand/middleware"

interface PostFilterState {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: "asc" | "desc"
  limit: number
  skip: number
  setSearchQuery: (q: string) => void
  setSelectedTag: (t: string) => void
  setSortBy: (s: string) => void
  setSortOrder: (o: "asc" | "desc") => void
  setLimit: (l: number) => void
  setSkip: (s: number) => void
}

export const usePostFilterStore = create<PostFilterState>()(
  persist(
    (set) => ({
      searchQuery: "",
      selectedTag: "",
      sortBy: "",
      sortOrder: "asc",
      limit: 10,
      skip: 0,
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedTag: (selectedTag) => set({ selectedTag }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      setLimit: (limit) => set({ limit }),
      setSkip: (skip) => set({ skip }),
    }),
    {
      name: "post-filter",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
