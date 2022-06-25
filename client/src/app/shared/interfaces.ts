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
  quantity?: number
}

export interface Order {
  date?: Date
  order_number?: number
  list: OrderPosition[]
  total_price: number
  user?: string
  id?: string
}

export interface OrderPosition {
  name: string
  cost: number
  quantity: number
  id?: string
}

export interface Filter {
  start?: Date
  end?: Date
  order?: number
}