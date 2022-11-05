import { Fragment, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomeLayout = lazy(() => import('./layout/HomeLayout'));
const SubLayout = lazy(() => import('./layout/SubLayout'));
const CommunityPage = lazy(() => import('./pages/Community'));
const MoviesPage = lazy(() => import('./pages/Home/Movies'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const TVSeriesPage = lazy(() => import('./pages/Home/TVSeries'));
const MovieDetailPage = lazy(() => import('./pages/Movie/Detail'));
const TVDetailPage = lazy(() => import('./pages/TV/Detail'));
const CelebDetailPage = lazy(() => import('./pages/Celeb/Detail'));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<HomeLayout />}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomeLayout />}>
            <Route path="home/tv-series" element={<TVSeriesPage />} />
            <Route path="home/movies" element={<MoviesPage />} />
            <Route path="community" element={<CommunityPage />} />
          </Route>

          {/* Detail */}
          <Route path="/movie" element={<SubLayout />}>
            <Route path="details/:id" element={<MovieDetailPage />} />
            {/* <Route path="general" element={<TVDetailPage />} /> */}
          </Route>
          <Route path="/tv" element={<SubLayout />}>
            <Route path="details/:id" element={<TVDetailPage />} />
            {/* <Route path="general" element={<MovieDetailPage />} /> */}
          </Route>

          {/* Celeb detail */}
          <Route path="/person" element={<SubLayout />}>
            <Route path="details/:id" element={<CelebDetailPage />} />
            {/* <Route path="general" element={<TVDetailPage />} /> */}
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
