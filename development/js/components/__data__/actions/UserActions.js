import * as types from '../action-types';
import axios from 'axios'

export function fetch() {
  return {
    type: types.TEST,
    promise: axios.get('/api/authuser')
  }
}

// export function logout(email, password) {
//   return {
//     type: types.LOGOUT,
//     promise: axios.get('/api/logout')
//   }
// }
