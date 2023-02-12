import { useChangeTitleWebsite, useScrollOnTop } from '~/hooks';
import WatchlistSection from './RecentSection';

const RecentPage = () => {
  useChangeTitleWebsite({
    title: 'Mark movie - Recent',
  });
  useScrollOnTop();
  return (
    <div className="flex flex-col">
      <div className="relative w-full p-[30px] !bg-mainSection">
        <h3 className="text-2xl text-white font-bold mb-[24px]">
          {`Recent Movies`}
        </h3>
        <WatchlistSection type="movie" />
      </div>

      <div className="relative w-full p-[30px] !bg-mainSection">
        <h3 className="text-2xl text-white font-bold mb-[24px]">
          {`Recent TV Shows`}
        </h3>
        <WatchlistSection type="tv" />
      </div>
    </div>
  );
};

export default RecentPage;
