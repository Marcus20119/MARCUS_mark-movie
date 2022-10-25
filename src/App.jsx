import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Community from './pages/Community';
import Movies from './pages/Movies';
import TVSeries from './pages/TVSeries';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="home/tv-series" element={<TVSeries />} />
          <Route path="home/movies" element={<Movies />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
