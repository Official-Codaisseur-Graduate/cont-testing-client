import { ADD_VERSIONS } from '../actions/actions'

const initialState = null

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_VERSIONS:
      return payload
    default:
      return state
  }
}

export default reducer