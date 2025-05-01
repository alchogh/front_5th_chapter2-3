import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postAPI } from "../../../5_entities/post/model/api"

import { getPostsQueryKey } from "../../../5_entities/comment/lib/get-post-query-key"

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()
  const currentQueryKey = getPostsQueryKey()

  return useMutation({
    mutationFn: (id: number) => postAPI.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currentQueryKey })
    },
    onError: (err) => {
      console.error("게시물 삭제 실패:", err)
    },
  })
}
