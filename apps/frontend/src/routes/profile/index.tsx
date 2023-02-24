import React, { useContext, useReducer } from 'react'
import { appContext } from '../../contexts/AppContext'

export const ProfilePage = () => {

  const [state,dispatch]: any = useContext(appContext)
  return (
    <main>
      <div>
        <h2>Your Info</h2>

        <h3>{state.user.email}</h3>
      </div>
      <div>
        <h2>Your Orders</h2>
      </div>

    </main>
  )
}
