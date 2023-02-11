import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import { ButtonPlay } from '~/components/Button';
import { api } from '~/utils';
import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import ProgressiveImg from '../Base/ProgressiveImg';
import ModalBase from '../Base/ModalBase';
import { useModal } from '~/hooks';
import DetailSeasonSection from './DetailSeasonSection';

const DetailPosterTVSection = ({ movieData }) => {
  const {
    show: showModelSeason,
    handleShow: handleShowModelSeason,
    handleHide: handleHideModelSeason,
  } = useModal();

  return (
    <Fragment>
      {movieData && (movieData.title || movieData.name) && (
        <div className="flex flex-col gap-[20px] w-[20%]">
          {movieData?.poster_path ? (
            <ProgressiveImg
              src={api.getPoster(movieData.poster_path, 'w500')}
              placeholderSrc={api.getPoster(movieData.poster_path, 'w92')}
              alt={movieData.poster_path}
              className="w-full object-contain rounded-md min-h-[365px]"
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
            className="!rounded-md !text-lg"
            onClick={handleShowModelSeason}
          />
        </div>
      )}
      <ModalBase visible={showModelSeason} onClose={handleHideModelSeason}>
        <div className="relative w-[500px] bg-[#181818] py-6 pl-2 pr-4 rounded-2xl z-2 transition-all float-border ">
          {movieData.seasons && movieData.seasons.length > 0 && (
            <div className="custom-scrollbar max-h-[70vh] overflow-auto">
              <DetailSeasonSection
                seasonsData={movieData.seasons}
                showContent={false}
                showTitle={false}
                wrapClassName="py-0"
                movieData={movieData}
              />
            </div>
          )}
        </div>
      </ModalBase>
    </Fragment>
  );
};

DetailPosterTVSection.propTypes = {
  movieData: PropTypes.object.isRequired,
};

export default withErrorBoundary(DetailPosterTVSection, {
  FallbackComponent: ErrorFallBack,
});
