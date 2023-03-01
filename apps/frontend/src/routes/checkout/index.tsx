import { useContext, useReducer } from 'react'
import { CheckoutItems } from '../../components/CheckoutProduct'
import { PaybuttonMP } from '../../components/PaybuttonMP'
import { type Order, type Preference } from '../../models/mercadopago/order.model'

import './style.css'
import { cartContext } from '../../contexts/CartContext'
export const CheckoutPage = () => {
  const [cartState, cartDispatch] = useContext(cartContext)
  const preference: Preference = {
    items: cartState.items.map((item) => {
      return {
        title: item.product.name,
        unit_price: item.product.price,
        quantity: item.quantity
      }
    })
  }
  const shipment = {
    cost: 5000
  }
  const order: Order = { preference, shipment }
  return (
    <main className="checkout-page">
      <div className="checkout__products">
        {cartState.items.map((item) => {
          return <CheckoutItems key={item.product.id} {...item} />
        })}
      </div>
      <div className="checkout__customer">
        <h3>Customer Info</h3>
          <PaybuttonMP order={order} />
      </div>
    </main>
  )
}
