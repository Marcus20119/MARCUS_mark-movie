/* eslint-disable no-labels */
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router-dom';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import { api } from '~/utils';
import { supabase, useFetchSingleRow } from '~/supabase';
import { useAuth } from '~/contexts/authContext';
import { useResponsive } from '~/hooks';

const DetailSeasonSection = ({
  seasonsData,
  showContent = true,
  showTitle = true,
  wrapClassName = '',
  movieData,
}) => {
  const { session } = useAuth();
  const {
    rowData: recentRow,
    loading: recentLoading,
    setLoading: setRecentLoading,
  } = useFetchSingleRow({
    table: `recent_tvs`,
    match: {
      user_id: session?.user?.id ? session.user.id : '',
      tv_id: movieData.id,
    },
    neededLogIn: true,
    initialLoading: true,
    rerenderCondition: [session],
  });
  const handleAddToRecent = () => {
    if (session?.user?.email) {
      const handleUpsertData = async id => {
        block: try {
          setRecentLoading(true);

          const newRow = {
            user_id: session.user.id,
            tv_id: movieData.id,
            title: movieData.name,
            vote_average: parseFloat(movieData.vote_average).toFixed(1),
            poster_path: movieData.poster_path,
          };
          if (id) {
            newRow.id = id;
          }
          const { error } = await supabase.from(`recent_tvs`).upsert(newRow);
          if (error) {
            console.error(error);
            break block;
          }
        } catch (err) {
          console.log(err);
        }
      };
      if (recentRow?.[0]?.id && !recentLoading) {
        handleUpsertData(recentRow?.[0]?.id);
      } else {
        handleUpsertData();
      }
    }
  };

  const { isMobile } = useResponsive();

  return (
    <div
      className={`relative w-full ${wrapClassName} ${
        !isMobile ? 'p-[30px]' : 'px-[16px] py-[20px]'
      }`}
    >
      {showTitle && (
        <h3 className="text-2xl text-white font-bold mb-3">Seasons</h3>
      )}
      <div className="flex flex-col items-start w-full">
        {seasonsData &&
          seasonsData.length > 0 &&
          seasonsData.map((seasonItem, index) => (
            <Fragment key={`seasonKey${index}`}>
              {!(seasonItem.season_number === 0) &&
                seasonItem.episode_count !== 0 && (
                  <Link
                    to={`/tv/watch/${movieData.id}?season=${seasonItem.season_number}&episode=1&query=`}
                    className="flex justify-start items-start gap-[16px] w-full hover:opacity-60"
                    style={{
                      borderBottom: (
                        seasonsData[seasonsData.length - 1].episode_count === 0
                          ? index === seasonsData.length - 2
                          : index === seasonsData.length - 1
                      )
                        ? ''
                        : 'solid 1px rgba(255, 255, 255, 0.3)',
                      paddingTop:
                        (seasonItem.season_number === index && index === 1) ||
                        (seasonItem.season_number !== index && index === 0)
                          ? '0px'
                          : '16px',
                      paddingBottom: (
                        seasonsData[seasonsData.length - 1].episode_count === 0
                          ? index === seasonsData.length - 2
                          : index === seasonsData.length - 1
                      )
                        ? '0px'
                        : '16px',
                    }}
                    onClick={handleAddToRecent}
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
                        <p
                          className={`text-[#b5b5b5] ${
                            isMobile && 'line-clamp-6'
                          }`}
                        >
                          {seasonItem.overview}
                        </p>
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
  showContent: PropTypes.bool,
  showCTitle: PropTypes.bool,
  wrapClassName: PropTypes.string,
};

export default withErrorBoundary(DetailSeasonSection, {
  FallbackComponent: ErrorFallBack,
});
