import { Fragment } from 'react';
import { withErrorBoundary } from 'react-error-boundary';

import { api } from '~/utils';
import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import { MainSection } from '~/components/Home/MainSection';
import { SearchSection } from '~/components/Home/SearchSection';
import { useChangeTitleWebsite, useResponsive, useScrollOnTop } from '~/hooks';

const MoviesHomePage = () => {
  useScrollOnTop();
  useChangeTitleWebsite({ title: 'Mark Movie - Home/Movies' });
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

  const { isTablet, isLaptop } = useResponsive();

  return (
    <Fragment>
      <MainSection
        apiBanner={api.movie.getNowPlaying()}
        apiList={apiList}
        type="movie"
      />
      {isLaptop && <SearchSection type="movie" />}
    </Fragment>
  );
};

export default withErrorBoundary(MoviesHomePage, {
  FallbackComponent: ErrorFallBack,
});
