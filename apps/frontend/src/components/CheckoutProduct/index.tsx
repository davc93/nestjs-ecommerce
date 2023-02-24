import { Product } from "../../models/api/product.model";

export const CheckoutProduct = ({id,name,image,price}:Product) => {
  return (
    <li key={id}>
      <div>
        <img src={image} alt={name} style={{ width: 80 }} />
        <h5>{name}</h5>
        <span>{price}</span>
      </div>
    </li>
  );
};
