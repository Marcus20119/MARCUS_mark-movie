import { Fragment, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomeLayout from './layout/HomeLayout';
import NotFoundPage from './pages/NotFoundPage';
import SorryPage from './pages/SorryPage';
import LoadingPage from './pages/LoadingPage';

// const CommunityPage = lazy(() => import('./pages/Community'));
const MoviesHomePage = lazy(() => import('./pages/Movie/MoviesHomePage'));
const TVSeriesHomePage = lazy(() => import('./pages/TV/TVSeriesHomePage'));
const DiscoverPage = lazy(() => import('./pages/Discover/DiscoverPage'));

const MovieDetailPage = lazy(() => import('./pages/Movie/MovieDetailPage'));
const MovieTypePage = lazy(() => import('./pages/Movie/MovieTypePage'));
const MovieSearchPage = lazy(() => import('./pages/Movie/MovieSearchPage'));
const TVDetailPage = lazy(() => import('./pages/TV/TVDetailPage'));
const TVTypePage = lazy(() => import('./pages/TV/TVTypePage'));
const TVSearchPage = lazy(() => import('./pages/TV/TVSearchPage'));

const CelebDetailPage = lazy(() => import('./pages/Celeb/Detail'));

const TestPage = lazy(() => import('./pages/TestPage'));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/home" element={<HomeLayout />}>
            <Route path="tv-series" element={<TVSeriesHomePage />} />
            <Route path="movies" element={<MoviesHomePage />} />
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Navigate replace to="/home/movies" />} />
            <Route path="discover" element={<DiscoverPage />} />
            <Route path="person/details/:id" element={<CelebDetailPage />} />

            <Route path="/movie">
              <Route path="details/:id" element={<MovieDetailPage />} />
              <Route path=":type" element={<MovieTypePage />} />
              <Route path="search" element={<MovieSearchPage />} />
            </Route>
            <Route path="/tv">
              <Route path="details/:id" element={<TVDetailPage />} />
              <Route path=":type" element={<TVTypePage />} />
              <Route path="search" element={<TVSearchPage />} />
            </Route>
          </Route>

          <Route path="settings" element={<SorryPage />} />
          <Route path="log" element={<SorryPage />} />
          <Route path="test" element={<TestPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
