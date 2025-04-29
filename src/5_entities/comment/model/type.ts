export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: User
}

export interface User {
  fullName: string
  id: number
  username: string
}

export interface NewComment {
  body: string
  postId: null | number
  userId: number
}
