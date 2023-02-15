import { useResponsive, useSearch } from '~/hooks';
import { SearchBar } from '../Bar';
import LoadingSkeleton from '../Base/Loading/Skeleton';

const LoadingWatch = () => {
  const { input, handleSetInput, isFocus, setIsFocus } = useSearch();
  const { isMobile, isTablet, isLaptop } = useResponsive();

  return (
    <div className={`flex w-full ${!isLaptop && 'flex-col'}`}>
      <div
        className={` ${isLaptop ? 'w-[70%]' : 'w-full'} ${
          !isMobile ? 'my-10 px-4' : 'my-6 px-3'
        }`}
      >
        {isTablet && (
          <div className="flex items-center gap-4 w-full mb-4 pl-4">
            <div className="font-bold text-2xl tracking-wider text-white hover:text-white">
              Movie
            </div>
            <div className="flex-1">
              <SearchBar
                input={input}
                handleSetInput={handleSetInput}
                isFocus={isFocus}
                setIsFocus={setIsFocus}
                placeholder="Search . . ."
                type="2"
              />
            </div>
          </div>
        )}
        <div className="relative w-full pt-[56.25%] rounded-md overflow-hidden">
          <div className="absolute inset-0">
            <LoadingSkeleton className="w-full h-full opacity-50" />
          </div>
        </div>
        <div className="flex flex-col mt-3">
          <h1 className="text-4xl font-merri mb-0 leading-[3.7rem] line-clamp-1 text-white80">
            <LoadingSkeleton className="w-[350px] h-[2.25rem] my-[0.725rem] opacity-50 rounded-md" />
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-[6px]">
              <i className="bx bxs-star flex justify-center items-center text-2xl !text-primary"></i>
              <span className="text-white80 text-lg translate-y-[2px] opacity-60">
                <LoadingSkeleton className="w-[30px] h-[1.125rem] my-[0.3125rem] opacity-50 rounded-md" />
              </span>
            </div>
            <div className="flex items-center gap-[6px]">
              <i className="bx bx-calendar flex justify-center items-center text-2xl !text-primary"></i>
              <span className="text-white80 text-lg translate-y-[2px] opacity-60">
                <LoadingSkeleton className="w-[50px] h-[1.125rem] my-[0.3125rem] opacity-50 rounded-md" />
              </span>
            </div>
          </div>
          <div className="flex flex-wrap justify-start items-center gap-[0.5rem] mb-0 mt-3 max-h-[30px]">
            {Array(3)
              .fill('')
              .map((item, index) => (
                <div
                  key={`genresLoading${index}`}
                  className="w-16 px-[12px] py-[8px] text-[0.75rem] leading-[0.85rem] -translate-y-1 rounded-full bg-[#393939] opacity-70 text-white80 hover:!text-white hover:opacity-100"
                >
                  &nbsp;
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <span className="text-white80 font-bold text-lg">Overview:</span>
            <LoadingSkeleton className="w-full h-[100px] my-[0.3125rem] opacity-40 rounded-md" />
          </div>
        </div>
      </div>
      <div
        className={`flex-1 flex flex-col gap-4 ${!isMobile ? 'm-4' : 'm-3'}`}
      >
        {isLaptop && (
          <SearchBar
            input={input}
            handleSetInput={handleSetInput}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            placeholder="Search . . ."
            type="2"
          />
        )}
        <div className="flex flex-col w-full gap-4">
          <LoadingSkeleton className="w-[120px] h-[1.5rem] my-[0.25rem] opacity-50 rounded-md" />
          {Array(5)
            .fill('')
            .map((movieData, index) => (
              <div
                key={`movieWatchLoading-${index}`}
                className="flex gap-4 w-full opacity-100 hover:!opacity-70"
              >
                <div className="w-[30%]">
                  <div className="relative w-full pt-[140%] rounded-md overflow-hidden">
                    <div className="absolute inset-0">
                      <LoadingSkeleton className="w-full h-full opacity-50" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start py-1">
                  <h5 className="text-lg font-bold line-clamp-2 mb-1 text-white80">
                    <LoadingSkeleton className="w-[180px] h-[1.125rem] my-[0.3125rem] opacity-50 rounded-md" />
                  </h5>
                  <span className="text-base line-clamp-2 mb-1 text-white80 opacity-80">
                    <LoadingSkeleton className="w-[100px] h-[1rem] my-[0.25rem] opacity-50 rounded-md" />
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export { LoadingWatch };
