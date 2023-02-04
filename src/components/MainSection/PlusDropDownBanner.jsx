import { usePlusDropDown } from '~/hooks';

const PlusDropDownBanner = ({ movieData, type }) => {
  const {
    favoriteLoading,
    handleAddToFavorite,
    watchlistLoading,
    handleAddToWatchlist,
  } = usePlusDropDown({ movieData, type });

  return (
    <div className="absolute top-1/2 left-full -translate-y-1/2 hidden flex-col translate-x-4 items-stretch gap-1 w-[200px] bg-[#D0D0D0] p-2 rounded-lg text-black group-hover:flex">
      <div className="absolute -left-[20px] top-0 h-full w-[20px] bg-transparent">
        &nbsp;
      </div>
      <div className="absolute left-0 top-2/4 -translate-y-2/4 -translate-x-[6px] border-[12px] border-b-[#D0D0D0] border-l-[#D0D0D0] border-t-transparent border-r-transparent rounded-[4px] rotate-45"></div>
      <button
        className="block px-3 py-1 rounded-[4px] hover:bg-[#b3b3b3] cursor-pointer"
        onClick={handleAddToFavorite}
        disabled={favoriteLoading}
      >
        Add to Favorite List
      </button>
      <button
        className="block px-3 py-1 rounded-[4px] hover:bg-[#b3b3b3] cursor-pointer"
        onClick={handleAddToWatchlist}
        disabled={watchlistLoading}
      >
        Add to Watch List
      </button>
    </div>
  );
};

export default PlusDropDownBanner;
