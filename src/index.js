import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

//Heroku url: https://pacific-ocean-98186.herokuapp.com/ | https://git.heroku.com/pacific-ocean-98186.git