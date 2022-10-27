import { Fragment, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeLayout from './layout/HomeLayout';

const CommunityPage = lazy(() => import('./pages/Community'));
const MoviesPage = lazy(() => import('./pages/Home/Movies'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const TVSeriesPage = lazy(() => import('./pages/Home/TVSeries'));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<HomeLayout />}>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
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
