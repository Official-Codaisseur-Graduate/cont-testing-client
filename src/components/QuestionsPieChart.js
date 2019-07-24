import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux'
import {getQuestionsStudentsData} from './../actions/actions'


class QuestionsPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data:{}
    }
  }

  componentDidMount() {
    this.props.getQuestionsStudentsData('today')
     //makes another request to the server every 10 seconds
    // setInterval(this.getQuestionsStudantsData, 10000)

  }
  render() {
    return (
      <div>
        <Pie
          type='pie'
          data={this.props.questStudentChart}
          height={300}
          width={300}
          options={{
            plugins: {
              labels: {
                render: () => {}
              }
            },
            title: {
              display: true,
              text: ['% of questions', 'passed by students'],
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'bottom',
            },
            
            tooltips: {
                callbacks: {
                label: function(tootipItem, data) {
                  const dataItem = data.datasets[tootipItem.datasetIndex].data[tootipItem.index] || '';
                  return `${Math.round(dataItem)} %`;
                }
              } 

            },
            maintainAspectRatio: false,
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
    questStudentChart: state.questStudentChart
  }
};

export default connect(mapStateToProps, {getQuestionsStudentsData})(QuestionsPieChart)