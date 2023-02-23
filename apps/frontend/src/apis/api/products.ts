import { config } from "../../config"
import { Product } from "../../models/product.model"


export const getProducts = async () => {
    console.log(config)
    const response =  await fetch(`${config.apiUrl}/products.json`)
    const products:Product[] = await response.json()
    return products
}