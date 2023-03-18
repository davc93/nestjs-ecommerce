import { config } from '../../config'
import { type Auth } from '../../models/api/auth.model'
import { type User } from '../../models/api/user.model'

const login = async (user: Partial<User>): Promise<Auth | { error: string, message: string[] }> => {
  const response = await fetch(`${config.apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  })
  const data = await response.json()
  
  if (data.message) {
    throw new Error(data.message as string)
  }

  return data
}

const signUp = async (user: Partial<User>) => {
  
  const response = await fetch(`${config.apiUrl}/users`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      role: 'customer'
    })
  })
  const data = await response.json()
  if (data.message) {

    throw new Error(data.message)
  }

  return data
}

export const auth = {
  login,
  signUp
}
