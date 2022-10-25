import Banner from './Banner';
import './MainSection.scss';
import Navbar from './Navbar';
import ScrollList from './ScrollList';

const MainSection = ({ apiBanner, apiList, apiGenres }) => {
  return (
    <div className="bg-[#222222] py-[20px] px-10 border-x-[1px] border-x-[#353338] overflow-hidden">
      <Navbar />
      {/* {children} */}
      <Banner apiLink={apiBanner} apiGenres={apiGenres} />
      <div className="flex flex-col gap-4">
        {apiList.map(item => (
          <ScrollList key={item.name} title={item.name} apiLink={item.api} />
        ))}
      </div>
    </div>
  );
};

export default MainSection;
