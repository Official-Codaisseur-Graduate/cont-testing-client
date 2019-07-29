import { SET_QUEST_STDS_DATA } from '../actions/actions'

const initialState = null

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_QUEST_STDS_DATA:
      return payload
    default:
      return state
  }
}

export default reducer