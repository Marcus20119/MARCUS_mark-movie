import NavSection from '~/components/NavSection';

const NotFoundPage = () => {
  return (
    <div className="sub-layout h-screen w-full">
      <NavSection />
      <div className="relative flex-1 w-full h-screen">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img className="" src="/sorry.png" alt="sorry" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
