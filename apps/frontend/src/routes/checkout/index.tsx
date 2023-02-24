import { useContext, useReducer } from "react";
import { CheckoutProduct } from "../../components/CheckoutProduct";
import { PaybuttonMP } from "../../components/PaybuttonMP";
import { Product } from "../../models/api/product.model";
import { Order } from "../../models/mercadopago/order.model";
import { appContext } from "../../contexts/AppContext";

export const CheckoutPage = () => {
  const [state, dispatch]:any = useContext(appContext)
  const preference = {
    items: state.products.map((product:Product)=>{
      return {
        title: product.name,
        unit_price:product.price,
        quantity: 1
      }
    })

  }
  const shipment = {
    cost:5000,

  }
  const order:Order = {preference,shipment}
  return (
    <main>
      <div className="checkout__products">
        {state.products.map((product: any) => {
          return <CheckoutProduct key={product.id} {...product} />;
        })}
      </div>
      <div className="checkout__customer">
        Customer Info
      </div>
      <div className="checkout__payments">
        <PaybuttonMP order={order} />
      </div>
    </main>
  );
};


