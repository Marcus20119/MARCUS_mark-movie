import { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App';
import AuthProvider from './contexts/authContext';

import 'swiper/css';
import 'swiper/css/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';
import UserProvider from './contexts/userContext';
import './scss/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Fragment>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  </Fragment>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
