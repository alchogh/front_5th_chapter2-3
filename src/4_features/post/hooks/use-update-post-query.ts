import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postAPI } from "../../../5_entities/post/model/api"
import { Post } from "../../../5_entities/post/model/type"
import { PostListResponse } from "../../../5_entities/post/model/type"
import { getPostsQueryKey } from "../../../5_entities/comment/lib/get-post-query-key"

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()
  const currentQueryKey = getPostsQueryKey()

  return useMutation({
    mutationFn: postAPI.updatePost,
    onSuccess: (updatedPost: Post) => {
      console.log("업데이트 성공")
      // 현재 페이지의 쿼리 데이터 업데이트
      queryClient.setQueryData<PostListResponse>(currentQueryKey, (old) => {
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
