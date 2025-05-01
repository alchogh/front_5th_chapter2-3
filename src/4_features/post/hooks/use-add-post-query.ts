import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postAPI } from "../../../5_entities/post/model/api"
import { PostCreateDTO, Post } from "../../../5_entities/post/model/type"

import { userAPI } from "../../../5_entities/users/model/api"
import { POSTS_QUERY_KEY, SortOrder } from "../../../6_shared/types/query-keys"

export const useAddPostMutation = (params: {
  limit: number
  skip: number
  searchQuery?: string
  sortBy?: string
  sortOrder?: SortOrder
  selectedTag?: string
}) => {
  const queryClient = useQueryClient()
  const queryKey = POSTS_QUERY_KEY(params)
  return useMutation<Post, Error, PostCreateDTO>({
    mutationFn: async (newPost) => {
      const newPostFromAPI = await postAPI.addPost(newPost)

      const usersData = await userAPI.getUsers({ limit: 0, skip: 0 })
      const author = usersData.users.find((u) => u.id === newPost.userId)
      if (!author) throw new Error("author not found")

      return {
        ...newPostFromAPI,
        author,
      }
    },
    onSuccess: (newPost: Post) => {
      console.log("🟢 새 게시물 성공적으로 추가됨:", newPost)
      queryClient.invalidateQueries(queryKey) // 목록 재요청
    },
    onError: (err) => {
      console.error("게시물 추가 실패:", err)
    },
  })
}
