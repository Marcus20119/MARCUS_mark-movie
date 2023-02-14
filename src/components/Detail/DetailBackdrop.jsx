import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import queryString from 'query-string';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import { api } from '~/utils';
import ProgressiveImg from '../Base/ProgressiveImg';
import { SuggestionSearchBar } from '../Bar';
import { useResponsive } from '~/hooks';

const DetailBackdrop = ({ movieData }) => {
  const location = useLocation();
  const { query } = queryString.parse(location.search);
  const [newQuery, setNewQuery] = useState(query);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (newQuery) {
      navigateTo(`/search?query=${newQuery}&page=1`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newQuery]);

  const { isMobile, isTablet, isLaptop } = useResponsive();

  return (
    <div className="absolute top-0 left-0 z-[1] w-full overflow-hidden h-[500px]">
      {movieData && (movieData.title || movieData.name) && (
        <Fragment>
          {movieData?.backdrop_path ? (
            <ProgressiveImg
              src={api.getBackdrop(movieData.backdrop_path, 'original')}
              placeholderSrc={api.getBackdrop(movieData.backdrop_path, 'w300')}
              alt={movieData.backdrop_path}
              resetClassName={true}
              className="absolute top-0 left-0 z-[1] block w-full h-full object-cover object-top backdrop-blur-3xl"
            />
          ) : (
            <img
              className="absolute top-0 left-0 z-[1] block w-full h-full object-cover object-top backdrop-blur-3xl"
              src="/imgs/no-backdrop.jpg"
              alt="no-poster"
            />
          )}
          <div
            className="absolute top-0 left-0 z-[2] block w-full h-[500px] object-top bg-center bg-cover bg-no-repeat"
            style={{
              background: `linear-gradient(
                0deg,
                rgba(34, 34, 34, 0.9) 0%,
                rgba(34, 34, 34, 0.9) 10%,
                rgba(34, 34, 34, 0.8) 20%,
                rgba(34, 34, 34, 0.7) 30%,
                rgba(34, 34, 34, 0.6) 40%,
                rgba(34, 34, 34, 0.5) 50%,
                rgba(34, 34, 34, 0.4) 60%,
                rgba(34, 34, 34, 0.3) 70%,
                rgba(34, 34, 34, 0.2) 80%,
                rgba(34, 34, 34, 0.1) 90%,
                transparent 100%
              )`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          ></div>
          <div
            className={`absolute z-[50] right-[40px] top-[40px]  opacity-80 ${
              isLaptop && 'w-[400px]'
            } ${isTablet && 'w-[350px]'} ${isMobile && 'hidden'}`}
          >
            <SuggestionSearchBar
              typeQuery="multi"
              query={query}
              setNewQuery={setNewQuery}
              placeholder="Search . . ."
              needBrighter={true}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

DetailBackdrop.propTypes = {
  movieData: PropTypes.object.isRequired,
};

export default withErrorBoundary(DetailBackdrop, {
  FallbackComponent: ErrorFallBack,
});
