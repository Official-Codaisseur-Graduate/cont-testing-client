import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import axios from 'axios';
//Importing the baseUrl
import setting from '../settings'

const { baseUrl } = setting

export default class QuestionsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {}
    }
  }

  getQuestionsData = () => {
     return axios.get(`${baseUrl}/evaluations-by-question`)
     .then(res => {
      // console.log('questions response', res)
       const evaluations = res.data.passedPerQuestion;
      // console.log('questions evaluations:', evaluations)
       let questionKey = [];        
       let studentsPassed = [];
       let questionLabel = [];
       evaluations.map(element => {
         questionKey.push(element.questionKey[1]);
         studentsPassed.push(element.studentsPassed);
         questionLabel.push(element.questionKey)
         
         return null
       });
        this.setState({
          Data: {
            labels: questionKey,
            datasets: [
              {
                label: questionLabel,
                data: studentsPassed,
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
    this.getQuestionsData()
    //makes another request to the server every 10 seconds
    setInterval(this.getQuestionsData, 10000)
  }

  render() {
    return (
      <div>
        <HorizontalBar
          data={this.state.Data}
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
