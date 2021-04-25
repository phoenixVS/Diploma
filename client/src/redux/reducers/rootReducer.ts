import { combineReducers } from 'redux'
import { users, IUsers } from './usersReducer'

export interface IRootState {
  users: IUsers
}

export const rootReducer = combineReducers({
  users,
})
