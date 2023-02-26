import { Reducer, createContext, useReducer } from "react";
import { appReducer } from "./AppReducer";

export const appContext = createContext({});
const initialState = {
  access_token:null,
  user:null,
  items:[]
};


export const AppContext = ({ children }: any) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <appContext.Provider value={[state, dispatch]}>
      {children}
    </appContext.Provider>
  );
};
