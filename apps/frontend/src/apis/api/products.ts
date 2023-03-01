import { config } from '../../config'
import { type Product } from '../../models/api/product.model'

export const getProducts = async () => {
  const response = await fetch(`${config.apiUrl}/products`)
  const products: Product[] = await response.json()

  return products
}
