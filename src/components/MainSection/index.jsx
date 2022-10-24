import './MainSection.scss';
import Navbar from './Navbar';

const MainSection = ({ children }) => {
  return (
    <div className="min-h-[2000px] bg-[#222222] py-6 px-10 border-x-[1px] border-x-[#353338] overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
};

export default MainSection;
