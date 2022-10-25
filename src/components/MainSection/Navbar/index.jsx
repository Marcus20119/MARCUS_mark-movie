import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navList = [
    {
      name: 'TV Series',
      path: '/home/tv-series',
    },
    {
      name: 'Movies',
      path: '/home/movies',
    },
  ];
  return (
    <nav className="navbar flex justify-start items-center gap-8 text-white text-[14px]">
      {navList.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? "relative text-[var(--primary-color)] hover:text-[var(--primary-color)] after:content-[''] after:w-1 after:h-1 after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:bg-[var(--primary-color)] after:rounded-full"
              : 'hover:text-[var(--primary-color)]'
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
