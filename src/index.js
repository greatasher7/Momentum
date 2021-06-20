import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import userStore from "./Store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react"; 

const persistor = persistStore(userStore);

ReactDOM.render(
  <Provider store={userStore}>
    <PersistGate loading={null} persistor={persistor} >
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
