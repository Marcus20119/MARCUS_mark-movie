import { NavSection } from '~/components/NavSection';

const NotFoundPage = () => {
  return (
    <div className="main-layout h-screen w-full bg-[#181818]">
      <NavSection />
      <div className="flex justify-start items-center w-full h-screen">
        <img
          src="/imgs/downloaded-section.png"
          alt="downloaded-section"
          className="w-[90%]"
          style={{ filter: 'hue-rotate(-8deg)' }}
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
