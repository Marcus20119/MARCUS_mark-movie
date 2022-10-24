import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './layout/Home';
import Movies from './pages/Movies';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="tv-series" element={<div></div>} />
          <Route path="movies" element={<Movies />} />
          <Route path="anime" element={<div></div>} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
