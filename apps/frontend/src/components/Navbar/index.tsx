import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../contexts/CartProvider";

export const Navbar = () => {
  const [state, dispatch]: any = useContext(cartContext);
  const [modelIsOpen, setModelIsOpen] = React.useState(false);
  const routes = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/checkout",
      name: "Checkout",
    },
  ];

  return (
    <nav>
      <div className="menu">
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={name}>
                <Link onClick={() => setModelIsOpen(false)} to={path}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="cart">
        <button onClick={() => setModelIsOpen(!modelIsOpen)}>My Cart</button>
        <div className={`cart__products ${modelIsOpen ? "" : "inactive"}`}>
          <ul>
            {state.products.map((product: any) => {
              const handleClick = () => {
                dispatch({ type: "REMOVE_ITEM", payload: { ...product } });
              };
              return (
                <li key={product.id}>
                  <div>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: 80 }}
                    />
                    <h5>{product.name}</h5>
                    <span>{product.price}</span>
                  </div>
                  <button onClick={handleClick}>X</button>
                </li>
              );
            })}
            <Link onClick={() => setModelIsOpen(false)} to={"/checkout"}>
              Checkout
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};
