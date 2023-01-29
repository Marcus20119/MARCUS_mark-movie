import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import { ButtonPlay } from '~/components/Button';
import {
  MovieCardListX,
  LoadingMovieCardListX,
} from '~/components/CardAndList';
import { api } from '~/utils';
import { useMySWR } from '~/hooks';

const NonSearchUI = ({ type }) => {
  const apiPopular = api.getPopular(type, 1);
  const apiWatchList = api.getTopRated(type, 1);
  const { myData: popularData, isLoading: popularLoading } = useMySWR({
    api: apiPopular,
  });
  const { myData: watchlistData, isLoading: watchlistLoading } = useMySWR({
    api: apiWatchList,
  });
  return (
    <div className="flex flex-col gap-4 mt-auto">
      <div className="flex flex-col gap-[10px]">
        <h3 className="text-2xl text-white font-bold">Popular</h3>
        {popularLoading || !popularData || popularData.length === 0 ? (
          <LoadingMovieCardListX quantity={2} />
        ) : (
          <MovieCardListX moviesData={popularData} type={type} quantity={2} />
        )}
        <ButtonPlay message="See more" displayIcon={false} widthType="full" />
      </div>
      <div className="flex flex-col gap-[10px]">
        <h3 className="text-2xl text-white font-bold">Watch List</h3>

        {watchlistLoading || !watchlistData || watchlistData.length === 0 ? (
          <LoadingMovieCardListX quantity={2} />
        ) : (
          <MovieCardListX moviesData={watchlistData} type={type} quantity={2} />
        )}
        <ButtonPlay message="See more" displayIcon={false} widthType="full" />
      </div>
    </div>
  );
};

NonSearchUI.propTypes = {
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
};

export default withErrorBoundary(NonSearchUI, {
  FallbackComponent: ErrorFallBack,
});
