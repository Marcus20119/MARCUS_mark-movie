import { NavLink } from 'react-router-dom';
import { useResponsive } from '~/hooks';

const Navbar = ({ navList }) => {
  const { isMobile } = useResponsive();

  return (
    <nav
      className={`navbar flex justify-start items-center gap-8 text-white text-[14px] ${
        isMobile && 'px-3 overflow-x-auto scrollbar-hide flex-nowrap'
      }`}
    >
      {navList.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? "relative !text-primary hover:!text-primary after:content-[''] after:w-1 after:h-1 after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:!bg-primary after:rounded-full flex-shrink-0"
              : 'hover:!text-primary flex-shrink-0'
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export { Navbar };
