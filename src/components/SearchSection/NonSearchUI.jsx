import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { Fragment } from 'react';

import ErrorFallBack from '~/components/Base/ErrorFallBack/ErrorFallBack';
import { ButtonPlay } from '~/components/Button';
import {
  MovieCardListX,
  LoadingMovieCardListX,
} from '~/components/CardAndList';
import { api } from '~/utils';
import { useMySWR } from '~/hooks';
import { useFetchAllTable } from '~/supabase';
import { useAuth } from '~/contexts/authContext';
import LoadingSkeleton from '../Base/Loading/Skeleton';

const NonSearchUI = ({ type }) => {
  const apiPopular = api.getPopular(type, 1);
  const apiThisYear = api.getDiscover(
    type,
    '&primary_release_year=2023&page=1'
  );
  const { myData: popularData, isLoading: popularLoading } = useMySWR({
    api: apiPopular,
  });
  const { myData: thisYearData, isLoading: thisYearLoading } = useMySWR({
    api: apiThisYear,
  });
  const { session } = useAuth();
  const { tableData: watchlistData, loading: watchlistLoading } =
    useFetchAllTable({
      table: `watchlist_${type}s`,
      neededLogIn: true,
      match: { user_id: session?.user?.id ? session.user.id : '' },
      initialLoading: true,
      limit: 2,
      rerenderCondition: [session],
    });
  return (
    <Fragment>
      {!popularLoading &&
      !watchlistLoading &&
      !thisYearLoading &&
      popularData &&
      (watchlistData || thisYearData) ? (
        <div className="flex flex-col gap-4 mt-auto">
          <div className="flex flex-col gap-[10px]">
            <h3 className="text-2xl text-white font-bold">Popular</h3>
            {popularData.length > 0 ? (
              <MovieCardListX
                moviesData={popularData}
                type={type}
                quantity={2}
              />
            ) : (
              <LoadingMovieCardListX quantity={2} />
            )}

            <ButtonPlay
              message="See more"
              displayIcon={false}
              widthType="full"
              isLink={true}
              path={`/${type}/popular?page=1`}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            {watchlistData.length === 2 ? (
              <Fragment>
                <h3 className="text-2xl text-white font-bold">Watch List</h3>
                <MovieCardListX
                  moviesData={watchlistData}
                  type={type}
                  quantity={2}
                />
                <ButtonPlay
                  message="See more"
                  displayIcon={false}
                  widthType="full"
                  isLink={true}
                  path={`/watchlist#watchlist_${type}`}
                />
              </Fragment>
            ) : thisYearData.length > 0 ? (
              <Fragment>
                <h3 className="text-2xl text-white font-bold">This Year</h3>
                <MovieCardListX
                  moviesData={thisYearData}
                  type={type}
                  quantity={2}
                />
                <ButtonPlay
                  message="See more"
                  displayIcon={false}
                  widthType="full"
                  isLink={true}
                  path={`/discover?category=${type}&primary_release_year=2023&page=1`}
                />
              </Fragment>
            ) : (
              <Fragment>
                <LoadingSkeleton className="h-[1.5rem] my-[0.25rem] w-[50%] rounded-md" />
                <LoadingMovieCardListX quantity={2} />
                <ButtonPlay
                  message="See more"
                  displayIcon={false}
                  widthType="full"
                  disabled={true}
                />
              </Fragment>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-auto">
          {Array(2)
            .fill('')
            .map((item, index) => (
              <div
                key={`loadingXGroup-${index}`}
                className="flex flex-col items-start gap-[10px]"
              >
                <LoadingSkeleton className="h-[1.5rem] my-[0.25rem] w-[50%] rounded-md" />
                <LoadingMovieCardListX quantity={2} />
                <ButtonPlay
                  message="See more"
                  displayIcon={false}
                  widthType="full"
                  disabled={true}
                />
              </div>
            ))}
        </div>
      )}
    </Fragment>
  );
};

NonSearchUI.propTypes = {
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
};

export default withErrorBoundary(NonSearchUI, {
  FallbackComponent: ErrorFallBack,
});
