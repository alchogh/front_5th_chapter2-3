import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postAPI } from "../../../5_entities/post/model/api"

import { PostListResponse } from "../../../5_entities/post/model/type"
import { POSTS_QUERY_KEY } from "../../../6_shared/types/query-keys"

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()
  const defaultKey = POSTS_QUERY_KEY({ limit: 10, skip: 0, searchQuery: "", tag: "" })

  return useMutation({
    mutationFn: postAPI.deletePost,
    onSuccess: (_, postId) => {
      // 모든 posts 쿼리 캐시 무효화
      queryClient.invalidateQueries({ queryKey: defaultKey })

      // 현재 페이지의 쿼리 데이터 업데이트
      queryClient.setQueriesData<PostListResponse>({ queryKey: ["posts"] }, (old) => {
        if (!old) return old
        return {
          ...old,
          total: old.total - 1,
          posts: old.posts.filter((post) => post.id !== postId),
        }
      })
    },
    onError: (err) => {
      console.error("게시물 삭제 실패:", err)
    },
  })
}
