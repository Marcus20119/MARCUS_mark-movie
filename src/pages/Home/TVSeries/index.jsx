import { Fragment } from 'react';
import MainSection from '../../../components/MainSection';
import SearchSection from '../../../components/SearchSection';

const TVSeriesPage = () => {
  const apiList = [
    {
      name: 'TV Airing Today',
      api: 'https://api.themoviedb.org/3/tv/airing_today?api_key=ca5bec6407d971b84c656385ba10351d&language=en-US&page=1',
    },
    {
      name: 'On The Air',
      api: 'https://api.themoviedb.org/3/tv/on_the_air?api_key=ca5bec6407d971b84c656385ba10351d&language=en-US&page=1',
    },
    {
      name: 'Top Rated TV Series',
      api: 'https://api.themoviedb.org/3/tv/top_rated?api_key=ca5bec6407d971b84c656385ba10351d&language=en-US&page=1',
    },
  ];
  const apiBanner =
    'https://api.themoviedb.org/3/tv/on_the_air?api_key=ca5bec6407d971b84c656385ba10351d&language=en-US&page=1';
  const apiGenres =
    'https://api.themoviedb.org/3/genre/tv/list?api_key=ca5bec6407d971b84c656385ba10351d&language=en-US';
  return (
    <Fragment>
      {/* <Banner apiLink={apiBanner} />
      <div className="flex flex-col gap-4">
        {apiList.map(item => (
          <ScrollList key={item.name} title={item.name} apiList={item.api} />
        ))}
      </div> */}
      <MainSection
        apiBanner={apiBanner}
        apiList={apiList}
        apiGenres={apiGenres}
      />
      <SearchSection />
    </Fragment>
  );
};

export default TVSeriesPage;
