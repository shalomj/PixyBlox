import React from 'react';
import ReactDOM from 'react-dom';
import './assets/fonts/Montserrat-Regular.ttf';
import 'cropperjs/dist/cropper.css';
import './assets/styles/main.scss';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);