import React, { Component } from 'react'
import './SelectDate.css'
import { setDate, getQuestionsData, getQuestionsStudentsData, getStudentsData, getStudentsStackData } from './../../actions/actions'
import { connect } from 'react-redux'

class SelectDateContainer extends Component {
  state = {
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })

    this.props.setDate(event.target.value)
    this.props.getQuestionsData(event.target.value);
    this.props.getQuestionsStudentsData(event.target.value)
    this.props.getStudentsData(event.target.value)
    this.props.getStudentsStackData(event.target.value)
}

  handleSubmit = () => {

  }

  render() {

    return (
      <div>
        <select className="select-css" name="" id="selectDate" onChange={this.handleChange}>
          <option>Select range of Data</option>
          <option value="today">Today</option>
          <option value="lastWeek">Last week</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastYear">Last Year</option>
          <option value="allData">All Data</option>
        </select>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dateRange: state.dateRange,
    questionsChart: state.questionsChart
  }
};


export default connect(mapStateToProps, { setDate, getQuestionsData, getQuestionsStudentsData, getStudentsData, getStudentsStackData })(SelectDateContainer)