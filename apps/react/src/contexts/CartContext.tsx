import { type Dispatch, Reducer, createContext, useReducer } from 'react'
import { cartReducer } from './cartReducer'
import { type Cart } from '../models/App.model'
import { type Product } from '../models/api/product.model'

const initialState: Cart = {
  items: []
}

export const cartContext = createContext<[Cart, Dispatch<{ type: string, payload?: Product }>]>([initialState, () => {}])

export const CartContext = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  return (
    <cartContext.Provider value={[state, dispatch]}>
      {children}
    </cartContext.Provider>
  )
}
