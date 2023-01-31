import { Fragment } from 'react';
import { navUser } from '~/utils';

const SectionTab = ({ section }) => {
  console.log('section', section);
  return (
    <Fragment>
      <div className="flex w-full px-[60px]">
        <div className="flex w-full mt-3 border-t border-t-[rgba(255,255,255,0.3)]">
          {navUser.map((nav, index) => (
            <span
              key={`navUser-${index}`}
              className={`px-[18px] py-[14px] ${
                nav.section === section
                  ? '!text-primary font-bold border-b-2 border-b-primary'
                  : '!text-white80'
              }`}
            >
              {nav.name}
            </span>
          ))}
        </div>
      </div>
      <div className="h-[600px] bg-[#181818]">ds</div>
    </Fragment>
  );
};

export default SectionTab;
