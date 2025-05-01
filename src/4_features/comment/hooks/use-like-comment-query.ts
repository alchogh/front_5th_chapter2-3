// use-like-comment-query.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CommentsAPI } from "../../../5_entities/comment/model/api"
import { Comment } from "../../../5_entities/comment/model/type"

export const useLikeCommentQuery = () => {
  const queryClient = useQueryClient()

  return useMutation<Comment, Error, number>({
    mutationFn: CommentsAPI.likeComment,
    onSuccess: (updatedComment) => {
      queryClient.setQueryData<Comment[]>(["comments", updatedComment.postId], (old = []) =>
        old.map((comment) =>
          comment.id === updatedComment.id ? { ...updatedComment, likes: comment.likes + 1 } : comment,
        ),
      )
    },
  })
}
