import { Fragment, useEffect } from 'react';
import { withErrorBoundary } from 'react-error-boundary';

import ErrorFallBack from '~/components/Base/ErrorFallBack';
import MainSection from '~/components/MainSection';
import SearchSection from '~/components/SearchSection';

import { api } from '~/config';

const TVSeriesPage = () => {
  const apiList = [
    {
      name: 'TV Airing Today',
      api: api.tv.getAiringToday(),
    },
    {
      name: 'On The Air',
      api: api.tv.getOnTheAir(),
    },
    {
      name: 'Top Rated TV Series',
      api: api.getTopRated('tv'),
    },
  ];
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <Fragment>
      <MainSection
        apiBanner={api.tv.getOnTheAir()}
        apiList={apiList}
        type="tv"
      />
      <SearchSection type="tv" />
    </Fragment>
  );
};

export default withErrorBoundary(TVSeriesPage, {
  FallbackComponent: ErrorFallBack,
});
