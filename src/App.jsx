import { Fragment, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomeLayout from './layout/HomeLayout';
import NotFoundPage from './pages/NotFoundPage';
import SorryPage from './pages/SorryPage';
import LoadingPage from './pages/LoadingPage';

const MoviesHomePage = lazy(() => import('./pages/Movie/MoviesHomePage'));
const TVSeriesHomePage = lazy(() => import('./pages/TV/TVSeriesHomePage'));
const CommunityPage = lazy(() => import('./pages/Community/CommunityPage'));
const DiscoverPage = lazy(() => import('./pages/Discover/DiscoverPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const WatchlistPage = lazy(() => import('./pages/Watchlist/WatchlistPage'));
const RecentPage = lazy(() => import('./pages/Recent/RecentPage'));
const UserInfoPage = lazy(() => import('./pages/User/UserInfoPage'));

const PersonDetailPage = lazy(() => import('./pages/Person/PersonDetailPage'));
const PersonTypePage = lazy(() => import('./pages/Person/PersonTypePage'));
const PersonSearchPage = lazy(() => import('./pages/Person/PersonSearchPage'));

const MovieDetailPage = lazy(() => import('./pages/Movie/MovieDetailPage'));
const MovieWatchPage = lazy(() => import('./pages/Movie/MovieWatchPage'));
const MovieTypePage = lazy(() => import('./pages/Movie/MovieTypePage'));
const MovieSearchPage = lazy(() => import('./pages/Movie/MovieSearchPage'));

const TVDetailPage = lazy(() => import('./pages/TV/TVDetailPage'));
const TVWatchPage = lazy(() => import('./pages/TV/TVWatchPage'));
const TVTypePage = lazy(() => import('./pages/TV/TVTypePage'));
const TVSearchPage = lazy(() => import('./pages/TV/TVSearchPage'));

const TestPage = lazy(() => import('./pages/TestPage'));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/home" element={<HomeLayout />}>
            <Route path="" element={<Navigate replace to="/home/movies" />} />
            <Route path="tv-series" element={<TVSeriesHomePage />} />
            <Route path="movies" element={<MoviesHomePage />} />
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Navigate replace to="/home/movies" />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="discover" element={<DiscoverPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
            <Route path="recent" element={<RecentPage />} />
            <Route path="user" element={<UserInfoPage />} />

            <Route path="/person">
              <Route path="details/:id" element={<PersonDetailPage />} />
              <Route path=":type" element={<PersonTypePage />} />
              <Route path="search" element={<PersonSearchPage />} />
            </Route>
            <Route path="person/details/:id" element={<PersonDetailPage />} />

            <Route path="/movie">
              <Route path="details/:id" element={<MovieDetailPage />} />
              <Route path="watch/:id" element={<MovieWatchPage />} />
              <Route path=":type" element={<MovieTypePage />} />
              <Route path="search" element={<MovieSearchPage />} />
            </Route>
            <Route path="/tv">
              <Route path="details/:id" element={<TVDetailPage />} />
              <Route path="watch/:id" element={<TVWatchPage />} />
              <Route path=":type" element={<TVTypePage />} />
              <Route path="search" element={<TVSearchPage />} />
            </Route>

            <Route path="test" element={<TestPage />} />
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
