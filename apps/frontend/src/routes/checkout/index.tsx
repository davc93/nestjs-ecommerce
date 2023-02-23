import { useContext } from "react";
import { cartContext } from "../../contexts/CartProvider";
import { CheckoutProduct } from "../../components/CheckoutProduct";
import { PaybuttonMP } from "../../components/PaybuttonMP";

export const CheckoutPage = () => {
  const [state, dispatch]: any = useContext(cartContext);

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
        <PaybuttonMP />
      </div>
    </main>
  );
};


