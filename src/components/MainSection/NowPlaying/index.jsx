import MovieCard from '../../Common/Movie/Card';

const NowPlaying = () => {
  return (
    <div>
      <h3 className="text-2xl text-white font-bold mb-3">Now Playing</h3>
      <div className="grid grid-cols-4 gap-[10px]">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
};

export default NowPlaying;
