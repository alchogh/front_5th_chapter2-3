import { useQuery } from "@tanstack/react-query"
import { Comment } from "../../../5_entities/comment/model/type"
import { CommentsAPI } from "../../../5_entities/comment/model/api"

export const useCommentFetchQuery = (postId: number) =>
  useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      console.log("🔍 postId in useCommentFetchQuery:", postId)
      return CommentsAPI.getComments(postId)
    },
    enabled: !!postId,
    staleTime: 1000 * 60,
  })
