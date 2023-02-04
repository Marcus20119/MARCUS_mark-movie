import { usePlusDropDown } from '~/hooks';

const PlusDropDown = ({ movieData, type }) => {
  const {
    favoriteLoading,
    handleAddToFavorite,
    watchlistLoading,
    handleAddToWatchlist,
  } = usePlusDropDown({ movieData, type });

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 hidden flex-col translate-y-4 items-stretch gap-1 w-[200px] bg-[#D0D0D0] p-2 rounded-lg text-black group-hover:flex">
      <div className="absolute -top-[20px] left-0 w-[200px] h-[20px] bg-transparent">
        &nbsp;
      </div>
      <div className="absolute top-0 left-2/4 -translate-x-2/4 -translate-y-[6px] border-[12px] border-t-[#D0D0D0] border-l-[#D0D0D0] border-b-transparent border-r-transparent rounded-[4px] rotate-45"></div>
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

export default PlusDropDown;
