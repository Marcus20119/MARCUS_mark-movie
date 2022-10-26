import { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Fragment>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Fragment>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
