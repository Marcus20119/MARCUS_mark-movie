import LoadingSkeleton from '../Base/Loading/Skeleton';

const LoadingCelebInfoSection = () => {
  return (
    <div className="flex w-full justify-between items-stretch gap-[28px] !bg-mainSection p-[40px]">
      <div className="relative flex-1 flex flex-col justify-start items-center gap-[20px] w-[20%]">
        <LoadingSkeleton className="w-full h-[400px] rounded-md opacity-80" />
      </div>
      <div className="flex flex-col items-start gap-[12px] w-[78%]">
        <LoadingSkeleton className="h-[3rem] my-[0.35rem] w-[200px] rounded-md opacity-60" />
        <div className="inline-flex justify-start items-center gap-[20px] my-[12px]">
          <div className="flex flex-col gap-[8px]">
            {['Known for department', 'Gender', 'Born'].map((item, index) => (
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
          <LoadingSkeleton className="w-full h-[150px] rounded-md opacity-40" />
        </div>
      </div>
    </div>
  );
};

export default LoadingCelebInfoSection;
