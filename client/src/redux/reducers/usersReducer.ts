import { types } from '../types'

import { UsersWorkers } from '../actions/usersActions'
import { Nullable } from '@helpers/commonInterfaces/interfaces'

export interface IUser {
  firstName: string
  secondName: string
  email: string
  phone: string
}
export type IUsers = Nullable<IUser[]>
const initialState = null

export const users = (state = initialState, action: UsersWorkers): IUsers => {
  switch (action.type) {
    case types.SET_USERS:
      return action.payload
    default:
      return state
  }
}
