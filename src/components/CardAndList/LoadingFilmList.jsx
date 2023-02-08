import LoadingSkeleton from '../Base/Loading/Skeleton';

const LoadingFilmList = ({ numberOfCol = 5, numberOfRow = 1 }) => {
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
              <LoadingSkeleton className="h-[1.1rem] my-[0.3rem] w-full rounded-sm opacity-70" />
            </h6>
          </div>
        ))}
    </div>
  );
};

export { LoadingFilmList };