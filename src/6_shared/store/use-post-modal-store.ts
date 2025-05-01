import { create } from "zustand"

interface PostModalStore {
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean

  setShowAddDialog: (v: boolean) => void
  setShowEditDialog: (v: boolean) => void
  setShowPostDetailDialog: (v: boolean) => void
}

export const usePostModalStore = create<PostModalStore>((set) => ({
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,
  setShowAddDialog: (v) => set({ showAddDialog: v }),
  setShowEditDialog: (v) => set({ showEditDialog: v }),
  setShowPostDetailDialog: (v) => set({ showPostDetailDialog: v }),
}))
