import { Reducer, createContext, useReducer } from "react";

export const appContext = createContext({});
const initialState = {
  access_token:null,
  user:{},
  products:[]
};

const appReducer = (
  state: any,
  action: { type: any; payload?: any }
) => {
  switch (action.type) {

    case "SET_USER":
      const {access_token,user} = action.payload
      return {
        ...state,
        access_token,
        user:{
          ...user,
          id:user.id,
          email:user.email,

        }
      }
    
    case "LOGOUT":
      return{
        ...state,
        access_token:null,
        user:{}
      } 
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

export const AppContext = ({ children }: any) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <appContext.Provider value={[state, dispatch]}>
      {children}
    </appContext.Provider>
  );
};
