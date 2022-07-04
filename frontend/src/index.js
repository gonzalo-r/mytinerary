import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import {configureStore as createStore} from "@reduxjs/toolkit";
//import {applyMiddleware} from "redux";
import { Provider } from "react-redux" ;
//import thunk from "redux-thunk";
import mainReducer from "./redux/reducers/mainReducer"
//const root = ReactDOM.createRoot(document.getElementById('root'));
const reduxstore = createStore({reducer:mainReducer})
 //creo un store y va a hacer uso a traves de main reducer todos los reducers y
//va a hacer uso del middlewre thunk --->nos va a permitir almacenar funciones y ejecutarlas de manera asincronas

const root= ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  // provider tiene como props el store y envuelve App convirtiendoce en el padre de todo
  <Provider store={reduxstore}> 
    <App />
  </Provider>
  );


