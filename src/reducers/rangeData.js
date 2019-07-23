import {SET_DATA} from '../actions/actions'

const initialState = 'allData'

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_DATA:
      return payload
    default:
      return state
  }
}

export default reducer