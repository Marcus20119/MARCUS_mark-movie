import { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'swiper/css';
import 'swiper/css/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Fragment>
    <App />
  </Fragment>
);
