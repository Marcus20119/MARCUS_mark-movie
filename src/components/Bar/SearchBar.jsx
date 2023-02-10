import { Fragment } from 'react';

const SearchBar = ({
  input,
  handleSetInput,
  isFocus,
  setIsFocus,
  placeholder,
  type = '1',
}) => {
  console.log('type', type);
  return (
    <div className="relative w-full">
      <Fragment>
        {type === '1' && (
          <Fragment>
            <input
              className="block w-full pl-3 pr-9 py-2 rounded-xl border-[2px] border-[rgba(255,_255,_255,_0.1)] text-[rgba(255,_255,_255,_0.4)] bg-transparent placeholder:text-[rgba(255,_255,_255,_0.1)] focus:border-[rgba(255,_255,_255,_0.4)]"
              type="text"
              placeholder={placeholder}
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
          </Fragment>
        )}
        {type === '2' && (
          <Fragment>
            <i
              className={`bx bx-search absolute left-4 top-1/2 -translate-y-1/2 text-lg ${
                isFocus
                  ? 'text-[rgba(255,_255,_255,_0.4)]'
                  : 'text-[rgba(255,_255,_255,_0.15)]'
              }`}
            ></i>
            <input
              className="block w-full pr-3 pl-10 py-[11px] rounded-full text-white80 bg-[rgba(255,_255,_255,_0.1)] placeholder:text-[rgba(255,_255,_255,_0.15)]"
              type="text"
              placeholder={placeholder}
              defaultValue={input}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={handleSetInput}
            />
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

export { SearchBar };
