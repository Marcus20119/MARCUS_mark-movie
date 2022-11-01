import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { api } from '~/config';

const DetailBackdrop = ({ movieData }) => {
  return (
    <Fragment>
      {movieData && movieData.title && (
        <div
          className="block w-full h-[500px] object-top backdrop-blur-3xl opacity-50 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: movieData.backdrop_path
              ? `linear-gradient(0deg, rgb(34, 34, 34, 0.85), transparent), url('${api.getBackdrop(
                  movieData.backdrop_path
                )}')`
              : `linear-gradient(0deg, rgb(34, 34, 34, 0.85), transparent), url('/no-backdrop.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        ></div>
      )}
    </Fragment>
  );
};

DetailBackdrop.propTypes = {
  movieData: PropTypes.object.isRequired,
};

export default DetailBackdrop;
