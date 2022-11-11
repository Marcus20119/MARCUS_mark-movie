import { Fragment, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const HomeLayout = lazy(() => import('./layout/HomeLayout'));
const SubLayout = lazy(() => import('./layout/SubLayout'));
const MovieGeneralLayout = lazy(() => import('./layout/MovieGeneralLayout'));
const TVGeneralLayout = lazy(() => import('./layout/TVGeneralLayout'));
// const CommunityPage = lazy(() => import('./pages/Community'));
const MoviesPage = lazy(() => import('./pages/Home/Movies'));
const TVSeriesPage = lazy(() => import('./pages/Home/TVSeries'));
const DiscoverPage = lazy(() => import('./pages/Discover'));
const MovieDetailPage = lazy(() => import('./pages/Movie/Detail'));
const MovieGeneralNowPlayingPage = lazy(() =>
  import('./pages/Movie/General/NowPlaying')
);
const MovieGeneralUpcomingPage = lazy(() =>
  import('./pages/Movie/General/Upcoming')
);
const MovieGeneralSearchPage = lazy(() =>
  import('./pages/Movie/General/Search')
);
const TVDetailPage = lazy(() => import('./pages/TV/Detail'));
const TVGeneralAiringTodayPage = lazy(() =>
  import('./pages/TV/General/AiringToday')
);
const TVGeneralOnTheAirPage = lazy(() => import('./pages/TV/General/OnTheAir'));
const TVGeneralSearchPage = lazy(() => import('./pages/TV/General/Search'));
const CelebDetailPage = lazy(() => import('./pages/Celeb/Detail'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const SorryPage = lazy(() => import('./pages/Sorry'));
const TestPage = lazy(() => import('./pages/Test'));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<HomeLayout />}>
        <Routes>
          <Route path="/">
            <Route path="" element={<Navigate replace to="/home/movies" />} />
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
            <Route path="movie">
              <Route path="details" element={<SubLayout />}>
                <Route path=":id" element={<MovieDetailPage />} />
              </Route>
              <Route path="general" element={<MovieGeneralLayout />}>
                <Route
                  path="now-playing"
                  element={<MovieGeneralNowPlayingPage />}
                ></Route>
                <Route
                  path="upcoming"
                  element={<MovieGeneralUpcomingPage />}
                ></Route>
                <Route
                  path="search"
                  element={<MovieGeneralSearchPage />}
                ></Route>
              </Route>
            </Route>
            <Route path="tv">
              <Route path="details" element={<SubLayout />}>
                <Route path=":id" element={<TVDetailPage />} />
              </Route>
              <Route path="general" element={<TVGeneralLayout />}>
                <Route
                  path="airing-today"
                  element={<TVGeneralAiringTodayPage />}
                ></Route>
                <Route
                  path="on-the-air"
                  element={<TVGeneralOnTheAirPage />}
                ></Route>
                <Route path="search" element={<TVGeneralSearchPage />}></Route>
              </Route>
            </Route>

            {/* General Tabs */}
          </Route>
          <Route path="settings" element={<SorryPage />} />
          <Route path="log" element={<SorryPage />} />
          <Route path="/test" element={<TestPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
