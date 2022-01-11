import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyAxMmjE6ESajGyEYc62DTHC0B4PKh0MYXk",
  authDomain: "mood-journal-info340.firebaseapp.com",
  projectId: "mood-journal-info340",
  storageBucket: "mood-journal-info340.appspot.com",
  messagingSenderId: "774547848870",
  appId: "1:774547848870:web:0fe37b3a92204fc3323e67",
  measurementId: "G-VH2ZMF75M2"
};

firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
