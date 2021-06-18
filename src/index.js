import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import userStore from "./Store";

ReactDOM.render(
  <Provider store={userStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
