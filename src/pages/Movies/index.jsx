import { Fragment } from 'react';
import Banner from '../../components/MainSection/Banner';
import ScrollList from '../../components/MainSection/ScrollList';

const Movies = () => {
  const apiList = [
    {
      name: 'Now Playing',
      api: 'https://api.themoviedb.org/3/movie/now_playing?api_key=ca5bec6407d971b84c656385ba10351d&language=en-US&page=1',
    },
    {
      name: 'Up Coming',
      api: 'https://api.themoviedb.org/3/movie/upcoming?api_key=ca5bec6407d971b84c656385ba10351d&language=en-US&page=1',
    },
    {
      name: 'Top Rated Movies',
      api: 'https://api.themoviedb.org/3/movie/top_rated?api_key=ca5bec6407d971b84c656385ba10351d&language=en-US&page=1',
    },
  ];
  return (
    <Fragment>
      <Banner apiLink="https://api.themoviedb.org/3/movie/now_playing?api_key=ca5bec6407d971b84c656385ba10351d&language=en-US&page=1" />
      <div className="flex flex-col gap-4">
        {apiList.map(item => (
          <ScrollList key={item.name} title={item.name} apiLink={item.api} />
        ))}
      </div>
    </Fragment>
  );
};

export default Movies;
