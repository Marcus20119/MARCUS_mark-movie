import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '~/contexts/authContext';
import { useUser } from '~/contexts/userContext';
import { useClickOutSide, useForceRerender } from '~/hooks';
import { navSection, neededSignInAlert } from '~/utils';
import { ButtonPrimary } from '../Button';
import './NavSection.scss';

const NavSectionMobile = () => {
  const { nodeRef, setShow, show } = useClickOutSide();
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
    setShow(false);
  };

  return (
    <Fragment>
      <div className="z-[100] fixed top-0 left-0 right-0 h-[56px] flex justify-between items-center bg-[#181818] px-2 shadow-2xl">
        <div ref={nodeRef}>
          <i
            className="bx bx-menu flex justify-center items-center w-[40px] h-[40px] text-3xl text-white80"
            onClick={() => setShow(true)}
          ></i>
          {/* {show && ( */}
          <Fragment>
            <div
              className="z-[190] fixed inset-0 bg-black"
              onClick={() => setShow(false)}
              style={{
                animation: !nodeRef.current
                  ? 'fadeOut80 0s linear forwards'
                  : show
                  ? 'fadeIn80 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                  : 'fadeOut80 0s linear forwards',
              }}
            >
              &nbsp;
            </div>
            <div
              className="z-[200] fixed top-0 left-0 h-screen w-[70%] gap-[40px] flex flex-col bg-[#181818] py-[40px] px-[20px] text-white border-r-[1px] border-r-[#353338]"
              style={{
                animation: !nodeRef.current
                  ? 'fadeOut 0s linear forwards'
                  : show
                  ? 'fadeInFromRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                  : 'fadeOut 0s linear forwards',
              }}
            >
              <div className="flex flex-col gap-[24px] mt-auto">
                {navSection.map(navItem => (
                  <div
                    key={navItem.groupName}
                    className="flex flex-col gap-[16px]"
                  >
                    <h3 className="text-[0.85rem] tracking-[0.15rem] text-[rgba(255,_255,_255,_0.4)]">
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
                            <i className={`${navItem.iconClass} text-xl`}></i>
                            <h4 className="text-xl">{navItem.name}</h4>
                          </NavLink>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              {session?.user?.email ? (
                <Link
                  to="/user?section=info"
                  className="flex justify-start items-center gap-3 mb-2 hover:!text-current"
                  onClick={() => setShow(false)}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      className="block w-full h-full object-cover object-center"
                      src={avatarUrl ? avatarUrl : '/imgs/no-face.jpg'}
                      alt={avatarUrl ? 'Avatar' : 'No image'}
                    />
                  </div>
                  <h5 className="text-xl flex-1 line-clamp-1">
                    {userRow.username || `User-${userRow.id}`}
                  </h5>
                </Link>
              ) : (
                <ButtonPrimary
                  onClick={() => {
                    handleShowModelLogIn();
                    setShow(false);
                  }}
                  className="text-lg"
                >
                  Sign In
                </ButtonPrimary>
              )}
            </div>
          </Fragment>
          {/* )} */}
        </div>

        <Link
          to="/home/movies"
          className="font-bold text-xl tracking-wider text-white hover:text-white"
        >
          MARK
          <span className="!text-primary text-lg tracking-normal">movie</span>
        </Link>

        <i
          className="bx bx-search flex justify-center items-center w-[40px] h-[40px] text-3xl text-white80"
          onClick={() => navigateTo('/search?query=&page=1')}
        ></i>
      </div>
    </Fragment>
  );
};

export { NavSectionMobile };
