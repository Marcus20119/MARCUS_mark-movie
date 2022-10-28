const MovieTagListLoading = ({ className }) => {
  return (
    <div
      className={`flex flex-wrap justify-start items-center gap-[0.5rem] mb-[1.5rem] max-h-[30px] overflow-hidden ${className}`}
    >
      {['Romantic', 'Comedy'].map(genre => (
        <button
          key={`genresLoading${genre}`}
          className={`px-[11px] py-[8px] border border-white text-[0.65rem] leading-[0.75rem] rounded-md opacity-70 text-transparent
            }`}
          disabled
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default MovieTagListLoading;
