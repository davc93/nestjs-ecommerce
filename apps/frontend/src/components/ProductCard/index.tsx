import React, { useContext, useReducer } from 'react'
import { type Product } from '../../models/api/product.model'

import { cartReducerActions } from '../../contexts/cartReducer'
import { cartContext } from '../../contexts/CartContext'

export const ProductCard = ({ id, name, price, description, image }: Partial<Product>) => {
  const [cartState, cartDispatch]: any = useContext(cartContext)
  const addToCart = () => {
    cartDispatch({
      type: cartReducerActions.ADD_ITEM,
      payload: {
        id,
        name,
        price,
        description,
        image
      }
    })
  }
  return (
    <article className='product-card'>
        <img src={image} alt={name} />
        <h4>{name}</h4>
        <span>{price}</span>
        <p>{description}</p>
        <button className='btn--primary' onClick={addToCart}>Add To Cart</button>
    </article>
  )
}
