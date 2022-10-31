import { Fragment, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomeLayout = lazy(() => import('./layout/HomeLayout'));
const DetailLayout = lazy(() => import('./layout/DetailLayout'));
const CommunityPage = lazy(() => import('./pages/Community'));
const MoviesPage = lazy(() => import('./pages/Home/Movies'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const TVSeriesPage = lazy(() => import('./pages/Home/TVSeries'));
const DetailMoviePage = lazy(() => import('./pages/Detail/Movie'));
const DetailTVPage = lazy(() => import('./pages/Detail/TV'));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<HomeLayout />}>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route path="home/tv-series" element={<TVSeriesPage />} />
            <Route path="home/movies" element={<MoviesPage />} />
            <Route path="community" element={<CommunityPage />} />
          </Route>

          <Route path="/details" element={<DetailLayout />}>
            <Route path="movie/:id" element={<DetailMoviePage />} />
            <Route path="tv/:id" element={<DetailTVPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
