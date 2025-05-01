import { userAPI } from "../../users/model/api"
import { User } from "../../users/model/type"
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

  getPostsWithAuthors: async ({ limit, skip }: { limit: number; skip: number }) => {
    // 게시물 가져오기
    const postsData = await postAPI.getPosts({ limit, skip })

    if (postsData.posts.length === 0) {
      return {
        posts: [],
        total: postsData.total,
      }
    }
    // 사용자 가져오기
    const usersData = await userAPI.getUsers({ limit: 0, skip: 0 })

    const postsWithUsers: Post[] = postsData.posts.map((post) => {
      const author = usersData.users.find((user) => user.id === post.userId)
      if (!author) throw new Error(`User not found for userId: ${post.userId}`)
      return { ...post, author }
    })

    return {
      posts: postsWithUsers,
      total: postsData.total,
    }
  },

  getPostsByTag: async (tag: string): Promise<{ posts: Post[]; total: number }> => {
    const [postsRes, usersRes] = await Promise.all([
      fetch(`/api/posts/tag/${tag}`),
      fetch(`/api/users?limit=0&select=username,image`),
    ])

    const postsData = await postsRes.json()
    const usersData = await usersRes.json()

    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: usersData.users.find((user: User) => user.id === post.userId),
    }))

    return {
      posts: postsWithUsers,
      total: postsData.total,
    }
  },
}
