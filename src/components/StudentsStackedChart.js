import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { getStudentsStackData } from './../actions/actions'
import { connect } from 'react-redux'


class StudentsStackedChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {}
    }
  }

  componentDidMount() {
    this.props.getStudentsStackData('today')
    //makes another request to the server every 10 seconds
    // setInterval(this.getStudentsData, 10000)
  }
  
  render() {
    return (
      <div>
        <Bar
          data={this.props.stackData}
          width={500}
          height={500}
          options={{
            plugins: false,
            title: {
              display: true,
              text: ['No. of passed and failed', 'questions by student'],
              fontSize: 20
            },
            legend: {
              display: false,
              position: 'bottom',
            },
            maintainAspectRatio: true,
            scales: {
              yAxes: [{
                stacked: true,
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
                stacked: true,
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
    stackData: state.stackData
  }
};

export default connect(mapStateToProps, {getStudentsStackData})(StudentsStackedChart)