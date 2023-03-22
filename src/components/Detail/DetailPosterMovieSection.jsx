/* eslint-disable no-labels */
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import { ButtonPlay } from '~/components/Button';
import { api } from '~/utils';
import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import ProgressiveImg from '../Base/ProgressiveImg';
import { useAuth } from '~/contexts/authContext';
import { supabase, useFetchSingleRow } from '~/supabase';
import { useResponsive } from '~/hooks';

const DetailPosterMovieSection = ({ movieData }) => {
  const { session } = useAuth();
  const {
    rowData: recentRow,
    loading: recentLoading,
    setLoading: setRecentLoading,
  } = useFetchSingleRow({
    table: `recent_movies`,
    match: {
      user_id: session?.user?.id ? session.user.id : '',
      movie_id: movieData.id,
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
            movie_id: movieData.id,
            title: movieData.title,
            vote_average: parseFloat(movieData.vote_average).toFixed(1),
            poster_path: movieData.poster_path,
          };
          if (id) {
            newRow.id = id;
          }
          const { error } = await supabase.from(`recent_movies`).upsert(newRow);
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

  const { isMobile, isTablet, isLaptop } = useResponsive();

  return (
    <Fragment>
      {movieData && (movieData.title || movieData.name) && (
        <div
          className={`flex flex-col gap-[20px] ${isLaptop && 'w-[20%]'} ${
            isTablet && 'w-[40%]'
          } ${isMobile && 'w-[60%]'}`}
        >
          {movieData?.poster_path ? (
            <ProgressiveImg
              src={api.getPoster(movieData.poster_path, 'w500')}
              placeholderSrc={api.getPoster(movieData.poster_path, 'w92')}
              alt={movieData.poster_path}
              className={`imgMobile w-full object-contain rounded-md ${
                !isMobile ? 'min-h-[365px]' : 'min-h-[300px]'
              }`}
              resetClassName={true}
              skeleton={false}
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
            className={`!rounded-md ${isLaptop && '!text-lg'} ${
              !isLaptop && 'py-3 text-xl'
            }`}
            isLink={true}
            path={`/movie/watch/${movieData.id}?query=`}
            onClick={handleAddToRecent}
          />
        </div>
      )}
    </Fragment>
  );
};

DetailPosterMovieSection.propTypes = {
  movieData: PropTypes.object.isRequired,
};

export default withErrorBoundary(DetailPosterMovieSection, {
  FallbackComponent: ErrorFallBack,
});
