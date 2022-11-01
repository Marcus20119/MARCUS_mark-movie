import { Fragment } from 'react';
import PropTypes from 'prop-types';

import ButtonPlay from '~/components/Common/Button/Play';
import { api } from '~/config';

const DetailPosterSection = ({ movieData }) => {
  return (
    <Fragment>
      {movieData && movieData.title && (
        <div className="flex flex-col gap-[20px] w-[20%]">
          <img
            className="w-full object-contain rounded-md"
            src={
              movieData.poster_path
                ? api.getPoster(movieData.poster_path)
                : '/no-poster.jpg'
            }
            alt={movieData.title}
          />
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

export default DetailPosterSection;
