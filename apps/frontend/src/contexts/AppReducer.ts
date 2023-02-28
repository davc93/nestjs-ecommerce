import { CartItem } from "../models/AppUser.model";

export const appReducerActions = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
};

export const appReducer = (
  state: any,
  action: { type: any; payload?: any }
) => {
  switch (action.type) {
    case appReducerActions.SET_USER:
      const { access_token, user } = action.payload;
      return {
        ...state,
        access_token,
        user: {
          ...user,
          id: user.id,
          email: user.email,
        },
      };

    case appReducerActions.LOGOUT:
      return {
        ...state,
        access_token: null,
        user: null,
      };
    case appReducerActions.ADD_ITEM:
      const productToAdd = action.payload;
      
      const existingItemIndex = state.items.findIndex(
        (item:CartItem) => item.product.id === productToAdd.id
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };

        return {
          ...state,
          items: [
            ...state.items.slice(0, existingItemIndex),
            updatedItem,
            ...state.items.slice(existingItemIndex + 1),
          ],
        };
      } else {
        const newItem: CartItem = { product: productToAdd, quantity: 1 };
        return { ...state, items: [...state.items, newItem] };
      }

    case appReducerActions.REMOVE_ITEM:
      const productToRemove = action.payload;
      const itemToRemoveIndex = state.items.findIndex(
        (item:CartItem) => item.product.id === productToRemove.id
      );
      if (itemToRemoveIndex !== -1) {
        const itemToRemove = state.items[itemToRemoveIndex];
        let updatedItems: CartItem[];

        if (itemToRemove.quantity > 1) {
          const updatedItem = {
            ...itemToRemove,
            quantity: itemToRemove.quantity - 1,
          };
          updatedItems = [
            ...state.items.slice(0, itemToRemoveIndex),
            updatedItem,
            ...state.items.slice(itemToRemoveIndex + 1),
          ];
        } else {
          updatedItems = [
            ...state.items.slice(0, itemToRemoveIndex),
            ...state.items.slice(itemToRemoveIndex + 1),
          ];
        }

        return { ...state, items: updatedItems };
      } else {
        return state;
      }
    default:
      return {
        ...state,
      };
  }
};
