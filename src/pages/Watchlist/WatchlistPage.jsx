import { useChangeTitleWebsite, useResponsive } from '~/hooks';
import WatchlistSection from './WatchlistSection';

const WatchlistPage = () => {
  useChangeTitleWebsite({
    title: 'Mark movie - Watchlist',
  });

  const { isMobile } = useResponsive();

  return (
    <div className={`flex flex-col ${!isMobile ? 'p-[30px]' : 'p-[16px]'}`}>
      <div id="watchlist_movie" className="relative w-full !bg-mainSection">
        <h3 className="text-2xl text-white font-bold mb-[24px]">
          {`Movies Watchlist`}
        </h3>
        <WatchlistSection type="movie" />
      </div>

      <div id="watchlist_tv" className="relative w-full !bg-mainSection">
        <h3 className="text-2xl text-white font-bold mb-[24px]">
          {`TV Shows Watchlist`}
        </h3>
        <WatchlistSection type="tv" />
      </div>
    </div>
  );
};

export default WatchlistPage;
