import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useResponsive } from '~/hooks';
import { navUser } from '~/utils';
import SectionTabFavoriteActor from './SectionTabFavoriteActor';
import SectionTabFavoriteFilm from './SectionTabFavoriteFilm';
import { SectionTabInfo } from './SectionTabInfo';

const SectionTab = ({ section, userRow }) => {
  const { isMobile } = useResponsive();

  return (
    <Fragment>
      <div className={`flex w-full ${!isMobile ? 'px-[60px]' : 'px-[16px]'}`}>
        <div className="flex w-full mt-3 border-t border-t-[rgba(255,255,255,0.3)] overflow-x-auto scrollbar-hide">
          {navUser.map((nav, index) => (
            <Link
              key={`navUser-${index}`}
              to={`/user?section=${nav.section}`}
              className={`px-[18px] py-[14px] font-bold border-b-2 hover:!text-primary flex-shrink-0 ${
                nav.section === section
                  ? '!text-primary border-b-primary'
                  : '!text-white80 border-b-mainSection'
              }`}
            >
              {nav.name}
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`min-h-[500px] bg-[#181818] ${
          !isMobile ? 'p-[30px]' : 'p-[16px]'
        }`}
      >
        {section === 'info' && <SectionTabInfo userRow={userRow} />}
        {section === 'favorite-actors' && (
          <SectionTabFavoriteActor userRow={userRow} />
        )}
        {section === 'favorite-movies' && (
          <SectionTabFavoriteFilm userRow={userRow} type="movie" />
        )}
        {section === 'favorite-tvs' && (
          <SectionTabFavoriteFilm userRow={userRow} type="tv" />
        )}
      </div>
    </Fragment>
  );
};

export default SectionTab;
