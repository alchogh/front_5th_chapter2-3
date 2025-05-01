import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CommentsAPI } from "../../../5_entities/comment/model/api"
import { Comment } from "../../../5_entities/comment/model/type"

export const useDeleteCommentMutation = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: CommentsAPI.deleteComment,
    onSuccess: (deletedId) => {
      queryClient.setQueryData<Comment[]>(["comments", postId], (old) => {
        return (old ?? []).filter((comment) => comment.id !== deletedId)
      })
    },
  })
}
