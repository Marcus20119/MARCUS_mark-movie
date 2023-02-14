/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useClickOutSide, useMySWR } from '~/hooks';
import { api } from '~/utils';

const SuggestionSearchBar = ({
  query,
  setNewQuery,
  placeholder,
  setCurrentPage,
  typeQuery = 'multi',
  needBrighter = false,
}) => {
  // Ẩn hiện thanh suggestion
  const { show, setShow, nodeRef } = useClickOutSide();
  // Set Input và gọi api search bằng giá trị lấy từ query (Không render ra data này)
  const [input, setInput] = useState(query);
  let queryApi;
  switch (typeQuery) {
    case 'multi': {
      queryApi = api.getSearchMulti(input);
      break;
    }
    case 'person':
    case 'tv':
    case 'movie': {
      queryApi = api.getSearch(input, typeQuery);
      break;
    }
    default:
      break;
  }
  const { myData: searchData } = useMySWR({
    api: queryApi,
  });

  // Xử lý lấy dât suggestion
  const [suggestData, setSuggestData] = useState([]);
  useEffect(() => {
    if (searchData?.length && searchData.length > 0) {
      // Lấy tên từ searchData
      const filterData = searchData.map(item => item.title || item.name);
      // Lọc đi dữ liệu bị trùng
      const uniqueData = [...new Set(filterData)];
      // Tạo regex để lọc lấy những dữ liệu match với từ khoá
      const regex = new RegExp(`${input}`, 'gi');
      const matchData = uniqueData.filter(item => item.match(regex));
      setSuggestData(matchData);
    }
  }, [searchData]);

  // Xử lý nhấn phím Enter
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      setNewQuery(e.target.value);
      setInput(e.target.value);
      // Vì trang watch sẽ không truyền hàm setCurrentPage nên cần kiểm tra
      if (typeof setCurrentPage === 'function') {
        setCurrentPage(1);
      }
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <div ref={nodeRef} className="relative w-full">
      <div className="relative w-full">
        <i
          className={`bx bx-search absolute left-4 top-1/2 -translate-y-1/2 text-lg ${
            show
              ? 'text-[rgba(255,_255,_255,_0.4)]'
              : `text-[{rgba(255,_255,_255,_0.15)}]`
          } ${needBrighter ? '!text-[#ffffff70]' : ''}`}
        ></i>
        <input
          className={`block w-full pr-3 pl-10 py-[11px] ${
            suggestData && suggestData.length > 0 && show
              ? 'rounded-t-[23px]'
              : 'rounded-full'
          }  text-white80 bg-[#393939] placeholder:text-[rgba(255,_255,_255,_0.15)] ${
            needBrighter ? 'placeholder:!text-[#ffffff70]' : ''
          } transition-none`}
          type="text"
          placeholder={placeholder}
          value={input}
          onFocus={() => {
            setShow(true);
          }}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div
        className={`z-10 absolute top-full left-0 w-full bg-[#393939] pl-4 pr-4 rounded-b-[23px] shadow-[0_10px_10px_#00000090] ${
          suggestData && suggestData.length > 0 && show ? 'block' : 'hidden'
        }`}
      >
        <div className="flex flex-col gap-1 w-full py-2 text-white80 border-t border-t-white80">
          {suggestData.slice(0, 5).map((item, index) => (
            <div
              key={`suggestion-${index}`}
              className="flex items-center gap-2 cursor-pointer opacity-70 hover:opacity-100"
              onClick={() => {
                setNewQuery(item);
                setInput(item);
                if (typeof setCurrentPage === 'function') {
                  setCurrentPage(1);
                }
                setShow(false);
              }}
            >
              <i className="bx bx-search text-lg "></i>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

SuggestionSearchBar.propTypes = {
  query: PropTypes.string,
  setNewQuery: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  setCurrentPage: PropTypes.func,
  typeQuery: PropTypes.oneOf(['multi', 'person', 'tv', 'movie']),
};

export { SuggestionSearchBar };
