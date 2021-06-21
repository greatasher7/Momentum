import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import userStore from "./Store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react"; 

let persistor = persistStore(userStore);

ReactDOM.render(
  <Provider store={userStore}>
    <PersistGate loading={null} persistor={persistor} >
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
