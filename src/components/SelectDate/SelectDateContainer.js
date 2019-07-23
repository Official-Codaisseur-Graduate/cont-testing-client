import React, { Component } from 'react'
import './SelectDate.css'
import { setDate } from './../../actions/actions'
import { connect } from 'react-redux'

class SelectDateContainer extends Component {
  state = {
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
    console.log(this.state)

    this.props.setDate(event.target.value)

  }

  handleSubmit = () => {

  }

  render() {

    return (
      <div>
        <select className="select-css" name="" id="selectDate" onChange={this.handleChange}>
        <option value="">Select range of Data</option>
          <option value="today">Today</option>
          <option value="lastWeek">Last week</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastYear">Last Year</option>
        </select>
      </div>
    )
  }
}

export default connect(null, { setDate })(SelectDateContainer)