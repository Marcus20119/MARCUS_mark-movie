import { useResponsive } from '~/hooks';

const SearchHeader = ({ message }) => {
  const { isMobile, isTablet, isLaptop } = useResponsive();

  return (
    <h2
      className={`block text-white80 text-center mb-4 mt-4 ${
        isLaptop && 'text-5xl'
      } ${isTablet && 'text-4xl'} ${isMobile && 'text-2xl'}`}
    >
      {message}
    </h2>
  );
};

export { SearchHeader };
