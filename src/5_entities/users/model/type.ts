export interface UserListResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

export interface User {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  image: string
  username: string
  email: string
  address: {
    address: string
    city: string
    state: string
  }
  company: {
    name: string
    title: string
  }
  phone: string
  birthDate: string
  bloodGroup: string
  height: number
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
