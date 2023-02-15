import { Fragment } from 'react';
import { withErrorBoundary } from 'react-error-boundary';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import { MainSection } from '~/components/Home/MainSection';
import { SearchSection } from '~/components/Home/SearchSection';
import { api } from '~/utils';
import { useChangeTitleWebsite, useResponsive, useScrollOnTop } from '~/hooks';

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

  const { isTablet, isLaptop } = useResponsive();

  return (
    <Fragment>
      <MainSection
        apiBanner={api.tv.getOnTheAir()}
        apiList={apiList}
        type="tv"
      />
      {isLaptop && <SearchSection type="tv" />}
    </Fragment>
  );
};

export default withErrorBoundary(TVSeriesHomePage, {
  FallbackComponent: ErrorFallBack,
});
