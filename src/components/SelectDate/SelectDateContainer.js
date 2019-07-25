import React, { Component } from 'react'
import './SelectDate.css'
import { setDate, getQuestionsData, getQuestionsStudentsData, getStudentsData, getStudentsStackData, getExercisesVersions } from './../../actions/actions'
import { connect } from 'react-redux'

class SelectDateContainer extends Component {
  state = {
    range: 'today',
    version: 'allVersions'
  }

  handleChange = (event) => {
    console.log('event version', event.target.value)

    this.setState({range: event.target.value})

    if(event.target.value !== 'none') {
      this.props.setDate(event.target.value)

      this.props.getQuestionsData(event.target.value);
      this.props.getQuestionsStudentsData(event.target.value)
      this.props.getStudentsData(event.target.value)
      this.props.getStudentsStackData(event.target.value)
    }

}

  handleVersion = (event) => {
    console.log('event version', event.target.value)
    this.setState({version: event.target.value})
  }

  componentDidMount = () => {
    this.props.getExercisesVersions()
  }

  render() {
    if(!this.props.packageVersions) return 'Loading...'

    return (
      <div>
        <select className="select-css" id="selectDate" onChange={this.handleChange} name="range">
          <option value="none">Select range of Data</option>
          <option value="today">Today</option>
          <option value="lastWeek">Last week</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastYear">Last Year</option>
          <option value="allData">All Data</option>
        </select>
        
        <select className="select-css sel-version" id="" onChange={this.handleVersion} name="version">
          <option value="allVersions">All Versions</option>
          {
            this.props.packageVersions.map((v, i) => {
             return <option key={i} value={v}>{v}</option>
            })
          }
        </select>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dateRange: state.dateRange,
    questionsChart: state.questionsChart,
    packageVersions: state.packageVersions
  }
};


export default connect(mapStateToProps, { 
  setDate, 
  getQuestionsData, 
  getQuestionsStudentsData, 
  getStudentsData, 
  getStudentsStackData,
  getExercisesVersions })(SelectDateContainer)