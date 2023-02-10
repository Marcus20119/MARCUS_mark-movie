import { Fragment } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '~/contexts/authContext';
import { useUser } from '~/contexts/userContext';
import { useForceRerender } from '~/hooks';
import { navSection, neededSignInAlert } from '~/utils';
import ToolTipBase from '../Base/ToolTipBase';
import { ButtonPrimary } from '../Button';
import ModalLogIn from './ModalLogIn';
import './NavSection.scss';
const NavSection = ({ isHomePage = false }) => {
  const navigateTo = useNavigate();
  const { session, handleShowModelLogIn } = useAuth();
  const { avatarUrl, userRow } = useUser();
  useForceRerender([avatarUrl]);

  const handleClickNav = async navItem => {
    if (navItem.needLogIn && !session?.user?.id) {
      neededSignInAlert(handleShowModelLogIn);
    } else {
      if (navItem?.handleClick) {
        await navItem.handleClick(navigateTo);
      } else {
        navigateTo(navItem.navigateLink);
      }
    }
  };

  return (
    <Fragment>
      <div className="relative">
        {isHomePage && (
          <div className="fixed top-0 bottom-0 left-0 right-[85%] gap-[40px] flex flex-col bg-[#181818] py-[20px] px-[20px] text-white border-r-[1px] border-r-[#353338]">
            <Link
              to="/home/movies"
              className="font-bold text-xl tracking-wider text-white hover:text-white"
            >
              MARK
              <span className="!text-primary text-lg tracking-normal">
                movie
              </span>
            </Link>
            <div className="flex flex-col gap-[24px] mt-auto">
              {navSection.map(navItem => (
                <div
                  key={navItem.groupName}
                  className="flex flex-col gap-[16px]"
                >
                  <h3 className="text-[0.65rem] tracking-[0.15rem] text-[rgba(255,_255,_255,_0.4)]">
                    {navItem.groupName}
                  </h3>
                  <div className="flex flex-col gap-[14px] ml-4 text-[rgba(255,_255,_255,_0.8)]">
                    {navItem.items.length > 0 &&
                      navItem.items.map(navItem => (
                        <NavLink
                          onClick={async e => {
                            e.preventDefault();
                            handleClickNav(navItem);
                          }}
                          to={navItem.originLink}
                          key={navItem.name}
                          className={({ isActive }) =>
                            isActive
                              ? 'flex items-center gap-2 !text-primary hover:!text-primary transition-none'
                              : 'flex items-center gap-2 hover:!text-primary transition-none'
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
              <Link
                to="/user?section=info"
                className="flex justify-start items-center gap-2 mb-2 hover:!text-current"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden">
                  <img
                    className="block w-full h-full object-cover object-center"
                    src={avatarUrl ? avatarUrl : '/imgs/no-face.jpg'}
                    alt={avatarUrl ? 'Avatar' : 'No image'}
                  />
                </div>
                <h5 className="flex-1 line-clamp-1">
                  {userRow.username || `User-${userRow.id}`}
                </h5>
              </Link>
            ) : (
              <ButtonPrimary onClick={handleShowModelLogIn}>
                Sign In
              </ButtonPrimary>
            )}
          </div>
        )}
        {!isHomePage && (
          <div className="fixed top-0 bottom-0 left-0 w-[82px] gap-[40px] flex flex-col bg-[#181818] py-[20px] px-[20px] text-white border-r-[1px] border-r-[#353338]">
            <Link to="/home/movies">
              <span className="font-bold text-xl tracking-wider navSection-logoLeft">
                M
              </span>
              <span className="font-bold !text-primary text-lg tracking-normal navSection-logoRight">
                m
              </span>
            </Link>
            <div className="flex flex-col gap-[24px] mt-auto">
              {navSection.map(navItem => (
                <div
                  key={navItem.groupName}
                  className="flex flex-col gap-[16px]"
                >
                  <div className="flex flex-col gap-[14px] ml-4 text-[rgba(255,_255,_255,_0.8)]">
                    {navItem.items.length > 0 &&
                      navItem.items.map(navItem => (
                        <ToolTipBase
                          key={navItem.name}
                          tipMessage={navItem.name}
                          position="right"
                          moveUp={12}
                          moveLeft={12}
                        >
                          <NavLink
                            onClick={async e => {
                              e.preventDefault();
                              handleClickNav(navItem);
                            }}
                            to={navItem.originLink}
                            className={({ isActive }) =>
                              isActive
                                ? 'flex items-center gap-2 !text-primary hover:!text-primary transition-none'
                                : 'flex items-center gap-2 hover:!text-primary transition-none'
                            }
                          >
                            <i
                              className={`${navItem.iconClass} navSection-icon`}
                            ></i>
                          </NavLink>
                        </ToolTipBase>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            {session?.user?.email ? (
              <Link
                to="/user?section=info"
                className="flex justify-start items-center gap-2 mb-2 hover:!text-current"
              >
                <div className="rounded-full overflow-hidden navSection-avatar">
                  <img
                    className="block w-full h-full object-cover object-center"
                    src={avatarUrl ? avatarUrl : '/imgs/no-face.jpg'}
                    alt={avatarUrl ? 'Avatar' : 'No image'}
                  />
                </div>
              </Link>
            ) : (
              <button
                onClick={handleShowModelLogIn}
                className="flex justify-center items-center rounded-full w-[41.2px] h-[42.5px] !bg-primary opacity-80 hover:opacity-100"
              >
                <i className="bx bxs-log-in-circle text-3xl"></i>
              </button>
            )}
          </div>
        )}
      </div>
      <ModalLogIn />
    </Fragment>
  );
};

export { NavSection };
