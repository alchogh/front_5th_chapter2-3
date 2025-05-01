import { Comment, NewComment } from "./type"

export const CommentsAPI = {
  //댓글 보여주기
  getComments: async (postId: number): Promise<Comment[]> => {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data: { comments: Comment[] } = await response.json()
    return data.comments
  },

  //댓글 추가
  addComment: async (newComment: NewComment) => {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
    const data = await response.json()
    return data
  },
}
