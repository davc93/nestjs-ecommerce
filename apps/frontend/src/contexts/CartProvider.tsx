import { Reducer, createContext, useReducer } from "react";

export const cartContext = createContext({});
const initialState = {
  products:[]
};

const cartReducer = (
  state: any,
  action: { type: any; payload?: any }
) => {
  switch (action.type) {
    case "ADD_ITEM":
      const itemToAdd = action.payload;

      return {
        ...state,
        products:[
          ...state.products,
          itemToAdd
        ]
      };
    case "REMOVE_ITEM":
      const itemToRemove = action.payload
      const newProducts = state.products.filter((product:any)=> product.id !== itemToRemove.id)
      
      return {
        ...state,
        products: newProducts
      };
    default:
      return {
        ...state,
      };
  }
};

export const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <cartContext.Provider value={[state, dispatch]}>
      {children}
    </cartContext.Provider>
  );
};
