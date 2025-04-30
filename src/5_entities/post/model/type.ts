export interface Author {
  id: number
  username: string
  image: string
}

// 게시글
export interface Post {
  author: Author
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

// 게시글 생성 DTO
export interface PostCreateDTO {
  title: string
  body: string
  userId: number
}

// 게시글 수정 DTO
export interface PostUpdateDTO {
  title: string
  body: string
}

// 게시글 데이터 타입
export interface PostFromAPI {
  id: number
  title: string
  body: string
  userId: number
  reactions: {
    likes: number
    dislikes: number
  }
  tags: string[]
  views: number
}

export interface PostListResponse {
  posts: PostFromAPI[]
  total: number
  skip: number
  limit: number
}

export interface NewPost {
  title: string
  body: string
  userId: number
}
