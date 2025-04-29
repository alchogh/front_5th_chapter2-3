export interface UserListResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

export interface User {
  id: number
  username: string
  image: string
}

export interface SelectedUser {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  image: string
  username: string
  age: number
  address: {
    address: string
    city: string
    state: string
  }
  company: {
    name: string
    title: string
  }
}
