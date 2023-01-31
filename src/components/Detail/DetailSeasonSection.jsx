import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import { api } from '~/utils';

const DetailSeasonSection = ({ seasonsData }) => {
  return (
    <div className="relative w-full p-[30px] !bg-mainSection">
      <h3 className="text-2xl text-white font-bold mb-3">Seasons</h3>
      <div className="flex flex-col items-start w-full">
        {seasonsData &&
          seasonsData.length > 0 &&
          seasonsData.map((seasonData, index) => (
            <Fragment key={`seasonKey${index}`}>
              {!(seasonData.season_number === 0) && (
                <div
                  className="flex justify-start items-start gap-[16px] w-full"
                  style={{
                    borderBottom:
                      index === seasonsData.length - 1
                        ? ''
                        : 'solid 1px rgba(255, 255, 255, 0.3)',
                    paddingTop: index === 0 ? '0px' : '16px',
                    paddingBottom:
                      index === seasonsData.length - 1 ? '0px' : '16px',
                  }}
                >
                  <img
                    className="w-[10%] block object-cover object-center rounded-md"
                    src={
                      seasonData.poster_path
                        ? api.getPoster(seasonData.poster_path)
                        : '/imgs/no-poster.jpg'
                    }
                    alt={`Season ${index}`}
                  />
                  <div className="flex flex-col justify-start items-start gap-[4px] text-white">
                    <h3 className="text-xl font-bold">{`Season ${seasonData.season_number}`}</h3>
                    <span className="text-[#b5b5b5] font-bold">{`${new Date(
                      seasonData.air_date
                    ).getFullYear()} - ${
                      seasonData.episode_count
                    } episodes`}</span>
                    <p className="text-[#b5b5b5]">{seasonData.overview}</p>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
      </div>
    </div>
  );
};

DetailSeasonSection.propTypes = {
  seasonsData: PropTypes.array.isRequired,
};

export default withErrorBoundary(DetailSeasonSection, {
  FallbackComponent: ErrorFallBack,
});
