import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

axios.interceptors.request.use(request => {
  console.log('[index.js] axios request interceptor called...');
  console.log(request);
  return request;
}, error => {
  console.log('[index.js] axios req interceptor, error...', error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log('[index.js] axios resp interceptor', response);
  return response;
}, error => {
  console.log('[index.js]', error);
  return Promise.reject(error);
})


ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
