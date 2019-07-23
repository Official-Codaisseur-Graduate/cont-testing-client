import React, { Component } from 'react'
import './SelectDate.css'

export default class SelectDateContainer extends Component {
  render() {
    const currentDate = new Date()

    const lastWeek = new Date()

    lastWeek.setDate(lastWeek.getDate() - 7)

    console.log(currentDate)

    console.log(lastWeek)
    return (
      <div>
        <select className="select-css" name="" id="">
          <option value="7">Last week</option>
          <option value="30">Last Month</option>
          <option value="365">Last Year</option>
        </select>
      </div>
    )
  }
}

