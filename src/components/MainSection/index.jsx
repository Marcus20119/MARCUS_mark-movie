import Banner from './Banner';
import NowPlaying from './NowPlaying';

const MainSection = () => {
  return (
    <div className="min-h-[2000px] bg-[#222222] py-7 px-10 border-x-[1px] border-x-[#353338] overflow-hidden">
      <div className="navbar flex justify-start items-center gap-8 text-white text-[14px]">
        {['TV Series', 'Movies', 'Anime'].map(item => (
          <a key={item} href="#">
            {item}
          </a>
        ))}
      </div>
      {/* <div className="banner w-full h-[150px] bg-white my-5"></div> */}

      <Banner />
      <NowPlaying />
    </div>
  );
};

export default MainSection;
