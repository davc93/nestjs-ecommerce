import { type Product } from './api/product.model'
import { type User } from './api/user.model'
export interface AppUser {
  user: Partial<User> | null
}

export interface Cart {
  items: Item[]

}
export interface Item {
  product: Product
  quantity: number

}
