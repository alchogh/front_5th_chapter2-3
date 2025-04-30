import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postAPI } from "../../../5_entities/post/model/api"
import { Post } from "../../../5_entities/post/model/type"
import { PostListResponse } from "../../../5_entities/post/model/type"

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postAPI.updatePost,
    onSuccess: (updatedPost: Post) => {
      // 모든 posts 쿼리 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["posts"] })

      // 현재 페이지의 쿼리 데이터 업데이트
      queryClient.setQueriesData<PostListResponse>({ queryKey: ["posts"] }, (old) => {
        if (!old) return old
        return {
          ...old,
          posts: old.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
        }
      })
    },
    onError: (err) => {
      console.error("게시물 업데이트 실패:", err)
    },
  })
}
