import { all } from 'redux-saga/effects'
import { userSagas } from './userSagas'

export const rootSaga = function* root(): Iterator<any> {
  yield all([...userSagas])
}
