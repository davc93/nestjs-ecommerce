import React, { useContext, useReducer } from 'react'
import { Product } from '../../models/api/product.model'
import { appContext} from '../../contexts/AppContext'
import { appReducerActions } from '../../contexts/AppReducer'


export const ProductCard = ({id,name,price,description,image}:Partial<Product>) => {

  const [state,dispatch]:any = useContext(appContext)
  const addToCart = () => {
    dispatch({type:appReducerActions.ADD_ITEM,payload:{
      id,
      name,
      price,
      description,image
    }}) 
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
