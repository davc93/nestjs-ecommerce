import { type AppUser } from '../models/App.model'
export const userReducerActions = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT'
}

export const userReducer = (
  state: AppUser,
  action: { type: string, payload?: AppUser }
) => {
  switch (action.type) {
    case userReducerActions.SET_USER:
      const { user } = action.payload as AppUser
      console.log(user)
      return {
        ...state,
        user: {
          ...state.user,
          id: user?.id,
          email: user?.email
        }
      }

    case userReducerActions.LOGOUT:
      return {
        ...state,
        user: null
      }

    default:
      return {
        ...state
      }
  }
}
