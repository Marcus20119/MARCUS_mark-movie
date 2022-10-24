import { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Fragment>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Fragment>
);
