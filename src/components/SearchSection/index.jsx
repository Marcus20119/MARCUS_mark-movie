import debounce from 'lodash.debounce';
import { useState } from 'react';
import PropTypes from 'prop-types';

import NonSearchUI from './NonSearchUI';
import SearchUI from './SearchUI';

const SearchSection = ({ type }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [input, setInput] = useState('');
  const handleSetInput = debounce(e => {
    setInput(e.target.value);
  }, 200);

  return (
    <div className="relative">
      <div className="fixed top-0 bottom-0 right-0 left-[80%] gap-[20px] flex flex-col py-[24px] px-[20px] bg-transparent text-[rgba(255,_255,_255,_0.4)]">
        <div className="relative w-full">
          <input
            className="block w-full pl-3 pr-9 py-2 rounded-xl border-[2px] border-[rgba(255,_255,_255,_0.1)] bg-transparent placeholder:text-[rgba(255,_255,_255,_0.1)] focus:border-[rgba(255,_255,_255,_0.4)]"
            type="text"
            placeholder="Find your movie"
            defaultValue={input}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={handleSetInput}
          />
          <i
            className={`bx bx-search absolute right-3 top-1/2 -translate-y-1/2 text-lg ${
              isFocus
                ? 'text-[rgba(255,_255,_255,_0.4)]'
                : 'text-[rgba(255,_255,_255,_0.1)]'
            }`}
          ></i>
        </div>
        {input ? (
          <SearchUI type={type} query={input} />
        ) : (
          <NonSearchUI type={type} />
        )}
      </div>
    </div>
  );
};

SearchUI.SearchSection = {
  type: PropTypes.oneOf(['movie', 'tv']).isRequired,
};

export default SearchSection;
