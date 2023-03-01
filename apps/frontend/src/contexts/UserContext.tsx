import { type Dispatch, Reducer, createContext, useReducer } from 'react'
import { userReducer } from './userReducer'
import { User } from '../models/api/user.model'
import { type AppUser } from '../models/App.model'

const initialState: AppUser = {
  user: null
}
export const userContext = createContext<[AppUser, Dispatch<{ type: string, payload?: AppUser }>]>([initialState, () => {}])

// export const userContext = createContext<AppUser | Dispatch<{type:any; payload?:AppUser}>[]>([initialState,()=>{}]);

export const UserContext = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(userReducer, initialState)
  return (
    <userContext.Provider value={[state, dispatch]}>
      {children}
    </userContext.Provider>
  )
}
