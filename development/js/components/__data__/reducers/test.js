import _ from 'lodash'
import * as types from '../action-types'

let responce = {}

export default (state = {}, action) => {
    switch (action.type) {
        case types.LOGOUT: {
            return {}
        }
        case types.SIGNIN: {
            responce = action.res
            return _.merge({}, state, responce.data.email ? responce.data : {})
        }
        case types.USER_FETCH: {
            responce = action.res
            return _.merge({}, state, responce.data.email ? responce.data : {})
        }
        default: return state
    }
}