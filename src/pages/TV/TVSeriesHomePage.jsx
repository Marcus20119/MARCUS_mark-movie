import { Fragment } from 'react';
import { withErrorBoundary } from 'react-error-boundary';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import { MainSection } from '~/components/MainSection';
import { SearchSection } from '~/components/SearchSection';
import { api } from '~/utils';
import { useChangeTitleWebsite, useScrollOnTop } from '~/hooks';

const TVSeriesHomePage = () => {
  useScrollOnTop();
  useChangeTitleWebsite({ title: 'Mark Movie - Home/TVs' });
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

export default withErrorBoundary(TVSeriesHomePage, {
  FallbackComponent: ErrorFallBack,
});
