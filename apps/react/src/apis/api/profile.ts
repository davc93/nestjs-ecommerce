import { config } from '../../config'
import { type Auth } from '../../models/api/auth.model'
import { type User } from '../../models/api/user.model'

export const getProfile = async (auth: Auth): Promise<Partial<User>>  => {
  const response = await fetch(`${config.apiUrl}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.access_token}`
    }
  })
  const profile = await response.json()
  return profile
}

export const updateProfile = async (auth: Auth, changes: Partial<User>) => {
  const response = await fetch(`${config.apiUrl}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.access_token}`
    },
    body: JSON.stringify({
      ...changes
    })
  })
  const profile = await response.json()
  return profile
}

export const deleteProfile = async (auth: Auth) => {
  const rta = await fetch(`${config.apiUrl}/profile`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.access_token}`
    }
  })
  const response = await rta.json()
  return response
}

export const getProfileOrders =async () => {
  
}

export const getProfileSingleOrder = async () => {
  
}
