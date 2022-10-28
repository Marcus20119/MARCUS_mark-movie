import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import ErrorFallBack from '~/components/Base/ErrorFallBack';
import ButtonPlay from '~/components/Common/Button/Play';
import MovieCardListX from '~/components/Common/Movie/CardListX';
import { api } from '~/config';
import useMySWR from '~/hooks/useMySWR';

const NonSearchUI = ({ type }) => {
  const apiPopular = api.getPopular(1, type);
  const apiWatchList = api.getTopRated(1, type);
  const { myData: popularData } = useMySWR({ api: apiPopular });
  const { myData: watchlistData } = useMySWR({ api: apiWatchList });
  return (
    <div className="flex flex-col gap-4 mt-auto">
      <div className="flex flex-col gap-[10px]">
        <h3 className="text-2xl text-white font-bold">Popular</h3>
        <MovieCardListX moviesData={popularData} type={type} quantity={2} />
        <ButtonPlay message="See more" displayIcon={false} widthType="full" />
      </div>
      <div className="flex flex-col gap-[10px]">
        <h3 className="text-2xl text-white font-bold">Watchlist</h3>
        <MovieCardListX moviesData={watchlistData} type={type} quantity={2} />
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
