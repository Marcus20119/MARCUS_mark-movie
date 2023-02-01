import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { navUser } from '~/utils';
import SectionTabInfo from './SectionTabInfo';

const SectionTab = ({ section, userRow }) => {
  return (
    <Fragment>
      <div className="flex w-full px-[60px]">
        <div className="flex w-full mt-3 border-t border-t-[rgba(255,255,255,0.3)]">
          {navUser.map((nav, index) => (
            <Link
              key={`navUser-${index}`}
              to={`/user?section=${nav.section}`}
              className={`px-[18px] py-[14px] font-bold ${
                nav.section === section
                  ? '!text-primary border-b-2 border-b-primary'
                  : '!text-white80 border-none'
              }`}
            >
              {nav.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="min-h-[400px] bg-[#181818] p-[30px]">
        {section === 'info' && <SectionTabInfo userRow={userRow} />}
      </div>
    </Fragment>
  );
};

export default SectionTab;
