import request from 'axios'
import setting from '../settings'

export const SET_DATA = 'SET_DATA'

const { baseUrl } = setting

export const setDate = (data) => ({
  type: SET_DATA,
  payload: data
})

// export const addData = (range) => (dispatch) => {
//   console.log('range in actions!!', range)
//   request
//     .get(`${baseUrl}/evaluations-by-date/${range}`)
//     .then( res => {
//       dispatch(setDate(res.data))
//       }
//     )
//     .catch(console.error )
// }
