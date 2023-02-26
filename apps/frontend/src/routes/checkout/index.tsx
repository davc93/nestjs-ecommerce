import { useContext, useReducer } from "react";
import { CheckoutItems } from "../../components/CheckoutProduct";
import { PaybuttonMP } from "../../components/PaybuttonMP";
import { Product } from "../../models/api/product.model";
import { Order, Preference } from "../../models/mercadopago/order.model";
import { appContext } from "../../contexts/AppContext";
import { CartItem } from "../../models/AppUser.model";
import "./style.css";
export const CheckoutPage = () => {
  const [state, dispatch]: any = useContext(appContext);
  const preference: Preference = {
    items: state.items.map((item: CartItem) => {
      return {
        title: item.product.name,
        unit_price: item.product.price,
        quantity: item.quantity,
      };
    }),
  };
  const shipment = {
    cost: 5000,
  };
  const order: Order = { preference, shipment };
  return (
    <main className="checkout-page">
      <div className="checkout__products">
        {state.items.map((item: CartItem) => {
          return <CheckoutItems key={item.product.id} {...item} />;
        })}
      </div>
      <div className="checkout__customer">
        <h3>Customer Info</h3>
          <PaybuttonMP order={order} />
      </div>
    </main>
  );
};
