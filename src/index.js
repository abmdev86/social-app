import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import { App, serviceWorker } from './app';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import reportWebVitals from './reportWebVitals';


var firebaseConfig = {
  apiKey: "AIzaSyCYhWFDUkhRIRTgWxO2KwRbbpPBXWK2bXI",
  authDomain: "socialgamer-ca109.firebaseapp.com",
  databaseURL: "https://socialgamer-ca109.firebaseio.com",
  projectId: "socialgamer-ca109",
  storageBucket: "socialgamer-ca109.appspot.com",
  messagingSenderId: "871925029599",
  appId: "1:871925029599:web:088be468a4802071e9a76a",
  measurementId: "G-C0R9T9QH7F"
};
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.unregister();