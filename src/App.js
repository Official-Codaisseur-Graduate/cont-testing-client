import React, { Component } from 'react';
import store from './store';
import { Provider } from 'react-redux';
// import { Route } from 'react-router-dom';
import './App.css';

import QuestionsChart from './components/QuestionsChart'
import StudentsChart from './components/StudentsChart'
import QuestionsPieChart from './components/QuestionsPieChart'
import StudentsStackedChart from './components/StudentsStackedChart'
import SelectDateContainer from './components/SelectDate/SelectDateContainer'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <br/>
        <br/>
        <h1>Student's Progress</h1>
        <br/>
        <SelectDateContainer />

        <br/>
        <div className="Charts">

          <div className='question'>
            <QuestionsChart />
          </div>

          <div className='student'>
            <StudentsChart />
          </div>

          <div className='question-pie'>
            <QuestionsPieChart />
          </div>

          <div className='student-stack'>
            <StudentsStackedChart/>
          </div>

        </div>
      </div>
      </Provider>
    );
  }
}

export default App;