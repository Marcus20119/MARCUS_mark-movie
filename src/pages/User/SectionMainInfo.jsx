import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import LoadingSkeleton from '~/components/Base/Loading/Skeleton';
import ToolTipBase from '~/components/Base/ToolTipBase';
import { useResponsive } from '~/hooks';
import { api, route } from '~/utils';

const SectionMainInfo = ({
  userRow,
  favoriteActorsTable,
  loadingFavoriteActorsTable,
}) => {
  const { isMobile } = useResponsive();

  return (
    <Fragment>
      <div
        className={`flex flex-col justify-start gap-[6px] ${
          !isMobile ? 'items-start' : 'items-center'
        }`}
      >
        <h1 className="text-white opacity-80 text-4xl font-bold line-clamp-1">
          {userRow.username || `User-${userRow.id}`}
        </h1>
        {!loadingFavoriteActorsTable &&
          favoriteActorsTable &&
          favoriteActorsTable.length > 0 && (
            <Fragment>
              <span className="text-white text-lg">{`${favoriteActorsTable.length} Favorite Actors`}</span>
              {!isMobile && (
                <div className="flex mb-[16px] -translate-x-[3px]">
                  {favoriteActorsTable.slice(0, 7).map((actorRow, index) => (
                    <Link
                      key={`favoriteActorIcon-${index}`}
                      to={
                        (
                          favoriteActorsTable.length > 6
                            ? index === 6
                            : index === favoriteActorsTable.length - 1
                        )
                          ? '/user?section=favorite-actors'
                          : route.toDetail('person', actorRow.actor_id)
                      }
                      className="relative flex justify-center items-center w-9 h-9 rounded-full overflow-hidden border-[3px] border-solid opacity-90 !border-mainSection hover:!border-primary hover:border-[2px] hover:opacity-100 hover:!z-10"
                      style={{
                        transform: `translateX(-${index * 8}px)`,
                        zIndex: `${7 - index}`,
                      }}
                    >
                      <ToolTipBase
                        key={`favoriteActor-${index}`}
                        tipMessage={actorRow.name}
                        position="bottom"
                        moveDown={4}
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
                      </ToolTipBase>
                      {(favoriteActorsTable.length > 6
                        ? index === 6
                        : index === favoriteActorsTable.length - 1) && (
                        <ToolTipBase
                          tipMessage="See more"
                          position="bottom"
                          moveUp={20}
                          moveLeft={16}
                        >
                          <div className="absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.4)] z-10">
                            <i className="bx bx-dots-horizontal-rounded text-white"></i>
                          </div>
                        </ToolTipBase>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </Fragment>
          )}
        {!loadingFavoriteActorsTable &&
          favoriteActorsTable &&
          favoriteActorsTable.length === 0 && (
            <Fragment>
              <span className="text-white text-lg">
                You still not have any favorite actor yet
              </span>
              {!isMobile && (
                <Link
                  to={`/person/search?query=&page=1`}
                  className="flex mb-[16px] h-[36px] -translate-x-[3px] italic !underline text-white opacity-50 hover:!opacity-80 hover:!text-primary"
                >
                  Add your favorite actor now
                </Link>
              )}
            </Fragment>
          )}
        {loadingFavoriteActorsTable && (
          <Fragment>
            <div className="w-1/2 h-[18px] my-[5px] rounded-sm overflow-hidden">
              <LoadingSkeleton className="w-full h-full" />
            </div>
            {!isMobile && (
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
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default SectionMainInfo;
