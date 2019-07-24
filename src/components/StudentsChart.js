import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux'
import {getStudentsData} from './../actions/actions'

class StudentsChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Data: {}
    }
  }


  componentDidMount() {
    this.props.getStudentsData('today')
    //makes another request to the server every 30 seconds
    // setInterval(this.getStudentsData, 10000)
   }

  render() {
    return (
      <div>
        <Bar
          data={this.props.passedQuestionsStudent}
          width={500}
          height={500}
          options={{
            title: {
              display: true,
              text: ['No. of passed', 'questions by student'],
              fontSize: 20
            },
            legend: {
              display: false,
              position: 'bottom',
            },
            maintainAspectRatio: true,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  userCallback: function (label, index, labels) {
                    // when the floored value is the same as the value we have a whole number
                    if (Math.floor(label) === label) {
                      return label;
                    }
                  },
                }
              }],
              xAxes: [{
                scaleLabel: {
                  fontSize: 20,
                  display: true,
                  labelString: 'Student name'
                }
              }],
            },
            layout: {
              padding: {
                top: 0,
                bottom: 0,
                right: 0,
                left: 50
              },
              margin: {
                bottom: 100
              }
            }
          }} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dateRange: state.dateRange,
    passedQuestionsStudent: state.passedQuestionsStudent
  }
};

export default connect(mapStateToProps, { getStudentsData })(StudentsChart)