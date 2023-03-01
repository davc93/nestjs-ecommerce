import {AppUser} from '../models/App.model'
export const userReducerActions = {
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
};

export const userReducer = (
  state: AppUser,
  action: { type: any; payload?: AppUser }
) => {
  switch (action.type) {
    case userReducerActions.SET_USER:
      const {  user } = action.payload as AppUser
      return {
        user: {
          ...state.user,
          id: user?.id,
          email: user?.email,
        },
      };

    case userReducerActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return {
        ...state,
      };
  }
};
