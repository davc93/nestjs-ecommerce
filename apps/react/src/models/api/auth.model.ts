import { type User } from './user.model'

export interface Auth {
  user: Partial<User>
  access_token?: string

}
