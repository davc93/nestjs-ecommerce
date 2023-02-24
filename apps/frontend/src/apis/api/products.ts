import { config } from "../../config"
import { Product } from "../../models/product.model"


export const getProducts = async () => {
    
    const response =  await fetch(`${config.apiUrl}/products`)
    const products:Product[] = await response.json()
    
    return products
}