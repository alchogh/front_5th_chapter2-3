import { create } from "zustand"

interface CommentModalStore {
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  setShowAddCommentDialog: (v: boolean) => void
  setShowEditCommentDialog: (v: boolean) => void
}

export const useCommentModalStore = create<CommentModalStore>((set) => ({
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  setShowAddCommentDialog: (v) => set({ showAddCommentDialog: v }),
  setShowEditCommentDialog: (v) => set({ showEditCommentDialog: v }),
}))
