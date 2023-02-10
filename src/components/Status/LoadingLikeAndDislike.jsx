const LoadingLikeAndDislike = () => {
  return (
    <div className="inline-flex items-center gap-2 !text-primary text-[22px]">
      <div className="flex items-center border-r !border-r-[#cccccc50] pr-2">
        <button disabled className="cursor-pointer">
          <i className="flex justify-center items-center bx bx-like pr-2 py-[2px]"></i>
        </button>
        <span className="text-base text-white80 cursor-default">0</span>
      </div>
      <div className="flex items-center">
        <button disabled className="cursor-pointer">
          <i className="flex justify-center items-center bx bx-dislike pr-2 py-[2px]"></i>
        </button>

        <span className="text-base text-white80 cursor-default">0</span>
      </div>
    </div>
  );
};

export { LoadingLikeAndDislike };
