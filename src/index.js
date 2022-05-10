import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import './index.css';
import UserStore from './store/UserStore';

export const Context = createContext();

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        userStore: new UserStore(),
      }}
    >
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
