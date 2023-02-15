import { useResponsive } from '~/hooks';
import LoadingSkeleton from '../Base/Loading/Skeleton';

const LoadingCelebInfoSection = () => {
  const { isMobile, isTablet, isLaptop } = useResponsive();

  return (
    <div
      className={`flex w-full justify-between items-stretch gap-[28px] !bg-mainSection ${
        !isMobile ? 'p-[40px]' : 'flex-col p-[16px]'
      }`}
    >
      <div
        className={`relative flex-1 flex flex-col justify-start items-center gap-[20px] ${
          isLaptop && 'w-[20%]'
        } ${isTablet && ''} ${isMobile && 'w-[70%] mx-auto'}`}
      >
        <LoadingSkeleton className="w-full h-[400px] rounded-md opacity-80" />
      </div>
      <div
        className={`flex flex-col items-start gap-[12px] ${
          isTablet && 'w-[60%]'
        } ${!isMobile ? 'w-[78%]' : 'w-full'}`}
      >
        <LoadingSkeleton className="h-[3rem] my-[0.35rem] w-[200px] rounded-md opacity-60" />
        <div
          className={`justify-start items-center gap-[20px] my-[12px] ${
            !isMobile ? 'inline-flex' : 'flex w-full'
          }`}
        >
          <div className="flex flex-col gap-[8px]">
            {[
              !isMobile ? 'Known for department' : 'Known for',
              'Gender',
              'Born',
            ].map((item, index) => (
              <span key={`subInfoTitle${index}`} className="text-[#7A7A7A]">
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-[8px]">
            {Array(3)
              .fill('')
              .map((item, index) => (
                <LoadingSkeleton
                  key={`subInfoContent${index}`}
                  className="h-[16px] my-[4px] w-[180px] rounded-md opacity-60"
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-[2px] w-full">
          <h3 className="text-2xl text-white font-bold mb-3">Biography</h3>
          <LoadingSkeleton
            className={`w-full rounded-md opacity-40 ${
              isLaptop && 'h-[150px]'
            } ${isTablet && 'h-[130px]'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingCelebInfoSection;
