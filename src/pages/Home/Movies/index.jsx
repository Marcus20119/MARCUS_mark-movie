import { Fragment } from 'react';
import { withErrorBoundary } from 'react-error-boundary';

import { api } from '~/config';
import ErrorFallBack from '~/components/Base/ErrorFallBack';
import MainSection from '~/components/MainSection';
import SearchSection from '~/components/SearchSection';
import useScrollOnTop from '~/hooks/useScrollOnTop';

const apiList = [
  {
    name: 'Now Playing',
    api: api.movie.getNowPlaying(),
  },
  {
    name: 'Up Coming',
    api: api.movie.getUpComing(),
  },
  {
    name: 'Top Rated Movies',
    api: api.getTopRated('movie'),
  },
];

const MoviesPage = () => {
  useScrollOnTop();

  return (
    <Fragment>
      <MainSection
        apiBanner={api.movie.getNowPlaying()}
        apiList={apiList}
        type="movie"
      />
      <SearchSection type="movie" />
    </Fragment>
  );
};

export default withErrorBoundary(MoviesPage, {
  FallbackComponent: ErrorFallBack,
});
