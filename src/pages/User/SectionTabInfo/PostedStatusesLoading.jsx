import { Fragment } from 'react';
import LoadingSkeleton from '~/components/Base/Loading/Skeleton';

const PostedStatusLoading = ({ numberOfLine = 1 }) => {
  return (
    <div className="group relative flex flex-col gap-2 w-full p-3 bg-mainSection rounded-lg">
      <div className="flex justify-between items-start w-full">
        <div className="inline-flex items-center gap-2">
          <img
            src={'/imgs/no-face.jpg'}
            alt={'No face'}
            className="block w-[40px] h-[40px] rounded-full overflow-hidden object-cover object-center"
          />
          <div className="flex flex-col justify-between py-[1px]  text-white80">
            <LoadingSkeleton className="h-[1.125rem] w-40 my-[0.3125rem] rounded-sm" />
            <LoadingSkeleton className="h-[0.875rem] w-16 my-[0.1875rem] rounded-sm" />
          </div>
        </div>
        <div className="inline-flex items-center gap-2 !text-primary text-[22px]">
          <div className="flex items-center border-r !border-r-[#cccccc50] pr-2">
            <button disabled={true}>
              <i className="flex justify-center items-center bx bx-like pr-2 py-[2px]"></i>
            </button>
          </div>
          <div className="flex items-center">
            <button disabled={true}>
              <i className="flex justify-center items-center bx bx-dislike pr-2 py-[2px]"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        {Array(numberOfLine)
          .fill('')
          .map((item, index) => (
            <LoadingSkeleton
              key={`loadingStatus-${numberOfLine}-${index}`}
              className="h-[16px] w-full my-[4px] rounded-sm"
            />
          ))}
        <LoadingSkeleton className="h-[16px] w-[30%] my-[4px] rounded-sm" />
      </div>
    </div>
  );
};

const PostedStatusesLoading = () => {
  return (
    <Fragment>
      <PostedStatusLoading numberOfLine={1} />
      <PostedStatusLoading numberOfLine={4} />
      <PostedStatusLoading numberOfLine={2} />
      <PostedStatusLoading numberOfLine={3} />
    </Fragment>
  );
};

export default PostedStatusesLoading;
