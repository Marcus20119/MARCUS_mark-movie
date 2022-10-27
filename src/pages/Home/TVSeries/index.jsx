import { Fragment } from 'react';
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
      api: api.tv.getTopRated(),
    },
  ];
  return (
    <Fragment>
      <MainSection
        apiBanner={api.tv.getOnTheAir()}
        apiList={apiList}
        type="tv"
      />
      <SearchSection />
    </Fragment>
  );
};

export default TVSeriesPage;
