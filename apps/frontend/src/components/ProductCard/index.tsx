import React, { useContext } from 'react'
import { Product } from '../../models/product.model'
import { cartContext } from '../../contexts/CartProvider'

export const ProductCard = ({id,name,price,description,image}:Partial<Product>) => {

  const [state,dispatch]:any = useContext(cartContext)
  const addToCart = () => {
    dispatch({type:"ADD_ITEM",payload:{
      id,
      name,
      price,
      description,image
    }}) 
    console.log("[product-id]:",id)
  }
    return (
    <article>
        <img src={image} alt={name} />
        <h4>{name}</h4>
        <span>{price}</span>
        <p>{description}</p>
        <button onClick={addToCart}>Add To Cart</button>
    </article>
  )
}
