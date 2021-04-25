import { types } from '../types'
import { InferType } from '../../helpers/commonInterfaces/interfaces'
import { IUser } from 'redux/reducers/usersReducer'

export const usersWorkers = {
  setAllUsers: (data: IUser[]) =>
    ({
      type: types.SET_USERS,
      payload: data,
    } as const),
}

export const usersWatchers = {
  getAllUsers: () =>
    ({
      type: types.FETCH_USERS,
    } as const),
}

export type UsersWorkers = ReturnType<InferType<typeof usersWorkers>>
export type UsersWatchers = ReturnType<InferType<typeof usersWatchers>>
