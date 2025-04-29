export interface Author {
  id: number
  username: string
  image: string
}

export interface Post {
  author?: Author
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
