import LoadingSkeleton from '~/components/Base/Loading/Skeleton';
import { LoadingMovieTagList } from './LoadingMovieTagList';

const LoadingMovieCardX = () => {
  return (
    <div className="flex items-center gap-[10px] w-full p-[10px] rounded-xl bg-[rgba(255,_255,_255,_0.06)] text-white">
      <div className="relative w-[34%] h-0 pt-[34%] rounded-lg overflow-hidden">
        <LoadingSkeleton className="absolute w-full inset-0" />
      </div>
      <div className="flex w-[66%] h-[95%] flex-col justify-between items-start">
        <LoadingSkeleton className="h-[19.2px] w-full rounded-sm" />
        <div className="w-full flex justify-between items-center text-xs mb-2">
          <LoadingSkeleton className="h-[16px] w-[30px] rounded-sm" />

          <div className="inline-flex items-center gap-1">
            <LoadingSkeleton className="h-[16px] w-[30px] rounded-sm " />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="w-4 h-4"
            >
              <path
                d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"
                fill="#FFAA01"
              ></path>
            </svg>
          </div>
        </div>
        <LoadingMovieTagList className="!mb-0" />
      </div>
    </div>
  );
};

export default LoadingMovieCardX;
