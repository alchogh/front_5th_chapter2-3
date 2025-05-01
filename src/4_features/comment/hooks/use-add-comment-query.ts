import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CommentsAPI } from "../../../5_entities/comment/model/api"
import { NewComment, Comment } from "../../../5_entities/comment/model/type"

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<Comment, Error, NewComment>({
    mutationFn: CommentsAPI.addComment,
    onSuccess: (newComment) => {
      queryClient.setQueriesData<Comment[]>(["comments", newComment.postId], (old = []) => [newComment, ...old])
    },
  })
}
