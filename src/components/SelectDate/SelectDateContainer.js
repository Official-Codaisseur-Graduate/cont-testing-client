import React, { Component } from 'react'
import './SelectDate.css'
import { setDate, getQuestionsData, getQuestionsStudentsData, getStudentsData, getStudentsStackData, getExercisesVersions } from './../../actions/actions'
import { connect } from 'react-redux'

class SelectDateContainer extends Component {
  state = {
    range: 'today', //initial value
    version: 'data-transformations@1.0.0' //initial value
  }

  handleChange = (event) => {
    const { value } = event.target
    
    this.setState({range: value})

    if(value !== 'none') {
      const { 
        setDate, getQuestionsData, getQuestionsStudentsData, 
        getStudentsData, getStudentsStackData
      } = this.props
      
      setDate(value)

      getQuestionsData(value, this.state.version);
      getQuestionsStudentsData(value, this.state.version)
      getStudentsData(value, this.state.version)
      getStudentsStackData(value, this.state.version)

    }
}

  handleVersion = (event) => {
    
    this.setState({version: event.target.value})
    
    this.props.getQuestionsData(this.state.range, event.target.value);
    this.props.getQuestionsStudentsData(this.state.range, event.target.value)
    this.props.getStudentsData(this.state.range, event.target.value)
    this.props.getStudentsStackData(this.state.range, event.target.value)

  }

  componentDidMount = () => {
    this.props.getExercisesVersions()
  }

  render() {
    if(!this.props.packageVersions) return 'Loading...'

    return (
      <div>
        <select className="select-css" id="selectDate" onChange={this.handleChange} name="range">
          <option value="today">Today</option>
          <option value="lastWeek">Last week</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastYear">Last Year</option>
          <option value="allData">All Data</option>
        </select>
        
        <select className="select-css sel-version" id="" onChange={this.handleVersion} name="version">
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