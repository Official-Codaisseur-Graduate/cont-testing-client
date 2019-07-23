import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
//Importing the baseUrl
import setting from '../settings'

const { baseUrl } = setting



class StudentsChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Data: {}
    }
  }

  getStudentsData = () => {
    return axios.get(`${baseUrl}/evaluations-by-student`)
      .then(res => {
        const evaluations = res.data.passedPerStudent;
        let studentName = [];
        let questionsPassed = [];
        evaluations.map(element => {
          studentName.push(element.studentName);
          questionsPassed.push(element.questionsPassed);
          return null
        });
        this.setState({
          Data: {
            labels: studentName,
            datasets: [
              {
                label: 'Passed questions',
                data: questionsPassed,
                backgroundColor:[
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
    this.getStudentsData()
    //makes another request to the server every 30 seconds
    setInterval(this.getStudentsData, 10000)
   }

  render() {
    return (
      <div>
        <Bar
          data={this.state.Data}
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

export default StudentsChart;
