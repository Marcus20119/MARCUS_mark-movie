import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../../config/configSWR';
import MovieCardListY from '../../Common/Movie/CardListY';

const ScrollList = ({ title = 'This is the title', apiLink }) => {
  //https://api.themoviedb.org/3/movie/now_playing?api_key=ca5bec6407d971b84c656385ba10351d&language=en-US&page=1
  const [moviesData, setMoviesData] = useState([]);
  const { data, error } = useSWR(apiLink, fetcher);
  useEffect(() => {
    if (data && data.results) {
      setMoviesData(data.results);
    }
  }, [data]);
  return (
    <div>
      <h3 className="text-2xl text-white font-bold mb-3">{title}</h3>
      {moviesData && moviesData.length > 0 && (
        <MovieCardListY moviesData={moviesData} />
      )}
    </div>
  );
};

ScrollList.propTypes = {
  title: PropTypes.string,
  apiLink: PropTypes.string.isRequired,
};

export default ScrollList;
