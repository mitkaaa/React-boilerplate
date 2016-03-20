// import _ from 'lodash'
import * as types from '../action-types'

export default (state, action) => {
    switch (action.type) {
        case types.TEST: {
            return {}
        }
        default: return state
    }
}
