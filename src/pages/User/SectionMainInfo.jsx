import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import LoadingSkeleton from '~/components/Base/Loading/Skeleton';
import { useUser } from '~/contexts/userContext';
import { api, route } from '~/utils';

const SectionMainInfo = ({ userRow }) => {
  const { favoriteActorsTable, loadingFavoriteActorsTable } = useUser();
  return (
    <Fragment>
      <div className="flex flex-col justify-start items-start gap-[6px]">
        <h1 className="text-white opacity-80 text-4xl font-bold">
          {userRow.username}
        </h1>
        {!loadingFavoriteActorsTable &&
        favoriteActorsTable &&
        favoriteActorsTable.length > 0 ? (
          <Fragment>
            <span className="text-white text-lg">{`${favoriteActorsTable.length} Favorite Actors`}</span>
            <div className="flex mb-[16px] -translate-x-[3px]">
              {favoriteActorsTable.slice(0, 7).map((actorRow, index) => (
                <Link
                  key={`favoriteActor-${index}`}
                  to={route.toDetail('person', actorRow.actor_id)}
                  className="relative flex justify-center items-center w-9 h-9 rounded-full overflow-hidden border-[3px] border-solid opacity-90 !border-mainSection hover:!border-primary hover:border-[2px] hover:opacity-100 hover:!z-10"
                  style={{
                    transform: `translateX(-${index * 8}px)`,
                    zIndex: `${7 - index}`,
                  }}
                >
                  <img
                    src={
                      actorRow.profile_path
                        ? api.getPoster(actorRow.profile_path, 'w92')
                        : '/imgs/no-face.jpg'
                    }
                    alt={actorRow.name}
                    className="block w-full h-full object-cover object-center"
                  />
                  {(favoriteActorsTable.length > 6
                    ? index === 6
                    : index === favoriteActorsTable.length) && (
                    <div className="absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.4)] z-10">
                      <i className="bx bx-dots-horizontal-rounded text-white"></i>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="w-1/2 h-[18px] my-[5px] rounded-sm overflow-hidden">
              <LoadingSkeleton className="w-full h-full" />
            </div>
            <div className="flex mb-[16px] -translate-x-[3px]">
              {Array(7)
                .fill('')
                .map((actorRow, index) => (
                  <div
                    key={`favoriteActor-${index}`}
                    to={route.toDetail('person', actorRow.actor_id)}
                    className={`!bg-mainSection w-9 h-9 rounded-full overflow-hidden border-[3px] border-solid !border-mainSection`}
                    style={{
                      transform: `translateX(-${index * 8}px)`,
                      zIndex: `${7 - index}`,
                    }}
                  >
                    <LoadingSkeleton className="w-full h-full" />
                    {index === 6 && (
                      <div className="absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.4)] z-10">
                        <i className="bx bx-dots-horizontal-rounded text-white"></i>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default SectionMainInfo;
