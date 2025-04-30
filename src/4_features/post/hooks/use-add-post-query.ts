import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postAPI } from "../../../5_entities/post/model/api"
import { PostListResponse, PostCreateDTO, Post } from "../../../5_entities/post/model/type"
import { POSTS_QUERY_KEY } from "../../../6_shared/types/query-keys"

export const useAddPostMutation = () => {
  const queryClient = useQueryClient()
  const defaultKey = POSTS_QUERY_KEY({
    limit: 10,
    skip: 0,
    searchQuery: undefined,
    tag: undefined,
  })
  return useMutation<Post, Error, PostCreateDTO>({
    mutationFn: postAPI.addPost,
    onSuccess: (newPost: Post) => {
      console.log("🟢 새 게시물 성공적으로 추가됨:", newPost)
      // 기존 캐시 업데이트 방식 ①: invalidate
      queryClient.invalidateQueries({ queryKey: defaultKey })

      // 또는 캐시 업데이트 방식 ②: 직접 삽입
      queryClient.setQueryData<PostListResponse>(defaultKey, (old) => ({
        total: (old?.total ?? 0) + 1,
        posts: [newPost, ...(old?.posts ?? [])],
        skip: old?.skip ?? 0,
        limit: old?.limit ?? 10,
      }))
    },
    onError: (err) => {
      console.error("게시물 추가 실패:", err)
    },
  })
}
