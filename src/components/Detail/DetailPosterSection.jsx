import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import { ButtonPlay } from '~/components/Button';
import { api } from '~/utils';
import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import ProgressiveImg from '../Base/ProgressiveImg';

const DetailPosterSection = ({ movieData }) => {
  return (
    <Fragment>
      {movieData && (movieData.title || movieData.name) && (
        <div className="flex flex-col gap-[20px] w-[20%]">
          {movieData?.poster_path ? (
            <ProgressiveImg
              src={api.getPoster(movieData.poster_path, 'w342')}
              placeholderSrc={api.getPoster(movieData.poster_path, 'w92')}
              alt={movieData.poster_path}
              className="w-full object-contain rounded-md"
              resetClassName={true}
            />
          ) : (
            <img
              className="w-full object-contain rounded-md"
              src="/imgs/no-poster.jpg"
              alt="no-poster"
            />
          )}
          <ButtonPlay
            message="Watch now"
            displayIcon={true}
            widthType="full"
            className="!rounded-md"
          />
        </div>
      )}
    </Fragment>
  );
};

DetailPosterSection.propTypes = {
  movieData: PropTypes.object.isRequired,
};

export default withErrorBoundary(DetailPosterSection, {
  FallbackComponent: ErrorFallBack,
});
