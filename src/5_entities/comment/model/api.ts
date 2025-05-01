import { Comment } from "./type"

export const CommentsAPI = {
  getComments: async (postId: number): Promise<Comment[]> => {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data: { comments: Comment[] } = await response.json()
    return data.comments
  },
}
