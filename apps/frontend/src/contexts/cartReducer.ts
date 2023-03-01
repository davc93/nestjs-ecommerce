import { type Cart, type Item } from '../models/App.model'
import { type Product } from '../models/api/product.model'

export const cartReducerActions = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM'
}

export const cartReducer = (
  state: Cart,
  action: { type: string, payload?: Product }
) => {
  switch (action.type) {
    case cartReducerActions.ADD_ITEM:
      const productToAdd = action.payload as Product

      const existingItemIndex = state.items.findIndex(
        (item: Item) => item.product.id === productToAdd.id
      )

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex]
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1
        }

        return {
          ...state,
          items: [
            ...state.items.slice(0, existingItemIndex),
            updatedItem,
            ...state.items.slice(existingItemIndex + 1)
          ]
        }
      } else {
        const newItem: Item = { product: productToAdd, quantity: 1 }
        return { ...state, items: [...state.items, newItem] }
      }

    case cartReducerActions.REMOVE_ITEM:
      const productToRemove = action.payload as Product
      const itemToRemoveIndex = state.items.findIndex(
        (item: Item) => item.product.id === productToRemove.id
      )
      if (itemToRemoveIndex !== -1) {
        const itemToRemove = state.items[itemToRemoveIndex]
        let updatedItems: Item[]

        if (itemToRemove.quantity > 1) {
          const updatedItem = {
            ...itemToRemove,
            quantity: itemToRemove.quantity - 1
          }
          updatedItems = [
            ...state.items.slice(0, itemToRemoveIndex),
            updatedItem,
            ...state.items.slice(itemToRemoveIndex + 1)
          ]
        } else {
          updatedItems = [
            ...state.items.slice(0, itemToRemoveIndex),
            ...state.items.slice(itemToRemoveIndex + 1)
          ]
        }

        return { ...state, items: updatedItems }
      } else {
        return state
      }
    default:
      return {
        ...state
      }
  }
}
