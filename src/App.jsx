import { Fragment, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { Routes, Route } from 'react-router-loading';
import MainLayout from './layout/MainLayout';

// import CommunityPage from './pages/Community';
// import MoviesPage from './pages/Home/Movies';
// import NotFoundPage from './pages/NotFound';
// import TVSeriesPage from './pages/Home/TVSeries';

const CommunityPage = lazy(() => import('./pages/Community'));
const MoviesPage = lazy(() => import('./pages/Home/Movies'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const TVSeriesPage = lazy(() => import('./pages/Home/TVSeries'));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<MainLayout />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="home/tv-series" element={<TVSeriesPage />} />
            <Route path="home/movies" element={<MoviesPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
