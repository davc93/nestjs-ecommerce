import React, { useContext } from "react"
import { getProducts } from "../../apis/api/products"
import { Product } from "../../models/api/product.model"
import { ProductCard } from "../../components/ProductCard"

export const HomePage = () => {

  const [products, setProducts] = React.useState<Product[]>([])
  React.useEffect(()=>{
    const getData = async () => {
      const data = await getProducts()
      setProducts(data)
    }
    try {
      getData()
    } catch (error) {
      
    }
  },[])
  return (
    <main>
      <section className="products-container">
      {products.map((product)=>{
        return <ProductCard key={product.id} {...product} />
      })}
      </section>
      
    </main>
  )
}
