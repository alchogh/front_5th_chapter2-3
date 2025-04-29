import { UserListResponse } from "./type"

export const userAPI = {
  getUsers: async (params: { limit: number; skip: number }): Promise<UserListResponse> => {
    const response = await fetch(`/api/users?limit=${params.limit}&skip=${params.skip}`)
    const data = await response.json()
    return data
  },
}
