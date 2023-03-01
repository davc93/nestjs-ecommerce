import { Cart, Item } from "../../models/App.model";
import './style.css'

export const CheckoutItems = ({product,quantity}:Item) => {
  return (
    <li key={product.id}>
      <div className="checkout-page__item">
        <img src={product.image} alt={product.name} style={{ width: 80 }} />
        <h5>{product.name}</h5>
        <span>{product.price}</span>

        <span>{quantity}</span>
      </div>
    </li>
  );
};
