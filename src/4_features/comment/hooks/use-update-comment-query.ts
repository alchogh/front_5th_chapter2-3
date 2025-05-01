import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CommentsAPI } from "../../../5_entities/comment/model/api"
import { Comment } from "../../../5_entities/comment/model/type"

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: CommentsAPI.updateComment,
    onSuccess: (updateComment) => {
      queryClient.setQueryData<Comment[]>(["comments", updateComment.postId], (old = []) =>
        old.map((comment: Comment) => (comment.id === updateComment.id ? updateComment : comment)),
      )
    },
  })
}
