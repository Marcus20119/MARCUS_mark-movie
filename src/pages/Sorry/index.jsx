import NavSection from '~/components/NavSection';

const SorryPage = () => {
  return (
    <div className="sub-layout h-screen w-full bg-[#181818]">
      <NavSection />
      <div className="relative flex-1 w-full h-screen ">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
          <img className="" src="/imgs/sorry.png" alt="sorry" />
          <span className="text-[var(--primary-color)] text-3xl text-center font-bold">
            Sorry, we're still working on it!
          </span>
        </div>
      </div>
    </div>
  );
};

export default SorryPage;
