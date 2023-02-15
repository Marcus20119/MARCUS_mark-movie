import { useChangeTitleWebsite, useResponsive, useScrollOnTop } from '~/hooks';
import RecentSection from './RecentSection';

const RecentPage = () => {
  useChangeTitleWebsite({
    title: 'Mark movie - Recent',
  });
  useScrollOnTop();

  const { isMobile } = useResponsive();

  return (
    <div
      className={`flex flex-col gap-[30px] ${
        !isMobile ? 'p-[30px]' : 'p-[16px]'
      }`}
    >
      <div className="relative w-full !bg-mainSection">
        <h3 className="text-2xl text-white font-bold mb-[24px]">
          {`Recent Movies`}
        </h3>
        <RecentSection type="movie" />
      </div>

      <div className="relative w-full !bg-mainSection">
        <h3 className="text-2xl text-white font-bold mb-[24px]">
          {`Recent TV Shows`}
        </h3>
        <RecentSection type="tv" />
      </div>
    </div>
  );
};

export default RecentPage;
