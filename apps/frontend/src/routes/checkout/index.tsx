import { useContext } from "react";
import { cartContext } from "../../contexts/CartProvider";
import { CheckoutProduct } from "../../components/CheckoutProduct";
import { PaybuttonMP } from "../../components/PaybuttonMP";
import { Product } from "../../models/product.model";

export const CheckoutPage = () => {
  const [state, dispatch]: any = useContext(cartContext);
  const preference = {
    items: state.products.map((product:Product)=>{
      return {
        title: product.name,
        unit_price:product.price,
        quantity: 1
      }
    })

  }
  const shipment = null
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
        <PaybuttonMP preference={preference} shipment={shipment} />
      </div>
    </main>
  );
};


