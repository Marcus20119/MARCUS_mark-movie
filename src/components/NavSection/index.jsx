import { NavLink, useNavigate } from 'react-router-dom';

const NavSection = () => {
  const navList = [
    {
      groupName: 'MENU',
      items: [
        {
          name: 'Home',
          iconClass: 'bx bxs-home',
          originLink: '/home',
          navigateLink: '/home/movies',
        },
        {
          name: 'Community',
          iconClass: 'bx bx-globe',
          originLink: '/community',
          navigateLink: '/community',
        },
        {
          name: 'Discover',
          iconClass: 'bx bxs-compass',
          originLink: '/discover',
          navigateLink: '/discover',
        },
        {
          name: 'Awards',
          iconClass: 'bx bxs-award',
          originLink: '/awards',
          navigateLink: '/awards',
        },
        {
          name: 'Celebs',
          iconClass: 'bx bxs-user',
          originLink: '/person',
          navigateLink: '/person',
        },
      ],
    },
    {
      groupName: 'LIBRARY',
      items: [
        {
          name: 'Recent',
          iconClass: 'bx bxs-stopwatch',
          originLink: '/recent',
          navigateLink: '/recent',
        },
        {
          name: 'Top rated',
          iconClass: 'bx bxs-star',
          originLink: '/top-rated',
          navigateLink: '/top',
        },
        {
          name: 'Downloaded',
          iconClass: 'bx bxs-download',
          originLink: '/downloaded',
          navigateLink: '/downloaded',
        },
      ],
    },
    {
      groupName: 'CATEGORIES',
      items: [
        {
          name: 'TV Series',
          iconClass: 'bx bxs-tv',
          originLink: '/tv',
          navigateLink: '/tv',
        },
        {
          name: 'Movies',
          iconClass: 'bx bxs-film',
          originLink: '/movie',
          navigateLink: '/movie',
        },
      ],
    },
    {
      groupName: 'GENERAL',
      items: [
        {
          name: 'Settings',
          iconClass: 'bx bxs-cog',
          originLink: '/settings',
          navigateLink: '/settings',
        },
        {
          name: 'Log outs',
          iconClass: 'bx bx-log-out',
          originLink: '/log-out',
          navigateLink: '/log',
        },
      ],
    },
  ];
  const navigateTo = useNavigate();
  return (
    <div className="relative">
      <div className="fixed top-0 bottom-0 left-0 right-[85%] gap-[40px] flex flex-col py-[20px] px-[20px] bg-transparent text-white border-r-[1px] border-r-[#353338]">
        <h1 className="font-bold text-xl tracking-wider">
          MARK
          <span className="text-[var(--primary-color)] text-lg tracking-normal">
            movie
          </span>
        </h1>
        <div className="flex flex-col gap-[24px] mt-auto">
          {navList &&
            navList.length > 0 &&
            navList.map(navSection => (
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
            src="/marcus.jpg"
            alt="marcus freeman"
          />
          <h5>Marcus Freeman</h5>
        </div>
      </div>
    </div>
  );
};

export default NavSection;
