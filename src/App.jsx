import { Fragment, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomeLayout = lazy(() => import('./layout/HomeLayout'));
const SubLayout = lazy(() => import('./layout/SubLayout'));
// const CommunityPage = lazy(() => import('./pages/Community'));
const MoviesPage = lazy(() => import('./pages/Home/Movies'));
const TVSeriesPage = lazy(() => import('./pages/Home/TVSeries'));
const DiscoverPage = lazy(() => import('./pages/Discover'));
const MovieDetailPage = lazy(() => import('./pages/Movie/Detail'));
const TVDetailPage = lazy(() => import('./pages/TV/Detail'));
const CelebDetailPage = lazy(() => import('./pages/Celeb/Detail'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const SorryPage = lazy(() => import('./pages/Sorry'));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<HomeLayout />}>
        <Routes>
          <Route path="/">
            <Route path="" element={<HomeLayout />} />
            {/* Menu Tabs */}
            <Route path="home" element={<HomeLayout />}>
              <Route path="tv-series" element={<TVSeriesPage />} />
              <Route path="movies" element={<MoviesPage />} />
            </Route>
            <Route path="community" element={<SorryPage />} />
            <Route path="discover" element={<DiscoverPage />} />
            <Route path="awards" element={<SorryPage />} />
            <Route path="person" element={<SubLayout />}>
              <Route path="details/:id" element={<CelebDetailPage />} />
              <Route path="general" element={<div></div>} />
            </Route>

            {/* Library Tabs */}
            <Route path="recent" element={<SorryPage />} />
            <Route path="top-rated" element={<SorryPage />} />
            <Route path="downloaded" element={<SorryPage />} />

            {/* Catagories Tabs */}
            <Route path="movie" element={<SubLayout />}>
              <Route path="details/:id" element={<MovieDetailPage />} />
              <Route path="general" element={<div></div>} />
            </Route>
            <Route path="tv" element={<SubLayout />}>
              <Route path="details/:id" element={<TVDetailPage />} />
              <Route path="general" element={<div></div>} />
            </Route>

            {/* General Tabs */}
          </Route>
          <Route path="settings" element={<SorryPage />} />
          <Route path="log" element={<SorryPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
