import { combineReducers } from 'redux';
import questions from './questions'
import dateRange from './rangeData'
import questionsChart from './questionsChartReducer'

export default combineReducers({
  questions,
  dateRange,
  questionsChart
});