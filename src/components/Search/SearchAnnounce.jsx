import { useResponsive } from '~/hooks';

const SearchAnnounce = ({ query, totalResult }) => {
  const { isMobile } = useResponsive();
  return (
    <h3
      className={`italic text-white my-[24px] mx-[2px] ${
        !isMobile ? 'text-xl' : 'text-base'
      }`}
    >
      {`Search result for "${query}" (${totalResult} results found)`}
    </h3>
  );
};

export { SearchAnnounce };
