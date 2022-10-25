import { Fragment } from 'react';
import MainSection from '../../components/MainSection';
import SearchSection from '../../components/SearchSection';
import { apiKey } from '../../config';

const Movies = () => {
  const apiList = [
    {
      name: 'Now Playing',
      api: `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`,
    },
    {
      name: 'Up Coming',
      api: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`,
    },
    {
      name: 'Top Rated Movies',
      api: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`,
    },
  ];
  const apiBanner = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
  const apiGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
  return (
    <Fragment>
      <MainSection
        apiBanner={apiBanner}
        apiList={apiList}
        apiGenres={apiGenres}
      />
      <SearchSection />
    </Fragment>
  );
};

export default Movies;
