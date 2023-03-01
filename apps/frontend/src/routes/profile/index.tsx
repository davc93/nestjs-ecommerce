import React, { useContext, useReducer } from 'react'
import { userContext } from '../../contexts/UserContext'

export const ProfilePage = () => {
  const [userState, userDispatch] = useContext(userContext)
  
  return (
    <main>
      <div>
        <h2>Your Info</h2>

        <h3>{userState.user?.email}</h3>
      </div>
      <div>
        <h2>Your Orders</h2>
      </div>

    </main>
  )
}
