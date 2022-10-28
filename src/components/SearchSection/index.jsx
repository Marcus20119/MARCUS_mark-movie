import { useState } from 'react';
import NonSearchUI from './NonSearchUI';

const SearchSection = ({ type }) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div className="relative">
      <div className="fixed top-0 bottom-0 right-0 left-[80%] gap-[20px] flex flex-col py-[24px] px-[20px] bg-transparent text-[rgba(255,_255,_255,_0.4)]">
        <div className="relative w-full">
          <input
            className="block w-full pl-3 pr-9 py-2 rounded-xl border-[2px] border-[rgba(255,_255,_255,_0.1)] bg-transparent placeholder:text-[rgba(255,_255,_255,_0.1)] focus:border-[rgba(255,_255,_255,_0.4)]"
            type="text"
            placeholder="Find your movie"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
          <i
            className={`bx bx-search absolute right-3 top-1/2 -translate-y-1/2 text-lg ${
              isFocus
                ? 'text-[rgba(255,_255,_255,_0.4)]'
                : 'text-[rgba(255,_255,_255,_0.1)]'
            }`}
          ></i>
        </div>
        <NonSearchUI type={type} />
      </div>
    </div>
  );
};

export default SearchSection;
