import setting from '../settings'
import axios from 'axios'

export const SET_DATA = 'SET_DATA'
export const SET_QUESTCHART_DATA = 'SET_QUESTCHART_DATA'
export const SET_QUEST_STD_DATA = 'SET_QUEST_STD_DATA'

const { baseUrl } = setting

export const setDate = (data) => ({
  type: SET_DATA,
  payload: data
})

export const setQuestionData = (data) => ({
  type: SET_QUESTCHART_DATA,
  payload: data
})

const setQuest_Student_Data = (data) => ({
  type: SET_QUEST_STD_DATA,
  payload: data
})

export const getQuestionsData = (range) => (dispatch) => {
  return (
    axios.get(`${baseUrl}/evaluations-by-question/${range}`)
     .then(res => {
       console.log('questions response', res)
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

    // setState({Data: Data})
    const  Data = {
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
    
    dispatch(setQuestionData(Data))   
       
   })
  )
}

export const getQuestionsStudentsData = (range) => (dispatch) => {

  range = range !== '' ? range : 'today'

  axios.get(`${baseUrl}/evaluations-by-question-student/${range}`)
  .then(res => {
    let questions = res.data.questions
    let students = res.data.students
    let totalPassed = res.data.questionsPassed
    let maxPassed = questions * students
    let totalFailed = maxPassed - totalPassed
    let pctQuestionsPassed = totalPassed / maxPassed * 100
    let pctQuestionsFailed = totalFailed / maxPassed * 100
    
    const Data = {
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

    dispatch(setQuest_Student_Data(Data))

  })
}
