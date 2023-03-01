import { Dispatch, Reducer, createContext, useReducer } from "react";
import { cartReducer } from "./cartReducer";
import { Cart } from "../models/App.model";
import { Product } from "../models/api/product.model";

const initialState: Cart = {
  items: [],
};

export const cartContext = createContext<[Cart,Dispatch<{type:any; payload?:Product}>]>([initialState,()=>{}]);

export const CartContext = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <cartContext.Provider value={[state, dispatch]}>
      {children}
    </cartContext.Provider>
  );
};
