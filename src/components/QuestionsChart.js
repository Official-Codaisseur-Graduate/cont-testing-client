import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
//Importing the baseUrl
import { connect } from 'react-redux'
import { getQuestionsData } from './../actions/actions'

class QuestionsChart extends Component {

  componentDidMount() {
    this.props.getQuestionsData('today');
    // makes another request to the server every 10 seconds
  //  setInterval(this.getQuestionsData, 10000)

  }

  render() {
    if(!this.props.questionsChartData) return 'Loading...'

    return (
      <div>
        <HorizontalBar
          data={this.props.questionsChartData}
          width={500}
          height={500}
          options={{
            title: {
              display: true,
              text: ['No. of students', 'passing each question'],
              fontSize: 20
            },
            legend: {
              display: false,
              position: 'bottom',
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  const dataItem = data.datasets[tooltipItem.datasetIndex].label[tooltipItem.index].split(':')[0].split(']')[1] || '';
                  return dataItem;
                }
              }
            },
            maintainAspectRatio: true,
            scales: {
              xAxes: [{
                scaleLabel: {
                  fontSize: 20,
                  display: true,
                  labelString: 'Number of students'
                },
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
              yAxes: [{
                scaleLabel: {
                  fontSize: 20,
                  display: true,
                  labelString: 'Question key'
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
    questionsChartData: state.questionsChart
  }
};

export default connect(mapStateToProps, {getQuestionsData})(QuestionsChart)