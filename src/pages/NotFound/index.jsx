import NavSection from '~/components/NavSection';

const NotFoundPage = () => {
  return (
    <div className="sub-layout h-screen w-full bg-[#181818]">
      <NavSection />
      <div className="relative flex-1 w-full h-screen ">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-start gap-[12px]">
          <span className="font-khandy text-[12rem] leading-[10rem] text-[var(--primary-color)]">
            404...
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
