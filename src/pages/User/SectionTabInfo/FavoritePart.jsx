import { Link } from 'react-router-dom';
import LoadingSkeleton from '~/components/Base/Loading/Skeleton';
import ProgressiveImg from '~/components/Base/ProgressiveImg';
import { useAuth } from '~/contexts/authContext';
import { useFetchAllTable } from '~/supabase';
import { api, route } from '~/utils';

const FavoritePart = ({ type }) => {
  const { session } = useAuth();
  const { tableData, loading } = useFetchAllTable({
    table: `favorite_${type}s`,
    neededLogIn: true,
    initialLoading: true,
    match: { user_id: session?.user?.id ? session.user.id : '' },
    limit: 6,
    rerenderCondition: [session],
  });
  return (
    <div className="w-full bg-mainSection py-3 px-4 rounded-lg">
      <div className="flex flex-col items-start gap-3 text-white80">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-bold text-xl text-white tracking-wide">
            {type === 'movie' ? 'Favorite Movies' : 'Favorite TV Shows'}
          </h3>
          <Link
            to={`/user?section=favorite-${type}s`}
            className="italic text-white opacity-50 hover:!opacity-80 hover:!text-primary"
          >
            See more
          </Link>
        </div>
        <div className="grid grid-cols-3 w-full rounded-md overflow-hidden">
          {!loading &&
            !!tableData &&
            tableData.length > 0 &&
            tableData.map((filmData, index) => (
              <Link
                to={route.toDetail(type, filmData[`${type}_id`])}
                key={`favorite-movie-${index}`}
                className="group relative overflow-hidden"
              >
                {filmData?.poster_path ? (
                  <ProgressiveImg
                    src={api.getPoster(filmData.poster_path, 'w500')}
                    placeholderSrc={api.getPoster(filmData.poster_path, 'w92')}
                    alt={filmData.poster_path}
                    resetClassName={true}
                    skeleton={false}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    className="absolute inset-0 block w-full h-full object-cover object-center"
                    src="/imgs/no-poster.jpg"
                    alt="no-poster"
                  />
                )}
                <div className="absolute inset-0 hidden bg-[#00000099] p-1 text-white break-all animate-fade-in group-hover:block">
                  {filmData.title}
                </div>
              </Link>
            ))}
          {loading &&
            Array(6)
              .fill('')
              .map((item, index) => (
                <LoadingSkeleton
                  key={`skeleton-favorite-${index}`}
                  className="h-[192px] w-full opacity-50"
                />
              ))}
        </div>
      </div>
      {!loading && !!tableData && tableData.length === 0 && (
        <Link
          to={`/${type}/search?query=&page=1`}
          className="block w-full bg-[#ffffff70] py-2 rounded-md text-center italic opacity-70 hover:opacity-100 hover:!text-primary hover:!text-current"
        >{`Add your ${type === 'movie' ? 'Movie' : 'Show'} now`}</Link>
      )}
    </div>
  );
};

export default FavoritePart;
