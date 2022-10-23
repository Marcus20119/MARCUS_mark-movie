import CarouselFadeExample from '../CarouselFadeExample';

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
      <div className="banner w-full h-[350px] my-5 rounded-xl overflow-hidden shadow-[0_50px_100px_rgb(255,_61,_113,_0.1)]">
        <CarouselFadeExample />
      </div>
    </div>
  );
};

export default MainSection;
