import { useResponsive } from '~/hooks';
import LoadingSkeleton from '../Base/Loading/Skeleton';

const LoadingMainList = ({ numberOfRow = 1 }) => {
  const { isTablet, isLaptop } = useResponsive();
  const numberOfCol = isLaptop ? 5 : isTablet ? 3 : 2;

  return (
    <div
      className={`grid gap-[16px] w-full`}
      style={{
        gridTemplateColumns: `repeat(${numberOfCol}, minmax(0, 1fr))`,
      }}
    >
      {Array(numberOfCol * numberOfRow)
        .fill('')
        .map((item, index) => (
          <div
            key={`filmCardKeyLoading-${index}`}
            className="group w-full cursor-pointer rounded-md"
          >
            <div className="relative w-full h-0 bg-transparent pt-[145%] rounded-md overflow-hidden group-hover:-translate-y-2">
              <LoadingSkeleton className="absolute inset-0 w-full opacity-50" />
            </div>
            <h6 className="text-center my-[10px] text-[1.1rem]">
              <LoadingSkeleton className="h-[1.1rem] my-[0.3rem] w-full rounded-[5px] opacity-70" />
            </h6>
          </div>
        ))}
    </div>
  );
};

export { LoadingMainList };
