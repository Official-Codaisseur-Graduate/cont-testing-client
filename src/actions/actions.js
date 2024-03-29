import setting from '../settings'
import axios from 'axios'

export const SET_DATA = 'SET_DATA'
export const SET_QUESTCHART_DATA = 'SET_QUESTCHART_DATA'
export const SET_QUEST_STD_DATA = 'SET_QUEST_STD_DATA'
export const SET_QUEST_STDS_DATA = 'SET_QUEST_STDS_DATA'
export const SET_STACK_DATA = 'SET_STACK_DATA'
export const ADD_VERSIONS = 'ADD_VERSIONS'

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

const setQuest_StudentS_Data = (data) => ({
  type: SET_QUEST_STDS_DATA,
  payload: data
})

const setQuest_STACK_Data = (data) => ({
  type: SET_STACK_DATA,
  payload: data
})

const addVersion = (data) => {
  return {
    type: ADD_VERSIONS,
    payload: data
  }
}

export const getQuestionsData = (range, version) => (dispatch) => {
  return (
    axios.get(`${baseUrl}/evaluations-by-question/?range=${range}&version=${version}`)
      .then(res => {
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
      const Data = {
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

export const getQuestionsStudentsData = (range, version) => (dispatch) => {

  axios.get(`${baseUrl}/evaluations-by-question-student/?range=${range}&version=${version}`)
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

export const getStudentsData = (range, version) => (dispatch) => {
  return axios.get(`${baseUrl}/evaluations-by-student/?range=${range}&version=${version}`)
    .then(res => {
      const evaluations = res.data.passedPerStudent;
      let studentName = [];
      let questionsPassed = [];
      evaluations.map(element => {
        studentName.push(element.studentName);
        questionsPassed.push(element.questionsPassed);
        return null
      });

      const Data = {
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
      
      dispatch(setQuest_StudentS_Data(Data))

    })
}

export const getStudentsStackData = (range, version) => (dispatch) => {

  return axios.get(`${baseUrl}/stack-evaluations-by-student/?range=${range}&version=${version}`)
    .then(res => {
      const evaluations = res.data.attemptedPerStudent;
      let studentName = [];
      let questionsPassed = [];
      let questionsFailed = [];

      evaluations.map(element => {
        studentName.push(element.studentName);
        questionsPassed.push(element.questionsPassed);
        questionsFailed.push(element.questionsFailed)
        return null
      });

      const Data= {
          labels: studentName,
          datasets: [
            {
              label: 'Passed questions',
              data: questionsPassed,
              backgroundColor: 'rgba(90,178,255,0.6)'
            },
            {
              label: 'Failed questions',
              data: questionsFailed,
              backgroundColor: 'rgba(240,134,67,0.6)'
            }
          ]
        }

      dispatch(setQuest_STACK_Data(Data))
    })
}

export const getExercisesVersions = () => (dispatch) => {
  return axios.get(`${baseUrl}/exercises/versions`)
    .then(res => {
      console.log('packageVesions!!!!!',res)
      dispatch(addVersion(res.data))
    })
    .catch(console.error)
} 