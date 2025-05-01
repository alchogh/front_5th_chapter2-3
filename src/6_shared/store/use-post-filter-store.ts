import { create } from "zustand"
import { SortOrder } from "../types/query-keys"

interface PostFilterState {
  skip: number
  limit: number
  searchQuery: string
  sortBy: string
  sortOrder: SortOrder
  selectedTag: string

  setSkip: (v: number) => void
  setLimit: (v: number) => void
  setSearchQuery: (v: string) => void
  setSortBy: (v: string) => void
  setSortOrder: (v: "asc" | "desc") => void
  setSelectedTag: (v: string) => void
}

export const usePostFilterStore = create<PostFilterState>((set) => ({
  //페이지번호
  skip: 0,
  limit: 10,
  searchQuery: "",
  //정렬기준
  sortBy: "",
  //정렬순서
  sortOrder: "asc",
  //선택된 태그
  selectedTag: "",

  setSkip: (v) => set({ skip: v }),
  setLimit: (v) => set({ limit: v }),
  setSearchQuery: (v) => set({ searchQuery: v }),
  setSortBy: (v) => set({ sortBy: v }),
  setSortOrder: (v) => set({ sortOrder: v }),
  setSelectedTag: (v) => set({ selectedTag: v }),
}))
