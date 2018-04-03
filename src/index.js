// This component handles the App template used on every page. React ecosystem
import React from 'react';
import {render} from 'react-dom';
import App from './components/App';

console.log("init !!!");

render(
  <App/>, 
  document.getElementById('app')
  );
