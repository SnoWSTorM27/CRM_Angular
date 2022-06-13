export interface User {
  email: string
  password: string
}

export interface Message {
  message: string
}

export interface Category {
  name: string
  imagesrc?: string
  user?: string
  id?: string
}

export interface Position {
  name: string 
  cost: number
  category_id: string
  user?: string
  id?: string 
}