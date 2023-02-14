import { useChangeTitleWebsite, useScrollOnTop } from '~/hooks';
import RecentSection from './RecentSection';

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
        <RecentSection type="movie" />
      </div>

      <div className="relative w-full p-[30px] !bg-mainSection">
        <h3 className="text-2xl text-white font-bold mb-[24px]">
          {`Recent TV Shows`}
        </h3>
        <RecentSection type="tv" />
      </div>
    </div>
  );
};

export default RecentPage;
