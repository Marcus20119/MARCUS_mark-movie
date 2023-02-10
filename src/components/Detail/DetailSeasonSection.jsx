import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import { api } from '~/utils';
import { Link } from 'react-router-dom';

const DetailSeasonSection = ({
  seasonsData,
  showContent = true,
  showTitle = true,
  wrapClassName = '',
  movieId,
}) => {
  return (
    <div className={`relative w-full p-[30px] ${wrapClassName}`}>
      {showTitle && (
        <h3 className="text-2xl text-white font-bold mb-3">Seasons</h3>
      )}
      <div className="flex flex-col items-start w-full">
        {seasonsData &&
          seasonsData.length > 0 &&
          seasonsData.map((seasonItem, index) => (
            <Fragment key={`seasonKey${index}`}>
              {!(seasonItem.season_number === 0) && (
                <Link
                  to={`/tv/watch/${movieId}?season=${seasonItem.season_number}&episode=1`}
                  className="flex justify-start items-start gap-[16px] w-full hover:opacity-60"
                  style={{
                    borderBottom:
                      index === seasonsData.length - 1
                        ? ''
                        : 'solid 1px rgba(255, 255, 255, 0.3)',
                    paddingTop:
                      (seasonItem.season_number === index && index === 1) ||
                      (seasonItem.season_number !== index && index === 0)
                        ? '0px'
                        : '16px',
                    paddingBottom:
                      index === seasonsData.length - 1 ? '0px' : '16px',
                  }}
                >
                  <img
                    className="w-[140px] block object-cover object-center rounded-md"
                    src={
                      seasonItem.poster_path
                        ? api.getPoster(seasonItem.poster_path)
                        : '/imgs/no-poster.jpg'
                    }
                    alt={`Season ${index}`}
                  />
                  <div className="flex flex-col justify-start items-start gap-[4px] text-white">
                    <h3 className="text-xl font-bold">{`Season ${seasonItem.season_number}`}</h3>
                    <span className="text-[#b5b5b5] font-bold">{`${new Date(
                      seasonItem.air_date
                    ).getFullYear()} - ${
                      seasonItem.episode_count
                    } episodes`}</span>
                    {showContent && (
                      <p className="text-[#b5b5b5]">{seasonItem.overview}</p>
                    )}
                  </div>
                </Link>
              )}
            </Fragment>
          ))}
      </div>
    </div>
  );
};

DetailSeasonSection.propTypes = {
  seasonsData: PropTypes.array.isRequired,
  movieId: PropTypes.string.isRequired,
  showContent: PropTypes.bool,
  showCTitle: PropTypes.bool,
  wrapClassName: PropTypes.string,
};

export default withErrorBoundary(DetailSeasonSection, {
  FallbackComponent: ErrorFallBack,
});
