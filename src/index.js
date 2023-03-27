import React from 'react';
//import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import Student from './Components/student';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
//import $ from 'jquery';
//import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import {BrowserRouter} from "react-router-dom"
//const root = ReactDOM.createRoot(document.getElementById('root'));
/**root.render(
  <React.StrictMode>
     <Student 
  name="Inggar" 
  age="450 tahun"
  description="inggar hobi sunmori"/>
  <Student 
  name="Meti" 
  age="1000 tahun"
  description="Meti Hobi Mengaji"/>
    <Student 
  name="Keysa" 
  age="2500 tahun"
  description="Hobi Mbandit"/>
    <Student 
  name="Rafli" 
  age="721 tahun"
  description="Fans MU"/>
  </React.StrictMode>
 
//);*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
