import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import NewsStore from './store/NewsStore';
import UserStore from './store/UserStore';

export const Context = createContext();

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        newsStore: new NewsStore(),
        userStore: new UserStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
