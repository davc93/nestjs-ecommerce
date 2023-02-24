import React, { useContext, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appContext } from "../../contexts/AppContext";

export const Navbar = () => {
  const [state, dispatch]: any = useContext(appContext);
  const [modelIsOpen, setModelIsOpen] = React.useState(false);
  const navigate = useNavigate()
  const routes = [
    {
      path: "/",
      name: "Home",
      private: false,
      onlyPublic: false,
    },
    {
      path: "/checkout",
      name: "Checkout",
      private: false,
      onlyPublic: false,
    },

    {
      path: "/login",
      name: "Login",
      private: false,
      onlyPublic: true,
    },

    {
      path: "/signup",
      name: "Sign Up",
      private: false,
      onlyPublic: true,
    },

    {
      path: "/profile",
      name: "Profile",
      private: true,
      onlyPublic: false,
    },
  ];
  const handleLogout = () => {
    dispatch({type:"LOGOUT"})
    navigate('/')
    
  }

  return (
    <nav>
      <div className="menu">
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={name}>
                <Link onClick={() => setModelIsOpen(false)} to={path}>
                  {name}
                </Link>
              </li>
            );
          })}
          {state.user.email && (
            <>
                        <li>
              <h5>{state.user.email}</h5>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            </>

          )}
        </ul>
      </div>
      <div className="cart">
        <button onClick={() => setModelIsOpen(!modelIsOpen)}>My Cart</button>
        <span>{state.products.length}</span>
        <div
          className={`cart__products ${modelIsOpen ? "" : "inactive"}`}
          style={{}}
        >
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
                    <button onClick={handleClick}>X</button>
                  </div>
                </li>
              );
            })}
            {state.products.length == 0 && <h4>No Hay Productos</h4>}
            <Link onClick={() => setModelIsOpen(false)} to={"/checkout"}>
              Checkout
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};
