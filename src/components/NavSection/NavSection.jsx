import { Link, NavLink, useNavigate } from 'react-router-dom';
import { navSection } from '~/utils';

const NavSection = () => {
  const navigateTo = useNavigate();
  return (
    <div className="relative">
      <div className="fixed top-0 bottom-0 left-0 right-[85%] gap-[40px] flex flex-col bg-[#181818] py-[20px] px-[20px] text-white border-r-[1px] border-r-[#353338]">
        <Link
          to="/home/movies"
          className="font-bold text-xl tracking-wider text-white hover:text-white"
        >
          MARK
          <span className="text-[var(--primary-color)] text-lg tracking-normal">
            movie
          </span>
        </Link>
        <div className="flex flex-col gap-[24px] mt-auto">
          {navSection.map(navSection => (
            <div
              key={navSection.groupName}
              className="flex flex-col gap-[16px]"
            >
              <h3 className="text-[0.65rem] tracking-[0.15rem] text-[rgba(255,_255,_255,_0.4)]">
                {navSection.groupName}
              </h3>
              <div className="flex flex-col gap-[14px] ml-4 text-[rgba(255,_255,_255,_0.8)]">
                {navSection.items.length > 0 &&
                  navSection.items.map(navItem => (
                    <NavLink
                      onClick={e => {
                        e.preventDefault();
                        navigateTo(navItem.navigateLink);
                      }}
                      to={navItem.originLink}
                      key={navItem.name}
                      className={({ isActive }) =>
                        isActive
                          ? 'flex items-center gap-2 text-[var(--primary-color)] hover:text-[var(--primary-color)] transition-none'
                          : 'flex items-center gap-2 hover:text-[var(--primary-color)] transition-none'
                      }
                    >
                      <i className={navItem.iconClass}></i>
                      <h4>{navItem.name}</h4>
                    </NavLink>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-start items-center gap-2 mb-2">
          <img
            className="block w-7 h-7 object-cover object-center rounded-full"
            src="/imgs/marcus.jpg"
            alt="marcus freeman"
          />
          <h5>Marcus Freeman</h5>
        </div>
      </div>
    </div>
  );
};

export { NavSection };
