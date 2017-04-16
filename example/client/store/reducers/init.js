import { Map } from 'immutable'
import * as types from '../action-types'

const initialState = new Map({
    isLoading: false,
    isDelayed: false,
    errors: null
})

export default (state = initialState, action) => {
    switch (action.type) {
        case types.TYPE:
            return state
                .set('isLoading', true)
                .set('errors', null)
                .set('isDelayed', false)
        default:
            return state
    }
}
