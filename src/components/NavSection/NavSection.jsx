import { Fragment } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '~/contexts/authContext';
import { navSection } from '~/utils';
import { ButtonPrimary } from '../Button';
import ModalLogIn from './ModalLogIn';

const NavSection = () => {
  const navigateTo = useNavigate();
  const { session, handleShowModelLogIn } = useAuth();

  return (
    <Fragment>
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
            {navSection.map(navItem => (
              <div key={navItem.groupName} className="flex flex-col gap-[16px]">
                <h3 className="text-[0.65rem] tracking-[0.15rem] text-[rgba(255,_255,_255,_0.4)]">
                  {navItem.groupName}
                </h3>
                <div className="flex flex-col gap-[14px] ml-4 text-[rgba(255,_255,_255,_0.8)]">
                  {navItem.items.length > 0 &&
                    navItem.items.map(navItem => (
                      <NavLink
                        onClick={async e => {
                          e.preventDefault();
                          if (navItem?.handleClick) {
                            await navItem.handleClick();
                            navigateTo(navItem.navigateLink);
                          } else {
                            navigateTo(navItem.navigateLink);
                          }
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
          {session?.user?.email ? (
            <div className="flex justify-start items-center gap-2 mb-2">
              <img
                className="block w-7 h-7 object-cover object-center rounded-full"
                src="/imgs/marcus.jpg"
                alt="marcus freeman"
              />
              <h5>Marcus Freeman</h5>
            </div>
          ) : (
            <ButtonPrimary onClick={handleShowModelLogIn}>
              Sign In
            </ButtonPrimary>
          )}
        </div>
      </div>
      <ModalLogIn />
    </Fragment>
  );
};

export { NavSection };
