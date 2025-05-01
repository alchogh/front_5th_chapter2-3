import { create } from "zustand"

interface UserModalStore {
  showUserModal: boolean
  setShowUserModal: (v: boolean) => void
}

export const useUserModalStore = create<UserModalStore>((set) => ({
  showUserModal: false,
  setShowUserModal: (v) => set({ showUserModal: v }),
}))
