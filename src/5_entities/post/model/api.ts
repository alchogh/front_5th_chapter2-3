import { NewPost, Post, PostListResponse } from "./type"

export const postAPI = {
  getPosts: async (params: { limit: number; skip: number }): Promise<PostListResponse> => {
    const response = await fetch(`/api/posts?limit=${params.limit}&skip=${params.skip}`)
    const data = await response.json()
    return data
  },

  // 게시물 추가
  addPost: async (post: NewPost): Promise<Post> => {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    const data = await response.json()
    console.log(data)
    return data
  },

  // 게시물 검색
  searchPosts: async (searchQuery: string): Promise<PostListResponse> => {
    const response = await fetch(`/api/posts/search?q=${searchQuery}`)
    const data = await response.json()
    return data
  },

  // 게시물 태그 검색
  searchPostsByTag: async (tag: string): Promise<PostListResponse> => {
    const response = await fetch(`/api/posts/search?tag=${tag}`)
    const data = await response.json()
    return data
  },

  // 게시물 업데이트
  updatePost: async (post: Post): Promise<Post> => {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    const data = await response.json()
    return data
  },

  // 게시물 삭제
  deletePost: async (id: number): Promise<void> => {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
  },
}
