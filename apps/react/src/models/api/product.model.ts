export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  image: string
  createAt: Date
  updateAt: Date
  brand: Brand
}

export interface Brand {
  id: number
  name: string
  image: string
  createAt: Date
  updateAt: Date
}
