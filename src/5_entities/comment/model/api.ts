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

  //댓글 업데이트
  updateComment: async (selectedComment: Comment) => {
    const response = await fetch(`/api/comments/${selectedComment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: selectedComment.body }),
    })
    const data = await response.json()
    return data
  },

  //댓글 삭제
  deleteComment: async (id: number) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("댓글 삭제 실패")
    return id
  },

  //댓글 좋아요
  likeComment: async (id: number) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
    })
    const data = await response.json()
    return data
  },
}
