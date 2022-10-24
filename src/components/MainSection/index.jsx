import Banner from './Banner';
import NowPlaying from './ScrollList';
import './MainSection.scss';
import ScrollList from './ScrollList';

const MainSection = () => {
  const apiList = [
    {
      name: 'Now Playing',
      api: 'https://api.themoviedb.org/3/movie/now_playing?api_key=ca5bec6407d971b84c656385ba10351d&language=en-US&page=1',
    },
    {
      name: 'Top Rated Movies',
      api: 'https://api.themoviedb.org/3/movie/top_rated?api_key=ca5bec6407d971b84c656385ba10351d&language=en-US&page=1',
    },
  ];
  return (
    <div className="min-h-[2000px] bg-[#222222] py-7 px-10 border-x-[1px] border-x-[#353338] overflow-hidden">
      <div className="navbar flex justify-start items-center gap-8 text-white text-[14px]">
        {['TV Series', 'Movies', 'Anime'].map(item => (
          <a key={item} href="#">
            {item}
          </a>
        ))}
      </div>
      <Banner />
      <div className="flex flex-col gap-4">
        {apiList.map(item => (
          <ScrollList title={item.name} apiLink={item.api} />
        ))}
      </div>
    </div>
  );
};

export default MainSection;
