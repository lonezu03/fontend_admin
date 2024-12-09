import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react';
import { Provider } from "react-redux";
import store from "./redux/store.jsx"; 
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
  </Provider>,
    </BrowserRouter>
  </React.StrictMode>
)
