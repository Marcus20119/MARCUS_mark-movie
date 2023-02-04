import { useLikeAndDislike } from '~/hooks';

const LikeAndDislike = ({ status, likesTable }) => {
  const {
    forceDisable,
    quantityLike,
    quantityDislike,
    likeStatus,
    handleReset,
    handleSingleUpdate,
    handleDoubleUpdate,
  } = useLikeAndDislike({ status, likesTable });
  return (
    <div className="inline-flex items-center gap-2 !text-primary text-[22px]">
      <div className="flex items-center border-r !border-r-[#cccccc50] pr-2">
        {!likeStatus && (
          <button
            onClick={() => handleSingleUpdate('like')}
            disabled={forceDisable}
            className="cursor-pointer"
          >
            <i className="flex justify-center items-center bx bx-like pr-2 py-[2px]"></i>
          </button>
        )}
        {likeStatus === 1 && (
          <button
            onClick={() => handleReset('like')}
            disabled={forceDisable}
            className="cursor-pointer"
          >
            <i className="flex justify-center items-center bx bxs-like pr-2 py-[2px]"></i>
          </button>
        )}
        {likeStatus === -1 && (
          <button
            onClick={() => handleDoubleUpdate('like')}
            disabled={forceDisable}
            className="cursor-pointer"
          >
            <i className="flex justify-center items-center bx bx-like pr-2 py-[2px]"></i>
          </button>
        )}
        <span className="text-base text-white80 cursor-default">
          {quantityLike}
        </span>
      </div>
      <div className="flex items-center">
        {!likeStatus && (
          <button
            onClick={() => handleSingleUpdate('dislike')}
            disabled={forceDisable}
            className="cursor-pointer"
          >
            <i className="flex justify-center items-center bx bx-dislike pr-2 py-[2px]"></i>
          </button>
        )}
        {likeStatus === 1 && (
          <button
            onClick={() => handleDoubleUpdate('dislike')}
            disabled={forceDisable}
            className="cursor-pointer"
          >
            <i className="flex justify-center items-center bx bx-dislike pr-2 py-[2px]"></i>
          </button>
        )}
        {likeStatus === -1 && (
          <button
            onClick={() => handleReset('dislike')}
            disabled={forceDisable}
            className="cursor-pointer"
          >
            <i className="flex justify-center items-center bx bxs-dislike pr-2 py-[2px]"></i>
          </button>
        )}
        <span className="text-base text-white80 cursor-default">
          {quantityDislike}
        </span>
      </div>
    </div>
  );
};

export { LikeAndDislike };
