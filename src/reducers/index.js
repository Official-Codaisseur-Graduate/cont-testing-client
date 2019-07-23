import { combineReducers } from 'redux';
import questions from './questions'
import dateRange from './dataByRangeReducer'

export default combineReducers({
  questions,
  dateRange
});