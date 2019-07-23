import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
//Importing the baseUrl
import setting from '../settings'

const { baseUrl } = setting



export default class QuestionsPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data:{}
    }
  }

  getQuestionsStudantsData = () => {
    axios.get(`${baseUrl}/evaluations-by-question-student`)
    .then(res => {
      let questions = res.data.questions
      let students = res.data.students
      let totalPassed = res.data.questionsPassed
      let maxPassed = questions * students
      let totalFailed = maxPassed - totalPassed
      let pctQuestionsPassed = totalPassed / maxPassed * 100
      let pctQuestionsFailed = totalFailed / maxPassed * 100
      
      this.setState({
        Data: {
          labels: ['Questions Passed', 'Questions Failed' ],
          datasets: [
            {
              data: [ pctQuestionsPassed, pctQuestionsFailed],
              backgroundColor: [
                'rgba(255,105,145,0.6)',
                'rgba(155,100,210,0.6)',
                'rgba(77, 228, 205, 0.6)',
                'rgba(90,178,255,0.6)',
                'rgba(240,134,67,0.6)',
                'rgba(213, 50, 80, 0.6)'
              ]
            }
          ]
        }
      });
    })
  }
  componentDidMount() {
    this.getQuestionsStudantsData()
     //makes another request to the server every 10 seconds
     setInterval(this.getQuestionsStudantsData, 10000)

  }
  render() {
    return (
      <div>
        <Pie
          type='pie'
          data={this.state.Data}
          height={350}
          width={350}
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
